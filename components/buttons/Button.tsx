import * as React from "react";
import cx from "classnames";

export type ButtonBaseProps = {
  styleType?: "primary" | "secondary" | "primary-outline" | "secondary-outline" | undefined;
};

export type ButtonProps = ButtonBaseProps & React.ButtonHTMLAttributes<HTMLButtonElement>;

export default function Button({ styleType = "primary", disabled, type = "button", children, style, className, ...otherProps }: ButtonProps) {
  return (
    <button
      style={style}
      // eslint-disable-next-line react/button-has-type
      type={type}
      className={cx(
        "px-4 py-2 rounded-md text-white transition duration-150 ease-in-out",
        {
          "bg-base-light dark:bg-dark-base-light border-transparent border-1 hover:border-accent-default active:brightness-75":
            styleType === "primary",
          "opacity-50": disabled,
        },
        className
      )}
      disabled={disabled}
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...otherProps}
    >
      {children}
    </button>
  );
}
