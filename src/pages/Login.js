import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  KeyboardAvoidingView,
  Dimensions,
  Alert,
  SafeAreaView,
  AsyncStorage
} from "react-native";

import { TouchableOpacity } from "react-native-gesture-handler";
import { Spinner } from "native-base";
import LinearGradient from "../components/LinearGradient";
import InputComponent from "../components/Input";
import Loading from "../components/Loading";

import logo from "../../assets/icon.png";
import iconUser from "../../assets/user.png";
import iconPassword from "../../assets/iconPassword.png";
import { api } from "../service/api";

export default function Login({ navigation }) {
  const [login, setLogin] = useState("");
  const [senha, setSenha] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("Carregar a font");
  }, []);

  async function validacaoLogin() {
    setBtnLoading(true);
    if (!login || !senha) {
      setBtnLoading(false);
      Alert.alert("Login/Senha é obrigatório");
    } else {
      await api
        .post("/usuarios/buscar", { login, senha })
        .then(response => {
          setBtnLoading(false);
          const dados = response.data;
          if (dados == null || dados == []) {
            setBtnLoading(false);
            Alert.alert("Login/Senha inválidos");
          } else {
            if (login == dados.login && senha == dados.senha) {
              AsyncStorage.setItem("idUsuario", dados._id);
              AsyncStorage.setItem("emailUsuario", dados.email);
              AsyncStorage.setItem("loginUsuario", dados.login);
              AsyncStorage.setItem("senhaUsuario", dados.senha);
              //navigation.navigate("App");
              Alert.alert("App em Desenvolvimento.");
            }
          }
        })
        .catch(error => {
          console.log(error);
          setBtnLoading(false);
          Alert.alert(`Serviço indisponível`);
        });
    }
  }

  function cadastrar() {
    navigation.navigate("Cadastrar");
  }

  function esqueciSenha() {
    navigation.navigate("EsqueciSenha");
  }

  if (loading) {
    return <Loading />;
  } else {
    return (
      <SafeAreaView behavior="padding" style={styles.container}>
        <LinearGradient
          colors={["#660066", "#590059"]} //4c004c ,400040
          style={styles.linearGradient}
        >
          <KeyboardAvoidingView
            style={styles.container}
            behavior="padding"
            enabled
          >
            <Image source={logo} style={styles.logo} />
            <Text style={styles.titulo}>Barber's</Text>

            <View style={styles.form}>
              <Text style={styles.label}>LOGIN</Text>
              <InputComponent
                icon={iconUser}
                placeholder="Seu login"
                placeholderTextColor="#aaa"
                //keyboardType="email-address" // especifica que é um input de e-mail, teclado de e-mail com @ incluso.
                autoCapitalize="none" // não permitir que já se inicie texto com caixa alta.
                autoCorrect={false} //não permitir fazer correção do texto
                valor={login}
                onChangeText={e => setLogin(e)}
              />

              <Text style={styles.label}>SENHA</Text>
              <InputComponent
                icon={iconPassword}
                placeholder="Sua senha"
                placeholderTextColor="#aaa"
                autoCorrect={false} //não permitir fazer correção do texto
                secureTextEntry={true}
                valor={senha}
                onChangeText={s => setSenha(s)}
              />

              <TouchableOpacity style={styles.button} onPress={validacaoLogin}>
                {btnLoading ? (
                  <Spinner color="#F3F3F3" />
                ) : (
                  <Text style={styles.buttonText}>Acessar</Text>
                )}
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.buttonEsqueciSenha}
                onPress={esqueciSenha}
              >
                <Text style={styles.buttonTextEsqueciSenha}>
                  Não lembro minha senha
                </Text>
              </TouchableOpacity>

              <View style={styles.linha} />

              <TouchableOpacity
                style={styles.buttonCadastrar}
                onPress={cadastrar}
              >
                <Text style={styles.buttonTextCadastrar}>Cadastrar-se</Text>
              </TouchableOpacity>
            </View>
          </KeyboardAvoidingView>
        </LinearGradient>
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  form: {
    paddingHorizontal: 30,
    marginTop: 30
  },
  label: {
    fontSize: 18,
    color: "#aaaaaa",
    marginBottom: 8
  },
  button: {
    marginTop: 15,
    height: 50,
    width: Dimensions.get("screen").width - 22,
    backgroundColor: "#400040",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 2
  },
  buttonCadastrar: {
    padding: 8,
    width: Dimensions.get("screen").width - 22,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonEsqueciSenha: {
    width: Dimensions.get("screen").width - 22,
    marginTop: 5,
    padding: 8,
    backgroundColor: "transparent",
    justifyContent: "center",
    alignItems: "center"
  },
  buttonText: {
    color: "#F3F3F3",
    fontSize: 28
  },
  buttonTextCadastrar: {
    color: "#aaaaaa",
    fontSize: 25
  },
  buttonTextEsqueciSenha: {
    color: "#aaaaaa",
    fontSize: 20
  },
  logo: {
    width: 200,
    height: 200,
    alignSelf: "center"
  },
  titulo: {
    fontSize: 58,
    alignSelf: "center",
    color: "#ddd",
    fontWeight: "bold",
    paddingTop: 15
  },
  textLoading: {
    paddingTop: 15,
    fontSize: 20,
    color: "#F3F3F3",
    alignItems: "center",
    justifyContent: "center"
  },
  linha: {
    borderWidth: 1,
    borderColor: "#777777",
    width: 300,
    alignSelf: "center"
  }
});
