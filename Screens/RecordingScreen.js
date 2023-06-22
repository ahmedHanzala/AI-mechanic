import React, { useState, useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { Audio } from 'expo-av';
import { FontAwesome } from '@expo/vector-icons';
import * as Permissions from 'expo-permissions';
import { useNavigation } from '@react-navigation/native';
import * as FileSystem from 'expo-file-system';
import * as Animatable from 'react-native-animatable';
import LottieView from 'lottie-react-native';

const RecordingScreen = () => {
  const navigation = useNavigation();
  const [isRecording, setIsRecording] = useState(false);
  const [recording, setRecording] = useState(null);
  const [timer, setTimer] = useState(0);
  const lottieAnimationRef = useRef(null);

  useEffect(() => {
    // Clean up resources when the component unmounts
    requestAudioPermission();
    return () => {
      if (recording) {
        recording.stopAndUnloadAsync();
      }
    };
  }, []);

  const navigateToDashboard = async (newSound) => {
    const fileName = 'recorded_audio.mp3';
    const uri = FileSystem.documentDirectory + fileName;

    console.log("uri turns out to be:", uri);
    navigation.navigate('Dashboard', { newSound, uri });
  };

  const requestAudioPermission = async () => {
    const { status } = await Permissions.askAsync(Permissions.AUDIO_RECORDING);
    if (status !== 'granted') {
      console.log('Permission denied for audio recording');
    }
  };

  const handleRecordButtonPress = async () => {
    if (isRecording) {
      // Stop recording
      setIsRecording(false);
      if (recording) {
        await recording.stopAndUnloadAsync();
        const url = recording.getURI();
        const { sound: newSound } = await recording.createNewLoadedSoundAsync();
        await saveRecording(url);
        navigateToDashboard(newSound);
      }
    } else {
      // Start recording
      setIsRecording(true);
      const recordingObject = new Audio.Recording();
      try {
        await recordingObject.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
        await recordingObject.startAsync();
        setRecording(recordingObject);
        setTimer(0); // Reset the timer when recording starts
        setInterval(() => {
          setTimer((prevTimer) => prevTimer + 1);
        }, 1000);
      } catch (error) {
        console.error('Failed to start recording', error);
      }
    }
  };

  const saveRecording = async (uri) => {
    try {
      const fileName = 'recorded_audio.mp3';
      const destPath = FileSystem.documentDirectory + fileName;

      await FileSystem.moveAsync({
        from: uri,
        to: destPath,
      });

      console.log('Recording saved:', destPath);
    } catch (error) {
      console.error('Failed to save recording', error);
    }
  };

  const formatTimer = (timer) => {
    const minutes = Math.floor(timer / 60);
    const seconds = timer % 60;

    const formattedMinutes = String(minutes).padStart(2, '0');
    const formattedSeconds = String(seconds).padStart(2, '0');

    return `${formattedMinutes}:${formattedSeconds}`;
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={handleRecordButtonPress}>
        <Animatable.View
          style={[
            styles.recordButtonContainer,
            isRecording && styles.recordButtonRecording,
          ]}
          animation="bounceIn"
          duration={300}
        >
          <FontAwesome name={isRecording ? 'microphone' : 'microphone-slash'} size={80} color="white" />
        </Animatable.View>
      </TouchableOpacity>
      <Text style={styles.label}>{isRecording ? 'Recording...' : 'Tap to Record'}</Text>
      <Text style={styles.timer}>{formatTimer(timer)}</Text>
      {/* {isRecording && (
        <LottieView
          ref={lottieAnimationRef}
          style={styles.animationContainer}
          source={require('../assets/animation.json')}
          autoPlay
          loop={false}
        />
      )} */}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
  },
  recordButtonContainer: {
    backgroundColor: 'red',
    borderRadius: 100,
    padding: 20,
    elevation: 5,
  },
  recordButtonRecording: {
    backgroundColor: 'gray',
  },
  label: {
    fontSize: 18,
    marginTop: 20,
  },
  timer: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 20,
  },
  animationContainer: {
    position: 'absolute',
    width: '100%',
    height: '100%',
    top: 0,
    left: 0,
    backgroundColor: 'transparent',
  },
});

export default RecordingScreen;
