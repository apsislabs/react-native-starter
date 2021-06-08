import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';
import { Containers } from '../styles/Containers';

export const AwayScreen = (props: any) => {
  const navigation = useNavigation();

  return (
    <View style={styles.container}>
      <Text>You are away!</Text>
      <Button title="Go Home" onPress={() => navigation.navigate('Home')} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    ...Containers.tempScreen,
  },
});
