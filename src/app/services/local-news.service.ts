import { Injectable } from '@angular/core';
import { ICreateLocalNewsItemDto, ILocalNewsItem } from '../interfaces/local-news';
import { EventBusService } from './event-bus.service';

@Injectable({
  providedIn: 'root'
})
export class LocalNewsService {
  private localNewsItems: ILocalNewsItem[] = [];

  constructor(
    private eventBus: EventBusService
  ) {
    let storage = localStorage.getItem('local-news');
    if (storage) {
      this.localNewsItems = JSON.parse(storage);
    }
    this.eventBus.on('add-news-popup/create-local-news', (DTO: ICreateLocalNewsItemDto) => this.addLocalNewsItem(DTO));
    
    this.eventBus.on('local-news/get-news', (DTO: ICreateLocalNewsItemDto) => this.eventBus.emit({
      type: 'local-news/all-local-news',
      value: this.getLocalNews()
    }));
  }

public getLocalNews() {
    return this.localNewsItems;
  }

  public addLocalNewsItem(DTO: ICreateLocalNewsItemDto) {
    let id = this.localNewsItems.length;

    const item: ILocalNewsItem = {
      id,
      title: DTO.title,
      text: DTO.text,
      titleImageUrl: DTO.titleImageUrl,
      publishedDate: new Date(Date.now()),
      url: ''
    }
    this.localNewsItems.unshift(item);
    this.store();
    this.eventBus.emit({
      type: 'local-news/news-item-added',
      value: item
    })
    console.log(this.localNewsItems);
  }

  public store() {
    const json = JSON.stringify(this.localNewsItems);
    localStorage.setItem('local-news', json);
  }

}
