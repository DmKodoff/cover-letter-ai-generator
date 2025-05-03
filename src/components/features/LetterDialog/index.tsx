'use client'

import Modal from '@/components/ui/Modal'
import LetterPreview from '@/components/features/LetterPreview'
import st from './LetterDialog.module.scss'

type LetterDialogProps = {
  isOpen: boolean
  onClose: () => void
  letter: string
  title?: string
}

const LetterDialog: React.FC<LetterDialogProps> = ({
  isOpen,
  onClose,
  letter,
  title = 'Letter text',
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} className={st.letterDialog}>
      <div className={st.dialogContent}>
        <h3 className={st.dialogTitle}>{title}</h3>
        <LetterPreview
          isGenerating={false}
          generatedLetter={letter}
          className={st.letterPreview}
        />
      </div>
    </Modal>
  )
}

export default LetterDialog
