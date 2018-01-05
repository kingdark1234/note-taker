import API from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Icon from 'react-native-vector-icons/FontAwesome';
import NoteItem from './components/NoteItem/NoteItem.component';
import Overlay from 'react-native-modal-overlay';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import shortid from 'shortid';
import styles from './index.styles';
import Title from './components/Title/Title.component';

import Touchable from 'react-native-platform-touchable';

import {
  FlatList, Text, View
} from 'react-native';

export default class Main extends Component {
  static navigationOptions = ({navigation}) => {
    const toggleDrawer = (navigation) => () => navigation.navigate('DrawerToggle');
    return {
      title: 'Start taking notes',
      headerLeft: <Touchable onPress={toggleDrawer(navigation)}><Icon name='bars' size={24} /></Touchable>
    };
  }

  state = {
    currentTitle: '',
    currentContent: '',
    notes: [],
    modalVisible: false,
    selectedNote: {key: '', title: '', content: ''}
  }

  componentDidMount () {
    this.loadData();
  }

  loadData = async () => {
    API.getNotes().then((notes) => {
      this.setState({notes});
    });
  }

  onTitleChangeText = (currentTitle) => {
    this.setState({currentTitle});
  }

  onContentChangeText = (currentContent) => {
    this.setState({currentContent});
  }

  onSaveButtonPress = () => {
    const {notes, currentTitle, currentContent} = this.state;
    
    const saveNote = {
      key: shortid(),
      title: currentTitle,
      content: currentContent
    };
    
    const newNotes = [...notes, saveNote];

    API.addNotes(saveNote);

    this.setState({
      notes: newNotes,
      currentTitle: '',
      currentContent: ''
    });
  }

  _onPressItem = (item) => () => {
    this.setState({
      modalVisible: true,
      selectedNote: item
    });
  }

  _onDeleteItem = (note) => () => {
    this._removeNoteItem(note);
  }

  _removeNoteItem = (deleteNote) => {
    API.deleteNotes(deleteNote.id);

    this.setState({
      notes: this.state.notes.filter((note) => note !== deleteNote)
    });
  }

  _hideOverlay = () => {
    this.setState({modalVisible: false});
  }

  _goToAbout = () => {
    this.props.navigation.navigate('AboutTab');
  }

  _renderItem = ({item}) => (<NoteItem data={item} onPressItem={this._onPressItem} onDeleteItem={this._onDeleteItem} />)

  render () {
    return (
      <View style={styles.container}>
        <Title onChangeText={this.onTitleChangeText} value={this.state.currentTitle} />
        <Content onChangeText={this.onContentChangeText} value={this.state.currentContent} />
        <Footer characterCount={this.state.currentContent.length} onSaveButtonPress={this.onSaveButtonPress} />
        <View style={styles.list}>
          <FlatList data={this.state.notes} renderItem={this._renderItem}  />
        </View> 

        <Overlay visible={this.state.modalVisible}
          onClose={this._hideOverlay}
          closeOnTouchOutside animationType='zoomInUp'
          animationDuration={500}>
          <Text>{this.state.selectedNote.title}</Text>
          <Text>{this.state.selectedNote.content}</Text>
        </Overlay>
        
        <Touchable onPress={this._goToAbout}><Text>Go to About</Text></Touchable>
      </View>
    );
  }
}

Main.propTypes = {
  navigation: PropTypes.any
};