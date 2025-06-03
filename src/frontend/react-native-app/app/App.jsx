
import React from 'react'

// ----- ----- ----- ----- ----- //

import {
  View,
  Text,
  Image,
  StatusBar,
  Dimensions,
  StyleSheet,
  useColorScheme,
  useWindowDimensions
} from 'react-native'

// ----- ----- ----- ----- ----- //

import { SafeAreaProvider } from 'react-native-safe-area-context'

// ----- ----- ----- ----- ----- //

import Icon from '@react-native-vector-icons/ionicons';

// ----- ----- ----- ----- ----- //

import colors from './styles/colors'

// ----- ----- ----- ----- ----- //

import logoDark from './assets/images/logo/logo_dark.png'
import logoLight from './assets/images/logo/logo_light.png'

// ----- ----- ----- ----- ----- //

function App() {

  const paddingHorizontal = '10%'

  const isDarkMode = useColorScheme() === 'dark'
  // const isDarkMode = useColorScheme() !== 'dark'

  const schemeBG = { backgroundColor: isDarkMode ? colors.darker : colors.lighter }
  const schemeText = { color: isDarkMode ? colors.lighter : colors.darker }

  const window = Dimensions.get('window')
  // const window = useWindowDimensions()

  return (

    <SafeAreaProvider>

      <StatusBar barStyle={ isDarkMode ? 'light-content' : 'dark-content' } backgroundColor={schemeBG.backgroundColor} translucent={true} />

      <View style={[schemeBG, styles.container, { width: '100%', height: window.height, paddingHorizontal: paddingHorizontal }]}>

        <Image style={styles.logo} source={ isDarkMode ? logoLight : logoDark } />

        {/* <Text style={[schemeText, styles.text]}>Fit Happens.</Text> */}

        <Text style={[schemeText, styles.text]}>Good Game <Icon name="bicycle" size={30} color={schemeText.color} /></Text>

      </View>

    </SafeAreaProvider>
  )

}

// ----- ----- ----- ----- ----- //

const styles = StyleSheet.create({

  container: {
    flex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    // flexDirection: 'column'
  },

  logo: {
    height: '25%',
    objectFit: 'contain'
  },

  // text: {
  //   fontSize: 24,
  //   fontWeight: 600,
  //   fontStyle: 'italic',
  //   marginTop: -24,
  //   marginLeft: 24
  // }

  text: {
    marginTop: -24,
    marginLeft: 24,
    fontSize: 24,
    letterSpacing: -0.5,
    fontFamily: 'Montserrat-MediumItalic'
  }

})

// ----- ----- ----- ----- ----- //

export default App
