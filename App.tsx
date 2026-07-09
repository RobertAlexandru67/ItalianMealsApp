import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screen/HomeScreen";
import DetailScreen from "./screen/DetailSceen";
import LoginScreen from "./screen/LoginScreen";
import AvatarScreen from "./screen/ProfileScreen";
import FavoriteScreen from "./screen/FavoriteScreen";

import { FavoritesProvider } from "./context/Context";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

const Stack = createNativeStackNavigator();

const linking = {
  prefixes: ["myapp://"],
  config: {
    screens: {
      Home: "home",
      Details: "dettagli/:id",
      Avatar: "avatar",
      Favorites: "preferiti",
    },
  },
};

// Lab 19: header dello Stack Navigator adattato al tema attivo
function RootNavigator() {
  const { theme } = useTheme();

  return (
    <NavigationContainer linking={linking}>
      <Stack.Navigator
        screenOptions={{
          headerStyle: { backgroundColor: theme.colors.card },
          headerTintColor: theme.colors.text,
        }}
      >
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="Home" component={HomeScreen} />
        <Stack.Screen name="Avatar" component={AvatarScreen} options={{ title: "Profilo" }} />
        <Stack.Screen name="Details" component={DetailScreen} options={{ title: "Dettaglio" }} />
        <Stack.Screen
          name="Favorites"
          component={FavoriteScreen}
          options={{ title: "Preferiti" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <FavoritesProvider>
        <RootNavigator />
      </FavoritesProvider>
    </ThemeProvider>
  );
}