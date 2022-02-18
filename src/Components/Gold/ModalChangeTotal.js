import React from 'react';
import { Modal, Portal, Button } from 'react-native-paper';

import { popUpContainerStyle } from '../../Config/StyleConfig';

function BasePieceModel({ show, hide, setPiece, pieces }) {

  return (
    <Portal>
      <Modal visible={show} onDismiss={() => hide()} contentContainerStyle={popUpContainerStyle.Container} >
        <Button onPress={() => { setPiece(pieces[0]); hide() }}> Copper </Button>
        <Button onPress={() => { setPiece(pieces[1]); hide() }}> Silver </Button>
        <Button onPress={() => { setPiece(pieces[2]); hide() }}> Electrum </Button>
        <Button onPress={() => { setPiece(pieces[3]); hide() }}> Gold </Button>
        <Button onPress={() => { setPiece(pieces[4]); hide() }}> Platinum </Button>
      </Modal>
    </Portal>
  );
}

export default BasePieceModel;