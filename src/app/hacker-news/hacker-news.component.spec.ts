import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing'
import { HackerNewsComponent } from './hacker-news.component'
import { AsyncPipe } from '@angular/common'
import { HackerNewsService } from '../common/hacker-news.service'
import { of } from 'rxjs'
import { mockHackerNewes } from '../common/mock.data'
import { provideHttpClient } from '@angular/common/http'
import {} from '@angular/common/testing'
import { DebugElement } from '@angular/core'

describe('HackerNewsComponent', () => {
  let hostComponent: HackerNewsComponent
  let fixture: ComponentFixture<HackerNewsComponent>
  let debugEL: DebugElement
  let el: HTMLElement
  let hackerNewsService: HackerNewsService

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      imports: [HackerNewsComponent, AsyncPipe],
      providers: [HackerNewsService, provideHttpClient()],
    }).compileComponents()
  }))

  beforeEach(() => {
    hackerNewsService = TestBed.inject(HackerNewsService)
    spyOn(hackerNewsService, 'fetchHackerNews').and.returnValue(of(mockHackerNewes))
    fixture = TestBed.createComponent(HackerNewsComponent)
    hostComponent = fixture.componentInstance
    debugEL = fixture.debugElement
    el = fixture.nativeElement
    fixture.detectChanges()
  })

  it('should create HackerNewsComponent', () => {
    expect(hostComponent).toBeDefined()
  })

  it('should displays hacker news title', () => {
    const h2 = el.querySelector('h2')
    const innerText = h2?.innerText as string
    expect(innerText).toBe('Hacker News Feed')
  })

  it('should load hacker news stories', () => {
    const result = hackerNewsService.fetchHackerNews({})
    result.subscribe((response) => {
      expect(response.isSuccess).toBe(true)
    })
  })

  it('should search for hacker news story', async () => {
    fixture.detectChanges()
    const searchInput = fixture.debugElement.nativeElement.querySelector(
      '.searchTerm'
    ) as HTMLInputElement

    const searchTerm = 'Elon launch starlink upgrades'
    searchInput.value = searchTerm
    searchInput.dispatchEvent(new Event('input'))
    await fixture.whenStable()

    expect(searchInput.value).toBe(searchTerm)
  })

  it('should increment current page', () => {
    const currentPage = hostComponent.currentPage
    const nextBtn = debugEL.nativeElement.querySelector('#nxt-page') as HTMLButtonElement
    nextBtn.click()
    fixture.detectChanges()
    const nextPage = hostComponent.currentPage
    expect(nextPage).toBeGreaterThan(currentPage)
  })

  it('should decrement current page', () => {
    const currentPage = (hostComponent.currentPage = 3)
    const prevBtn = debugEL.nativeElement.querySelector('#prev-page') as HTMLButtonElement
    prevBtn.dispatchEvent(new Event('click'))
    fixture.detectChanges()
    const prevPage = hostComponent.currentPage
    expect(prevPage).toBeLessThan(currentPage)
  })
})
