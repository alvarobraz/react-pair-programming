import Container from "@/components/ui/container"
import Divider from "@/components/ui/divider"
import RefundSearch from "@/components/ui/refund-search"
import Text from "../components/ui/text"
import RefundList from "@/components/ui/refund-list"
import ButtonIcon from "../components/ui/button-icon"
import CaretLeft from "../assets/icons/caret-left.svg?react"
import CaretRight from "../assets/icons/caret-right.svg?react"
import useRefunds from "@/contexts/refund/hooks/use-refunds"

export default function PageHome() {
  const { isLoadingRefunds, refunds } = useRefunds()

  // console.log("refunds " + JSON.stringify(refunds))

  return (
    <Container className="flex flex-col gap-6">
      <Text variant="heading-lg">Solicitações</Text>
      <RefundSearch />
      <Divider />
      <RefundList refunds={refunds} loading={isLoadingRefunds} />
      <div className="flex items-center justify-center">
        <ButtonIcon size="sm" icon={CaretLeft} variant="primary" />
        <Text variant="body-md-regular" className="px-2">
          1/3
        </Text>
        <ButtonIcon size="sm" icon={CaretRight} variant="primary" />
      </div>
    </Container>
  )
}
