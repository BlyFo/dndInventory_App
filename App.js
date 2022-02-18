import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { Provider as PaperProvider } from 'react-native-paper';

import MainNavigator from './src/Navigator/MainNavigator';
import { CustomDefaultTheme, CustomDarkTheme } from './src/Config/ThemeManager';
import { ThemeContext } from './src/Context/ThemeContext';
import ConfigState from './src/Context/ConfigState';


export default function App() {

  const [isThemeDark, setIsThemeDark] = React.useState(false);

  const [primaryColor, setPrimaryColor] = React.useState('#F44336');
  const Customtheme = () => {
    if (isThemeDark) {
      const theme = {
        ...CustomDarkTheme,
        colors: {
          ...CustomDarkTheme.colors,
          primary: primaryColor,
          drawerActiveBackground: primaryColor
        }
      }
      return theme
    } else {
      const theme = {
        ...CustomDefaultTheme,
        colors: {
          ...CustomDefaultTheme.colors,
          primary: primaryColor,
          drawerActiveBackground: primaryColor
        }
      }
      return theme
    }
  }

  const toggleTheme = React.useCallback(() => {
    return setIsThemeDark(!isThemeDark);
  }, [isThemeDark]);

  const togglePrimaryColor = React.useCallback((color) => {
    return setPrimaryColor(color);
  }, [primaryColor]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      togglePrimaryColor,
      isThemeDark,
    }),
    [toggleTheme, togglePrimaryColor, isThemeDark]
  );

  return (
    <ThemeContext.Provider value={preferences}>
      <PaperProvider theme={Customtheme()}>
        <NavigationContainer theme={Customtheme()}>
          <ConfigState>
            <MainNavigator />
          </ConfigState>
        </NavigationContainer>
      </PaperProvider>
    </ThemeContext.Provider>
  );
}



//npm install @react-navigation/native
//expo install react-native-screens react-native-safe-area-context
//npm install @react-navigation/native-stack
//npm install @react-navigation/stack
//npm install @react-navigation/drawer
//expo install react-native-gesture-handler react-native-reanimated
//npm install --save react-native-vector-icons

//npm install react-native-ionicons@^4.x

//npm i --save @fortawesome/fontawesome-svg-core
//npm install --save @fortawesome/free-solid-svg-icons
//npm install --save @fortawesome/react-fontawesome
//npm i --save expo-fontawesome

//npm install @react-navigation/material-bottom-tabs no se usa por ahora
//npm install @react-navigation/material-top-tabs react-native-tab-view
//npm install react-native-pager-view