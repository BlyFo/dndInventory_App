import { StyleSheet } from 'react-native';
import { DefaultTheme, NavigationContainer } from '@react-navigation/native';

export const popUpContainerStyle = StyleSheet.create({
  Container: {
    backgroundColor: 'white',
    padding: 20,
    alignItems: 'center'
  },
  ContainerCompact: {
    backgroundColor: 'white',
    padding: 10,
    paddingHorizontal: 0,
    alignItems: 'center',
    height: '60%',
    width: '85%',
    marginLeft: '5%'
  },
  Divider: {
    marginVertical: "3%",
    width: 330
  },
  Tittle: {
    textAlign: 'center',
    fontSize: 20
  }, TextInputPrimary: {

  }, TextInputSecondary: {
    width: 55,
    height: 30,
    textAlign: 'center',
    backgroundColor: DefaultTheme.colors.background
  }
});

export const genericDivider = {
  marginVertical: "3%",
  width: 330
};

export const cards = StyleSheet.create({
  Card: {
    height: 65,
    borderWidth: 1.2,
    borderRadius: 10,
    marginTop: "1.5%",
    paddingVertical: 0
  },
  CardSmall: {
    height: 55,
    width: 280,
    borderWidth: 1.2,
    borderRadius: 10,
    marginTop: "1.5%",
    paddingVertical: 0
  },
  CardContent: {
    justifyContent: 'center',
    flexDirection: 'row',
    justifyContent: 'space-between',
    flex: 1,
    margin: 0,
    padding: 0
  },
  cardTittle: {
    fontSize: 17
  },
  cardSubTittle: {
    fontSize: 12
  },
  CardPading: {
    flex: 1,
    paddingBottom: "2%"
  },
  CardContentAddNew: {
    flex: 1,
    flexDirection: 'row',
    margin: -10,
    marginLeft: -8,
    alignItems: 'center'
  },
  CardTextAddNew: {
    fontSize: 17,
    flex: 1,
    color: 'lightslategrey'
  }

});