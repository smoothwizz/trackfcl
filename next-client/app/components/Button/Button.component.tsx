import React from "react";

type ButtonVariant = "primary" | "primary-large" | "default" | "secondary";
type Props = {
  variant: ButtonVariant;
  label: string;
  handler: () => void;
  styles?: string;
  isDisabled?: boolean;
};

export default function Button({
  variant,
  label,
  handler,
  styles,
  isDisabled,
}: Props) {
  return (
    <button
      onClick={(e) => {
        e.preventDefault();
        handler();
      }}
      className={`${variantStyles(variant)} ${styles}`}
      disabled={isDisabled}
    >
      {label}
    </button>
  );
}

const variantStyles = (variant: ButtonVariant) => {
  const baseStyles = `rounded-md leading-tight px-6 py-3  text-white transition-colors ease-in`;
  const disabledStyles = ` disabled:opacity-50 disabled:pointer-events-none`;

  const primaryStyles = `${baseStyles} bg-cyan-500 hover:bg-cyan-600 focus:bg-cyan-600 ${disabledStyles} dark:bg-cyan-600 dark:hover:bg-cyan-700 dark:focus:bg-cyan-700`;
  const defaultStyles = `${baseStyles} bg-gray-900 hover:bg-cyan-800 focus:bg-gray-800
                        dark:bg-slate-700 dark:hover:bg-slate-600 dark:focus:bg-slate-600 ${disabledStyles}`;
  const secondaryStyles = `${baseStyles} bg-slate-800 not:disabled:hover:bg-slate-900 focus:bg-slate-900 ${disabledStyles}`;

  switch (variant) {
    case "primary":
      return primaryStyles;
    case "primary-large":
      return `${primaryStyles} text-2xl`;
    case "secondary":
      return secondaryStyles;

    default:
      return defaultStyles;
  }
};
