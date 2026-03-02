import { useQuery, useQueryClient } from "@tanstack/react-query"
import { api, fetcher } from "../../../helpers/api"
import type { Refund, RefundDetail } from "../models/refund"
import type { RefundNewFormSchema } from "../schemas"
import { toast } from "sonner"
import { useNavigate } from "react-router"

export default function useRefund(id?: string) {
  const navigate = useNavigate()

  const { data, isLoading } = useQuery<RefundDetail>({
    queryKey: ["refund", id],
    queryFn: () => fetcher(`/refunds/${id}`),
    enabled: !!id,
  })

  async function deleteRefund(refundId: string) {
    try {
      await api.delete(`/refunds/${refundId}`)

      toast.success("Solicitação de reembolso excluída com sucesso")

      navigate("/")
    } catch (error) {
      toast.error("Erro ao excluir solicitação de reembolso")
      throw error
    }
  }

  const queryClient = useQueryClient()

  async function createRefund(payload: RefundNewFormSchema) {
    // eslint-disable-next-line no-useless-catch
    try {
      if (!payload.file || payload.file.length === 0) {
        throw new Error("Arquivo não selecionado")
      }

      const { data: receiptData } = await api.post(
        "/receipts",
        {
          receiptFile: payload.file[0],
        },
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        },
      )

      await api.post<Refund>("/refunds", {
        title: payload.title,
        category: payload.category,
        value: payload.value,
        receipt: receiptData.receipt.id,
      })

      queryClient.invalidateQueries({ queryKey: ["refunds"] })
    } catch (error) {
      throw error
    }
  }

  return {
    refund: data?.refund,
    isLoadingRefund: isLoading,
    title: data?.refund.title,
    createRefund,
    deleteRefund,
  }
}
