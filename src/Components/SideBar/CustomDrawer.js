import React from 'react';
import { Switch, Text } from 'react-native-paper';
import { DrawerContentScrollView, DrawerItemList, DrawerItem } from '@react-navigation/drawer';
import { View, ImageBackground, Image, TouchableOpacity } from 'react-native'
import { useTheme } from '@react-navigation/native';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { DarkModeIcon, SettingsIcon, DropDownArrowIcon } from '../../Config/Icons';

import { ThemeContext } from '../../Context/ThemeContext';
import ConfigContext from '../../Context/ConfigContext';

import { Dragonborn, Dwarf, Elf, Gnome, Half_Elf, Half_Orc, Halfling, Human, Tiefling } from '../../Config/Images';

import ModalChangeAvatar from './ModalChangeAvatar';
import Modalcharacters from '../Characters/Modalcharacters';
import ModalNewInventory from '../Items/ModalNewInventory';


//https://stackoverflow.com/questions/47766564/need-to-show-expandable-list-view-inside-navigation-drawer
//https://aboutreact.com/navigation-drawer-sidebar-menu-with-sectioned-menu-options-footer/?ref=morioh.com&utm_source=morioh.com


function CustomDrawer(props) {

  //modal change avatar
  const [avatarVisible, setAvatarVisible] = React.useState(false)
  const hideAvatar = () => setAvatarVisible(false);

  //modal characters
  const [charactersVisible, setCharactersVisible] = React.useState(false)
  const hideCharacters = () => setCharactersVisible(false);

  const [avatar, setAvatar] = React.useState(Dragonborn)

  const { toggleTheme } = React.useContext(ThemeContext)
  const { avatarRoundness } = React.useContext(ConfigContext);
  const { dark } = useTheme()

  const [showItems, setShowItems] = React.useState(false)

  const [newInventory, setNewInventory] = React.useState(false)
  const hideInventory = () => setNewInventory(false)

  const { state, descriptors, navigation } = props;

  let newDropDown = true;
  let lastGroupName = '';

  function addItem(route) {
    const {
      drawerActiveTintColor,
      drawerActiveBackgroundColor,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle
    } = descriptors[
      route.key
    ].options;
    const drawerName = route.name;

    return (
      <DrawerItem
        key={route.key}
        label={({ color }) => (
          <Text style={[drawerLabelStyle, { color: color }]}>{drawerName}</Text>
        )}
        focused={state.index === state.routes.findIndex(
          (e) => e.name === route.name
        )}
        activeTintColor={drawerActiveTintColor}
        activeBackgroundColor={drawerActiveBackgroundColor}
        icon={drawerIcon}
        style={drawerItemStyle}
        onPress={() => navigation.navigate(route.name)}
      />
    );

  }
  function addDropDown(route) {
    const {
      groupName,
      drawerIcon,
      drawerLabelStyle,
      drawerItemStyle
    } = descriptors[
      route.key
    ].options;
    const drawerName = route.name;
    if (lastGroupName !== groupName) {
      newDropDown = true;
      lastGroupName = groupName;
    } else newDropDown = false;

    return (
      <>
        {newDropDown ? (
          <View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>

              {/* Group DropDown Button */}

              <DropDownArrowIcon change={showItems} />

              <DrawerItem
                key={groupName + " DropDown"}
                label={({ color }) => (
                  <Text style={[drawerLabelStyle, { color: color }]}>{groupName}</Text>
                )}
                icon={drawerIcon}
                style={[drawerItemStyle, { width: '92%' }]}
                onPress={() => setShowItems(!showItems)}
              />

            </View>

            {/* Group DropDown */}

            {showItems &&
              <View style={{ marginLeft: '10%' }}>

                {/* Group DropDown  Items */}

                {state.routes.map((route) => {
                  const { groupName } = descriptors[route.key].options;
                  return (
                    <>
                      {
                        (groupName === lastGroupName && drawerName !== "empty") ? addItem(route) : null
                      }
                    </>
                  );
                })}

                {/* Group DropDown New */}

                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <FontAwesome
                    name="plus-circle"
                    style={{ marginLeft: '8.5%', position: 'absolute' }}
                    size={25}
                    color={dark ? 'white' : 'black'}
                  />
                  <DrawerItem
                    key={groupName + " DropDown add"}
                    label=''
                    style={[drawerItemStyle, { width: '92%' }]}
                    onPress={() => setNewInventory(true)}
                  />
                </View>
              </View>
            }
          </View>
        ) : null}
      </>
    );
  }

  return (
    <View style={{ flex: 1 }}>
      <DrawerContentScrollView {...props}>

        {/* Avatar */}

        <ImageBackground source={require('../../../assets/blue_backgroud_1.jpg')} style={{ padding: 20, paddingTop: 50, marginTop: "-12%" }}>
          <TouchableOpacity style={{ marginBottom: 10, alignItems: "flex-start", justifyContent: "center", height: 90, width: 90, borderRadius: avatarRoundness }} onPress={() => setCharactersVisible(true)} onLongPress={() => setAvatarVisible(true)}>
            <Image
              source={avatar}
              style={{ borderRadius: avatarRoundness, height: 90, width: 90 }}>
            </Image>
          </TouchableOpacity>
          <Text style={{ color: 'white', fontSize: 18 /*fontFamily: 'Roboto-Medium'*/ }}>Character Name</Text>
          <View style={{ flexDirection: 'row' }}>
            <Text style={{ color: 'white' }}>Race </Text>
          </View>
        </ImageBackground>

        {/* Items */}

        <View style={{ flex: 1, paddingTop: 10 }}>
          {/*<DrawerItemList {...props} />*/}
          {state.routes.map((route) => {
            const { groupName } = descriptors[route.key].options;
            const simpleItem = (groupName === undefined) ? true : false;
            return (
              <>
                {
                  simpleItem ? addItem(route) : addDropDown(route)
                }
              </>
            );
          })}
        </View>

      </DrawerContentScrollView>

      {/* Bottom Bar */}

      {<View style={{ padding: 10, borderTopWidth: 0.6, borderTopColor: '#ccd', justifyContent: 'space-between', flexDirection: 'row', alignItems: 'center' }}>
        <TouchableOpacity onPress={() => props.navigation.navigate("Settings")}>
          <SettingsIcon />
        </TouchableOpacity>
        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
          <Switch
            trackColor={{ true: 'white', false: 'black' }}
            color={'white'}
            value={dark}
            onValueChange={() => toggleTheme()}
          />
          <DarkModeIcon />
        </View>
      </View>}

      {/* Pop Ups */}

      <ModalChangeAvatar
        visible={avatarVisible}
        hide={hideAvatar}
        setAvatar={setAvatar}
      />
      <Modalcharacters
        show={charactersVisible}
        hide={hideCharacters}
      />
      <ModalNewInventory
        show={newInventory}
        hide={hideInventory}
      />
    </View>
  );
}

export default CustomDrawer;