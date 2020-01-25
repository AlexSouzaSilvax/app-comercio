import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  //  Text,
  StyleSheet,
  Alert,
  Dimensions,
  TextInput,
  BackHandler
} from "react-native";

import {
  Container,
  //Header,
  Tab,
  Tabs,
  TabHeading,
  Text,
  Icon
} from "native-base";

//import Icon from "react-native-vector-icons/FontAwesome";
import IconIonicons from "react-native-vector-icons/Ionicons";

import { helper } from "../../../service/api";

import Header from "../../../components/Header";
import AlbumPrincipal from "../AlbumPrincipal";
import AlbumItem from "../AlbumItem";

export default function DetalheAlbum({ navigation }) {
  const album = navigation.getParam("album");

  const [seq_album, setSeq_Album] = useState(album.seq_album);
  const [seq_equipamento, setSeq_Equipamento] = useState(album.seq_equipamento);
  const [nome, setNome] = useState(album.nome);
  const [data, setData] = useState(album.data);
  const [nomeResponsavel, setNomeResponsavel] = useState(
    album.nome_responsavel
  );
  const [emailResponsavel, setEmailResponsavel] = useState(
    album.email_responsavel
  );
  const [telefoneResponsavel, setTelefoneResponsavel] = useState(
    album.telefone_responsavel
  );

  const [equipamentoSelecionado, setEquipamentoSelecionado] = useState(
    undefined
  );

  const [equipamentos, setEquipamentos] = useState([
    {
      seq_equipamento: "Polo Turbo 2.0",
      nome: "Polo Turbo 2.0"
    },
    {
      seq_equipamento: "Fusca",
      nome: "Fusca"
    },
    {
      seq_equipamento: "Chevette",
      nome: "Chevette"
    }
  ]);

  useEffect(() => {
    {
      /*
      if (!album) {
      setSeq_Album(0);
      setSeq_Equipamento(0);
      setNome("");
      setNomeResponsavel("");
      setEmailResponsavel("");
      setTelefoneResponsavel("");
    }
    */
    }

    if (!data) {
      setData(helper.getDataHoje());
    }

    if (telefoneResponsavel) {
      setTelefoneResponsavel(helper.formatTelCel(telefoneResponsavel));
    }
  }, []);

  async function salvar() {
    var dataHoje = helper.getDataHoje(); //yyyy-DD-mm
    setData(dataHoje);

    await console.log(
      `${seq_album} - ${seq_equipamento} - ${nome} - ${data} - ${nomeResponsavel} - ${emailResponsavel} - ${telefoneResponsavel} - ${equipamentoSelecionado}`
    );
  }

  BackHandler.addEventListener("hardwareBackPress", () => {
    navigation.navigate("Album");
    return true;
  });

  return (
    <SafeAreaView style={styles.container}>
      <Header
        voltar={"Album"}
        titulo={album.nome}
        tamanhoTitulo={23}
        styleTitulo={{
          alignSelf: "flex-start",
          paddingStart: 8,
          paddingTop: 1
        }}
        apagar={() => Alert.alert("apagado com sucesso.")}
      />
      <Tabs>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#1B75BB" }}>
              <Icon name="ios-paper" color={"#f3f3f3"} />
              <Text>Principal</Text>
            </TabHeading>
          }
        >
          <AlbumPrincipal
            nome={nome}
            onChangeTextNome={n => setNome(n)}
            data={data}
            nomeResponsavel={nomeResponsavel}
            onChangeTextNomeResponsavel={nR => setNomeResponsavel(nR)}
            telefoneResponsavel={telefoneResponsavel}
            onChangeTextTelefoneResponsavel={tR => setTelefoneResponsavel(tR)}
            emailResponsavel={emailResponsavel}
            onChangeTextEmailResponsavel={eR => setEmailResponsavel(eR)}
            equipamentoSelecionado={equipamentoSelecionado}
            onChangeTextEquipamentoSelecionado={eqS =>
              setEquipamentoSelecionado(eqS)
            }
            equipamentos={equipamentos}
          />
        </Tab>
        <Tab
          heading={
            <TabHeading style={{ backgroundColor: "#1B75BB" }}>
              <Icon name="ios-camera" fontSize={30} color={"#f3f3f3"} />
              <Text>Item</Text>
            </TabHeading>
          }
        >
          <AlbumItem />
        </Tab>
      </Tabs>
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
