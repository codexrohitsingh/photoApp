import { router } from 'expo-router';
import React, { useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

// Import local background image (add your image to the project)
const backgroundImage = require('../_components/assests/background.jpg');

// Import local icons
const iconPerson = require('../_components/assests/user.png');
const iconEmail = require('../_components/assests/email.png'); // Changed from phone to email icon
const iconArrow = require('../_components/assests/arrow.png');
const iconGoogle = require('../_components/assests/google.png');
const iconTwitter = require('../_components/assests/twitter.png');
const iconInstagram = require('../_components/assests/instagram.png');

export default function TravelLoginScreen() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState(''); // Changed from phone to email

  const handleGetStarted = () => {
    // Handle login logic here
    console.log('Name:', name, 'Email:', email);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" />
      <ImageBackground
        source={backgroundImage} // Using local image
        style={styles.background}
        resizeMode="cover" // Ensures the image covers the entire screen
      >
        <View style={styles.overlay} />
        <ScrollView contentContainerStyle={styles.scrollContent}>
          <View style={styles.content}>
            <Text style={styles.title}>Travel & Tourism</Text>
            <Text style={styles.subtitle}>Explore the world with us</Text>

            <View style={styles.inputContainer}>
              <View style={styles.inputWrapper}>
                <Image source={iconPerson} style={styles.inputIcon} />
                <TextInput
                  placeholder="Enter your name"
                  placeholderTextColor="#666"
                  style={styles.input}
                  value={name}
                  onChangeText={setName}
                  autoCapitalize="words"
                />
              </View>
              
              <View style={styles.inputWrapper}>
                <Image source={iconEmail} style={styles.inputIcon} />
                <TextInput
                  placeholder="Email address"
                  placeholderTextColor="#666"
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                  value={email}
                  onChangeText={setEmail}
                />
              </View>
            </View>

            <TouchableOpacity style={styles.button}>
              <TouchableOpacity onPress={()=>{
                router.push("/OTP")
              }}>
              <Text style={styles.buttonText}>Get Started</Text>

              </TouchableOpacity>
              <Image source={iconArrow} style={styles.buttonIcon} />
            </TouchableOpacity>

            <View style={styles.elegantDivider}>
              <View style={styles.dividerLine} />
              <Text style={styles.elegantOrText}>or continue with</Text>
              <View style={styles.dividerLine} />
            </View>

            <View style={styles.socialContainer}>
              <TouchableOpacity style={styles.socialButton}>
                <Image source={iconGoogle} style={styles.socialIcon} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <Image source={iconTwitter} style={styles.socialIcon} />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.socialButton}>
                <Image source={iconInstagram} style={styles.socialIcon} />
              </TouchableOpacity>
            </View>
            
            <Text style={styles.footer}>
              By continuing, you agree to our Terms of Service and Privacy Policy
            </Text>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  );
}

// Get screen dimensions
const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: width,
    height: height,
  },
  background: {
    flex: 1,
    width: width,
    height: height,
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: 'rgba(0,0,0,0.4)', // Adjust opacity as needed
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'center',
  },
  content: {
    padding: 20,
    alignItems: 'center',
  },
  title: {
    fontSize: 38,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 10,
    fontFamily: Platform.OS === 'ios' ? 'Snell Roundhand' : 'cursive',
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 2, height: 2 },
    textShadowRadius: 10,
    letterSpacing: 1.5,
  },
  subtitle: {
    fontSize: 16,
    color: '#fff',
    marginBottom: 40,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    fontStyle: 'italic',
  },
  inputContainer: {
    width: '100%',
    maxWidth: 350,
    marginBottom: 20,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    borderRadius: 10,
    marginVertical: 10,
    paddingHorizontal: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  inputIcon: {
    width: 20,
    height: 20,
    marginRight: 10,
    tintColor: '#666',
  },
  input: {
    flex: 1,
    paddingVertical: 15,
    fontSize: 16,
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#FF8C00',
    padding: 16,
    borderRadius: 10,
    width: '100%',
    maxWidth: 350,
    marginVertical: 15,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
    marginRight: 10,
  },
  buttonIcon: {
    width: 20,
    height: 20,
    tintColor: '#fff',
  },
  elegantDivider: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    maxWidth: 350,
    marginVertical: 20,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
  },
  elegantOrText: {
    fontSize: 14,
    color: '#fff',
    marginHorizontal: 10,
    fontStyle: 'italic',
    letterSpacing: 1,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
  },
  socialContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
    maxWidth: 250,
    marginBottom: 30,
  },
  socialButton: {
    width: 50,
    height: 50,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  socialIcon: {
    width: 24,
    height: 24,
  },
  footer: {
    fontSize: 12,
    color: '#fff',
    textAlign: 'center',
    marginHorizontal: 20,
    textShadowColor: 'rgba(0, 0, 0, 0.75)',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 5,
    lineHeight: 18,
  },
});