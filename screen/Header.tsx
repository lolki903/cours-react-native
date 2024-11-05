import { faCircle } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, FlatList, StyleSheet, ImageBackground, Image } from 'react-native';

const categories = ['All', 'Romance', 'Sport', 'Kids', 'Horror'];

const Header = ({ data }) => {
  const [OneData, setOneData] = useState<{ title?: string; image?: string }>({});

  useEffect(() => {
    if (data && data.length > 0) {
      let index = 0;
        setOneData({
          title: data[index].title,
          image: data[index].image,
        });
        index = (index + 1) % data.length;
      } else {
      setOneData({});
    }
  }, [data]);

  const renderCategory = ({ item }: any) => (
    <TouchableOpacity style={styles.categoryButton}>
      <Text style={styles.categoryText}>{item}</Text>
    </TouchableOpacity>
  );

  const renderMovieCircle = ({ item }: any) => (
    <TouchableOpacity onPress={()=>setOneData({
      image: item.image,
      title: item.title
    })} style={{ width: 50, height: 50, borderRadius: 25, backgroundColor: 'transparent' }}>
      <FontAwesomeIcon icon={faCircle} color='white'size={20}/>
    </TouchableOpacity>
  );

  return (
    <View style={styles.headerContainer}>
      <ImageBackground source={{uri: OneData.image}} style={styles.imageBackground}>
      <FlatList
        horizontal
        data={categories}
        renderItem={renderCategory}
        keyExtractor={(item) => item}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.categoryList}
        />
      <View style={styles.posterContainer}>
        <Text style={styles.title}>{OneData.title}</Text>
        <View style={styles.buttonRow}>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>My List</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.buttonText}>Discover</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.actionRow}>
          <TouchableOpacity style={styles.wishlistButton}>
            <Text style={styles.wishlistText}>+ Wishlist</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.detailsButton}>
            <Text style={styles.detailsText}>Details</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ImageBackground>
      <FlatList
        horizontal
        data={data.slice(0, 5)} // Limiting data to first 5 items
        renderItem={renderMovieCircle}
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{flex: 1, justifyContent: 'center', alignItems: 'flex-start',marginTop:10}}
        />
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    paddingTop: 10,
    backgroundColor: '#000',
  },
  imageBackground: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  categoryList: {
    marginBottom: 10,
  },
  categoryButton: {
    marginHorizontal: 10,
    paddingVertical: 5,
    paddingHorizontal: 15,
    backgroundColor: '#333',
    borderRadius: 20,
  },
  categoryText: {
    color: '#fff',
    fontSize: 14,
  },
  posterContainer: {
    marginBottom: 20,
    padding:70
  },
  title: {
    color: '#fff',
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  buttonRow: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    marginBottom: 10,
  },
  button: {
    padding: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
    paddingHorizontal: 40,
  },
  wishlistButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#333',
    borderRadius: 5,
  },
  wishlistText: {
    color: '#fff',
    fontSize: 16,
  },
  detailsButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#f0c929',
    borderRadius: 5,
  },
  detailsText: {
    color: '#000',
    fontSize: 16,
  },
});

export default Header;
