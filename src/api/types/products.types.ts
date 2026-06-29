// * --start-- productCategories.ts ----
type ProductCategoriesResponse = {
  id: string;
  name: string;
  description: string;
}[];
// * --end-- productCategories.ts ----

// * --start-- getProducts.ts ----
type ProductStatus = "null" | "true" | "false";
interface GetProductsQueries {
  isActive: ProductStatus;
}
interface AdminProduct {
  id: string;
  productName: string;
  productCode: string;
  unitOfMeasure: string;
  productStatusId: boolean;
  categoryId: string;
}
type ProductsResponse = AdminProduct[];
// * --end-- getProducts.ts ----

export type {
  ProductCategoriesResponse,
  ProductsResponse,
  GetProductsQueries,
  ProductStatus,
  AdminProduct,
};
