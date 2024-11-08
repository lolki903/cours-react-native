import { faClose } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';
import { useUserContext } from '../providers/UserContext'; // Import the user context

interface DetailsFilm {
    data: string
    title: string
    image: string
    summary: string
}

const DetailsScreen = ({ route, navigation: { goBack } }: any) => {
    const { data, image, summary }: DetailsFilm = route.params;
    const { user } = useUserContext();

    return (
        <View style={{ flex: 1, paddingTop: 30, backgroundColor: user?.theme ? '#fff' : '#000', alignItems: 'flex-end' }}>
            <TouchableOpacity onPress={() => goBack()}>
                <FontAwesomeIcon icon={faClose} color={user?.theme ? '#000' : 'white'} size={40} style={{ marginBottom: 20 }} />
            </TouchableOpacity>
            <View style={{ alignItems: 'center' }}>
                <Image source={{ uri: image }} style={styles.image} />
                <Text style={[styles.title, { color: user?.theme ? '#000' : 'white' }]}>{data}</Text>
                <Text style={{ color: user?.theme ? '#000' : 'white' }}>{summary}</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    item: {
        flex: 1,
        marginRight: 10,
        marginBottom: 45
    },
    image: {
        width: 380,
        height: 450,
        borderRadius: 20,
    },
    title: {
        fontSize: 30,
        fontWeight: 'bold',
        textTransform: 'uppercase'
    },
    container: {
        flex: 1,
        padding: 10,
    },
    header: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginBottom: 10,
    },
    headerTitle: {
        fontSize: 18,
        fontWeight: 'bold',
    },
    seeMore: {
        color: '#f0c929',
    },
});
export default DetailsScreen