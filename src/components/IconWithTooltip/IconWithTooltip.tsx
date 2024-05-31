import React, { useState } from "react";
import { IconProps } from "phosphor-react-native";
import { Container } from "./IconWithTooltip.styles";
import { Tooltip } from "@rneui/base";
import { Text } from "react-native";

type IconWithTooltipProps = {
  IconComponent: React.ComponentType<IconProps>;
  color?: string;
  size?: number;
  tooltipText?: string;
};

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  IconComponent,
  size,
  color,
  tooltipText,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      visible={open}
      popover={<Text>{tooltipText}</Text>}
    >
      <Container>
        <IconComponent size={size} color={color} />
      </Container>
    </Tooltip>
  );
};

export default IconWithTooltip;
