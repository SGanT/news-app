import {NgModule} from "@angular/core";
import {CommonModule} from "@angular/common";
import {RouterModule, Routes} from "@angular/router";
import { NewsItemPageComponent } from "./components/news-item-page/news-item-page.component";
import { NotFoundComponent } from "./components/not-found/not-found.component";

const routes: Routes = [
  {
    path: "",
    component: NotFoundComponent,
  },
  {
    path: ":newsCategory",
    component: NotFoundComponent,
  },
  {
    path: ":newsCategory/:newsItem",
    component: NewsItemPageComponent,
  },
];

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
})
export class NewsItemPageRoutingModule {
}