import axios from "axios";
import { AsyncStorage } from "react-native";

export const api = axios.create({
  baseURL: "https://alex-api-comercio.herokuapp.com"
});

export function sleep(milliseconds) {
  var start = new Date().getTime();
  for (var i = 0; i < 1e7; i++) {
    if (new Date().getTime() - start > milliseconds) {
      break;
    }
  }
}

export const helper = {
  async setItem(key, value) {
    try {
      console.log(value);
      return await AsyncStorage.setItem(key, JSON.stringify(value));
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async getItem(key) {
    try {
      const value = await AsyncStorage.getItem(key).then(val => {
        return val;
      });
      return value;
    } catch (err) {
      console.error(err);
      return null;
    }
  },
  async removeItem(key) {
    return await AsyncStorage.removeItem(key);
  },
  async clear() {
    return await AsyncStorage.clear();
  },
  getDataHoje() {
    var date = new Date();
    var dia = date.getDate();
    var mes = `${date.getMonth() + 1}`;
    var ano = date.getFullYear();

    if (mes.length == 1) {
      mes = `0${mes}`;
    }

    var hoje = `${ano}-${mes}-${dia}`;

    return hoje;
  },
  formatData(data) {
    if (data) {
      var dia = data.substr(8, 9);
      var mes = data.substr(5, 2);
      var ano = data.substr(0, 4);

      data = `${dia}/${mes}/${ano}`;

      return data;
    } else {
      return "-";
    }
    /*
    if (data) {
      data = data.replace(/-/g, "/").substr(0, 10);
      return data;
    }
    return "Não informado";*/
  },
  numberToReal(n) {
    return (
      "R$ " +
      n
        .toFixed(2)
        .replace(".", ",")
        .replace(/(\d)(?=(\d{3})+\,)/g, "$1.")
    );
  },
  formatTelCel(n) {
    //(21) 964645673
    //console.log(n.length); //11
    var numeroFormatado = n;
    if (n.substr(2, 9).length == 9) {
      //tratar 9 digito
      //console.log(n.substr(2, 9).length);
      var ddd = n.substr(0, 2);
      var nove = n.substr(2, 1);
      var pDigito = n.substr(3, 4);
      var sDigito = n.substr(7, 4);
      numeroFormatado = `(${ddd}) ${nove} ${pDigito}-${sDigito}`;
    } else {
      var ddd = n.substr(0, 2);
      var pDigito = n.substr(2, 4);
      var sDigito = n.substr(6, 4);
      numeroFormatado = `(${ddd}) ${pDigito}-${sDigito}`;
    }
    return numeroFormatado;
  }
};
