import { Injectable } from '@angular/core';
import { BaseApiService } from './base-api.service';
import { INewsItem, INewsListItem } from '../interfaces/news';
import { EventBusService, IEventData } from './event-bus.service';
import { HttpClient } from '@angular/common/http';
import { INewsItemResponseDto, INewsListResponseDto } from '../interfaces/news-api';
import { map, mapTo, pluck, tap } from 'rxjs/operators';
import { Observable } from 'rxjs';
import { ApiObserver } from '../shared/default-api-observer';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends BaseApiService {
  
  private _pageSize = 10;
  public get pageSize() {
    return this._pageSize;
  }
  public set pageSize(n: number) {
    this._pageSize = n;
    this.eventBus.emit({
      type: 'news/page-size-changed',
      value: n
    });
  }

  private categories = new Set<string>();
  
  constructor(
    private eventBus: EventBusService,
    private http: HttpClient
  ) {
    super();
    if (window.innerWidth > 1920) this._pageSize = 12;
    this.eventBus.on('news/fetch-news-list-page', (event: number) => this.fetchNewsListPage(event));
    this.eventBus.on('news/fetch-news-item', (uri: string) => this.fetchNewsItem(uri));
   }

   public fetchNewsListPage(page: number) {
    return this.http.get<INewsListResponseDto>( this.route(['news', page, this.pageSize]) )
    .pipe(
      pluck('news'),
      map(list => {
        return list.map(i => ({
          id: i.id,
          title: i.title,
          description: i.description,
          publishedDate: new Date(i.publishedDate),
          url: i.url,
          fullUrl: i.fullUrl,
          titleImageUrl: i.titleImageUrl,
          categoryType: i.categoryType
        }))
      })
    )
    .subscribe(
      new ApiObserver((result: any) => this.eventBus.emit({
        type: 'news/news-list-page-loaded',
        value: result
      }))
    );
   }

   public fetchNewsItem(uri: string) {
    return this.http.get<INewsItemResponseDto>( this.route(['news', 'item', uri]) )
    .pipe(
      map(item => ({
          id: item.id,
          title: item.title,
          description: item.description,
          publishedDate: new Date(item.publishedDate),
          url: item.url,
          fullUrl: item.fullUrl,
          titleImageUrl: item.titleImageUrl,
          categoryType: item.categoryType,
          text: item.text
      }))
    )
    .subscribe(
      new ApiObserver((result: any) => this.eventBus.emit({
        type: 'news/news-item-loaded',
        value: result
      }))
    );
   }
}
