import React from "react";
import { Text, View, StyleSheet, TouchableOpacity } from "react-native";
import { useUserContext } from '../providers/UserContext';

export const Profile = () => {
    const { user, setUser } = useUserContext() as { user: { name: string; email: string; theme?: boolean }, setUser: (user: { name: string; email: string; theme?: boolean }) => void };
    const switchTheme = () => {
        setUser({
            name: user.name,
            email: user.email,
            theme: !user.theme
        })
    }
    const backgroundColor = user?.theme ? '#fff' : '#000';
    const textColor = user?.theme ? '#000' : '#fff';

    return (
        <View style={[styles.container, { backgroundColor }]}>
            {user ? (
                <>
                    <Text style={[styles.text, { color: textColor }]}>Welcome, {user.name}!</Text>
                    <Text style={[styles.text, { color: textColor }]}>Email: {user.email}</Text>
                    <TouchableOpacity onPress={switchTheme}>
                        <Text style={[styles.text, { color: textColor }]}>Switch theme dark/light</Text>
                    </TouchableOpacity>
                </>
            ) : (
                <Text style={[styles.text, { color: textColor }]}>Loading...</Text>
            )}
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        padding: 20,
    },
    text: {
        fontSize: 18,
        marginBottom: 10,
    },
});