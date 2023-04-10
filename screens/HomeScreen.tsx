import * as React from 'react';
import { Text, View, StyleSheet, Button } from 'react-native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff",
  }
});

function Screen1({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You are in stack screen 1</Text>
      <Button
        title="Go to Screen 2"
        onPress={() => navigation.navigate('Screen 2')}
      />
    </View>
  );
}

function Screen2({ navigation }) {
  return (
    <View style={styles.container}>
      <Text>You are in stack screen 2</Text>
      <Button
        title="Go to Screen 1"
        onPress={() => navigation.navigate('Screen 1')}
      />
    </View>
  );
}

const HomeStack = createNativeStackNavigator();

export function HomeScreen() {
  return (
    <HomeStack.Navigator screenOptions={{
      headerShown: false,
    }}>
      <HomeStack.Screen name="Screen 1" component={Screen1} />
      <HomeStack.Screen name="Screen 2" component={Screen2} />
    </HomeStack.Navigator>
  );
}