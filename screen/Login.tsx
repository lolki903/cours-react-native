import React, { useState } from "react";
import { Text, TextInput, TouchableOpacity, View, StyleSheet } from "react-native";
import { useUserContext } from '../providers/UserContext'; // Import the user context

const Login = ({ onLogin }: { onLogin: (userInfo: { name: string; email: string }) => void }) => {
    const { user, setUser } = useUserContext();
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');

    return (
        <View style={styles.container}>
            <TextInput
                style={styles.input}
                placeholder="Name"
                placeholderTextColor="grey"
                value={name}
                onChangeText={setName}
            />
            <TextInput
                style={styles.input}
                placeholder="Email"
                placeholderTextColor="grey"
                value={email}
                onChangeText={setEmail}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    onLogin({ name, email });
                    setUser({ email, name });
                }}
            >
                <Text style={styles.buttonText}>Se connecter</Text>
            </TouchableOpacity>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#000',
        padding: 20,
    },
    input: {
        height: 50,
        width: '100%',
        borderColor: '#f0c929',
        borderWidth: 1,
        borderRadius: 10,
        paddingHorizontal: 10,
        marginBottom: 15,
        color: '#fff',
    },
    button: {
        backgroundColor: '#f0c929',
        borderRadius: 10,
        paddingVertical: 15,
        paddingHorizontal: 30,
        color:'white'
    },
    buttonText: {
        color: '#000',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default Login;