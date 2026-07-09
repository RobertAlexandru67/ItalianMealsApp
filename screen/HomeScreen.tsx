import React, { useEffect, useLayoutEffect, useState } from "react";
import {
  ActivityIndicator,
  FlatList,
  Text,
  TouchableOpacity,
  useWindowDimensions,
  View,
} from "react-native";
import MealCard from "../components/MealCard";
import { useFavorites } from "../context/Context";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/style";
import { spacing } from "../theme/colors";
import { fetchItalianMeals } from "../services/mealsApi";

const WIDE_BREAKPOINT = 600;

export default function HomeScreen({ navigation }: any) {
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [items, setItems] = useState<any[]>([]);
  const [message, setMessage] = useState("");
  const [viewMode, setViewMode] = useState<"all" | "favorites">("all");
  const { favoriteIds, isLoading: favoritesLoading } = useFavorites();
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);
  const { width } = useWindowDimensions();
  const isWide = width >= WIDE_BREAKPOINT;
  const numColumns = isWide ? 2 : 1;

  const visibleItems =
    viewMode === "favorites"
      ? items.filter((item) => favoriteIds.includes(item.idMeal))
      : items;

  async function loadMeals() {
    setStatus("loading");
    try {
      const data = await fetchItalianMeals();
      if (data.length === 0) {
        setStatus("error");
        setMessage("Nessun piatto italiano disponibile");
      } else {
        setItems(data);
        setStatus("success");
      }
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message ?? "Errore di rete");
    }
  }

  useEffect(() => {
    loadMeals();
  }, []);

  useLayoutEffect(() => {
    navigation.setOptions({
      title: "Italian Meals",
      headerRight: () => (
        <View style={{ flexDirection: "row" }}>
          <TouchableOpacity
            onPress={() => navigation.navigate("Favorites")}
            style={{ marginRight: 8, padding: 4 }}
            accessibilityRole="button"
            accessibilityLabel="Vai ai preferiti"
          >
            <Text style={{ fontSize: 20 }}>♥</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => navigation.navigate("Avatar")}
            style={{ marginRight: 12, padding: 4 }}
            accessibilityRole="button"
            accessibilityLabel="Vai al profilo"
          >
            <Text style={{ fontSize: 20 }}>👤</Text>
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  if (status === "loading" || favoritesLoading) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (status === "error") {
    return (
      <View style={styles.center}>
        <Text style={styles.error}>{message}</Text>
        <TouchableOpacity style={styles.btn} onPress={loadMeals} accessibilityRole="button">
          <Text style={styles.btnText}>Riprova</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <View
        style={{
          flexDirection: "row",
          paddingHorizontal: spacing.md,
          paddingTop: spacing.sm + spacing.xs,
          gap: spacing.sm,
        }}
      >
        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            paddingVertical: 10,
            alignItems: "center",
            backgroundColor: viewMode === "all" ? theme.colors.primary : "transparent",
          }}
          onPress={() => setViewMode("all")}
          accessibilityRole="button"
          accessibilityLabel="Mostra lista completa"
        >
          <Text
            style={{
              color: viewMode === "all" ? theme.colors.primaryText : theme.colors.primary,
              fontWeight: "600",
            }}
            maxFontSizeMultiplier={1.4}
          >
            Lista completa
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            flex: 1,
            borderRadius: 999,
            borderWidth: 1,
            borderColor: theme.colors.primary,
            paddingVertical: 10,
            alignItems: "center",
            backgroundColor: viewMode === "favorites" ? theme.colors.primary : "transparent",
          }}
          onPress={() => setViewMode("favorites")}
          accessibilityRole="button"
          accessibilityLabel="Mostra solo preferiti"
        >
          <Text
            style={{
              color: viewMode === "favorites" ? theme.colors.primaryText : theme.colors.primary,
              fontWeight: "600",
            }}
            maxFontSizeMultiplier={1.4}
          >
            Solo preferiti
          </Text>
        </TouchableOpacity>
      </View>

      {visibleItems.length === 0 ? (
        <View style={styles.emptyState}>
          <Text style={styles.emptyText} maxFontSizeMultiplier={1.4}>
            {viewMode === "favorites"
              ? "Nessun preferito ancora. Tocca ♡ su un piatto dalla lista."
              : "Nessun piatto trovato."}
          </Text>
        </View>
      ) : (
        <FlatList
          key={numColumns}
          contentContainerStyle={styles.flatListContent}
          columnWrapperStyle={isWide ? styles.columnWrapper : undefined}
          numColumns={numColumns}
          data={visibleItems}
          keyExtractor={(item) => item.idMeal}
          renderItem={({ item }) => (
            <MealCard
              meal={item}
              onPress={() => navigation.navigate("Details", { id: item.idMeal })}
              style={isWide ? styles.listItemHalf : undefined}
            />
          )}
        />
      )}
    </View>
  );
}