import React, { useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { Modal, Portal, Text, Button, Divider, TextInput, TouchableRipple } from 'react-native-paper';
import { ceil } from 'react-native-reanimated';
import Icon from 'react-native-vector-icons/FontAwesome';

import { popUpContainerStyle } from '../../Config/StyleConfig';
import { ChangeCurrency } from '../HelperFunctions';


function GoldModal({ show, hide, action, setFinalPieces, finalPieces, pieces }) {

  const styles = StyleSheet.create({
    container: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: "space-between",
      marginTop: "0%"
    },
  });

  //value to add/deduce from the total
  const [tempPiece, setTempPiece] = useState({
    copper: 0,
    silver: 0,
    electrum: 0,
    gold: 0,
    platinum: 0
  })

  //reason to add reduce money
  const [description, setDescription] = useState('');

  const [transactionError, setTransactionError] = useState(false);


  function Confirm() {

    if (action) {
      //you want to add money
      setFinalPieces({
        copper: parseInt(tempPiece.copper, 10) + parseInt(finalPieces.copper, 10),
        silver: parseInt(tempPiece.silver, 10) + parseInt(finalPieces.silver, 10),
        electrum: parseInt(tempPiece.electrum, 10) + parseInt(finalPieces.electrum, 10),
        gold: parseInt(tempPiece.gold, 10) + parseInt(finalPieces.gold, 10),
        platinum: parseInt(tempPiece.platinum, 10) + parseInt(finalPieces.platinum, 10)
      })
      ResetValues()
    } else {
      //you want to retire money
      let coinList = {
        copper: finalPieces.copper,
        silver: finalPieces.silver,
        electrum: finalPieces.electrum,
        gold: finalPieces.gold,
        platinum: finalPieces.platinum
      }

      //check if you have enough money to do the transaction
      var enoughMoney = true;
      if (enoughMoney) enoughMoney = CheckEnoughMoney(tempPiece.copper, "Copper", coinList);
      if (enoughMoney) enoughMoney = CheckEnoughMoney(tempPiece.silver, "Silver", coinList);
      if (enoughMoney) enoughMoney = CheckEnoughMoney(tempPiece.electrum, "Electrum", coinList);
      if (enoughMoney) enoughMoney = CheckEnoughMoney(tempPiece.gold, "Gold", coinList);
      if (enoughMoney) enoughMoney = CheckEnoughMoney(tempPiece.platinum, "Platinum", coinList);

      //if you have enough money do the transaccion
      if (enoughMoney) {
        setFinalPieces({
          copper: coinList.copper,
          silver: coinList.silver,
          electrum: coinList.electrum,
          gold: coinList.gold,
          platinum: coinList.platinum
        })
        ResetValues()
      } else {
        //no hay fondos suficientes para realizar la transaccion
        setTransactionError(true);
      }
    }
  }

  function CheckEnoughMoney(Value, Piece, coinList) {
    let succes = false;

    // search in actual currency (Piece) if there is enough money to witdraw
    // if that not the case search in currency below 
    succes = LookDownForMoney(Value, Piece, coinList);

    // search in actual currency (Piece) if there is enough money to witdraw
    // if that not the case search in currency above
    if (!succes) {
      succes = LookUpForMoney(Value, Piece, coinList);
    }
    return succes
  }
  function LookUpForMoney(Value, Piece, coinList) {
    let result = 0;
    let money = false;
    switch (Piece) {
      case pieces[0]:
        //check if there is enough founds in copper
        result = coinList.copper - Value
        if (result >= 0) {
          coinList.copper = result;
          money = true;
        } else {
          //look up for a piece
          // change the current currency to the next one
          let nextToCurrent = ChangeCurrency(pieces[1], pieces[0], 1).Value // 1 of the next currency to the current one
          let nextCurrencyNeed = Math.ceil(Math.abs(result) / nextToCurrent); // how much of the next currency is needed
          money = LookUpForMoney(nextCurrencyNeed, pieces[1], coinList);

          //if the next one has enough money
          if (money) {
            let curencyReturn = ChangeCurrency(pieces[1], pieces[0], nextCurrencyNeed).Value
            result = coinList.copper - Value + curencyReturn
            coinList.copper = result;
          }
        }
        break;
      case pieces[1]:
        //check if there is enough founds in silver
        result = coinList.silver - Value
        if (result >= 0) {
          coinList.silver = result;
          money = true;
        } else {
          //look up for a piece
          // change the current currency to the next one
          let nextToCurrent = ChangeCurrency(pieces[2], pieces[1], 1).Value // 1 of the next currency to the current one
          let nextCurrencyNeed = Math.ceil(Math.abs(result) / nextToCurrent); //how much of the next currency is needed
          money = LookUpForMoney(nextCurrencyNeed, pieces[2], coinList);

          //if the next one has enough money
          if (money) {
            let curencyReturn = ChangeCurrency(pieces[2], pieces[1], nextCurrencyNeed).Value
            result = coinList.silver - Value + curencyReturn
            coinList.silver = result;
          }
        }
        break;
      case pieces[2]:
        //check if there is enough founds in electrum
        result = coinList.electrum - Value
        if (result >= 0) {
          coinList.electrum = result;
          money = true;
        } else {
          // look up for a piece
          // change the current currency to the next one
          let nextToCurrent = ChangeCurrency(pieces[3], pieces[2], 1).Value // 1 of the next currency to the current one
          let nextCurrencyNeed = Math.ceil(Math.abs(result) / nextToCurrent); //how much of the next currency is needed
          money = LookUpForMoney(nextCurrencyNeed, pieces[3], coinList);

          //if the next one has enough money
          if (money) {
            let curencyReturn = ChangeCurrency(pieces[3], pieces[2], nextCurrencyNeed).Value
            result = coinList.electrum - Value + curencyReturn
            coinList.electrum = result;
          }
        }
        break;
      case pieces[3]:
        //check if there is enough founds in gold
        result = coinList.gold - Value
        if (result >= 0) {
          coinList.gold = result;
          money = true;
        } else {
          // look up for a piece
          // change the current currency to the next one
          let nextToCurrent = ChangeCurrency(pieces[4], pieces[3], 1).Value // 1 of the next currency to the current one
          let nextCurrencyNeed = Math.ceil(Math.abs(result) / nextToCurrent); //how much of the next currency is needed
          money = LookUpForMoney(nextCurrencyNeed, pieces[4], coinList);

          //if the next one has enough money
          if (money) {
            let curencyReturn = ChangeCurrency(pieces[4], pieces[3], nextCurrencyNeed).Value
            result = coinList.gold - Value + curencyReturn
            coinList.gold = result;
          }
        }
        break;
      case pieces[4]:
        //check if there is enough founds in platinum
        result = coinList.platinum - Value
        if (result >= 0) {
          coinList.platinum = result;
          money = true;
        }// this is the last one so can't look up for a piece
        break;
    }
    return money
  }
  function LookDownForMoney(Value, Piece, coinList) {
    let result = 0;
    let money = false;
    switch (Piece) {
      case pieces[0]:
        //search in copper
        result = coinList.copper - Value
        if (result >= 0) {
          //get the money if there is enough found
          coinList.copper = result;
          money = true
        }
        break;
      case pieces[1]:
        //search in silver
        result = coinList.silver - Value

        if (result >= 0) {
          //get the money if there is enough found
          coinList.silver = result;
          money = true
        } else {
          var currentToLast = ChangeCurrency(pieces[1], pieces[0], Math.abs(result)).Value
          money = LookDownForMoney(currentToLast, pieces[0], coinList) //search in cooper
          //si lo encuentra
          if (money) {
            //its going to be the exat amount neede so the result is 0
            coinList.silver = 0;
          }
        }
        break;
      case pieces[2]:
        //search in electrum
        result = coinList.electrum - Value

        if (result >= 0) {
          //get the money if there is enough found
          coinList.electrum = result;
          money = true
        } else {
          var currentToLast = ChangeCurrency(pieces[2], pieces[1], Math.abs(result)).Value
          money = LookDownForMoney(currentToLast, pieces[1], coinList) //search in silver
          //si lo encuentra
          if (money) {
            //its going to be the exat amount neede so the result is 0
            coinList.electrum = 0;
          }
        }
        break;
      case pieces[3]:
        //search in gold
        result = coinList.gold - Value

        if (result >= 0) {
          //get the money if there is enough found
          coinList.gold = result;
          money = true
        } else {
          var currentToLast = ChangeCurrency(pieces[3], pieces[2], Math.abs(result)).Value
          money = LookDownForMoney(currentToLast, pieces[2], coinList) //search in silver
          //si lo encuentra
          if (money) {
            //its going to be the exat amount neede so the result is 0
            coinList.gold = 0;
          }
        }
        break;
      case pieces[4]:
        //search in platinum
        result = coinList.platinum - Value

        if (result >= 0) {
          //get the money if there is enough found
          coinList.platinum = result;
          money = true
        } else {
          var currentToLast = ChangeCurrency(pieces[4], pieces[3], Math.abs(result)).Value
          money = LookDownForMoney(currentToLast, pieces[3], coinList) //search in silver
          //si lo encuentra
          if (money) {
            //its going to be the exat amount neede so the result is 0
            coinList.platinum = 0;
          }
        }
        break;
    }
    return money
  }
  function ResetValues() {
    setTempPiece({ copper: 0, silver: 0, electrum: 0, gold: 0, platinum: 0 })
    setTransactionError(false);
    setDescription("")
    hide()
  }
  function AddRemoveOne(choosenPiece, add) {
    setTransactionError(false);
    switch (choosenPiece) {
      case pieces[0]:
        if (add) {
          setTempPiece(prevState => ({ ...prevState, copper: parseInt(tempPiece.copper, 10) + 1 }));
        } else {
          if (tempPiece.copper > 0) {
            setTempPiece(prevState => ({ ...prevState, copper: parseInt(tempPiece.copper, 10) - 1 }));
          }
        }
        break;

      case pieces[1]:
        if (add) {
          setTempPiece(prevState => ({ ...prevState, silver: tempPiece.silver + 1 }));
        } else {
          if (tempPiece.silver > 0) {
            setTempPiece(prevState => ({ ...prevState, silver: tempPiece.silver - 1 }));
          }
        }
        break;

      case pieces[2]:
        if (add) {
          setTempPiece(prevState => ({ ...prevState, electrum: tempPiece.electrum + 1 }));
        } else {
          if (tempPiece.electrum > 0) {
            setTempPiece(prevState => ({ ...prevState, electrum: tempPiece.electrum - 1 }));
          }
        }
        break;

      case pieces[3]:
        if (add) {
          setTempPiece(prevState => ({ ...prevState, gold: tempPiece.gold + 1 }));
        } else {
          if (tempPiece.gold > 0) {
            setTempPiece(prevState => ({ ...prevState, gold: tempPiece.gold - 1 }));
          }
        }
        break;

      case pieces[4]:
        if (add) {
          setTempPiece(prevState => ({ ...prevState, platinum: tempPiece.platinum + 1 }));
        } else {
          if (tempPiece.platinum > 0) {
            setTempPiece(prevState => ({ ...prevState, platinum: tempPiece.platinum - 1 }));
          }
        }
        break;
    }
  }
  function OnChangeValue(value, piece) {
    value = value.replace(/\s+/g, '');
    setTransactionError(false);
    if (value === "") value = 0;
    switch (piece) {
      case pieces[0]:
        setTempPiece(prevState => ({ ...prevState, copper: parseInt(value, 10) }))
        break;
      case pieces[1]:
        setTempPiece(prevState => ({ ...prevState, silver: parseInt(value, 10) }))
        break;
      case pieces[2]:
        setTempPiece(prevState => ({ ...prevState, electrum: parseInt(value, 10) }))
        break;
      case pieces[3]:
        setTempPiece(prevState => ({ ...prevState, gold: parseInt(value, 10) }))
        break;
      case pieces[4]:
        setTempPiece(prevState => ({ ...prevState, platinum: parseInt(value, 10) }))
        break;
      default:
        break;
    }
  }
  function PlaceHolderValue(piece) {

    if (pieces[0] === piece) {
      return tempPiece.copper.toString()
    }
    if (pieces[1] === piece) {
      return tempPiece.silver.toString()
    }
    if (pieces[2] === piece) {
      return tempPiece.electrum.toString()
    }
    if (pieces[3] === piece) {
      return tempPiece.gold.toString()
    }
    if (pieces[4] === piece) {
      return tempPiece.platinum.toString()
    }
  }

  return (
    <Portal>
      <Modal visible={show} onDismiss={() => ResetValues()} contentContainerStyle={popUpContainerStyle.Container}>
        <Text style={popUpContainerStyle.Tittle}>{(action) ? "Add Money." : "Remove Money."}</Text>
        <Divider style={popUpContainerStyle.Divider} />

        {pieces.map((coin, i) => (
          <View style={styles.container} key={coin + ' ' + i}>
            <Text>{coin}</Text>
            <View style={{ flexDirection: 'row', alignItems: "center", justifyContent: "space-between" }}>
              <View style={{ borderRadius: 10, overflow: 'hidden' }}>
                <TouchableRipple style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => AddRemoveOne(coin, false)}>
                  <Icon size={15} name="chevron-left" color="blue" />
                </TouchableRipple>
              </View>
              <TextInput
                error={transactionError}
                value={PlaceHolderValue(coin)}
                style={{ height: 25, textAlign: 'center', paddingHorizontal: '1.5%', marginBottom: '2%' }}
                keyboardType='numeric' //https://stackoverflow.com/questions/32946793/react-native-textinput-that-only-accepts-numeric-characters
                onChangeText={value => OnChangeValue(value, coin)}
                mode='outlined'
              />
              <View style={{ borderRadius: 10, overflow: 'hidden' }} >
                <TouchableRipple style={{ height: 30, width: 30, alignItems: 'center', justifyContent: 'center', borderRadius: 10 }} onPress={() => AddRemoveOne(coin, true)}>
                  <Icon size={15} name="chevron-right" color="blue" />
                </TouchableRipple>
              </View>
            </View>
          </View>
        ))}

        {true &&
          <View style={{ width: '100%', maxHeight: '30%' }}>
            <TextInput value={description} onChangeText={text => setDescription(text)} mode='outlined' placeholder='Description (optional)' multiline={true} />
          </View>
        }
        <Divider style={popUpContainerStyle.Divider} />
        <Button mode="contained" onPress={Confirm} style={{ marginTop: 10 }} > OK </Button>
      </Modal>
    </Portal>
  );
}

export default GoldModal;