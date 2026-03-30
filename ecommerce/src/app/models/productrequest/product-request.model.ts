export interface ProductsRequest {
    page : number,
    size : number,
    sortBy? : string,
    direction? : string,
    keyword? : string,
    minPrice? : number,
    maxPrice? : number,
    categoryId : number,
    subCategoryId : number

}