import type { Refund } from "../../contexts/refund/models/refund"
import RefundRow from "./refund-row"
import Text from "../../components/ui/text"

interface refundListProps {
  refunds: Refund[]
  loading?: boolean
}

export default function RefundList({ refunds, loading }: refundListProps) {
  return (
    <>
      {!loading && refunds.length > 0 && (
        <div className="flex flex-col gap-6">
          {refunds.map((refund) => (
            <RefundRow
              key={refund.id}
              refund={{
                title: refund.title,
                category: refund.category,
                value: refund.value,
              }}
            />
          ))}
        </div>
      )}
      {loading && (
        <div className="flex flex-col gap-6">
          {Array.from({ length: 10 }).map((_, index) => (
            <RefundRow
              key={`refund-loading-${index}`}
              loading
              refund={{} as Refund}
            />
          ))}
        </div>
      )}
      {!loading && refunds.length === 0 && (
        <div className="flex h-full items-center justify-center">
          <Text variant="heading-lg">Nenhuma reembolso encontrado</Text>
        </div>
      )}
    </>
  )
}
