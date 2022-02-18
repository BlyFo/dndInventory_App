import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Text, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { genericDivider } from '../../Config/StyleConfig';

function CoinsSettings(props) {


  return (
    <View style={{ flex: 1 }}>
      <Text> Coins</Text>
      <Divider style={genericDivider} />
    </View>
  );
}


export default CoinsSettings;