// * --start-- productCategories.ts ----
type ProductCategoriesResponse = {
  id: string;
  name: string;
  description: string;
}[];
// * --end-- productCategories.ts ----

// * --start-- getProducts.ts ----
type ProductStatus = "inActive" | "active" | "all";
interface GetProductsParams {
  productStatus: ProductStatus;
}
type ProductsResponse = {
  id: string;
  productName: string;
  productCode: string;
  unitOfMeasure: string;
  productStatusId: boolean;
  categoryId: string;
}[];
// * --end-- getProducts.ts ----

export type {
  ProductCategoriesResponse,
  ProductsResponse,
  GetProductsParams,
  ProductStatus,
};
