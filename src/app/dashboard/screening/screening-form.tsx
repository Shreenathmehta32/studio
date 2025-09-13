"use client";

import { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Loader2, Lightbulb, RefreshCw } from "lucide-react";
import { getInterpretation } from "./actions";
import type { ScreeningToolResultsInterpretationOutput } from "@/ai/flows/screening-tool-results-interpretation";
import { Progress } from "@/components/ui/progress";

type Question = {
  id: string;
  text: string;
};

type Option = {
  label: string;
  value: string;
};

type ScreeningFormProps = {
  toolName: string;
  title: string;
  questions: Question[];
  options: Option[];
};

type ResultState = (ScreeningToolResultsInterpretationOutput & { score: number, maxScore: number }) | null;

export function ScreeningForm({
  toolName,
  title,
  questions,
  options,
}: ScreeningFormProps) {
  const { control, handleSubmit, getValues, reset } = useForm();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<ResultState>(null);

  const onSubmit = async (data: Record<string, string>) => {
    setIsLoading(true);
    setError(null);
    setResult(null);

    const response = await getInterpretation(toolName, data);
    if (response.success && response.data) {
      setResult(response.data);
    } else {
      setError(
        response.error || "An unknown error occurred. Please try again."
      );
    }
    setIsLoading(false);
  };

  const handleReset = () => {
    reset();
    setResult(null);
    setError(null);
    setIsLoading(false);
  };

  if (result) {
    return (
      <Card>
        <CardHeader>
          <CardTitle className="font-headline text-2xl">Your {toolName} Results</CardTitle>
          <CardDescription>
            This is a summary based on your responses. This is not a diagnosis.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6">
          <Alert>
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="font-headline">Interpretation</AlertTitle>
            <AlertDescription>
                <p className="font-bold mb-2">Your score: {result.score} / {result.maxScore}</p>
                <Progress value={(result.score / result.maxScore) * 100} className="mb-4" />
                {result.interpretation}
            </AlertDescription>
          </Alert>
          <Alert variant="default" className="bg-accent/30">
            <Lightbulb className="h-4 w-4" />
            <AlertTitle className="font-headline">Suggested Next Steps</AlertTitle>
            <AlertDescription>
                <div
                    className="prose prose-sm max-w-none"
                    dangerouslySetInnerHTML={{ __html: result.nextSteps.replace(/\n/g, '<br />') }}
                />
            </AlertDescription>
          </Alert>
        </CardContent>
        <CardFooter>
          <Button onClick={handleReset}>
            <RefreshCw className="mr-2 h-4 w-4" />
            Take Again
          </Button>
        </CardFooter>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">{title}</CardTitle>
        <CardDescription>
          Over the last 2 weeks, how often have you been bothered by any of the
          following problems?
        </CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
          {questions.map((q, index) => (
            <Controller
              key={q.id}
              name={q.id}
              control={control}
              rules={{ required: "Please answer all questions." }}
              render={({ field, fieldState }) => (
                <div className="rounded-lg border p-4">
                  <p className="font-semibold mb-4">
                    {index + 1}. {q.text}
                  </p>
                  <RadioGroup
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                    className="grid grid-cols-2 gap-4 md:grid-cols-4"
                  >
                    {options.map((option) => (
                      <div key={option.value} className="flex items-center">
                        <RadioGroupItem
                          value={option.value}
                          id={`${q.id}-${option.value}`}
                        />
                        <Label
                          htmlFor={`${q.id}-${option.value}`}
                          className="ml-2"
                        >
                          {option.label}
                        </Label>
                      </div>
                    ))}
                  </RadioGroup>
                  {fieldState.error && (
                    <p className="mt-2 text-sm text-destructive">
                      {fieldState.error.message}
                    </p>
                  )}
                </div>
              )}
            />
          ))}
          {error && <p className="text-sm text-destructive">{error}</p>}
          <Button type="submit" disabled={isLoading} className="w-full">
            {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {isLoading ? "Analyzing..." : "Get My Results"}
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
