import React, { FC } from 'react'
import { ListGroup } from 'react-bootstrap'
import styled from 'styled-components'

import { SearchResults } from '../types'

type Props = {
  results: SearchResults
}

const decimal = Intl.NumberFormat('en-US', {
  style: 'decimal'
})
const Summary = styled.p`
  text-align: right;
  font-size: 12px;
  margin: 0 0 5px 0;
  font-style: italic;
`
const Title = styled.p`
  margin: 0 0 3px 0;
`
const Description = styled.p`
  margin: 10px 0 0 0;
`
const Stats = styled.ul`
  margin: 0;
  padding: 0;
  display: flex;
  font-size: 12px;
`
const Stat = styled.li`
  list-style: none;
  margin: 0 0 0 10px;
  &:first-child {
    margin-left: 0;
  }
`
const Results: FC<Props> = ({ results }) => {
  const { nodes, repositoryCount } = results

  return (
    <>
      <Summary>
        Total repositories found: {decimal.format(repositoryCount)}
      </Summary>
      <ListGroup>
        {nodes.map(
          ({ name, url, owner, description, stargazers, watchers }) => (
            <ListGroup.Item key={url}>
              <Title>
                <a href={owner.url}>{owner.login}</a> / <a href={url}>{name}</a>
              </Title>
              <Stats>
                <Stat title='watchers'>
                  &#128065; {decimal.format(watchers.totalCount)}
                </Stat>
                <Stat title='stargazers'>
                  &#11088; {decimal.format(stargazers.totalCount)}
                </Stat>
              </Stats>
              <Description>{description}</Description>
            </ListGroup.Item>
          )
        )}
      </ListGroup>
    </>
  )
}

export { Results }
