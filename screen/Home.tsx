import React from 'react';
import { View, StyleSheet, SafeAreaView } from 'react-native';
import Header from './Header';
import FlatCard from './FlatCard';
import { ScrollView } from 'react-native-gesture-handler';
import axios from 'axios';
import { TOKEN_IMBD } from "@env"
import { NavigationProp } from '@react-navigation/native';
import { Pub } from './Pub';
import { useUserContext } from '../providers/UserContext';

const tmdbapi = axios.create({
  baseURL: `https://api.themoviedb.org/3`,
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer ' + TOKEN_IMBD,
  },
});

const DISCOVER_PATH = `/discover/movie?api_key=${process.env.API_KEY}&with_keywords=180547?language=fr-FR`;
const TRENDING_PATH = '/trending/movie/day?language=fr-FR';
const Home = ({navigation} : {navigation : NavigationProp<any>}) => {
  const { user } = useUserContext();
  const [imagedata, setImagedata] = React.useState([]);
  const [imagedataMarvel, setImagedataMarvel] = React.useState([]);

  React.useEffect(() => {
    const fetchData = async (path_url: string) => {
      try {
        const response = await tmdbapi.get(path_url);
        const imagePath = 'https://image.tmdb.org/t/p/w500';
        const results = response.data.results;
        const dataArray = results.map((result: { title: string; poster_path: string; overview: string; vote_average:number }) => ({
          title: result.title,
          image: imagePath + result.poster_path,
          summary: result.overview,
          vote: result.vote_average
        }));
        if(path_url == TRENDING_PATH)
          setImagedata(dataArray);
        else if(path_url == DISCOVER_PATH)
          setImagedataMarvel(dataArray)
      } catch (error) {
        console.error("error",error);
      }
    };
    fetchData(DISCOVER_PATH);
    fetchData(TRENDING_PATH);
  }, []);

  return (
    <SafeAreaView style={styles.safeContainer}>
    <ScrollView style={[styles.container, { backgroundColor: user?.theme ? '#fff' : '#000' }]}>
      <Header data={imagedata} />
      <View>
        <FlatCard showVote={false} titleCard='Marvel studio' data={imagedataMarvel} navigation={navigation}/>
        <FlatCard showVote={true} titleCard='Best movies' data={imagedata} navigation={navigation}/>
      </View>
      <Pub />
    </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#000',
  },
  safeContainer: {
    backgroundColor: '#000',
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