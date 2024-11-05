import { faClose, faCross } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

interface DetailsFilm {
    title: string
    image: string
    summary: string
}

function DetailsScreen({route, navigation: { goBack } } : any ) {
    const { data, image, summary } = route.params
    console.log(image);
  return (
    <View style={{ flex: 1, paddingTop:30, backgroundColor:'black', alignItems:'flex-end' }}>
        <TouchableOpacity onPress={() => goBack()}>
            <FontAwesomeIcon icon={faClose} color='white' size={40} style={{marginBottom:20}}/>
        </TouchableOpacity>
        <View style={{alignItems:'center'}}>
            <Image source={{uri : image}} style={styles.image} />
            <Text style={styles.title}>{data}</Text>
            <Text style={{color:'white'}}>{summary}</Text>
        </View>
    </View>
  );
}
const styles = StyleSheet.create({
    item: {
      flex:1,
      marginRight: 10,
      marginBottom: 45
    },
    image: {
      width: 380,
      height: 450,
      borderRadius: 20,
    },
    title: {
     fontSize:30,
     fontWeight: 'bold',
     color: 'white',
     textTransform: 'uppercase'
    },
    container: {
      flex: 1,
      backgroundColor: '#000',
      padding: 10,
    },
    header: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      alignItems: 'center',
      marginBottom: 10,
    },
    headerTitle: {
      color: '#fff',
      fontSize: 18,
      fontWeight: 'bold',
    },
    seeMore: {
      color: '#f0c929',
    },
  });
export default DetailsScreen;

