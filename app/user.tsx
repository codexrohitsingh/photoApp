import React, { useState } from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ScrollView,
  StyleSheet,
  Alert,
  Modal,
  TextInput,
  Platform,
  StatusBar
} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const UserProfileScreen = () => {
  // State for checkboxes
  const [journeyChecked, setJourneyChecked] = useState(false);
  const [helpChecked, setHelpChecked] = useState(true);
  const [settingsChecked, setSettingsChecked] = useState(false);
  const [logoutChecked, setLogoutChecked] = useState(false);
  
  // State for modals
  const [personalDetailsModal, setPersonalDetailsModal] = useState(false);
  const [qrCodeModal, setQrCodeModal] = useState(false);
  
  // State for personal details form
  const [name, setName] = useState('Shivankar');
  const [email, setEmail] = useState('janecooper@example.com');
  
  // Handle logout
  const handleLogout = () => {
    Alert.alert(
      "Log Out",
      "Are you sure you want to log out?",
      [
        {
          text: "Cancel",
          onPress: () => setLogoutChecked(false),
          style: "cancel"
        },
        { 
          text: "Log Out", 
          onPress: () => {
            setLogoutChecked(false);
            Alert.alert("Logged Out", "You have been successfully logged out.");
          }
        }
      ]
    );
  };

  // Handle back button press
  const handleBackPress = () => {
    Alert.alert("Back", "Navigating back...");
  };

  // Handle checkbox toggle
  const toggleCheckbox = (checkbox) => {
    switch(checkbox) {
      case 'journey':
        setJourneyChecked(!journeyChecked);
        break;
      case 'help':
        setHelpChecked(!helpChecked);
        break;
      case 'settings':
        setSettingsChecked(!settingsChecked);
        // Show settings message when toggled
        if (!settingsChecked) {
          Alert.alert("Settings", "Navigating to settings screen...");
        }
        break;
      case 'logout':
        setLogoutChecked(!logoutChecked);
        if (!logoutChecked) {
          handleLogout();
        }
        break;
    }
  };

  return (
    <View style={styles.page}>
      <StatusBar barStyle="dark-content" backgroundColor="#DFEEFB" />
      
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity onPress={handleBackPress}>
          <Icon name="chevron-left" size={24} color="#171A1F" />
        </TouchableOpacity>
        <Text style={styles.headerText}>Profile</Text>
      </View>

      {/* User Avatar Section */}
      <View style={styles.avatarContainer}>
        <Image
          source={{ uri: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=500&q=80' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.editIconContainer}>
          <Icon name="pencil" size={16} color="#FFFFFF" />
        </TouchableOpacity>
      </View>

      {/* User Info */}
      <Text style={styles.userName}>{name}</Text>
      <Text style={styles.userEmail}>{email}</Text>

      {/* Menu Options */}
      <ScrollView style={styles.menuContainer} showsVerticalScrollIndicator={false}>
        {/* Personal Details */}
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => setPersonalDetailsModal(true)}
        >
          <Icon name="account" size={24} color="#19191F" />
          <Text style={styles.menuText}>Personal Details</Text>
          <Icon name="chevron-right" size={20} color="#565D6D" style={styles.chevron} />
        </TouchableOpacity>

        {/* QR Code */}
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => setQrCodeModal(true)}
        >
          <Icon name="qrcode" size={24} color="#19191F" />
          <Text style={styles.menuText}>QR Code</Text>
          <Icon name="chevron-right" size={20} color="#565D6D" style={styles.chevron} />
        </TouchableOpacity>

        {/* Restore Photos Section */}
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionHeaderText}>Restore Photos</Text>
        </View>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => toggleCheckbox('journey')}
        >
          <Icon name="image" size={24} color="#19191F" />
          <Text style={styles.menuText}>Journey</Text>
          <View style={[styles.checkbox, journeyChecked && styles.checked]}>
            {journeyChecked && <Icon name="check" size={16} color="#FFFFFF" />}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => toggleCheckbox('help')}
        >
          <Icon name="help-circle" size={24} color="#19191F" />
          <Text style={styles.menuText}>Help & Feedback</Text>
          <View style={[styles.checkbox, helpChecked && styles.checked]}>
            {helpChecked && <Icon name="check" size={16} color="#FFFFFF" />}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => toggleCheckbox('settings')}
        >
          <Icon name="cog" size={20} color="#19191F" />
          <Text style={styles.menuText}>Settings</Text>
          <View style={[styles.checkbox, settingsChecked && styles.checked]}>
            {settingsChecked && <Icon name="check" size={16} color="#FFFFFF" />}
          </View>
        </TouchableOpacity>
        
        <TouchableOpacity 
          style={styles.menuItem}
          onPress={() => toggleCheckbox('logout')}
        >
          <Icon name="logout" size={24} color="#19191F" />
          <Text style={styles.menuText}>Log Out</Text>
          <View style={[styles.checkbox, logoutChecked && styles.checked]}>
            {logoutChecked && <Icon name="check" size={16} color="#FFFFFF" />}
          </View>
        </TouchableOpacity>
      </ScrollView>

      {/* Personal Details Modal */}
      <Modal
        animationType="slide"
        transparent={true}
        visible={personalDetailsModal}
        onRequestClose={() => setPersonalDetailsModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Personal Details</Text>
              <TouchableOpacity onPress={() => setPersonalDetailsModal(false)}>
                <Icon name="close" size={24} color="#171A1F" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Name</Text>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
              />
            </View>
            
            <View style={styles.formGroup}>
              <Text style={styles.label}>Email</Text>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                keyboardType="email-address"
              />
            </View>
            
            <TouchableOpacity 
              style={styles.saveButton}
              onPress={() => {
                setPersonalDetailsModal(false);
                Alert.alert("Success", "Your details have been updated.");
              }}
            >
              <Text style={styles.saveButtonText}>Save Changes</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

      {/* QR Code Modal */}
      <Modal
        animationType="fade"
        transparent={true}
        visible={qrCodeModal}
        onRequestClose={() => setQrCodeModal(false)}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Your QR Code</Text>
              <TouchableOpacity onPress={() => setQrCodeModal(false)}>
                <Icon name="close" size={24} color="#171A1F" />
              </TouchableOpacity>
            </View>
            
            <View style={styles.qrContainer}>
              <Icon name="qrcode" size={200} color="#3B82F6" />
              <Text style={styles.qrText}>Scan this code to share your profile</Text>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    backgroundColor: '#DFEEFB',
    padding: 16,
    paddingTop: Platform.OS === 'ios' ? 50 : StatusBar.currentHeight + 10,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 30,
  },
  headerText: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171A1F',
    marginLeft: 125,
  },
  avatarContainer: {
    alignItems: 'center',
    marginBottom: 15,
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  editIconContainer: {
    position: 'absolute',
    top: 70,
    right: 100,
    width: 28,
    height: 28,
    backgroundColor: '#3B82F6',
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  userName: {
    fontSize: 24,
    fontWeight: '600',
    color: '#171A1F',
    textAlign: 'center',
    marginBottom: 5,
  },
  userEmail: {
    fontSize: 14,
    fontWeight: '400',
    color: '#565D6D',
    textAlign: 'center',
    marginBottom: 30,
  },
  menuContainer: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    paddingHorizontal: 16,
    shadowColor: '#171A1F',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
    maxHeight: 400,
  },
  sectionHeader: {
    borderTopWidth: 1,
    borderTopColor: '#E5E7EB',
    paddingVertical: 16,
  },
  sectionHeaderText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#565D6D',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
  },
  menuText: {
    fontSize: 16,
    fontWeight: '500',
    color: '#171A1F',
    marginLeft: 16,
    flex: 1,
  },
  chevron: {
    marginLeft: 'auto',
  },
  checkbox: {
    width: 22,
    height: 22,
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  checked: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    borderRadius: 16,
    padding: 20,
    width: '90%',
    maxWidth: 400,
  },
  modalHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#171A1F',
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    fontWeight: '500',
    color: '#171A1F',
    marginBottom: 8,
  },
  input: {
    borderWidth: 1,
    borderColor: '#D1D5DB',
    borderRadius: 8,
    padding: 12,
    fontSize: 16,
  },
  saveButton: {
    backgroundColor: '#3B82F6',
    borderRadius: 8,
    padding: 16,
    alignItems: 'center',
    marginTop: 10,
  },
  saveButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '600',
  },
  qrContainer: {
    alignItems: 'center',
    padding: 20,
  },
  qrText: {
    fontSize: 14,
    color: '#565D6D',
    marginTop: 16,
    textAlign: 'center',
  },
});

export default UserProfileScreen;