import {
  phq9Questions,
  screeningOptions,
} from "@/lib/screening-questions";
import { ScreeningForm } from "../screening-form";

export default function PHQ9Page() {
  return (
    <ScreeningForm
      toolName="PHQ-9"
      title="Patient Health Questionnaire (PHQ-9)"
      questions={phq9Questions}
      options={screeningOptions}
    />
  );
}
