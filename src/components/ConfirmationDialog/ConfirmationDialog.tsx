import { Dialog } from "@rneui/themed";
import Button from "../Button";
import { useTheme } from "styled-components";
import { useState } from "react";
import { Text } from "react-native";

type ConfirmationDialogProps = {
  isVisible: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  description?: string;
};

const ConfirmationDialog: React.FC<ConfirmationDialogProps> = ({
  isVisible,
  onClose,
  onConfirm,
  description,
}) => {
  const { COLORS } = useTheme();

  const [isLoading, setIsLoading] = useState(false);

  return (
    <Dialog isVisible={isVisible} onBackdropPress={onClose}>
      <Dialog.Title title="Confirmar ação" />
      <Text>{description}</Text>
      <Dialog.Actions>
        <Button
          title="Cancelar"
          style={{ backgroundColor: COLORS.CANCELED }}
          onPress={onClose}
          disabled={isLoading}
        />
        <Button
          title="Confirmar"
          onPress={async () => {
            setIsLoading(true);
            await onConfirm();
          }}
          isLoading={isLoading}
          disabled={isLoading}
        />
      </Dialog.Actions>
    </Dialog>
  );
};

export default ConfirmationDialog;
