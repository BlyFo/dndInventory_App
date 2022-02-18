import React from 'react';
import { View, ScrollView, SafeAreaView, StatusBar } from 'react-native';
import { Button, Text, Divider, TextInput } from 'react-native-paper';

import { popUpContainerStyle } from '../../Config/StyleConfig';

function AddEntry({ route, navigation }) {

  const [EntryName, setEntryName] = React.useState('');
  const [EntryDate, setEntryDate] = React.useState('');
  const [EntryDescription, setEntryDescription] = React.useState('');

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight + 5 }}>
      <ScrollView>
        <Text style={popUpContainerStyle.Tittle}> Add new Entry </Text>
        <Divider style={popUpContainerStyle.Divider} />
        <TextInput onChangeText={text => setEntryName(text)} label='Name' mode='outlined' />
        <TextInput onChangeText={text => setEntryDate(text)} label='Date' mode='outlined' />
        <TextInput onChangeText={text => setEntryDescription(text)} label='Description' mode='outlined' placeholder='Optional' multiline={true} />
        <Divider style={popUpContainerStyle.Divider} />
        <Button mode='contained' onPress={() => {
          route.params.addEntry(
            EntryName,
            EntryDate,
            EntryDescription
          );
          navigation.goBack();
        }}>OK</Button>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddEntry;