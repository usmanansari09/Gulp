import React, { Fragment, useContext } from 'react';
import { Provider } from 'react-redux';
import 'react-native-gesture-handler';
import { Root } from 'native-base';

import { MenuProvider } from 'react-native-popup-menu';

import getStore from 'Store/store';
import { Navigator } from 'Navigators/StackNavigator';
import { PersistGate } from 'redux-persist/integration/react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { GlobalOptionsContext } from '@options';

const App = () => {
  const global = useContext(GlobalOptionsContext);
  const { store, persistor } = getStore(global);

  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Fragment>
          <Root>
            <MenuProvider>
              <SafeAreaProvider>
                <Navigator />
              </SafeAreaProvider>
            </MenuProvider>
          </Root>
        </Fragment>
      </PersistGate>
    </Provider>
  );
};

export default App;
