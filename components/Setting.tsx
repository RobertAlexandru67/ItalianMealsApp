import React from "react";
import { StyleSheet, Text, View } from "react-native";
import { useTheme } from "../context/ThemeContext";

interface SettingRowProps {
  label: string;
  right: React.ReactNode;
}

export function SettingRow({ label, right }: SettingRowProps) {
  const { theme } = useTheme();

  return (
    <View
      style={[
        styles.row,
        { backgroundColor: theme.colors.card, borderBottomColor: theme.colors.border },
      ]}
    >
      <Text style={[styles.label, { color: theme.colors.text }]} maxFontSizeMultiplier={1.4}>
        {label}
      </Text>
      {right}
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderBottomWidth: StyleSheet.hairlineWidth,
  },
  label: { fontSize: 16 },
});