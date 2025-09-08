// TravelApp.tsx
import React, { useEffect, useState } from 'react';
import {
  Dimensions,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import Icon from 'react-native-vector-icons/FontAwesome';

const { width } = Dimensions.get('window');

interface Destination {
  id: string;
  name: string;
  location: string;
  image: string;
  tags: string[];
}

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
    location: 'Kashi',
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
    location: 'Kashi',
    image:
      'https://images.unsplash.com/photo-1625642225340-b21a2b5fef8e?ixlib=rb-4.0.3&auto=format&fit=crop&w=800&q=80',
    tags: ['temple', 'religious', 'shiva', 'varanasi', 'kashi'],
  },
];

export default function TravelApp() {
  const [search, setSearch] = useState('');
  const [selectedTrip, setSelectedTrip] = useState<string>('');
  const [filteredDestinations, setFilteredDestinations] = useState<Destination[]>(allDestinations);

  useEffect(() => {
    if (search.trim().length > 0) {
      const results = allDestinations.filter(
        d =>
          d.name.toLowerCase().includes(search.toLowerCase()) ||
          d.location.toLowerCase().includes(search.toLowerCase()) ||
          d.tags.some(tag => tag.toLowerCase().includes(search.toLowerCase())),
      );
      setFilteredDestinations(results);
    } else if (selectedTrip) {
      const results = allDestinations.filter(d =>
        d.location.toLowerCase().includes(selectedTrip.toLowerCase()),
      );
      setFilteredDestinations(results);
    } else {
      setFilteredDestinations(allDestinations);
    }
  }, [search, selectedTrip]);

  const trips = ['Ujjain', 'Kashi', 'Jaipur', 'Agra'];

  const clearSelection = () => {
    setSelectedTrip('');
    setSearch('');
  };

  return (
    <View style={styles.container}>
      {/* Gradient Background */}
      <View style={styles.gradientBackground} />
      
      <SafeAreaView style={styles.safeArea}>
        {/* Header */}
        <View style={styles.headerContainer}>
          <View>
            <Text style={styles.header}>Hello, Shivankar</Text>
            <Text style={styles.subHeader}>Welcome to Travel&Tourism</Text>
          </View>
          <TouchableOpacity>
            <Image
              source={{ uri: 'https://i.pravatar.cc/100' }}
              style={styles.headerProfilePic}
            />
          </TouchableOpacity>
        </View>

        {/* Search */}
        <View style={styles.searchContainer}>
          <Icon name="search" size={18} color="#666" style={styles.searchIcon} />
          <TextInput
            placeholder="Search destinations..."
            placeholderTextColor="#999"
            style={styles.searchInput}
            value={search}
            onChangeText={setSearch}
          />
          {search.length > 0 && (
            <TouchableOpacity onPress={() => setSearch('')} style={styles.clearButton}>
              <View style={styles.filterIcon}>
                <Icon name="sliders" size={16} color="#FF6B35" />
              </View>
            </TouchableOpacity>
          )}
          {search.length === 0 && (
            <View style={styles.filterIcon}>
              <Icon name="sliders" size={16} color="#FF6B35" />
            </View>
          )}
        </View>

        <ScrollView showsVerticalScrollIndicator={false} style={styles.scrollView}>
          {/* Trips */}
          <View style={styles.tripsSection}>
            <Text style={styles.sectionTitle}>Your Recent trips</Text>
            <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tripsScrollView}>
              <View style={styles.tripsContainer}>
                {trips.map(trip => (
                  <TouchableOpacity
                    key={trip}
                    onPress={() => setSelectedTrip(selectedTrip === trip ? '' : trip)}
                    style={[styles.tripButton, selectedTrip === trip && styles.tripButtonActive]}
                  >
                    <Text
                      style={[
                        styles.tripButtonText,
                        selectedTrip === trip && styles.tripButtonTextActive,
                      ]}
                    >
                      {trip}
                    </Text>
                  </TouchableOpacity>
                ))}
              </View>
            </ScrollView>
          </View>

          {/* Destinations */}
          <View style={styles.destinationsSection}>
            <View style={styles.sectionHeader}>
              <Text style={styles.sectionTitle}>
                {selectedTrip ? `Featured Destinations` : 'Featured Destinations'}
              </Text>
              {selectedTrip && (
                <TouchableOpacity onPress={clearSelection}>
                  <Text style={styles.clearAllText}>Clear All</Text>
                </TouchableOpacity>
              )}
            </View>
            
            <ScrollView horizontal showsHorizontalScrollIndicator={false}>
              <View style={styles.cardsContainer}>
                {filteredDestinations.map((item, index) => (
                  <View key={item.id} style={[styles.card, index === 0 && styles.firstCard]}>
                    <Image source={{ uri: item.image }} style={styles.cardImage} />
                    <TouchableOpacity style={styles.favorite}>
                      <Icon name="heart-o" size={16} color="#666" />
                    </TouchableOpacity>
                    <View style={styles.cardOverlay}>
                      <Text style={styles.cardTitle}>{item.name}</Text>
                      <View style={styles.locationContainer}>
                        <Icon name="map-marker" size={12} color="#fff" />
                        <Text style={styles.cardLocation}>{item.location}</Text>
                      </View>
                    </View>
                  </View>
                ))}
              </View>
            </ScrollView>
          </View>
        </ScrollView>

        {/* Bottom Navigation */}
        <View style={styles.bottomNav}>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="home" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
            <Icon name="map-marker" size={20} color="#fff" />
          </TouchableOpacity>
          <TouchableOpacity style={styles.navItem}>
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
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a365d',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    height: '60%',
    backgroundColor: '#4A90E2',
    // In a real app, you'd use react-native-linear-gradient here
  },
  safeArea: {
    flex: 1,
    paddingHorizontal: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    paddingTop: 20,
    paddingBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  subHeader: {
    fontSize: 14,
    color: '#E6F3FF',
    opacity: 0.8,
  },
  headerProfilePic: {
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: '#fff',
  },
  searchContainer: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    borderRadius: 25,
    alignItems: 'center',
    marginBottom: 30,
    paddingHorizontal: 16,
    paddingVertical: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  searchIcon: {
    marginRight: 12,
  },
  searchInput: {
    flex: 1,
    fontSize: 16,
    color: '#333',
  },
  clearButton: {
    padding: 4,
  },
  filterIcon: {
    backgroundColor: '#FFF5F0',
    borderRadius: 6,
    padding: 8,
  },
  scrollView: {
    flex: 1,
  },
  tripsSection: {
    marginBottom: 30,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 15,
  },
  tripsScrollView: {
    flexGrow: 0,
  },
  tripsContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  tripButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 25,
    marginRight: 12,
  },
  tripButtonActive: {
    backgroundColor: '#333',
  },
  tripButtonText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  tripButtonTextActive: {
    color: '#fff',
  },
  destinationsSection: {
    paddingBottom: 100, // Space for bottom nav
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 15,
  },
  clearAllText: {
    color: '#FF6B35',
    fontSize: 14,
    fontWeight: '500',
  },
  cardsContainer: {
    flexDirection: 'row',
    paddingRight: 20,
  },
  card: {
    width: width * 0.7,
    height: 280,
    borderRadius: 20,
    marginRight: 16,
    overflow: 'hidden',
    backgroundColor: '#fff',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 5,
  },
  firstCard: {
    marginLeft: 0,
  },
  cardImage: {
    width: '100%',
    height: '100%',
    resizeMode: 'cover',
  },
  favorite: {
    position: 'absolute',
    top: 15,
    right: 15,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
    borderRadius: 20,
    padding: 8,
  },
  cardOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor:'linear-gradient(transparent, rgba(0,0,0,0.7))',
    padding: 20,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
    marginBottom: 4,
  },
  locationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  cardLocation: {
    fontSize: 13,
    color: '#fff',
    marginLeft: 4,
    opacity: 0.9,
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