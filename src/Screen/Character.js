import React from 'react';
import { Image, View, StyleSheet, ScrollView } from 'react-native';
import { Card, Text, Title } from 'react-native-paper';

import { Dragonborn } from '../Config/Images';
import { cards } from '../Config/StyleConfig';

import ModalCreateCharacter from '../Components/Characters/ModalCreateCharacter';

function Characters(props) {

  const styles = StyleSheet.create({
    Avatar: {
      borderRadius: 100,
      height: 40,
      width: 40
    }
  });

  const [editVisible, SetEditVisible] = React.useState(false)
  const hideEdit = () => SetEditVisible(false);

  function SelectCharacter() {
    // TODO
  }
  function EditCharacter() {
    SetEditVisible(true);
  }

  const ShowCards = ({ number }) => {
    let algo = []
    for (let index = 0; index < number; index++) {
      algo.push(
        <Card style={cards.Card} key={index} onPress={() => SelectCharacter()} onLongPress={() => EditCharacter()}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flexDirection: "row", alignItems: "center", justifyContent: "center", paddingBottom: 0, flex: 1 }}>
              <Image source={Dragonborn} style={styles.Avatar} />
              <View style={{ paddingLeft: 10, flex: 1 }}>
                <Text style={{ fontSize: 18, fontWeight: 'bold' }}> Character Name</Text>
                <Text > Race </Text>
              </View>
            </View>
          </Card.Content>
        </Card>
      )
    }
    return algo
  }

  return (
    <View>
      <ScrollView>
        <ShowCards number={10} />
      </ScrollView>
      <ModalCreateCharacter show={editVisible} hide={hideEdit} />
      <ModalCreateCharacter />
    </View>
  );
}

export default Characters;

//<Card.Title title="character Name" left={(props) => <Image {...props} source={Dragonborn} style={styles.Avatar} />} />