import React, { FC, FormEvent } from 'react'
import { Form, InputGroup, Button, Spinner } from 'react-bootstrap'

type Props = {
  placeholder: string
  value: string
  onChange: (value: string) => void
  onSubmit: () => void
  isDisabled?: boolean
  isLoading?: boolean
}

const Search: FC<Props> = ({
  placeholder,
  onChange,
  onSubmit,
  isDisabled = false,
  isLoading = false,
  value = ''
}) => {
  return (
    <Form
      onSubmit={(evt: FormEvent<HTMLFormElement>) => {
        onSubmit()
        evt.preventDefault()
      }}>
      <InputGroup>
        <Form.Control
          type='text'
          placeholder={placeholder}
          value={value}
          onChange={(evt: FormEvent<HTMLInputElement>) => {
            onChange(evt.currentTarget.value)
          }}
        />
        <InputGroup.Append>
          <Button disabled={isDisabled} type='submit'>
            {isLoading ? (
              <Spinner
                as='span'
                animation='border'
                size='sm'
                role='status'
                aria-hidden='true'
              />
            ) : (
              'Search'
            )}
          </Button>
        </InputGroup.Append>
      </InputGroup>
    </Form>
  )
}

export { Search }
