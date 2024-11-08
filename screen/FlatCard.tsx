import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import { faStar } from '@fortawesome/free-solid-svg-icons';
import { useUserContext } from '../providers/UserContext';

interface ItemProps {
  id: string,
  title: string,
  image: string,
  type: TestEnum,
  summary: string,
  vote: number // Added vote property
}

interface TestProp {
  id: string,
  title: string,
  image: string,
  type: TestEnum,
  summary: string;
  vote: number; // Added vote property
}

enum TestEnum {
  SERIE = 'serie',
  FILM = 'film',
}

const FlatCard = ({ navigation, data, titleCard, showVote }: { navigation: NavigationProp<any>, data: Array<Object>, titleCard: string, showVote: boolean }) => {
  const { user } = useUserContext();
  const textColor = user?.theme ? '#000' : '#fff';

  const renderItem = ({ item }: { item: ItemProps | TestProp }) => {
    const truncatedTitle = item.title.length > 15 ? item.title.substring(0, 9) + '...' : item.title;
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', {
        data: item.title,
        image: item.image,
        summary: item.summary
      })}>
        <Image source={{ uri: item.image }} style={styles.image} />
        {showVote ? (
        <View style={{display: 'flex',flexDirection:'row',alignItems:'center',justifyContent:'space-between',position:'absolute', bottom:6,width:'100%',paddingLeft:3,paddingRight:8}}>
          <Text style={[styles.titleInImage, , { color: textColor }]}>{truncatedTitle}</Text>
          <View style={{display:'flex',flexDirection:'row',alignItems:'center'}}>
            <FontAwesomeIcon icon={faStar} color='#f0c929' style={styles.titleInImage}/>
            <Text style={[styles.voteInImage, { color: textColor }]}>
              {item.vote.toString()}
            </Text>
          </View>
        </View>
        ) : (
        <View style={{display: 'flex',flexDirection:'row'}}>
          <Text style={[styles.title, { color: textColor }]}>{truncatedTitle}</Text>
        </View>
        )}
      </TouchableOpacity>
    );
  }

  return (
    <View style={styles.leftContainer}>
      <View style={styles.header}>
        <Text style={[styles.headerTitle, { color: textColor }]}>{titleCard}</Text>
        <TouchableOpacity>
          <Text style={styles.seeMore}>See more</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        horizontal
        data={data as Array<ItemProps | TestProp>}
        renderItem={renderItem}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        style={{ flex: 1 }}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex: 1,
    marginRight: 10,
    marginBottom: 30
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
    position:'relative'
  },
  title: {
    marginTop: 5,
    textAlign: 'center',
  },
  titleInImage: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    right:0,
    color:'white'
  },
  voteInImage: {
    marginTop: 5,
    textAlign: 'center',
    fontSize: 12,
    right:0
  },
  container: {
    flex: 1,
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 20,
    marginLeft:5
  },
  headerTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom:'3%'
  },
  seeMore: {
    color: '#f0c929',
  },
  leftContainer: {
    marginLeft:'5%'
  }
});

export default FlatCard;
