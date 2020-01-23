export enum ActionTypes {
  ENTER_SEARCH,
  RESULTS_REQUEST,
  RESULTS_ERROR,
  RESULTS_SUCCESS,
  RESET,
  SET_CURSOR
}

export type Repos = {
  name: string
  url: string
  description: string
  owner: {
    url: string
    login: string
  }
  stargazers: {
    totalCount: number
  }
  watchers: {
    totalCount: number
  }
  primaryLanguage?: {
    name: string
    color: string
  }
}
export type Cursor = {
  cursor: string
}
export type SearchResults = {
  nodes: Repos[]
  repositoryCount: number
  edges: Cursor[]
}
export type PageInfo = {
  hasNextPage: boolean
  hasPreviousPage: boolean
  endCursor: string
  startCursor: string
}

// Type hierarchy to be more specific about the 'payload' field type
export interface Action {
  type: ActionTypes
}
export interface ActionEnterSearch extends Action {
  payload: string
}
export interface ActionResultsSuccess extends Action {
  payload: {
    search: SearchResults
    pageInfo: PageInfo
  }
}
export interface ActionResultsError extends Action {
  payload: string
}
export interface ActionSetCursor extends Action {
  payload: {
    direction: string
    cursor: string
  }
}
