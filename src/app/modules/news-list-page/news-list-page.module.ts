import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NewsListComponent } from './components/news-list/news-list.component';
import { NewsListPageComponent } from './components/news-list-page/news-list-page.component';
import { NewsListPageRoutingModule } from './news-list-page-routing.module';
import { NewsCardComponent } from './components/news-card/news-card.component';
import { AddNewsPopupComponent } from './components/add-news-popup/add-news-popup.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [NewsListComponent, NewsListPageComponent, NewsCardComponent, AddNewsPopupComponent],
  imports: [
    CommonModule,
    NewsListPageRoutingModule,
    ReactiveFormsModule
  ]
})
export class NewsListPageModule { }
