import React from "react";
import { Image, Pressable, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/style";
import FavoriteButton from "./Button";

type Props = {
  meal: { idMeal: string; strMeal: string; strMealThumb: string };
  onPress: () => void;
  style?: any;
};

export default function MealCard({ meal, onPress, style }: Props) {
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);

  return (
    <Pressable
      onPress={onPress}
      accessibilityRole="button"
      accessibilityLabel={`Apri ${meal.strMeal}`}
      style={({ pressed }) => [
        styles.listItem,
        style,
        pressed && styles.pressedFeedback,
      ]}
    >
      <Image source={{ uri: meal.strMealThumb }} style={styles.thumb} />
      <View style={styles.rowCenter}>
        <Text
          style={[styles.listTitle, { paddingHorizontal: 12, paddingVertical: 8 }]}
          numberOfLines={2}
          ellipsizeMode="tail"
          maxFontSizeMultiplier={1.4}
        >
          {meal.strMeal}
        </Text>
        <View style={{ paddingRight: 8 }}>
          <FavoriteButton id={meal.idMeal} label={meal.strMeal} />
        </View>
      </View>
    </Pressable>
  );
}