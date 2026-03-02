import React from "react"
import SearchIcon from "../../assets/icons/magnifying-glass.svg?react"
import InputText from "./input-text"
import { debounce } from "../../helpers/utils"
import Icon from "./icon"

export default function RefundSearch() {
  const [inputValue, setInputValue] = React.useState("")

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debouncedSetValue = React.useCallback(
    debounce((value: string) => console.log("valor com debounce", value), 200),
    [],
  )

  function handleInputChange(e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value

    setInputValue(value)
    debouncedSetValue(value)
  }

  return (
    <div className="flex items-center justify-between gap-3">
      <InputText
        placeholder="Pesquise pelo nome"
        className="flex-1"
        value={inputValue}
        onChange={handleInputChange}
      />
      <div className="flex h-12 w-14 items-center justify-center rounded-lg bg-green-100 p-4">
        <Icon svg={SearchIcon} className="fill-white" />
      </div>
    </div>
  )
}
