import { createAppContainer, createSwitchNavigator } from "react-navigation";

import LoadAuth from "./pages/LoadAuth";
import Login from "./pages/Login";

const Routes = createAppContainer(
  createSwitchNavigator({
    LoadAuth: {
      screen: LoadAuth,
      navigationOptions: {
        headerShown: false
      }
    },
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    }
  })
);
export default Routes;
