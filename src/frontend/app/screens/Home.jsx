
import React, { useState, useEffect, useCallback } from 'react';

import {
  View,
  Text,
  Button,
  ScrollView,
  StatusBar,
  StyleSheet,
  useColorScheme,
} from 'react-native';

import {
  Colors,
  Header
} from 'react-native/Libraries/NewAppScreen';



import Section from '../components/Section'



function Home() {

  const isDarkMode = useColorScheme() === 'dark';

  const backgroundStyle = {
    backgroundColor: isDarkMode ? Colors.darker : Colors.lighter
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

  const safePaddingHorizontal = '5%';
  const safePaddingVertical = 90;

  const log = function() { console.log('Hello from Outside') };

  const [user, setUser] = useState()

  return (
    
    <View style={backgroundStyle}>

      <StatusBar
        barStyle={isDarkMode ? 'light-content' : 'dark-content'}
        backgroundColor={backgroundStyle.backgroundColor}
      />

      <ScrollView
        style={backgroundStyle}>

        <View style={{paddingRight: safePaddingHorizontal}}>
          <Header/>
        </View>

        <View
          style={{
            backgroundColor: isDarkMode ? Colors.black : Colors.white,
            paddingHorizontal: safePaddingHorizontal,
            paddingBottom: safePaddingVertical,
          }}>

          <Section title={`Hello ${user}`}>
            Test <Text style={styles.highlight}>Buttons</Text> to make changes in DB.
          </Section>

          {/* ----- ----- ----- ----- ----- */}

          <Section title="Create">
            <Button
              onPress={log}
              title="Add User"
              color="crimson"
            />
          </Section>

          <Section title="Read">
            <Button
              onPress={log}
              title="Get User"
              color="crimson"
            />
          </Section>

          <Section title="Update">
            <Button
              onPress={function() { console.log('Hello from Inside') }}
              title="Update User"
              color="crimson"
            />
          </Section>

          <Section title="Delete">
            <Button
              onPress={function() { console.log('Hello from Inside') }}
              title="Delete User"
              color="crimson"
            />
          </Section>

        </View>

      </ScrollView>

    </View>

  );

}

export default Home;



const styles = StyleSheet.create({

  highlight: {
	  fontWeight: '700',
  }

});
