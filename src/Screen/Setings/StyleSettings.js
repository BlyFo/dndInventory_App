import React from 'react';
import { View, StyleSheet, TouchableHighlight } from 'react-native';
import { Divider, Text, RadioButton } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { genericDivider } from '../../Config/StyleConfig';
import { HighlightColors } from '../../Config/ThemeManager';
import ConfigContext from '../../Context/ConfigContext';
import { ThemeContext } from '../../Context/ThemeContext';

function StyleSettings(props) {
  const [checked, setChecked] = React.useState('circle');

  const { toggleTheme, togglePrimaryColor, isThemeDark } = React.useContext(ThemeContext)
  const { changeAvatarRoundness } = React.useContext(ConfigContext)

  const avatarShape = (
    <View style={{ flexDirection: 'row', justifyContent: 'space-evenly' }}>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.AvatarRound}></View>
        <RadioButton
          value='circle'
          status={checked === 'circle' ? 'checked' : 'unchecked'}
          onPress={() => { setChecked('circle'); changeAvatarRoundness(100); }}
        />
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.AvatarRounded}></View>
        <RadioButton
          value='roundedSquare'
          status={checked === 'roundedSquare' ? 'checked' : 'unchecked'}
          onPress={() => { setChecked('roundedSquare'); changeAvatarRoundness(25); }}
        />
      </View>
      <View style={{ flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
        <View style={styles.AvatarSquare}></View>
        <RadioButton
          value='square'
          status={checked === 'square' ? 'checked' : 'unchecked'}
          onPress={() => { setChecked('square'); changeAvatarRoundness(0); }}
        />
      </View>
    </View>
  );
  const HighlightColor = (
    <View style={{ flexDirection: 'row', flexWrap: 'wrap' }}>
      {HighlightColors.map((color) => (
        <TouchableHighlight key={color} style={{ borderWidth: 1, borderRadius: 50, margin: '1%' }} onPress={() => togglePrimaryColor(color)}>
          <View style={{ borderRadius: 50, height: 30, width: 30, backgroundColor: color }} />
        </TouchableHighlight>
      ))}
    </View>
  );
  const Background = (
    <View>
      <Text> TODO </Text>
    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <Text> Avatar Shape</Text>
      {avatarShape}
      <Divider style={genericDivider} />
      <Text> Highlight Color</Text>
      {HighlightColor}
      <Divider style={genericDivider} />
      <Text> Backgrounds</Text>
      {Background}
      <Divider style={genericDivider} />
    </View>
  );
}

const styles = StyleSheet.create({
  AvatarRound: {
    borderRadius: 100,
    height: 50,
    width: 50,
    backgroundColor: '#dee1e6'
  },
  AvatarRounded: {
    borderRadius: 15,
    height: 50,
    width: 50,
    backgroundColor: '#dee1e6'
  },
  AvatarSquare: {
    height: 50,
    width: 50,
    backgroundColor: '#dee1e6'
  }
})


export default StyleSettings;