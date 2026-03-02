import {
  formatRefundValue,
  getRefundCategoryData,
} from "@/helpers/refund-utils"
import type { Refund } from "../../contexts/refund/models/refund"
import Icon from "./icon"
import Skeleton from "./skeleton"
import Text from "./text"

interface RefundRowProps {
  refund: Refund
  loading?: boolean
}

export default function RefundRow({ refund, loading }: RefundRowProps) {
  const { icon, label } = getRefundCategoryData(refund.category)
  return (
    <>
      <div className="flex items-center justify-between">
        {!loading ? (
          <>
            <div className="flex items-start justify-start gap-3">
              <div className="h-[34px] w-[34px] rounded-3xl bg-gray-400 p-1.5">
                <Icon svg={icon} className="h-5 w-5 fill-green-100" />
              </div>
              <div className="flex flex-col justify-center gap-1">
                <Text variant="title-bold">{refund.title}</Text>
                <Text variant="sub-title">{label}</Text>
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Text variant="text-sm" className="text-gray-200">
                R$
              </Text>
              <Text variant="title-bold" className="text-gray-100">
                {formatRefundValue(refund.value)}
              </Text>
            </div>
          </>
        ) : (
          <>
            <div className="flex items-start justify-start gap-3">
              <div className="h-[34px] w-[34px] rounded-3xl bg-gray-300">
                <Skeleton className="h-[34px] w-[34px] rounded-3xl bg-gray-300" />
              </div>
              <div className="flex flex-col justify-center">
                <Skeleton className="h-[34px] w-[34px] bg-gray-300" />
              </div>
            </div>
            <div className="flex items-center justify-end gap-2">
              <Text variant="text-sm" className="text-gray-200">
                <Skeleton className="h-[34px] w-[34px] bg-gray-300" />
              </Text>
              <Skeleton className="h-[34px] w-[34px] bg-gray-300" />
            </div>
          </>
        )}
      </div>
    </>
  )
}
