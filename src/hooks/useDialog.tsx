import React, { useState, useCallback } from 'react'
import Modal from '@/components/ui/Modal'

type DialogProps = {
  onConfirm: () => void
  onCancel: () => void
  title?: string
  message?: string
}

type DialogComponent = React.ComponentType<DialogProps>

export const useDialog = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [DialogComponent, setDialogComponent] =
    useState<DialogComponent | null>(null)
  const [dialogProps, setDialogProps] = useState<
    Omit<DialogProps, 'onConfirm' | 'onCancel'>
  >({})
  const [resolveRef, setResolveRef] = useState<
    ((value: boolean) => void) | null
  >(null)

  const openDialog = useCallback(
    async <T extends DialogComponent>(
      Component: T,
      props?: Omit<DialogProps, 'onConfirm' | 'onCancel'>
    ) => {
      return new Promise<boolean>((resolve) => {
        setDialogComponent(() => Component)
        setDialogProps(props || {})
        setResolveRef(() => resolve)
        setIsOpen(true)
      })
    },
    []
  )

  const handleConfirm = useCallback(() => {
    setIsOpen(false)
    if (resolveRef) resolveRef(true)
  }, [resolveRef])

  const handleCancel = useCallback(() => {
    setIsOpen(false)
    if (resolveRef) resolveRef(false)
  }, [resolveRef])

  const Dialog = useCallback(() => {
    if (!DialogComponent || !isOpen) return null

    return (
      <Modal isOpen={isOpen} onClose={handleCancel}>
        <DialogComponent
          {...dialogProps}
          onConfirm={handleConfirm}
          onCancel={handleCancel}
        />
      </Modal>
    )
  }, [DialogComponent, dialogProps, handleCancel, handleConfirm, isOpen])

  return { openDialog, Dialog }
}
