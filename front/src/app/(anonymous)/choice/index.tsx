import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Image, Animated, Modal } from 'react-native';
import { useRouter } from 'expo-router';
import icons from '@constants/icons';

const Index = () => {
    const router = useRouter();
    const scaleValue = new Animated.Value(1);
    const [selectedButton, setSelectedButton] = useState(null);

    const handleNavigate = (route) => {
        router.push(route);
    };

    const handlePressIn = () => {
        Animated.spring(scaleValue, {
            toValue: 0.9,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const handlePressOut = () => {
        Animated.spring(scaleValue, {
            toValue: 1,
            friction: 3,
            tension: 40,
            useNativeDriver: true,
        }).start();
    };

    const handleInfoClick = (index) => {
        setSelectedButton(index);
    };

    const buttons = [
        {
            route: '/manual/car',
            label: 'Destination',
            icon: icons.destination,
            comment: 'Cette section vous permet de calculer l\'empreinte carbone de vos trajets en voiture. Indiquez simplement le début et la fin de votre trajet ainsi que le type de voiture utilisé. Connaître l\'empreinte carbone de vos déplacements peut vous aider à réduire votre impact environnemental. En moyenne, un Français émet environ 1,9 tonnes de CO2 par an en utilisant sa voiture.'
        },
        {
            route: '/manual',
            label: 'Food',
            icon: icons.food,
            comment: 'Cette section vous aide à estimer l\'empreinte carbone de vos aliments en entrant les différents ingrédients et leurs quantités respectives. Comprendre l\'impact environnemental de votre alimentation est essentiel pour adopter des habitudes plus durables. En moyenne, l\'empreinte carbone liée à l\'alimentation d\'un Français est d\'environ 2 tonnes de CO2 par an.'
        },
        {
            route: '/manual/clothes',
            label: 'Clothes',
            icon: icons.clothes,
            comment: 'Dans cette section, vous pouvez calculer l\'empreinte carbone de vos vêtements en renseignant leur provenance, leur taille et leur texture. La connaissance de l\'impact environnemental de vos achats de vêtements peut vous aider à faire des choix plus durables. En moyenne, l\'empreinte carbone des vêtements d\'un Français est d\'environ 0,5 tonnes de CO2 par an.'
        },
    ];


    return (
        <View style={styles.container}>
            <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
                <Image source={icons.eco} style={[styles.backIcon, { width: 100, height: 100 }]}/>
            </TouchableOpacity>
            <Text style={styles.title}>Manual entries</Text>
            {buttons.map((button, index) => (
                <Animated.View key={index} style={{ transform: [{ scale: scaleValue }] }}>
                    <View style={styles.buttonWrapper}>
                        <TouchableOpacity
                            style={styles.button}
                            onPress={() => handleNavigate(button.route)}
                            onPressIn={handlePressIn}
                            onPressOut={handlePressOut}
                        >
                            <View style={styles.buttonContent}>
                                <Image source={button.icon} style={styles.icon} />
                                <Text style={styles.buttonText}>{button.label}</Text>
                                <TouchableOpacity onPress={() => handleInfoClick(index)} style={styles.infoButton}>
                                    <Text style={styles.infoText}>?</Text>
                                </TouchableOpacity>
                            </View>
                        </TouchableOpacity>
                    </View>
                </Animated.View>
            ))}
            {selectedButton !== null && (
                <Modal
                    transparent={true}
                    animationType="slide"
                    visible={selectedButton !== null}
                    onRequestClose={() => setSelectedButton(null)}
                >
                    <View style={styles.modalContainer}>
                        <View style={styles.commentContainer}>
                            <Text style={styles.commentText}>{buttons[selectedButton].comment}</Text>
                            <TouchableOpacity onPress={() => setSelectedButton(null)} style={styles.closeButton}>
                                <Text style={styles.closeButtonText}>Close</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                </Modal>
            )}
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f7f7f7',
        padding: 20,
        justifyContent: 'center',
    },
    backButton: {
        position: 'absolute',
        top: 40,
        left: 20,
    },
    backIcon: {
        width: 30,
        height: 30,
        resizeMode: 'contain',
    },
    title: {
        fontSize: 26,
        fontWeight: '600',
        marginBottom: 40,
        color: '#4CAF50',
        textAlign: 'center',
    },
    buttonWrapper: {
        marginBottom: 20,
    },
    button: {
        backgroundColor: '#4CAF50',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 15,
        paddingHorizontal: 20,
        width: '100%',
    },
    buttonContent: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        width: 24,
        height: 24,
        resizeMode: 'contain',
        marginRight: 10,
    },
    buttonText: {
        fontSize: 16,
        color: '#fff',
        fontWeight: '500',
        flex: 1,
    },
    infoButton: {
        backgroundColor: '#FF1708',
        width: 24,
        height: 24,
        borderRadius: 12,
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 10,
    },
    infoText: {
        color: '#fff',
        fontSize: 14,
        fontWeight: 'bold',
    },
    modalContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
    },
    commentContainer: {
        backgroundColor: '#fff',
        padding: 20,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
        height: '50%',
    },
    commentText: {
        fontSize: 16,
        color: '#333',
        marginBottom: 20,
    },
    closeButton: {
        alignSelf: 'center',
        backgroundColor: '#4CAF50',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
    },
    closeButtonText: {
        color: '#fff',
        fontSize: 16,
        fontWeight: '500',
    },
});

export default Index;
