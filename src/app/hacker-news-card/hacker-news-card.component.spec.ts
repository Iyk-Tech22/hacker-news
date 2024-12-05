import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HackerNewsCardComponent } from './hacker-news-card.component';

describe('HackerNewsCardComponent', () => {
  let component: HackerNewsCardComponent;
  let fixture: ComponentFixture<HackerNewsCardComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HackerNewsCardComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(HackerNewsCardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
