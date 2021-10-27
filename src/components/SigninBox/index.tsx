import React from "react";
import { View } from "react-native";
import { COLORS } from "../../theme";
import { Button } from "../Button";
import { useAuth } from "../hooks/useAuth";
import { styles } from "./styles";

export const SigninBox = () => {
  const { signIn, isSignin } = useAuth();
  return (
    <View style={styles.container}>
      <Button
        title="Entrar com o github"
        color={COLORS.BLACK_PRIMARY}
        backgroundColor={COLORS.YELLOW}
        icon="github"
        onPress={signIn}
        isLoaded={isSignin}
      />
    </View>
  );
};
