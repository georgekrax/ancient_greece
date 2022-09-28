import { getCss, StyleObjectOrFn, systemProps, useTheme } from "@chakra-ui/react";
import { useMemo } from "react";

type ToCSSParams = Pick<Parameters<typeof getCss>["0"], "pseudos" | "configs"> & {
  styles: StyleObjectOrFn;
};

const toCSS =
  ({ styles, pseudos, configs = systemProps }: ToCSSParams) =>
  (theme: any) => {
    const cssFn = getCss({ theme, pseudos, configs });
    return cssFn(styles);
  };

export const useCSS = (
  styles: ToCSSParams["styles"]
): Record<string, any> & {
  theme: ReturnType<typeof useTheme>;
} => {
  const theme = useTheme();
  const cssStyles = useMemo(() => toCSS({ styles })(theme), [styles, theme]);
  return { ...cssStyles, theme };
};
