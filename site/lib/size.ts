export const isRef = (ref: any): ref is React.RefObject<any> => {
  return typeof ref === "object" && ref !== null && "current" in ref;
};