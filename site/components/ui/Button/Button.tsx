import cn from "clsx";
import { forwardRef, useRef } from "react";
import { mergeRefs } from "react-merge-refs";

import { LoadingDots } from "@components/ui";

import s from "./Button.module.css";

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  href?: string;
  className?: string;
  variant?: "flat" | "slim" | "ghost" | "naked";
  active?: boolean;
  type?: "submit" | "reset" | "button";
  Component?: string | React.JSXElementConstructor<any>;
  width?: string | number;
  loading?: boolean;
  disabled?: boolean;
};

// eslint-disable-next-line react/display-name
const Button = forwardRef<unknown, ButtonProps>((props, buttonRef) => {
  const {
    className,
    variant = "flat",
    children,
    active,
    width,
    loading = false,
    disabled = false,
    style = {},
    Component = "button",
    ...rest
  } = props;
  const ref = useRef<typeof Component>(null);

  const rootClassName = cn(
    s.root,
    {
      [s.ghost]: variant === "ghost",
      [s.slim]: variant === "slim",
      [s.naked]: variant === "naked",
      [s.loading]: loading,
      [s.disabled]: disabled,
    },
    className
  );

  return (
    <Component
      aria-pressed={active}
      data-variant={variant}
      className={rootClassName}
      disabled={disabled}
      style={{ width, ...style }}
      {...rest}
      ref={mergeRefs([ref, buttonRef])}
    >
      {children}
      {loading && (
        <i className="pl-2 m-0 flex">
          <LoadingDots />
        </i>
      )}
    </Component>
  );
});

export default Button;
