import { AsyncPipe } from '@angular/common'
import { HackerNewsService } from './hacker-news.service'
import { ReactiveFormsModule } from '@angular/forms'
import { HttpClient } from '@angular/common/http'

export default [AsyncPipe, HackerNewsService, ReactiveFormsModule, HttpClient]
