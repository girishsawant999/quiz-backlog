import * as z from "zod";

export const UserSchema = z.object({
  _id: z.string(),
  email: z.string(),
  password: z.string(),
  firstName: z.string(),
  lastName: z.string(),
  mobile: z.string(),
  token: z.string(),
  verificationToken: z.string(),
  isEmailVerified: z.boolean(),
  otp: z.null(),
  otpCreatedAt: z.null(),
  isOtpVerified: z.null(),
  isAdmin: z.boolean(),
  role: z.enum(["Admin", "Operator", "Approver"]),
  isActive: z.boolean(),
  lastLoggedAt: z.coerce.date(),
  isDeleted: z.boolean(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
});
