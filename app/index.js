/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */

import Content from './components/Content/Content.component.js';
import Overlay from 'react-native-modal-overlay';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
import uuid from 'uuid';
import {
  AsyncStorage,
  Button,
  FlatList,
  Text,
  TouchableOpacity,
  View
} from 'react-native';

export default class App extends Component {

  state = {
    title: '',
    text: '',
    NOTES: [],
    modalVisible: false,
    modalText: []
  }
  componentDidMount () {
    AsyncStorage.getItem('NOTES').then((res) => {
      this.setState(JSON.parse(res));
    });
  }
  onCount = (v) => this.setState({text: v});
  onTitle = (v) => this.setState({title: v});
  saveNote = () => {
    const data = {'title': this.state.title, 'content': this.state.text, 'unique': uuid()};
    const newNotes = [...this.state.NOTES, data];
    this.setState(
      {title: '', text: '', 'NOTES': newNotes}, () => {
        AsyncStorage.setItem('NOTES', JSON.stringify(this.state));
      }
    );
  }
  delNote = (arg) => () => {
    const newNotes = [...this.state.NOTES];
    const tt = newNotes.indexOf(arg.item);
    newNotes.splice(tt, 1);
    this.setState({NOTES: newNotes});
    
  }
  openModal = (arg) => () => {
    const data = {'title': arg.item.title, 'content': arg.item.content, 'unique': uuid()};
    this.setState({
      modalVisible: true,
      modalText: data
    });
  }
  closeModal = () => {
    this.setState({
      modalVisible: false

    });
  }
  _keyExtractor = (item) => item.unique;
  _renderItem = (args) =>
    <View style={styles.row}>
      <TouchableOpacity
        onPress={this.openModal(args)}>
        <Text style={styles.flatText}>{args.item.title}</Text>
        <Text>{args.item.content}</Text>
      </TouchableOpacity>
      <Button
        onPress={this.delNote(args)}
        title='Del'
      />
    </View>
  render () {
    return (
      <View style={styles.container}>
        <Overlay visible={this.state.modalVisible}
          onClose={this.closeModal}
          closeOnTouchOutside animationType='zoomIn'
          animationDuration={500}>
          <Text>{this.state.modalText.title}</Text>
          <Text>{this.state.modalText.content}</Text>
        </Overlay>
        <Title titles={this.onTitle} textTitle={this.state.title}/>
        <Content texts={this.state.text} Fn={this.onCount}
          FnSave={this.saveNote}/>
        <View style={styles.conFlat}>
          <FlatList
            style={styles.flat}
            data={this.state.NOTES}
            extraData={this.state}
            renderItem={this._renderItem}
            keyExtractor={this._keyExtractor}
          />
        </View>
      </View>
    );
  }
}

