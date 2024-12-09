import { Component, inject, OnInit } from '@angular/core'
import {
  combineLatest,
  debounceTime,
  distinctUntilChanged,
  map,
  Observable,
  switchMap,
  tap,
} from 'rxjs'
import { HackerNewsService } from '../common/hacker-news.service'
import { AsyncPipe } from '@angular/common'

import { FormControl, ReactiveFormsModule } from '@angular/forms'

interface IHackerNewsData {
  id: number
  title: string
  link: string | null
}

@Component({
  selector: 'app-hacker-news',
  standalone: true,
  imports: [AsyncPipe, ReactiveFormsModule],
  templateUrl: './hacker-news.component.html',
  styleUrl: './hacker-news.component.scss',
})
export class HackerNewsComponent implements OnInit {
  loadHackerNews$!: Observable<IHackerNewsData[]>
  currentPage = 0
  totalPages = 0

  readonly searchCtrl = new FormControl()
  private readonly hackerNewsService = inject(HackerNewsService)
  readonly page$ = this.hackerNewsService.page$
  readonly limit$ = this.hackerNewsService.limit$
  readonly search$ = this.hackerNewsService.search$

  ngOnInit(): void {
    this.loadHackerNews$ = combineLatest([this.page$, this.limit$, this.search$]).pipe(
      switchMap(([page, limit, search]) =>
        this.hackerNewsService.fetchHackerNews({ page, limit, search }).pipe(
          tap((response) => {
            this.totalPages = response.data.pagination.totalPages
          }),
          map((res) => {
            const stories = res.data.stories
            return stories.map((story) => {
              return { id: story.id, title: story.title, link: story?.url }
            })
          })
        )
      )
    )

    this.searchCtrl.valueChanges
      .pipe(
        debounceTime(300),
        distinctUntilChanged(),
        tap((search: string) => {
          if (!search || search.length > 3) this.hackerNewsService.search$.next(search)
        })
      )
      .subscribe()
  }

  prevPage(): void {
    if (this.currentPage < 2) return
    this.page$.next(--this.currentPage)
  }

  nextPage(): void {
    if (this.currentPage === this.totalPages) return
    this.page$.next(++this.currentPage)
  }
}
