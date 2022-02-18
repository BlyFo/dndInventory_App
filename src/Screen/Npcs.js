import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { cards } from '../Config/StyleConfig';
import { popUpContainerStyle } from '../Config/StyleConfig';

function Npcs({ navigation }) {

  const [NPCList, setNPCList] = React.useState([])

  function AddNewNPC(name, nickName, place, description) {

    setNPCList(oldArray => [...oldArray, {
      name: name,
      nickName: nickName,
      place: place,
      description: description
    }])
  }

  const ShowCards = () => {
    let algo = []
    NPCList.forEach((npc, index) => {
      algo.push(
        <Card style={cards.Card} key={index + ' NPC'} onPress={() => navigation.navigate("Inspect Npcs", {
          name: npc.name,
          nickName: npc.nickName,
          place: npc.place,
          description: npc.description
        })}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', margin: -10, marginLeft: -8 }}>
              <Text style={cards.cardTittle}>{npc.name}</Text>
              <Text style={cards.cardSubTittle}>{npc.nickName}</Text>
            </View>
          </Card.Content>
        </Card>
      )
    })
    algo.push(
      <Card style={cards.Card} key='addNewNPC' onPress={() => navigation.navigate("Add NPC", { addNPC: AddNewNPC })}>
        <Card.Content style={cards.CardContent}>
          <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8, alignItems: 'center' }}>
            <Icon name="plus-circle" size={40} color="lightslategrey" />
            <Text style={{ fontSize: 17, flex: 1, color: 'lightslategrey' }}> Add New NPC</Text>
          </View>
        </Card.Content>
      </Card>
    )

    return algo;
  }
  function TestCards(number) {
    let final = number - NPCList.length
    if (final > 0) {
      for (let index = 0; index < final; index++) {
        AddNewNPC(
          'RandomName',
          'RandomNickName',
          'RandomPlace',
          'RandomDescription'
        )
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ScrollView>
        <ShowCards />
      </ScrollView>
      <Button onPress={() => TestCards(10)}>TEST</Button>
    </View>
  );
}

export default Npcs;