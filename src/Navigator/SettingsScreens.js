import React, { useState, useEffect } from 'react';
import { Text, View, TouchableOpacity, Dimensions, Animated, StyleSheet } from 'react-native';
import { createMaterialTopTabNavigator } from '@react-navigation/material-top-tabs';


import GlobalSettings from '../Screen/Setings/GlobalSettings';
import CoinsSettings from '../Screen/Setings/CoinsSettings';
import StyleSettings from '../Screen/Setings/StyleSettings';

function MyTabBar({ state, descriptors, navigation, position }) {

  const [translateValue] = useState(new Animated.Value(0));
  const totalWidth = Dimensions.get("window").width;
  const tabWidth = totalWidth / state.routes.length;

  const animateSlider = (index) => {
    Animated.spring(translateValue, {
      toValue: index * tabWidth,
      velocity: 10,
      useNativeDriver: true,
    }).start();
  };
  const tabRange = state.routes.map((_, i) => i);
  const indicatorPosition = position.interpolate({
    inputRange: tabRange,
    outputRange: tabRange.map(i => (i * tabWidth))
  });

  useEffect(() => {
    animateSlider(state.index);
  }, [state.index]);

  return (
    <View style={[style.tabContainer, { width: totalWidth }]}>
      <View style={{ flexDirection: 'row', flex: 1 }}>
        {true && <Animated.View
          style={[
            style.slider,
            {
              transform: [{ translateX: indicatorPosition }],
              width: tabWidth - 60,
            },
          ]}
        />}
        {state.routes.map((route, index) => {

          const { options } = descriptors[route.key];
          const label =
            options.tabBarLabel !== undefined
              ? options.tabBarLabel
              : options.title !== undefined
                ? options.title
                : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          const onLongPress = () => {
            navigation.emit({
              type: 'tabLongPress',
              target: route.key,
            });
          };
          // modify inputRange for custom behavior
          const inputRange = state.routes.map((_, i) => i);
          const opacityTabs = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.4)),
          });

          const opacityTabs2 = position.interpolate({
            inputRange,
            outputRange: inputRange.map(i => (i === index ? 1 : 0.9)),
          });

          return (
            <TouchableOpacity
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              accessibilityLabel={options.tabBarAccessibilityLabel}
              testID={options.tabBarTestID}
              onPress={onPress}
              onLongPress={onLongPress}
              style={{ flex: 1, alignItems: 'center' }}
              key={'TopTabBar ' + label}
            >
              <Animated.Text style={{ opacity: opacityTabs, transform: [{ scale: opacityTabs2 }] }}>{label}</Animated.Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

const Tab = createMaterialTopTabNavigator();

function SettingsScreens(props) {
  return (
    <Tab.Navigator tabBar={(props) => <MyTabBar {...props} />} >
      <Tab.Screen name="Global Settings" component={GlobalSettings} />
      <Tab.Screen name="Style Settings" component={StyleSettings} />
      <Tab.Screen name="Coins Settings" component={CoinsSettings} />
    </Tab.Navigator>
  );
}

const style = StyleSheet.create({
  tabContainer: {
    height: 27,
    shadowOffset: {
      width: 0,
      height: -1,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4.0,
    marginTop: '2%',
    //backgroundColor: "white",
    //borderBottomRightRadius: 20,
    //borderBottomLeftRadius: 20,
    //elevation: 10,
  },
  slider: {
    height: 5,
    position: "absolute",
    bottom: 0,
    left: 30,
    backgroundColor: "#3A36D5",
    borderRadius: 10,
  },
});

export default SettingsScreens;