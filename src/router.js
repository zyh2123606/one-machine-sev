import HomeScreen from './routes/home'
import { createStackNavigator } from 'react-navigation'

const RouterConfig = {
    Home: {screen: HomeScreen}
}

export default createStackNavigator(RouterConfig)