import React from 'react';
import { View } from 'react-native';
import { Modal, Portal, Button, Menu, Text, Divider } from 'react-native-paper';


import { popUpContainerStyle } from '../../Config/StyleConfig';
import { ChangeCurrency } from '../HelperFunctions';

function ModalChangeCurrency({ show, hide, setFinalPieces, finalPieces, pieces }) {

  const [firstMenuVisible, setFirstMenuVisible] = React.useState(false);
  const openFirstMenu = () => setFirstMenuVisible(true);
  const closeFirstMenu = () => setFirstMenuVisible(false);

  const [secondtMenuVisible, setSecondMenuVisible] = React.useState(false);
  const openSecondMenu = () => setSecondMenuVisible(true);
  const closeSecondMenu = () => setSecondMenuVisible(false);

  const [firstMenuContent, setFirstMenuContent] = React.useState("Select");
  const [secondMenuContent, setSecondMenuContent] = React.useState("Select");

  const [firstMenuCurrency, setFirstMenuCurrency] = React.useState(0);

  function ChooseFirsCurrency(currency) {
    setFirstMenuContent(currency);
    closeFirstMenu();
  }
  function ChooseSecondCurrency(currency) {
    setSecondMenuContent(currency);
    closeSecondMenu();
  }

  function ChangeSelectedCurrency() {

    if (firstMenuContent !== "Select" && secondMenuContent !== "Select") {

      let total = ChangeCurrency(firstMenuContent, secondMenuContent, firstMenuCurrency)

      let coinList = {
        copper: finalPieces.copper,
        silver: finalPieces.silver,
        electrum: finalPieces.electrum,
        gold: finalPieces.gold,
        platinum: finalPieces.platinum
      }

      switch (firstMenuContent) {
        case pieces[0]:
          coinList.copper = total.Rest
          break;
        case pieces[1]:
          coinList.silver = total.Rest
          break;
        case pieces[2]:
          coinList.electrum = total.Rest
          break;
        case pieces[3]:
          coinList.gold = total.Rest
          break;
        case pieces[4]:
          coinList.platinum = total.Rest
          break;
      }

      switch (secondMenuContent) {
        case pieces[0]:
          coinList.copper = total.Value
          break;
        case pieces[1]:
          coinList.silver = total.Value
          break;
        case pieces[2]:
          coinList.electrum = total.Value
          break;
        case pieces[3]:
          coinList.gold = total.Value
          break;
        case pieces[4]:
          coinList.platinum = total.Value
          break;
      }

      setFinalPieces({
        copper: coinList.copper,
        silver: coinList.silver,
        electrum: coinList.electrum,
        gold: coinList.gold,
        platinum: coinList.platinum
      })

      ResetValues()
    }
  }

  function ResetValues() {

    setFirstMenuVisible(false)
    setSecondMenuVisible(false)

    setFirstMenuContent("Select")
    setSecondMenuContent("Select")

    setFirstMenuCurrency(0)

    hide();
  }

  return (
    <Portal>
      <Modal visible={show} onDismiss={() => ResetValues()} contentContainerStyle={popUpContainerStyle.Container} >
        <View
          style={{
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: "center",
          }}>
          <Text style={popUpContainerStyle.Tittle}>Change one currency to another.</Text>
          <View style={{ flexDirection: "row", marginVertical: "3%" }}>
            <Menu
              visible={firstMenuVisible}
              onDismiss={closeFirstMenu}
              anchor={<Button onPress={openFirstMenu}>{firstMenuContent}</Button>}>
              <Menu.Item onPress={() => { ChooseFirsCurrency(pieces[0]); setFirstMenuCurrency(finalPieces.copper) }} title="Copper" />
              <Menu.Item onPress={() => { ChooseFirsCurrency(pieces[1]); setFirstMenuCurrency(finalPieces.silver) }} title="Silver" />
              <Menu.Item onPress={() => { ChooseFirsCurrency(pieces[2]); setFirstMenuCurrency(finalPieces.electrum) }} title="Electrum" />
              <Menu.Item onPress={() => { ChooseFirsCurrency(pieces[3]); setFirstMenuCurrency(finalPieces.gold) }} title="Gold" />
              <Menu.Item onPress={() => { ChooseFirsCurrency(pieces[4]); setFirstMenuCurrency(finalPieces.platinum) }} title="Platinum" />
            </Menu>

            <Text style={{ fontSize: 20 }}> → </Text>

            <Menu
              visible={secondtMenuVisible}
              onDismiss={closeSecondMenu}
              anchor={<Button onPress={openSecondMenu}>{secondMenuContent}</Button>}>
              <Menu.Item onPress={() => { ChooseSecondCurrency(pieces[0]) }} title="Copper" />
              <Menu.Item onPress={() => { ChooseSecondCurrency(pieces[1]) }} title="Silver" />
              <Menu.Item onPress={() => { ChooseSecondCurrency(pieces[2]) }} title="Electrum" />
              <Menu.Item onPress={() => { ChooseSecondCurrency(pieces[3]) }} title="Gold" />
              <Menu.Item onPress={() => { ChooseSecondCurrency(pieces[4]) }} title="Platinum" />
            </Menu>
          </View>
          <Divider style={popUpContainerStyle.Divider} />
          <View style={{ width: "100%" }}>
            <Button mode="contained" onPress={() => ChangeSelectedCurrency()} >OK</Button>
          </View>
        </View>
      </Modal>
    </Portal>
  );
}

export default ModalChangeCurrency;