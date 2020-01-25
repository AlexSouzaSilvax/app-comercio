import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  SectionList,
  RefreshControl,
  SafeAreaView,
  BackHandler,
  Alert,
  Dimensions
} from "react-native";

import { Spinner } from "native-base";
import { createFilter } from "react-native-search-filter";

import CardSelecionarCaracteristica from "../../components/CardSelecionarCaracteristica";
import Pesquisa from "../../components/Pesquisa";

import Icon from "react-native-vector-icons/Ionicons";

import Separator from "../../components/Separtor";
import { TouchableOpacity } from "react-native-gesture-handler";
import ImagemFullScreen from "./ImagemFullScreen";

import { api } from "../../service/api";

export default function SelecionaCaracteristica({ navigation }) {
  const _codeImage = navigation.getParam("codeImage");
  const _uriImage = navigation.getParam("uriImage");

  const [caracteristicas, setCaracteristicas] = useState([
    {
      seq_caracteristica: "0",
      nome: "Capô Fox batido",
      codeImage: _codeImage,
      seq_usuario: "0"
    },
    {
      seq_caracteristica: "1",
      nome: "Rodas aro 20 omega do alemao",
      codeImage: _codeImage,
      seq_usuario: "1"
    },
    {
      seq_caracteristica: "2",
      nome: "Parabrisa quebrado citroen c4 vtr",
      codeImage: _codeImage,
      seq_usuario: "2"
    },
    {
      seq_caracteristica: "3",
      nome: "Capô novo de fusca",
      codeImage: _codeImage,
      seq_usuario: "0"
    },
    {
      seq_caracteristica: "4",
      nome: "Biela de Kombi 93 usada",
      codeImage: _codeImage,
      seq_usuario: "1"
    },
    {
      seq_caracteristica: "5",
      nome: "Parachoque siena 2001 usado",
      codeImage: _codeImage,
      seq_usuario: "2"
    },
    {
      seq_caracteristica: "6",
      nome: "Kit maçaneta cromada modelo 123 volkswagens",
      codeImage: _codeImage,
      seq_usuario: "0"
    },
    {
      seq_caracteristica: "7",
      nome: "Rodas",
      codeImage: _codeImage,
      seq_usuario: "1"
    },
    {
      seq_caracteristica: "8",
      nome: "Parabrisa",
      codeImage: _codeImage,
      seq_usuario: "2"
    },
    {
      seq_caracteristica: "9",
      nome: "Capô",
      codeImage: _codeImage,
      seq_usuario: "0"
    },
    {
      seq_caracteristica: "10",
      nome: "Rodas",
      codeImage: _codeImage,
      seq_usuario: "1"
    },
    {
      seq_caracteristica: "11",
      nome: "Parabrisa",
      codeImage: _codeImage,
      seq_usuario: "2"
    }
  ]);
  const [caracteristicasP, setCaracteristicasP] = useState([]);
  const [caracteristicasLista, setCaracteristicasLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const parametrosPesquisa = ["nome"];

  {
    /* Modal Imagem FullScreen */
  }
  const [
    modalVisibleImagemFullScreen,
    setModalVisibleImagemFullScreen
  ] = useState(false);

  useEffect(() => {
    if (_codeImage || _uriImage) {
      console.log("AEEE CATCHORRO.....");
    }

    getCaracteristicas();
    setCaracteristicasP(caracteristicas);
  }, []);

  function getCaracteristicas() {
    //console.log("HERE");
    //setLoading(true);
    setPesquisa("");
    setCaracteristicasLista(caracteristicas);
    //setLoading(false);
  }

  function pesquisar(p) {
    setPesquisa(p);
    setCaracteristicasLista(
      caracteristicasP.filter(createFilter(p, parametrosPesquisa))
    );
  }

  async function salvarAlbumItem(item) {
    setLoading(true);
    api
      .post("/albumItem", {
        headers: { seq_usuario: 0, seq_caracteristica: 0, imagem: _codeImage }
      })
      .then(resposta => {
        console.log("Resposta api: " + resposta);
        setLoading(false);
      })
      .catch(erro => {
        console.log("Erro na api: " + erro);
        setLoading(false);
      });

    /*console.log("seq_usuario: " + item.seq_usuario);
    console.log("seq_caracteristica: " + item.seq_caracteristica);
    console.log("nome: " + item.nome);
    Alert.alert("AlbumItem salvo com sucesso.");
    navigation.navigate("Album");
    //console.log("codeImage no item: " + item.codeImage);
    //console.log("uriImage no item: " + _uriImage);
    //console.log("codeImage: " + _codeImage);*/
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.goBack(null);
    return true;
  });

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: "center" }]}>
        <Spinner color="#1B75BB" />
        <Text style={styles.textLoading}>Salvando...</Text>
      </View>
    );
  } else {
    return (
      <SafeAreaView style={styles.container}>
        <View style={{ height: 80, backgroundColor: "#1B75BB" }}></View>

        {/* pesquisa */}
        <View>
          <Pesquisa
            placeHolder="Pesquisar caracteristicas..."
            valor={pesquisa}
            onChangeText={p => pesquisar(p)}
          />
        </View>

        {/* visualizar imagem */}
        <TouchableOpacity
          style={styles.cardMenu}
          onPress={() => setModalVisibleImagemFullScreen(true)}
        >
          <View
            style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 22,
                color: "#F3F3F3",
                marginEnd: 5
              }}
            >
              Visualizar imagem
            </Text>
            <Icon
              name="ios-camera"
              size={25}
              style={{ marginTop: 10, color: "#F3F3F3" }}
            />
          </View>
        </TouchableOpacity>

        <Separator styles={{ backgroundColor: "#1B75BB" }} />

        {/* Modal Imagem Full Screen */}
        <ImagemFullScreen
          imagem={_uriImage}
          modalVisibleImagemFullScreen={modalVisibleImagemFullScreen}
          setModalVisibleImagemFullScreen={setModalVisibleImagemFullScreen}
        />

        <View style={styles.cardMenu}>
          <View
            style={{ flexDirection: "row", flex: 1, justifyContent: "center" }}
          >
            <Text
              style={{
                alignSelf: "center",
                fontSize: 22,
                color: "#F3F3F3",
                marginEnd: 5
              }}
            >
              Selecione uma caracteristica
            </Text>
            <Icon
              name="ios-pricetags"
              size={20}
              style={{ marginTop: 12, color: "#F3F3F3" }}
            />
          </View>
        </View>

        <View style={styles.viewCard}>
          <FlatList
            data={caracteristicasLista}
            keyExtractor={e => e.seq_caracteristica}
            renderItem={({ item }) => (
              <CardSelecionarCaracteristica
                key={item.seq_caracteristica}
                caracteristica={item}
                onPress={() => salvarAlbumItem(item)}
              />
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getCaracteristicas}
              />
            }
            ListEmptyComponent={
              <View style={styles.container}>
                <Text style={styles.textLoading}>
                  Nenhuma característica encontrada
                </Text>
              </View>
            }
          />
        </View>
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
  },
  cardMenu: {
    width: "100%",
    height: 40,
    backgroundColor: "#1B75BB" //"#125182"
  }
});
