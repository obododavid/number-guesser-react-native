import React from 'react';
import { StyleSheet, View, Button, Text, Image } from 'react-native';

import DefautStyles from '../constants/default-styles';

const GameOverScreen = props => {
    return (
        <View style={styles.screen}>
            <Text style={DefautStyles.title}>The Game is Over</Text>
            <View style={styles.imageContainer}>
                <Image
                    // source={require('../assets/success.png')}
                    source={{ uri: 'https://images.unsplash.com/photo-1587613754760-cd9a285831b3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=700&q=60' }}
                    fadeDuration={1000}
                    style={styles.image}
                    resizeMode="cover" />
            </View>
            <Text style={DefautStyles.bodyText}>Number of rounds: {props.roundsNumber}</Text>
            <Text style={DefautStyles.bodyText}>Number was : {props.userNumber}</Text>
            <Button title="NEW GAME" onPress={props.onRestart} />
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    imageContainer: {
        borderWidth: 3,
        borderColor: 'black',
        width: 300,
        height: 300,
        borderRadius: 150,
        overflow: 'hidden',
        marginVertical: 30
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 200
    }
})

export default GameOverScreen