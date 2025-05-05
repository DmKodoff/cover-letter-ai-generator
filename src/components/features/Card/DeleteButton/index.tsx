import dynamic from 'next/dynamic'

import { IconTrash } from '@/assets'
import { useDialog } from '@/hooks/useDialog'
import Button from '@/components/ui/Button'

import st from './DeleteButton.module.scss'

const ConfirmDialog = dynamic(
  () => import('@/components/features//Card/ConfirmDialog'),
  {
    ssr: false,
  }
)

type DeleteButtonProps = {
  onDelete: () => void
  className?: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  className = '',
}) => {
  const { openDialog, Dialog } = useDialog()

  const handleDelete = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation()
    openDialog(ConfirmDialog, {
      title: 'Delete letter',
      message: 'Are you sure you want to delete this letter?',
      variant: 'danger',
    }).then((confirmed) => {
      if (confirmed) {
        onDelete()
      } else {
        e.stopPropagation()
      }
    })
  }

  return (
    <>
      <Dialog />
      <Button variant='clear' onClick={handleDelete} className={className}>
        <IconTrash className={st.icon} />
        <span className={st.buttonText}>Delete</span>
      </Button>
    </>
  )
}

export default DeleteButton
