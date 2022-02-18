import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button, Card, DefaultTheme } from 'react-native-paper';

import { cards } from '../../Config/StyleConfig';

function HistoricalRecord() {

  const oldPiece = {
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0
  }
  const newPiece = {
    copper: 10,
    silver: 10,
    electrum: 10,
    gold: 10,
    platinum: 10
  }
  const total = {
    copper: 10,
    silver: 5,
    electrum: 9,
    gold: -10,
    platinum: -90
  }

  const [recordList, setRecordList] = React.useState([])

  function AddNewRecord(type, oldMoney, newMoney, total, description) {

    setRecordList(oldArray => [...oldArray, {
      type: type,
      oldMoney: oldMoney,
      newMoney: newMoney,
      total: total,
      description: description
    }])
  }

  function TestCards(number) {
    let final = number - recordList.length
    if (final > 0) {
      for (let index = 0; index < final; index++) {
        AddNewRecord(
          'RandomTransaction',
          oldPiece,
          newPiece,
          total,
          'RandomDescription'
        )
      }
    }
  }

  const ShowRecordCards = () => {
    let recordsCards = []
    recordList.forEach((record, index) => {
      recordsCards.push(
        <Card style={cards.Card} key={index + ' Record'} onPress={() => console.log("inspect Record")}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8, borderWidth: 1 }}>
              <View style={{ flex: 0.98, justifyContent: 'center' }}>
                <Text style={{ fontSize: 17 }}>{record.type}</Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )
    });
    return recordsCards
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ShowRecordCards />
      </ScrollView>
      <Button onPress={() => TestCards(10)}>TEST</Button>
    </View>
  );
}

export default HistoricalRecord;