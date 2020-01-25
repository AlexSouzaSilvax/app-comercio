import React, { useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  Dimensions,
  SafeAreaView
} from "react-native";
import { Spinner } from "native-base";
import LinearGradient from "../components/LinearGradient";
import logo from "../../assets/icon.png";
import { helper } from "../service/api";

export default function Login({ navigation }) {
  useEffect(() => {
    verificaUsuarioLogado();
  }, []);

  async function verificaUsuarioLogado() {
    let _idUsuario = await helper.getItem("_idUsuario");
    if (_idUsuario) {
      console.log("Usuário logado.");
      //navigation.navigate('App');
    } else {
      console.log("Não existe ninguem aqui");
      navigation.navigate("Login");
    }
  }

  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["#660066", "#590059"]} //4c004c ,400040
        style={styles.linearGradient}
      >
        <Image source={logo} style={styles.logo} />
        <Text
          style={{
            fontSize: 48,
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
  button: {
    width: Dimensions.get("screen").width - 40,
    height: 60,
    borderRadius: 1,
    alignSelf: "center",
    marginTop: 25,
    backgroundColor: "#400040", //"#4c004c", //"#1B75BB",
    marginTop: 15,
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 4,
    margin: 5
  },
  buttonText: {
    padding: 2,
    fontWeight: "bold",
    color: "white",
    fontSize: 25
  },
  logo: {
    marginTop: 40,
    width: 200,
    height: 250,
    alignSelf: "center",
    resizeMode: "cover"
  },
  input: {
    alignSelf: "center",
    paddingStart: 10,
    fontSize: 20,
    color: "#e5e5e5" //"#444"
  },
  inputContainer: {
    width: Dimensions.get("screen").width - 20,
    height: 60,
    borderRadius: 5,
    alignSelf: "center",
    marginTop: 45,
    backgroundColor: "#4c004c" //"#e5e5e5"
  },
  label: {
    paddingStart: 5,
    fontSize: 18,
    color: "#F3F3F3", //"#565656",
    fontWeight: "400"
  },
  textNomeEmpresa: {
    alignSelf: "center",
    fontWeight: "bold"
  }
});
