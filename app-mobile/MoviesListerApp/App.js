import React from 'react';
import { StyleSheet, View, Platform, StatusBar } from 'react-native';
import { WebView } from "react-native-webview";

export default class App extends React.Component {
  render() {
    return Platform.OS === "web" ? (
      <iframe src="https://movies-lister.vercel.app" height={'100%'} width={'100%'} />
    ) : (
      <View style={styles.container}>
        <WebView
          source={{ uri: "https://movies-lister.vercel.app" }}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
});
