interface ProductItem {
  Id: number;
  ProductName: string;
  CategoryId: number;
  ProductCode: string;
  UnitOfMeasure: string;
  productStatusId?: boolean | number;
  ProductStatusId?: boolean | number;
}

type ProductsResponse = ProductItem[];

export type { ProductItem, ProductsResponse };
