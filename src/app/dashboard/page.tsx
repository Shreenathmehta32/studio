import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  ArrowRight,
  Bot,
  Calendar,
  ClipboardList,
  Library,
} from "lucide-react";

const dashboardCards = [
  {
    title: "AI Chatbot",
    description: "Get immediate support and guidance from our AI companion.",
    href: "/dashboard/chatbot",
    icon: <Bot className="h-8 w-8 text-primary" />,
  },
  {
    title: "Book an Appointment",
    description: "Schedule a confidential session with a campus counselor.",
    href: "/dashboard/book",
    icon: <Calendar className="h-8 w-8 text-primary" />,
  },
  {
    title: "Resource Library",
    description: "Explore articles, videos, and guides for your well-being.",
    href: "/dashboard/resources",
    icon: <Library className="h-8 w-8 text-primary" />,
  },
  {
    title: "Screening Tools",
    description: "Assess your mental health with our confidential tools.",
    href: "/dashboard/screening",
    icon: <ClipboardList className="h-8 w-8 text-primary" />,
  },
];

export default function DashboardPage() {
  return (
    <div className="flex flex-col gap-8">
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">
            Welcome to your SanjeevaniAI Dashboard
          </CardTitle>
          <CardDescription>
            Your safe space for mental wellness. Here are some quick actions to get you started.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <p>
            Remember, taking the first step is a sign of strength. We are here
            to support you on your journey.
          </p>
        </CardContent>
      </Card>

      <div className="grid gap-6 md:grid-cols-2">
        {dashboardCards.map((card) => (
          <Card
            key={card.title}
            className="flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader className="flex-row items-start gap-4 space-y-0">
              <div className="flex-shrink-0">{card.icon}</div>
              <div className="flex-1">
                <CardTitle className="font-headline">{card.title}</CardTitle>
                <CardDescription className="mt-1">
                  {card.description}
                </CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <Link href={card.href}>
                <Button variant="outline" className="w-full">
                  <span>Go to {card.title}</span>
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Button>
              </Link>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
