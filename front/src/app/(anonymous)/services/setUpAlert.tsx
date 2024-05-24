import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    StyleSheet,
    Dimensions,
    TouchableOpacity,
    Modal,
    TextInput,
    Button,
} from 'react-native';

const screenWidth = Dimensions.get('window').width;
const cardWidth = screenWidth * 0.9;
const messageFontSize = screenWidth < 400 ? 16 : 20;
const BigMessageFontSize = screenWidth < 400 ? 18 : 24;
const MonthlyFontSize = screenWidth < 400 ? 20 : 30;
const DailyFontSize = screenWidth < 400 ? 10 : 20;

export default function SetUpAlert({ balance, full_name }) {
    const [threshold, setThreshold] = useState(0);
    const [isExceedingThreshold, setIsExceedingThreshold] = useState(false);
    const [modalVisible, setModalVisible] = useState(false);
    const [newThreshold, setNewThreshold] = useState(threshold.toString() || '0');

    useEffect(() => {
        checkThresholdExceeded();
    }, [balance, threshold]);

    const checkThresholdExceeded = () => {
        setIsExceedingThreshold(balance > threshold);
    };

    const handleThresholdUpdate = () => {
        const newThresholdValue = parseFloat(newThreshold);
        if (!isNaN(newThresholdValue)) {
            setThreshold(newThresholdValue);
            setModalVisible(false);
        } else {
            console.log('Invalid input for threshold');
        }
    };

    return (
        <View style={styles.container}>
            <View style={[styles.balanceContainer, { backgroundColor: isExceedingThreshold ? '#FF0000' : '#ffffff' }]}>
                <Text style={styles.message}>Welcome {full_name}</Text>
                <Text style={styles.BigMessage}>Current Monthly Carbon Footprint</Text>
                <Text style={styles.Monthly}>{balance} kg CO2</Text>
                <Text style={styles.Daily}>Today : {balance} kg CO2</Text>
                <Text style={styles.Threshold}>Threshold : {threshold} kg CO2</Text>
            </View>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
                <Text style={styles.updateButton}>Update Threshold</Text>
            </TouchableOpacity>
            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    setModalVisible(false);
                }}
            >
                <View style={styles.modalView}>
                    <Text style={styles.modalTitle}>Update Threshold</Text>
                    <TextInput
                        style={styles.input}
                        onChangeText={text => setNewThreshold(text)}
                        value={newThreshold.toString()}
                        keyboardType="numeric"
                    />
                    <Button title="OK" onPress={handleThresholdUpdate} color="#4CAF50" />
                </View>
            </Modal>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    balanceContainer: {
        padding: 20,
        margin: 10,
        borderRadius: 10,
        width: cardWidth,
        height: 190,
    },
    message: {
        fontSize: messageFontSize,
        fontWeight: 'bold',
        textAlign: 'left'
    },
    BigMessage: {
        fontSize: BigMessageFontSize,
        textAlign: 'right',
        fontWeight: 'normal'
    },
    Monthly: {
        fontSize: MonthlyFontSize,
        textAlign: 'right',
        fontWeight: 'bold'
    },
    Daily: {
        fontSize: DailyFontSize,
        textAlign: 'right'
    },
    Threshold: {
        fontSize: DailyFontSize,
        textAlign: 'right',
        color: '#4CAF50',
    },
    updateButton: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#4CAF50',
        marginTop: 10,
    },
    modalView: {
        marginTop: 50,
        marginHorizontal: 20,
        backgroundColor: 'white',
        borderRadius: 20,
        padding: 35,
        alignItems: 'center',
    },
    modalTitle: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    input: {
        height: 40,
        width: 200,
        marginBottom: 20,
        borderBottomWidth: 1,
    },
});
