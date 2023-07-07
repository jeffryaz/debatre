/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, { useState } from 'react';
import {
  ImageBackground,
  StatusBar,
  StyleSheet,
} from 'react-native';
import { Provider } from 'react-redux';
import { persistor, store } from './src/config/redux/reduxStore';
import { PersistGate } from 'redux-persist/integration/react';
import InitialApp from './InitialApp';
import './src/i18n/index';

function App(props: any): JSX.Element {
  const [background, setBackground] = useState<any>(require('./src/assets/png/background.png'));
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <ImageBackground source={background} style={styles.ImageBackgroundStyle} imageStyle={styles.ImageBackgroundimageStyle}>
          <StatusBar
            // barStyle={'dark-content'}
            animated={true}
            backgroundColor={styles.backgroundStyle.backgroundColor}
          />
          <InitialApp {...props} setBackground={setBackground} />
        </ImageBackground>
      </PersistGate>
    </Provider>
  );
}

const styles = StyleSheet.create({
  backgroundStyle: {
    backgroundColor: '#60777f',
  },
  ImageBackgroundStyle: {
    width: '100%',
    height: '100%'
  },
  ImageBackgroundimageStyle: {
    resizeMode: 'cover',
    backgroundColor: 'transparent',
    flex: 1,
    flexDirection: 'column'
  }
});

export default App;
