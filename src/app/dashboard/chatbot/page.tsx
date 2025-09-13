"use client";

import { useState, useEffect, useRef } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Bot, Send, User } from "lucide-react";
import { aiFirstAidInitialPrompt } from "@/ai/flows/ai-first-aid-initial-prompt";
import { Skeleton } from "@/components/ui/skeleton";

type Message = {
  author: "user" | "bot";
  content: string;
};

export default function ChatbotPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const fetchInitialPrompt = async () => {
      try {
        const initialResponse = await aiFirstAidInitialPrompt({});
        setMessages([
          { author: "bot", content: initialResponse.response },
        ]);
      } catch (error) {
        console.error("Failed to fetch initial prompt:", error);
        setMessages([
          {
            author: "bot",
            content:
              "I'm having a little trouble starting up. Please try refreshing the page.",
          },
        ]);
      } finally {
        setIsLoading(false);
      }
    };

    fetchInitialPrompt();
  }, []);

  useEffect(() => {
    if (scrollAreaRef.current) {
      scrollAreaRef.current.scrollTo({
        top: scrollAreaRef.current.scrollHeight,
        behavior: 'smooth',
      });
    }
  }, [messages]);


  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim() === "") return;

    const userMessage: Message = { author: "user", content: input };
    const botMessage: Message = {
      author: "bot",
      content:
        "Thank you for sharing. I'm currently in a learning phase and can't provide a full response yet, but your message has been noted. Please explore our other resources for now.",
    };

    setMessages((prev) => [...prev, userMessage, botMessage]);
    setInput("");
  };

  return (
    <Card className="flex h-[calc(100vh-120px)] flex-col">
      <CardHeader>
        <h2 className="font-headline text-2xl">AI First-Aid Chatbot</h2>
      </CardHeader>
      <CardContent className="flex-1 overflow-hidden">
        <ScrollArea className="h-full pr-4" ref={scrollAreaRef}>
          <div className="space-y-6">
            {isLoading ? (
              <div className="flex items-start gap-4">
                <Avatar>
                  <AvatarFallback><Bot /></AvatarFallback>
                </Avatar>
                <div className="space-y-2">
                  <Skeleton className="h-4 w-[250px]" />
                  <Skeleton className="h-4 w-[200px]" />
                </div>
              </div>
            ) : (
              messages.map((message, index) => (
                <div
                  key={index}
                  className={`flex items-start gap-4 ${
                    message.author === "user" ? "justify-end" : ""
                  }`}
                >
                  {message.author === "bot" && (
                    <Avatar>
                      <AvatarFallback>
                        <Bot />
                      </AvatarFallback>
                    </Avatar>
                  )}
                  <div
                    className={`max-w-md rounded-lg p-3 ${
                      message.author === "user"
                        ? "bg-primary text-primary-foreground"
                        : "bg-muted"
                    }`}
                  >
                    <p className="text-sm whitespace-pre-wrap">{message.content}</p>
                  </div>
                  {message.author === "user" && (
                    <Avatar>
                      <AvatarFallback>
                        <User />
                      </AvatarFallback>
                    </Avatar>
                  )}
                </div>
              ))
            )}
          </div>
        </ScrollArea>
      </CardContent>
      <CardFooter className="border-t pt-6">
        <form onSubmit={handleSendMessage} className="flex w-full gap-2">
          <Input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Type your message..."
            disabled={isLoading}
          />
          <Button type="submit" size="icon" disabled={isLoading}>
            <Send className="h-4 w-4" />
          </Button>
        </form>
      </CardFooter>
    </Card>
  );
}
