import { StyleSheet } from "react-native";

export const contentStyles = StyleSheet.create({
  title: {
    textAlign: "center",
    fontWeight: "800",
    fontSize: 16,
    textTransform: "uppercase",
  },
  desc: {
    fontSize: 12,
    opacity: 0.5,
  },
  price: {
    fontWeight: "900",
    fontSize: 42,
    letterSpacing: 3,
    marginRight: 8,
  },
  currency: {
    fontSize: 16,
    lineHeight: 36,
    fontWeight: "800",
    alignSelf: "flex-end",
  },
});
