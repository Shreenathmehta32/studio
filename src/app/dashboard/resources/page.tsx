import Image from "next/image";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { PlaceHolderImages } from "@/lib/placeholder-images";

const resources = [
  {
    title: "Mindful Breathing Exercise",
    description:
      "A guided audio session to help you calm your mind and reduce stress through breathing.",
    type: "Audio",
    image: PlaceHolderImages[0],
  },
  {
    title: "The Importance of Connection",
    description:
      "This article explores how strong social connections can improve mental well-being.",
    type: "Article",
    image: PlaceHolderImages[1],
  },
  {
    title: "Journaling for Clarity",
    description:
      "Learn how to use journaling as a tool to process your thoughts and emotions.",
    type: "Guide",
    image: PlaceHolderImages[2],
  },
  {
    title: "Music for Relaxation",
    description: "A curated playlist of calming music to help you unwind and relax.",
    type: "Audio",
    image: PlaceHolderImages[3],
  },
  {
    title: "Progressive Muscle Relaxation",
    description: "A video guide to a deep relaxation technique you can do anywhere.",
    type: "Video",
    image: PlaceHolderImages[4],
  },
  {
    title: "Understanding Anxiety",
    description:
      "An introductory guide to what anxiety is, its symptoms, and how to manage it.",
    type: "Article",
    image: PlaceHolderImages[5],
  },
];

export default function ResourcesPage() {
  return (
    <div className="flex flex-col gap-8">
       <div>
        <h1 className="font-headline text-3xl font-bold tracking-tight">Resource Library</h1>
        <p className="text-muted-foreground">Find articles, videos, and guides to support your well-being.</p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((resource) => (
          <Card
            key={resource.title}
            className="overflow-hidden transition-shadow duration-300 hover:shadow-xl"
          >
            <CardHeader className="p-0">
              <div className="relative aspect-video w-full">
                <Image
                  src={resource.image.imageUrl}
                  alt={resource.image.description}
                  fill
                  className="object-cover"
                  data-ai-hint={resource.image.imageHint}
                />
              </div>
            </CardHeader>
            <CardContent className="p-6">
              <CardTitle className="font-headline text-xl">
                {resource.title}
              </CardTitle>
              <CardDescription className="mt-2">
                {resource.description}
              </CardDescription>
            </CardContent>
            <CardFooter className="p-6 pt-0">
              <Badge variant={resource.type === "Video" ? "default" : resource.type === "Audio" ? "secondary" : "outline"}>
                {resource.type}
              </Badge>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
