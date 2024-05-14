import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserProfile = ({ username, email, onDeletePress, onUpdatePress, onEmailPress, onPhotoPress }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>User Profile</Text>
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Username: {username}</Text>
        <TouchableOpacity onPress={onEmailPress}>
          <Text style={styles.infoText}>Email: {email}</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.button} onPress={onDeletePress}>
        <Text style={styles.buttonText}>Delete Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onUpdatePress}>
        <Text style={styles.buttonText}>Update Account</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.button} onPress={onPhotoPress}>
        <Text style={styles.buttonText}>Change Profile Photo</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 16,
    marginBottom: 10,
    color: '#007bff',
  },
  button: {
    backgroundColor: '#007bff',
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 5,
    marginBottom: 10,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
