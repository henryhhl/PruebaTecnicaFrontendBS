import type TypeModal from '../enum/typeModal'
type TypeTransaction = 'Ingreso' | 'Gasto' | 'Egreso' | 'Historico'

interface ModalSuccessProps {
  isOpen: boolean
  onClose: () => void
  onRedirect: () => void
  typeTransaction: TypeTransaction
  type: TypeModal
  text: string
}

export default ModalSuccessProps
