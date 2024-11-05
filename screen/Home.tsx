import React from 'react';
import { View, StyleSheet } from 'react-native';
import Header from './Header';
import { NavigationProp } from '@react-navigation/native';
import FlatCard from './FlatCard';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';

interface ItemProps {
  id: string,
  title: string,
  image: string
  type: TestEnum,
}

interface TestProp {
  id: string,
  title: string,
  image: string
  type: TestEnum,
  description: string;
}

enum TestEnum {
  SERIE = 'serie',
  FILM = 'film',
}

const options = {
  method: 'GET',
  url: 'https://api.themoviedb.org/3/trending/movie/day?language=fr-FR',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxMzIzMWU0YzVjYTg3ZTBiMTJjNjZmMjIyZDZmMWIxNSIsIm5iZiI6MTcyODMzNDc0Ny4yNjEzMDQsInN1YiI6IjY3MDQ0OTBmY2M5MDRmMTJkOTEzYjU4ZiIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.BN42gLFMGRvzvpEAFpqGSzTEs7rjRL7rKaFALAwRaqA'
  }
};
const Home = ({ navigation }: { navigation: NavigationProp<any>}) => {
  const [Imagedata, setImagedata] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.request(options);
        const imagePath = 'https://image.tmdb.org/t/p/w500';
        const results = response.data.results;
        const imageDataArray = results.map((result: { title: string; poster_path: string; overview: string; }) => ({
          title: result.title,
          image: imagePath + result.poster_path,
          summary: result.overview,
        }));
        setImagedata(imageDataArray);
      } catch (error) {
        console.error(error);
      }
    };
    console.log(Imagedata);
    fetchData();
  }, []);

  return (
    <ScrollView>
      <Header data={Imagedata} />
      <View style={styles.container}>
        <FlatCard titleCard='Marvel studio' data={Imagedata} navigation={navigation}/>
        <FlatCard titleCard='Best movies' data={Imagedata} navigation={navigation}/>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
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
  item: {
    flex:1,
    marginRight: 10,
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
});

export default Home;