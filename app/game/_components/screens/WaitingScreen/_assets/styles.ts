/*

    ! Style do używania tylko w kodzie WaitingScreen.tsx

*/

import { Dimensions, StyleSheet } from "react-native";

export const WaitingSCreenStyles = StyleSheet.create({
  background: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
  },
  overlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.1)",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 20,
    width: "100%",
  },
  header: {
    width: "100%",
    alignItems: "center",
    marginTop: 80,
  },
  footer: {
    width: "100%",
    alignItems: "center",
    marginBottom: 80,
  },
  title: {
    fontSize: 32,
    textAlign: "center",
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  subtitle: {
    color: "#219653",
    fontSize: 24,
    marginVertical: 10,
    textAlign: "center",
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  timeText: {
    color: "limegreen",
    fontSize: 18,
    marginTop: 10,
    textAlign: "center",
    fontFamily: "VT323Regular",
    textShadowColor: "rgba(0,0,0,1)",
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
});
