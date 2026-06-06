// * --start-- productCategories.ts ----
type ProductCategoriesResponse = {
  id: string;
  name: string;
  description: string;
}[];

type ProductsResponse = {
  id: string;
  productName: string;
  productCode: string;
  unitOfMeasure: string;
  productStatusId: boolean;
  categoryId: string;
}[];
// * --end-- productCategories.ts ----

export type { ProductCategoriesResponse, ProductsResponse };
