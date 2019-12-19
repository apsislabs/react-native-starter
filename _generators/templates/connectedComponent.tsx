import React from 'react';
import { View, Text } from 'react-native';

import { connect } from 'react-redux';

import { State } from '../reducers/root';

interface _NAME_Props {
}

interface ComponentProps {
}

const Component = (props: ComponentProps) => {
  return <View style={{}}>
    <Text>_NAME_ Component</Text>
  </View>
};

const mapState = (state: State, ownProps: _NAME_Props): any => {
  return {}
}

const mapDispatch = {};

export const _NAME_ = connect(mapState, mapDispatch)(Component);