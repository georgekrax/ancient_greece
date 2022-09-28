import { useSafeLayoutEffect } from "@chakra-ui/react";
import throttle from "lodash.throttle";
import { useCallback, useState } from "react";

import { useMutationObservable } from "@lib/hooks";
import { isRef } from "@lib/size";

type PositionType = Pick<
  DOMRect,
  "top" | "bottom" | "left" | "right" | "width" | "height" | "x" | "y"
>;

export const usePosition = <T extends HTMLElement | null>(
  subject: T | React.RefObject<T>
): PositionType => {
  const [position, setPosition] = useState<PositionType>({
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    width: 0,
    height: 0,
    x: 0,
    y: 0,
  });

  // eslint-disable-next-line
  const handlePosition = useCallback(
    throttle(() => {
      const node = isRef(subject) ? subject.current : subject;
      setPosition(prev => ({ ...prev, ...node?.getBoundingClientRect().toJSON() }));
    }, 200),
    [subject, setPosition]
  );

  useSafeLayoutEffect(() => {
    window.addEventListener("resize", handlePosition);
    handlePosition();

    // Remove event listener on cleanup
    return () => window.removeEventListener("resize", handlePosition);
  }, [handlePosition]);

  useMutationObservable(subject, handlePosition);

  return position;
};
