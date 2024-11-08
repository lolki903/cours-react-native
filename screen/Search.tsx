import React, { useEffect, useState } from 'react';
import { TextInput, View, StyleSheet, FlatList, Text, Image, TouchableOpacity } from 'react-native';
import axios from 'axios';
import { TOKEN_IMBD } from "@env";
import { NavigationProp } from '@react-navigation/native';
import { useUserContext } from '../providers/UserContext';

interface Movie {
  id: string;
  title: string;
  poster_path: string;
  overview: string;
}

const Search = ({navigation}: {navigation: NavigationProp<any>}) => {
  const { user } = useUserContext();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Movie[]>([]);

  const searchMovies = async (text: string) => {
    if (text) {
      const response = await axios.get(`https://api.themoviedb.org/3/search/movie?api_key=${process.env.API_KEY}&query=${text}`);
      setResults(response.data.results);
    } else {
      setResults([]);
    }
  };

  useEffect(() => {
      searchMovies(query);
  }, [query]);

  return (
    <View style={[styles.container, { backgroundColor: user?.theme ? '#fff' : '#000' }]}>
      <TextInput
        style={[styles.searchBar,{color: user?.theme ? '#000' : '#fff' }]}
        placeholder="Search Movies"
        placeholderTextColor="grey"
        value={query}
        onChangeText={setQuery}
      />
      <FlatList
        data={results}
        keyExtractor={(item: Movie) => item.id}
        numColumns={2}
        renderItem={({ item }: { item: Movie }) => (
          <View style={styles.resultBox}>
            <Image
              source={{ uri: `https://image.tmdb.org/t/p/w500${item.poster_path}` }}
              style={styles.image}
            />
            <TouchableOpacity onPress={() => navigation.navigate('Details',{
                data: item.title,
                image: `https://image.tmdb.org/t/p/w500${item.poster_path}`,
                summary: item.overview
            })}>
              <Text style={styles.title}>{item.title}</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 10,
  },
  searchBar: {
    height: 50,
    borderColor: '#f0c929',
    borderWidth: 1,
    borderRadius: 10,
    paddingHorizontal: 10,
    color: '#fff',
    marginBottom: 15,
  },
  resultBox: {
    flex: 1,
    margin: 5,
    backgroundColor: '#1c1c1c',
    borderRadius: 10,
    padding: 10,
    alignItems: 'center',
  },
  title: {
    color: '#fff',
    textAlign: 'center',
  },
  image: {
    width: '100%',
    height: 180,
    borderRadius: 10,
    marginBottom: 5,
  },
});

export default Search;
