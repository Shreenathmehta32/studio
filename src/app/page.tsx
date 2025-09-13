import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  HeartPulse,
  Bot,
  BookOpenCheck,
  CalendarDays,
  ShieldCheck,
  WifiOff,
} from "lucide-react";
import { Logo } from "@/components/logo";

const features = [
  {
    icon: <Bot className="h-10 w-10 text-primary" />,
    title: "AI First-Aid Chatbot",
    description:
      "Get instant, compassionate support and self-help strategies anytime you need.",
  },
  {
    icon: <CalendarDays className="h-10 w-10 text-primary" />,
    title: "Confidential Bookings",
    description:
      "Securely book appointments with campus counselors privately and easily.",
  },
  {
    icon: <BookOpenCheck className="h-10 w-10 text-primary" />,
    title: "Resource Library",
    description:
      "Access a rich library of wellness resources in various Indian languages.",
  },
  {
    icon: <ShieldCheck className="h-10 w-10 text-primary" />,
    title: "Privacy First",
    description:
      "Your privacy is our priority. Engage anonymously and securely.",
  },
  {
    icon: <HeartPulse className="h-10 w-10 text-primary" />,
    title: "Screening Tools",
    description:
      "Use professional tools to track your mental well-being and get insights.",
  },
  {
    icon: <WifiOff className="h-10 w-10 text-primary" />,
    title: "Offline Access",
    description:
      "Key features work even with patchy internet, ensuring constant support.",
  },
];

export default function LandingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-14 max-w-screen-2xl items-center justify-between">
          <Logo />
          <Link href="/dashboard">
            <Button>Enter App</Button>
          </Link>
        </div>
      </header>

      <main className="flex-1">
        <section className="w-full py-20 md:py-32 lg:py-40">
          <div className="container px-4 md:px-6">
            <div className="mx-auto grid max-w-4xl place-items-center gap-6 text-center">
              <h1 className="font-headline text-4xl font-bold tracking-tighter sm:text-5xl md:text-6xl lg:text-7xl">
                Welcome to <span className="text-primary">SanjeevaniAI</span>
              </h1>
              <p className="max-w-[700px] text-lg text-foreground/80 md:text-xl">
                Your confidential mental wellness companion, designed for the
                students of India. Find support, resources, and a helping hand,
                all in one place.
              </p>
              <div>
                <Link href="/dashboard">
                  <Button size="lg">Explore Dashboard</Button>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="features" className="w-full bg-background/50 py-20 md:py-32">
          <div className="container px-4 md:px-6">
            <div className="mx-auto mb-16 max-w-2xl text-center">
              <h2 className="font-headline text-3xl font-bold tracking-tighter sm:text-4xl">
                A toolkit for your well-being
              </h2>
              <p className="mt-4 text-foreground/80">
                SanjeevaniAI offers a comprehensive suite of tools to support
                your mental health journey.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {features.map((feature) => (
                <Card
                  key={feature.title}
                  className="flex transform flex-col items-center justify-center p-6 text-center transition-transform duration-300 hover:scale-105 hover:shadow-xl"
                >
                  <CardHeader className="items-center p-2">
                    {feature.icon}
                    <CardTitle className="font-headline mt-4 text-xl">
                      {feature.title}
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="p-2">
                    <p className="text-foreground/70">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t border-border/40 py-6">
        <div className="container flex items-center justify-center text-sm text-foreground/60">
          <p>&copy; {new Date().getFullYear()} SanjeevaniAI. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
}
