import React, { useState } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  Dimensions,
  TextInput,
  BackHandler,
  KeyboardAvoidingView,
  Alert
} from "react-native";

import { withNavigation } from "react-navigation";
import { helper } from "../../service/api";

import CardSelecionaItem from "../../components/CardSelecionaItem";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome";

function AlbumPrincipal({
  navigation,
  nome,
  onChangeTextNome,
  data,
  nomeResponsavel,
  onChangeTextNomeResponsavel,
  telefoneResponsavel,
  onChangeTextTelefoneResponsavel,
  emailResponsavel,
  onChangeTextEmailResponsavel,
  equipamentoSelecionado,
  onChangeTextEquipamentoSelecionado,
  equipamentos
}) {
  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Album");
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Text style={[styles.input, styles.textData]}>
        {helper.formatData(data)}
      </Text>
      <View style={styles.inputContainer}>
        <Text style={styles.label}>Selecione um equipamento</Text>
        <CardSelecionaItem
          itemSelecionado={equipamentoSelecionado}
          setSelecionaItem={onChangeTextEquipamentoSelecionado}
          opcoes={equipamentos}
        />
      </View>

      <KeyboardAvoidingView behavior="padding" enabled>
        <View style={{ marginTop: 4 }}>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome</Text>
            <TextInput
              style={styles.input}
              value={nome}
              onChangeText={onChangeTextNome}
              autoCorrect={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Nome Responsável</Text>
            <TextInput
              style={styles.input}
              placeholderTextColor={"#aaaaaa"}
              value={nomeResponsavel}
              onChangeText={onChangeTextNomeResponsavel}
              autoCorrect={true}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Telefone Responsável</Text>
            <TextInput
              keyboardType="phone-pad"
              placeholder={"Ex: 99 9 9999-9999"}
              maxLength={16}
              style={styles.input}
              value={telefoneResponsavel}
              onChangeText={onChangeTextTelefoneResponsavel}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label}>Email Responsável</Text>
            <TextInput
              style={styles.input}
              value={emailResponsavel}
              onChangeText={onChangeTextEmailResponsavel}
              autoCorrect={false}
              keyboardType="email-address"
            />
          </View>
        </View>
      </KeyboardAvoidingView>

      <TouchableOpacity
        style={{
          justifyContent: "center",
          alignSelf: "center",
          marginTop: 100,
          borderRadius: 4,
          width: Dimensions.get("screen").width - 250,
          height: 40,
          backgroundColor: "#1B75BB"
        }}
        onPress={() => Alert.alert("Salvo com sucesso")}
      >
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <Text
            style={{
              alignSelf: "center",
              color: "#F3F3F3",
              fontSize: 20,
              fontWeight: "bold",
              alignSelf: "center",
              marginEnd: 10
            }}
          >
            Salvar
          </Text>
          <Icon
            name="save"
            color={"#F3F3F3"}
            size={15}
            style={{
              alignSelf: "center"
            }}
          />
        </View>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

export default withNavigation(AlbumPrincipal);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  },
  input: {
    alignSelf: "flex-start",
    paddingStart: 10,
    fontSize: 18,
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
  },
  textData: {
    width: 120,
    color: "#888888",
    alignSelf: "flex-end",
    fontSize: 16,
    left: 20
  }
});
