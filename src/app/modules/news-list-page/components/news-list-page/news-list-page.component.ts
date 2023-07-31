import { Component, OnDestroy, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ILocalNewsItem } from 'src/app/interfaces/local-news';
import { INewsListItem } from 'src/app/interfaces/news';
import { EventBusService } from 'src/app/services/event-bus.service';
import { NewsService } from 'src/app/services/news.service';

@Component({
  selector: 'app-news-list-page',
  templateUrl: './news-list-page.component.html',
  styleUrls: ['./news-list-page.component.scss']
})
export class NewsListPageComponent implements OnInit, OnDestroy {
  public isPopupShown = false;
  public loadingPage = false;
  
  public _currentPage = 1;
  public set currentPage(n: number) {
    if (!this.loadingPage){
      this._currentPage = n;
      this.fetchNewsListItems(n);
    }
  }
  public get currentPage() {
    return this._currentPage;
  }
  
  public newsList: INewsListItem[] = [];
  public localNewsList: ILocalNewsItem[] = [];

  private subscriptions: Subscription[] = [];

  constructor(
    private eventBus: EventBusService,
  ) { }

  ngOnInit(): void {
    let localNewsList$ = this.eventBus.on('local-news/all-local-news', (result: ILocalNewsItem[]) => this.onLocalNewsLoaded(result));
    this.subscriptions.push(localNewsList$);

    let localNewsAdded$ = this.eventBus.on('local-news/news-item-added', (result: ILocalNewsItem[]) => this.getLocalNews());
    this.subscriptions.push(localNewsAdded$);
    
    let newsList$ = this.eventBus.on('news/news-list-page-loaded', (result: INewsListItem[]) => this.onNewsPageLoaded(result));
    this.subscriptions.push(newsList$);

    let isPopupShown$ = this.eventBus.on('header/show-popup', () => this.isPopupShown = true);
    this.subscriptions.push(isPopupShown$);

    let hidePopup$ = this.eventBus.on('add-news-popup/hide-popup', () => this.isPopupShown = false);
    this.subscriptions.push(hidePopup$);

    this.fetchNewsListItems(this.currentPage);
    this.getLocalNews();
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  public fetchNewsListItems(page: number) {
    this.eventBus.emit({
      type: 'news/fetch-news-list-page',
      value: page
    });

    this.loadingPage = true;
  }

  public getLocalNews() {
    this.eventBus.emit({
      type: 'local-news/get-news',
      value: null
    });
  }

  public onNewsPageLoaded(newsItems: INewsListItem[]) {
    this.newsList = this.newsList.concat(newsItems);
    this.loadingPage = false;
  }

  public onLocalNewsLoaded(items: ILocalNewsItem[]) {
    this.localNewsList = items;
    console.log(this.localNewsList)
  }

  public loadNextPage() {
    this.currentPage += 1;
  }

  public showPopup() {
    this.eventBus.emit({
      type: 'header/show-popup',
      value: null
    });
  }

}
