import React from 'react';
import { View, ScrollView, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { Text, Button, Checkbox, Divider, Menu, TextInput } from 'react-native-paper';

import { ItemCategory } from '../../Config/DataConfig';
import { popUpContainerStyle } from '../../Config/StyleConfig';

function AddItem({ route, navigation }) {

  const styles = StyleSheet.create({
    Pading: {
      padding: 10
    }
  });

  const [categoryVisible, setCategoryVisible] = React.useState(false);
  const [category, setCategory] = React.useState('Choose Category');
  const [checked, setChecked] = React.useState(false);

  const [itemName, setItemName] = React.useState('');
  const [itemDamage, setItemDamage] = React.useState('');
  const [itemWeight, setItemWeight] = React.useState('');
  const [itemPrice, setItemPrice] = React.useState('');
  const [itemQuantity, setItemQuantity] = React.useState('');
  const [itemDescription, setItemDescription] = React.useState('');

  const closeCategoryMenu = () => setCategoryVisible(false);
  const openCategoryMenu = () => setCategoryVisible(true);

  const setCategories = () => {
    let categoryList = [];
    for (let index = 0; index < ItemCategory.length(); index++) {
      categoryList.push(
        <Menu.Item
          onPress={() => { console.log(`press ${ItemCategory[index]}`) }}
          title={ItemCategory[index]}
        />
      )
    }
    return categoryList;
  }

  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight + 5 }}>
      <ScrollView>
        <Text style={popUpContainerStyle.Tittle}> Add new item </Text>
        <Divider style={popUpContainerStyle.Divider} />
        <TextInput onChangeText={text => setItemName(text)} label='Item Name' mode='outlined' />
        <View style={styles.Pading}>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly' }} >
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> Damage:</Text>
              <TextInput
                onChangeText={text => setItemDamage(text)}
                placeholder='0'
                style={popUpContainerStyle.TextInputSecondary} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> Weight:</Text>
              <TextInput
                onChangeText={text => setItemWeight(text)}
                placeholder='0'
                keyboardType='numeric'
                style={popUpContainerStyle.TextInputSecondary} />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> Price: </Text>
              <TextInput
                onChangeText={text => setItemPrice(text)}
                placeholder='0'
                keyboardType='numeric'
                style={popUpContainerStyle.TextInputSecondary} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-evenly', padding: 10 }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Quantity: </Text>
              <TextInput
                onChangeText={text => setItemQuantity(text)}
                placeholder='0'
                keyboardType='numeric'
                style={popUpContainerStyle.TextInputSecondary}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text>Attunement: </Text>
              <Checkbox
                status={checked ? 'checked' : 'unchecked'}
                onPress={() => setChecked(!checked)} />
            </View>
          </View>
          <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'center', padding: 0 }}>
            <Text>Category: </Text>
            <Menu
              visible={categoryVisible}
              onDismiss={closeCategoryMenu}
              anchor={<Button mode='outlined' onPress={openCategoryMenu}>{category}</Button>}>
              <View style={{ justifyContent: 'center', borderColor: 'red' }}>
                {ItemCategory.map((category) => (
                  <Menu.Item
                    key={category.name}
                    onPress={() => { setCategory(category.name); setCategoryVisible(false); }}
                    title={category.name}
                  />
                ))}
              </View>
            </Menu>
          </View>
          <Divider style={popUpContainerStyle.Divider} />
          <TextInput onChangeText={text => setItemDescription(text)} label='Description' mode='outlined' placeholder='Optional' multiline={true} />
          <View style={{ paddingVertical: 10 }}>
            <Text>-----------</Text>
            <Text >Cosa para sacar foto o agregar foto de galeria (solo una imagen)</Text>
            <Text>-----------</Text>
          </View>
          <Divider style={popUpContainerStyle.Divider} />
          <Button mode='contained' onPress={() => {
            route.params.addItem(
              itemName,
              itemQuantity,
              itemPrice,
              category,
              itemDamage,
              itemWeight,
              checked,
              itemDescription
            );
            navigation.goBack();
          }}>OK</Button>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default AddItem;