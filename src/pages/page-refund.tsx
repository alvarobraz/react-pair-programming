import { useEffect, useId, useState, useTransition } from "react"
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
import DeleteConfirmDialog from "../contexts/components/delete-confirm-dialog"
import useRefund from "../contexts/refund/hooks/use-refund"
import useReceipt from "../contexts/receipts/hooks/use-receipt"
import { categories, getRefundCategoryData } from "../helpers/refund-utils"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectValue,
} from "../components/ui/select"
import { SelectTrigger } from "@radix-ui/react-select"
import { Controller } from "react-hook-form"
import Skeleton from "../components/ui/skeleton"

export default function PageRefund() {
  const { id } = useParams()

  const { isLoadingRefund, refund, createRefund, deleteRefund } = useRefund(id)
  const { receipt } = useReceipt(refund?.receipt?.id)
  const [success, setSuccess] = useState(false)

  // form
  const form = useForm({
    defaultValues: {
      title: "",
      category: "",
      value: 0,
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

  // create
  const [isCreatingRefund, setIsCreatingRefund] = useTransition()

  const handleCreateRefund = form.handleSubmit(async (data) => {
    setIsCreatingRefund(async () => {
      try {
        if (!data.file || data.file === undefined) {
          throw new Error("Nenhum arquivo selecionado")
        }

        await createRefund({
          title: data.title,
          category: valueSelect,
          value: data.value,
          file: data.file,
        })
        setValueSelect("")
        form.reset()
        setSuccess(true)
      } catch (error: any) {
        console.error("Erro ao criar reembolso:", error)
      }
    })
  })

  // delete confirm dialog
  const [open, setOpen] = useState(false)
  const [isDeletingRefund, setIsDeletingRefund] = useTransition()
  const handleDelete = () => {
    setIsDeletingRefund(async () => {
      await deleteRefund(refund?.id || "")
      setValueSelect("")
      form.reset()
    })
  }

  useEffect(() => {
    if (refund) {
      form.reset({
        title: refund.title || "",
        category: refund.category || "",
        value: refund.value || undefined,
      })
    } else {
      form.reset({
        title: "",
        category: "",
        value: undefined,
      })
    }
  }, [refund, form])

  const formatter = new Intl.NumberFormat("pt-BR", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  })

  return (
    <Container
      className={
        success && id === undefined
          ? "flex flex-col items-center gap-6 align-middle"
          : "flex flex-col gap-6"
      }
    >
      <form
        onSubmit={handleCreateRefund}
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
              Agora é apenas aguardar! Sua solicitação será analisada e, em
              breve, o setor financeiro irá entrar em contato com você.
            </Text>
          </>
        ) : (
          <>
            <Text variant="heading-lg">Solicitação de reembolso </Text>
            <Text variant="body-md-regular">
              Dados da despesa para solicitar reembolso.
            </Text>

            <InputText
              label="Nome da solicitação"
              {...form.register("title")}
              loading={isLoadingRefund}
            />
            <div className="flex w-[432px] justify-between align-middle">
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
                  {!isLoadingRefund ? (
                    <SelectTrigger
                      id={selectId}
                      className={`flex h-12 w-70 items-center justify-between rounded-lg border border-solid pt-1 pr-3 pl-4 text-gray-100 transition-colors ${openSelect ? "border-green-100" : "border-gray-300"} focus:outline-none`}
                    >
                      <SelectValue placeholder="Selecione" />
                      {openSelect ? (
                        <Icon
                          svg={CaretUp}
                          className="-mr-2 size-8 fill-green-100 pr-3"
                        />
                      ) : (
                        <Icon
                          svg={CaretDown}
                          className="-mr-2 size-8 fill-gray-300 pr-3"
                        />
                      )}
                    </SelectTrigger>
                  ) : (
                    <Skeleton className="flex h-12 w-70 items-center justify-between rounded-lg bg-gray-300 pt-1 pr-3 pl-4" />
                  )}

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
              <Controller
                control={form.control}
                name="value"
                render={({ field }) => (
                  <InputText
                    label="Valor"
                    value={
                      field.value === undefined
                        ? ""
                        : formatter.format(field.value / 100)
                    }
                    onChange={(e) => {
                      const raw = e.target.value.replace(/\D/g, "")
                      const numericValue = Number(raw)
                      field.onChange(numericValue)
                    }}
                    className="w-34"
                    loading={isLoadingRefund}
                  />
                )}
              />
            </div>
            {id !== undefined ? (
              <>
                <div className="mt-1 flex items-center justify-center gap-2 align-middle">
                  {!isLoadingRefund ? (
                    <a
                      href={`${import.meta.env.VITE_API_URL}${receipt?.url}`}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-green-100 no-underline transition-colors hover:text-green-200"
                    >
                      <Icon svg={File} className="h-5 w-5 fill-green-100" />
                      <Text variant="text-semi-bold">Abrir comprovante</Text>
                    </a>
                  ) : (
                    <Skeleton className="flex h-12 w-full items-center justify-between rounded-lg bg-gray-300 pt-1 pr-3 pl-4" />
                  )}
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
                loading={isLoadingRefund}
              />
            )}
          </>
        )}

        {id !== undefined ? (
          <>
            {!isLoadingRefund ? (
              <Button onClick={() => setOpen(true)}>
                {isDeletingRefund ? "Excluindo..." : "Excluir"}
              </Button>
            ) : (
              <Skeleton className="flex h-12 w-full items-center justify-between rounded-lg bg-gray-300 pt-1 pr-3 pl-4" />
            )}
          </>
        ) : id === undefined && success === false ? (
          <Button type="submit">
            {isCreatingRefund ? "Solicitando..." : "Nova solicitação"}
          </Button>
        ) : (
          ""
        )}
      </form>

      <DeleteConfirmDialog
        open={open}
        onOpenChange={setOpen}
        onConfirm={handleDelete}
      />
    </Container>
  )
}
