"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { cn } from "@/lib/utils";
import { CalendarIcon } from "lucide-react";
import { format } from "date-fns";
import { useToast } from "@/hooks/use-toast";

const counselors = [
  { id: "1", name: "Dr. Anjali Sharma" },
  { id: "2", name: "Mr. Rohan Verma" },
  { id: "3", name: "Ms. Priya Singh" },
];

const timeSlots = ["09:00 AM", "11:00 AM", "02:00 PM", "04:00 PM"];

const bookingFormSchema = z.object({
  counselorId: z.string({ required_error: "Please select a counselor." }),
  bookingDate: z.date({ required_error: "A date is required." }),
  timeSlot: z.string({ required_error: "Please select a time slot." }),
});

export default function BookAppointmentPage() {
  const { toast } = useToast();
  const form = useForm<z.infer<typeof bookingFormSchema>>({
    resolver: zodResolver(bookingFormSchema),
  });

  function onSubmit(data: z.infer<typeof bookingFormSchema>) {
    console.log(data);
    toast({
      title: "Appointment Booked!",
      description: `Your session with ${
        counselors.find((c) => c.id === data.counselorId)?.name
      } on ${format(data.bookingDate, "PPP")} at ${
        data.timeSlot
      } is confirmed.`,
    });
    form.reset();
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="font-headline text-2xl">Book an Appointment</CardTitle>
        <CardDescription>
          Schedule a confidential session with one of our counselors. All
          information is kept private.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
            <FormField
              control={form.control}
              name="counselorId"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Counselor</FormLabel>
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a counselor" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {counselors.map((counselor) => (
                        <SelectItem key={counselor.id} value={counselor.id}>
                          {counselor.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
              <FormField
                control={form.control}
                name="bookingDate"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Date</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "pl-3 text-left font-normal",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick a date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0" align="start">
                        <Calendar
                          mode="single"
                          selected={field.value}
                          onSelect={field.onChange}
                          disabled={(date) =>
                            date < new Date(new Date().setDate(new Date().getDate() - 1))
                          }
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="timeSlot"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Time Slot</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a time slot" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {timeSlots.map((slot) => (
                          <SelectItem key={slot} value={slot}>
                            {slot}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <Button type="submit">Book Appointment</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
}
