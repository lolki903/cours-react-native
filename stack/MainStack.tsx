import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faHomeLg, faPerson, faBookBookmark, faSearch } from "@fortawesome/free-solid-svg-icons";
import { NavigationContainer } from "@react-navigation/native";
import React from "react";
import { View } from "react-native";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SafeAreaProvider } from "react-native-safe-area-context";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { HomeStackScreen } from "./HomeStackScreen";
import { Profile } from "../screen/Profile";
import { SearchStackScreen } from "./SearchStack";
import { useUserContext } from '../providers/UserContext';

const Tab = createBottomTabNavigator();

const renderTabBarIcon = (routeName: string, color: string, size: number) => {
  let iconName;
  if (routeName === 'Home') {
    iconName = faHomeLg;
  } else if (routeName === 'Profile') {
    iconName = faPerson;
  } else if (routeName === 'Wishlist') {
    iconName = faBookBookmark;
  } else if (routeName === 'Search') {
    iconName = faSearch;
  } else {
    iconName = faHomeLg;
  }
  return <FontAwesomeIcon icon={iconName} size={size} color={color} />;
};

export const MainStack = () => {
  const { user } = useUserContext();
  const backgroundColor = user?.theme ? '#fff' : '#000';
  const tabBarActiveTintColor = '#f0c929';
  const tabBarInactiveTintColor = user?.theme ? 'grey' : 'white';

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <GestureHandlerRootView style={{ flex: 1}}>
          <Tab.Navigator
            screenOptions={({ route }) => ({
              tabBarActiveTintColor: tabBarActiveTintColor,
              tabBarInactiveTintColor: tabBarInactiveTintColor,
              tabBarStyle: {
                backgroundColor: backgroundColor,
                paddingTop: 10,
                height:'9%',
                paddingBottom: 10,
                borderTopWidth: 0
              },
              headerShown: false,
              tabBarBackground: () => (
                <View
                  style={{
                    backgroundColor: backgroundColor,
                    borderTopWidth: 0
                  }}
                />
              ),
              tabBarIcon: ({ color, size }) => renderTabBarIcon(route.name, color, size),
            })}
          >
            <Tab.Screen name="Home" component={HomeStackScreen} />
            <Tab.Screen name="Search" component={SearchStackScreen} />
            <Tab.Screen name="Wishlist" component={Profile} />
            <Tab.Screen name="Profile" component={Profile} />
          </Tab.Navigator>
        </GestureHandlerRootView>
      </NavigationContainer>
    </SafeAreaProvider>
  );
}