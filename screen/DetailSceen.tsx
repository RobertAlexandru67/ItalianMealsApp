import React, { useEffect, useState } from "react";
import {
  Text, TouchableOpacity, View,
  ActivityIndicator, Image, ScrollView,
} from "react-native";
import { fetchMealById } from "../services/mealsApi";
import FavoriteButton from "../components/Button";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/style";
import { spacing } from "../theme/colors";

export default function DetailScreen({ route, navigation }: any) {
  const id = route.params?.id;
  const [status, setStatus] = useState<"loading" | "error" | "success">("loading");
  const [meal, setMeal] = useState<any>(null);
  const [message, setMessage] = useState("");
  const { theme } = useTheme();
  const styles = createSharedStyles(theme);

  async function loadMeal() {
    setStatus("loading");
    try {
      const data = await fetchMealById(id);
      if (!data) { setStatus("error"); setMessage("Piatto non trovato"); return; }
      setMeal(data);
      setStatus("success");
    } catch (e: any) {
      setStatus("error");
      setMessage(e.message ?? "Errore di rete");
    }
  }

  useEffect(() => { loadMeal(); }, [id]);

  if (status === "loading") {
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
        <TouchableOpacity style={styles.btn} onPress={loadMeal} accessibilityRole="button">
          <Text style={styles.btnText}>Riprova</Text>
        </TouchableOpacity>
      </View>
    );
  }

  return (
    <ScrollView style={styles.screen} contentContainerStyle={{ padding: spacing.md }}>
      <Image source={{ uri: meal.strMealThumb }} style={{ width: "100%", height: 220, borderRadius: 10 }} />
      <View style={[styles.rowCenter, { marginTop: spacing.sm + spacing.xs }]}>
        <Text
          style={[styles.text, { fontSize: 22, fontWeight: "bold", flex: 1, marginRight: spacing.sm }]}
          accessibilityRole="header"
          maxFontSizeMultiplier={1.4}
        >
          {meal.strMeal}
        </Text>
        <FavoriteButton id={meal.idMeal} label={meal.strMeal} />
      </View>
      <Text style={styles.sectionTitle}>Istruzioni</Text>
      <Text style={[styles.textSecondary, { fontSize: 14, lineHeight: 22 }]}>
        {meal.strInstructions}
      </Text>
      <TouchableOpacity
        style={[styles.btn, { marginTop: spacing.lg }]}
        onPress={() => navigation.goBack()}
        accessibilityRole="button"
        accessibilityLabel="Torna indietro"
      >
        <Text style={styles.btnText}>← Torna indietro</Text>
      </TouchableOpacity>
    </ScrollView>
  );
}