import { Component } from '@angular/core'
import { HackerNewsCardComponent } from '../hacker-news-card/hacker-news-card.component'

@Component({
  selector: 'app-hacker-news',
  standalone: true,
  imports: [HackerNewsCardComponent],
  templateUrl: './hacker-news.component.html',
  styleUrl: './hacker-news.component.scss',
})
export class HackerNewsComponent {}
