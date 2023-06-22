import { StyleSheet, Text, View } from 'react-native';
import StackNavigator from './Navigation/StackNavigator';
import { Provider } from 'react-redux';
import store from './Redux/store'

export default function App() {
  return (
    <Provider store={store}>
    <StackNavigator />
    </Provider>
    // <View style={styles.container}>
    //   <Text>Open up App.js to start working on your app!</Text>
    //   <StatusBar style="auto" />
    // </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
