import { Component, OnDestroy, OnInit, ViewEncapsulation } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs';
import { INewsItem } from 'src/app/interfaces/news';
import { EventBusService } from 'src/app/services/event-bus.service';

@Component({
  selector: 'app-news-item-page',
  templateUrl: './news-item-page.component.html',
  styleUrls: ['./news-item-page.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class NewsItemPageComponent implements OnInit, OnDestroy {
  private subscriptions: Subscription = new Subscription();

  public uri = '';
  public page: INewsItem | null = null;

  constructor(
    private activatedRoute: ActivatedRoute,
    private eventBus: EventBusService
  ) { }

  ngOnInit(): void {
    let rMap$ = this.activatedRoute.paramMap.subscribe((paramMap: ParamMap) => {
      let category =paramMap.get('newsCategory');
      let newsItem =paramMap.get('newsItem');
      this.uri = category + '/' + newsItem;
      console.log(this.uri);
    });
    this.subscriptions.add(rMap$);

    let pageContents$ = this.eventBus.on('news/news-item-loaded', (page: INewsItem) => this.page = page);
    this.subscriptions.add(pageContents$);

    this.fetchPage();
  }

  ngOnDestroy(): void {
    this.subscriptions.unsubscribe();
  }

  public fetchPage() {
    this.eventBus.emit({
      type: 'news/fetch-news-item',
      value: this.uri
    });
  }

}
