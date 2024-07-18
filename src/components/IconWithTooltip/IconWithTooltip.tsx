import { TooltipText } from "@gluestack-ui/themed";
import { Icon, Tooltip, TooltipContent } from "@gluestack-ui/themed";
import React, { ComponentProps } from "react";
import { TouchableOpacity } from "react-native";

type IconWithTooltipProps = ComponentProps<typeof Tooltip> & {
  icon: React.ElementType;
  text: string;
  size?: number;
};

const IconWithTooltip: React.FC<IconWithTooltipProps> = ({
  icon,
  text,
  size = "md",
}) => {
  return (
    <Tooltip
      placement="top"
      trigger={(triggerProps) => {
        return (
          <TouchableOpacity>
            <Icon as={icon} size={size} />;
          </TouchableOpacity>
        );
      }}
    >
      <TooltipContent>
        <TooltipText>{text}</TooltipText>
      </TooltipContent>
    </Tooltip>
  );
};

export default IconWithTooltip;
