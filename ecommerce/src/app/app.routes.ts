import { Routes } from '@angular/router';
import { Home } from './pages/home/home';
import { CategoryComponent } from './pages/category/category';
import { ProductList } from './pages/product-list/product-list';
import { ProductDetails } from './pages/product-details/product-details';
import { LoginComponent } from './pages/login/login';
import { Basket } from './pages/basket/basket';
import { Register } from './pages/register/register';
import { authGuard } from './guards/auth.guard';
import { CheckoutAddresses } from './pages/checkout/checkout-addresses/checkout-addresses';
import { Profile } from './pages/profile/profile';
import { ProfileDetails } from './pages/profile/profile-details/profile-details';

export const routes: Routes = [
  {
    path: 'home',
    component : Home,
  },
  {
    path: 'catalog/:id',
    component : CategoryComponent
  },
  {
    path: 'catalog/:id/:subcatid',
    component : ProductList
  },
  {
    path: 'catalog/:id/products/:sku',
    component : ProductDetails
  },
  {
    path: 'login',
    component : LoginComponent
  },
  {
    path : 'basket',
    component : Basket
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'register',
    component : Register
  },
  {
    path: 'checkout-addresses',
    component : CheckoutAddresses,
    canActivate: [authGuard] 
  },
  {
    path:'profile',
    component : Profile,
    canActivate : [authGuard]
  },
  {
    path:'profile-details',
    component : ProfileDetails,
    canActivate : [authGuard]
  }
 
];
