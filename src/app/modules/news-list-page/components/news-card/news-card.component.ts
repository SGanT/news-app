import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { ILocalNewsItem } from 'src/app/interfaces/local-news';
import { INewsItem, INewsListItem } from 'src/app/interfaces/news';

@Component({
  selector: 'app-news-card',
  templateUrl: './news-card.component.html',
  styleUrls: ['./news-card.component.scss']
})
export class NewsCardComponent implements OnInit {
  @Input('newsItem')
  public card: INewsItem | ILocalNewsItem | INewsListItem | null = null;

  @Input('mock')
  public mockMode = false;

  constructor(
    private router: Router
  ) {}

  ngOnInit(): void {
  }

  public navigate(item: INewsItem | ILocalNewsItem | INewsListItem | null) {
    if (item === null) return;
    else
    if (item.url)
    this.router.navigate(['news-item'].concat(item.url.split('/')), {});
  }

}
