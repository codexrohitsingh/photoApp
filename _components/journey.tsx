import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
  Dimensions,
  Modal,
  FlatList,
  Alert,
} from 'react-native';
import { Svg, Path, Circle } from 'react-native-svg';

const { width, height } = Dimensions.get('window');

interface Location {
  id: string;
  name: string;
  address: string;
}

interface JourneyPoint {
  id: number;
  x: number;
  y: number;
  location?: Location;
  isStart?: boolean;
  isDestination?: boolean;
}

const locations: Location[] = [
  { id: '1', name: 'Central Park', address: 'New York, NY' },
  { id: '2', name: 'Times Square', address: 'New York, NY' },
  { id: '3', name: 'Brooklyn Bridge', address: 'Brooklyn, NY' },
  { id: '4', name: 'Empire State Building', address: 'Manhattan, NY' },
  { id: '5', name: 'Statue of Liberty', address: 'Liberty Island, NY' },
  { id: '6', name: 'One World Trade', address: 'Manhattan, NY' },
];

const JourneyApp: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [initialPoint, setInitialPoint] = useState<Location | null>(null);
  const [destination, setDestination] = useState<Location | null>(null);
  const [showLocationModal, setShowLocationModal] = useState(false);
  const [selectingFor, setSelectingFor] = useState<'initial' | 'destination'>('initial');
  const [showDatePicker, setShowDatePicker] = useState(false);
  
  // Generate journey points based on selected locations
  const generateJourneyPoints = (): JourneyPoint[] => {
    if (!initialPoint || !destination) {
      return [
        { id: 1, x: 100, y: 120, isStart: true },
        { id: 2, x: 200, y: 180 },
        { id: 3, x: 300, y: 140 },
        { id: 4, x: 150, y: 280 },
        { id: 5, x: 280, y: 320, isDestination: true },
      ];
    }

    return [
      { id: 1, x: 100, y: 120, location: initialPoint, isStart: true },
      { id: 2, x: 200, y: 180 },
      { id: 3, x: 300, y: 140 },
      { id: 4, x: 150, y: 280 },
      { id: 5, x: 280, y: 320, location: destination, isDestination: true },
    ];
  };

  const journeyPoints = generateJourneyPoints();

  const formatDate = (date: Date): string => {
    const options: Intl.DateTimeFormatOptions = { 
      weekday: 'short', 
      month: 'short', 
      day: 'numeric' 
    };
    return date.toLocaleDateString('en-US', options);
  };

  const handleLocationSelect = (location: Location) => {
    if (selectingFor === 'initial') {
      if (destination && destination.id === location.id) {
        Alert.alert('Invalid Selection', 'Initial point and destination cannot be the same.');
        return;
      }
      setInitialPoint(location);
    } else {
      if (initialPoint && initialPoint.id === location.id) {
        Alert.alert('Invalid Selection', 'Initial point and destination cannot be the same.');
        return;
      }
      setDestination(location);
    }
    setShowLocationModal(false);
  };

  const openLocationSelector = (type: 'initial' | 'destination') => {
    setSelectingFor(type);
    setShowLocationModal(true);
  };

  const generateDates = (): Date[] => {
    const dates = [];
    const today = new Date();
    for (let i = 0; i < 14; i++) {
      const date = new Date(today);
      date.setDate(today.getDate() + i);
      dates.push(date);
    }
    return dates;
  };

  const renderMapIcon = (x: number, y: number, isLarge: boolean = false, location?: Location) => (
    <TouchableOpacity 
      style={[
        styles.mapIcon, 
        { 
          left: x - (isLarge ? 30 : 25), 
          top: y - (isLarge ? 30 : 25),
          width: isLarge ? 60 : 50,
          height: isLarge ? 60 : 50,
        }
      ]}
      onPress={() => {
        if (location) {
          Alert.alert('Location', `${location.name}\n${location.address}`);
        }
      }}
    >
      <View style={[styles.buildingIcon, isLarge && styles.largeBuildingIcon]}>
        <View style={styles.building} />
        <View style={styles.flag} />
      </View>
      {location && (
        <View style={styles.locationLabel}>
          <Text style={styles.locationLabelText}>{location.name}</Text>
        </View>
      )}
    </TouchableOpacity>
  );

  const renderPath = () => {
    let pathData = '';
    journeyPoints.forEach((point, index) => {
      if (index === 0) {
        pathData += `M ${point.x} ${point.y}`;
      } else {
        const prevPoint = journeyPoints[index - 1];
        const midX = (prevPoint.x + point.x) / 2;
        const midY = (prevPoint.y + point.y) / 2 + (index % 2 === 0 ? -40 : 40);
        pathData += ` Q ${midX} ${midY} ${point.x} ${point.y}`;
      }
    });

    return (
      <Svg height="400" width="100%" style={styles.svg}>
        <Path
          d={pathData}
          stroke="#4CAF50"
          strokeWidth="3"
          strokeDasharray="8,4"
          fill="none"
        />
        {/* Add progress indicator dots */}
        {journeyPoints.slice(0, -1).map((_, index) => {
          const progress = (index + 1) / journeyPoints.length;
          const totalLength = 400; // Approximate path length
          const point = journeyPoints[Math.floor(progress * journeyPoints.length)];
          return (
            <Circle
              key={`progress-${index}`}
              cx={point.x}
              cy={point.y}
              r="4"
              fill="#4CAF50"
            />
          );
        })}
      </Svg>
    );
  };

  const renderLocationPin = (x: number, y: number, isStart: boolean = false) => (
    <View style={[styles.locationPin, { left: x - 12, top: y - 24 }]}>
      <View style={[styles.pin, isStart ? styles.startPin : styles.endPin]}>
        <Text style={styles.pinText}>{isStart ? 'S' : 'D'}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="light-content" backgroundColor="#5B9BD5" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Journey</Text>
        <Text style={styles.headerSubtitle}>Plan your perfect trip</Text>
      </View>

      {/* Destination Card */}
      <View style={styles.card}>
        <View style={styles.cardHeader}>
          <Text style={styles.cardTitle}>Plan Journey</Text>
          <TouchableOpacity 
            style={styles.dateButton}
            onPress={() => setShowDatePicker(true)}
          >
            <Text style={styles.dateText}>📅 {formatDate(selectedDate)}</Text>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>
        
        <View style={styles.pointsList}>
          <TouchableOpacity 
            style={styles.pointItem}
            onPress={() => openLocationSelector('initial')}
          >
            <View style={[styles.dot, styles.greenDot]} />
            <View style={styles.pointContent}>
              <Text style={styles.pointLabel}>Initial Point</Text>
              <Text style={styles.pointValue}>
                {initialPoint ? initialPoint.name : 'Select starting location'}
              </Text>
              {initialPoint && (
                <Text style={styles.pointAddress}>{initialPoint.address}</Text>
              )}
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
          
          <TouchableOpacity 
            style={styles.pointItem}
            onPress={() => openLocationSelector('destination')}
          >
            <View style={[styles.dot, styles.redDot]} />
            <View style={styles.pointContent}>
              <Text style={styles.pointLabel}>Destination</Text>
              <Text style={styles.pointValue}>
                {destination ? destination.name : 'Select destination'}
              </Text>
              {destination && (
                <Text style={styles.pointAddress}>{destination.address}</Text>
              )}
            </View>
            <Text style={styles.arrow}>›</Text>
          </TouchableOpacity>
        </View>

        {initialPoint && destination && (
          <View style={styles.journeyInfo}>
            <Text style={styles.journeyInfoText}>
              🚶‍♂️ Estimated time: 45 min • 📍 Distance: 3.2 km
            </Text>
          </View>
        )}
      </View>

      {/* Map Section */}
      <View style={styles.mapContainer}>
        <View style={styles.mapBackground}>
          {renderPath()}
          
          {/* Render journey points */}
          {journeyPoints.map((point, index) => (
            <View key={point.id}>
              {renderMapIcon(
                point.x, 
                point.y, 
                point.isStart || point.isDestination, 
                point.location
              )}
              {point.isStart && renderLocationPin(point.x, point.y, true)}
              {point.isDestination && renderLocationPin(point.x, point.y, false)}
            </View>
          ))}
          
          {/* Journey progress indicator */}
          <View style={styles.progressInfo}>
            <Text style={styles.progressText}>
              Journey Progress: Ready to start
            </Text>
          </View>
        </View>
      </View>

      {/* Location Selection Modal */}
      <Modal
        visible={showLocationModal}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>
              Select {selectingFor === 'initial' ? 'Starting Point' : 'Destination'}
            </Text>
            <TouchableOpacity onPress={() => setShowLocationModal(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={locations}
            keyExtractor={(item) => item.id}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={styles.locationItem}
                onPress={() => handleLocationSelect(item)}
              >
                <View style={styles.locationIcon}>
                  <Text style={styles.locationEmoji}>📍</Text>
                </View>
                <View style={styles.locationDetails}>
                  <Text style={styles.locationName}>{item.name}</Text>
                  <Text style={styles.locationAddress}>{item.address}</Text>
                </View>
                <Text style={styles.arrow}>›</Text>
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>

      {/* Date Picker Modal */}
      <Modal
        visible={showDatePicker}
        animationType="slide"
        presentationStyle="pageSheet"
      >
        <SafeAreaView style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <Text style={styles.modalTitle}>Select Date</Text>
            <TouchableOpacity onPress={() => setShowDatePicker(false)}>
              <Text style={styles.modalClose}>✕</Text>
            </TouchableOpacity>
          </View>
          <FlatList
            data={generateDates()}
            keyExtractor={(item) => item.toISOString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                style={[
                  styles.dateItem,
                  selectedDate.toDateString() === item.toDateString() && styles.selectedDateItem
                ]}
                onPress={() => {
                  setSelectedDate(item);
                  setShowDatePicker(false);
                }}
              >
                <Text style={[
                  styles.dateItemText,
                  selectedDate.toDateString() === item.toDateString() && styles.selectedDateText
                ]}>
                  {formatDate(item)}
                </Text>
                {selectedDate.toDateString() === item.toDateString() && (
                  <Text style={styles.checkmark}>✓</Text>
                )}
              </TouchableOpacity>
            )}
          />
        </SafeAreaView>
      </Modal>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#5B9BD5',
  },
  header: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: 'bold',
    color: 'white',
  },
  headerSubtitle: {
    fontSize: 14,
    color: 'rgba(255,255,255,0.8)',
    marginTop: 4,
  },
  card: {
    backgroundColor: 'white',
    marginHorizontal: 20,
    borderRadius: 20,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 12,
    elevation: 8,
  },
  cardHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  cardTitle: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333',
  },
  dateButton: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F5F7FA',
    paddingHorizontal: 12,
    paddingVertical: 8,
    borderRadius: 12,
  },
  dateText: {
    fontSize: 14,
    color: '#666',
    marginRight: 6,
    fontWeight: '500',
  },
  arrow: {
    fontSize: 16,
    color: '#999',
    fontWeight: '600',
  },
  pointsList: {
    gap: 20,
  },
  pointItem: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FAFBFC',
    padding: 16,
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#E8EAED',
  },
  dot: {
    width: 16,
    height: 16,
    borderRadius: 8,
    marginRight: 16,
  },
  greenDot: {
    backgroundColor: '#4CAF50',
  },
  redDot: {
    backgroundColor: '#F44336',
  },
  pointContent: {
    flex: 1,
  },
  pointLabel: {
    fontSize: 12,
    color: '#666',
    fontWeight: '500',
    marginBottom: 4,
  },
  pointValue: {
    fontSize: 16,
    color: '#333',
    fontWeight: '600',
  },
  pointAddress: {
    fontSize: 12,
    color: '#999',
    marginTop: 2,
  },
  journeyInfo: {
    marginTop: 20,
    padding: 16,
    backgroundColor: '#E8F5E8',
    borderRadius: 12,
  },
  journeyInfoText: {
    fontSize: 14,
    color: '#2E7D32',
    textAlign: 'center',
    fontWeight: '500',
  },
  mapContainer: {
    flex: 1,
    marginHorizontal: 20,
    marginTop: 20,
    marginBottom: 20,
  },
  mapBackground: {
    flex: 1,
    backgroundColor: '#F0F7FF',
    borderRadius: 20,
    position: 'relative',
    overflow: 'hidden',
    borderWidth: 1,
    borderColor: '#E3F2FD',
  },
  svg: {
    position: 'absolute',
    top: 0,
    left: 0,
  },
  mapIcon: {
    position: 'absolute',
    backgroundColor: '#FF6B35',
    borderRadius: 30,
    borderWidth: 4,
    borderColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 3 },
    shadowOpacity: 0.25,
    shadowRadius: 6,
    elevation: 8,
  },
  buildingIcon: {
    alignItems: 'center',
  },
  largeBuildingIcon: {
    transform: [{ scale: 1.3 }],
  },
  building: {
    width: 18,
    height: 24,
    backgroundColor: '#2C3E50',
    borderRadius: 3,
    marginBottom: 2,
  },
  flag: {
    width: 10,
    height: 8,
    backgroundColor: '#E74C3C',
    borderTopRightRadius: 3,
    borderBottomRightRadius: 3,
  },
  locationLabel: {
    position: 'absolute',
    top: -30,
    backgroundColor: 'rgba(0,0,0,0.8)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 6,
    minWidth: 80,
  },
  locationLabelText: {
    color: 'white',
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
  locationPin: {
    position: 'absolute',
  },
  pin: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 2,
    borderColor: 'white',
  },
  startPin: {
    backgroundColor: '#4CAF50',
  },
  endPin: {
    backgroundColor: '#F44336',
  },
  pinText: {
    color: 'white',
    fontSize: 10,
    fontWeight: 'bold',
  },
  progressInfo: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    backgroundColor: 'rgba(255,255,255,0.95)',
    padding: 12,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 4,
  },
  progressText: {
    fontSize: 14,
    color: '#333',
    textAlign: 'center',
    fontWeight: '500',
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  modalClose: {
    fontSize: 20,
    color: '#666',
    fontWeight: '500',
  },
  locationItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  locationIcon: {
    width: 40,
    height: 40,
    backgroundColor: '#F5F7FA',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  locationEmoji: {
    fontSize: 18,
  },
  locationDetails: {
    flex: 1,
  },
  locationName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  locationAddress: {
    fontSize: 14,
    color: '#666',
  },
  dateItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F0F0F0',
  },
  selectedDateItem: {
    backgroundColor: '#E8F5E8',
  },
  dateItemText: {
    fontSize: 16,
    color: '#333',
    fontWeight: '500',
  },
  selectedDateText: {
    color: '#4CAF50',
    fontWeight: '600',
  },
  checkmark: {
    fontSize: 18,
    color: '#4CAF50',
    fontWeight: 'bold',
  },
});

export default JourneyApp;