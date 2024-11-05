import * as React from 'react';
import { Button, Text, View } from 'react-native';
import { NavigationContainer, NavigationProp } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faHome, faCog, faPerson, faHomeAlt, faHomeLg, faList, faBookBookmark, faSearch } from '@fortawesome/free-solid-svg-icons';
import HomeScreen from './screen/Home';
import CounterProvider, { CounterContext } from './providers/CounterContext';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import DetailsScreen from './screen/Details';
import svg from './assets/icon_wishlist.svg'

function SettingsScreen({ navigation } : Readonly<{ navigation: NavigationProp<any> }>) {
  const {counter } = React.useContext(CounterContext)
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>

      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
      <Text> {counter} </Text>
    </View>
  );
}

function LoginScreen({ navigation } : Readonly<{ navigation: NavigationProp<any> }>) {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Settings screen</Text>
      <Button
        title="Go to Details"
        onPress={() => navigation.navigate('Details')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

function HomeStackScreen() {
  return (
    <HomeStack.Navigator screenOptions={{headerShown: false}}>
      <HomeStack.Screen name="Home" component={HomeScreen}/>
      <HomeStack.Screen name="Details" component={DetailsScreen}/>
      <HomeStack.Screen name="Login" component={LoginScreen} />
    </HomeStack.Navigator>
  );
}

const SettingsStack = createNativeStackNavigator();

function SettingsStackScreen() {
  return (
    <SettingsStack.Navigator>
      <SettingsStack.Screen name="Settings" component={SettingsScreen} />
      <SettingsStack.Screen name="Details" component={DetailsScreen} />
    </SettingsStack.Navigator>
  );
}

const Tab = createBottomTabNavigator();
export default function App() {
  return (
    <SafeAreaProvider>
    <NavigationContainer>
      <GestureHandlerRootView style={{ flex: 1 }}>
      <CounterProvider>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          activeTintColor: 'white',
          inactiveTintColor: 'gray',
          style: {
            backgroundColor: 'black',
          },
          headerShown: false,
          tabBarBackground: () => (
            <View style={{ position: 'absolute', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'black' }} />
          ),
          tabBarIcon: ({ color, size }) => {
            let iconName;
            if (route.name === 'Home') {
              iconName = faHomeLg;
            } else if (route.name === 'Profile') {
              iconName = faPerson;
            } else if (route.name === 'Wishlist') {
              iconName = faBookBookmark;
            } else if (route.name === 'Search') {
              iconName = faSearch;
            }
            return <FontAwesomeIcon icon={iconName || faCog} size={size} color={color} />;          },
        })}
        >
        <Tab.Screen name="Home" component={HomeStackScreen} />
        <Tab.Screen name="Search" component={SettingsStackScreen} />
        <Tab.Screen name="Wishlist" component={SettingsStackScreen} />
        <Tab.Screen name="Profile" component={SettingsStackScreen} />
      </Tab.Navigator>
          </CounterProvider>
    </GestureHandlerRootView>
    </NavigationContainer>
    </SafeAreaProvider>
  );
}