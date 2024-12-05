import { Routes } from '@angular/router'
import { HackerNewsComponent } from './hacker-news/hacker-news.component'

export const routes: Routes = [
  { path: '', redirectTo: 'hacker-news', pathMatch: 'full' },
  { path: 'hacker-news', component: HackerNewsComponent },
]
