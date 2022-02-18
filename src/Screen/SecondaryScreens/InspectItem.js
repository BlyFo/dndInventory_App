import React from 'react';
import { ScrollView, StatusBar, View, Image } from 'react-native';
import { Button, Divider, Text, Checkbox } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { popUpContainerStyle, genericDivider } from '../../Config/StyleConfig';
import { DividerImage } from '../../Config/Images'

function InspectItem({ route, navigation }) {

  const {
    name,
    quantity,
    price,
    category,
    damage,
    weight,
    attunement,
    description
  } = route.params;

  const Description = () => {
    let descriptionActivate = (description === '')
    return (descriptionActivate) ? (<View></View>) : (
      <View style={{ flex: 1 }}>
        <Divider style={genericDivider} />
        <View style={{ alignItems: 'center', justifyContent: 'center' }}>
          <Image style={{ flex: 1, height: 15, width: 340, marginBottom: '5%' }} source={DividerImage} />
        </View>
        <Text style={{ textAlign: 'center', flex: 1, marginHorizontal: '1%' }}>{description}</Text>
      </View>
    );
  }
  const Damage = () => {
    return (
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Text>Damage: </Text>
        <Text>{damage} </Text>
      </View>)
  }
  const Weight = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>Weight: </Text>
        <Text>{weight + " lb"}</Text>
      </View>)
  }
  const Price = () => {
    return (
      <View style={{ flexDirection: 'row' }}>
        <Text>Price: </Text>
        <Text>{price + " gold"}</Text>
      </View>
    )
  }
  return (
    <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight + 5 }}>
      <ScrollView style={{ flex: 1 }}>
        <View style={{ flex: 1 }}>
          <Text style={popUpContainerStyle.Tittle}>{name}</Text>
          <Text>{category}</Text>
          <Divider style={genericDivider} />
          <View style={{ flex: 1, marginVertical: '3%' }}>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
              <View style={{ flexDirection: 'row' }}>
                <Text>Quantity: </Text>
                <Text>{quantity}</Text>
              </View>

              {(price !== '') && <Price />}

              {(weight !== '') && <Weight />}

            </View>
            <View style={{ flexDirection: 'row', justifyContent: 'space-evenly', marginTop: '3.5%' }}>

              {(damage !== '') && <Damage />}

              <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                <Text>Attunement:</Text>
                <Checkbox status={attunement ? 'checked' : 'unchecked'} />
              </View>
            </View>
          </View>
          <Description />
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

export default InspectItem;