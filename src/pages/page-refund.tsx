import Container from "../components/ui/container"
import InputText from "../components/ui/input-text"
import Text from "../components/ui/text"
import File from "../assets/icons/file.svg?react"
import CheckedSuccess from "../assets/images/checked-success.svg?react"
import { useParams } from "react-router"
import Icon from "../components/ui/icon"
import Button from "../components/ui/button"
import InputSingleFile from "../components/ui/input-single-file"
import { useForm } from "react-hook-form"
import { useState } from "react"
import DeleteConfirmDialog from "../contexts/components/delete-confirm-dialog"

export default function PageRefund() {
  const { id } = useParams()

  const form = useForm({
    defaultValues: {
      file: undefined,
    },
  })

  const [open, setOpen] = useState(false)
  const [success, setSuccess] = useState(true)

  const handleDelete = () => {
    console.log("Item excluído!")
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
          <InputText label="Nome da solicitação" />
          <div className="flex w-[432px] justify-between align-middle">
            <InputText label="Categoria" />
            <InputText label="Valor" className="w-32" />
          </div>
          {id !== undefined ? (
            <div className="mt-1 flex items-center justify-center gap-2 align-middle">
              <a
                href="https://www.linkedin.com/in/alvarobraz/?skipRedirect=true"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-green-100 no-underline transition-colors hover:text-green-200"
              >
                <Icon svg={File} className="h-5 w-5 fill-green-100" />
                <Text variant="text-semi-bold">Abrir comprovante</Text>
              </a>
            </div>
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
        <Button onClick={() => setOpen(true)}>Excluir</Button>
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
