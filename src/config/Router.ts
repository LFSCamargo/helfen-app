import { createStackNavigator, createDrawerNavigator } from 'react-navigation'

// screens
import Home from '../screens/Home/Home'
import Login from '../screens/Login/Login'
import SignUp from '../screens/SignUp/SignUp'
import Splash from '../screens/Splash/Splash'
import HaveYouSeen from '../screens/HaveYouSeen/HaveYouSeen'
import AddPet from '../screens/Pet/AddPet'
import Map from '../screens/Map/Map'
import DrawerContainer from '../screens/Components/DrawerContainer'

export const ROUTE_NAMES = {
  SPLASH: 'SPLASH',
  HOME: 'HOME',
  SIGNUP: 'SIGNUP',
  LOGIN: 'LOGIN',
  PROFILE: 'PROFILE',
  MAP: 'MAP',
  HAVE_YOU_SEEN: 'HAVE_YOU_SEEN',
  ADD_PET: 'ADD_PET',
}

export const DrawerNav = createDrawerNavigator(
  {
    [ROUTE_NAMES.PROFILE]: Home,
    [ROUTE_NAMES.MAP]: Map,
    [ROUTE_NAMES.HAVE_YOU_SEEN]: HaveYouSeen,
  },
  {
    initialRouteName: ROUTE_NAMES.PROFILE,
    contentComponent: DrawerContainer,
  },
)

export const Router = createStackNavigator(
  {
    [ROUTE_NAMES.SPLASH]: Splash,
    [ROUTE_NAMES.HOME]: DrawerNav,
    [ROUTE_NAMES.SIGNUP]: SignUp,
    [ROUTE_NAMES.LOGIN]: Login,
    [ROUTE_NAMES.ADD_PET]: AddPet,
  },
  {
    initialRouteName: ROUTE_NAMES.SPLASH,
    navigationOptions: {
      header: null,
    },
  },
)
