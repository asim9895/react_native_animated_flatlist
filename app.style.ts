import { StyleSheet } from "react-native";
const SPACING = 20;

export const appStyles = StyleSheet.create({
  cardContainer: {
    position: "absolute",
    backgroundColor: "#fff",
    height: 300,
    width: 300,
    top: SPACING * 2,
    alignSelf: "center",
    zIndex: -999,
    shadowColor: "#000",
    shadowOpacity: 1,
    shadowRadius: 24,
    shadowOffset: {
      width: 0,
      height: 0,
    },
  },
  buttonContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 25,
  },
  buttonText: { fontWeight: "bold", fontSize: 12, marginBottom: 5 },
});
