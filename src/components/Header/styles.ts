import { StyleSheet } from "react-native";
import { COLORS, FONTS } from "../../theme";

export const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    
    paddingHorizontal: 16,
  },

  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
  },
  logoutIcon: {
    marginRight: 16,
  },
});
