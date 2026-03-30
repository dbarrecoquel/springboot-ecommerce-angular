import { CatalogCategory } from './catalogcategory.model';

export interface CategoryResponse {
  category: CatalogCategory;
  subCategories: CatalogCategory[];
  breadcrumb: CatalogCategory[];
}