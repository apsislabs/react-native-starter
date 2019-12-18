import React from 'react';
import { Button, View, Text, TextInput, StyleSheet } from 'react-native';

import { connect } from 'react-redux';

import { Containers } from '../styles';
import { addTodo } from '../reducers/todos';

export const AddTodo = (props: any) => {
  const [todoValue, onChangeTodo] = React.useState('');

  return (
    <View style={styles.container}>
      <Text>Add a Todo</Text>
      <TextInput
        style={{ height: 40, width: '70%', borderColor: 'gray', borderWidth: 1 }}
        onChangeText={text => onChangeTodo(text)}
        value={todoValue}
      />
      <Button
        title="Add New Todo"
        onPress={() => {
          const todoId = Math.floor(Math.random() * 1000000) + 1;
          props.addTodo({ id: `${todoId}`, text: todoValue });
          onChangeTodo("");
        }}
        />
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

const mapDispatch = { addTodo };

export const AddTodoScreen = connect(mapState, mapDispatch)(AddTodo);