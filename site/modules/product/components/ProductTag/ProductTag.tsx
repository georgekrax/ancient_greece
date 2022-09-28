import cn from "clsx";

import s from "./ProductTag.module.css";

type Props = {
  className?: string;
  name: string;
  price: string;
  fontSize?: number;
};

const ProductTag = ({ name, price, className = "", fontSize = 32 }: Props): ComponentElement => {
  return (
    <div className={cn(s.root, className)}>
      <h3 className={s.name}>
        <span
          className={cn({ [s.fontsizing]: fontSize < 32 })}
          style={{
            fontSize: `${fontSize}px`,
            lineHeight: `${fontSize}px`,
          }}
        >
          {name}
        </span>
      </h3>
      <div className={s.price}>{price}</div>
    </div>
  );
};

export default ProductTag;
