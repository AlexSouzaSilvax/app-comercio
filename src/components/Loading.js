import React from "react";
import { View, Text, Image, SafeAreaView, StyleSheet } from "react-native";
import { Spinner } from "native-base";
import LinearGradient from "../components/LinearGradient";
import logo from "../../assets/icon.png";

export default function Loading() {
  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["#660066", "#590059"]} //4c004c ,400040
        style={styles.linearGradient}
      >
        <Image source={logo} style={styles.logo} />
        <Text
          style={{
            fontSize: 58,
            alignSelf: "center",
            color: "#ddd",
            fontWeight: "bold"
            //fontFamily: "Scriptina"
          }}
        >
          Barber's
        </Text>
        <Spinner color="#aaa" size={60} style={{ marginTop: 25 }} />
      </LinearGradient>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    //paddingTop: 24,
    justifyContent: "center",
    backgroundColor: "#F3F3F3"
  },
  linearGradient: {
    flex: 1,
    minHeight: 555
  },
  logo: {
    marginTop: 40,
    width: 200,
    height: 250,
    alignSelf: "center",
    resizeMode: "cover"
  }
});
