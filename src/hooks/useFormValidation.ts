import { useState } from "react";


/**
 * A synchronous validation function.
 *
 * Receives the current field value and returns:
 * - a string describing the validation error if invalid
 * - undefined if the value is valid
 *
 * @template T - The type of the field value being validated.
 */

export type SyncValidator<T> = (value: T) => string | undefined;



/**
 * An asynchronous validation function.
 *
 * Receives the current field value and resolves to:
 * - a string describing the validation error if invalid
 * - undefined if the value is valid
 *
 * Useful for server-side validation, availability checks,
 * or any validation requiring async operations.
 *
 * @template T - The type of the field value being validated.
 */

export type AsyncValidator<T> = (value: T) => Promise<string | undefined>;



/**
 * A collection of validation functions for a single form field.
 *
 * - `sync` runs first (if provided).
 * - `async` runs only if synchronous validation passes.
 *
 * Both validators should return:
 * - a string describing the validation error
 * - undefined if the value is valid
 *
 * @template T - The type of the field value being validated.
 */

export type FieldValidators<T> = {
  sync?: SyncValidator<T>;
  async?: AsyncValidator<T>;
};



/**
 * React hook for managing form validation logic (sync + async).
 *
 * Runs synchronous validation first, followed by asynchronous validation
 * if the sync validation passes.
 *
 * @template FormState - The shape of the form state object.
 *
 * @param form - The current form state object.
 * @param validators - An object mapping each form field to its validation rules.
 *
 * @returns An object containing:
 * - `errors`: Current validation errors keyed by field name.
 * - `validateField(field)`: Validates a single field (sync + async).
 * - `validateAll()`: Validates all registered fields.
 * - `clearError(field)`: Clears the error for a specific field.
 *
 * @example
 * const { errors, validateField, validateAll } = useFormValidation(form, {
 *   email: {
 *     sync: (v) => (!v ? "Email is required" : undefined),
 *     async: async (v) => {
 *       const exists = await checkEmail(v)
 *       return exists ? "Email already taken" : undefined
 *     }
 *   }
 * })
 */

export function useFormValidation<FormState extends Record<string, any>>(
  form: FormState,
  validators: {
    [K in keyof FormState]?: FieldValidators<FormState[K]>;
  },
) {
  const [errors, setErrors] = useState<
    Partial<Record<keyof FormState, string>>
  >({});

  const validateField = async (field: keyof FormState) => {
    const value = form[field];
    const config = validators[field];

    if (!config) return true;

    // Sync validation
    if (config.sync) {
      const message = config.sync(value);
      if (message) {
        setErrors((prev) => ({ ...prev, [field]: message }));
        return false;
      }
    }

    // Async validation
    if (config.async) {
      const message = await config.async(value);
      if (message) {
        setErrors((prev) => ({ ...prev, [field]: message }));
        return false;
      }
    }

    // Clear error if valid
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });

    return true;
  };

  const validateAll = async () => {
    const fields = Object.keys(validators) as (keyof FormState)[];
    const results = await Promise.all(fields.map(validateField));
    return results.every(Boolean);
  };

  const clearError = (field: keyof FormState) => {
    setErrors((prev) => {
      const next = { ...prev };
      delete next[field];
      return next;
    });
  };

  return {
    errors,
    validateField,
    validateAll,
    clearError,
  };
}
