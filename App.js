import { StatusBar } from 'expo-status-bar';
import {StyleSheet, Text, View } from 'react-native';

export default function App() {
  const a = 0;
  return (
    <View style={styles.container}>
      <Text>{a}</Text>
      <StatusBar style="auto" />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
