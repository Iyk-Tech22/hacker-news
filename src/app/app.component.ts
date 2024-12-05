import { Component, inject, OnInit } from '@angular/core'
import { MatButtonModule } from '@angular/material/button'
import { MatIconModule } from '@angular/material/icon'
import { MatToolbarModule } from '@angular/material/toolbar'
import { RouterLink, RouterOutlet } from '@angular/router'
import { FlexModule } from '@ngbracket/ngx-layout/flex'
import { MatInputModule } from '@angular/material/input'
import { MatFormFieldModule } from '@angular/material/form-field'
import {
  MatPaginatorModule,
  PageEvent,
  MatPaginatorIntl,
} from '@angular/material/paginator'
import { HackerNewsService } from './common/hacker-news.service'
import { AsyncPipe } from '@angular/common'
import { FormControl, FormsModule, NgForm, ReactiveFormsModule } from '@angular/forms'
import { debounceTime, distinctUntilChanged, filter, switchMap, tap } from 'rxjs'

@Component({
  selector: 'app-root',
  template: `
    <mat-toolbar color="primary" fxLayoutGap="8px" class="app-toolbar">
      <a mat-icon-button routerLink="/hacker-news">
        <mat-icon>news</mat-icon>
        <span class="left-pad" data-testid="title">Hacker News Feed</span>
      </a>
      <span class="flex-spacer"></span>

      <div
        fxLayout="row"
        fxLayoutAlign="space-between"
        fxLayoutGap="20px"
        fxLayoutAlign="center center"
      >
        <div>
          <input
            [formControl]="searchCtrl"
            matInput
            placeholder="Ex. Angular release"
            class="searchbar"
          />
        </div>
        <mat-paginator
          [length]="hackerNewsService.total$ | async"
          [pageSize]="hackerNewsService.limit$ | async"
          [pageIndex]="hackerNewsService.page$ | async"
          (page)="handlePageChange($event)"
          aria-label="Select page"
        >
        </mat-paginator>
      </div>
    </mat-toolbar>
    <router-outlet></router-outlet>
  `,
  styles: `
    .searchbar {
      display: block;
      width: 100%;
      height: 50px;
      background-color: #fff;
      color: #000;
      font-size: 18px;
    }
  `,
  standalone: true,
  imports: [
    FlexModule,
    RouterLink,
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatPaginatorModule,
    AsyncPipe,
    ReactiveFormsModule,
  ],
})
export class AppComponent implements OnInit {
  searchCtrl = new FormControl()
  paginator = inject(MatPaginatorIntl)
  hackerNewsService = inject(HackerNewsService)

  ngOnInit(): void {
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

  handlePageChange(pageEvent: PageEvent) {
    const currentPage = pageEvent.pageIndex
    this.hackerNewsService.page$.next(currentPage)
  }
}
