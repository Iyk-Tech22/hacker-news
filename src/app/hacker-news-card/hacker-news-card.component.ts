import { Component, inject, OnInit } from '@angular/core'
import { HackerNewsService } from '../common/hacker-news.service'
import { AsyncPipe } from '@angular/common'
import { combineLatest, map, Observable, switchMap, tap } from 'rxjs'
import { IHackerNewsResponse } from '../common/hacker-news.interface'
import { timeStampToDate } from '../common/utils'

@Component({
  selector: 'app-hacker-news-card',
  standalone: true,
  imports: [AsyncPipe],
  templateUrl: './hacker-news-card.component.html',
  styleUrl: './hacker-news-card.component.scss',
})
export class HackerNewsCardComponent implements OnInit {
  loadHackerNews$!: Observable<IHackerNewsResponse>
  timeStampConverter = timeStampToDate

  private readonly hackerNewsService = inject(HackerNewsService)
  private readonly page$ = this.hackerNewsService.page$
  private readonly limit$ = this.hackerNewsService.limit$
  private readonly search$ = this.hackerNewsService.search$

  ngOnInit(): void {
    this.loadHackerNews$ = combineLatest([this.page$, this.limit$, this.search$]).pipe(
      switchMap(([page, limit, search]) =>
        this.hackerNewsService.fetchHackerNews({ page, limit, search }).pipe(
          tap((response) => {
            const total = response.data.pagination.totalStories
            this.hackerNewsService.total$.next(total)
          })
        )
      )
    )
  }
}
