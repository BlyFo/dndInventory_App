import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Text, Button, Card, FAB, DefaultTheme } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';
import Icon from 'react-native-vector-icons/FontAwesome';

import { cards } from '../Config/StyleConfig';
import { ItemCategory } from '../Config/DataConfig';
import { ThemeContext } from '../Context/ThemeContext';

function Inventory({ navigation }) {

  const styles = StyleSheet.create({
    fab: {
      position: 'absolute',
      margin: 16,
      right: 0,
      bottom: 0,
    },
    arrowButton: {
      width: 30,
      height: 27,
      justifyContent: 'center',
      alignItems: 'center',
      fontSize: 5
    }
  })
  const colorText = DefaultTheme.colors.text
  const { toggleTheme, isThemeDark } = React.useContext(ThemeContext)

  const [ItemList, setItemList] = React.useState([])
  const [ItemListFilter, setItemListFilter] = React.useState([{
    name: '',
    quantity: '',
    price: '',
    category: '',
    damage: '',
    weight: '',
    attunement: '',
    description: ''
  }])

  const [openFab, setOpenFab] = React.useState({ open: false });

  const onStateChange = ({ open }) => setOpenFab({ open });
  const { open } = openFab;

  function FilterItems() {
    //function map o filter i suppouse
    let temp = ItemList.filter(item => item.category === 'Armor');
    console.log(temp)
    //setItemListFilter()
  }
  function SearchItems() {
    //function filter i suppouse
    let algo = '34';
    let algo2 = '4434sda';
    console.log(algo2.includes(algo))
    //let temp = ItemList.filter(item => item.name.includes(searchWord))
  }

  function AddRemoveOne(index, add) {
    let tempArray = ItemList;
    tempArray[index].quantity = (add) ? tempArray[index].quantity + 1 : tempArray[index].quantity - 1;
    setItemList(tempArray);
  }
  function AddNewItem(name, quantity, price, category, damage, weight, attunement, description) {

    setItemList(oldArray => [...oldArray, {
      name: name,
      quantity: quantity,
      price: price,
      category: category,
      damage: damage,
      weight: weight,
      attunement: attunement,
      description: description
    }])
  }

  const ShowCards2 = () => {
    let algo = []
    ItemList.forEach((item, index) => {
      let categoryIndex = ItemCategory.findIndex(element => element.name === item.category)
      algo.push(
        <Card style={cards.Card} key={index + ' inventory'} onPress={() => navigation.navigate("Inspect Inventory Item", {
          name: item.name,
          quantity: item.quantity,
          price: item.price,
          category: item.category,
          damage: item.damage,
          weight: item.weight,
          attunement: item.attunement,
          description: item.description
        })}>
          <Card.Content style={cards.CardContent}>
            <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8 }}>
              <View style={{ flex: 0.98, justifyContent: 'center' }}>
                <Text style={{ fontSize: 17 }}>{item.name}</Text>
                <View style={{ borderWidth: 0.3, borderRadius: 40, width: 105, backgroundColor: ItemCategory[categoryIndex].color }}>
                  <Text style={{ fontSize: 12, paddingLeft: 6, color: colorText }} >{ItemCategory[categoryIndex].name}</Text>
                </View>
              </View>
              <View style={{ flexDirection: 'column', marginTop: 0, justifyContent: 'center' }}>
                <Button compact={true} style={styles.arrowButton} mode='text' onPress={() => { AddRemoveOne(index, true) }}>
                  <Icon name="chevron-up" size={9} color={isThemeDark ? 'white' : 'black'} />
                </Button>

                <Text style={{ fontSize: 13, textAlign: 'center' }}>
                  {item.quantity}
                </Text>

                <Button compact={true} style={styles.arrowButton} mode='text' onPress={() => { AddRemoveOne(index, false) }}>
                  <Icon name="chevron-down" size={9} color={isThemeDark ? 'white' : 'black'} />
                </Button>
              </View>
            </View>
          </Card.Content>
        </Card>
      )
    });
    //add new item card
    algo.push(
      <Card style={cards.Card} key='addNewItem' onPress={() => navigation.navigate("Add Inventory Item", { addItem: AddNewItem })}>
        <Card.Content style={cards.CardContent}>
          <View style={{ flex: 1, flexDirection: 'row', margin: -10, marginLeft: -8, alignItems: 'center' }}>
            <Icon name="plus-circle" size={40} color="lightslategrey" />
            <Text style={{ fontSize: 17, flex: 1, color: 'lightslategrey' }}> Add New item</Text>
          </View>
        </Card.Content>
      </Card>
    )
    return algo
  }

  function TestCards(number) {
    let final = number - ItemList.length
    if (final > 0) {
      for (let index = 0; index < final; index++) {
        AddNewItem(
          'newItem', //name
          Math.floor(Math.random() * 99), // quantity
          Math.floor(Math.random() * 500), //price
          ItemCategory[Math.floor(Math.random() * 11)].name, // category
          Math.floor(Math.random() * 10 + 2) + "d" + Math.floor(Math.random() * 98 + 2), // damage
          Math.floor(Math.random() * 100), // weight
          (Math.random() < 0.5), // attunement
          'here was once a shepherd boy who liked to play tricks.One day, while he was watching over the herd, the boy decided to play a trick and cried “wolf! wolf!”. The people who heard rushed over to help him. But they were disappointed when they saw that there was no wolf and the boy was laughing at them. The next day, he did it again and people rushed to his aid only to be disappointed once again. On the third day, the boy saw a wolf devouring one of his sheep and cried for help. But the people who heard him thought this is just another of the boy’s pranks so no one came to help him. That day, the boy lost some of his sheep to the wolf.' //description
        )
      }
    }
  }

  return (
    <View style={{ flex: 1 }}>
      <ScrollView>
        <ShowCards2 />
      </ScrollView>
      {/*<FAB style={styles.fab} small icon="plus" onPress={() => navigation.navigate("Add Inventory Item")} />*/}
      <FAB.Group
        open={open}
        visible={useIsFocused()}
        icon='star'
        actions={[
          { icon: "feature-search-outline", onPress: () => TestCards(10) },
          { icon: "order-alphabetical-ascending" }, //ordenar items
          { icon: "filter", onPress: FilterItems },
          { icon: "plus", onPress: () => navigation.navigate("Add Inventory Item", { addItem: AddNewItem }) }
        ]}
        onStateChange={onStateChange}
      />
    </View>
  );
}

export default Inventory;

//<Text style={{ fontSize: 12 }} >{ItemCategory[Math.floor(Math.random() * ItemCategory.length)]}</Text>

/*
<Button compact={true} style={styles.arrowButton} mode='contained' onPress={() => console.log("-")}>
                  <Icon name="chevron-down" size={9} color="white" />
                </Button>
                */