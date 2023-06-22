import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

// Import screens
import RecordingScreen from '../Screens/RecordingScreen';
import DashboardScreen from '../Screens/DashboardScreen';
import AnnotateScreen from '../Screens/AnnotateScreen';
import ClassifyScreen from '../Screens/ClassifyScreen';

const Stack = createStackNavigator();

function StackNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Recording" component={RecordingScreen} />
        <Stack.Screen name="Dashboard" component={DashboardScreen} />
        <Stack.Screen name="Annotate" component={AnnotateScreen} />
        <Stack.Screen name="Classify" component={ClassifyScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default StackNavigator;
