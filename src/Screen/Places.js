import React from 'react';
import { View, ScrollView, StyleSheet, ImageBackground } from 'react-native';
import { Text, Button, Card, DefaultTheme } from 'react-native-paper';

import { cards } from '../Config/StyleConfig';
import { AddItemCardIcon } from '../Config/Icons';

function Places(props) {

  const [placesList, setPlacesList] = React.useState([])

  function AddNewPlace(name, description) {

    setPlacesList(oldArray => [...oldArray, {
      name: name,
      description: description
    }])
  }

  function TestCards(number) {
    let final = number - placesList.length
    if (final > 0) {
      for (let index = 0; index < final; index++) {
        AddNewPlace(
          'RandomName',
          'RandomDescription'
        )
      }
    }
  }

  const ShowPlacesCards = () => {
    let placesCards = []
    placesList.forEach((place, index) => {
      placesCards.push(
        <Card style={cards.Card} key={index + ' Place'} onPress={() => console.log("inspect Place")}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8, borderWidth: 1 }}>
              <ImageBackground source={require('../../assets/Forest.png')} style={{ borderWidth: 1, width: '60%', marginLeft: '40%' }}>
                <View style={{ flex: 0.98, justifyContent: 'center' }}>
                  <Text style={{ fontSize: 17 }}>{place.name}</Text>
                </View>
              </ImageBackground>
            </View>
          </Card.Content>
        </Card>
      )
    });
    //add new item card
    placesCards.push(
      <Card style={cards.Card} key='addNewPlace' onPress={() => console.log("add new place")}>
        <Card.Content style={cards.CardContent}>
          <View style={cards.CardContentAddNew}>
            <AddItemCardIcon />
            <Text style={cards.CardTextAddNew}> Add New Place</Text>
          </View>
        </Card.Content>
      </Card>
    )
    return placesCards
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ShowPlacesCards />
      </ScrollView>
      <Button onPress={() => TestCards(10)}>TEST</Button>
    </View>
  );
}

export default Places;