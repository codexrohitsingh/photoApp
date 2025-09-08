import { router } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";
import TravelLoginScreen from "./TravelLoginScreen";

// Initialize MapLibre (no API key needed!)
// MapLibreGL.setAccessToken(null);

export default function Index() {
 const OpenCamera = () =>{
    router.push("/camera")
 }
  const SelectImage = ()=>{
    router.push("/imagePicker")
  }
  const LivePhoto= ()=>{
    router.push("/livePhoto")
  }
   const MapParJao= ()=>{
    router.push("/Map")
  }
 
  return (

    

    <View>

{/* <TouchableOpacity onPress={OpenCamera}>
  <Text>Open camera </Text>
</TouchableOpacity>
<TouchableOpacity onPress={SelectImage}>
    <Text>Select Image </Text>
</TouchableOpacity>
<TouchableOpacity onPress={LivePhoto}>
  <Text>Click photo</Text>
</TouchableOpacity>

<TouchableOpacity onPress={MapParJao}>
  <Text>Open map</Text>
</TouchableOpacity> */}

<View>
  <TravelLoginScreen/>
</View>
    </View>


  );
}
