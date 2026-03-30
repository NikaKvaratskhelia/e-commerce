"use client";

import { forwardRef, InputHTMLAttributes } from "react";
import { useFormContext } from "react-hook-form";
import { CheckoutFormValues } from "../../services/validations/checkoutValidation";

type Props = InputHTMLAttributes<HTMLInputElement> & {
  id: keyof CheckoutFormValues;
  label: string;
};

export const Input = forwardRef<HTMLInputElement, Props>(
  ({ label, id, ...rest }, ref) => {
    const {
      register,
      formState: { errors },
    } = useFormContext<CheckoutFormValues>();

    const errorMessage = errors[id]?.message;
    const { ref: registerRef, ...registerRest } = register(id);

    return (
      <div className="flex flex-col gap-3 flex-1">
        <label
          htmlFor={id}
          className="text-sm leading-3 font-bold text-(--neutral-light-grey)"
        >
          {label}
        </label>
        <input
          id={id}
          className={`px-4 py-2 rounded-md border ${
            errorMessage ? "border-red-500" : "border-[#cbcbcb]"
          }`}
          ref={(node) => {
            registerRef(node);
            if (typeof ref === "function") ref(node);
            else if (ref) ref.current = node;
          }}
          {...registerRest}
          {...rest}
        />
        {errorMessage && (
          <p className="text-xs text-red-500">{errorMessage as string}</p>
        )}
      </div>
    );
  },
);

Input.displayName = "Input";
