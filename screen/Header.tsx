import React, { useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ImageBackground, Dimensions } from 'react-native';
import Swiper from 'react-native-swiper';
import { useUserContext } from '../providers/UserContext';
import LinearGradient from 'react-native-linear-gradient';

const categories = ['All', 'Romance', 'Sport', 'Kids', 'Horror'];

type DataItem = {
  title: string;
  image: string;
};

const Header = ({ data }: { data: DataItem[] }) => {
  const [oneData, setOneData] = useState<DataItem>({ title: '', image: '' });
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const { width } = Dimensions.get('window');
  const { user } = useUserContext();
  const isDarkMode = user?.theme;

  useEffect(() => {
    let index = 0;
    const interval = setInterval(() => {
      if (data && data.length > 0) {
        setOneData({
          title: data[index].title,
          image: data[index].image,
        });
        index = (index + 1) % data.length;
      }
    }, 5000);

    return () => clearInterval(interval);
  }, [data]);

  const colors = isDarkMode
  ? { gradientColor: 'rgba(255, 255, 255, 1)', gradientColor2: 'rgba(255, 255, 255, 0)' }
  : { gradientColor: 'rgba(0, 0, 0, 1)', gradientColor2: 'rgba(0, 0, 0, 0)' };

  return (
    <View style={styles.headerContainer}>
      <View style={styles.categoryList}>
        {categories.map((category) => (
          <TouchableOpacity key={category} onPress={() => setSelectedCategory(category)}>
            <Text style={selectedCategory === category ? styles.buttonactif : styles.buttondisable}>{category}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <Swiper showsPagination={true} paginationStyle={styles.paginationStyle} dot={<View style={styles.dot}></View>} activeDot={<View style={styles.activeDot}></View>} style={styles.imageBackground}>
        {data.slice(0, 6).map((item, index) => (
          <ImageBackground key={index} source={{ uri: item.image }} style={[styles.imageBackground, { width: width }]} />
        ))}
      </Swiper>
      <LinearGradient
        colors={[colors.gradientColor, colors.gradientColor2]}
        start={{ x: 0, y: 1 }}
        end={{ x: 0, y: 0 }}
        style={[styles.containerBottom, styles.absolute, { bottom: 0 }]}
      />
      <View style={styles.posterContainer}>
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
    </View>
  );
};

const styles = StyleSheet.create({
  headerContainer: {
    flex: 0,
    position: 'relative',
    backgroundColor: 'rgba(0, 0, 0, 0.8)',
  },
  imageBackground: {
    justifyContent: 'center',
    height: 560,
    resizeMode: 'cover',
  },
  containerBottom: {
    width: '100%',
    height: '30%',
    alignItems: 'center',
  },
  categoryList: {
    width: '95%',
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    borderRadius: 20,
    justifyContent: 'space-between',
    top: 50,
    borderWidth:4,
    borderColor: 'rgba(0, 0, 0, 0.7)',
    marginHorizontal: 10,
    zIndex: 20,
  },
  posterContainer: {
    position: 'absolute',
    bottom: 10,
    zIndex: 21,
  },
  buttonRow: {
    flexDirection: 'row',
    width: '100%',
    alignItems: 'center',
    justifyContent: 'center',
    bottom: 80,
    left: '20%',
  },
  button: {
    padding: 12,
    borderRadius: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-start',
    marginTop: 20,
    left: '5%',
    position: 'absolute',
    bottom: 30,
    zIndex: 30,
  },
  wishlistButton: {
    paddingVertical: 15,
    paddingHorizontal: 20,
    backgroundColor: '#555',
    borderRadius: 10,
    width: 190,
    marginRight: '3%',
  },
  wishlistText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  detailsButton: {
    paddingVertical: 15,
    paddingHorizontal: 30,
    backgroundColor: '#f0c929',
    borderRadius: 10,
    elevation: 5,
    width: 190,
  },
  detailsText: {
    color: '#000',
    fontSize: 16,
    textAlign: 'center',
  },
  buttonactif: {
    fontSize: 18,
    backgroundColor: '#fff',
    padding: 15,
    paddingHorizontal:15,
    borderRadius: 20,
  },
  buttondisable: {
    fontSize: 18,
    color: '#fff',
    padding: 15,
  },
  absolute: {
    position: 'absolute',
    zIndex: 10,
  },
  paginationStyle: {
    bottom: 0,
  },
  dot: {
    backgroundColor: 'white',
    width: 8,
    height: 8,
    borderRadius: 4,
    margin: 3,
    position: 'absolute',
    bottom: 0,
    zIndex: 37,
  },
  activeDot: {
    backgroundColor: '#f0c929',
    width: 10,
    height: 10,
    borderRadius: 5,
    margin: 3,
  },
});

export default Header;
