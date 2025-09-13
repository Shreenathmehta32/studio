import {
  gad7Questions,
  screeningOptions,
} from "@/lib/screening-questions";
import { ScreeningForm } from "../screening-form";

export default function GAD7Page() {
  return (
    <ScreeningForm
      toolName="GAD-7"
      title="Generalized Anxiety Disorder (GAD-7)"
      questions={gad7Questions}
      options={screeningOptions}
    />
  );
}
