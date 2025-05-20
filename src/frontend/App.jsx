
import React, { useEffect, useCallback } from 'react';

// import {
//   ScrollView,
//   StatusBar,
//   StyleSheet,
//   Text,
//   useColorScheme,
//   View,
// } from 'react-native';

// import {
//   Colors,
//   DebugInstructions,
//   Header,
//   LearnMoreLinks,
//   ReloadInstructions,
// } from 'react-native/Libraries/NewAppScreen';



import { createStaticNavigation } from '@react-navigation/native';

// import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';



import Training from './app/screens/Training';
import Statistics from './app/screens/Statistics';
import Home from './app/screens/Home';
import Models from './app/screens/Models';
import Options from './app/screens/Options';



import Nav from './app/components/Nav';



// const RootStack = createNativeStackNavigator({
//   initialRouteName: 'Home',
//   screens: {
//     Training,
//     Statistics,
//     Home,
//     Models,
//     Options,
//   },
// });

// const Navigation = createStaticNavigation(RootStack);



const NavigationBottom = createBottomTabNavigator({

  tabBar: function(props) { return <Nav {...props} /> },

  initialRouteName: 'Home',

  // screens: {
  //   Training,
  //   Statistics,
  //   Home,
  //   Models,
  //   Options,
  // },

  screens: {
    Training,
    Statistics,
    Home,
    Models: {
      screen: Models,
      options: {
        tabBarBadge: 3,
      },
    },
    Options,
  }

});

const Navigation = createStaticNavigation(NavigationBottom);



function App() {

  useEffect(function() {
    console.clear();
    console.log('Welcome to Fit-Happens.');
  });

  return <Navigation />;

}

export default App;
