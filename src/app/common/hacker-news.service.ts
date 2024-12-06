import { inject, Injectable } from '@angular/core'
import { environment } from '../../environments/environment'
import { HttpClient, HttpParams } from '@angular/common/http'
import { BehaviorSubject, catchError, map, Observable, Subject } from 'rxjs'
import { IHackerNewsResponse, IQuery } from './hacker-news.interface'
import { timeStampToDate, transformError } from './utils'

const API_URL = environment.baseUrl + 'api/hackernews/stories'

@Injectable({
  providedIn: 'root',
})
export class HackerNewsService {
  totalPages$ = new BehaviorSubject<number>(100)
  limit$ = new BehaviorSubject<number>(12)
  page$ = new BehaviorSubject<number>(1)
  search$ = new BehaviorSubject<string>('')

  private readonly http = inject(HttpClient)

  fetchHackerNews(query: IQuery): Observable<IHackerNewsResponse> {
    const url = API_URL
    let urlParam = Object.entries(query).length
      ? url + '?' + this.buildUrlParams(query)
      : url

    return this.http
      .get<IHackerNewsResponse>(`${urlParam}`)
      .pipe(catchError(transformError))
  }

  private buildUrlParams(query: any): URLSearchParams {
    let params: URLSearchParams = new URLSearchParams()

    for (let key in query) {
      if (query[key]) params.set(key.toString(), query[key])
    }

    return params
  }
}
