import React from "react";
import {
  Modal,
  View,
  Text,
  StyleSheet,
  Dimensions,
  ImageBackground,
  TouchableOpacity,
  Alert
} from "react-native";
import { withNavigation } from "react-navigation";

import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/FontAwesome";
import IconFontAwesome5 from "react-native-vector-icons/FontAwesome5";
import { Spinner } from "native-base";

function CameraItem({
  navigation,
  modalCameraVisible,
  setModalCameraVisible,
  loadingCamera,
  permissao,
  imageUri,
  setImageUri,
  setCamera,
  capturaFoto,
  setVisibleSelecionaCaracterista,
  preview
}) {
  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={modalCameraVisible}
      onRequestClose={setModalCameraVisible}
    >
      {loadingCamera ? (
        <Text style={styles.container}>Carregando...</Text>
      ) : !permissao ? (
        <Text>No access to camera</Text>
      ) : (
        <View style={{ flex: 1 }}>
          <Camera
            style={styles.camera}
            type={"Camera.Constants.Type.back"}
            autoFocus={true}
            permissionDialogTitle={"Permissão para usar a câmera"}
            permissionDialogMessage={
              "Precisamos da sua permissão para usar a câmera do seu smartphone"
            }
            ref={setCamera}
            onMountError={e => console.log(e)}
          >
            <TouchableOpacity
              disabled={preview ? true : false}
              onPress={capturaFoto}
              style={styles.button}
            ></TouchableOpacity>

            {preview ? (
              <View
                style={{
                  justifyContent: "center"
                }}
              >
                <View
                  style={{
                    backgroundColor: "#F3F3F3",
                    borderWidth: 2,
                    borderColor: "#1B75BB",
                    borderRadius: 20,
                    width: 200,
                    height: 120,
                    alignSelf: "center",
                    marginTop: -700
                  }}
                >
                  <Spinner color={"#1B75BB"} style={{ marginTop: -8 }} />
                  <Text
                    style={{
                      marginTop: -5,
                      alignSelf: "center",
                      color: "#444",
                      fontSize: 20
                    }}
                  >
                    Aguarde...
                  </Text>
                </View>
              </View>
            ) : (
              <Text />
            )}
          </Camera>
        </View>
      )}
    </Modal>
  );
}

export default withNavigation(CameraItem);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F3F3F3"
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
    flex: 1,
    marginTop: 5,
    padding: 2,
    alignSelf: "center",
    flexDirection: "row",
    justifyContent: "space-around"
  },
  inputContainer: {
    flexDirection: "row",
    alignSelf: "center",
    width: Dimensions.get("screen").width - 20,
    borderBottomWidth: 1,
    borderColor: "#aaaaaa"
  },
  label: {
    marginEnd: 2,
    alignSelf: "center",
    fontSize: 25,
    fontWeight: "bold",
    color: "#1B75BB"
  },
  labelCancelar: {
    color: "#cc0000",
    marginStart: 2,
    alignSelf: "center",
    fontSize: 20
  }
});
