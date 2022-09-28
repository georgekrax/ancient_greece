import cn from "clsx";
import React from "react";

type Props = {
  className?: string;
  children?: any;
  el?: keyof HTMLElementTagNameMap;
  clean?: boolean;
};

const Container = ({
  el = "div",
  clean = false, // Full Width Screen
  className,
  children,
}: Props): ComponentElement => {
  const rootClassName = cn(className, {
    "mx-auto max-w-7xl px-6 w-full": !clean,
  });

  let Component: React.ComponentType<React.HTMLAttributes<HTMLDivElement>> = el as any;

  return <Component className={rootClassName}>{children}</Component>;
};

export default Container;
