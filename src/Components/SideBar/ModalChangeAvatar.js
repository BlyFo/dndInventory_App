import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet } from 'react-native'
import { Modal, Text, Portal, Divider } from 'react-native-paper';

import { popUpContainerStyle } from '../../Config/StyleConfig';
import { Dragonborn, Dwarf, Elf, Gnome, Half_Elf, Half_Orc, Halfling, Human, Tiefling } from '../../Config/Images';

function ModalChangeAvatar({ visible, hide, setAvatar }) {

  const styles = StyleSheet.create({
    Avatars: {
      borderRadius: 100,
      height: 50,
      width: 50
    },
    Button: {
      borderRadius: 100,
      height: 50,
      width: 50,
      alignItems: 'center',
      justifyContent: 'center',
      marginVertical: "1%",
      marginHorizontal: "1%",
    }
  });

  function ChangeAvatar(Image) {
    setAvatar(Image)
    hide();
  }

  return (
    <Portal>
      <Modal visible={visible} onDismiss={() => hide()} contentContainerStyle={popUpContainerStyle.Container} >
        <Text style={popUpContainerStyle.Tittle}> Change Avatar</Text>
        <Divider style={popUpContainerStyle.Divider} />
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Dragonborn)} style={styles.Button}>
            <Image style={styles.Avatars} source={Dragonborn} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Dwarf)} style={styles.Button}>
            <Image style={styles.Avatars} source={Dwarf} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Elf)} style={styles.Button}>
            <Image style={styles.Avatars} source={Elf} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Gnome)} style={styles.Button}>
            <Image style={styles.Avatars} source={Gnome} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Half_Elf)} style={styles.Button}>
            <Image style={styles.Avatars} source={Half_Elf} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Half_Orc)} style={styles.Button}>
            <Image style={styles.Avatars} source={Half_Orc} />
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Halfling)} style={styles.Button}>
            <Image style={styles.Avatars} source={Halfling} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Human)} style={styles.Button}>
            <Image style={styles.Avatars} source={Human} />
          </TouchableOpacity>
          <TouchableOpacity activeOpacity={0.7} onPress={() => ChangeAvatar(Tiefling)} style={styles.Button}>
            <Image style={styles.Avatars} source={Tiefling} />
          </TouchableOpacity>
        </View>
      </Modal>
    </Portal>
  );
}

export default ModalChangeAvatar;