import { Grid } from "@chakra-ui/react";
import Link from "next/link";

import type { Product } from "@commerce/types/product";
import { getCategoryPath, getDesignerPath } from "@lib/search";
import { ProductCard } from "@modules/product";

import s from "./AllProductsGrid.module.css";

type Props = {
  categories?: any;
  brands?: any;
  products?: Product[];
};

const HomeAllProductsGrid = ({ categories, brands, products = [] }: Props): ComponentElement => {
  return (
    <div className={s.root}>
      <div className={s.asideWrapper}>
        <div className={s.aside}>
          <ul className="mb-10">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getCategoryPath("")}>All Categories</Link>
            </li>
            {categories.map((cat: any) => (
              <li key={cat.path} className="py-1 text-accent-8 text-base">
                <Link href={getCategoryPath(cat.path)}>{cat.name}</Link>
              </li>
            ))}
          </ul>
          <ul className="">
            <li className="py-1 text-base font-bold tracking-wide">
              <Link href={getDesignerPath("")}>All Designers</Link>
            </li>
            {brands.flatMap(({ node }: any) => (
              <li key={node.path} className="py-1 text-accent-8 text-base">
                <Link href={getDesignerPath(node.path)}>{node.name}</Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <Grid flex={1}>
        {products.map(product => (
          <ProductCard
            key={product.path}
            product={product}
            imgProps={{
              width: 480,
              height: 480,
            }}
          />
        ))}
      </Grid>
    </div>
  );
};

export default HomeAllProductsGrid;
