import React,{useEffect, useState} from 'react';
import { View, TouchableOpacity,Button, Text, ActivityIndicator } from 'react-native';
import axios from 'axios';
import { FontAwesome } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system';


function ClassifyScreen({ route }) {
  const audioFileUri  = route.params.uri;
  const [audioFile, setAudioFile] = useState(null);
  const [labels,setLabels] = useState(false);
  const [loading,setLoading] = useState(false);

  useEffect(()=>{
    console.log("uri:",route.params.uri)
    pickFile();
  },[])

  const pickFile = async () => {
    try {
      const file = await FileSystem.getContentUriAsync(route.params.uri);
      console.log("file is ::",file)
  
      if (file) {
        const fileData = await FileSystem.readAsStringAsync(route.params.uri, {
          encoding: FileSystem.EncodingType.Base64,
        });
  
        setAudioFile({
          uri: route.params.uri,
          name: route.params.uri.substring(route.params.uri.lastIndexOf('/') + 1),
          data: fileData,
        });
      }
    } catch (error) {
      console.error('Error picking file:', error);
    }
  };

  const sendAudioFile = async () => {
    setLoading(true);
    if (audioFile) {
      try {
        const formData = new FormData();
        formData.append('audio', audioFile.data, audioFile.name);
        
        const response = await axios.post('http://192.168.10.3:5000/upload-audio', audioFile);
        console.log('Audio file sent successfully:', response.data);
        setLabels(JSON.parse(response.data.labels));

      } catch (error) {
        console.error('Error sending audio file:', error);
      }
    }
    setLoading(false);
  };
  

  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      {audioFile && (
        <View>
          <Text>Selected File: {audioFile.name}</Text>
         {loading? (
        <View style={{ marginTop: 20 }}>
          <ActivityIndicator size="large" color="#0000ff" />
        </View>
      ):<Button title="Send File" onPress={sendAudioFile} />} 
        </View>
      )}
      {labels && (
        <View style={{ marginTop: 20 }}>
          <Text>Labels: {labels}</Text>
        </View>
      )}
    </View>)
}

export default ClassifyScreen;
