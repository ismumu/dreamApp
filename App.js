
import React, { Component } from 'react';
import {
	Platform,
	StyleSheet,
	Text,
	View,
	WebView,
} from 'react-native';



export default class App extends Component {
	render() {
		return (
			<WebView
				style={styles.webView}
				automaticallyAdjustContentInsets={false}
				source={{uri: 'http://118.31.61.9:7070/'}}
				javaScriptEnabled={true}
				domStorageEnabled={true}
				decelerationRate="normal"
				startInLoadingState={true}
			/>
		);
	}
}

const styles = StyleSheet.create({
	webView: {
		// width: '100%',
	},
});
