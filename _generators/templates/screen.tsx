import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { connect } from 'react-redux';
import { Containers } from '../styles';

export const _NAME_ = (props: any) => {
  return (
      <View style={styles.container}>
         <Text>_NAME_ Screen</Text> 
      </View>
  );
}

const styles = StyleSheet.create({
    container: {
      ...Containers.tempScreen
    }
});

const mapState = (state: any) => {
  return {};
}

const mapDispatch = {};

export const _NAMEFULL_ = connect(mapState, mapDispatch)(_NAME_);