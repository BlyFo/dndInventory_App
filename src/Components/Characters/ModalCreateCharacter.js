import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { Modal, Portal, Button, Text, Divider, TextInput, Menu } from 'react-native-paper';

import { popUpContainerStyle } from '../../Config/StyleConfig';
import { Dragonborn } from '../../Config/Images';

import ModalChangeAvatar from '../SideBar/ModalChangeAvatar';

function ModalCreateCharacter({ show, hide, addCharacter }) {

  const [characterName, setCharacterName] = React.useState('');
  const [characterRace, setCharacterRace] = React.useState('Pick One');
  const [CharacterLevel, setCharacterLevel] = React.useState(0);
  const [raceMenuVisible, setRaceMenuVisible] = React.useState(false)
  const [avatarMenuVisible, setAvatarMenuVisible] = React.useState(false)
  const [avatar, setAvatar] = React.useState(Dragonborn);
  const hideAvatarMenu = () => setAvatarMenuVisible(false);
  const closeRaceMenu = () => setRaceMenuVisible(false);
  const openRaceMenu = () => setRaceMenuVisible(true);

  const styles = StyleSheet.create({
    Avatar: {
      borderRadius: 100,
      height: 80,
      width: 80
    },
    ChoosenAvatarButton: {
      marginBottom: 10,
      alignItems: "center",
      justifyContent: "center",
      height: 80,
      width: 80,
      borderRadius: 40,
      borderWidth: 2
    }
  });

  function Aceptar() {
    addCharacter(
      characterName,
      characterRace,
      CharacterLevel,
      avatar
    )
    hide();
  }
  function ChooseRace(race) {
    setCharacterRace(race);
    closeRaceMenu();
  }
  function SetLevel(value) {
    value = value.replace(/\s+/g, '');
    value = value.replace(/[^0-9]/g, '');
    value = parseInt(value, 10);
    setCharacterLevel(value);
  }

  return (
    <Portal>
      <Modal visible={show} onDismiss={() => hide()} contentContainerStyle={popUpContainerStyle.Container}>
        <Text style={popUpContainerStyle.Tittle}>Edit Character</Text>
        <Divider style={popUpContainerStyle.Divider} />
        <View style={{ flexDirection: "column", alignItems: 'center' }}>
          <TouchableOpacity activeOpacity={0.7} style={styles.ChoosenAvatarButton} onPress={() => setAvatarMenuVisible(true)}>
            <Image source={avatar} style={styles.Avatar} />
          </TouchableOpacity>
          <View style={{ flexDirection: "row" }}>
            <TextInput
              label="Character Name"
              //placeholder='Character Name'
              value={characterName}
              mode='outlined'
              onChangeText={text => setCharacterName(text)}
              style={{ flex: 1 }}
            />
          </View>
          <View style={{ height: 60, width: 300, flexDirection: "row", justifyContent: 'space-between', alignItems: "center", marginTop: "5%" }}>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
              <Text> Race:  </Text>
              <Menu
                visible={raceMenuVisible}
                onDismiss={closeRaceMenu}
                anchor={<Button mode='outlined' onPress={openRaceMenu}>{characterRace}</Button>}>
                <Menu.Item onPress={() => { ChooseRace("dragonborn") }} title="dragonborn" />
                <Menu.Item onPress={() => { ChooseRace("dwarf") }} title="dwarf" />
                <Menu.Item onPress={() => { ChooseRace("elf") }} title="elf" />
                <Menu.Item onPress={() => { ChooseRace("gnome") }} title="gnome" />
                <Menu.Item onPress={() => { ChooseRace("half-elf") }} title="half-elf" />
                <Menu.Item onPress={() => { ChooseRace("half-orc") }} title="half-orc" />
                <Menu.Item onPress={() => { ChooseRace("halfling") }} title="halfling" />
                <Menu.Item onPress={() => { ChooseRace("human") }} title="human" />
                <Menu.Item onPress={() => { ChooseRace("tieflinf") }} title="tiefling" />
              </Menu>
            </View>
            <View style={{ flexDirection: "row", justifyContent: "center", alignItems: 'center' }}>
              <Text>Level:  </Text>
              <TextInput
                value={CharacterLevel.toString()}
                keyboardType='numeric'
                onChangeText={text => SetLevel(text)}
                style={{ width: 60, height: 38, textAlign: 'center' }}
                mode='outlined'
              />
            </View>
          </View>
          <Divider style={popUpContainerStyle.Divider} />
          <Button mode='contained' onPress={() => Aceptar()}> Aceptar </Button>
        </View>
      </Modal>
      <ModalChangeAvatar
        visible={avatarMenuVisible}
        hide={hideAvatarMenu}
        setAvatar={setAvatar}
      />
    </Portal>
  );
}

export default ModalCreateCharacter;