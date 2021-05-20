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
  TouchableOpacity,processColor
} from "react-native";
import { ListItem, Avatar, SearchBar } from 'react-native-elements';

import {PieChart} from 'react-native-charts-wrapper';

function RepoDetails(props){
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
      <Avatar source={{uri: user_data.owner.avatar_url}} />
     <Text style={styles.user_name}>{user_data.full_name}</Text>
     <Text> <Icon name="code-fork"/> Forks : {user_data.forks_count}</Text>
      </View>
     
    
      <View style={styles.container}>
          <PieChart
            style={styles.chart}
            logEnabled={true}
            chartBackgroundColor={processColor('pink')}
            chartDescription={{text:'Comparing Open And Closed Issues',
            textSize: 15,
            textColor: processColor('darkgray')}}
            data={{ dataSets: [{
              values: [{value: user_data.open_issues_count, label: 'Open'},
                {value: 1, label: 'Closed'},
               ],
              label: 'Pie dataset',
              config: {
                colors: [processColor('#C0FF8C'), processColor('#FFF78C')],
                valueTextSize: 20,
                valueTextColor: processColor('green'),
                sliceSpace: 5,
                selectionShift: 13,
                // xValuePosition: "OUTSIDE_SLICE",
                // yValuePosition: "OUTSIDE_SLICE",
                valueFormatter: "#.#'%'",
                valueLineColor: processColor('green'),
                valueLinePart1Length: 0.5
              }
            }],}}
            legend={{ enabled: true,
              textSize: 15,
              form: 'CIRCLE',
      
              horizontalAlignment: "RIGHT",
              verticalAlignment: "CENTER",
              orientation: "VERTICAL",
              wordWrapEnabled: true}}
          

            extraOffsets={{left: 5, top: 5, right: 5, bottom: 5}}

            entryLabelColor={processColor('green')}
            entryLabelTextSize={20}
            entryLabelFontFamily={'HelveticaNeue-Medium'}
            drawEntryLabels={true}

            rotationEnabled={true}
            rotationAngle={45}
            usePercentValues={true}
            styledCenterText={{text:'Pie center text!', color: processColor('pink'), fontFamily: 'HelveticaNeue-Medium', size: 20}}
            centerTextRadiusPercent={100}
            holeRadius={40}
            holeColor={processColor('#f0f0f0')}
            transparentCircleRadius={45}
            transparentCircleColor={processColor('#f0f0f088')}
            maxAngle={350}
           // onSelect={this.handleSelect.bind(this)}
            onChange={(event) => console.log(event.nativeEvent)}
          />
        </View>
 
    </View>
   );
};

const styles = StyleSheet.create({
  main:{
    flex: 1,
    flexDirection: 'column',
    padding:16,
    justifyContent: 'flex-start',

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
},
container: {
  flex: 1,
  backgroundColor: '#F5FCFF'
},
chart: {
  flex: 1
}
});




export default RepoDetails;