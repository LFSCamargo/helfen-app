import { createStackNavigator } from 'react-navigation'

// screens
import Home from '../screens/Home/Home'
import Login from '../screens/Login/Login'
import SignUp from '../screens/SignUp/SignUp'
import Splash from '../screens/Splash/Splash'

export const ROUTE_NAMES = {
  SPLASH: 'SPLASH',
  HOME: 'HOME',
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
}

export const Router = createStackNavigator(
  {
    [ROUTE_NAMES.SPLASH]: Splash,
    [ROUTE_NAMES.HOME]: Home,
    [ROUTE_NAMES.SIGNUP]: SignUp,
    [ROUTE_NAMES.LOGIN]: Login,
  },
  {
    initialRouteName: ROUTE_NAMES.SPLASH,
    navigationOptions: {
      header: null,
    },
  },
)
