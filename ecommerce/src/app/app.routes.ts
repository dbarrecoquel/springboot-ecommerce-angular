import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'home',
    loadComponent: () => import('./pages/home/home').then((m) => m.Home),
  },
  {
    path: 'catalog/:id',
    loadComponent: () => import('./pages/category/category')
      .then(m => m.CategoryComponent)
  },
  {
    path: 'catalog/:id/:subcatid',
    loadComponent: () => import('./pages/product-list/product-list')
      .then(m => m.ProductList)
  },
  {
    path: 'catalog/:id/products/:sku',
    loadComponent: () => import('./pages/product-details/product-details')
      .then(m => m.ProductDetails)
  },
  {
    path: 'login',
    loadComponent: () => import('./pages/login/login')
      .then(m => m.LoginComponent)
  },
  {
    path : 'basket',
    loadComponent: () => import('./pages/basket/basket')
    .then(m => m.Basket)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
 
];
