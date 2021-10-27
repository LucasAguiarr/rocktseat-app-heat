import React, { useState } from "react";
import {
  Alert,
  Keyboard,
  KeyboardAvoidingView,
  TextInput,
  View,
} from "react-native";
import { api } from "../../services/api";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { styles } from "./styles";

export const SendMessageForm = () => {
  const [message, setMessage] = useState("");
  const [sendingMessage, setSendingMessage] = useState(false);

  const handleMessageSubmit = async () => {
    try {
      const messageFormatted = message.trim();

      if (!messageFormatted.length) {
        throw new Error();
      }

      setSendingMessage(true);
      await api.post("/messages", { message: messageFormatted });
      setMessage("");
      Keyboard.dismiss();
      Alert.alert("Mensagem enviada com sucesso!");
    } catch (error) {
      Alert.alert("Escreva a mensagem para enviar!");
    } finally {
      return setSendingMessage(false);
    }
  };
  return (
    <KeyboardAvoidingView
      contentContainerStyle={styles.container}
      behavior="position"
      enabled
    >
      <TextInput
        style={styles.input}
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        multiline
        maxLength={140}
        onChangeText={setMessage}
        value={message}
        editable={!sendingMessage}
      />

      <Button
        title="Enviar mensagem"
        backgroundColor={COLORS.PINK}
        color={COLORS.WHITE}
        disabled={sendingMessage}
        onPress={handleMessageSubmit}
        isLoaded={sendingMessage}
      />
    </KeyboardAvoidingView>
  );
};
