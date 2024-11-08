import React from "react";
import PubPoster from '../assets/pub.png'
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useUserContext } from '../providers/UserContext';

export const Pub = () => {
    const { user } = useUserContext();
    const backgroundColor = user?.theme ? '#fff' : '#000';
    const textColor = user?.theme ? '#000' : '#fff';
    const buttonColor = user?.theme ? '#f0c929' : '#f0c929';
    const textDetailColor = user?.theme ? 'white' : 'black';

    return(
        <View style={[styles.container, { backgroundColor }]}>
            <Image source={require('../assets/pub.png')} alt='' style={{width:380, height:200, resizeMode: 'cover'}}/>
            <Text style={[styles.title, { color: textColor }]}>Black friday is here!</Text>
            <Text style={[styles.text, { color: textColor }]}>Black friday is here! Lorem ipsum dolor sit amet, consectetur adipiscing elit. Viverra sociis pulvinar auctor nibh nibh iaculis id.</Text>
            <TouchableOpacity style={[styles.buttonDetail, { backgroundColor: buttonColor }]}>
              <Text style={[styles.textDetail, { color: textDetailColor }]}>Check details</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      padding: 20,
    },
    title: {
      fontSize: 18,
      fontWeight: 'bold',
      textAlign: 'left',
      marginTop: 15
    },
    text: {
      marginTop: 15
    },
    buttonDetail: {
      paddingVertical: 10,
      borderRadius: 10,
      marginTop: 20
    },
    textDetail: {
      textAlign: 'center'
    }
});