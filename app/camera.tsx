import { CameraType, CameraView, useCameraPermissions } from 'expo-camera';
import { useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

export default function App() {
  const [facing, setFacing] = useState<CameraType>('front');
  const [permission, requestPermission] = useCameraPermissions();

  if (!permission) {
    return <View />;
  }

  if (!permission.granted) {
    return (
      <View style={styles.container}>
        <Text style={styles.message}>
          We need your permission to show the camera
        </Text>
        <TouchableOpacity onPress={requestPermission} style={styles.permissionBtn}>
          <Text style={{ color: 'white', fontWeight: '600' }}>Grant Permission</Text>
        </TouchableOpacity>
      </View>
    );
  }

  function toggleCameraFacing() {
    setFacing((current) => (current === 'back' ? 'front' : 'back'));
  }

  return (
    <View style={styles.container}>
      <CameraView style={styles.camera} facing={facing} />
      <TouchableOpacity style={styles.flipButton} onPress={toggleCameraFacing}>
        <Ionicons name="camera-reverse-outline" size={28} color="white" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  message: {
    textAlign: 'center',
    paddingBottom: 10,
    color: 'white',
  },
  permissionBtn: {
    backgroundColor: '#F7A826',
    padding: 12,
    borderRadius: 8,
    alignItems: 'center',
    marginTop: 10,
  },
  camera: {
    flex: 1,
  },
  flipButton: {
    position: 'absolute',
    bottom: 60,
    right: 20,
    backgroundColor: 'rgba(0,0,0,0.6)',
    padding: 14,
    borderRadius: 35,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
