import { router } from "expo-router";
import React, { useEffect, useState } from "react";
import {
  Alert,
  Modal,
  Platform,
  ScrollView,
  StatusBar,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
// Remove LinearGradient import if not installed, or install it with: expo install expo-linear-gradient

const detail = () => {
  const [currentTime, setCurrentTime] = useState("9:41");
  const [trips, setTrips] = useState([
    {
      id: 1,
      title: "Current Journey",
      date: "25 December 2025",
      isCurrent: true,
      destination: "Puri, Odisha",
      description: "Beach trip with family",
    },
    {
      id: 2,
      title: "Trip to Puri",
      date: "10 January 2024",
      isCurrent: false,
      destination: "Puri, Odisha",
      description: "Temple visit",
    },
    {
      id: 3,
      title: "Weekend Getaway",
      date: "01 February 2023",
      isCurrent: false,
      destination: "Konark, Odisha",
      description: "Past trip example",
    },
  ]);

  const [showAddTripModal, setShowAddTripModal] = useState(false);
  const [newTripTitle, setNewTripTitle] = useState("");
  const [newTripDate, setNewTripDate] = useState("");
  const [newTripDestination, setNewTripDestination] = useState("");
  const [newTripDescription, setNewTripDescription] = useState("");

  // Update current time
  useEffect(() => {
    const now = new Date();
    setCurrentTime(
      now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
    );
    
    const interval = setInterval(() => {
      const now = new Date();
      setCurrentTime(
        now.getHours() + ":" + (now.getMinutes() < 10 ? "0" : "") + now.getMinutes()
      );
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // ✅ Check if date is past
  const isPastJourney = (dateString: string) => {
    const today = new Date();
    // Parse the date string (e.g., "25 December 2025")
    const [day, month, year] = dateString.split(" ");
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const monthIndex = monthNames.indexOf(month);
    
    if (monthIndex === -1) return false;
    
    const tripDate = new Date(parseInt(year), monthIndex, parseInt(day));
    return tripDate < today;
  };

  const handleAddTrip = () => {
    if (!newTripTitle || !newTripDate || !newTripDestination) {
      Alert.alert("Error", "Please fill in all required fields");
      return;
    }

    const newTrip = {
      id: trips.length + 1,
      title: newTripTitle,
      date: newTripDate,
      isCurrent: false,
      destination: newTripDestination,
      description: newTripDescription,
    };

    setTrips([...trips, newTrip]);
    setShowAddTripModal(false);
    setNewTripTitle("");
    setNewTripDate("");
    setNewTripDestination("");
    setNewTripDescription("");

    Alert.alert("Success", "Trip added successfully!");
  };

  const handleDeleteTrip = (id: number) => {
    Alert.alert("Delete Trip", "Are you sure you want to delete this trip?", [
      {
        text: "Cancel",
        style: "cancel",
      },
      {
        text: "Delete",
        onPress: () => {
          setTrips(trips.filter((trip) => trip.id !== id));
          Alert.alert("Deleted", "Trip has been deleted");
        },
        style: "destructive",
      },
    ]);
  };

  const handleSetCurrent = (id: number, date: string) => {
    if (isPastJourney(date)) {
      Alert.alert("Not Allowed", "You cannot set a past trip as current journey.");
      return;
    }

    const updatedTrips = trips.map((trip) => ({
      ...trip,
      isCurrent: trip.id === id,
    }));
    setTrips(updatedTrips);
    Alert.alert("Current Trip Set", "This is now your current journey");
  };

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor="#F8F9FA" />

      {/* Status Bar */}
      <View style={styles.statusBar}>
        <Text style={styles.time}>{currentTime}</Text>
        <View style={styles.statusIcons}>
          <Icon name="signal" size={14} color="#000" />
          <Icon name="wifi" size={14} color="#000" style={styles.statusIcon} />
          <Icon name="battery" size={14} color="#000" style={styles.statusIcon} />
        </View>
      </View>

      {/* Header */}
      <Text style={styles.header}>Journey</Text>

      {/* Trips List */}
      <ScrollView style={styles.tripsContainer} showsVerticalScrollIndicator={false}>
        {trips.map((trip) => (
          <TouchableOpacity
            key={trip.id}
            style={[
              styles.tripCard,
              trip.isCurrent && styles.currentTripCard,
              isPastJourney(trip.date) && styles.pastTripCard,
            ]}
            onLongPress={() => handleDeleteTrip(trip.id)}
            onPress={()=>{
              router.push("/journey")
            }}
            activeOpacity={0.8}
          >
            <View style={styles.tripHeader}>
              <Text
                style={[
                  styles.tripTitle,
                  trip.isCurrent && styles.currentTripTitle,
                  isPastJourney(trip.date) && styles.pastTripTitle,
                ]}
              >
                {trip.title}
              </Text>
              {trip.isCurrent && (
                <View style={styles.currentBadge}>
                  <Text style={styles.currentBadgeText}>Current</Text>
                </View>
              )}
              {isPastJourney(trip.date) && (
                <View style={styles.pastBadge}>
                  <Text style={styles.pastBadgeText}>Past</Text>
                </View>
              )}
            </View>

            <Text style={styles.tripDate}>{trip.date}</Text>

            <View style={styles.tripDetails}>
              <Icon name="map-marker" size={16} color="#6c757d" />
              <Text style={styles.tripDestination}>{trip.destination}</Text>
            </View>

            {trip.description && (
              <Text style={styles.tripDescription}>{trip.description}</Text>
            )}

            {!trip.isCurrent && !isPastJourney(trip.date) && (
              <TouchableOpacity
                style={styles.setCurrentButton}
                onPress={() => handleSetCurrent(trip.id, trip.date)}
              >
                <Text style={styles.setCurrentButtonText}>Set as Current</Text>
              </TouchableOpacity>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Add Trip Button */}
      <TouchableOpacity
        style={styles.addButton}
        onPress={() => setShowAddTripModal(true)}
      >
        <Text style={styles.addButtonText}>Schedule Your Trip</Text>
        <Icon name="plus" size={20} color="#FFF" />
      </TouchableOpacity>

      {/* Add Trip Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={showAddTripModal}
        onRequestClose={() => setShowAddTripModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Schedule New Trip</Text>
              <TouchableOpacity onPress={() => setShowAddTripModal(false)}>
                <Icon name="close" size={24} color="#000" />
              </TouchableOpacity>
            </View>

            <ScrollView style={styles.modalForm}>
              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Trip Title *</Text>
                <TextInput
                  style={styles.input}
                  value={newTripTitle}
                  onChangeText={setNewTripTitle}
                  placeholder="e.g., Beach Vacation"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Date *</Text>
                <TextInput
                  style={styles.input}
                  value={newTripDate}
                  onChangeText={setNewTripDate}
                  placeholder="e.g., 25 December 2025"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Destination *</Text>
                <TextInput
                  style={styles.input}
                  value={newTripDestination}
                  onChangeText={setNewTripDestination}
                  placeholder="e.g., Puri, Odisha"
                />
              </View>

              <View style={styles.inputGroup}>
                <Text style={styles.inputLabel}>Description (Optional)</Text>
                <TextInput
                  style={[styles.input, styles.textArea]}
                  value={newTripDescription}
                  onChangeText={setNewTripDescription}
                  placeholder="Trip details..."
                  multiline={true}
                  numberOfLines={3}
                />
              </View>
            </ScrollView>

            <View style={styles.modalActions}>
              <TouchableOpacity
                style={styles.cancelButton}
                onPress={() => setShowAddTripModal(false)}
              >
                <Text style={styles.cancelButtonText}>Cancel</Text>
              </TouchableOpacity>

              <TouchableOpacity style={styles.saveButton} onPress={handleAddTrip}>
                <Text style={styles.saveButtonText}>Save Trip</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#e0f7fa", // Replaced LinearGradient with solid color
  },
  statusBar: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,
    paddingTop: Platform.OS === "ios" ? 40 : 8, // Add safe area for iOS
  },
  time: {
    fontSize: 14,
    fontWeight: "600",
  },
  statusIcons: {
    flexDirection: "row",
    alignItems: "center",
  },
  statusIcon: {
    marginLeft: 8,
  },
  header: {
    fontSize: 28,
    fontWeight: "bold",
    textAlign: "center",
    marginVertical: 20,
    color: "#2c3e50",
  },
  tripsContainer: {
    flex: 1,
    paddingHorizontal: 16,
  },
  tripCard: {
    backgroundColor: "#FFF",
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  currentTripCard: {
    borderWidth: 2,
    borderColor: "#3498db",
  },
  pastTripCard: {
    borderWidth: 1,
    borderColor: "#aaa",
    backgroundColor: "#f0f0f0",
  },
  tripHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 8,
  },
  tripTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  currentTripTitle: {
    color: "#3498db",
  },
  pastTripTitle: {
    color: "#999",
    textDecorationLine: "line-through",
  },
  currentBadge: {
    backgroundColor: "#3498db",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  currentBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  pastBadge: {
    backgroundColor: "#aaa",
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
  },
  pastBadgeText: {
    color: "#FFF",
    fontSize: 12,
    fontWeight: "600",
  },
  tripDate: {
    fontSize: 14,
    color: "#6c757d",
    marginBottom: 12,
  },
  tripDetails: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 8,
  },
  tripDestination: {
    fontSize: 16,
    color: "#2c3e50",
    marginLeft: 8,
  },
  tripDescription: {
    fontSize: 14,
    color: "#6c757d",
    fontStyle: "italic",
    marginTop: 8,
  },
  setCurrentButton: {
    marginTop: 12,
    padding: 8,
    backgroundColor: "#f8f9fa",
    borderRadius: 6,
    alignItems: "center",
  },
  setCurrentButtonText: {
    color: "#3498db",
    fontWeight: "600",
  },
  addButton: {
    flexDirection: "row",
    backgroundColor: "#3498db",
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 3,
  },
  addButtonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
    marginRight: 8,
  },
  modalContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },
  modalContent: {
    backgroundColor: "#FFF",
    borderRadius: 16,
    width: "90%",
    maxHeight: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#e9ecef",
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#2c3e50",
  },
  modalForm: {
    padding: 16,
  },
  inputGroup: {
    marginBottom: 16,
  },
  inputLabel: {
    fontSize: 14,
    fontWeight: "600",
    color: "#2c3e50",
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  textArea: {
    height: 80,
    textAlignVertical: "top",
  },
  modalActions: {
    flexDirection: "row",
    justifyContent: "flex-end",
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: "#e9ecef",
  },
  cancelButton: {
    padding: 12,
    marginRight: 12,
  },
  cancelButtonText: {
    color: "#6c757d",
    fontWeight: "600",
  },
  saveButton: {
    backgroundColor: "#3498db",
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 8,
  },
  saveButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});

export default detail;