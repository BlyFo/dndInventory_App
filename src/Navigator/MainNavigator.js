import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';


import SideBarScreens from './SideBarScreens';
import SettingsScreens from './SettingsScreens';

import AddItem from '../Screen/SecondaryScreens/AddItem';
import InspectItem from '../Screen/SecondaryScreens/InspectItem';
import inspectNPC from '../Screen/SecondaryScreens/InspectNPC';
import AddNPC from '../Screen/SecondaryScreens/AddNPC';
import InspectEntry from '../Screen/SecondaryScreens/InspectEntry';
import AddEntry from '../Screen/SecondaryScreens/AddEntry';

import GoldRecord from '../Screen/SecondaryScreens/GoldRecord';


const Stack = createStackNavigator();

const config = {
  animation: 'spring',
  config: {
    stiffness: 1000,
    damping: 500,
    mass: 3,
    overshootClamping: true,
    restDisplacementThreshold: 0.01,
    restSpeedThreshold: 0.01,
  },
};

function MainNavigator() {
  return (
    <Stack.Navigator initialRouteName="Main" screenOptions={{ headerShown: false }}>
      <Stack.Screen name="Main" component={SideBarScreens} />

      <Stack.Screen name="Add Inventory Item" component={AddItem} options={{ transitionSpec: { open: config, close: config } }} />
      <Stack.Screen name="Inspect Inventory Item" component={InspectItem} options={{ transitionSpec: { open: config, close: config } }} />

      <Stack.Screen name="Inspect Npcs" component={inspectNPC} options={{ transitionSpec: { open: config, close: config } }} />
      <Stack.Screen name="Add NPC" component={AddNPC} options={{ transitionSpec: { open: config, close: config } }} />

      <Stack.Screen name="Inspect Entry" component={InspectEntry} options={{ transitionSpec: { open: config, close: config } }} />
      <Stack.Screen name="Add Entry" component={AddEntry} options={{ transitionSpec: { open: config, close: config } }} />


      <Stack.Screen name="Gold Record" component={GoldRecord} options={{ transitionSpec: { open: config, close: config } }} />

    </Stack.Navigator>
  );
}

export default MainNavigator;

//      <Stack.Screen name="Settings" component={SettingsScreens} options={{ transitionSpec: { open: config, close: config } }} />