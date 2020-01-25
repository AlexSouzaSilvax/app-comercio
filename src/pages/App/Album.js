import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  SafeAreaView,
  BackHandler
} from "react-native";

import { ActionButton } from "react-native-material-ui";
import { Spinner } from "native-base";
import { createFilter } from "react-native-search-filter";

import CardAlbuns from "../../components/CardAlbuns";
import Pesquisa from "../../components/Pesquisa";

export default function Album({ navigation }) {
  const [albuns, setAlbuns] = useState([
    {
      seq_album: "0",
      seq_equipamento: "0",
      nome: "OS: 1023 - Siena Vermelho",
      data: "2020-01-14",
      nome_responsavel: "Alex Souza da Silva",
      email_responsavel: "alexsouzasilvax@gmail.com",
      telefone_responsavel: "21964645673"
    },
    {
      seq_album: "1",
      seq_equipamento: "1",
      nome: "OS: 1024 - Siena Preto",
      data: "2020-01-01",
      nome_responsavel: "Bruno Fontes Ribeiro",
      email_responsavel: "bruno@crossystem.com.br",
      telefone_responsavel: "21964355854"
    },
    {
      seq_album: "3",
      seq_equipamento: "3",
      nome: "OS: 1025 - Siena Amarelo",
      data: "2001-03-03",
      nome_responsavel: "Crossystem Técnologia da Informação",
      email_responsavel: "pallua@crossystem.com.br",
      telefone_responsavel: "2135403145"
    },
    {
      seq_album: "4",
      seq_equipamento: "4",
      nome: "OS: 1023 - Siena Vermelho",
      data: "2020-03-25",
      nome_responsavel: "Zézinho",
      email_responsavel: "alexsouzasilvax@gmail.com",
      telefone_responsavel: "21964645673"
    },
    {
      seq_album: "5",
      seq_equipamento: "5",
      nome: "OS: 1024 - Siena Preto",
      data: "2020-09-12",
      nome_responsavel: "Gregório Silva",
      email_responsavel: "bruno@crossystem.com.br",
      telefone_responsavel: "2196435-5854"
    },
    {
      seq_album: "6",
      seq_equipamento: "6",
      nome: "OS: 1025 - Siena Amarelo",
      data: "2019-06-06",
      nome_responsavel: "Jáva li",
      email_responsavel: "pallua@crossystem.com.br",
      telefone_responsavel: "2135403145"
    }
  ]);

  const [albunsP, setAlbunsP] = useState([]);
  const [albunsLista, setAlbunsLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const parametrosPesquisa = ["nome", "nome_responsavel"];

  useEffect(() => {
    getAlbuns();
    setAlbunsP(albuns);
  }, []);

  function getAlbuns() {
    //setLoading(true);
    setPesquisa("");
    setAlbunsLista(albuns);
    //setLoading(false);
  }

  function pesquisar(p) {
    setPesquisa(p);
    setAlbunsLista(albunsP.filter(createFilter(p, parametrosPesquisa)));
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.goBack(null);
    return true;
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Spinner color="#1B75BB" />
        <Text style={styles.textLoading}>Carregando...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ height: 80, backgroundColor: "#1B75BB" }}></View>

        <View>
          <Pesquisa
            placeHolder="Pesquisar albuns..."
            valor={pesquisa}
            onChangeText={p => pesquisar(p)}
          />
        </View>

        <FlatList
          style={styles.viewCard}
          data={albunsLista}
          keyExtractor={e => e.seq_album}
          renderItem={({ item }) => (
            <CardAlbuns key={item.seq_album} album={item} />
          )}
          refreshControl={
            <RefreshControl refreshing={loading} onRefresh={getAlbuns} />
          }
          ListEmptyComponent={
            <View style={styles.container}>
              <Text style={styles.textLoading}>Nenhum album encontrado</Text>
            </View>
          }
        />
        <ActionButton
          style={{
            container: { backgroundColor: "#047cc4" }
          }}
          onPress={() =>
            navigation.navigate("DetalheAlbum", {
              album: albuns
            })
          }
        />
      </SafeAreaView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 24,
    backgroundColor: "#F3F3F3"
  },
  textLoading: {
    fontSize: 20,
    color: "#444",
    alignSelf: "center",
    justifyContent: "center"
  },
  containerPesquisa: {
    height: 30,
    backgroundColor: "#1B75BB",
    alignSelf: "auto"
  },
  viewCard: {
    flex: 1
  }
});
