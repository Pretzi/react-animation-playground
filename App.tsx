import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Drawer } from './components/Drawer';
import { ContactScreen } from './screens/ContactScreen';
import { HomeScreen } from './screens/HomeScreen';

const Tab = createBottomTabNavigator();

const drawerItems = [
  { name: "Start" },
  { name: "Your Cart" },
  { name: "Favourites" },
  { name: "Your Orders" }
];

export default function App() {
  return (
    <Drawer drawerItems={drawerItems}>
      <NavigationContainer>
        <Tab.Navigator screenOptions={{
          headerShown: false,
          tabBarIconStyle: { display: "none" }
        }}>
          <Tab.Screen name="Home" component={HomeScreen} />
          <Tab.Screen name="Contact" component={ContactScreen} />
        </Tab.Navigator>
      </NavigationContainer>
    </Drawer>
  );
}
