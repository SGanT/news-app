import { Component, Input, OnInit, EventEmitter, Output, ViewChild, ElementRef, HostListener } from '@angular/core';
import { ILocalNewsItem } from 'src/app/interfaces/local-news';
import { INewsListItem } from 'src/app/interfaces/news';

@Component({
  selector: 'app-news-list',
  templateUrl: './news-list.component.html',
  styleUrls: ['./news-list.component.scss']
})
export class NewsListComponent implements OnInit {
  @Input('newsList')
  public newsList: INewsListItem[] = [];

  @Input()
  public localNewsList: ILocalNewsItem[] = [];

  @Output()
  public loadPage = new EventEmitter<void>();

  @ViewChild('listContainer')
  public listContainerRef!: ElementRef<HTMLDivElement>;

  constructor() { }

  ngOnInit(): void {
  }
  
  @HostListener('window:scroll', ['$event'])
  private onScroll(event: Event) {
    const loader = this.listContainerRef.nativeElement.getBoundingClientRect();
    let isInView = (
      loader.top >= 0 &&
      loader.left >= 0 &&
      loader.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
      loader.right <= (window.innerWidth || document.documentElement.clientWidth)

    );
    if (isInView) {
      this.loadPage.emit();
    }
  }

}
