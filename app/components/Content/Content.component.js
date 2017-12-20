import React, {Component} from 'react';
import styles from './Content.style.js';
import {
  Text
  , TextInput
  , View
} from 'react-native';

class Content extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>Please type your note below</Text>
        <TextInput
          style={styles.textinput}
          underlineColorAndroid='transparent'
          multiline = {true}
        />
      </View>
    );
  }
}

export default Content;