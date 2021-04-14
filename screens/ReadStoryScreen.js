import * as React from "react"
import { Text, TextInput, View, TouchableOpacity, StyleSheet, ScrollView } from 'react-native'
import firebase from 'firebase';
import db from '../config';

export default class ReadStoryScreen extends React.Component {
  constructor() {
    super();
    this.state = {
      searchVal: [],
      search: '',
      storylist: [],
      num: 0


    }
    this.search();
    
  }
  search = async () => {
    var search = this.state.search;
    var storylist = [];
    var Val = [];
    var StoriesVal = await db.collection("Stories").get();


    StoriesVal.forEach((doc) => {
      var titledata = doc.data().Title;
      if (search === '' || titledata.includes(search)) {
        storylist.push(doc.data());
      }

    });



    //this.setState({ searchVal: Story });
    this.setState({ storylist: storylist });

  }
  render() {
    var num = this.state.num;
    return (
      
      <ScrollView>
      
        <Text style = {styles.title}>Read screen</Text>
      
        <TextInput style = {styles.Input}placeholder={"Search here"} value={this.state.search} onChangeText={(value) => { this.setState({ search: value }) }}></TextInput>
        <TouchableOpacity style = {styles.button} onPress={() => { this.search() }} ><Text>Search!</Text></TouchableOpacity>
        <View>
          {this.state.storylist.map((storys) => {
            return (
              <View style={styles.container}><Text>{storys.Author}</Text><Text>{storys.Title}</Text><Text>{storys.Story}</Text> </View>
            )
          })}
         
 
          </View> 
        </ScrollView>
 
    );
  }


}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 4,
    backgroundColor: "#eaeaea",
    paddingTop: 33,
    marginTop: 10,
    textAlign: "center",
  
  },
  title: {
    marginBottom: 86,
    marginTop: 46,
    paddingVertical: 8,
    backgroundColor: "#69dafb",
    color: "#20232a",
    textAlign: "center",
    fontSize: 30,
    fontWeight: "bold"
  },
  button: {
    marginBottom: 86,
    marginTop: 26,
    flex: 1,
    backgroundColor: "#eaeaea",
    paddingTop: 3,
    marginTop: 10,
    borderWidth: 2,
    width : 160,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: "center",
    
    

  },
   Input: {
    marginBottom: 36,
    marginTop: 30,
    flex: 1,
    backgroundColor: "#69dafb",
    paddingTop: 3,
    marginTop: 10,
    borderWidth: 2,
    width : 260,
    alignSelf: 'center',
    alignContent: 'center',
    alignItems: "center",

    
    

  }
});
