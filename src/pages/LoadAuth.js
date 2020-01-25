import React, { useEffect } from "react";
import { helper } from "../service/api";
import Loading from "../components/Loading";
export default function Login({ navigation }) {
  useEffect(() => {
    verificaUsuarioLogado();
  }, []);

  async function verificaUsuarioLogado() {
    let idUsuario = await helper.getItem("idUsuario");
    if (idUsuario) {
      console.log("Usuário logado.");
      //navigation.navigate('App');
    } else {
      console.log("Não existe ninguem aqui");
      navigation.navigate("Login");
    }
  }

  return <Loading />;
}
