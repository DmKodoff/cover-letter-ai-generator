import Button from '@/components/ui/Button'
import st from '@/components/ui/Modal/Modal.module.scss'

type ConfirmDialogProps = {
  onConfirm: (e?: React.MouseEvent<HTMLButtonElement>) => void
  onCancel: (e?: React.MouseEvent<HTMLButtonElement>) => void
  title?: string
  message?: string
  variant?: 'primary' | 'danger'
}

const ConfirmDialog: React.FC<ConfirmDialogProps> = ({
  onConfirm,
  onCancel,
  title = 'Confirmation',
  message = 'Are you sure you want to perform this action?',
  variant = 'primary',
}) => {
  return (
    <div>
      <h2 className={st.title}>{title}</h2>
      <p>{message}</p>
      <div className={st.actions}>
        <Button variant='secondary' onClick={onCancel}>
          Cancel
        </Button>
        <Button variant={variant} onClick={onConfirm}>
          Sure
        </Button>
      </div>
    </div>
  )
}

export default ConfirmDialog
