import Text from "@/components/ui/text"
import Icon from "@/components/ui/icon"
import ForkKnife from "@/assets/icons/fork-knife.svg?react"
import PoliceCar from "./assets/icons/police-car.svg?react"
import Bed from "./assets/icons/bed.svg?react"
import Wrench from "./assets/icons/wrench.svg?react"
import Receipt from "./assets/icons/receipt.svg?react"
import CloudArrowUp from "./assets/icons/cloud-arrow-up.svg?react"
import MagnifyingGlass from "./assets/icons/magnifying-glass.svg?react"
import CaretLeft from "./assets/icons/caret-left.svg?react"
import CaretRight from "./assets/icons/caret-right.svg?react"
import CaretUp from "./assets/icons/caret-up.svg?react"
import CaretDown from "./assets/icons/caret-down.svg?react"
import ButtonIcon from "./components/ui/button-icon"
import Button from "@/components/ui/button"
import InputText from "@/components/ui/input-text"
import { useId, useState } from "react"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select"
import { SelectTrigger } from "@radix-ui/react-select"
import MainHeader from "./components/ui/main-header"
import InputSingleFile from "./components/ui/input-single-file"

import { useForm } from "react-hook-form"

export default function App() {
  const selectId = useId()
  const [open, setOpen] = useState(false)

  const form = useForm({
    defaultValues: {
      file: undefined, // o campo que usaremos no InputSingleFile
    },
  })

  return (
    <>
      <div className="mb-10">
        <label
          htmlFor={selectId}
          className={`text-label mb-2 block font-bold uppercase transition-colors ${open ? "text-green-100" : "text-gray-200"} `}
        >
          Categoria
        </label>

        <Select onOpenChange={(isOpen) => setOpen(isOpen)}>
          <SelectTrigger
            id={selectId}
            className={`flex h-12 w-88 items-center justify-between rounded-lg border border-solid pt-1 pr-3 pl-3 text-gray-200 transition-colors ${open ? "border-green-100" : "border-gray-300"} focus:outline-none`}
          >
            <SelectValue placeholder="Selecione" />

            {open ? (
              <Icon
                svg={CaretUp}
                className="mr-[-8px] size-8 fill-green-100 pr-3"
              />
            ) : (
              <Icon
                svg={CaretDown}
                className="mr-[-8px] size-8 fill-gray-300 pr-3"
              />
            )}
          </SelectTrigger>

          <SelectContent
            className="![margin-left:-10px] w-[var(--radix-select-trigger-width)] rounded-md border border-solid border-gray-300 bg-white text-gray-100"
            align="start"
          >
            <SelectItem value="apple">Maçã</SelectItem>
            <SelectItem value="banana">Banana</SelectItem>
            <SelectItem value="orange">Laranja</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="mb-2 flex flex-col gap-2">
        <Text variant="heading-lg" className="text-green-200">
          Olá mundo!
        </Text>
        <Text className="heading-lg">Olá mundo!</Text>
        <Text variant="body-md-regular">Olá mundo!</Text>
        <Text variant="text-label">Olá mundo!</Text>
        <Text variant="title-bold">Olá mundo!</Text>
        <Text variant="sub-title">Olá mundo!</Text>
        <Text>Levar o dog pra passear</Text>
      </div>

      <div className="flex gap-2">
        <Icon svg={ForkKnife} />
        <Icon svg={PoliceCar} />
        <Icon svg={Bed} />
        <Icon svg={Wrench} />
        <Icon svg={Receipt} />
        <Icon svg={CloudArrowUp} />
        <Icon svg={MagnifyingGlass} />
        <Icon svg={CaretLeft} />
        <Icon svg={CaretRight} />
      </div>

      <div className="mb-2 flex gap-2">
        <ButtonIcon icon={MagnifyingGlass} disabled />
        <ButtonIcon icon={MagnifyingGlass} variant="primary" />
        <ButtonIcon icon={MagnifyingGlass} variant="secondary" />
      </div>

      <div className="mb-2 flex flex-col gap-2">
        <Button disabled>Nova solicitação</Button>
        <Button>Nova solicitação</Button>
      </div>

      <div className="mb-2 flex flex-col gap-2">
        <InputText label="Título" />
        <InputText label="Outro título" />
      </div>

      <MainHeader className="mt-9" />

      <div className="mt-6 mb-2 flex flex-col gap-2">
        <InputSingleFile
          form={form}
          label="Comprovante"
          allowedExtensions={["pdf"]}
          maxFileSizeInMB={50}
          error={form.formState.errors.file?.message}
          {...form.register("file")}
        />
      </div>
    </>
  )
}
