import React from "react";
import { View } from "react-native";
import { Header } from "../../components/Header";
import { useAuth } from "../../components/hooks/useAuth";
import { MessageList } from "../../components/MessageList";
import { SendMessageForm } from "../../components/SendMessageForm";
import { SigninBox } from "../../components/SigninBox";
import { styles } from "./styles";

export const Home = () => {
  const { user } = useAuth();
  return (
    <View style={styles.container}>
      <Header />
      <MessageList />

      {user ? <SendMessageForm /> : <SigninBox />}
    </View>
  );
};
