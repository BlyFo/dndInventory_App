import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Text, Button, Checkbox, Divider, Menu, TextInput } from 'react-native-paper';

import { ItemCategory } from '../../Config/DataConfig';
import { popUpContainerStyle } from '../../Config/StyleConfig';

function AddNPC({ route, navigation }) {

  const [NPCName, setNPCName] = React.useState('');
  const [NPCNickName, setNPCNickNAme] = React.useState('');
  const [NPCPlace, setNPCPlace] = React.useState('');
  const [NPCDescription, setNPCDescription] = React.useState('');

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight + 5 }}>
      <ScrollView>
        <Text style={popUpContainerStyle.Tittle}> Add new NPC </Text>
        <Divider style={popUpContainerStyle.Divider} />
        <TextInput onChangeText={text => setNPCName(text)} label='Name' mode='outlined' />
        <TextInput onChangeText={text => setNPCNickNAme(text)} label='Nick Name' mode='outlined' />
        <TextInput onChangeText={text => setNPCPlace(text)} label='Place' mode='outlined' />
        <TextInput onChangeText={text => setNPCDescription(text)} label='Description' mode='outlined' placeholder='Optional' multiline={true} />
        <Divider style={popUpContainerStyle.Divider} />
        <Button mode='contained' onPress={() => {
          route.params.addNPC(
            NPCName,
            NPCNickName,
            NPCPlace,
            NPCDescription
          );
          navigation.goBack();
        }}>OK</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddNPC;