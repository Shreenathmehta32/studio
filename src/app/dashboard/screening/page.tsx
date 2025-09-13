import Link from "next/link";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

const screeningTools = [
  {
    name: "PHQ-9",
    title: "Patient Health Questionnaire (PHQ-9)",
    description:
      "A 9-question tool to screen for the presence and severity of depression.",
    href: "/dashboard/screening/phq-9",
  },
  {
    name: "GAD-7",
    title: "Generalized Anxiety Disorder (GAD-7)",
    description:
      "A 7-question self-report questionnaire for screening for generalized anxiety disorder.",
    href: "/dashboard/screening/gad-7",
  },
];

export default function ScreeningPage() {
  return (
    <div className="flex flex-col gap-8">
      <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Screening Tools</h1>
        <p className="text-muted-foreground">
          These confidential tools can help you understand your feelings better.
          The results are private and for your eyes only.
        </p>
      </div>
      <div className="grid gap-6 md:grid-cols-2">
        {screeningTools.map((tool) => (
          <Card
            key={tool.name}
            className="flex flex-col justify-between transition-shadow duration-300 hover:shadow-lg"
          >
            <CardHeader>
              <CardTitle className="font-headline text-xl">{tool.name}</CardTitle>
              <CardDescription>{tool.title}</CardDescription>
            </CardHeader>
            <CardContent className="flex-grow">
              <p>{tool.description}</p>
            </CardContent>
            <CardContent>
              <Link href={tool.href}>
                <Button className="w-full">
                  <span>Start {tool.name}</span>
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
