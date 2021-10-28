import React, { useEffect, useState } from "react";
import { ScrollView } from "react-native";
import { api } from "../../services/api";
import { IMessageProps, Message } from "../Message";
import { styles } from "./styles";
import { io } from "socket.io-client";

let messagesQueue: IMessageProps[] = [];

const socket = io(String(api.defaults.baseURL));
socket.on("new_message", (message) => {
  messagesQueue.push(message);
});

export const MessageList = () => {
  const [currentMessages, setCurrentMessages] = useState<IMessageProps[]>();

  useEffect(() => {
    fetchMessages();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [messagesQueue[0], ...prevState!.slice(0, 10)]);
        messagesQueue.shift();
      }
    }, 3000);

    return () => clearInterval(timer);
  }, []);

  const fetchMessages = async () => {
    const messagesResponse = await api.get<IMessageProps[]>("messages/last/10");

    setCurrentMessages(messagesResponse.data);
  };
  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      {currentMessages?.map((message) => (
        <Message key={message.id} data={message} />
      ))}
    </ScrollView>
  );
};
