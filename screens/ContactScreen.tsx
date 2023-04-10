import * as React from 'react';
import { Text, View, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: "#ffffff"
  }
});

export function ContactScreen() {
  return (
    <View style={styles.container}>
      <Text>Contact</Text>
    </View>
  );
}