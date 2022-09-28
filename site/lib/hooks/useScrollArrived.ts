import throttle from "lodash.throttle";
import { useEffect, useState } from "react";

type UseScrollArrivedParams = {
  offset?: number;
  element?: HTMLElement | null;
};

type HasArrivedStateType = boolean | null;

type UseScrollArrivedReturnType = [number, HasArrivedStateType];

export const useScrollArrived = (
  params: UseScrollArrivedParams = {}
): UseScrollArrivedReturnType => {
  const [scrollY, setScrollY] = useState(0);
  const [hasArrived, setHasArrived] = useState<HasArrivedStateType>(
    params.offset != null ? false : null
  );

  useEffect(() => {
    const element = params.element || document.documentElement;

    const handleScroll = throttle(() => {
      let { scrollTop } = element;
      scrollTop = Math.ceil(scrollTop);

      setScrollY(scrollTop);

      if (params.offset != null) {
        const scrolled = scrollTop >= (params.offset || 0);

        if (hasArrived !== scrolled) setHasArrived(scrolled);
      }
    }, 200);

    element.addEventListener("scroll", handleScroll);
    return () => {
      element.removeEventListener("scroll", handleScroll);
    };
  }, [params.element, params.offset, hasArrived]);

  return [scrollY, hasArrived];
};
