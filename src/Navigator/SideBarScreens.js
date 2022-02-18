import React from 'react';
import ConfigContext from '../Context/ConfigContext';
import { createStackNavigator } from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { useTheme } from '@react-navigation/native';

import {
  CompanionsIcon,
  JournalIcon,
  InventoryGoldIcon,
  InventoryIcon,
  RemindersIcon,
  NpcsIcon,
  PlacesIcon
} from '../Config/Icons';

import Npcs from '../Screen/Npcs';
import Gold from '../Screen/Gold';
import Inventory from '../Screen/Inventory';
import Companions from '../Screen/Companions';
import Reminders from '../Screen/Reminders';
import Journal from '../Screen/Journal'
import CustomDrawer from '../Components/SideBar/CustomDrawer';
import SettingsScreens from './SettingsScreens';
import Places from '../Screen/Places';


const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();

const Inventories = ["uno", "dos", "tres", "cuatro"]

function EmptyScreen() {
  return (
    <View>
    </View>
  );
}

function SideBarScreens({ route, navigation }) {

  const { colors } = useTheme()

  const { drawerItems } = React.useContext(ConfigContext)

  return (
    <Drawer.Navigator
      drawerContent={props => <CustomDrawer {...props} navigation={navigation} />}
      screenOptions={{
        headerTitleAlign: 'center',
        headerTintColor: colors.headerTint,
        headerStyle: { backgroundColor: colors.headerBackground, height: 70 },
        drawerStyle: { width: '70%', backgroundColor: colors.drawerBackground },
        drawerActiveBackgroundColor: colors.drawerActiveBackground, //fondo donde esta seleccionado
        drawerActiveTintColor: colors.drawerActiveTint, //color del los elementos seleccionados
        //drawerInactiveTintColor: 'black',  //color de los elementos no selecionados
        //headerShown: false,
        drawerLabelStyle: {
          marginLeft: -20,
          //fontFamily: "something,"
          fontSize: 15
        }
      }}>

      {drawerItems.gold &&
        <Drawer.Screen
          name="Gold"
          component={Gold}
          options={{
            drawerIcon: ({ color }) => <InventoryGoldIcon color={color} />
          }}
        />
      }

      {drawerItems.inventory && (
        (Inventories.length != 0) ?
          Inventories.map((inventoryName) => (
            <Drawer.Screen
              name={inventoryName}
              component={Inventory}
              key={"inventory " + { inventoryName }}
              options={{
                drawerIcon: ({ color }) => <InventoryIcon color={color} />,
                //drawerItemStyle: { height: 0, padding: 0, margin: 0, borderWidth: 1 },
                groupName: 'Inventory'
              }}
            />
          )) :
          <Drawer.Screen
            name="empty"
            component={EmptyScreen}
            key={"inventory " + "empty"}
            options={{
              drawerIcon: ({ color }) => <InventoryIcon color={color} />,
              //drawerItemStyle: { height: 0, padding: 0, margin: 0, borderWidth: 1 },
              groupName: 'Inventory'
            }}
          />
      )
      }

      {drawerItems.npc &&
        <Drawer.Screen
          name="NPCs"
          component={Npcs}
          options={{
            drawerIcon: ({ color }) => <NpcsIcon color={color} />
          }}
        />
      }

      {drawerItems.places &&
        <Drawer.Screen
          name='Places'
          component={Places}
          options={{
            drawerIcon: ({ color }) => <PlacesIcon color={color} />
          }}
        />
      }

      {drawerItems.companions &&
        <Drawer.Screen
          name="Companions"
          component={Companions}
          options={{
            drawerIcon: ({ color }) => <CompanionsIcon color={color} />
          }}
        />
      }

      {drawerItems.journal &&
        <Drawer.Screen
          name="Journals"
          component={Journal}
          options={{
            drawerIcon: ({ color }) => <JournalIcon color={color} />
          }}
        />
      }

      {drawerItems.reminders &&
        <Drawer.Screen
          name="Reminders"
          component={Reminders}
          options={{
            drawerIcon: ({ color }) => <RemindersIcon color={color} />
          }}
        />
      }

      <Drawer.Screen
        name="Settings"
        component={SettingsScreens}
        options={{
          drawerItemStyle: { height: 0 }
        }} />

    </Drawer.Navigator>
  );
}

export default SideBarScreens;