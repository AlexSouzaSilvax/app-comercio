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

import CardEquipamentos from "../../components/CardEquipamentos";
import Pesquisa from "../../components/Pesquisa";

export default function Equipamento({ navigation }) {
  const [equipamentos, setEquipamentos] = useState([
    {
      seq_equipamento: "0",
      seq_usuario: "0",
      nome: "Siena Vermelho",
      identificacao: "LQI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "1",
      seq_usuario: "1",
      nome: "Fusca Preto",
      identificacao: "FUI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "2",
      seq_usuario: "2",
      nome: "Chevette Amarelo",
      identificacao: "OLP-0999",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "3",
      seq_usuario: "3",
      nome: "Siena Vermelho",
      identificacao: "LQI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "4",
      seq_usuario: "4",
      nome: "Fusca Preto",
      identificacao: "FUI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "5",
      seq_usuario: "5",
      nome: "Chevette Amarelo",
      identificacao: "OLP-0999",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "6",
      seq_usuario: "6",
      nome: "Siena Vermelho",
      identificacao: "LQI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "7",
      seq_usuario: "7",
      nome: "Fusca Preto",
      identificacao: "FUI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "8",
      seq_usuario: "8",
      nome: "Chevette Amarelo",
      identificacao: "OLP-0999",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "9",
      seq_usuario: "9",
      nome: "Siena Vermelho",
      identificacao: "LQI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "10",
      seq_usuario: "10",
      nome: "Fusca Preto",
      identificacao: "FUI-0385",
      descricao: "O Palmeiras não tem mundial"
    },
    {
      seq_equipamento: "11",
      seq_usuario: "11",
      nome: "Chevette Amarelo",
      identificacao: "OLP-0999",
      descricao: "O Palmeiras não tem mundial"
    }
  ]);
  const [equipamentosP, setEquipamentosP] = useState([]);
  const [equipamentosLista, setEquipamentosLista] = useState([]);
  const [loading, setLoading] = useState(false);
  const [pesquisa, setPesquisa] = useState();
  const parametrosPesquisa = ["nome", "identificacao", "descricao"];

  useEffect(() => {
    //fetch equipamentos
    getEquipamentos();
    setEquipamentosP(equipamentos);
  }, []);

  function getEquipamentos() {
    //console.log("HERE");
    //setLoading(true);
    setPesquisa("");
    setEquipamentosLista(equipamentos);
    //setLoading(false);
  }

  function pesquisar(p) {
    setPesquisa(p);
    setEquipamentosLista(
      equipamentosP.filter(createFilter(p, parametrosPesquisa))
    );
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
            placeHolder="Pesquisar equipamentos..."
            valor={pesquisa}
            //onChangeText={p => setPesquisa(p)}
            onChangeText={p => pesquisar(p)}
          />
        </View>

        <View style={styles.viewCard}>
          <FlatList
            data={equipamentosLista}
            keyExtractor={e => e.seq_equipamento}
            renderItem={({ item }) => (
              <CardEquipamentos key={item.seq_equipamento} equipamento={item} />
            )}
            refreshControl={
              <RefreshControl
                refreshing={loading}
                onRefresh={getEquipamentos}
              />
            }
            ListEmptyComponent={
              <View style={styles.container}>
                <Text style={styles.textLoading}>
                  Nenhum equipamento encontrado
                </Text>
              </View>
            }
          />
        </View>

        <ActionButton
          style={{
            container: { backgroundColor: "#047cc4" }
          }}
          onPress={() =>
            navigation.navigate("DetalheEquipamento", {
              equipamento: equipamentos
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
