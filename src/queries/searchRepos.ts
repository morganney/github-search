import { Dispatch } from 'react'
import {
  Action,
  ActionTypes,
  ActionResultsError,
  ActionResultsSuccess
} from '../types'

type Search = {
  query: string
  cursor: string | null
  direction?: string
}

const searchReposQuery = ({ query, cursor, direction = 'after' }: Search) => {
  const tail = direction === 'after' ? 'first' : 'last'

  return {
    query: `query ($query: String!, $limit: Int!, $cursor: String) {
      search(query: $query, type: REPOSITORY, ${tail}: $limit, ${direction}: $cursor) {
        repositoryCount
        pageInfo {
          endCursor
          startCursor
          hasNextPage
          hasPreviousPage
        }
        nodes {
          ... on Repository {
            owner {
              url
              login
            }
            url
            name
            description
            stargazers {
              totalCount
            }
            watchers {
              totalCount
            }
            primaryLanguage {
              name
              color
            }
          }
        }
      }
    }`,
    variables: {
      cursor,
      query: `${query} sort:stars`,
      limit: 10
    }
  }
}
const searchRepos = async (
  { query, cursor, direction }: Search,
  dispatch: Dispatch<Action>
) => {
  dispatch({
    type: ActionTypes.RESULTS_REQUEST
  })

  try {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `bearer ${process.env.REACT_APP_GITHUB_API_TOKEN}`
      },
      body: JSON.stringify(searchReposQuery({ query, cursor, direction }))
    })
    const { errors, data } = await response.json()
    const search = data?.search

    if (errors) {
      throw new Error(errors[0].message)
    }

    dispatch({
      type: ActionTypes.RESULTS_SUCCESS,
      payload: { search, pageInfo: search.pageInfo }
    } as ActionResultsSuccess)
  } catch (err) {
    dispatch({
      type: ActionTypes.RESULTS_ERROR,
      payload: err.message
    } as ActionResultsError)
  }
}

export { searchRepos }
