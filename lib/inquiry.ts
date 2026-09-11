import { z } from "zod";
export const inquirySchema = z.object({
  name: z.string().trim().min(2, "Please enter your name.").max(100),
  email: z.email("Enter a valid email address."),
  company: z.string().trim().min(2, "Please enter your company.").max(150),
  website: z
    .string()
    .trim()
    .refine(
      (v) => !v || /^https?:\/\/\S+\.\S+$/i.test(v),
      "Use a complete link beginning with https://.",
    ),
  services: z.array(z.string()).min(1, "Choose at least one service."),
  budget: z.string().min(1, "Choose a budget range."),
  timeline: z.string().min(1, "Choose your preferred timeline."),
  description: z
    .string()
    .trim()
    .min(20, "Tell us a little more (at least 20 characters).")
    .max(5000, "Please keep your brief under 5,000 characters."),
});
export type Inquiry = z.infer<typeof inquirySchema>;
