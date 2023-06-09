import { ZodType, z } from "zod";
import { FormData } from "../types/types";

export const schema: ZodType<FormData> = z
  .object({
    username: z
      .string()
      .min(2)
      .max(10)
      .regex(
        /^(?=.*[a-zA-Z])(?=.*\d).*$/,
        "Username must contain at least one letter and one number"
      ),
    email: z.string().email(),
    age: z.number().min(18),
    password: z
      .string()
      .min(6)
      .max(20)
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/.test(value),
        {
          message:
            "Password must contain at least one capital letter, one number, and one special character (!@#$%^&*())",
        }
      ),
    commitPassword: z
      .string()
      .min(6, "Field must contain at least 6 characters")
      .max(20)
      .refine(
        (value) => /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()]).*$/.test(value),
        {
          message:
            "Password must contain at least one capital letter, one number, and one special character (!@#$%^&*())",
        }
      ),
  })
  .refine((data) => data.password === data.commitPassword, {
    message: "Password doesn't match",
    path: ["commitPassword"],
  });
