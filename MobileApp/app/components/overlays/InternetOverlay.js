import React, { Component } from 'react';
import { StyleSheet, Text, View, Dimensions, ActivityIndicator } from 'react-native';
import { styles } from './styles';

export default class InternetOverlay extends Component {
  constructor(props) {
    super(props);
    this.noInternettext = 'Check WiFi Connection';
  }

  render() {
    return (
      <View style={styles.overlay}>
        <Text style={styles.internettext}>{this.noInternettext}</Text>
      </View>
    );
  }
}
