import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { Containers } from '../styles/Containers';

export const HomeScreen = (props: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>Welcome Home!</Text>
      <Button title="Depart" onPress={() => navigation.navigate('Away')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Containers.tempScreen,
  },
});
