import { ChangeEvent } from 'react'

import { OptionAdmin, SelectAdmin } from './Admin.styled'

type Select = {
  handleSelect: (event: ChangeEvent<HTMLSelectElement>) => void
  initialValue: string
  options: string[]
  selected: string
}

export const SelectStatusAdmin = ({ options, initialValue, handleSelect, selected }: Select) => {
  return (
    <SelectAdmin value={selected} onChange={event => handleSelect(event)}>
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
