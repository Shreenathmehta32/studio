"use server";

import {
  interpretScreeningToolResults,
  ScreeningToolResultsInterpretationOutput,
} from "@/ai/flows/screening-tool-results-interpretation";

type Answers = Record<string, string>;

export async function getInterpretation(
  toolName: string,
  answers: Answers
): Promise<{
  success: boolean;
  data?: ScreeningToolResultsInterpretationOutput & { score: number, maxScore: number };
  error?: string;
}> {
  if (!toolName || !answers || Object.keys(answers).length === 0) {
    return { success: false, error: "Invalid input provided." };
  }

  const score = Object.values(answers).reduce(
    (sum, value) => sum + parseInt(value, 10),
    0
  );
  const maxScore = toolName === "PHQ-9" ? 27 : 21;
  const rawResults = `Score: ${score} out of ${maxScore}. The user's answers were (questionId: score): ${JSON.stringify(
    answers
  )}`;

  try {
    const result = await interpretScreeningToolResults({
      toolName,
      rawResults,
      studentContext:
        "This is a college student in India using a self-assessment tool on a mental health portal.",
    });

    return { success: true, data: { ...result, score, maxScore } };
  } catch (error) {
    console.error("Error getting interpretation from AI flow:", error);
    return {
      success: false,
      error:
        "We couldn't process your results at the moment. Please try again later.",
    };
  }
}
