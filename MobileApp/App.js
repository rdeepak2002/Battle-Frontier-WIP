import React, { Component } from 'react';
import { StyleSheet, Text, View} from 'react-native';
import Webview from './app/screens/Webview';

export default class App extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <Webview />
    );
  }
}
