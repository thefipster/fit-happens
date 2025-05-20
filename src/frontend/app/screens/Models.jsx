
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme
} from 'react-native';

import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';



import Section from '../components/Section'



function Models() {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  const safePadding = '5%';

  return (
    
    <View style={backgroundStyle}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        style={backgroundStyle}>

        <View style={{paddingRight: safePadding}}>
          <Header/>
        </View>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePadding,
            paddingBottom: safePadding,
          }}>

          <Section title="Models Screen">
            This is the <Text style={styles.highlight}>Models</Text> screen.
          </Section>

          <Section title="Just Testing">
            Check out the other screens to see if they are working, too.
          </Section>

        </View>

      </ScrollView>

    </View>

  );

}

export default Models;



const styles = StyleSheet.create({

  highlight: {
	  fontWeight: '700',
  },

});
