import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'news-list'
  },
  {
    path: 'news-list',
    loadChildren: () => import('./modules/news-list-page/news-list-page.module').then(m => m.NewsListPageModule)
  },
  {
    path: 'news-item',
    loadChildren: () => import('./modules/news-item-page/news-item-page.module').then(m => m.NewsItemPageModule)
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
