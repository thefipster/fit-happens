
import React from 'react';

import {
  View,
  Text,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  Header,
  DebugInstructions,
  ReloadInstructions,
  LearnMoreLinks
} from 'react-native/Libraries/NewAppScreen';



import Section from '../components/Section'



function Home() {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  };

  /*
   * To keep the template simple and small we're adding padding to prevent view
   * from rendering under the System UI.
   * For bigger apps the recommendation is to use `react-native-safe-area-context`:
   * https://github.com/AppAndFlow/react-native-safe-area-context
   *
   * You can read more about it here:
   * https://github.com/react-native-community/discussions-and-proposals/discussions/827
   */
  const safePadding = '5%'; // LR Only ??

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

          <Section title="Step One">
            Edit <Text style={styles.highlight}>App.tsx</Text> to change this
            screen and then come back to see your edits.
          </Section>

          <Section title="See Your Changes">
            <ReloadInstructions />
          </Section>

          <Section title="Debug">
            <DebugInstructions />
          </Section>

          <Section title="Learn More">
            Read the docs to discover what to do next:
          </Section>

          <LearnMoreLinks />

        </View>

      </ScrollView>

    </View>

  );

}

export default Home;



const styles = StyleSheet.create({

  highlight: {
	  fontWeight: '700',
  },

});
