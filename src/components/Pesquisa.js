import React from "react";
import { View } from "react-native";
import Icon from "react-native-vector-icons/FontAwesome";
import { Input } from "native-base";
import { withNavigation } from "react-navigation";

function Pesquisa({ placeHolder, valor, onChangeText }) {
  return (
    <View
      style={{
        flex: 1,
        flexDirection: "row",
        position: "absolute",
        height: 50,
        width: "96%",
        backgroundColor: "white",
        alignSelf: "center",
        borderRadius: 4,
        padding: 10,
        marginTop: -65
      }}
    >
      <Input
        placeholder={placeHolder}
        placeholderTextColor="#aaaaaa"
        style={{ alignSelf: "center", marginLeft: 10, color: "#444" }}
        value={valor}
        onChangeText={onChangeText}
      />
      <Icon name={"search"} size={20} color={"#aaaaaa"} />
    </View>
  );
}
export default withNavigation(Pesquisa);
