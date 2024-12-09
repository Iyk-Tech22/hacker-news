import { provideHttpClient } from '@angular/common/http'
import { API_URL, HackerNewsService } from './hacker-news.service'
import {
  provideHttpClientTesting,
  HttpTestingController,
} from '@angular/common/http/testing'
import { TestBed } from '@angular/core/testing'
import { mockHackerNewes } from './mock.data'
import { IQuery } from './hacker-news.interface'

describe('HackerNewsService', () => {
  let query: IQuery
  let url: string
  let hackerNewsService: HackerNewsService
  let httpTestingCtrl: HttpTestingController

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [provideHttpClient(), provideHttpClientTesting()],
    })

    query = { page: 1, limit: 1 }
    url = `${API_URL}?page=${query.page}&limit=${query.limit}`
    hackerNewsService = TestBed.inject(HackerNewsService)
    httpTestingCtrl = TestBed.inject(HttpTestingController)
  })

  afterEach(() => {
    httpTestingCtrl.verify()
  })

  it('should fetch hacker news stories', () => {
    hackerNewsService.fetchHackerNews(query).subscribe((res) => {
      expect(res.isSuccess).toBe(true)
      expect(res.data.stories.length).toBe(1)
    })

    const req = httpTestingCtrl.expectOne(url)
    expect(req.request.method).toBe('GET')
    req.flush(mockHackerNewes)
  })
})
