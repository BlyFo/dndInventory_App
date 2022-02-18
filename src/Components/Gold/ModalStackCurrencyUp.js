import React from 'react';
import { Modal, Portal, Button, Text, Divider } from 'react-native-paper';

import { popUpContainerStyle } from '../../Config/StyleConfig';
import { ChangeCurrency } from '../HelperFunctions';

function ModalStackCurrencyUp({ show, hide, setFinalPieces, finalPieces, pieces }) {

  function ChangeCurrencyUP() {
    let coinList = {
      copper: finalPieces.copper,
      silver: finalPieces.silver,
      electrum: finalPieces.electrum,
      gold: finalPieces.gold,
      platinum: finalPieces.platinum
    }
    let cuantity = 0;
    //copper to silver
    cuantity = ChangeCurrency("Copper", "Silver", coinList.copper)
    coinList.copper = cuantity.Rest
    coinList.silver += cuantity.Value

    //silver to electrum
    cuantity = ChangeCurrency("Silver", "Electrum", coinList.silver)
    coinList.silver = cuantity.Rest
    coinList.electrum += cuantity.Value

    //electrum to gold
    cuantity = ChangeCurrency("Electrum", "Gold", coinList.electrum)
    coinList.electrum = cuantity.Rest
    coinList.gold += cuantity.Value

    //gold to platinum
    cuantity = ChangeCurrency("Gold", "Platinum", coinList.gold)
    coinList.gold = cuantity.Rest
    coinList.platinum += cuantity.Value

    // store the final result
    setFinalPieces({
      copper: coinList.copper,
      silver: coinList.silver,
      electrum: coinList.electrum,
      gold: coinList.gold,
      platinum: coinList.platinum
    })
    hide()
  }

  return (
    <Portal>
      <Modal visible={show} onDismiss={() => hide()} contentContainerStyle={popUpContainerStyle.Container} >
        <Text style={popUpContainerStyle.Tittle}> De ser posible cada moneda se cabiara a la moneda superior </Text>
        <Text style={{ textAlign: "center", fontWeight: "bold", marginTop: "1%" }}> {"CP:15 SP:2"}  </Text>
        <Text style={{ textAlign: "center", fontWeight: "bold", fontSize: 20 }}> {"↓"}  </Text>
        <Text style={{ textAlign: "center", fontWeight: "bold" }}> {"CP:5 SP:3"}  </Text>
        <Divider style={popUpContainerStyle.Divider} />
        <Button mode="contained" onPress={() => ChangeCurrencyUP()} >OK</Button>
      </Modal>
    </Portal>
  );
}

export default ModalStackCurrencyUp;