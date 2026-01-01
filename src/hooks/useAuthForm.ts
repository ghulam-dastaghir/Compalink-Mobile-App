import { useForm, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  loginSchema,
  registerSchema,
  resetPasswordSchema,
  updatePasswordSchema,
  verificationSchema,
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
  UpdatePasswordFormData,
  VerificationFormData,
} from '@/schemas/authSchemas';

// Export types
export type {
  LoginFormData,
  RegisterFormData,
  ResetPasswordFormData,
  UpdatePasswordFormData,
  VerificationFormData,
};

// Default values for all forms
const defaultValues = {
  login: {
    username: '',
    password: '',
    rememberMe: false,
  },
  register: {
    username: '',
    email: '',
    number: '',
    password: '',
    confirmPassword: '',
  },
  resetPassword: {
    emailOrPhone: '',
  },
  updatePassword: {
    newPassword: '',
    confirmPassword: '',
  },
  verification: {
    code: '',
  },
} as const;

/**
 * Hook for Login Form
 */
export const useLoginForm = (): UseFormReturn<LoginFormData> => {
  return useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: defaultValues.login,
  });
};

/**
 * Hook for Register Form
 */
export const useRegisterForm = (): UseFormReturn<RegisterFormData> => {
  return useForm<RegisterFormData>({
    resolver: zodResolver(registerSchema),
    defaultValues: defaultValues.register,
  });
};

/**
 * Hook for Reset Password Form
 */
export const useResetPasswordForm = (): UseFormReturn<ResetPasswordFormData> => {
  return useForm<ResetPasswordFormData>({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: defaultValues.resetPassword,
  });
};

/**
 * Hook for Update Password Form
 */
export const useUpdatePasswordForm = (): UseFormReturn<UpdatePasswordFormData> => {
  return useForm<UpdatePasswordFormData>({
    resolver: zodResolver(updatePasswordSchema),
    defaultValues: defaultValues.updatePassword,
  });
};

/**
 * Hook for Verification Form
 */
export const useVerificationForm = (): UseFormReturn<VerificationFormData> => {
  return useForm<VerificationFormData>({
    resolver: zodResolver(verificationSchema),
    defaultValues: defaultValues.verification,
  });
};

