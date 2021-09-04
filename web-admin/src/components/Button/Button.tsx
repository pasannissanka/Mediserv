import * as React from "react";

export interface ButtonProps {
  /**
   * Is this the principal call to action on the page?
   */
  primary?: boolean;
  /**
   * Button contents
   */
  label: string;
  /**
   * Optional click handler
   */
  onClick?: () => void;
  /**
   * Button icons
   */
  children?: React.ReactNode;
}

/**
 * Primary UI component for user interaction
 */
export const Button: React.FC<ButtonProps> = ({
  primary = false,
  label,
  children,
  ...props
}) => {
  return (
    <button
      type='button'
      className={`shadow rounded-lg inline-flex items-center  focus:outline-none focus:shadow-outline font-semibold py-2 px-2 md:px-5 text-sm
      ${
        primary
          ? "bg-yellow-500 hover:bg-yellow-600 text-white"
          : "bg-white text-gray-500 hover:text-yellow-500"
      }
      `}
      {...props}
    >
      <span
        className={`${children !== undefined ? "hidden md:block mr-2" : ""}`}
      >
        {label}
      </span>
      {children}
    </button>
  );
};
