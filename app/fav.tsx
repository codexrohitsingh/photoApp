import React from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  FlatList,
  Image,
  TouchableOpacity,
  Dimensions,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";

const { width } = Dimensions.get("window");

export default function FavoritesScreen() {
  const images = [
    { id: "1", uri: "https://picsum.photos/400/600?random=1" },
    { id: "2", uri: "https://picsum.photos/400/600?random=2" },
    { id: "3", uri: "https://picsum.photos/400/600?random=3" },
    { id: "4", uri: "https://picsum.photos/400/600?random=4" },
    { id: "5", uri: "https://picsum.photos/400/600?random=5" },
    { id: "6", uri: "https://picsum.photos/400/600?random=6" },
    { id: "7", uri: "https://picsum.photos/400/600?random=7" },
    { id: "8", uri: "https://picsum.photos/400/600?random=8" },
  ];

  const renderItem = ({ item, Index }) => {
    // alternating sizes for masonry effect
    const itemStyle =
      index % 3 === 0
        ? styles.largeImage
        : index % 3 === 1
        ? styles.mediumImage
        : styles.smallImage;

    return (
      <View style={itemStyle}>
        <Image source={{ uri: item.uri }} style={styles.image} />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      {/* Header */}
      <Text style={styles.header}>Your Favorites</Text>

      {/* Image Grid */}
      <FlatList
        data={images}
        renderItem={renderItem}
        keyExtractor={(item) => item.id}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.grid}
      />

      {/* Bottom Navigation */}
      <View style={styles.bottomNav}>
        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="home" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="location" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.addButton}>
          <Ionicons name="add" size={32} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="heart" size={24} color="#fff" />
        </TouchableOpacity>

        <TouchableOpacity style={styles.navButton}>
          <Ionicons name="person" size={24} color="#fff" />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#0A1A2F" },
  header: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#fff",
    padding: 16,
  },
  grid: { paddingHorizontal: 8 },
  largeImage: {
    flex: 1,
    margin: 4,
    height: 250,
    borderRadius: 12,
    overflow: "hidden",
  },
  mediumImage: {
    flex: 1,
    margin: 4,
    height: 180,
    borderRadius: 12,
    overflow: "hidden",
  },
  smallImage: {
    flex: 1,
    margin: 4,
    height: 150,
    borderRadius: 12,
    overflow: "hidden",
  },
  image: { width: "100%", height: "100%" },
  bottomNav: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#0A1A2F",
  },
  navButton: {
    alignItems: "center",
    justifyContent: "center",
    padding: 6,
  },
  addButton: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: "#034078",
    justifyContent: "center",
    alignItems: "center",
    marginTop: -25,
  },
});
