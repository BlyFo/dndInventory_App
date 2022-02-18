import React from 'react';
import { ScrollView, StatusBar, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

function GoldRecord({ navigation }) {

  const [recordList, setRecordList] = React.useState([])

  function AddNewRecord(oldMoney, newMoney, description) {

    setNPCList(oldArray => [...oldArray, {
      oldMoney: oldMoney,
      newMoney: newMoney,
      description: description,
      action: action
    }])
  }

  const ShowCards = () => {
    let algo = []
    recordList.forEach((record, index) => {
      algo.push(
        <Card style={cards.Card} key={index + ' NPC'} onPress={() => console.log('holas')}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-evenly', margin: -10, marginLeft: -8 }}>
            </View>
          </Card.Content>
        </Card>
      )
    })

    return algo;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight + 5 }}>
      <ScrollView style={{ flex: 1 }}>

      </ScrollView>
    </SafeAreaView>
  );
}

export default GoldRecord;