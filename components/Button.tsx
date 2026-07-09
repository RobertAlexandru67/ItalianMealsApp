import React from "react";
import { Pressable, StyleSheet, Text } from "react-native";
import { useFavorites } from "../context/Context";

type Props = { id: string; size?: number; label?: string };

export default function FavoriteButton({ id, size = 22, label }: Props) {
  const { isFavorite, toggleFavorite } = useFavorites();
  const fav = isFavorite(id);

  async function handlePress() {
    await toggleFavorite(id);
  }

  return (
    <Pressable
      onPress={handlePress}
      style={({ pressed }) => [styles.btn, pressed && styles.pressed]}
      accessibilityRole="button"
      accessibilityLabel={
        fav
          ? `Rimuovi ${label ?? "piatto"} dai preferiti`
          : `Aggiungi ${label ?? "piatto"} ai preferiti`
      }
    >
      <Text style={[styles.icon, { fontSize: size }]}>{fav ? "❤️" : "🤍"}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  btn: { padding: 8 },
  pressed: { opacity: 0.5 },
  icon: {},
});