
import { 
  View,
  StyleSheet
} from 'react-native';

import { 
  useLinkBuilder, 
  useTheme
} from '@react-navigation/native';

import { 
  Text, 
  PlatformPressable
} from '@react-navigation/elements';



import Colors from '../styles/Colors';



import Icon from '@react-native-vector-icons/ionicons';



const icons = {
	'Training': 'fitness-outline',
	'Statistics': 'analytics-outline',
	'Home': 'home-outline',
	'Models': 'list-outline',
	'Options': 'settings-outline'
}



function Nav({ state, descriptors, navigation }) {

  const { colors } = useTheme();
  const { buildHref } = useLinkBuilder();

  return (

    <View style={styles.nav}>

      {state.routes.map(function(route, index) {

        const { options } = descriptors[route.key];

        const label =
          options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

        const isFocused = state.index === index;

        const onPress = function() {

          const event = navigation.emit({
            type: 'tabPress',
            target: route.key,
            canPreventDefault: true,
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(route.name, route.params);
          }

        };

        const onLongPress = function() {
          navigation.emit({
            type: 'tabLongPress',
            target: route.key,
          });
        };

        return (

          <PlatformPressable
            key={label} 
            href={buildHref(route.name, route.params)}
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={options.tabBarAccessibilityLabel}
            testID={options.tabBarButtonTestID}
            onPress={onPress}
            onLongPress={onLongPress}
            style={[
              styles.listItem,
              // label === 'Home' && styles.listItemHome,
              {
                // backgroundColor: isFocused ? '#333333' : '#eeeeee' 
                // backgroundColor: label === 'Home' ? 'white' : '#eeeeee',
              }
            ]}
          >

            {/* <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{options.tabBarBadge}</Text>
            </View> */}

            { options.tabBarBadge && <View style={styles.notificationBadge}>
              <Text style={styles.notificationBadgeText}>{options.tabBarBadge}</Text>
            </View>}

            {/* <View style={[
              styles.notificationBadge,
              {opacity: options.tabBarBadge ? 1 : 0}
            ]}>
              <Text style={styles.notificationBadgeText}>{options.tabBarBadge}</Text>
            </View> */}

            <Icon name={icons[label]} size={30} style={{ color: isFocused ? 'royalblue' : colors.text }} /> 
            {/* <Icon name={icons[label]} size={30} style={{ color: isFocused ? colors.primary : colors.text }} />       */}
            {/* <Icon name={icons[label]} size={30} style={{ color: isFocused ? '#eeeeee' : colors.text }} /> */}

            {/* <Text style={{ color: isFocused ? colors.primary : colors.text }}>{label}</Text> */}

          </PlatformPressable>

        );

      })}

    </View>

  );

}

export default Nav;



const styles = StyleSheet.create({

  nav: {
    overflow: 'hidden',
    position: 'absolute',
    bottom: 15,
    left: 15,
    right: 15,
    elevation: 0,
    height: 60,	
    borderRadius: 10,
    flexDirection: 'row',
    backgroundColor: '#f9f9f9',
    boxShadow: 'rgba(0,0,0, 0.4) 0px 8px 6px -4px' // color / offsetX / offsetY / blur / extrudeX //
    // boxShadow: 'rgba(0,0,0, 0.3) 0px 12px 8px 0px' // color / offsetX / offsetY / blur / extrudeX //
    // borderColor: '#dddddd',
    // borderWidth: 2,
  },

  listItem: {
    flex: 1,
    alignItems: 'center', 
    justifyContent: 'center',
    // backgroundColor: 'teal',    
  },

  // listItemHome: {
  //   // position: 'absolute',
  //   borderWidth: 2,
  //   borderRadius: 10,
  //   borderColor: 'snow',
  //   // height: 80,
  //   backgroundColor: 'orange'
  // },
  
  notificationBadge: {
    position: 'absolute',
    top: 10,
    right: 15,
    // width: 20,
    minWidth: 20,
    height: 20,
    paddingHorizontal: 5,
    zIndex: 1,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 20,
    backgroundColor: 'royalblue',
    borderWidth: 1.5,
    borderColor: 'snow',
    boxShadow: 'rgba(0, 0, 0, 0.1) 0px 2px 4px 0px'
  },

  notificationBadgeText: {
    color: 'snow',
    fontSize: 12
  }

});
