import React, { useState } from "react";
import {
  View,
  StyleSheet,
  FlatList,
  SafeAreaView,
  BackHandler
} from "react-native";

import CardPreferencias from "../../components/CardPreferencias";

export default function Preferencias({ navigation }) {
  const [preferencias] = useState([
    {
      seq_preferencia: "0",
      nome: "Perfil",
      descricao: "Informações do negócio",
      tela: "DetalhePerfil",
      icon: "user"
    },
    {
      seq_preferencia: "1",
      nome: "Características",
      descricao: "Descrição das fotografias",
      tela: "DetalheCaracteristica",
      icon: "file-text-o"
    }
  ]);

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.goBack(null);
    return true;
  });

  return (
    <SafeAreaView behavior="padding" style={styles.container}>
      <View style={{ height: 4, backgroundColor: "#1B75BB" }}></View>

      <FlatList
        style={styles.viewCard}
        data={preferencias}
        keyExtractor={p => p.seq_preferencia}
        renderItem={({ item }) => (
          <CardPreferencias key={item.seq_preferencia} preferencia={item} />
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#F3F3F3"
  },
  viewCard: {
    paddingTop: 4,
    flex: 1
  }
});
