import { router } from "expo-router";
<<<<<<< HEAD
import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
=======
import { StyleSheet, View } from "react-native";
>>>>>>> 7e300973d18934d8906b7881d298dfffae96b7cb
import TravelLoginScreen from "./TravelLoginScreen";

// Initialize MapLibre (no API key needed!)
// MapLibreGL.setAccessToken(null);

export default function Index() {
  const [showSplash, setShowSplash] = useState(true);
  const scaleAnim = useRef(new Animated.Value(1)).current;
  
  useEffect(() => {
    // Start zoom animation
    Animated.timing(scaleAnim, {
      toValue: 1.3,
      duration: 7000,
      useNativeDriver: true,
    }).start();
    
    // Hide splash screen after 7 seconds
    const timer = setTimeout(() => {
      setShowSplash(false);
    }, 7000);
    
    return () => clearTimeout(timer);
  }, []);
  
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
 
  if (showSplash) {
    return (
      <View style={styles.splashContainer}>
        <Animated.Image 
          source={require('../_components/assests/logo Raahi.jpeg')} 
          style={[styles.splashImage, { transform: [{ scale: scaleAnim }] }]}
          resizeMode="contain"
        />
      </View>
    );
  }
  
  return (
    <View style={styles.container}>
      <TravelLoginScreen/>
      {/* <OTP/> */}
      {/* <PlusPage /> */}
      
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
        {/* <View style={styles.bottomNav}>
                <TouchableOpacity style={styles.navItem} onPress={()=> <a href='#'></a>}>
                  <Icon name="home" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={()=>{
                  router.push("/Map")
                }}>
                  <Icon name="map-marker" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem} onPress={()=>{
                  router.push("/imagePicker")
                }}>
                  <Icon name="plus" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                  <Icon name="heart-o" size={20} color="#fff" />
                </TouchableOpacity>
                <TouchableOpacity style={styles.navItem}>
                  <Image
                    source={{ uri: 'https://i.pravatar.cc/100' }}
                    style={styles.navProfilePic}
                  />
                </TouchableOpacity>
              </View> */}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  splashContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ffffff',
  },
  splashImage: {
    width: 250,
    height: 250,
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
  },
    bottomNav: {
    position: 'absolute',
    bottom: 30,
    left: 20,
    right: 20,
    backgroundColor: '#2B4C6F',
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingVertical: 15,
    borderRadius: 30,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
   navItem: {
    alignItems: 'center',
    justifyContent: 'center',
  },
    navProfilePic: {
    width: 28,
    height: 28,
    borderRadius: 14,
    borderWidth: 2,
    borderColor: '#fff',
  },
});
