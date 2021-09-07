import React from "react";

export type ButtonProps = {
  /**
   * Button varient
   * 'primary', 'secondary', 'warn', 'outline-primary', 'outline-secondary', 'outline-warn', 'flat'
   */
  varient?:
    | ""
    | "primary"
    | "secondary"
    | "warn"
    | "outline"
    | "outline-primary"
    | "outline-secondary"
    | "outline-warn"
    | "flat";
  /**
   * Button icons
   */
  size?: "sm" | "md" | "full";
  /**
   * Button icons
   */
  children?: React.ReactNode;
  className?: string;
  rounded?: boolean;
} & React.ButtonHTMLAttributes<HTMLButtonElement>;

const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  (
    {
      varient = "",
      size = "md",
      children,
      rounded = true,
      ...props
    }: ButtonProps,
    ref
  ) => {
    const sizeStyle =
      size === "sm"
        ? "py-1 px-1"
        : size === "full"
        ? "w-full py-2 px-4"
        : "py-2 px-4  font-medium";
    return (
      <button
        ref={ref}
        {...props}
        className={`${sizeStyle} inline-flex h-full justify-center text-sm focus:ring-1 focus:ring-primary-200 transition-colors duration-300
          btn-${varient} ${props.className} ${rounded && "rounded-md"}
        `}
      >
        {children}
      </button>
    );
  }
);

export default Button;
