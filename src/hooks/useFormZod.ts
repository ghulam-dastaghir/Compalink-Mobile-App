import { useForm, UseFormProps, UseFormReturn } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';

/**
 * Centralized hook for React Hook Form with Zod validation
 * @param schema - Zod schema for validation
 * @param defaultValues - Default values for the form
 * @param options - Additional options for useForm
 * @returns React Hook Form methods and state
 */
export function useFormZod<T extends z.ZodType<any, any, any>>(
  schema: T,
  defaultValues: z.infer<T>,
  options?: Omit<UseFormProps<z.infer<T>>, 'resolver' | 'defaultValues'>
): UseFormReturn<z.infer<T>> {
  return useForm<z.infer<T>>({
    resolver: zodResolver(schema) as any,
    defaultValues,
    ...options,
  });
}

