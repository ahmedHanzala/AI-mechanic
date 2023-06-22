import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Picker } from '@react-native-picker/picker';

const AnnotateScreen = () => {
  const [audioSource, setAudioSource] = useState('');
  const [vehicleType, setVehicleType] = useState('');
  const [state, setState] = useState('');

  const handleSubmit = () => {
    // You can perform the necessary actions with the selected values here
    console.log('Selected Audio Source:', audioSource);
    console.log('Selected Vehicle Type:', vehicleType);
    console.log('Selected State:', state);
  };

  return (
    <View style={styles.container}>
      <View style={styles.formItem}>
        <Text style={styles.label}>Audio Source</Text>
        <Picker
          selectedValue={audioSource}
          onValueChange={(itemValue) => setAudioSource(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Vehicle" value="Vehicle" />
          <Picker.Item label="Not a Vehicle" value="Not a Vehicle" />
        </Picker>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>Vehicle Type</Text>
        <Picker
          selectedValue={vehicleType}
          onValueChange={(itemValue) => setVehicleType(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Water Vehicle" value="Water Vehicle" />
          <Picker.Item label="Air Vehicle" value="Air Vehicle" />
          <Picker.Item label="Road Vehicle" value="Road Vehicle" />
          <Picker.Item label="Rail Vehicle" value="Rail Vehicle" />
        </Picker>
      </View>
      <View style={styles.formItem}>
        <Text style={styles.label}>State</Text>
        <Picker
          selectedValue={state}
          onValueChange={(itemValue) => setState(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Accelerating" value="Accelerating" />
          <Picker.Item label="Idling" value="Idling" />
          <Picker.Item label="Knocking" value="Knocking" />
          <Picker.Item label="Misfire" value="Misfire" />
          <Picker.Item label="Starting" value="Starting" />
        </Picker>
      </View>
      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Submit</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  formItem: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  picker: {
    width: 200,
    height: 40,
    backgroundColor: '#F3F3F3',
    borderRadius: 5,
  },
  submitButton: {
    backgroundColor: '#3498DB',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default AnnotateScreen;
