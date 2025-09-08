import { router } from "expo-router";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import TravelLoginScreen from "./TravelLoginScreen";

// Initialize MapLibre (no API key needed!)
// MapLibreGL.setAccessToken(null);

export default function Index() {
  const OpenCamera = () => {
    router.push("/camera");
  };
  
  const SelectImage = () => {
    router.push("/imagePicker");
  };
  
  const LivePhoto = () => {
    router.push("/livePhoto");
  };
  
  const MapParJao = () => {
    router.push("/Map");
  };
 
  return (
    <View style={styles.container}>
      <TravelLoginScreen />
      
      {/* Navigation buttons - uncomment when needed */}
      {/* <View style={styles.navContainer}>
        <TouchableOpacity style={styles.navButton} onPress={OpenCamera}>
          <Text style={styles.navButtonText}>Open Camera</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={SelectImage}>
          <Text style={styles.navButtonText}>Select Image</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={LivePhoto}>
          <Text style={styles.navButtonText}>Click Photo</Text>
        </TouchableOpacity>
        
        <TouchableOpacity style={styles.navButton} onPress={MapParJao}>
          <Text style={styles.navButtonText}>Open Map</Text>
        </TouchableOpacity>
      </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  navContainer: {
    position: 'absolute',
    bottom: 20,
    left: 0,
    right: 0,
    flexDirection: 'row',
    justifyContent: 'space-around',
    paddingHorizontal: 20,
  },
  navButton: {
    backgroundColor: '#FF8C00',
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderRadius: 8,
  },
  navButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  }
});
