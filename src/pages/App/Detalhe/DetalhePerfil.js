import React from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  BackHandler
} from "react-native";

import Header from "../../../components/Header";

export default function DetalhePerfil({ navigation }) {
  function apagar() {
    Alert.alert("Em desenvolvimento");
  }

  function salvar() {
    Alert.alert("Em desenvolvimento");
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Preferencias");
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        voltar={"Preferencias"}
        titulo={"Suas Informações"}
        tamanhoTitulo={24}
        salvar={salvar}
      />

      <View style={{ flex: 1, justifyContent: "center", alignSelf: "center" }}>
        <Text style={{ fontSize: 25 }}>Tela DetalhePerfil</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  }
});
