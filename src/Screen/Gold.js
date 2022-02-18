import React, { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView, View, StyleSheet } from 'react-native';
import { Text, Button, FAB, Modal, Portal } from 'react-native-paper';
import { useIsFocused } from '@react-navigation/native';

import ModalModifyMoney from '../Components/Gold/ModalModifyMoney';
import ModalChangeTotal from '../Components/Gold/ModalChangeTotal';
import ModalStackCurrencyUp from '../Components/Gold/ModalStackCurrencyUp';
import ModalChangeCurrency from '../Components/Gold/ModalChangeCurrency';

import HistoricalRecord from '../Components/Gold/HistoricalRecord';

function Gold({ navigation }) {

  const pieces = ["Copper", "Silver", "Electrum", "Gold", "Platinum"]

  const [piece, setPiece] = useState({
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0
  })

  const [MoneyPopUpVisible, setMoneyPopUpVisible] = useState(false);
  const [totalPopUpVisible, setTotalPopUpVisible] = useState(false);
  const [stackCurencyUpVisible, setStackCurencyUpVisible] = useState(false);
  const [changeCurrencyPopUpVisible, setChangeCurrencyPopUpVisible] = useState(false);
  const [action, setAction] = useState(true);
  const [basePiece, setBasePiece] = useState(pieces[3])
  const [openFab, setOpenFab] = useState({ open: false });

  const onStateChange = ({ open }) => setOpenFab({ open });
  const { open } = openFab;

  const hidePopUpMoney = () => setMoneyPopUpVisible(false);
  const hideTotalPopUp = () => setTotalPopUpVisible(false);
  const hideStackCurrencyUpPopUp = () => setStackCurencyUpVisible(false);
  const hideChangeCurrencyPopUp = () => setChangeCurrencyPopUpVisible(false);

  function AddMoney() {
    setAction(true)
    setMoneyPopUpVisible(true)
  }
  function RemoveMoney() {
    setAction(false)
    setMoneyPopUpVisible(true)
  }
  function StackCurencyUp() {
    setStackCurencyUpVisible(true);
  }
  function ChangeCurrency() {
    setChangeCurrencyPopUpVisible(true);
  }
  function TotalMoney(basePiece) {
    var copperMultiplier = 1;
    var silverMultiplier = 1;
    var electrumMultiplier = 1;
    var goldMultiplier = 1;
    var platinumMultiplier = 1;

    switch (basePiece) {
      case pieces[0]:
        copperMultiplier = 1
        silverMultiplier = 10
        electrumMultiplier = 50
        goldMultiplier = 100
        platinumMultiplier = 1000
        break;

      case pieces[1]:
        copperMultiplier = (1 / 10)
        silverMultiplier = 1
        electrumMultiplier = 5
        goldMultiplier = 10
        platinumMultiplier = 100
        break;

      case pieces[2]:
        copperMultiplier = (1 / 50)
        silverMultiplier = (1 / 5)
        electrumMultiplier = 1
        goldMultiplier = 2
        platinumMultiplier = 20
        break;

      case pieces[3]:
        copperMultiplier = (1 / 100)
        silverMultiplier = (1 / 10)
        electrumMultiplier = (1 / 2)
        goldMultiplier = 1
        platinumMultiplier = 10
        break;

      case pieces[4]:
        copperMultiplier = (1 / 1000)
        silverMultiplier = (1 / 100)
        electrumMultiplier = (1 / 20)
        goldMultiplier = (1 / 10)
        platinumMultiplier = 1
        break;
    }
    return (
      piece.copper * copperMultiplier +
      piece.silver * silverMultiplier +
      piece.electrum * electrumMultiplier +
      piece.gold * goldMultiplier +
      piece.platinum * platinumMultiplier
    ).toFixed(2)

  }

  return (
    <View style={styles.container}>
      <View style={{ flexDirection: 'row', borderWidth: 1, justifyContent: 'space-evenly' }}>
        <View style={styles.subContainer}>
          <Text>Coppper</Text>
          <Text>{piece.copper}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>Silver</Text>
          <Text>{piece.silver}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>Electrum</Text>
          <Text>{piece.electrum}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>Gold</Text>
          <Text>{piece.gold}</Text>
        </View>
        <View style={styles.subContainer}>
          <Text>Platinum</Text>
          <Text>{piece.platinum}</Text>
        </View>
      </View>
      <View style={{ borderWidth: 1, flex: 1 }}>
        <HistoricalRecord />
      </View>
      <Portal>
        <FAB.Group
          open={open}
          visible={useIsFocused()}
          icon="diamond-outline"
          actions={[
            { icon: 'history', onPress: () => navigation.navigate("Gold Record") },
            { icon: "ray-start-arrow", onPress: ChangeCurrency },
            { icon: "format-vertical-align-bottom", onPress: StackCurencyUp },
            { icon: "minus", onPress: RemoveMoney },
            { icon: "plus", onPress: AddMoney }
          ]}
          onStateChange={onStateChange}
        />
      </Portal>
      <View style={styles.total}>
        <Button onPress={() => setTotalPopUpVisible(true)} mode="contained" >
          <Text style={{ marginLeft: "3%", color: "white" }}> Total {" " + basePiece} </Text>
          <Text style={{ marginRight: "3%", color: "white" }}> {TotalMoney(basePiece)}</Text>
        </Button>
      </View>

      <ModalModifyMoney
        show={MoneyPopUpVisible}
        hide={hidePopUpMoney}
        action={action}
        setFinalPieces={setPiece}
        finalPieces={piece}
        pieces={pieces}
      />
      <ModalChangeTotal
        show={totalPopUpVisible}
        hide={hideTotalPopUp}
        setPiece={setBasePiece}
        pieces={pieces}
      />
      <ModalStackCurrencyUp
        show={stackCurencyUpVisible}
        hide={hideStackCurrencyUpPopUp}
        setFinalPieces={setPiece}
        finalPieces={piece}
        pieces={pieces}
      />
      <ModalChangeCurrency
        show={changeCurrencyPopUpVisible}
        hide={hideChangeCurrencyPopUp}
        setFinalPieces={setPiece}
        finalPieces={piece}
        pieces={pieces}
      />
    </View>
  );
}

export default Gold;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  subContainer: {
    flexDirection: 'column',
    alignItems: "center",
    //justifyContent: "space-between",
    marginTop: "2%"
  },
  total: {
    //flex: 0.1,
    //borderWidth: 2,
    //borderRadius: 5,
    justifyContent: "flex-end",
  },
  buttons: {
    justifyContent: "flex-end",
    alignItems: "flex-end",
    flex: 1,
    marginRight: "3%",
    marginBottom: "3%",
  }
});