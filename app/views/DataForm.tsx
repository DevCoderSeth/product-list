"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Controller, Path, UseFormReturn } from "react-hook-form";
import { Input } from "@/app/views/components/input";
import { Checkbox } from "@/app/views/components/checkbox";
import { RadioGroup, RadioGroupItem } from "@/app/views/components/radio-group";
import { Button } from "@/app/views/components/button";
import { Label } from "@/app/views/components/label";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/app/views/components/popover";
import {
  Command,
  CommandInput,
  CommandEmpty,
  CommandGroup,
  CommandItem,
} from "@/app/views/components/command";
import { cn } from "@/app/lib/client_utils";
import { Check, ChevronsUpDown, Eye, EyeOff, Plus } from "lucide-react";
import Image from "next/image";
import { ValidationRules } from "../types/data-validation";
import { Calendar } from "./components/calendar";
import { Card } from "./components/card";
import { AspectRatio } from "./components/aspect-ratio";

// ---- Combobox ----
type ComboboxOption = {
  label: string;
  value: string;
};

type ComboboxProps = {
  options: ComboboxOption[];
  value?: string;
  onChange: (value: string) => void;
};

export const Combobox = ({ options, value, onChange }: ComboboxProps) => {
  const [open, setOpen] = useState(false);
  const selectedOption = options.find((option) => option.value === value);

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <button
          type="button"
          role="combobox"
          aria-expanded={open}
          aria-controls="combobox-options"
          className={cn(
            "flex w-full items-center justify-between rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-1",
            !value && "text-muted-foreground"
          )}
        >
          {selectedOption?.label || "Select an option"}
          <ChevronsUpDown className="ml-2 h-4 w-4 opacity-50" />
        </button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-primary">
        <Command>
          <CommandInput placeholder="Search option..." />
          <CommandEmpty>No option found.</CommandEmpty>
          <CommandGroup id="combobox-options">
            {options.map((option) => (
              <CommandItem
                key={option.value}
                onSelect={() => {
                  onChange(option.value);
                  setOpen(false);
                }}
              >
                <Check
                  className={cn(
                    "mr-2 h-4 w-4",
                    value === option.value ? "opacity-100" : "opacity-0"
                  )}
                />
                {option.label}
              </CommandItem>
            ))}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  );
};

// ---- DataForm ----
export type Field =
  | {
      type: "text" | "email" | "password" | "number";
      name: string;
      label: string;
      placeholder?: string;
      step?: string;
      validation?: ValidationRules;
    }
  | {
      type: "textarea";
      name: string;
      label: string;
      placeholder?: string;
      validation?: ValidationRules;
    }
  | {
      type: "otp";
      name: string;
      label: string;
      validation?: ValidationRules;
    }
  | {
      type: "checkbox";
      name: string;
      label: string;
      validation?: ValidationRules;
    }
  | {
      type: "checkboxMatrix";
      name: string;
      label: string;
      columns: string[];
      rows: string[];
      validation?: ValidationRules;
    }
  | {
      type: "radio";
      name: string;
      label: string;
      options: { label: string; value: string }[];
      validation?: ValidationRules;
    }
  | {
      type: "select";
      name: string;
      label: string;
      options: { label: string; value: string }[];
      validation?: ValidationRules;
    }
  | {
      type: "date";
      name: string;
      label: string;
      validation?: ValidationRules;
    }
  | {
      type: "file";
      name: string;
      label: string;
      accept?: string;
      multiple?: boolean;
      validation?: ValidationRules;
    };

type DataFormProps<T extends Record<string, unknown>> = {
  fields: Field[];
  onSubmit: (data: T) => void;
  submitLabel?: string;
  backLabel?: string;
  form: UseFormReturn<T>;
  redirectPath?: string;
  onBack?: () => void;
};

export const DataForm = <T extends Record<string, unknown>>({
  fields,
  onSubmit,
  submitLabel = "Submit",
  backLabel,
  form,
  redirectPath,
  onBack,
}: DataFormProps<T>) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = form;

  const router = useRouter();
  const [filePreviews, setFilePreviews] = useState<Record<string, string>>({});
  const [showPassword, setShowPassword] = useState(false);

  const handleCancel = onBack ?? (() => {});

  const handleFormSubmit = async (data: T) => {
    await onSubmit(data);
    if (redirectPath) router.push(redirectPath);
  };

  return (
    <form
      onSubmit={handleSubmit(handleFormSubmit)}
      className="w-full bg-secondary p-6 rounded-xl grid grid-cols-1 md:grid-cols-2 gap-6"
    >
      {fields.map((field) => {
        const error = errors[field.name as keyof typeof errors];

        switch (field.type) {
          case "text":
          case "email":
          case "number":
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                {field.name === "salary" ? (
                  <Controller
                    name={field.name as Path<T>}
                    control={control}
                    rules={field.validation}
                    render={({ field: controllerField }) => {
                      const rawValue = String(controllerField.value ?? "");
                      const numeric = Number(rawValue.replace(/,/g, ""));
                      const formatted =
                        !isNaN(numeric) && rawValue !== ""
                          ? numeric.toLocaleString("en-US", {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })
                          : "";

                      return (
                        <Input
                          id={field.name}
                          placeholder={field.placeholder}
                          value={formatted}
                          onChange={(e) => {
                            const cleaned = e.target.value
                              .replace(/,/g, "")
                              .replace(/[^\d.]/g, "");
                            controllerField.onChange(cleaned);
                          }}
                        />
                      );
                    }}
                  />
                ) : (
                  <Input
                    id={field.name}
                    type={field.type}
                    placeholder={field.placeholder}
                    step={field.step}
                    {...register(field.name as Path<T>, field.validation)}
                  />
                )}
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "password":
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <Controller
                  name={field.name as Path<T>}
                  control={control}
                  rules={field.validation}
                  render={({ field: controllerField }) => {
                    return (
                      <div className="relative">
                        <Input
                          id={field.name}
                          type={showPassword ? "text" : "password"}
                          placeholder={field.placeholder}
                          {...controllerField}
                          value={String(controllerField.value ?? "")}
                        />
                        <button
                          type="button"
                          onClick={() => setShowPassword((prev) => !prev)}
                          className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                          tabIndex={-1}
                        >
                          {showPassword ? (
                            <EyeOff className="w-4 h-4" />
                          ) : (
                            <Eye className="w-4 h-4" />
                          )}
                        </button>
                      </div>
                    );
                  }}
                />
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "textarea":
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <textarea
                  id={field.name}
                  placeholder={field.placeholder}
                  className="w-full rounded-md border border-input px-3 py-2 text-sm shadow-sm focus:outline-none focus:ring-2 focus:ring-accent-1"
                  {...register(field.name as Path<T>)}
                />
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "date":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                <Controller
                  control={control}
                  name={field.name as Path<T>}
                  rules={field.validation}
                  render={({ field: controllerField }) => (
                    <>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button
                            variant="outline"
                            className={cn(
                              "w-full justify-start text-left font-normal",
                              !controllerField.value && "text-muted-foreground"
                            )}
                          >
                            {controllerField.value
                              ? new Date(
                                  controllerField.value as string
                                ).toLocaleDateString()
                              : "Pick a date"}
                            <ChevronsUpDown className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-auto p-0">
                          <Calendar
                            mode="single"
                            selected={
                              controllerField.value
                                ? new Date(controllerField.value as string)
                                : undefined
                            }
                            onSelect={(date) =>
                              controllerField.onChange(
                                date?.toISOString() || ""
                              )
                            }
                            className="rounded-md border shadow-sm"
                            captionLayout="dropdown"
                            initialFocus
                          />
                        </PopoverContent>
                      </Popover>
                      {error && (
                        <p className="text-sm text-red-500">
                          {error.message?.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            );
          case "otp":
            return (
              <div
                key={field.name}
                className="space-y-2 col-span-1 md:col-span-2"
              >
                <Label>{field.label}</Label>
                <div className="flex gap-2">
                  {[...Array(6)].map((_, i) => (
                    <Input
                      key={i}
                      type="text"
                      maxLength={1}
                      className="text-center"
                      {...register(`${field.name}[${i}]` as Path<T>)}
                    />
                  ))}
                </div>
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "checkbox":
            return (
              <div
                key={field.name}
                className="flex items-center gap-2 col-span-1 md:col-span-2"
              >
                <Checkbox
                  id={field.name}
                  {...register(field.name as Path<T>)}
                />
                <Label htmlFor={field.name}>{field.label}</Label>
                {error && (
                  <p className="text-sm text-red-500 ml-2">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "checkboxMatrix":
            return (
              <div
                key={field.name}
                className="space-y-2 col-span-1 md:col-span-2"
              >
                <Label>{field.label}</Label>
                <div className="overflow-x-auto rounded-md border">
                  <table className="w-full border-collapse">
                    <thead>
                      <tr>
                        <th className="px-3 py-2 text-left border-b"></th>
                        {field.columns.map((col) => (
                          <th
                            key={col}
                            className="px-3 py-2 text-sm font-medium text-center border-b"
                          >
                            {col}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {field.rows.map((row) => (
                        <tr key={row} className="even:bg-muted/30">
                          <td className="px-3 py-2 text-sm font-medium border-b">
                            {row}
                          </td>
                          {field.columns.map((col) => {
                            const path =
                              `${field.name}.${row}.${col}` as Path<T>;

                            return (
                              <td
                                key={col}
                                className="px-3 py-2 text-center border-b"
                              >
                                <Controller
                                  name={path}
                                  control={control}
                                  render={({ field: checkboxField }) => {
                                    return (
                                      <Checkbox
                                        checked={!!checkboxField.value}
                                        onCheckedChange={(checked) => {
                                          checkboxField.onChange(checked);
                                        }}
                                      />
                                    );
                                  }}
                                />
                              </td>
                            );
                          })}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "radio":
            return (
              <div key={field.name} className="space-y-2 col-span-1">
                <Label>{field.label}</Label>
                <Controller
                  control={control}
                  name={field.name as Path<T>}
                  rules={{ required: "Please select an option." }}
                  render={({ field: controllerField }) => (
                    <>
                      <RadioGroup
                        value={
                          typeof controllerField.value === "string"
                            ? controllerField.value
                            : ""
                        }
                        onValueChange={controllerField.onChange}
                        className="p-3 rounded-md border flex flex-wrap gap-4"
                      >
                        {field.options.map((opt) => (
                          <div
                            key={opt.value}
                            className="flex items-center space-x-2 flex-1"
                          >
                            <RadioGroupItem
                              value={opt.value}
                              id={`${field.name}-${opt.value}`}
                              className="border-muted-foreground text-muted-foreground data-[state=checked]:border-accent-1 data-[state=checked]:bg-accent-1"
                            />
                            <Label htmlFor={`${field.name}-${opt.value}`}>
                              {opt.label}
                            </Label>
                          </div>
                        ))}
                      </RadioGroup>
                      {error && (
                        <p className="text-sm text-red-500">
                          {error.message?.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            );
          case "file":
            return (
              <div key={field.name} className="space-y-2">
                <Label htmlFor={field.name}>{field.label}</Label>
                <input
                  id={field.name}
                  type="file"
                  accept={field.accept}
                  multiple={field.multiple}
                  className="hidden"
                  {...register(field.name as Path<T>, {
                    onChange: (e) => {
                      const file = e.target.files?.[0];
                      if (file) {
                        const url = URL.createObjectURL(file);
                        setFilePreviews((prev) => ({
                          ...prev,
                          [field.name]: url,
                        }));
                      }
                    },
                  })}
                />
                <Card
                  onClick={() => document.getElementById(field.name)?.click()}
                  className="cursor-pointer w-full"
                >
                  <AspectRatio
                    ratio={4 / 2}
                    className="flex items-center justify-center rounded-lg border border-dashed hover:border-accent-1"
                  >
                    {filePreviews[field.name] ? (
                      <Image
                        src={filePreviews[field.name]}
                        alt="Preview"
                        fill
                        className="object-cover rounded-lg"
                      />
                    ) : (
                      <div className="flex flex-col items-center justify-center text-gray-500">
                        <Plus className="w-6 h-6 mb-1" />
                        <span className="text-sm">Add Image</span>
                      </div>
                    )}
                  </AspectRatio>
                </Card>
                {error && (
                  <p className="text-sm text-red-500">
                    {error.message?.toString()}
                  </p>
                )}
              </div>
            );
          case "select":
            return (
              <div key={field.name} className="space-y-2">
                <Label>{field.label}</Label>
                <Controller
                  control={control}
                  name={field.name as Path<T>}
                  rules={field.validation} // ✅ pass validation rules
                  render={({ field: controllerField }) => (
                    <>
                      <Combobox
                        options={field.options}
                        value={controllerField.value as string}
                        onChange={controllerField.onChange}
                      />
                      {error && (
                        <p className="text-sm text-red-500">
                          {error.message?.toString()}
                        </p>
                      )}
                    </>
                  )}
                />
              </div>
            );
          default:
            return null;
        }
      })}
      <div className="col-span-1 md:col-span-2 flex flex-col md:flex-row justify-between gap-4">
        <Button
          type="button"
          variant="outline"
          className="btn-secondary flex-1 cursor-pointer"
          onClick={handleCancel}
        >
          {backLabel || (onBack ? "Back" : "Cancel")}
        </Button>

        <Button type="submit" className="btn-primary flex-1 cursor-pointer">
          {submitLabel}
        </Button>
      </div>
    </form>
  );
};
