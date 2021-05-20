import 'react-native-gesture-handler';
import React, { useState,useEffect }  from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  Platform,
  Text,
  View,
  StyleSheet,
  ScrollView,
  Button,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { ListItem, Avatar, SearchBar } from 'react-native-elements'

function Details(props){
  const [user_data, setData] =  useState(props.route.params.user_data);
  const login =props.route.params.login;
  const login_id=props.route.params.login_id;
  const [Details_array , set_Details] = useState([]);
 const [starred_url , set_stars] = useState("https://api.github.com/users/"+login+"/starred");
 const [starred_array,stars_array] = useState([]);
 const [followers_array,follow_array] = useState([]);
 const [following_array,followin_array] = useState([]);
 const [repos_array,repo_array] = useState([]);

 
  console.log("hey",login,login_id,user_data);
const detail_repo=()=>
{
  alert("details");
}

  useEffect(() => {
    console.log("useeffect of details");
    //Get stars count
    fetch(starred_url)
    .then(response => response.json())
    .then(data => stars_array(data))
    .catch(error => console.log(error));
   
    //Get followers count
     fetch(Details_array.followers_url)
    .then(response => response.json())
    .then(data => follow_array(data))
    .catch(error => console.log(error));

    //Get following count
    fetch(Details_array.following_url)
    .then(response => response.json())
    .then(data => followin_array(data))
    .catch(error => console.log(error));


    //Get repos count
    fetch(Details_array.repos_url)
    .then(response => response.json())
    .then(data => repo_array(data))
    .catch(error => console.log(error));
    console.log("star,follower,following,repos",starred_array,followers_array,following_array,repos_array)
    for(var i=0;i<user_data.length;i++)
     {
       if(user_data[i].id==login_id)
       {
         set_Details(user_data[i])
       }
       
     
     }
   
 },[]);

     return (
    <View style={styles.main}>
      <View style={{flexDirection: 'row'}}>
      <Avatar source={{uri: Details_array.avatar_url}} />
     <Text style={styles.user_name}>{login}'s GitHub stats</Text>
      </View>
     
     <View style={{padding:8}}></View>
     <View style={{flexDirection: 'row'}}>
      <Icon name="star-o" style={styles.Icon_style}/>      
      <Text style={styles.Subtitle} >Total Stars  {starred_array.length}</Text>
     </View> 
     <View style={{flexDirection: 'row'}}>
      <Icon name="user" style={styles.Icon_style}/>      
      <Text style={styles.Subtitle} >Followers  {followers_array.length}</Text>
     </View>
     <View style={{flexDirection: 'row'}}>
      <Icon name="user-plus" style={styles.Icon_style}/>      
      <Text style={styles.Subtitle} >Following  {following_array.length}</Text>
     </View>
     <TouchableOpacity onPress={() =>props.navigation.navigate('Repos',{repos_url:Details_array.repos_url})}>
     <View  style={{flexDirection: 'row'}}>
      <Icon name="github" style={styles.Icon_style}/>      
      <Text style={{ padding: 15,
       fontSize:15,textDecorationLine:'underline',fontWeight:'bold'}} >Repositories  {repos_array.length}</Text>
     </View>
     </TouchableOpacity>
    </View>
   );
};

const styles = StyleSheet.create({
  main:{
    flex: 1,
    flexDirection: 'column',
    padding:16,
    justifyContent: 'center',

},
user_name:{
  color:'#3D85C6',
  fontSize:20,
  fontFamily:'Roboto',
  lineHeight:24,
  fontWeight:'bold',
  padding:8
},

Icon_style:
{
  fontSize:30,
  color:"#3D85C6",
  padding: 15,
  
},
Subtitle:{
  padding: 15,
  fontSize:15
}
});




export default Details;