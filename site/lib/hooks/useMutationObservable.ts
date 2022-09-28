// https://blog.logrocket.com/guide-to-custom-react-hooks-with-mutationobserver/

import { isRef } from "@lib/size";
import { useEffect, useState } from "react";

const DEFAULT_OPTIONS = {
  config: { attributes: true, childList: true, subtree: true },
};

export const useMutationObservable = <T extends HTMLElement | null>(
  subject: T | React.RefObject<T>,
  cb?: MutationCallback,
  options = DEFAULT_OPTIONS
) => {
  const [observer, setObserver] = useState<MutationObserver | undefined>();

  useEffect(() => {
    if (!cb || typeof cb !== "function") {
      console.warn("You must provide a valida callback function, instead you've provided " + cb);
      return;
    }
    const obs = new MutationObserver(cb);
    setObserver(obs);
  }, [cb, options, setObserver]);

  useEffect(() => {
    const targetEl = isRef(subject) ? subject.current : subject;
    if (!observer || !targetEl) return;
    const { config } = options;
    observer.observe(targetEl, config);
    return () => {
      if (observer) observer.disconnect();
    };
  }, [observer, subject, options]);
};
