import { CartComponent } from './cart/cart.component';
import { ProductDetailsComponent } from './product-details/product-details.component';
import { LoginComponent } from './login/login.component';
import { Component } from '@angular/core';
import { Routes } from '@angular/router';
import { RegisterComponent } from './register/register.component';
import { ProductListComponent } from './product-list/product-list.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';

export const routes: Routes = [

    {
        path: '',
        component: ProductListComponent,
        title: "Products",
        pathMatch: "full"

    },
    {
        path: 'register',
        component: RegisterComponent,
        title: "Register",
    }
    ,
    {
        path: 'login',
        component: LoginComponent,
        title: "Login",
    },
    {
        path: 'product-details/:Id',
        component: ProductDetailsComponent,
        title: "Product Details"
    },
    {
        path: 'cart',
        component: CartComponent,
        title: "Shopping Cart"
    },
    {
        path: '**',
        component: PageNotFoundComponent,
        title: "404 Error"
    }
    

];
