import * as SelectPrimitive from "@radix-ui/react-select"
import { CheckIcon, ChevronUpIcon } from "@radix-ui/react-icons"
import ChevronDownIcon from "../../assets/icons/caret-down.svg?react"
import type React from "react"
import cn from "classnames"
import Text from "./text"
import ButtonIcon from "./button-icon"

export const Select = SelectPrimitive.Root
export const s = SelectPrimitive.Trigger
export const SelectValue = SelectPrimitive.Value
export const SelectIcon = SelectPrimitive.Icon

export function SelectContent({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Content>) {
  return (
    <SelectPrimitive.Portal>
      <SelectPrimitive.Content
        className={cn(` `, className)}
        position="popper"
        sideOffset={4}
        {...props}
      >
        <SelectScrollUpButton />
        <SelectPrimitive.Viewport className="p-1">
          {children}
        </SelectPrimitive.Viewport>
        <SelectScrollDownButton />
      </SelectPrimitive.Content>
    </SelectPrimitive.Portal>
  )
}

export function SelectItem({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Item>) {
  return (
    <SelectPrimitive.Item
      className={cn(
        `data-[highlighted]:bg-background-secondary relative flex cursor-pointer items-center rounded-sm px-3 py-2 text-sm transition-colors outline-none select-none data-[disabled]:pointer-events-none data-[disabled]:opacity-50 data-[state=checked]:font-bold`,
        className,
      )}
      {...props}
    >
      <SelectPrimitive.ItemText>{children}</SelectPrimitive.ItemText>
      <SelectPrimitive.ItemIndicator className="absolute right-3">
        <CheckIcon className="h-[20px] w-[20px] text-green-100" />
      </SelectPrimitive.ItemIndicator>
    </SelectPrimitive.Item>
  )
}

function SelectScrollUpButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollUpButton>) {
  return (
    <SelectPrimitive.ScrollUpButton
      className={cn(
        "bg-background-primary flex h-6 cursor-default items-center justify-center",
        className,
      )}
      {...props}
    >
      <ChevronUpIcon className="h-[20px] w-[20px]" />
    </SelectPrimitive.ScrollUpButton>
  )
}

function SelectScrollDownButton({
  className,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.ScrollDownButton>) {
  return (
    <SelectPrimitive.ScrollDownButton
      className={cn(
        "bg-background-primary flex h-6 cursor-default items-center justify-center",
        className,
      )}
      {...props}
    >
      <ChevronDownIcon className="h-[20px] w-[20px]" />
    </SelectPrimitive.ScrollDownButton>
  )
}

export function SelectTriggers({
  className,
  children,
  ...props
}: React.ComponentProps<typeof SelectPrimitive.Trigger>) {
  return (
    <>
      <Text
        variant="text-label"
        className="text-accent-title transition-colors group-focus-within:text-green-100"
      >
        Categoria
      </Text>
      <SelectPrimitive.Trigger
        className={cn(
          `border-border bg-background-primary placeholder:text-text-secondary focus:ring-primary data-[placeholder]:text-text-secondary inline-flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors focus:ring-2 focus:outline-none disabled:cursor-not-allowed disabled:opacity-50`,
          className,
        )}
        {...props}
      >
        {children}
        <SelectPrimitive.Icon asChild>
          <ButtonIcon
            icon={ChevronDownIcon}
            variant="primary"
            size="md"
            className="h-[20px] w-[20px]"
          />
        </SelectPrimitive.Icon>
      </SelectPrimitive.Trigger>
    </>
  )
}
