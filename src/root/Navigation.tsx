import React from 'react';
import { Button, View, Text, Settings } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import { HomeScreen } from '../screens/HomeScreen';
import { AwayScreen } from '../screens/AwayScreen';

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

const Stack = createStackNavigator();

const Navigation = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Away" component={AwayScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
