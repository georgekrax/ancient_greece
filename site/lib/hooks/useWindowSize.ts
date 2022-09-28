import { useCallback, useEffect, useRef, useState } from "react";

type SizeType = {
  width: number;
  height: number;
};

type GetWindowSizeReturn = {
  viewport: SizeType;
  window: SizeType;
};

const getWindowSize = (): GetWindowSizeReturn => {
  const hasWindow = typeof window !== "undefined";
  const hasDocument = typeof document !== "undefined";

  const windowSize = {
    width: hasWindow ? window.innerWidth : 0,
    height: hasWindow ? window.innerHeight : 0,
  };
  let viewportSize = {
    width: hasDocument
      ? visualViewport?.width || document.documentElement.clientWidth || document.body.clientWidth
      : 0,
    height: hasDocument
      ? visualViewport?.height ||
        document.documentElement.clientHeight ||
        document.body.clientHeight
      : 0,
  };
  viewportSize = {
    width: Math.round(viewportSize.width),
    height: Math.round(viewportSize.height),
  };
  return { window: windowSize, viewport: viewportSize };
};

type IsResizingState = boolean | null;

type UseWindowSizeParams = {
  trackIsResizing?: boolean;
};

type UseWindowSizeReturn = GetWindowSizeReturn & {
  isResizing?: IsResizingState;
};

export const useWindowSize = (params: UseWindowSizeParams = {}): UseWindowSizeReturn => {
  const [size, setSize] = useState<GetWindowSizeReturn>(getWindowSize());
  const [isResizing, setIsResizing] = useState<IsResizingState>(
    params.trackIsResizing ? false : null
  );

  const timer = useRef<NodeJS.Timeout | null>(null);

  const hasWindow = typeof window !== "undefined" && typeof visualViewport !== "undefined";

  const handleResize = useCallback(() => {
    const newSize = getWindowSize();
    setSize(newSize);

    if (timer.current) clearTimeout(timer.current);
    setIsResizing(true);
    timer.current = setTimeout(() => setIsResizing(false), 200);
  }, [setSize]);

  const setScrollbarWidth = useCallback(() => {
    const {
      window: { width: wWidth },
      viewport: { width: vWidth },
    } = size;
    const scrollbarWidth = wWidth - vWidth;

    if (scrollbarWidth === 0) return;

    document.documentElement.style.setProperty("--scrollbar-width", scrollbarWidth + "px");

    // eslint-disable-next-line
  }, [size.window.width, size.viewport.width, size.viewport.height]);

  useEffect(() => {
    if (hasWindow) {
      setScrollbarWidth();
      window.addEventListener("resize", handleResize);
      visualViewport!.addEventListener("resize", handleResize);
    }

    return () => {
      if (hasWindow) {
        window.removeEventListener("resize", handleResize);
        visualViewport!.removeEventListener("resize", handleResize);
      }
    };
  }, [hasWindow, setScrollbarWidth, handleResize]);

  return { ...size, isResizing };
};
