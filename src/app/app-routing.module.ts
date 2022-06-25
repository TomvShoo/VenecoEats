import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

import { canActivate, redirectUnauthorizedTo, redirectLoggedInTo } from '@angular/fire/auth-guard';
import { LoginPage } from './pages/login/login.page';

const redirectUnauthorizedToLogin = () =>
  redirectUnauthorizedTo(['/']);


const routes: Routes = [
  {
    path: '',
    loadChildren: () => import('./pages/login/login.module').then(m => m.LoginPageModule)
  },
  {
    path: 'chat',
    //...canActivate(redirectUnauthorizedToLogin),
    loadChildren: () => import('./pages/chat/chat.module').then(m => m.ChatPageModule)
  },



];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
