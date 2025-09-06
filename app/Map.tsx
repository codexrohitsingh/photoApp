import * as Location from 'expo-location';
import React, { useEffect, useState } from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { WebView } from 'react-native-webview';

const Map = () => {
  const [location, setLocation] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let location = await Location.getCurrentPositionAsync({});
        setLocation(location);
      }
    })();
  }, []);

  const lat = location?.coords.latitude || 37.78825;
  const lng = location?.coords.longitude || -122.4324;

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
        <script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"></script>
        <style>
            body { margin: 0; padding: 0; }
            #map { height: 100vh; width: 100vw; }
        </style>
    </head>
    <body>
        <div id="map"></div>
        <script>
            // Initialize the map
            var map = L.map('map').setView([${lat}, ${lng}], 13);

            // Add OpenStreetMap tiles
            L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
                maxZoom: 19,
                attribution: '© OpenStreetMap contributors'
            }).addTo(map);

            // Add a marker for current location
            var marker = L.marker([${lat}, ${lng}]).addTo(map)
                .bindPopup('Your Location')
                .openPopup();

            // Add click event to add markers
            map.on('click', function(e) {
                L.marker([e.latlng.lat, e.latlng.lng]).addTo(map)
                    .bindPopup('Clicked at ' + e.latlng.lat + ', ' + e.latlng.lng);
            });

            // Function to communicate with React Native
            function sendLocationToRN(lat, lng) {
                window.ReactNativeWebView.postMessage(JSON.stringify({
                    type: 'location',
                    latitude: lat,
                    longitude: lng
                }));
            }

            // Example: Send location on map click
            map.on('click', function(e) {
                sendLocationToRN(e.latlng.lat, e.latlng.lng);
            });
        </script>
    </body>
    </html>
  `;

  const handleWebViewMessage = (event) => {
    try {
      const data = JSON.parse(event.nativeEvent.data);
      if (data.type === 'location') {
        console.log('Clicked location:', data.latitude, data.longitude);
        // Handle the location data here
      }
    } catch (error) {
      console.error('Error parsing WebView message:', error);
    }
  };

  return (
    <View style={styles.container}>
      <WebView
        source={{ html: htmlContent }}
        style={styles.webview}
        onMessage={handleWebViewMessage}
        javaScriptEnabled={true}
        domStorageEnabled={true}
        startInLoadingState={true}
        scalesPageToFit={true}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  webview: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default Map;