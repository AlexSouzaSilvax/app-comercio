import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Image,
  Alert,
  AsyncStorage
} from "react-native";

import iconVoltar from "../../assets/iconVoltar.png";
import iconSalvar from "../../assets/iconSalvar.png";
import iconApagar from "../../assets/iconApagar.png";

import { withNavigation } from "react-navigation";

function Header({
  navigation,
  titulo,
  tamanhoTitulo,
  voltar,
  apagar,
  salvar,
  styleTitulo
}) {
  const [t, setT] = useState(titulo);
  const [sTitulo, setSTitulo] = useState(styleTitulo);

  useEffect(() => {
    if (!t) {
      setT("Novo");
      setSTitulo("{ alingSelf: 'center', justifyContent: 'center' }");
    }
  }, []);

  return (
    <View style={styles.header}>
      <View>
        <TouchableOpacity onPress={() => navigation.navigate(voltar)}>
          <Image source={iconVoltar} style={styles.iconVoltar} />
        </TouchableOpacity>
      </View>

      <View></View>

      <View style={{ flex: 1, paddingTop: 5 }}>
        <Text style={[styles.titulo, sTitulo, { fontSize: tamanhoTitulo }]}>
          {t}
        </Text>
      </View>

      {apagar ? (
        <View>
          <TouchableOpacity onPress={apagar}>
            <Image source={iconApagar} style={[styles.iconApagar, {}]} />
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}

      {salvar ? (
        <View>
          <TouchableOpacity onPress={salvar}>
            <Image source={iconSalvar} style={styles.iconSalvar} />
          </TouchableOpacity>
        </View>
      ) : (
        <View />
      )}
    </View>
  );
}

export default withNavigation(Header);

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    backgroundColor: "#1B75BB",
    height: 50,
    marginTop: 24
  },
  titulo: {
    alignSelf: "center",
    marginTop: 1,
    justifyContent: "center",
    fontSize: 28,
    fontWeight: "bold",
    color: "#F3F3F3"
  },
  iconVoltar: {
    marginTop: 8,
    height: 32,
    width: 32,
    marginStart: 10,
    alignSelf: "flex-start"
  },
  iconSalvar: {
    marginTop: 8,
    height: 32,
    width: 32,
    marginEnd: 10,
    alignSelf: "flex-end"
  },
  iconApagar: {
    marginTop: 10,
    height: 25,
    width: 25,
    marginEnd: 10,
    alignSelf: "flex-end"
  }
});
