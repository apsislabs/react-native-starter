import React from 'react';
import { View, Text, Switch, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { Containers } from '../styles';
import { TodoToggle } from '../components';
import { toggleTodo } from '../reducers/todos';

export const ViewTodos = (props: any) => {
  return (
    <View style={styles.container}>
      <Text>All Todos</Text>
      {props.todos.map((t: any) => {
          return <TodoToggle key={t.id} id={t.id} />
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    ...Containers.tempScreen
  }
});

const mapState = (state: any) => {
  return {
    todos: state.todos
  };
}

const mapDispatch = { toggleTodo };

export const ViewTodosScreen = connect(mapState, mapDispatch)(ViewTodos);