import { ChangeEvent } from 'react'

import { OptionAdmin, SelectAdmin } from './Admin.styled'

type Select = {
  handleSelect: (event: ChangeEvent<HTMLSelectElement>) => void
  initialValue: string
  options: string[]
  selected: string
  sortByStatus: (status: string) => void
}

export const SelectStatusAdmin = ({
  options,
  initialValue,
  handleSelect,
  selected,
  sortByStatus,
}: Select) => {
  return (
    <SelectAdmin
      value={selected}
      onChange={event => handleSelect(event)}
      onClick={() => sortByStatus(selected)}
    >
      <OptionAdmin hidden selected>
        {initialValue}
      </OptionAdmin>
      {options.map(option => (
        <OptionAdmin key={option} value={option}>
          {option}
        </OptionAdmin>
      ))}
    </SelectAdmin>
  )
}
