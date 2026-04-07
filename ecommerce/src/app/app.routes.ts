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
import { ProfileAddresses } from './pages/profile/profile-addresses/profile-addresses';
import { AddressForm } from './components/address/address-form/address-form';
import { EditProfileDetails } from './pages/profile/edit-profile-details/edit-profile-details';
import { UpdatePassword } from './pages/profile/update-password/update-password';

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
    canActivate : [authGuard],
    children: [
        {
          path: '',
          redirectTo: 'profile-details',
          pathMatch: 'full'
        },
        {
          path: 'profile-details',
          component: ProfileDetails,
          canActivate : [authGuard]
        },
        {
          path: 'profile-details/edit',
          component: EditProfileDetails,
          canActivate : [authGuard]
        },
        {
          path: 'update-password',
          component: UpdatePassword,
          canActivate : [authGuard]
        },
        {
          path: 'addresses',
          component: ProfileAddresses,
          canActivate : [authGuard]
        },
        {
            path: 'addresses/new',
            component: AddressForm,
            canActivate : [authGuard]
          },
          {
            path: 'addresses/edit/:id',
            component: AddressForm,
            canActivate : [authGuard]
          }
      ]
  }  
 
];
