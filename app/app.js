/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 * @flow
 */
import ApiNotes from './api';
import Content from './components/Content/Content.component';
import Footer from './components/Footer/Footer.component';
import Note from './components/Note/Note.component';
import PropTypes from 'prop-types';
import React, {Component} from 'react';
import styles from './index.style';
import Title from './components/Title/Title.component';
// import uuid from 'uuid';
import {Alert, AsyncStorage, KeyboardAvoidingView, Platform, Text, View} from 'react-native';
import {connect} from 'react-redux';

class App extends Component {
  initialstate = {
    content: '',
    title: '',
    note: []
  }
  state = this.initialstate
   init = async () => {
     try {
       const response = await ApiNotes.getNotes();
       this.props.populateNote(response);
     } catch (error) {
       const value = await AsyncStorage.getItem('storageNote');
       const note = value ? JSON.parse(value) : [];
       this.props.populateNote(note);
     }
   
   }
   componentDidMount () {
     this.init();
   }

  WrapperView = Platform.select(
    {ios: KeyboardAvoidingView,
      android: View
    }
  )
  changeTitle  = (text) => {
    this.setState({title: text});
  }
  changeContent  = (text) => {
    this.setState({content: text});
  }
  onSave = async () => {
    
    try {
      const note =   {
        title: this.state.title,
        content: this.state.content
      };
      const noteWithId = await  ApiNotes.addNote(note);
      this.props.addNote(noteWithId);      
      const newNote = [...this.props.noteList];
      newNote.push(noteWithId);
      // await AsyncStorage.setItem('storageNote', JSON.stringify(newNote));
      // const newState = {
      //   title: '',
      //   content: '',
      //   note: newNote
      // };
      // this.setState(newState);
     
    } catch (error) {
      Alert.alert(
        'Save Failed',
        String(error),
        [
          {text: 'OK'}
        ],
        {
          cancelable: false
        }
      );
    }
  }

  onDelete = (item) => async () => {
    try {
      await  ApiNotes.deleteNote(item.id);
      this.props.deleteNote(item.id);
    } catch (error) {
      Alert.alert(
        'Delete Failed',
        String(error),
        null,
        {
          cancelable: false
        }
      );
    }
  }

  goToAbout = () => {
    this.props.navigation.navigate('About');
  }
  
  render () {
    return (
      <this.WrapperView style={styles.container} behavior={'padding'} >
        <Title onTitleChange={this.changeTitle}/>
        <Content  onContentChange={this.changeContent} />
        <Footer characterCount={this.state.content.length} onPressSave={this.onSave} />
        {this.props.noteList.length > 0 ? <Note noteList={this.props.noteList} onDelete={this.onDelete}/> : null}
        <View><Text onPress={this.goToAbout}>about us</Text></View>
      </this.WrapperView>
    );
  }
}

App.propTypes = {
  noteList: PropTypes.array,
  navigation: PropTypes.object,
  addNote: PropTypes.func,
  deleteNote: PropTypes.func,
  populateNote: PropTypes.func
};
const mapStateToProps = (storeState) => ({noteList: storeState.notes});
const mapDispatchToProps = (dispatch) => ({
  addNote: (note) => {
    dispatch({
      type: 'ADD_NOTE',
      payload: note
    });
  },
  deleteNote: (id) => {
    dispatch({
      type: 'DELETE_NOTE',
      payload: id
    });
  },
  populateNote: (note) => {
    dispatch({
      type: 'POPULATE_NOTE',
      payload: note
    });
  }
});
export default connect(mapStateToProps, mapDispatchToProps)(App);