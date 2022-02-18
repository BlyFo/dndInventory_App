import React from 'react';
import { DefaultTheme as NavigationDefaultTheme, DarkTheme as NavigationDarkTheme } from '@react-navigation/native';
import { DarkTheme as PaperDarkTheme, DefaultTheme as PaperDefaultTheme } from 'react-native-paper';


//https://stackoverflow.com/questions/36915508/what-are-the-material-design-dark-theme-colors


export const HighlightColors = [
  '#2a93d5',
  '#F44336',
  '#E91E63',
  '#9C27B0',
  '#673AB7',
  '#3F51B5',
  '#2196F3',
  '#03A9F4',
  '#00BCD4',
  '#009688',
  '#4CAF50',
  '#8BC34A',
  '#CDDC39',
  '#FFEB3B',
  '#FFC107',
  '#FF9800',
  '#FF5722',
  '#795548'
]


let primaryColor = '#2a93d5';

export let CustomDefaultTheme = {
  ...NavigationDefaultTheme,
  ...PaperDefaultTheme,
  colors: {
    ...NavigationDefaultTheme.colors,
    ...PaperDefaultTheme.colors,
    primary: primaryColor,
    //custom colors
    headerTint: 'black',
    headerBackground: NavigationDefaultTheme.colors.background,
    drawerActiveTint: 'white',//text of selected item
    drawerBackground: NavigationDefaultTheme.colors.background,
    drawerActiveBackground: primaryColor,//background of the selected item
  }
};

export let CustomDarkTheme = {
  ...NavigationDarkTheme,
  ...PaperDarkTheme,
  colors: {
    ...NavigationDarkTheme.colors,
    ...PaperDarkTheme.colors,
    primary: primaryColor,
    background: '#121212',
    text: 'rgb(229, 229, 231)',
    surface: '#1e1e1e',
    //custom Colors
    headerTint: 'rgb(229, 229, 231)',
    headerBackground: '#272727',
    drawerActiveTint: 'black', //text of selected item
    drawerBackground: '#2c2c2c',
    drawerActiveBackground: primaryColor, //background of the selected item
  }
};