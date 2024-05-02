import React from 'react';
import { View, StyleSheet, ActivityIndicator } from 'react-native';

const LoadingScreen = () => {
  return (
    <View style={styles.container}>
        <ActivityIndicator size="large" color="#007bff" />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
  },
});

export default LoadingScreen;
