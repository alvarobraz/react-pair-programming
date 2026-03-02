import Container from "../components/ui/container"
import InputText from "../components/ui/input-text"
import Text from "../components/ui/text"
import File from "../assets/icons/file.svg?react"
import { useParams } from "react-router"
import Icon from "../components/ui/icon"
import Button from "../components/ui/button"

export default function PageRefundDetails() {
  const { id } = useParams()

  return (
    <Container className="flex flex-col gap-6">
      <Text variant="heading-lg">Solicitação de reembolso </Text>
      <Text variant="body-md-regular">
        Dados da despesa para solicitar reembolso.
      </Text>
      <InputText label="Nome da solicitação" />
      <div className="flex w-[432px] justify-between align-middle">
        <InputText label="Categoria" className="relative z-50" />
        <InputText label="Valor" className="w-32" />
      </div>
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
      <Button>Excluir</Button>
    </Container>
  )
}
