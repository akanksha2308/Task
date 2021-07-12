import React, {Component} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from 'react-native-screens/native-stack';
import Main from './source/screens/Home';
import LoginScene from './source/screens/Login';
import AddTask from './source/screens/AddTask';
import TaskList from './source/screens/TaskList';

const Stack = createNativeStackNavigator();

export default class App extends Component {
  handleAndroidBack = () => {
    return true;
  };

  render() {
    return (
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerTintColor: '#00CED1',
            headerBackTitleVisible: false,
            headerTitleStyle: {fontSize: 24, fontWeight: 'bold'},
            headerStyle: {backgroundColor: '#fff'},
            headerHideShadow: true,
          }}>
          <Stack.Screen
            name="login"
            component={LoginScene}
            initialParams
            options={{headerShown: false}}
          />
          <Stack.Screen name="main" component={Main} />
          <Stack.Screen
            name="add-task"
            component={AddTask}
            options={{title: 'Add task'}}
          />
          <Stack.Screen
            name="task-list"
            component={TaskList}
            options={{title: 'Tasks'}}
          />
        </Stack.Navigator>
      </NavigationContainer>
    );
  }
}
