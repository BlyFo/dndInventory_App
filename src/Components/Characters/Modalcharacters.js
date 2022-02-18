import React from 'react';
import { View, Image, TouchableOpacity, StyleSheet, ScrollView } from 'react-native';
import { Modal, Portal, Button, Text, Divider, TextInput, Menu, Card } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';
import MaterialIcon from 'react-native-vector-icons/MaterialIcons';

import { popUpContainerStyle, cards, genericDivider } from '../../Config/StyleConfig';
import { Dragonborn } from '../../Config/Images';

import ModalCreateCharacter from './ModalCreateCharacter';

function Modalcharacters({ show, hide }) {
  const styles = StyleSheet.create({
    Avatar: {
      borderRadius: 100,
      height: 40,
      width: 40
    },
    EditTrashButton: {
      width: 37,
      height: 35,
      justifyContent: 'center',
      alignItems: 'center'
    }
  });

  const [editVisible, SetEditVisible] = React.useState(false)
  const hideEdit = () => SetEditVisible(false);

  const [characterList, setcharacterList] = React.useState([])


  function SelectCharacter() {
    // TODO
  }
  function CreateCharacter() {
    SetEditVisible(true);
  }
  function AddNewCharacter(name, race, level, avatar) {
    setcharacterList(oldArray => [...oldArray, {
      name: name,
      race: race,
      level: level,
      avatar: avatar
    }])
  }

  const ShowCards = () => {
    let algo = []
    characterList.forEach((character, index) => {
      algo.push(
        <Card style={cards.CardSmall} key={index + ' character'} onPress={() => SelectCharacter()} onLongPress={() => console.log('edit character')}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 0, flex: 1, margin: -10, marginLeft: -8 }}>
              <Image source={character.avatar} style={styles.Avatar} />
              <View style={{ paddingLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> {character.name}</Text>
                <Text> {character.race} </Text>
              </View>
              <View style={{ flexDirection: 'row', flex: 0.26, alignItems: 'center', justifyContent: 'space-between' }}>
                <TouchableOpacity onPress={() => console.log('press edit')}>
                  <MaterialIcon name='edit' size={20} />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => console.log('press trash')}>
                  <Icon name='trash' size={20} />
                </TouchableOpacity>
              </View>
            </View>
          </Card.Content>
        </Card>
      )
    });
    algo.push(
      <Card style={cards.CardSmall} key='addNewCharacter' onPress={() => CreateCharacter()}>
        <Card.Content style={cards.CardContent}>
          <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8, alignItems: 'center' }}>
            <Icon name="plus-circle" size={40} color="lightslategrey" />
            <Text style={{ fontSize: 17, flex: 1, color: 'lightslategrey' }}> Add New character</Text>
          </View>
        </Card.Content>
      </Card>
    )
    return algo
  }

  function TestCards(number) {
    let final = number - characterList.length
    if (final > 0) {
      for (let index = 0; index < final; index++) {
        AddNewCharacter(
          'newItem', //name
          'elf',
          '16',
          Dragonborn
        )
      }
    }
  }

  return (
    <Portal >
      <Modal visible={show} onDismiss={() => hide()} contentContainerStyle={popUpContainerStyle.ContainerCompact}>
        <Text style={popUpContainerStyle.Tittle}>Characters</Text>
        <Divider style={genericDivider} />
        <ScrollView showsVerticalScrollIndicator={false} >
          <ShowCards />
        </ScrollView>
        <Button onPress={() => TestCards(10)}> Test </Button>
      </Modal>
      <ModalCreateCharacter show={editVisible} hide={hideEdit} addCharacter={AddNewCharacter} />
    </Portal>
  );
}

export default Modalcharacters;