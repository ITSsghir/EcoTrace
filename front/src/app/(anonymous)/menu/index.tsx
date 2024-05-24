import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const UserProfile = ({   onDeletePress, onUpdatePress, onEmailPress, onPhotoPress }) => {

  const username = "User123";  // Replace with actual username from context
  const email = "user123@fr.com";  // Replace with actual last login date from context

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
    backgroundColor: '#f8f9fa',
    padding: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333',
  },
  infoContainer: {
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    marginBottom: 20,
    width: '100%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 15,
    color: '#555',
  },
  button: {
    backgroundColor: '#4CAF50',
    paddingVertical: 12,
    paddingHorizontal: 20,
    borderRadius: 8,
    marginBottom: 15,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default UserProfile;
