import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import { styles } from './styles';

export default class LoadingOverlay extends Component {

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <View style={styles.overlay}>
                <ActivityIndicator
                    animating={this.props.animating}
                    style={styles.activityIndicator}
                    size="large"
                    color='#fff'
                />
            </View>
        );
    }
}
