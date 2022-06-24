import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { HandleOrderComponent } from './pages/handle-order/handle-order.component';


const routes: Routes = [
  {
    path: 'handle-order',
    component: HandleOrderComponent
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule {}
