
"use client";

import type { Dispatch, ReactNode, SetStateAction } from 'react';
import React, { createContext, useContext, useState, useEffect } from 'react';
import { type User, onAuthStateChanged } from 'firebase/auth';
import { doc, getDoc, setDoc, serverTimestamp } from 'firebase/firestore';
import { auth, db } from '@/lib/firebase';
import { useRouter, usePathname } from 'next/navigation';
import { getCollegeById, type College } from '@/lib/colleges';

export interface UserProfile {
  uid: string;
  email: string | null;
  fullName: string | null;
  collegeId: string | null;
  collegeName?: string | null; // Added for convenience
  avatarUrl?: string | null;
  // Add other profile fields as needed
}

interface AuthContextType {
  user: User | null;
  userProfile: UserProfile | null;
  loading: boolean;
  selectedCollegeId: string | null;
  setSelectedCollegeIdAndSave: (collegeId: string | null) => Promise<void>;
  logout: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [selectedCollegeId, setSelectedCollegeIdState] = useState<string | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (firebaseUser) {
        setUser(firebaseUser);
        // Fetch user profile from Firestore
        const userDocRef = doc(db, "users", firebaseUser.uid);
        const userDocSnap = await getDoc(userDocRef);
        if (userDocSnap.exists()) {
          const profileData = userDocSnap.data() as Omit<UserProfile, 'uid' | 'collegeName'>;
          const college = profileData.collegeId ? getCollegeById(profileData.collegeId) : null;
          const fullProfile: UserProfile = {
            ...profileData,
            uid: firebaseUser.uid,
            collegeName: college?.name,
          };
          setUserProfile(fullProfile);
          setSelectedCollegeIdState(profileData.collegeId || null);
          if (profileData.collegeId && (pathname === '/select-college' || pathname === '/login' || pathname === '/signup')) {
            router.push('/feed'); // Redirect if college is set and on auth/select pages
          } else if (!profileData.collegeId && !['/select-college', '/login', '/signup'].includes(pathname)) {
            router.push('/select-college'); // Redirect to select college if not set
          }
        } else {
          // Profile doesn't exist, could be new signup flow
          setUserProfile({ uid: firebaseUser.uid, email: firebaseUser.email, fullName: firebaseUser.displayName, collegeId: null });
          if (!['/select-college', '/signup'].includes(pathname)) {
             router.push('/select-college');
          }
        }
      } else {
        setUser(null);
        setUserProfile(null);
        setSelectedCollegeIdState(null);
        if (typeof window !== 'undefined') {
          localStorage.removeItem('selectedCollegeId');
        }
        // Only redirect if not on auth pages or landing page
        if (!['/login', '/signup', '/'].includes(pathname)) {
          router.push('/login');
        }
      }
      setLoading(false);
    });

    return () => unsubscribe();
  }, [router, pathname]);
  
  useEffect(() => {
    // Sync selectedCollegeId from localStorage on initial load if no user yet
    if (!user && typeof window !== 'undefined') {
      const storedCollegeId = localStorage.getItem('selectedCollegeId');
      if (storedCollegeId) {
        setSelectedCollegeIdState(storedCollegeId);
      }
    }
  }, [user]);


  const setSelectedCollegeIdAndSave = async (collegeId: string | null) => {
    setSelectedCollegeIdState(collegeId);
    if (typeof window !== 'undefined') {
      if (collegeId) {
        localStorage.setItem('selectedCollegeId', collegeId);
      } else {
        localStorage.removeItem('selectedCollegeId');
      }
    }
    if (user && collegeId) {
      try {
        const userDocRef = doc(db, "users", user.uid);
        await setDoc(userDocRef, { collegeId: collegeId }, { merge: true });
        // Update local userProfile state
        const college = getCollegeById(collegeId);
        setUserProfile(prev => prev ? ({ ...prev, collegeId, collegeName: college?.name }) : null);
      } catch (error) {
        console.error("Error saving collegeId to Firestore: ", error);
      }
    }
  };

  const logout = async () => {
    setLoading(true);
    await auth.signOut();
    setUser(null);
    setUserProfile(null);
    setSelectedCollegeIdState(null);
    if (typeof window !== 'undefined') {
      localStorage.removeItem('selectedCollegeId');
    }
    router.push('/login');
    setLoading(false);
  };

  return (
    <AuthContext.Provider value={{ user, userProfile, loading, selectedCollegeId, setSelectedCollegeIdAndSave, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
