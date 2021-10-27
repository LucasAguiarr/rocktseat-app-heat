import { MotiView } from "@motify/components";
import React from "react";
import { Text, View } from "react-native";
import { UserPhoto } from "../UserPhoto";
import { styles } from "./styles";

export interface IMessageProps {
  id: string;
  text: string;
  user: {
    name: string;
    avatar_url: string;
  };
}
interface props {
  data: IMessageProps;
}
export const Message = ({ data: { id, text, user } }: props) => {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: "timing", duration: 1000 }}
      style={styles.container}
    >
      <Text style={styles.message}>{text}</Text>

      <View style={styles.footer}>
        <UserPhoto sizes="SMALL" imageUri={user.avatar_url} />

        <Text style={styles.userName}>{user.name}</Text>
      </View>
    </MotiView>
  );
};
