import { useEffect } from "react";

import { getRandomPairOfColors } from "@lib/colors";
import { useUI } from "@lib/contexts";

import { useLocalStorage } from "./useLocalStorage";

export const useUserAvatar = (name = "userAvatar") => {
  const { userAvatar, setUserAvatar } = useUI();

  const { getLocalStorageValue, setLocalStorageValue } = useLocalStorage<string>({
    key: name,
  });

  useEffect(() => {
    const val = getLocalStorageValue();
    if (!userAvatar && val) {
      // Get bg from localStorage and push it to the context.
      setUserAvatar(val);
    }
    if (!val) {
      // bg not set locally, generating one, setting localStorage and context to persist.
      const bg = getRandomPairOfColors();
      const val = `linear-gradient(140deg, ${bg[0]}, ${bg[1]} 100%)`;
      setLocalStorageValue(val);
      setUserAvatar(val);
    }
  }, [userAvatar, setUserAvatar, getLocalStorageValue, setLocalStorageValue]);

  return {
    userAvatar,
    setUserAvatar,
  };
};
