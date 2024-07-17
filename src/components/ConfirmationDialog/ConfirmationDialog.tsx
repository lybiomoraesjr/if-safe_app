import { Dialog } from "@rneui/themed";

type ConfirmationDialogProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => void;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isVisible,
  onClose,
  onConfirm,
}) => {
  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <Dialog.Title title="Confirmação" />
      <Dialog.Actions>
        <Dialog.Button onPress={onClose} title="Cancelar" />
        <Dialog.Button onPress={onConfirm} title="Confirmar" />
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmationDialog;
