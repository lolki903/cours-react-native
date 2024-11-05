import React from 'react';
import { View, Text, FlatList, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { NavigationProp } from '@react-navigation/native';

interface ItemProps {
  id: string,
  title: string,
  image: string
  type: TestEnum,
  summary: string
}

interface TestProp {
  id: string,
  title: string,
  image: string
  type: TestEnum,
  summary: string;
}

enum TestEnum {
  SERIE = 'serie',
  FILM = 'film',
}

const FlatCard = ({ navigation, data , titleCard }: { navigation: NavigationProp<any>, data: Array<Object>, titleCard: string}) => {
  const renderItem = ( {item} : {item: ItemProps | TestProp}) => {
    console.log(item.summary);
    return (
      <TouchableOpacity style={styles.item} onPress={() => navigation.navigate('Details', {
        data: item.title,
        image: item.image,
        summary: item.summary
      })}>
        <Image source={{ uri: item.image }} style={styles.image} />
        <Text style={styles.title}>{item.title}</Text>
      </TouchableOpacity>
    );
  }

  return (
    <View>
    <View style={styles.header}>
    <Text style={styles.headerTitle}>{titleCard}</Text>
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
      style={{flex:1}}
      />
      </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flex:1,
    marginRight: 10,
    marginBottom: 45
  },
  image: {
    width: 120,
    height: 180,
    borderRadius: 10,
  },
  title: {
    color: '#fff',
    marginTop: 5,
    textAlign: 'center',
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

export default FlatCard;
