import React from "react";
import { Button, ButtonProps } from "@rneui/base";
import theme from "../../theme";

type ButtonComponentProps = ButtonProps & {
  variant?: "solid" | "outline";
};

const ButtonComponent: React.FC<ButtonComponentProps> = ({
  variant,
  ...rest
}) => {
  return (
    <Button
      loadingProps={{ size: "small", color: theme.COLORS.WHITE }}
      buttonStyle={{
        backgroundColor:
          variant === "outline" ? "transparent" : theme.COLORS.BRAND_MID,
        borderRadius: 6,
        borderWidth: variant === "outline" ? 1 : 0,
        borderColor: theme.COLORS.BRAND_LIGHT,
      }}
      titleStyle={{
        fontFamily: theme.FONT_FAMILY.BOLD,
        fontSize: theme.FONT_SIZE.MD,
        color:
          variant === "outline" ? theme.COLORS.BRAND_LIGHT : theme.COLORS.WHITE,
      }}
      containerStyle={{
        minHeight: 60,
        maxWidth: 250,
      }}
      {...rest}
    />
  );
};

export default ButtonComponent;
