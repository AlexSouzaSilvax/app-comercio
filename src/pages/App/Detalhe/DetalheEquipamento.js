import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TextInput,
  BackHandler
} from "react-native";

import Header from "../../../components/Header";

export default function DetalheEquipamento({ navigation }) {
  const equipamento = navigation.getParam("equipamento");

  const [seq_equipamento] = useState(equipamento.seq_equipamento);
  const [seq_usuario] = useState(equipamento.seq_usuario);
  const [nome, setNome] = useState(equipamento.nome);
  const [identificacao, setIdentificacao] = useState(equipamento.identificacao);
  const [descricao, setDescricao] = useState(equipamento.descricao);

  function apagar() {
    Alert.alert("Em desenvolvimento");
  }

  async function salvar() {
    await console.log(
      `${seq_equipamento} - ${seq_usuario} - ${nome} - ${identificacao} - ${descricao}`
    );
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("App");
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        voltar={"Equipamento"}
        titulo={equipamento.nome}
        tamanhoTitulo={24}
        apagar={apagar}
        salvar={salvar}
      />

      <View style={{ paddingTop: 10 }}>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Nome</Text>
          <TextInput
            style={styles.input}
            value={nome}
            onChangeText={n => setNome(n)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Identificação</Text>
          <TextInput
            style={styles.input}
            value={identificacao}
            onChangeText={i => setIdentificacao(i)}
          />
        </View>
        <View style={styles.inputContainer}>
          <Text style={styles.label}>Descrição</Text>

          <TextInput
            style={styles.input}
            value={descricao}
            onChangeText={d => setDescricao(d)}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  },
  input: {
    alignSelf: "flex-start",
    paddingStart: 10,
    fontSize: 20,
    color: "#444",
    width: Dimensions.get("screen").width - 20
  },
  inputContainer: {
    width: Dimensions.get("screen").width - 20,
    height: 60,
    borderRadius: 5,
    alignSelf: "center",
    margin: 5,
    borderBottomWidth: 1,
    borderColor: "#aaa"
  },
  label: {
    paddingStart: 5,
    fontSize: 18,
    color: "#aaaaaa",
    fontWeight: "400"
  },
  labelId: {
    alignSelf: "flex-start",
    paddingTop: 5,
    color: "#767676",
    fontSize: 15
  }
});
