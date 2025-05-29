"use client";

import { useState, useEffect } from 'react';
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Search, Send, Smile, Paperclip, Phone, Video } from "lucide-react";
import { cn } from '@/lib/utils';

interface User {
  id: string;
  name: string;
  avatarUrl: string;
  lastMessage?: string;
  lastMessageTime?: string;
  online?: boolean;
}

interface Message {
  id: string;
  senderId: string;
  text: string;
  timestamp: string;
  isOwn: boolean;
}

const dummyUsers: User[] = [
  { id: "1", name: "Alice Wonderland", avatarUrl: "https://placehold.co/40x40.png?text=AW", lastMessage: "Hey, are you free for a quick chat?", lastMessageTime: "10:30 AM", online: true },
  { id: "2", name: "Bob The Builder", avatarUrl: "https://placehold.co/40x40.png?text=BB", lastMessage: "Sure, what's up?", lastMessageTime: "10:28 AM" },
  { id: "3", name: "Charlie Brown", avatarUrl: "https://placehold.co/40x40.png?text=CB", lastMessage: "See you at the library!", lastMessageTime: "Yesterday" },
  { id: "4", name: "Diana Prince", avatarUrl: "https://placehold.co/40x40.png?text=DP", lastMessage: "Thanks for the notes!", lastMessageTime: "Mon", online: true },
];

const dummyMessages: Message[] = [
    { id: "m1", senderId: "2", text: "Hey Alice! Got a minute?", timestamp: "10:25 AM", isOwn: false },
    { id: "m2", senderId: "1", text: "Hi Bob! Sure, what's up?", timestamp: "10:26 AM", isOwn: true },
    { id: "m3", senderId: "2", text: "Just wanted to ask about the algorithms assignment. Are you done with Q3?", timestamp: "10:28 AM", isOwn: false },
    { id: "m4", senderId: "1", text: "Almost! Stuck on the last part. It's tricky.", timestamp: "10:29 AM", isOwn: true },
    { id: "m5", senderId: "2", text: "Tell me about it! Maybe we can work on it together later?", timestamp: "10:30 AM", isOwn: false },
];


export default function MessagesPage() {
  const [selectedUser, setSelectedUser] = useState<User | null>(dummyUsers[0]);
  const [messages, setMessages] = useState<Message[]>(dummyMessages);
  const [newMessage, setNewMessage] = useState("");
  const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = dummyUsers.filter(user => 
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (newMessage.trim() && selectedUser) {
      const newMsg: Message = {
        id: `m${messages.length + 1}`,
        senderId: "currentUser", // This should be the actual current user's ID
        text: newMessage,
        timestamp: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
        isOwn: true,
      };
      setMessages([...messages, newMsg]);
      setNewMessage("");
    }
  };

  // Effect to scroll to bottom of messages when new message is added or user changes
  useEffect(() => {
    const scrollArea = document.getElementById('message-scroll-area');
    if (scrollArea) {
      scrollArea.scrollTop = scrollArea.scrollHeight;
    }
  }, [messages, selectedUser]);


  return (
    <div className="flex h-[calc(100vh-var(--header-height,theme(spacing.14)))] border rounded-lg overflow-hidden shadow-xl">
      {/* Sidebar with users list */}
      <aside className="w-1/3 min-w-[280px] max-w-[350px] border-r bg-card flex flex-col">
        <div className="p-4 border-b">
          <div className="relative">
            <Search className="absolute left-2.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search chats..." 
              className="pl-8"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
        </div>
        <ScrollArea className="flex-1">
          <nav className="py-2">
            {filteredUsers.map((user) => (
              <Button
                key={user.id}
                variant="ghost"
                className={cn(
                  "w-full justify-start h-auto py-3 px-4 rounded-none hover:bg-muted",
                  selectedUser?.id === user.id && "bg-muted font-semibold"
                )}
                onClick={() => setSelectedUser(user)}
              >
                <Avatar className="h-10 w-10 mr-3 relative">
                  <AvatarImage src={user.avatarUrl} alt={user.name} data-ai-hint="user avatar" />
                  <AvatarFallback>{user.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                  {user.online && <span className="absolute bottom-0 right-0 block h-2.5 w-2.5 rounded-full bg-green-500 ring-2 ring-card" />}
                </Avatar>
                <div className="flex-1 text-left">
                  <p className="text-sm truncate">{user.name}</p>
                  <p className="text-xs text-muted-foreground truncate">{user.lastMessage}</p>
                </div>
                <span className="text-xs text-muted-foreground self-start">{user.lastMessageTime}</span>
              </Button>
            ))}
          </nav>
        </ScrollArea>
      </aside>

      {/* Main chat window */}
      <main className="flex-1 flex flex-col bg-background">
        {selectedUser ? (
          <>
            <header className="p-4 border-b flex items-center justify-between bg-card">
              <div className="flex items-center gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="user avatar" />
                  <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-lg font-semibold">{selectedUser.name}</h2>
                  {selectedUser.online && <p className="text-xs text-green-500">Online</p>}
                </div>
              </div>
              <div className="flex items-center gap-2">
                <Button variant="ghost" size="icon"><Phone className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon"><Video className="h-5 w-5" /></Button>
              </div>
            </header>
            
            <ScrollArea id="message-scroll-area" className="flex-1 p-4 space-y-4">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={cn(
                    "flex items-end gap-2 max-w-[75%]",
                    msg.isOwn ? "ml-auto flex-row-reverse" : "mr-auto"
                  )}
                >
                  {!msg.isOwn && (
                    <Avatar className="h-8 w-8 self-start">
                       <AvatarImage src={selectedUser.avatarUrl} alt={selectedUser.name} data-ai-hint="user avatar" />
                       <AvatarFallback>{selectedUser.name.substring(0, 2).toUpperCase()}</AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={cn(
                      "p-3 rounded-xl shadow",
                      msg.isOwn
                        ? "bg-primary text-primary-foreground rounded-br-none"
                        : "bg-card text-card-foreground rounded-bl-none"
                    )}
                  >
                    <p className="text-sm">{msg.text}</p>
                    <p className={cn("text-xs mt-1", msg.isOwn ? "text-primary-foreground/70" : "text-muted-foreground")}>
                      {msg.timestamp}
                    </p>
                  </div>
                </div>
              ))}
            </ScrollArea>

            <footer className="p-4 border-t bg-card">
              <form onSubmit={handleSendMessage} className="flex items-center gap-2">
                <Button variant="ghost" size="icon" type="button"><Smile className="h-5 w-5" /></Button>
                <Button variant="ghost" size="icon" type="button"><Paperclip className="h-5 w-5" /></Button>
                <Input
                  placeholder="Type a message..."
                  value={newMessage}
                  onChange={(e) => setNewMessage(e.target.value)}
                  className="flex-1"
                  autoComplete="off"
                />
                <Button type="submit" size="icon" className="bg-primary text-primary-foreground hover:bg-primary/90">
                  <Send className="h-5 w-5" />
                </Button>
              </form>
            </footer>
          </>
        ) : (
          <div className="flex-1 flex items-center justify-center text-muted-foreground">
            <p>Select a chat to start messaging</p>
          </div>
        )}
      </main>
    </div>
  );
}
