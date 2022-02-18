import React from 'react';
import { StatusBar } from 'expo-status-bar';
import { ScrollView, StyleSheet, View } from 'react-native';
import { Button, Card, Text } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

import { cards } from '../Config/StyleConfig';
import { popUpContainerStyle } from '../Config/StyleConfig';

function Journal({ navigation }) {

  const [journalList, setJournalList] = React.useState([])

  function AddNewEntry(name, date, description) {

    setJournalList(oldArray => [...oldArray, {
      name: name,
      date: date,
      description: description
    }])
  }

  const ShowCards = () => {
    let algo = []
    journalList.forEach((entry, index) => {
      algo.push(
        <Card style={cards.Card} key={index + ' Entry'} onPress={() => navigation.navigate("Inspect Entry", {
          name: entry.name,
          date: entry.date,
          description: entry.description
        })}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', margin: -10, marginLeft: -8 }}>
              <Text style={cards.cardTittle}>{entry.name}</Text>
              <Text style={cards.cardSubTittle}>{entry.date}</Text>
            </View>
          </Card.Content>
        </Card>
      )
    })
    algo.push(
      <Card style={cards.Card} key='addNewEntry' onPress={() => navigation.navigate("Add Entry", { addEntry: AddNewEntry })}>
        <Card.Content style={cards.CardContent}>
          <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8, alignItems: 'center' }}>
            <Icon name="plus-circle" size={40} color="lightslategrey" />
            <Text style={{ fontSize: 17, flex: 1, color: 'lightslategrey' }}> Add New Entry</Text>
          </View>
        </Card.Content>
      </Card>
    )

    return algo;
  }

  function TestCards(number) {
    let final = number - journalList.length
    if (final > 0) {
      for (let index = 0; index < final; index++) {
        AddNewEntry(
          'RandomName',
          'RandomDate',
          'RandomDescription'
        )
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <StatusBar style="auto" />
      <ScrollView >
        <View style={cards.CardPading}>
          <ShowCards />
        </View>
      </ScrollView>
      <Button onPress={() => TestCards(10)}>TEST</Button>
    </View>
  );
}

export default Journal;