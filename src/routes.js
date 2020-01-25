import { createAppContainer, createSwitchNavigator } from "react-navigation";

import Login from "./pages/Login";

const Routes = createAppContainer(
  createSwitchNavigator({
    Login: {
      screen: Login,
      navigationOptions: {
        headerShown: false
      }
    }
  })
);
export default Routes;
