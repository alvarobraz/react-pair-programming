import Container from "../components/ui/container"
import InputText from "../components/ui/input-text"
import Text from "../components/ui/text"
import File from "../assets/icons/file.svg?react"
import CaretUp from "../assets/icons/caret-up.svg?react"
import CaretDown from "../assets/icons/caret-down.svg?react"
import CheckedSuccess from "../assets/images/checked-success.svg?react"
import { useParams } from "react-router"
import Icon from "../components/ui/icon"
import Button from "../components/ui/button"
import InputSingleFile from "../components/ui/input-single-file"
import { useForm } from "react-hook-form"
import { useId, useState, useTransition } from "react"
import DeleteConfirmDialog from "../contexts/components/delete-confirm-dialog"
import useRefund from "@/contexts/refund/hooks/use-refund"
import useReceipt from "../contexts/receipts/hooks/use-receipt"
import { categories, getRefundCategoryData } from "../helpers/refund-utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select"
import { SelectTrigger } from "@radix-ui/react-select"

export default function PageRefund() {
  const { id } = useParams()
  const { isLoadingRefund, refund, deleteRefund } = useRefund(id)
  const { receipt } = useReceipt(refund?.receipt?.id)

  console.log("refund =>" + JSON.stringify(refund))

  const form = useForm({
    defaultValues: {
      file: undefined,
    },
  })

  const fileSrc = receipt
    ? `${import.meta.env.VITE_API_URL}${receipt?.url}`
    : undefined

  // select
  const { category } = getRefundCategoryData(refund?.category || "")
  const [openSelect, setOpenSelect] = useState(false)
  const [valueSelect, setValueSelect] = useState(category || "")
  const selectId = useId()

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(false)
  const [isDeletingRefund, setIsDeletingRefund] = useTransition()

  const handleDelete = () => {
    setIsDeletingRefund(async () => {
      await deleteRefund(refund?.id || "")
    })
  }

  return (
    <Container
      className={
        success && id === undefined
          ? "flex flex-col items-center gap-6 align-middle"
          : "flex flex-col gap-6"
      }
    >
      {success && id === undefined ? (
        <>
          <Text variant="text-success">Solicitação enviada!</Text>
          <CheckedSuccess />
          <Text variant="sub-title">
            Agora é apenas aguardar! Sua solicitação será analisada e, em breve,
            o setor financeiro irá entrar em contato com você.
          </Text>
        </>
      ) : (
        <>
          <Text variant="heading-lg">Solicitação de reembolso </Text>
          <Text variant="body-md-regular">
            Dados da despesa para solicitar reembolso.
          </Text>

          <div className="flex w-[432px] flex-wrap items-center justify-between">
            <InputText
              className="w-full"
              label="Nome da solicitação"
              defaultValue={refund?.title || ""}
            />
            <div>
              <Text
                variant="text-label"
                className="text-accent-title transition-colors group-focus-within:text-green-100"
              >
                Categoria
              </Text>

              <Select
                onOpenChange={(isOpen) => setOpenSelect(isOpen)}
                value={valueSelect}
                onValueChange={setValueSelect}
              >
                <SelectTrigger
                  id={selectId}
                  className={`flex h-12 w-70 items-center justify-between rounded-lg border border-solid pt-1 pr-3 pl-4 text-gray-100 transition-colors ${openSelect ? "border-green-100" : "border-gray-300"} focus:outline-none`}
                >
                  <SelectValue placeholder="Selecione" />
                  {openSelect ? (
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
                  className="![margin-left:0] w-[var(--radix-select-trigger-width)] rounded-md border border-solid border-gray-300 bg-white text-gray-100"
                  align="start"
                >
                  {categories.map((category) => (
                    <SelectItem key={category.value} value={category.value}>
                      {category.label}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <InputText
              label="Valor"
              className="w-32"
              defaultValue={
                refund ? (refund.value / 100).toFixed(2).replace(".", ",") : ""
              }
            />
          </div>
          {id !== undefined ? (
            <>
              <div className="mt-1 flex items-center justify-center gap-2 align-middle">
                <a
                  href={`${import.meta.env.VITE_API_URL}${receipt?.url}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-green-100 no-underline transition-colors hover:text-green-200"
                >
                  <Icon svg={File} className="h-5 w-5 fill-green-100" />
                  <Text variant="text-semi-bold">Abrir comprovante</Text>
                </a>
              </div>
            </>
          ) : (
            <InputSingleFile
              form={form}
              label="Comprovante"
              allowedExtensions={["pdf"]}
              maxFileSizeInMB={50}
              error={form.formState.errors.file?.message}
              {...form.register("file")}
            />
          )}
        </>
      )}

      {id !== undefined ? (
        <Button onClick={() => setOpen(true)}>
          {isDeletingRefund ? "Excluindo..." : "Excluir"}
        </Button>
      ) : (
        <Button onClick={() => setSuccess(false)}>Nova solicitação</Button>
      )}

      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
      />
    </Container>
  )
}
