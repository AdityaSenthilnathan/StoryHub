import { StyleSheet, Text, View, TextInput, TouchableOpacity} from 'react-native';
import * as React from 'react'
import db from '../config.js'


export default class WriteStoryScreen extends React.Component{
  constructor() {
    super();
    this.state = {
      Author: '',
      Title: '',
      Story: '',

    }

  }

    render(){
      return (
        <View>
         <TextInput value = {this.state.Author} style = {styles.Input} placeholder = {"Author"}></TextInput>
         <Text> </Text>
         <TextInput value = {this.state.Title} style = {styles.Input} placeholder = {"Title"}></TextInput> 
         <Text> </Text>
         <TextInput multiline
          numberOfLines={20}
          value = {this.state.Story} style = {styles.story} placeholder = {"Write your story here!"}></TextInput>
        
         <Text> </Text>
         <Text> </Text>
         <TouchableOpacity onPress = {submitStory()}><Text>Submit Your Story!</Text></TouchableOpacity>
  
        </View>
      );
  }
}

submitStory = () => {
  db.collection('Stories').add({
    Author: this.state.Author,
    Title: this.state.Title,
    Story: this.state.Story
  })
}
const styles = StyleSheet.create({
  Input: {
    width:200,

   borderWidth: 2,
  },
  story: {
    width:2000,

   borderWidth: 2,
  },

});
  
