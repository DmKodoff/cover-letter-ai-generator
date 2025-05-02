import dynamic from 'next/dynamic'
import { IconTrash } from '@/assets'
import { useDialog } from '@/hooks/useDialog'
import Button from '../../../ui/Button'

import st from './DeleteButton.module.scss'

const ConfirmDialog = dynamic(() => import('@/components/ui/ConfirmDialog'), {
  ssr: false,
})

type DeleteButtonProps = {
  onDelete: () => void
  className?: string
}

const DeleteButton: React.FC<DeleteButtonProps> = ({
  onDelete,
  className = '',
}) => {
  const { openDialog, Dialog } = useDialog()

  const handleDelete = async () => {
    const confirmed = await openDialog(ConfirmDialog, {
      title: 'Delete letter',
      message: 'Are you sure you want to delete this letter?',
    })

    if (confirmed) {
      onDelete()
    }
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
