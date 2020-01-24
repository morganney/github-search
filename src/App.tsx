import React, { FC, Reducer, useReducer, useEffect } from 'react'
import { Container, Row, Col, Jumbotron, Alert } from 'react-bootstrap'
import styled from 'styled-components'

import {
  Action,
  ActionTypes,
  ActionEnterSearch,
  ActionResultsSuccess,
  ActionResultsError,
  SearchResults,
  PageInfo,
  ActionSetCursor
} from './types'
import { Results } from './components/results'
import { Pager } from './components/pager'
import { SearchBar } from './containers/searchBar'
import { searchRepos } from './queries/searchRepos'

type AppState = {
  results: SearchResults
  query: string
  isFetching: boolean
  error: string
  pageInfo?: PageInfo
  cursor: string | null
  direction: string
}

const noResultsState: SearchResults = {
  repositoryCount: 0,
  nodes: [],
  edges: []
}
const initialState: AppState = {
  results: { ...noResultsState },
  query: '',
  isFetching: false,
  error: '',
  cursor: null,
  direction: 'after'
}
const reducer: Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case ActionTypes.ENTER_SEARCH:
      return { ...state, query: (action as ActionEnterSearch).payload }
    case ActionTypes.RESULTS_REQUEST:
      return { ...state, isFetching: true, error: '' }
    case ActionTypes.RESULTS_SUCCESS:
      return {
        ...state,
        isFetching: false,
        results: (action as ActionResultsSuccess).payload.search,
        pageInfo: (action as ActionResultsSuccess).payload.pageInfo
      }
    case ActionTypes.RESULTS_ERROR:
      return {
        ...state,
        isFetching: false,
        error: (action as ActionResultsError).payload
      }
    case ActionTypes.SET_CURSOR:
      return {
        ...state,
        cursor: (action as ActionSetCursor).payload.cursor,
        direction: (action as ActionSetCursor).payload.direction
      }
    case ActionTypes.RESET:
      return { ...initialState }
    default:
      return state
  }
}
const Box = styled.div<{ mt?: number }>`
  margin-top: ${({ mt }) => mt || 30}px;
`
const Footer = styled.footer`
  font-size: 12px;
  text-align: right;
`
const App: FC = () => {
  const [state, dispatch] = useReducer(reducer, initialState)
  const {
    query,
    isFetching,
    results,
    pageInfo,
    error,
    cursor,
    direction
  } = state

  useEffect(() => {
    if (query) {
      searchRepos({ query, cursor, direction }, dispatch)
    }
  }, [query, cursor, direction])

  return (
    <Container>
      <Row>
        <Col>
          <Box mt={20}>
            <Jumbotron>
              <h1>Search repositories on GitHub</h1>
            </Jumbotron>
          </Box>
        </Col>
      </Row>
      <Row>
        <Col>
          <SearchBar
            isFetching={isFetching}
            onChange={(keyword: string) => {
              if (!keyword) {
                dispatch({ type: ActionTypes.RESET })
              }
            }}
            onSubmit={(keyword: string) => {
              dispatch({
                payload: keyword,
                type: ActionTypes.ENTER_SEARCH
              } as ActionEnterSearch)
            }}
          />
        </Col>
      </Row>
      <Row>
        <Col>
          <Box>
            {error && <Alert variant='danger'>{error}</Alert>}
            {query && <Results results={results} />}
          </Box>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box>
            {pageInfo && (
              <Pager
                {...pageInfo}
                totalRecords={results.repositoryCount}
                onPage={(cursor: string, direction: string) => {
                  dispatch({
                    type: ActionTypes.SET_CURSOR,
                    payload: {
                      cursor,
                      direction
                    }
                  } as ActionSetCursor)
                }}
              />
            )}
          </Box>
        </Col>
      </Row>
      <Row>
        <Col>
          <Box mt={60}>
            <Footer>
              <p>
                Brought to you by{' '}
                <a href='https://www.typescriptlang.org'>Typescript</a>,{' '}
                <a href='https://reactjs.org'>React</a>, and{' '}
                <a href='https://graphql.org/'>GraphQL</a>.
              </p>
            </Footer>
          </Box>
        </Col>
      </Row>
    </Container>
  )
}

export default App
