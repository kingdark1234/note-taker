/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
// import noop from 'lodash/noop';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import ShowNotes from './components/ShowNotes/ShowNotes.component';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  AsyncStorage,
  Button,
  StyleSheet,
  //   Text,
  View
} from 'react-native';

// AsyncStorage.getItem('state').then((value) => {
//   if (value) {
//     this.setState(JSON.parse(value));
//   }
// });
export default class App extends Component {

    state = {
      note: [],
      inputTitle: '',
      inputContent: '',
      count: 0
    };
    componentDidMount () {
      AsyncStorage.getItem('state').then((value) => {
        if (value) {
          return this.setState(JSON.parse(value));
        }
      });
    }
    // console.log(result);
    // state = {
    //   count: 0,
    //   inputTitle: '',
    //   inputContent: '',
    //   note: []
    // }
    
    onTypeTitle = (text) => {
      this.setState({inputTitle: text});
    }
    onTypeContent = (text) => {
      this.setState({inputContent: text});
      this.setState({count: text.length});
    }
    onSaveNote = () => {
      const data = {'title': this.state.inputTitle, 'content': this.state.inputContent, 'uuid': uuid()};
      const newStateNote = [...this.state.note, data];
      this.setState(
        {
          note: newStateNote,
          inputTitle: '',
          inputContent: '',
          count: 0
        }, () => {
        //   console.log('note: ', this.state.note);
          AsyncStorage.setItem('state', JSON.stringify(this.state));
        });
    }

    onDeleteItem = (uuid) => () => {
      var filtered = this.state.note.filter((ele) => ele.uuid !== uuid);
      this.setState(
        {
          note: filtered,
          inputTitle: '',
          inputContent: '',
          count: 0
        }, () => {
          AsyncStorage.setItem('state', JSON.stringify(this.state));
        });
    }

    goToPageAbout = () => {
      this.props.navigation.navigate('About');
    }

    render () {
      return (
        <View style={styles.boxMain}>
          <Title onTypeTitle={this.onTypeTitle} inputTitle={this.state.inputTitle}/>
          <Content onType={this.onTypeContent} inputContent={this.state.inputContent}/>
          <ShowNotes note={this.state.note} onDeleteItem={this.onDeleteItem}/>
          <Footer showNumber={this.state.count} onSaveNote={this.onSaveNote}/>

          <Button
            onPress={this.goToPageAbout}
            title='Go to About'
          />
        </View>
      );
    }
}

const styles = StyleSheet.create({
  boxMain: {
    flex: 1,
    backgroundColor: '#ccc'
  }
});

App.propTypes = {
  navigation: PropTypes.object.isRequired
};
App.defaultProps = {
  navigation: {}
};