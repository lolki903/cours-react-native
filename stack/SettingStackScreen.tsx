import { createNativeStackNavigator } from "@react-navigation/native-stack";
import DetailsScreen from "../screen/Details";

const SettingsStack = createNativeStackNavigator();

export const SettingsStackScreen = () => {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}