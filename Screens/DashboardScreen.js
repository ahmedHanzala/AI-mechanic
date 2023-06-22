import React, { useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';


function DashboardScreen({route,navigation}) {
  // const sound = useSelector((state) => state.record.audio_uri);
  const sound = route.params.newSound;
  const [audioPlaying, setAudioPlaying] = React.useState(false);
  const [played, setPlayed] = React.useState(0);
  useEffect(() => {
    console.log('recieved :',route.params.uri);
    if (sound) {
      const updatePlaybackStatus = async (status) => {
        if (status.didJustFinish) {
          // Audio playback finished
          setAudioPlaying(false);
          //await sound.setPositionAsync(0); // Reset position to the beginning

        }
      };
  
      sound.setOnPlaybackStatusUpdate(updatePlaybackStatus);
    }
  
    return sound ? () => {
          console.log('Unloading Sound');
          sound.unloadAsync();
        }
      : undefined;
  }, []);


  const handlePlayButtonPress = async () => {
    try {
      if (sound) {
        if (audioPlaying) {
          await sound.pauseAsync();
          setAudioPlaying(false);
        }
       else {
        if(played !== 0){
          await sound.setPositionAsync(0);
        }
          await sound.playAsync({ isLooping: false });
          setPlayed(played + 1);
          setAudioPlaying(true);
        }
      }
    } catch (error) {
      console.log('Error occurred during playback:', error);
    }
  };

  const handlePauseButtonPress = async () => {
    try {
      if (sound) {
        await sound.pauseAsync();
        setAudioPlaying(false);
      }
    } catch (error) {
      console.log('Error occurred during pause:', error);
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.cardContainer}>
        <TouchableOpacity 
        style={[styles.card, { backgroundColor: '#FADBD8' }]}
        onPress={audioPlaying? handlePauseButtonPress:handlePlayButtonPress}>
          {audioPlaying? <FontAwesome name="pause" size={40} color="#E74C3C" />: <FontAwesome name="play" size={40} color="#E74C3C" />}
          {audioPlaying? <Text style={styles.cardText}>Pause Audio</Text> : <Text style={styles.cardText}>Play Audio</Text>}
        </TouchableOpacity>
        <TouchableOpacity
        onPress={navigation.goBack}
         style={[styles.card, { backgroundColor: '#D4E6F1' }]}>
          <FontAwesome name="microphone" size={40} color="#3498DB" />
          <Text style={styles.cardText}>Record Again</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.cardContainer}>
        <TouchableOpacity 
        onPress ={() => navigation.navigate('Classify',{uri: route.params.uri})}
        
        style={[styles.card, { backgroundColor: '#D5F5E3' }]}>
          <FontAwesome name="folder" size={40} color="#2ECC71" />
          <Text style={styles.cardText}>Classify</Text>
        </TouchableOpacity>
        <TouchableOpacity 
        onPress ={() => navigation.navigate('Annotate')}
        style={[styles.card, { backgroundColor: '#F9E79F' }]}>
          <FontAwesome name="edit" size={40} color="#F39C12" />
          <Text style={styles.cardText}>Annotate</Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity style={styles.helpButton}>
            <FontAwesome name="headphones" size={40} color="#1717" style={styles.icon} />
            <Text style={styles.helpText}>Help</Text>
        </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardContainer: {
    flexDirection: 'row',
    marginBottom: 20,
  },
  card: {
    width: 150,
    height: 150,
    borderRadius: 10,
    marginHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000000',
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 2,
  },
  cardText: {
    marginTop: 10,
    fontSize: 16,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  helpButton: {
    width: '90%',
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    borderWidth: 2,
    borderColor: '#DDDDDD',
    borderRadius: 15,
    paddingVertical: 10,
    paddingHorizontal: 20,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    bottom: "2%",
  },
  icon: {
    marginRight: 10,
  },
  helpText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default DashboardScreen;
