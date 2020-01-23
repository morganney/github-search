import React, { FC, useState } from 'react'

import { Search } from '../components/search'

type Props = {
  onSubmit: (value: string) => void
  onChange: (value: string) => void
  isFetching?: boolean
}

const SearchBar: FC<Props> = ({ onSubmit, onChange, isFetching = false }) => {
  const [keyword, setKeyword] = useState('')

  return (
    <Search
      placeholder='Enter keyword'
      value={keyword}
      isDisabled={keyword.length === 0 || isFetching}
      isLoading={isFetching}
      onChange={(payload: string) => {
        setKeyword(payload)
        onChange(payload)
      }}
      onSubmit={() => {
        onSubmit(keyword)
      }}
    />
  )
}

export { SearchBar }
