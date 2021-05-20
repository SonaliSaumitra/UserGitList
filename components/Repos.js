import 'react-native-gesture-handler';
import React, { useState,useEffect }  from 'react';
import {
  Platform,
  StyleSheet,
  Text,
  View,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar, SearchBar } from 'react-native-elements';
import Icon from 'react-native-vector-icons/FontAwesome';

function Repos(props){
  const [repos_url,set_url]=useState(props.route.params.repos_url);
  console.log("repos url",repos_url);
  const [user_data, setData] =  useState([]);
  
 
useEffect(() => {
  fetch(repos_url)
  .then(response => response.json())
  .then(data => setData(data))
  .catch(error => console.log(error));
  },[]);
console.log("reps data",user_data);
 


  return (
    <ScrollView>
      {

         user_data.map((l, i) => (
          <ListItem key={i} bottomDivider onPress={() =>props.navigation.navigate('RepoDetails',{user_data:l})}>
            <Icon name="database" style={styles.Icon_style}/>
            <ListItem.Content>
              <ListItem.Title style={{padding:6}}>{l.full_name}</ListItem.Title>
              <ListItem.Subtitle style={{padding:6}}>{l.description}</ListItem.Subtitle>
            <ListItem.Subtitle style={{padding:6}}>{l.language}  <Icon name="code-fork"/> {l.forks_count}  Built by <Avatar source={{uri: l.owner.avatar_url}} /></ListItem.Subtitle>
            </ListItem.Content>
          </ListItem>
        ))
      }
     
     </ScrollView>
    
    
    
  );

  

};



const styles = StyleSheet.create({
  container: { flex: 1, padding: 16, paddingTop: 30, backgroundColor: '#fff' },
  head: {  height: 40,  backgroundColor: '#f1f8ff'  },
  wrapper: { flexDirection: 'row' },
  title: { flex: 1, backgroundColor: '#f6f8fa' },
  row: {  height: 40  },
  text: { textAlign: 'center' },
  Icon_style:
{
  fontSize:30,
  color:"#3D85C6",
  padding: 15,
  
},
});



export default Repos;