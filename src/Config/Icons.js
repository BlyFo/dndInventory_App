import FontAwesome from 'react-native-vector-icons/FontAwesome';
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import Ionicons from 'react-native-vector-icons/Ionicons';

import { useTheme } from '@react-navigation/native';

// ------------------ SideBar

export const InventoryIcon = ({ color }) => {
    return <MaterialIcons name="inventory" size={22} color={color} />
}

export const InventoryGoldIcon = ({ color }) => {
    return <MaterialCommunityIcons name="gold" size={22} color={color} />
}
export const InventoryItemsIcon = ({ color }) => {
    return <MaterialCommunityIcons name="gold" size={22} color={color} /> //TODO
}
export const InventoryItemsAndGoldIcon = ({ color }) => {
    return <MaterialCommunityIcons name="gold" size={22} color={color} /> //TODO
}

export const NpcsIcon = ({ color }) => {
    return <FontAwesome5 name="user-friends" size={22} color={color} />
}
export const PlacesIcon = ({ color }) => {
    return <FontAwesome5 name="map-marker-alt" size={22} color={color} />
}
export const CompanionsIcon = ({ color }) => {
    return <MaterialIcons name="pets" size={22} color={color} />
}
export const JournalIcon = ({ color }) => {
    return <FontAwesome5 name="journal-whills" size={22} color={color} />
}
export const RemindersIcon = ({ color }) => {
    return <FontAwesome name="bookmark" size={22} color={color} />
}

// ------------------ Custom SideBar

export const SettingsIcon = () => {
    const { dark } = useTheme();
    return <MaterialIcons name='settings' size={26} color={dark ? 'white' : 'black'} />
}

export const DropDownArrowIcon = ({ change }) => {
    const { dark } = useTheme();
    return <MaterialIcons
        name={change ? 'arrow-drop-down' : 'arrow-right'}
        style={{ marginLeft: '85%', position: 'absolute' }}
        size={25}
        color={dark ? 'white' : 'black'}
    />
}

export const DarkModeIcon = () => {
    const { dark } = useTheme();
    return <Ionicons
        name={dark ? 'moon-outline' : 'sunny'}
        size={20}
        color={dark ? 'white' : 'black'}
    />
}


// ------------------ Cards

export const AddItemCardIcon = () => {
    return <FontAwesomeIcons name="plus-circle" size={40} color="lightslategrey" />
}
