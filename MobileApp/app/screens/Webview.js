import React, { Component } from 'react';
import { StyleSheet, Text, View, Platform } from 'react-native';
import { WebView } from 'react-native-webview';
import { InternetOverlay, LoadingOverlay } from '../components/overlays';
import NetInfo from "@react-native-community/netinfo";

export default class Webview extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoadingVisible: true,
      internet: true
    };
    this.handleFirstConnectivityChange = this.handleFirstConnectivityChange.bind(this);
    this.onLoadWebviewIos = this.onLoadWebviewIos.bind(this);
    this.onLoadWebviewAndroid = this.onLoadWebviewAndroid.bind(this);
    this.WEBVIEW_REF = 'webview';
    this.src = 'https://battlefrontier.herokuapp.com/';

    NetInfo.fetch().then(state => {
      this.setState({internet: state.isConnected});
    });

    this.unsubscribe = NetInfo.addEventListener(state => {
      this.setState({internet: state.isConnected});
    });
  }

  handleFirstConnectivityChange (isConnected) {
    if(isConnected){
      this.setState({internet : true, isLoadingVisible: true})
      this.refs[this.WEBVIEW_REF].reload();
    }
    else{
      this.setState({internet : false});
    }
  }

  onLoadWebviewIos (navState) {
    if(Platform.OS === 'ios'){
      this.setState({isLoadingVisible: false})
    }
  }

  onLoadWebviewAndroid (navState) {
    if(Platform.OS === 'android'){
      if(navState.loading === false){
        this.setState({isLoadingVisible: false});
      }
    }
  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  render() {
    return (
      <View style={{ flex: 1 }}>
        <WebView
          ref={this.WEBVIEW_REF}
          source={{ uri: this.src }}
          style={{ flex: 1 }}
          onNavigationStateChange={this.onLoadWebviewAndroid}
          onLoad={this.onLoadWebviewIos}
        />
        {this.state.isLoadingVisible ? (
          <LoadingOverlay/>
        ) : null}
        {this.state.internet == false ? (
          <InternetOverlay />
        ) : null}
      </View>
    );
  }
}
