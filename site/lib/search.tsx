import { NextRouter } from "next/dist/client/router";
import { useEffect, useState } from "react";

import getSlug from "./get-slug";

export function useSearchMeta(asPath: string) {
  const [pathname, setPathname] = useState<string>("/search");
  const [category, setCategory] = useState<string | undefined>();
  const [brand, setBrand] = useState<string | undefined>();

  useEffect(() => {
    // Only access asPath after hydration to avoid a server mismatch
    const path = asPath.split("?")[0];
    const parts = path.split("/");

    let c = parts[2];
    let b = parts[3];

    if (c === "designers") {
      c = parts[4];
    }

    if (path !== pathname) setPathname(path);
    if (c !== category) setCategory(c);
    if (b !== brand) setBrand(b);
  }, [asPath, pathname, category, brand]);

  return { pathname, category, brand };
}

// Removes empty query parameters from the query object
export const filterQuery = (query: any) =>
  Object.keys(query).reduce<any>((obj, key) => {
    if (query[key]?.length) {
      obj[key] = query[key];
    }
    return obj;
  }, {});

export const getCategoryPath = (path: string, brand?: string) => {
  const category = getSlug(path);

  return `/search${brand ? `/designers/${brand}` : ""}${category ? `/${category}` : ""}`;
};

export const getDesignerPath = (path: string, category?: string) => {
  const designer = getSlug(path).replace(/^brands/, "designers");

  return `/search${designer ? `/${designer}` : ""}${category ? `/${category}` : ""}`;
};

type AddFilterQueryOptions = {
  key: "size" | "color";
  newVal: string;
};

export const toggleFilterQuery = (router: NextRouter, { key, newVal }: AddFilterQueryOptions) => {
  const val = router.query[key]?.toString().split(",") ?? [];

  if (val.includes(newVal)) {
    const idx = val.indexOf(newVal);
    if (idx > -1) val.splice(idx, 1);
  } else {
    val.push(newVal);
  }
  
  return filterQuery({ ...router.query, [key]: val.join(",") });
};
