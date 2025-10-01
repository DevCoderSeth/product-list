"use client";

import { DefaultValues, useForm, UseFormReturn } from "react-hook-form";
import { DataForm, Field } from "../DataForm";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "../components/dialog";
import { useEffect, useState, useCallback, useRef } from "react";

export type { Field };

export type Step = {
  title: string;
  fields: Field[];
};

type FormDialogProps<T extends object> = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  mode: "create" | "edit";
  title: string;
  steps: Step[];
  initialData?: Partial<T>;
  onSubmit: (data: Partial<T>) => Promise<void>;
};

export function FormDialog<T extends object>({
  open,
  onOpenChange,
  mode,
  title,
  steps,
  initialData,
  onSubmit,
}: FormDialogProps<T>) {
  const form = useForm<Partial<T>>({
    defaultValues: {} as DefaultValues<Partial<T>>,
    mode: "onChange",
  });

  const [currentStep, setCurrentStep] = useState(0);
  const initialDataRef = useRef(initialData);

  // Update ref when initialData changes
  useEffect(() => {
    initialDataRef.current = initialData;
  }, [initialData]);

  // Fixed: Reset form when dialog opens with proper timing
  useEffect(() => {
    if (open) {
      // Delay reset to ensure component is fully mounted
      const timer = setTimeout(() => {
        form.reset(initialDataRef.current || ({} as Partial<T>));
        setCurrentStep(0);
      }, 0);

      return () => clearTimeout(timer);
    } else {
      // Reset when closing to clean up
      form.reset();
      setCurrentStep(0);
    }
  }, [open, form]);

  const isLastStep = currentStep === steps.length - 1;

  const handleBack = useCallback(() => {
    setCurrentStep((s) => Math.max(0, s - 1));
  }, []);

  const handleSubmitStep = useCallback(
    async (data: Partial<T>) => {
      if (!isLastStep) {
        setCurrentStep((s) => s + 1);
      } else {
        await onSubmit(data);
        onOpenChange(false);
      }
    },
    [isLastStep, onSubmit, onOpenChange]
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-4xl">
        <DialogHeader>
          <DialogTitle>
            {title} – {steps[currentStep]?.title || "Step"}
          </DialogTitle>
        </DialogHeader>

        {/* Fixed: Key based on open state and initialData to force re-render */}
        <DataForm<Partial<T>>
          key={`${open}-${JSON.stringify(initialData)}-${currentStep}`}
          fields={steps[currentStep]?.fields || []}
          form={form as UseFormReturn<Partial<T>>}
          onSubmit={handleSubmitStep}
          submitLabel={
            isLastStep ? (mode === "create" ? "Create" : "Update") : "Next"
          }
          onBack={currentStep > 0 ? handleBack : () => onOpenChange(false)}
        />
      </DialogContent>
    </Dialog>
  );
}
