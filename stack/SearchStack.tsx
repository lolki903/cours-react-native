import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screen/Details";
import Search from "../screen/Search";

const SearchStack = createNativeStackNavigator()

export const SearchStackScreen = () => {
    return (
      <SearchStack.Navigator screenOptions={{headerShown: false}}>
        <SearchStack.Screen name="SearchScreen" component={Search}/>
        <SearchStack.Screen name="Details" component={DetailsScreen}/>
      </SearchStack.Navigator>
    );
  }