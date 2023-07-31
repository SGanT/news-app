import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import { NewsListPageComponent } from "./components/news-list-page/news-list-page.component";

const routes: Routes = [
  {
    path: "",
    component: NewsListPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class NewsListPageRoutingModule {
}