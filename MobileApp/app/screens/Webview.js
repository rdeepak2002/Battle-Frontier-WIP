import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { WebView } from 'react-native-webview';

export default class Webview extends Component {
  constructor(props) {
    super(props);
    this.src = 'https://battlefrontier.herokuapp.com/';
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          source={{ uri: this.src }}
          style={{ flex: 1 }}
        />
      </View>
    );
  }
}
