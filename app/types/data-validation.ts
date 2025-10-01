export type ValidationRules = {
  required?: boolean | string;
  minLength?: { value: number; message: string };
  maxLength?: { value: number; message: string };
  pattern?: { value: RegExp; message: string };
  min?: { value: number; message: string };
  max?: { value: number; message: string };
  validate?:
    | ((value: unknown) => boolean | string)
    | Record<string, (value: unknown) => boolean | string>;
};
