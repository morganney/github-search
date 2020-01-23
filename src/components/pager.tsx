import React, { FC } from 'react'
import { Pagination } from 'react-bootstrap'
import styled from 'styled-components'

import { PageInfo } from '../types'

interface Props extends PageInfo {
  totalRecords: number
  onPage: (cursor: string, direction: string) => void
}
const StyledPagination = styled(Pagination)`
  margin: 0;
  justify-content: flex-end;
`
const Pager: FC<Props> = ({
  hasNextPage,
  hasPreviousPage,
  startCursor,
  endCursor,
  totalRecords,
  onPage
}) => {
  return (
    <StyledPagination>
      <Pagination.Item
        disabled={!hasPreviousPage}
        onClick={() => {
          onPage(startCursor, 'before')
        }}>
        Previous
      </Pagination.Item>
      <Pagination.Item
        disabled={!hasNextPage}
        onClick={() => {
          onPage(endCursor, 'after')
        }}>
        Next
      </Pagination.Item>
    </StyledPagination>
  )
}

export { Pager }
