import React from "react";
import {
  ActivityIndicator,
  ColorValue,
  Text,
  TouchableOpacity,
  TouchableOpacityProps,
} from "react-native";
import { styles } from "./styles";
import { AntDesign } from "@expo/vector-icons";

interface IProps extends TouchableOpacityProps {
  title: string;
  color: ColorValue;
  backgroundColor: ColorValue;
  isLoaded?: boolean;
  icon?: React.ComponentProps<typeof AntDesign>["name"];
}

export const Button = ({
  icon,
  backgroundColor,
  color,
  title,
  isLoaded = false,
  ...res
}: IProps) => {
  return (
    <TouchableOpacity
      style={[styles.button, { backgroundColor }]}
      {...res}
      activeOpacity={0.7}
      disabled={isLoaded}
    >
      {isLoaded ? (
        <ActivityIndicator color={color} />
      ) : (
        <>
          <AntDesign name={icon} size={24} style={styles.icon} />
          <Text style={[styles.title, { color }]}>{title}</Text>
        </>
      )}
    </TouchableOpacity>
  );
};
