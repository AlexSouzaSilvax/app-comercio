import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  TextInput,
  Alert,
  SafeAreaView
} from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { api, helper } from "../service/api";
//import logo from "../../assets/logo.png";

import { Spinner } from "native-base";

import LinearGradient from "../components/LinearGradient";

export default function Login({ navigation }) {
  const [email, setEmail] = useState("alexsouzasilvax@gmail.com");

  const [btnLoading, setBtnLoading] = useState(false);

  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <LinearGradient
        colors={["#660066", "#590059"]} //4c004c ,400040
        style={styles.linearGradient}
      >
        <Image
          source={{
            uri:
              "https://pbs.twimg.com/profile_images/1202375124663619585/6-H_aAxK_400x400.jpg"
          }}
          style={styles.logo}
        />
        <KeyboardAvoidingView behavior="padding" enabled>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email:</Text>
            <TextInput
              style={styles.input}
              value={email}
              onChangeText={e => setEmail(e)}
              keyboardType="email-address"
              autoCapitalize="none"
              autoCorrect={false}
              autoFocus={true}
            />
          </View>
        </KeyboardAvoidingView>
        <View style={{ alignSelf: "center" }}>
          <TouchableOpacity style={styles.button}>
            {btnLoading ? (
              <Spinner color="#F3F3F3" />
            ) : (
              <Text style={styles.buttonText}>Acessar</Text>
            )}
          </TouchableOpacity>
        </View>
        <View
          style={{
            justifyContent: "center",
            marginTop: 130
          }}
        >
          <Text
            style={[styles.textNomeEmpresa, { color: "#4c004c", fontSize: 20 }]}
          >
            from
          </Text>
          <Text
            style={[styles.textNomeEmpresa, { color: "#F3F3F3", fontSize: 25 }]}
          >
            alexsouzasilvax
          </Text>
        </View>
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
