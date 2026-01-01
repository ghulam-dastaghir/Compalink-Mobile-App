import { z } from 'zod';

// Login Schema
export const loginSchema = z.object({
  username: z.string().min(1, 'Username is required').min(3, 'Username must be at least 3 characters'),
  password: z.string().min(1, 'Password is required').min(6, 'Password must be at least 6 characters'),
  rememberMe: z.boolean().optional(),
});

// Register Schema
export const registerSchema = z
  .object({
    username: z.string().min(1, 'Full name is required').min(3, 'Name must be at least 3 characters'),
    email: z.string().min(1, 'Email is required').email('Please enter a valid email address'),
    number: z
      .string()
      .min(1, 'Phone number is required')
      .regex(/^[0-9+\-\s()]+$/, 'Please enter a valid phone number')
      .min(10, 'Phone number must be at least 10 digits'),
    password: z
      .string()
      .min(1, 'Password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Reset Password Schema
export const resetPasswordSchema = z.object({
  emailOrPhone: z
    .string()
    .min(1, 'Email or phone number is required')
    .refine(
      (value) => {
        // Check if it's a valid email or phone number
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const phoneRegex = /^[0-9+\-\s()]+$/;
        return emailRegex.test(value) || phoneRegex.test(value);
      },
      { message: 'Please enter a valid email or phone number' }
    ),
});

// Update Password Schema
export const updatePasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(1, 'New password is required')
      .min(8, 'Password must be at least 8 characters long')
      .regex(/[A-Z]/, 'Password must contain at least one uppercase letter')
      .regex(/[a-z]/, 'Password must contain at least one lowercase letter')
      .regex(/[0-9]/, 'Password must contain at least one number'),
    confirmPassword: z.string().min(1, 'Please confirm your password'),
  })
  .refine((data) => data.newPassword === data.confirmPassword, {
    message: "Passwords don't match",
    path: ['confirmPassword'],
  });

// Verification Schema
export const verificationSchema = z.object({
  code: z
    .string()
    .min(1, 'Verification code is required')
    .length(4, 'Verification code must be exactly 4 digits')
    .regex(/^\d{4}$/, 'Code must contain only 4 numbers'),
});

// Type exports
export type LoginFormData = z.infer<typeof loginSchema>;
export type RegisterFormData = z.infer<typeof registerSchema>;
export type ResetPasswordFormData = z.infer<typeof resetPasswordSchema>;
export type UpdatePasswordFormData = z.infer<typeof updatePasswordSchema>;
export type VerificationFormData = z.infer<typeof verificationSchema>;

