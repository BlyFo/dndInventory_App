import React from 'react';
import ConfigContext from './ConfigContext';

const ConfigState = (props) => {

  const [drawerItems, setDrawerItems] = React.useState({
    gold: true,
    inventory: true,
    npc: true,
    companions: true,
    journal: true,
    reminders: true,
    places: true
  })

  const [avatarRoundness, setAvatarRoundness] = React.useState(100);
  //const [useElectrum, setUselectrum] = React.useState(true);

  const toggleGold = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, gold: !drawerItems.gold });
  }, [drawerItems]);

  const toggleInventory = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, inventory: !drawerItems.inventory });
  }, [drawerItems]);

  const toggleNpc = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, npc: !drawerItems.npc });
  }, [drawerItems]);

  const toggleCompanion = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, companions: !drawerItems.companions });
  }, [drawerItems]);

  const toggleJournal = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, journal: !drawerItems.journal });
  }, [drawerItems]);

  const toggleReminders = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, reminders: !drawerItems.reminders });
  }, [drawerItems]);

  const togglePlaces = React.useCallback(() => {
    return setDrawerItems({ ...drawerItems, places: !drawerItems.places });
  }, [drawerItems]);

  const changeAvatarRoundness = React.useCallback((roundness) => {
    return setAvatarRoundness(roundness);
  })

  const ConfigPreferences = React.useMemo(
    () => ({
      drawerItems,
      toggleGold,
      toggleInventory,
      toggleNpc,
      toggleCompanion,
      toggleJournal,
      toggleReminders,
      togglePlaces,
      avatarRoundness,
      changeAvatarRoundness,
    }),
    [drawerItems, avatarRoundness]
  );

  return (
    <ConfigContext.Provider value={ConfigPreferences}>
      {props.children}
    </ConfigContext.Provider>
  );

}

export default ConfigState;