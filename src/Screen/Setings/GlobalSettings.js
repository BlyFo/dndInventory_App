import React from 'react';
import { View, StyleSheet } from 'react-native';
import { Divider, Switch, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';
import ConfigContext from '../../Context/ConfigContext';

import { genericDivider } from '../../Config/StyleConfig';


function GlobalSettings(props) {

  const {
    drawerItems,
    toggleGold,
    toggleInventory,
    toggleNpc,
    toggleCompanion,
    toggleJournal,
    toggleReminders,
    togglePlaces
  } = React.useContext(ConfigContext)

  const [useWeight, setUseWeight] = React.useState(true)
  const onToggleWeightSwitch = () => setUseWeight(!useWeight)

  const Cosa = (
    <View style={{ flexDirection: 'column', justifyContent: 'space-between', alignItems: 'baseline', flexWrap: 'wrap', height: '30%' }}>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.gold}
          onValueChange={() => toggleGold()}
        />
        <Text>Gold</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center', paddingRight: '8%' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.inventory}
          onValueChange={() => toggleInventory()}
        />
        <Text>Inventory</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.npc}
          onValueChange={() => toggleNpc()}
        />
        <Text>NPCs</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.companions}
          onValueChange={() => toggleCompanion()}
        />
        <Text>companions</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.journal}
          onValueChange={() => toggleJournal()}
        />
        <Text>Journal</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.reminders}
          onValueChange={() => toggleReminders()}
        />
        <Text>Reminders</Text>
      </View>

      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <Switch
          style={styles.switch}
          value={drawerItems.places}
          onValueChange={() => togglePlaces()}
        />
        <Text>Places</Text>
      </View>

    </View>
  );

  return (
    <View style={{ flex: 1 }}>
      <View style={{ flexDirection: 'row', justifyContent: 'flex-start', alignItems: 'center' }}>
        <Text> Use Weight</Text>
        <Switch
          style={{ paddingLeft: "5%" }}
          value={useWeight}
          onValueChange={onToggleWeightSwitch}
        />
      </View>
      <Divider style={genericDivider} />
      <Text> Use esta cosa</Text>
      {Cosa}
    </View>
  );
}

const styles = StyleSheet.create({
  switch: {
    marginRight: '5%'
  }
});

export default GlobalSettings;