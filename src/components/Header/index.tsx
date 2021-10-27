import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { styles } from "./styles";

import LogoSvg from "../../assets/logo.svg";
import { UserPhoto } from "../UserPhoto";
import { useAuth } from "../hooks/useAuth";
import { FontAwesome } from "@expo/vector-icons";
import { COLORS } from "../../theme";

export const Header = () => {
  const { user, signOut } = useAuth();
  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        {user && (
          <TouchableOpacity onPress={signOut}>
            <FontAwesome
              name="sign-out"
              size={24}
              color={COLORS.WHITE}
              style={styles.logoutIcon}
            />
          </TouchableOpacity>
        )}

        <UserPhoto imageUri={user?.avatar_url} />
      </View>
    </View>
  );
};
