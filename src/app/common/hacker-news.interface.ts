export interface IHackerNewsResponse {
  message: string
  isSuccess: boolean
  data: IData
}

export interface IData {
  stories: IStory[]
  pagination: IPagination
}

export interface IStory {
  by: string
  descendants: number
  id: number
  kids?: number[]
  score: number
  time: number
  title: string
  type: string
  url: string
  day?: string
  month?: string
}

export interface IPagination {
  currentPage: number
  totalPages: number
  totalStories: number
}

export interface IQuery {
  page?: number
  search?: string
  limit?: number
}
