import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Portal, Modal, Text, Divider, TextInput, Switch, Button } from 'react-native-paper';

import { popUpContainerStyle, genericDivider } from '../../Config/StyleConfig';

function ModalNewInventory({ show, hide, action, setFinalPieces, finalPieces, pieces }) {

  const [name, setName] = React.useState('');

  const [goldType, setGoldType] = React.useState(true)
  const onToggleGoldTypeSwitch = () => setGoldType(!goldType)

  const [inventoryType, setInventoryType] = React.useState(true)
  const onToggleInventoryTypeSwitch = () => setInventoryType(!inventoryType)


  function ResetValues() {

    hide()
  }

  return (
    <Portal>
      <Modal visible={show} onDismiss={() => ResetValues()} contentContainerStyle={popUpContainerStyle.Container}>
        <Text style={popUpContainerStyle.Tittle}>Create New Inventory</Text>
        <Divider style={genericDivider} />
        <View style={{ width: '100%' }}>
          <TextInput
            value={name}
            label='Inventory Name'
            onChangeText={text => setName(text)}
            mode='outlined'
          />
        </View>
        <View style={{ alignItems: 'flex-start', width: '100%', marginTop: '5%' }}>
          <Text style={{ fontSize: 17 }}> Store: </Text>
          <View style={{ width: '90%', flexDirection: 'column', marginLeft: '5%' }}>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> Gold </Text>
              <Switch
                style={styles.switch}
                value={goldType}
                onValueChange={onToggleGoldTypeSwitch}
              />
            </View>
            <View style={{ flexDirection: 'row', alignItems: 'center' }}>
              <Text> Items </Text>
              <Switch
                style={styles.switch}
                value={inventoryType}
                onValueChange={onToggleInventoryTypeSwitch}
              />
            </View>
          </View>
        </View>
        <Divider style={genericDivider} />
        <Button onPress={() => ResetValues()}> Acceptar </Button>

      </Modal>
    </Portal>
  );
}

const styles = StyleSheet.create({
  switch: {
    marginRight: '5%'
  }
});

export default ModalNewInventory;