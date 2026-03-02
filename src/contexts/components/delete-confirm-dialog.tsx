import * as Dialog from "@radix-ui/react-dialog"
// import { Cross2Icon } from "@radix-ui/react-icons";
import Button from "../../components/ui/button"
import Text from "../../components/ui/text"

interface DeleteConfirmDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onConfirm: () => void
}

export default function DeleteConfirmDialog({
  open,
  onOpenChange,
  onConfirm,
}: DeleteConfirmDialogProps) {
  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="data-[state=open]:animate-fadeIn fixed inset-0 bg-gray-100/80" />
        <Dialog.Content className="fixed top-1/2 left-1/2 w-lg -translate-x-1/2 -translate-y-1/2 gap-6 rounded-2xl bg-gray-500 p-10">
          <div className="mb-4 flex items-center justify-between">
            <Dialog.Title className="text-xl leading-5 font-bold text-gray-100">
              Excluir solicitação
            </Dialog.Title>
          </div>

          <Dialog.Description className="font-regular text-sm leading-5 text-gray-200">
            Tem certeza de que deseja excluir essa solicitação? Essa ação é
            irreversível.
          </Dialog.Description>

          <div className="mt-5 flex items-center justify-end gap-8 align-middle">
            <Dialog.Close asChild>
              <Text variant="text-semi-bold" className="cursor-pointer">
                Cancelar
              </Text>
            </Dialog.Close>

            <Button
              variant="primary"
              size="xs"
              className="bg-red-600 text-white hover:bg-red-700"
              onClick={() => {
                onConfirm()
                onOpenChange(false)
              }}
            >
              Confirmar
            </Button>
          </div>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  )
}
