
"use client";

import { useState, useEffect, useRef } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Search, Send, Smile, Paperclip, Phone, Video, PlusCircle, MessageSquare, ChevronLeft } from "lucide-react";
import { cn } from '@/lib/utils';
import { useIsMobile } from '@/hooks/use-mobile'; // Import useIsMobile

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online?: boolean;
  unreadCount?: number;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const dummyUsers: User[] = [
  { id: "1", name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", lastMessage: "Hey, are you free for a quick chat?", lastMessageTime: "10:30 AM", online: true, unreadCount: 2 },
  { id: "2", name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB", lastMessage: "Sure, what's up?", lastMessageTime: "10:28 AM" },
  { id: "3", name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png?text=CB", lastMessage: "See you at the library! Project discussion.", lastMessageTime: "Yesterday", unreadCount: 0 },
  { id: "4", name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png?text=DP", lastMessage: "Thanks for the notes! Super helpful.", lastMessageTime: "Mon", online: true },
  { id: "5", name: "Edward Scissorhands", avatarUrl: "https://placehold.co/40x40.png?text=ES", lastMessage: "Let's catch up soon.", lastMessageTime: "Sun" },
];

const dummyMessages: { [key: string]: Message[] } = {
  "1": [
    { id: "m1-1", senderId: "1", text: "Hey Bob! Got a minute?", timestamp: "10:25 AM", isOwn: true },
    { id: "m1-2", senderId: "2", text: "Hi Alice! Sure, what's up?", timestamp: "10:26 AM", isOwn: false },
    { id: "m1-3", senderId: "1", text: "Just wanted to ask about the algorithms assignment. Are you done with Q3?", timestamp: "10:28 AM", isOwn: true },
    { id: "m1-4", senderId: "2", text: "Almost! Stuck on the last part. It's tricky.", timestamp: "10:29 AM", isOwn: false },
    { id: "m1-5", senderId: "1", text: "Tell me about it! Maybe we can work on it together later?", timestamp: "10:30 AM", isOwn: true },
    { id: "m1-6", senderId: "2", text: "Sounds like a plan! I'm free after 5 PM.", timestamp: "10:31 AM", isOwn: false },
  ],
  "2": [
    { id: "m2-1", senderId: "currentUser", text: "Hey Bob, it's me!", timestamp: "10:20 AM", isOwn: true },
    { id: "m2-2", senderId: "2", text: "Hey! What's going on?", timestamp: "10:21 AM", isOwn: false },
  ],
   "3": [
    { id: "m3-1", senderId: "3", text: "See you at the library! We need to discuss the project.", timestamp: "Yesterday", isOwn: false },
    { id: "m3-2", senderId: "currentUser", text: "Okay, sounds good. I'll bring my notes.", timestamp: "Yesterday", isOwn: true },
  ],
};


export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const isMobile = useIsMobile();
  const [showChatMobile, setShowChatMobile] = useState(false);

  // Initialize selectedUser to the first user on desktop only
  useEffect(() => {
    if (!isMobile && dummyUsers.length > 0) {
      setSelectedUser(dummyUsers[0]);
    }
  }, [isMobile]);


  const filteredUsers = dummyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const newMsg: Message = {
        id: `m${Date.now()}`,
        senderId: "currentUser", 
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages(prevMessages => [...prevMessages, newMsg]);
      dummyMessages[selectedUser.id] = [...(dummyMessages[selectedUser.id] || []), newMsg]; // Update dummy data
      setNewMessage("");
    }
  };

  const handleSelectUser = (user: User) => {
    setSelectedUser(user);
    if (isMobile) {
      setShowChatMobile(true);
    }
  };

  const handleBackToListMobile = () => {
    setShowChatMobile(false);
    setSelectedUser(null); // Optionally clear selected user when going back on mobile
  }

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (selectedUser) {
      setMessages(dummyMessages[selectedUser.id] || []);
    } else {
      setMessages([]);
    }
  }, [selectedUser]);

  const UserListAside = () => (
    <aside className={cn(
      "border-border flex flex-col bg-card",
      isMobile ? "w-full h-full" : "w-1/3 min-w-[280px] max-w-[380px] border-r"
    )}>
      <div className="p-3 border-b border-border sticky top-0 bg-card z-10">
          <div className="flex items-center justify-between mb-2">
              <h2 className="text-xl font-semibold">Chats</h2>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" suppressHydrationWarning={true}>
                  <PlusCircle className="h-5 w-5" />
              </Button>
          </div>
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input 
            placeholder="Search chats..." 
            className="pl-10 rounded-md bg-background focus:bg-card"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            suppressHydrationWarning={true}
          />
        </div>
      </div>
      <ScrollArea className="flex-1">
        <nav className="p-2 space-y-1">
          {filteredUsers.map((user) => (
            <button
              key={user.id}
              className={cn(
                "w-full flex items-center gap-3 text-left py-2 px-3 rounded-md hover:bg-muted focus-visible:bg-muted outline-none transition-colors duration-150",
                selectedUser?.id === user.id && !isMobile && "bg-primary text-primary-foreground hover:bg-primary/90"
              )}
              onClick={() => handleSelectUser(user)}
              suppressHydrationWarning={true}
            >
              <Avatar className="h-10 w-10 relative">
                <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                {user.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-background" />}
              </Avatar>
              <div className="flex-1 min-w-0">
                <div className="flex justify-between items-center">
                  <p className="text-sm font-medium truncate">{user.name}</p>
                  <span className={cn("text-xs flex-shrink-0 ml-2", selectedUser?.id === user.id && !isMobile ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{user.lastMessageTime}</span>
                </div>
                <div className="flex justify-between items-center">
                  <p className={cn("text-xs truncate mt-0.5", selectedUser?.id === user.id && !isMobile ? 'text-primary-foreground/70' : 'text-muted-foreground')}>{user.lastMessage}</p>
                  {user.unreadCount && user.unreadCount > 0 && (
                    <span className={cn(
                      "ml-2 text-xs rounded-full px-1.5 py-0.5 font-medium",
                      selectedUser?.id === user.id && !isMobile ? "bg-primary-foreground text-primary" : "bg-primary text-primary-foreground"
                    )}>
                      {user.unreadCount}
                    </span>
                  )}
                </div>
              </div>
            </button>
          ))}
           {filteredUsers.length === 0 && (
              <p className="text-center text-muted-foreground p-4 text-sm">No users found.</p>
          )}
        </nav>
      </ScrollArea>
    </aside>
  );

  const ChatMain = () => (
    <main className="flex-1 flex flex-col bg-background">
      {selectedUser ? (
        <>
          <header className="p-4 border-b border-border flex items-center justify-between bg-card sticky top-0 z-10">
            <div className="flex items-center gap-3">
              {isMobile && (
                <Button variant="ghost" size="icon" onClick={handleBackToListMobile} className="mr-2 text-muted-foreground hover:text-primary">
                  <ChevronLeft className="h-6 w-6" />
                </Button>
              )}
              <Avatar className="h-10 w-10">
                <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="user avatar" />
                <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
              <div>
                <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                {selectedUser.online ? (
                   <p className="text-xs text-green-500 flex items-center"><span className="h-1.5 w-1.5 bg-green-500 rounded-full mr-1.5"></span>Online</p>
                ) : (
                  <p className="text-xs text-muted-foreground">Offline</p>
                )}
              </div>
            </div>
            <div className="flex items-center gap-1">
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" suppressHydrationWarning={true}><Phone className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" className="text-muted-foreground hover:text-primary" suppressHydrationWarning={true}><Video className="h-5 w-5" /></Button>
            </div>
          </header>
          
          <ScrollArea className="flex-1 p-4 sm:p-6 space-y-4">
            {messages.map((msg) => (
              <div
                key={msg.id}
                className={cn(
                  "flex items-end gap-2.5 max-w-[80%] sm:max-w-[70%]",
                  msg.isOwn ? "ml-auto flex-row-reverse" : "mr-auto"
                )}
              >
                {!msg.isOwn && (
                  <Avatar className="h-8 w-8 self-start flex-shrink-0">
                     <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="user avatar" />
                     <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  </Avatar>
                )}
                 {msg.isOwn && (
                  <Avatar className="h-8 w-8 self-start flex-shrink-0">
                     <AvatarImage src="https://placehold.co/40x40.png?text=ME" alt="My Avatar" data-ai-hint="user avatar" />
                     <AvatarFallback>ME</AvatarFallback>
                  </Avatar>
                )}
                <div
                  className={cn(
                    "p-2.5 px-3.5 rounded-2xl shadow-sm break-words",
                    msg.isOwn
                      ? "bg-primary text-primary-foreground rounded-br-md"
                      : "bg-card text-card-foreground border border-border rounded-bl-md"
                  )}
                >
                  <p className="text-sm leading-relaxed">{msg.text}</p>
                  <p className={cn(
                      "text-xs mt-1.5 text-right", 
                      msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground"
                    )}
                  >
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </ScrollArea>

          <footer className="p-3 sm:p-4 border-t border-border bg-card sticky bottom-0 z-10">
            <form onSubmit={handleSendMessage} className="flex items-center gap-2">
              <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary" suppressHydrationWarning={true}><Smile className="h-5 w-5" /></Button>
              <Button variant="ghost" size="icon" type="button" className="text-muted-foreground hover:text-primary" suppressHydrationWarning={true}><Paperclip className="h-5 w-5" /></Button>
              <Input
                placeholder="Type a message..."
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                className="flex-1 rounded-full bg-background focus:bg-background px-4 py-2 h-10"
                autoComplete="off"
                suppressHydrationWarning={true}
              />
              <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90 rounded-full w-10 h-10 flex-shrink-0" suppressHydrationWarning={true}>
                <Send className="h-5 w-5" />
              </Button>
            </form>
          </footer>
        </>
      ) : (
        <div className="flex-1 flex flex-col items-center justify-center text-center text-muted-foreground p-8">
          <MessageSquare className="h-16 w-16 mb-4 opacity-50" />
          <h2 className="text-xl font-semibold">No chat selected</h2>
          <p className="max-w-xs">Select a conversation from the list on the left, or start a new one to begin messaging.</p>
        </div>
      )}
    </main>
  );


  return (
    <div className="flex flex-col md:flex-row h-full border rounded-xl overflow-hidden shadow-xl">
      {isMobile ? (
        showChatMobile && selectedUser ? <ChatMain /> : <UserListAside />
      ) : (
        <>
          <UserListAside />
          <ChatMain />
        </>
      )}
    </div>
  );
}

