import React from 'react';
import { ScrollView, StatusBar, View, Image } from 'react-native';
import { Divider, Text } from 'react-native-paper';
import { SafeAreaView } from 'react-native-safe-area-context';

import { popUpContainerStyle, genericDivider } from '../../Config/StyleConfig';
import { DividerImage } from '../../Config/Images'

function InspectNPC({ route, navigation }) {

    const {
        name,
        nickName,
        place,
        description
    } = route.params;

    const Description = () => {
        let descriptionActivate = (description === '')
        return (descriptionActivate) ? (<View></View>) : (
            <View style={{ flex: 1 }}>
                <Divider style={genericDivider} />
                <View style={{ alignItems: 'center', justifyContent: 'center' }}>
                    <Image style={{ flex: 1, height: 15, width: 340, marginBottom: '5%' }} source={DividerImage} />
                </View>
                <Text style={{ textAlign: 'center', flex: 1, marginHorizontal: '1%' }}>{description}</Text>
            </View>
        );
    }

    return (
        <SafeAreaView style={{ flex: 1, paddingTop: StatusBar.currentHeight + 5 }}>
            <ScrollView style={{ flex: 1 }}>
                <View style={{ flex: 1 }}>
                    <Text style={popUpContainerStyle.Tittle}>{name}</Text>
                    <Text>{nickName}</Text>
                    <Divider style={genericDivider} />
                    <View style={{ flex: 1, marginVertical: '3%', flexDirection: 'row' }}>
                        <Text>Place: </Text>
                        <Text>{place} </Text>
                    </View>
                    <Description />
                </View>
            </ScrollView>
        </SafeAreaView>
    );
}

export default InspectNPC;