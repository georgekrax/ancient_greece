import { useCallback, useEffect, useRef } from "react";

const STOP_ANIMATIONS_CLASSNAME = "stop-animations-on-resize";

export const useDisableAnimationsWhileResizing = () => {
  const timer = useRef<NodeJS.Timeout | null>(null);

  const hasWindow = typeof window !== "undefined";

  const handleResize = useCallback(() => {
    document.body.classList.add(STOP_ANIMATIONS_CLASSNAME);
    if (timer.current) clearTimeout(timer.current);
    timer.current = setTimeout(() => document.body.classList.remove(STOP_ANIMATIONS_CLASSNAME), 200);
  }, []);

  useEffect(() => {
    // handleResize();
    if (hasWindow) window.addEventListener("resize", handleResize);

    return () => {
      if (hasWindow) window.removeEventListener("resize", handleResize);
    };
  }, [hasWindow, handleResize]);
};
