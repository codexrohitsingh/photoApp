import { Stack } from "expo-router";
import { SafeAreaProvider } from "react-native-safe-area-context";
export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <Stack screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: 'transparent' }
      }} />
        {/* <ClerkProvider tokenCache={tokenCache}>
      <Slot />
    </ClerkProvider> */}
    {/* <View>
      <ClerkProvider>
      <Slot />
    </ClerkProvider>
    </View> */}
    </SafeAreaProvider>
  );
}

// function RootLayoutNav() {
//   return (
//     <ClerkProvider>
//       <Slot />
//     </ClerkProvider>
//   )
// }
