import React, { useState, useEffect } from "react";
import {
  SafeAreaView,
  View,
  Text,
  StyleSheet,
  FlatList,
  RefreshControl,
  BackHandler,
  Dimensions
} from "react-native";
import { Spinner } from "native-base";
import { withNavigation } from "react-navigation";
import { ActionButton } from "react-native-material-ui";

import CardAlbunsItems from "../../components/CardAlbunsItems";

import IconIonicons from "react-native-vector-icons/Ionicons";

import * as Permissions from "expo-permissions";

import ImagemFullScreen from "./ImagemFullScreen";
import CameraItem from "./CameraItem";

function AlbumItem({ navigation }) {
  const [albunsItems, setAlbunsItems] = useState([
    {
      seq_albumItem: "0",
      imagem:
        "https://pbs.twimg.com/media/ECwRQCYX4AUiXZw?format=jpg&name=4096x4096",
      caracteristica: "Roda Dianteira Carona"
    },
    {
      seq_albumItem: "1",
      imagem:
        "https://pbs.twimg.com/media/DrG9fFjXcAAU4hp?format=jpg&name=4096x4096",
      caracteristica: "Capô"
    },
    {
      seq_albumItem: "2",
      imagem:
        "https://pbs.twimg.com/media/DGqBkDzXUAAwLaL?format=jpg&name=4096x4096",
      caracteristica: "Mala"
    },
    {
      seq_albumItem: "3",
      imagem:
        "https://http2.mlstatic.com/simulador-game-cockpit-pc-xbox-g27-g29-D_NQ_NP_735069-MLB31812736306_082019-F.jpg",
      caracteristica: "Painel"
    },
    {
      seq_albumItem: "4",
      imagem:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcQKE5V41TSfHQxZdlaO0BakJwLVJmF1f9VCBYTTd9IfI4fTKyOv",
      caracteristica: "Parabrisa"
    }
  ]);

  const [loading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [modalCameraVisible, setModalCameraVisible] = useState(false);
  const [preview, setPreview] = useState(false);

  const [
    caracteristicaItemSelecionado,
    setCaracteristicaItemSelecionado
  ] = useState();
  const [imageItemSelecionado, setImagemItemSelecionado] = useState();

  //camera
  const [permissao, setPermissao] = useState(null);
  const [camera, setCamera] = useState();
  const [loadingCamera, setLoadingCamera] = useState(true);
  const [imageUri, setImageUri] = useState();

  const [codeImage, setCodeImage] = useState();

  useEffect(() => {
    async function getPermissao() {
      const { status } = await Permissions.askAsync(Permissions.CAMERA);
      setPermissao(status == "granted");
      setLoadingCamera(false);
    }

    getPermissao();
  }, []);

  function getAlbunsItems() {}

  async function capturaFoto() {
    setPreview(true);
    if (camera) {
      const options = {
        //onPictureSaved: salvandoImagem,
        //quality: 1.0,
        base64: true
        //forceUpOrientation: true,
        //fixOrientation: true
      };
      await camera.takePictureAsync(options).then(c => {
        setImageUri(c.uri);
        setCodeImage(c.base64);
        setPreview(null);
        navigation.navigate("SelecionaCaracteristica", {
          codeImage: c.base64,
          uriImage: c.uri
        });
      });
    }
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
        <ImagemFullScreen
          imagem={imageItemSelecionado}
          modalVisibleImagemFullScreen={modalVisible}
          setModalVisibleImagemFullScreen={() => setModalVisible(false)}
        />

        <CameraItem
          camera={camera}
          modalCameraVisible={modalCameraVisible}
          loadingCamera={loadingCamera}
          permissao={permissao}
          imageUri={imageUri}
          setImageUri={() => setImageUri(null)}
          setModalCameraVisible={() => setModalCameraVisible(false)}
          setCamera={ref => setCamera(ref)}
          capturaFoto={capturaFoto}
          setVisibleSelecionaCaracterista={() =>
            navigation.navigate("SelecionaCaracteristica", {
              codeImage: codeImage
            })
          }
          preview={preview}
        />

        <View style={styles.viewCard}>
          <FlatList
            data={albunsItems}
            keyExtractor={e => e.seq_albumItem}
            renderItem={({ item }) => (
              <CardAlbunsItems
                key={item.seq_albumItem}
                albumItem={item}
                onPress={() => {
                  setCaracteristicaItemSelecionado(item.caracteristica);
                  setImagemItemSelecionado(item.imagem);
                  setModalVisible(true);
                }}
              />
            )}
            refreshControl={
              <RefreshControl refreshing={loading} onRefresh={getAlbunsItems} />
            }
            ListEmptyComponent={
              <View style={styles.container}>
                <Text style={styles.textLoading}>Nenhum item encontrado</Text>
              </View>
            }
          />
        </View>

        <ActionButton
          icon={<IconIonicons name="ios-camera" color={"#F3F3F3"} size={35} />}
          style={{
            container: { backgroundColor: "#047cc4" }
          }}
          onPress={() => setModalCameraVisible(true)}
        />
      </SafeAreaView>
    );
  }
}

export default withNavigation(AlbumItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
  },
  textLoading: {
    fontSize: 20,
    color: "#444",
    alignSelf: "center",
    justifyContent: "center"
  },
  viewCard: {
    flex: 1
  },
  camera: {
    flex: 1
  },
  button: {
    alignSelf: "center",
    backgroundColor: "#F3F3F3",
    borderWidth: 4,
    borderColor: "#1B75BB",
    borderRadius: 40,
    width: 80,
    height: 80,
    marginTop: 600,
    justifyContent: "center"
  },
  preview: {
    flex: 1,
    width: "100%",
    height: "100%",
    justifyContent: "center"
  },
  buttonsPreview: {
    marginTop: 5,
    padding: 2,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputContainer: {
    alignSelf: "center",
    width: Dimensions.get("screen").width - 20,
    borderBottomWidth: 1,
    borderColor: "#aaaaaa"
  },
  label: {
    marginTop: 4,
    marginEnd: 2,
    alignSelf: "center",
    fontSize: 25,
    color: "#444"
  }
});
