import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsItemPageComponent } from './components/news-item-page/news-item-page.component';
import { NewsItemPageRoutingModule } from './news-item-page-routing.module';
import { NotFoundComponent } from './components/not-found/not-found.component';

@NgModule({
  declarations: [NewsItemPageComponent, NotFoundComponent],
  imports: [
    CommonModule,
    NewsItemPageRoutingModule
  ]
})
export class NewsItemPageModule { }
