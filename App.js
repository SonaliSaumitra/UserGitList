/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';

import {
  SafeAreaView,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  useColorScheme,
  View,
} from 'react-native';


import {
  Colors,
  DebugInstructions,
  Header,
  LearnMoreLinks,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Details from './components/Details';
import Repos from './components/Repos'; 
import RepoDetails from './components/RepoDetails';

const Stack = createStackNavigator();
const App= () => {
  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Welcome' }}
        />
        <Stack.Screen
          name="Details"
          component={Details}
          options={{ title: 'GitHub Stats'}}
        />
         <Stack.Screen
          name="Repos"
          component={Repos}
          options={{ title: 'Repositories'}} 
        />
        <Stack.Screen
          name="RepoDetails"
          component={RepoDetails}
          options={{ title: 'Repo Details'}} 
        />
       
      </Stack.Navigator>
    </NavigationContainer>
  );
};



export default App;
