import React from "react";
import { StyleSheet, Dimensions, Image, Modal } from "react-native";
import { withNavigation } from "react-navigation";

function ImagemFullScreen({
  navigation,
  imagem,
  modalVisibleImagemFullScreen,
  setModalVisibleImagemFullScreen
}) {
  return (
    <Modal
      animationType="none"
      transparent={false}
      visible={modalVisibleImagemFullScreen}
      onRequestClose={setModalVisibleImagemFullScreen}
    >
      <Image source={{ uri: imagem }} style={styles.imagem} />
    </Modal>
  );
}

export default withNavigation(ImagemFullScreen);

const styles = StyleSheet.create({
  imagem: {
    flex: 1,
    width: Dimensions.get("screen").width,
    height: Dimensions.get("screen").height
  }
});
