import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screen/Details";
import Login from "../screen/Login";
import Home from "../screen/Home";

const HomeStack = createNativeStackNavigator()

export const HomeStackScreen = () => {
    return (
      <HomeStack.Navigator screenOptions={{headerShown: false}}>
        <HomeStack.Screen name="HomeScreen" component={Home}/>
        <HomeStack.Screen name="Details" component={DetailsScreen}/>
      </HomeStack.Navigator>
    );
  }