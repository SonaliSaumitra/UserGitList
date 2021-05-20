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
import { ListItem, Avatar, SearchBar } from 'react-native-elements'

function Home(props){
  const [user_data, setData] =  useState([]);
  const[search , Search_word]= useState('');
  const [arrdata,setArrdata] = useState([]);
  const [done, setDone] = useState(false);
 
useEffect(() => {
    console.log("LOGIN USEFFECT CALLED");
    
    fetch('https://api.github.com/users')
  .then(response => response.json())
  .then(data => setData(data));
  },[]);

 
 console.log("data array",user_data);
 const updateSearch = (search) => {

  console.log("user_data",user_data);
  console.log("search value:",search);
//  saveToStorage();
  // Variable to hold the original version of the list
     let currentList = [];
         // Variable to hold the filtered list before putting into state
     let newList = [];

  if (search !== "") {
          // Assign the original list to currentList
    currentList = user_data;

          // Use .filter() to determine which items should be displayed
          // based on the search terms
    newList = currentList.filter(item => {
              // change current item to lowercase
      const lc = item.login.toLowerCase();
              // change search term to lowercase
      const filter =search.toLowerCase();
              // check to see if the current list item includes the search term
              // If it does, it will be added to newList. Using lowercase eliminates
              // issues with capitalization in search terms and search content
      return lc.includes(filter);
    });
  } else {
          // If the search bar is empty, set newList to original task list
    newList = user_data;
  }


  console.log("sorted item:",newList);
       Search_word(search);
       setData(newList);
}

const clearbtn=()=>{
  setDone(false);
  fetch('https://api.github.com/users')
  .then(response => response.json())
  .then(data => setData(data));
 
//  inputEl.current.clear();
}


  return (
    <View>
      <SearchBar
        placeholder="Type Here..."
        value={search}
        onChangeText={updateSearch}
        onClear={clearbtn}
      />
      <ScrollView>
     
     {
  user_data.map((l, i) => (
    <ListItem key={i} bottomDivider onPress={() =>props.navigation.navigate('Details',{login:l.login,login_id:l.id,user_data:user_data})}>
      <Avatar source={{uri: l.avatar_url}} />
      <ListItem.Content>
        <ListItem.Title>{l.login}</ListItem.Title>
      </ListItem.Content>
    </ListItem>
  ))
}
  </ScrollView>
    </View>
    
    
  );

  

};







export default Home;