import React, { useState, useRef, useEffect } from 'react';
import { StyleSheet, Text, View, Button, Alert, ScrollView } from 'react-native';
import { Ionicons } from '@expo/vector-icons'

import DefaultStyles from '../constants/default-styles';

import NumberContainer from '../components/NumberContainer';
import Card from '../components/Card'
import MainButton from '../components/MainButton'

const generateRandomBetween = (min, max, exclude) => {
    min = Math.ceil(min);
    max = Math.floor(max);
    const rndNum = Math.floor(Math.random() * (max - min)) + min;
    if (rndNum === exclude) {
        return generateRandomBetween(min, max, exclude)
    } else {
        return rndNum
    }
}

const renderListItem = (value, numOfRound) => {
    return (
        <View key={value} style={styles.listItem}>
            <Text>#{numOfRound}</Text>
            <Text>{value}</Text>
        </View>
    )
}


const GamesScreen = props => {
    const initialguess = generateRandomBetween(1, 100, props.userChoice)
    const [currentGuess, setCurrentGuess] = useState(initialguess)
    const [pastGuesses, setPastGuesses] = useState([initialguess]);
    const [rounds, setRounds] = useState(0)
    const currentLow = useRef(1)
    const currentHigh = useRef(100)
    const { userChoice, onGameOver } = props;

    useEffect(() => {
        if (currentGuess === userChoice) {
            onGameOver(rounds)
        }
    }, [currentGuess, userChoice, onGameOver])

    const nextGuessHandler = direction => {
        if ((direction === 'lower' && currentGuess < props.userChoice) || (direction === 'greater' && currentGuess > props.userChoice)) {
            Alert.alert(
                'don\'t lie',
                'You know that this is wrong...',
                [{ text: 'Sorry', style: 'cancel' }]
            )
            return;
        }

        if (direction === 'lower') {
            currentHigh.current = currentGuess;
        } else {
            currentLow.current = currentGuess + 1;
        }

        const nextNumber = generateRandomBetween(currentLow.current, currentHigh.current, currentGuess)
        setCurrentGuess(nextNumber)
        setRounds(curRounds => curRounds + 1)
        setPastGuesses([
            nextNumber,
            ...pastGuesses
        ])
    }

    return (
        <View style={styles.screen}>
            <Text style={DefaultStyles.title}>Opponent's Guess</Text>
            <NumberContainer>{currentGuess}</NumberContainer>
            <Card style={styles.buttonContainer}>
                <MainButton onPress={nextGuessHandler.bind(this, 'lower')}>
                    <Ionicons name="md-remove" size={24} color="white" />
                </MainButton>
                <MainButton onPress={nextGuessHandler.bind(this, 'greater')} >
                    <Ionicons name="md-add" size={24} color="white" />
                </MainButton>
            </Card>
            <View style={styles.list}>
                <ScrollView>
                    {pastGuesses.map((guess, i) => renderListItem(guess, pastGuesses.length - i))}
                </ScrollView>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        padding: 10,
        alignItems: 'center'
    },
    buttonContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        marginTop: 20,
        width: 300,
        maxWidth: '80%'
    },
    list: {
        width: '80%',
        flex: 1
    },
    listItem: {
        borderColor: '#ccc',
        borderWidth: 1,
        padding: 15,
        marginVertical: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        justifyContent: 'space-around'
    }
})

export default GamesScreen