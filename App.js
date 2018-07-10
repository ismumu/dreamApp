
import React from 'react';
import {
	StyleSheet,
	WebView,
} from 'react-native';


var WebViewAndroid = require('react-native-webview-android');

var SITE_URL = 'http://118.31.61.9:7070/';

export default class App extends React.Component {

    constructor () {
        super();
        this.state = {
            url: SITE_URL,
            // OR
            // you can use a source object like React Native Webview.
            // source {uri: string, method: string, headers: object, body: string}, {html: string, baseUrl: string}
            // Loads static html or a uri (with optional headers) in the WebView. <Just like React Native's version>
            // source: {
            //   uri: SITE_URL,
            //   headers: {
            //     ...
            //   },
            // },
            status: 'No Page Loaded',
            backButtonEnabled: false,
            forwardButtonEnabled: false,
            loading: true,
            messageFromWebView: null
        }
    }

    goBack () {
        // you can use this callback to control web view
        this.refs.webViewAndroidSample.goBack();
    }
    goForward () {
        this.refs.webViewAndroidSample.goForward();
    }
    reload () {
        this.refs.webViewAndroidSample.reload();
    }
    stopLoading () {
        // stops the current load
        this.refs.webViewAndroidSample.stopLoading();
    }
    postMessage = ( data ) => {
        // posts a message to web view
        this.refs.webViewAndroidSample.postMessage(data);
    }
    evaluateJavascript = ( data ) => {
        // evaluates javascript directly on the webview instance
        this.refs.webViewAndroidSample.evaluateJavascript(data);
    }
    injectJavaScript = ( script ) => {
        // executes JavaScript immediately in web view
        this.refs.webViewAndroidSample.injectJavaScript(script);
    }
    onShouldStartLoadWithRequest = ( event ) => {
        // currently only url & navigationState are returned in the event.
        console.log(event.url);
        console.log(event.navigationState);

        // if (event.url === 'https://www.mywebsiteexample.com/') {
        //     return true;
        // } else {
        //     return false;
        // }


        return true;


    }
    onNavigationStateChange = ( event ) => {
        console.log(event);
        this.setState({
            backButtonEnabled: event.canGoBack,
            forwardButtonEnabled: event.canGoForward,
            url: event.url,
            status: event.title,
            loading: event.loading
        });
    }
    onMessage = ( event ) => {
        this.setState({
            messageFromWebView: event.message
        });
    }
    javascriptToInject () {
        return `
        $(document).ready(function() {
          $('a').click(function(event) {
            if ($(this).attr('href')) {
              var href = $(this).attr('href');
              window.webView.postMessage('Link tapped: ' + href);
            }
          })
        })
      `
    }

    render () {
        return (
            <WebViewAndroid
                ref="webViewAndroidSample"
                javaScriptEnabled={true}
                geolocationEnabled={false}
                builtInZoomControls={false}
                injectedJavaScript={this.javascriptToInject()}
                onShouldStartLoadWithRequest={this.onShouldStartLoadWithRequest}
                onNavigationStateChange={this.onNavigationStateChange}
                onMessage={this.onMessage}
                url={SITE_URL}
                style={styles.containerWebView}
            />
        )
    }
}


var styles = StyleSheet.create({
    containerWebView: {
        flex: 1,
    }
});
