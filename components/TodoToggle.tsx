import React from 'react';
import { View, Text, Switch } from 'react-native';

import { connect } from 'react-redux';

// import { Containers } from '../styles';
import { toggleTodo, Todo } from '../reducers/todos';
import { State } from '../reducers/root';

interface ToggleTodoProps {
    id: string;
}

interface ComponentProps {
    t: Todo;
    toggleTodo: (id: string) => void;
}

const Component = (props: ComponentProps) => {
    const { t } = props;
    return <View style={{flexDirection: 'row'}}>
        <Switch value={t.completed} onValueChange={() => props.toggleTodo(t.id)}/>
        <Text>{t.text}</Text>
    </View>
};

const mapState = (state: State, ownProps: ToggleTodoProps): any => {
  return {
      t: state.todos.find(t => t.id == ownProps.id)
  };
}

const mapDispatch = { toggleTodo };

export const TodoToggle = connect(mapState, mapDispatch)(Component);