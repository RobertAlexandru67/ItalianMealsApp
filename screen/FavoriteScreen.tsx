import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Text, View } from "react-native";
import MealCard from "../components/MealCard";
import { useFavorites } from "../context/Context";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/style";
import { fetchItalianMeals } from "../services/mealsApi";

export default function FavoriteScreen({ navigation }: any) {
  const { favoriteIds, isLoading } = useFavorites();
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);
  const [meals, setMeals] = useState<any[]>([]);
  const [loadingMeals, setLoadingMeals] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const load = async () => {
      setLoadingMeals(true);
      const allMeals = await fetchItalianMeals();

      if (!isMounted) return;

      const favorites = allMeals.filter((meal: any) =>
        favoriteIds.includes(meal.idMeal)
      );

      setMeals(favorites);
      setLoadingMeals(false);
    };

    load();

    return () => {
      isMounted = false;
    };
  }, [favoriteIds]);

  if (isLoading || loadingMeals) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={theme.colors.primary} />
      </View>
    );
  }

  if (favoriteIds.length === 0) {
    return (
      <View style={styles.emptyState}>
        <Text style={styles.emptyText} maxFontSizeMultiplier={1.4}>
          Nessun preferito ancora. Tocca ♡ su un piatto dalla lista.
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.screen}>
      <Text style={styles.screenTitle} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        I tuoi preferiti
      </Text>
      <FlatList
        contentContainerStyle={styles.flatListContent}
        data={meals}
        keyExtractor={(item) => item.idMeal}
        renderItem={({ item }) => (
          <MealCard
            meal={item}
            onPress={() => navigation.navigate("Details", { id: item.idMeal })}
          />
        )}
      />
    </View>
  );
}