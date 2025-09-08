import { Ionicons } from "@expo/vector-icons";
import { router } from "expo-router";
import React, { useState } from "react";
import {
  FlatList,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";

const dummyData = [
  { id: "1", uri: "https://via.placeholder.com/150/000000" },
  { id: "2", uri: "https://via.placeholder.com/150/FFFF00?text=UPDATE" },
  { id: "3", uri: "https://via.placeholder.com/150/00FF00?text=Form" },
  { id: "4", uri: "https://via.placeholder.com/150/FFD700?text=Earrings" },
  { id: "5", uri: "https://via.placeholder.com/150/FFF?text=Calendar" },
  { id: "6", uri: "https://via.placeholder.com/150/808080?text=Video+7s" },
  { id: "7", uri: "https://via.placeholder.com/150/333?text=Video+9s" },
  { id: "8", uri: "https://via.placeholder.com/150/ccc?text=Chart" },
  { id: "9", uri: "https://via.placeholder.com/150/99ccff?text=Ticket" },
  { id: "10", uri: "https://via.placeholder.com/150/ff6666?text=Friends" },
  { id: "11", uri: "https://via.placeholder.com/150/9999ff?text=Clouds" },
];

export default function plusPage() {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const renderItem = ({ item }: { item: { id: string; uri: string } }) => (
    <TouchableOpacity
      onPress={() => setSelectedId(item.id)}
      style={[
        styles.item,
        selectedId === item.id && styles.selectedItem,
      ]}
    >
      <Image source={{ uri: item.uri }} style={styles.image} />
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Ionicons name="arrow-back" size={24} color="white" />
        </TouchableOpacity>
        <Text style={styles.headerText}>New post</Text>
        <TouchableOpacity style={styles.selectMultipleBtn}>
          <Text style={styles.selectText}>Select Multiple</Text>
        </TouchableOpacity>
      </View>

      {/* Gallery */}
      <FlatList
        data={dummyData}
        keyExtractor={(item) => item.id}
        renderItem={renderItem}
        numColumns={3}
        contentContainerStyle={styles.gallery}
      />

      {/* Footer */}
      <View style={styles.footer}>
        <TouchableOpacity style={styles.postBtn} onPress={()=>{
            router.push("/imagePicker")
        }}>
          <Text style={styles.postText}>POST</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.cameraBtn} onPress={()=>{
          router.push("/camera")
        }}>
          <Text style={styles.cameraText}>CAMERA</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0B1320", // dark navy
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    paddingVertical: 10,
    backgroundColor: "#0B1320",
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    color: "white",
  },
  selectMultipleBtn: {
    backgroundColor: "#F7A826",
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 8,
  },
  selectText: {
    color: "white",
    fontWeight: "500",
  },
  gallery: {
    paddingBottom: 80,
  },
  item: {
    flex: 1 / 3,
    aspectRatio: 1,
    margin: 1,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  selectedItem: {
    borderWidth: 3,
    borderColor: "#F7A826",
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    flexDirection: "row",
    justifyContent: "space-around",
    paddingVertical: 15,
    backgroundColor: "#0B1320",
  },
  postBtn: {
    backgroundColor: "#F7A826",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
  postText: {
    color: "white",
    fontWeight: "600",
  },
  cameraBtn: {
    backgroundColor: "#1E2530",
    paddingHorizontal: 25,
    paddingVertical: 10,
    borderRadius: 20,
  },
  cameraText: {
    color: "white",
    fontWeight: "600",
  },
});
