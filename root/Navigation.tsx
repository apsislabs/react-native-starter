import React from 'react';
import { Button, View, Text, Settings } from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator, NavigationStackProp } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import { AddTodoScreen } from '../screens/AddTodoScreen';
import { ViewTodosScreen } from '../screens/ViewTodosScreen';

// Example of props and navigation: 
// type Props = {
//   navigation: NavigationStackProp<{ userId: string }>;
// };

// const SettingsScreen = (props: Props) => {
//   return (
//     <View>
//       <Button title="Go to Details"
//         onPress={() => this.props.navigation.navigate('Details')}
//       />
//     </View>
//   );
// }

const AppNavigator = createBottomTabNavigator(
  {
    Add: AddTodoScreen,
    View: ViewTodosScreen,
  },
  { initialRouteName: 'Add' }
);

export default createAppContainer(AppNavigator);