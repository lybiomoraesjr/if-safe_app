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
  tooltipWidth?: number;
  tooltipHeight?: number;
  tooltipBackgroundColor?: string;
};

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  IconComponent,
  size,
  color,
  tooltipText,
  tooltipWidth,
  tooltipHeight,
  tooltipBackgroundColor,
}) => {
  const [open, setOpen] = useState(false);

  return (
    <Tooltip
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      visible={open}
      popover={<Text>{tooltipText}</Text>}
      width={tooltipWidth}
      height={tooltipHeight}
      backgroundColor={tooltipBackgroundColor}
    >
      <Container>
        <IconComponent size={size} color={color} />
      </Container>
    </Tooltip>
  );
};

export default IconWithTooltip;
