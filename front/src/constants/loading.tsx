import React from 'react';
import { View, ActivityIndicator } from 'react-native';
import styles from '@/styles/loading';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

export default LoadingScreen;