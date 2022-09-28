import { createIcon, Path } from "@lib/icon";

export const Cross = createIcon({
  displayName: "MinusIcon",
  defaultProps: { shapeRendering: "geometricPrecision" },
  path: (
    <>
      <Path d="M6.343 17.657a1 1 0 010-1.414l9.9-9.9a1 1 0 111.414 1.414l-9.9 9.9a1 1 0 01-1.414 0z" />
      <Path d="M17.657 17.657a1 1 0 01-1.414 0l-9.9-9.9a1 1 0 111.414-1.414l9.9 9.9a1 1 0 010 1.414z" />
    </>
  ),
});
