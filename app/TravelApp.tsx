// TravelApp.tsx
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ImageBackground,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';

const { width, height } = Dimensions.get('window');

interface Trip {
  name: string;
  active: boolean;
}

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  tags: string[];
}

const TravelApp: React.FC = () => {
  const [username, setUsername] = useState<string>('Shivankar');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedTrip, setSelectedTrip] = useState<string>(''); // ✅ Start empty
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>([]);

  // Background image from Unsplash
  const backgroundImage =
    'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=800&q=80';

  const recentTrips: Trip[] = [
    { name: 'Ujjain', active: false },
    { name: 'Varanasi', active: false },
    { name: 'Jaipur', active: false },
    { name: 'Agra', active: false },
  ];

  // ✅ Fixed image URLs with stable Unsplash links
  const allDestinations: Destination[] = [
    {
      id: '1',
      name: 'Hawa Mahal',
      location: 'Jaipur',
      image:
        'https://images.unsplash.com/photo-1603262110263-fb0112e7cc33?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['palace', 'historical', 'pink city', 'jaipur'],
    },
    {
      id: '2',
      name: 'Ganga Aarti',
      location: 'Varanasi',
      image:
        'https://images.unsplash.com/photo-1585496308895-716bead11173?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['religious', 'river', 'ceremony', 'varanasi', 'kashi'],
    },
    {
      id: '3',
      name: 'Taj Mahal',
      location: 'Agra',
      image:
        'https://images.unsplash.com/photo-1564507592333-c60657eea523?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['monument', 'historical', 'wonder', 'agra'],
    },
    {
      id: '4',
      name: 'Mahakaleshwar Temple',
      location: 'Ujjain',
      image:
        'https://images.unsplash.com/photo-1599665877270-6c920b64a9a1?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['temple', 'religious', 'shiva', 'ujjain'],
    },
    {
      id: '5',
      name: 'Amber Fort',
      location: 'Jaipur',
      image:
        'https://images.unsplash.com/photo-1587318224017-4bb04d0f6422?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['fort', 'historical', 'jaipur'],
    },
    {
      id: '6',
      name: 'Kashi Vishwanath Temple',
      location: 'Varanasi',
      image:
        'https://images.unsplash.com/photo-1625642225340-b21a2b5fef8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
      tags: ['temple', 'religious', 'shiva', 'varanasi', 'kashi'],
    },
  ];

  // ✅ Single filtering effect
  useEffect(() => {
    let results = [...allDestinations];

    if (selectedTrip && selectedTrip !== '') {
      results = results.filter(
        (dest) =>
          dest.location.toLowerCase() === selectedTrip.toLowerCase() ||
          dest.tags.some((tag) => tag.toLowerCase() === selectedTrip.toLowerCase())
      );
    }

    if (searchQuery && searchQuery.trim() !== '') {
      const query = searchQuery.toLowerCase().trim();
      results = results.filter(
        (dest) =>
          dest.name.toLowerCase().includes(query) ||
          dest.location.toLowerCase().includes(query) ||
          dest.tags.some((tag) => tag.toLowerCase().includes(query))
      );
    }

    setFilteredDestinations(results);
  }, [selectedTrip, searchQuery]);

  const handleTripSelect = (tripName: string) => {
    setSelectedTrip(selectedTrip === tripName ? '' : tripName);
    setSearchQuery('');
  };

  const clearAll = () => {
    setSearchQuery('');
    setSelectedTrip('');
  };

  return (
    <ImageBackground
      source={{ uri: backgroundImage }}
      style={styles.backgroundImage}
      resizeMode="cover"
    >
      <View style={styles.overlay}>
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent />
        <ScrollView style={styles.scrollView} showsVerticalScrollIndicator={false}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerContent}>
              <View>
                <Text style={styles.greeting}>Hello, {username}</Text>
                <Text style={styles.subGreeting}>Welcome to Travel&Tourism</Text>
              </View>
              <TouchableOpacity style={styles.avatarContainer}>
                <View style={styles.avatar} />
              </TouchableOpacity>
            </View>

            {/* Search Bar */}
            <View style={styles.searchContainer}>
              <View style={styles.searchBar}>
                <Text style={styles.searchIcon}>🔍</Text>
                <TextInput
                  style={styles.searchInput}
                  placeholder="Search destinations, locations..."
                  placeholderTextColor="#9ca3af"
                  value={searchQuery}
                  onChangeText={setSearchQuery}
                />
                {(searchQuery || selectedTrip) && (
                  <TouchableOpacity style={styles.clearButton} onPress={clearAll}>
                    <Text style={styles.clearIcon}>✕</Text>
                  </TouchableOpacity>
                )}
              </View>
            </View>

            {/* Recent Trips */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>Your Recent trips</Text>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                style={styles.tripsContainer}
              >
                {recentTrips.map((trip, index) => (
                  <TouchableOpacity
                    key={`${trip.name}-${index}`}
                    onPress={() => handleTripSelect(trip.name)}
                    style={[
                      styles.tripButton,
                      trip.name === selectedTrip ? styles.activeTrip : styles.inactiveTrip,
                    ]}
                  >
                    <Text
                      style={[
                        styles.tripText,
                        trip.name === selectedTrip
                          ? styles.activeTripText
                          : styles.inactiveTripText,
                      ]}
                    >
                      {trip.name}
                    </Text>
                  </TouchableOpacity>
                ))}
              </ScrollView>
            </View>

            {/* Featured Destinations */}
            <View style={styles.section}>
              <Text style={styles.sectionTitle}>
                {searchQuery
                  ? `Search Results for "${searchQuery}"`
                  : selectedTrip
                  ? `Destinations in ${selectedTrip}`
                  : 'Featured Destinations'}
              </Text>

              {filteredDestinations.length === 0 ? (
                <View style={styles.noResultsContainer}>
                  <Text style={styles.noResultsEmoji}>🏛️</Text>
                  <Text style={styles.noResultsText}>No destinations found</Text>
                  <Text style={styles.noResultsSubText}>
                    Try adjusting your search or filters
                  </Text>
                  <TouchableOpacity style={styles.resetButton} onPress={clearAll}>
                    <Text style={styles.resetButtonText}>Clear Filters</Text>
                  </TouchableOpacity>
                </View>
              ) : (
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  style={styles.destinationsContainer}
                >
                  {filteredDestinations.map((destination) => (
                    <TouchableOpacity key={destination.id} style={styles.destinationCard}>
                      <Image
                        source={{ uri: destination.image }}
                        style={styles.destinationImage}
                        resizeMode="cover"
                      />
                      <View style={styles.imageOverlay} />
                      <View style={styles.destinationInfo}>
                        <Text style={styles.destinationName}>{destination.name}</Text>
                        <View style={styles.locationContainer}>
                          <Text style={styles.locationPin}>📍</Text>
                          <Text style={styles.locationText}>{destination.location}</Text>
                        </View>
                      </View>
                      <TouchableOpacity style={styles.favoriteButton}>
                        <Text style={styles.heartIcon}>❤️</Text>
                      </TouchableOpacity>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              )}
            </View>
          </View>
        </ScrollView>
      </View>
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  backgroundImage: { flex: 1, width: '100%', height: '100%' },
  overlay: { flex: 1, backgroundColor: 'rgba(0, 0, 0, 0.3)' },
  scrollView: { flex: 1 },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
    backgroundColor: 'rgba(59, 130, 246, 0.85)',
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 32,
  },
  greeting: { fontSize: 24, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  subGreeting: { fontSize: 14, color: 'rgba(255, 255, 255, 0.9)' },
  avatarContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  avatar: { width: 32, height: 32, borderRadius: 16, backgroundColor: '#f97316' },
  searchContainer: { marginBottom: 32 },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 25,
    paddingHorizontal: 16,
    paddingVertical: 12,
    elevation: 2,
  },
  searchIcon: { fontSize: 20, color: '#9ca3af', marginRight: 12 },
  searchInput: { flex: 1, fontSize: 16, color: '#374151', paddingVertical: 4 },
  clearButton: {
    backgroundColor: '#ef4444',
    borderRadius: 15,
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    marginLeft: 8,
  },
  clearIcon: { color: 'white', fontSize: 14, fontWeight: 'bold' },
  section: {
    marginBottom: 32,
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderRadius: 16,
    padding: 16,
    elevation: 2,
  },
  sectionTitle: { fontSize: 18, fontWeight: '600', color: '#1f2937', marginBottom: 16 },
  tripsContainer: { paddingBottom: 8 },
  tripButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 25,
    marginRight: 12,
    elevation: 1,
  },
  activeTrip: { backgroundColor: '#1f2937' },
  inactiveTrip: { backgroundColor: '#f3f4f6' },
  tripText: { fontSize: 14, fontWeight: '500' },
  activeTripText: { color: 'white' },
  inactiveTripText: { color: '#374151' },
  destinationsContainer: { paddingBottom: 16 },
  destinationCard: {
    width: 280,
    height: 350,
    borderRadius: 16,
    marginRight: 16,
    overflow: 'hidden',
    position: 'relative',
    backgroundColor: '#e5e7eb',
    elevation: 4,
  },
  destinationImage: { width: '100%', height: '100%' },
  imageOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  destinationInfo: { position: 'absolute', bottom: 20, left: 20, right: 20 },
  destinationName: { fontSize: 18, fontWeight: 'bold', color: 'white', marginBottom: 4 },
  locationContainer: { flexDirection: 'row', alignItems: 'center' },
  locationPin: { fontSize: 12, marginRight: 4 },
  locationText: { fontSize: 14, color: 'rgba(255, 255, 255, 0.9)' },
  favoriteButton: {
    position: 'absolute',
    top: 16,
    right: 16,
    width: 36,
    height: 36,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  heartIcon: { fontSize: 16 },
  noResultsContainer: {
    height: 250,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  noResultsEmoji: { fontSize: 48, marginBottom: 16 },
  noResultsText: { fontSize: 18, fontWeight: '600', color: '#374151', marginBottom: 8 },
  noResultsSubText: { fontSize: 14, color: '#6b7280', marginBottom: 20 },
  resetButton: {
    backgroundColor: '#3b82f6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
  },
  resetButtonText: { color: 'white', fontSize: 14, fontWeight: '500' },
});

export default TravelApp;
