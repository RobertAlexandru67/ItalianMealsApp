import React, { useState } from "react";
import { Pressable, Switch, Text, TextInput, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { SettingRow } from "../components/Setting";
import { useFavorites } from "../context/Context";
import { useTheme } from "../context/ThemeContext";
import { createSharedStyles } from "../theme/style";
import { spacing } from "../theme/colors";

type ProfileScreenProps = {
  navigation: any;
};

export default function ProfileScreen({ navigation }: ProfileScreenProps) {
  const [name, setName] = useState("");
  const [notifications, setNotifications] = useState(true);
  const { favoriteIds } = useFavorites();
  const { theme, isDark, toggleTheme } = useTheme();
  const styles = createSharedStyles(theme);

  const nameTooShort = name.length > 0 && name.length < 2;

  function handleLogout() {
    navigation.reset({
      index: 0,
      routes: [{ name: "Login" }],
    });
  }

  return (
    <SafeAreaView style={styles.screen}>
      <Text style={styles.screenTitle} accessibilityRole="header" maxFontSizeMultiplier={1.4}>
        Profilo
      </Text>

      <SettingRow
        label="Name"
        right={
          <TextInput
            value={name}
            onChangeText={setName}
            placeholder="Your name"
            placeholderTextColor={theme.colors.textSecondary}
            style={{
              borderWidth: 1,
              borderColor: nameTooShort ? theme.colors.danger : theme.colors.border,
              borderRadius: 8,
              padding: 6,
              width: 140,
              textAlign: "right",
              color: theme.colors.text,
            }}
          />
        }
      />
      {nameTooShort && (
        <Text
          style={{ color: theme.colors.danger, fontSize: 12, paddingHorizontal: spacing.md }}
        >
          Name is too short
        </Text>
      )}

      <SettingRow
        label="Notifications"
        right={<Switch value={notifications} onValueChange={setNotifications} />}
      />

      {/* Lab 19: toggle tema scuro persistito via ThemeContext */}
      <SettingRow
        label="Tema scuro"
        right={
          <Switch
            value={isDark}
            onValueChange={toggleTheme}
            accessibilityLabel="Attiva o disattiva il tema scuro"
          />
        }
      />

      <SettingRow
        label="Preferiti salvati"
        right={
          <Text style={{ color: theme.colors.text, fontWeight: "600" }} maxFontSizeMultiplier={1.4}>
            {favoriteIds.length}
          </Text>
        }
      />

      <SettingRow
        label="Logout"
        right={
          <Pressable
            style={({ pressed }) => [
              {
                paddingVertical: 8,
                paddingHorizontal: 12,
                borderRadius: 8,
                backgroundColor: theme.colors.danger,
              },
              pressed && styles.pressedFeedback,
            ]}
            onPress={handleLogout}
            accessibilityRole="button"
            accessibilityLabel="Esegui logout"
          >
            <Text style={{ color: theme.colors.dangerText, fontWeight: "600" }}>Log out</Text>
          </Pressable>
        }
      />
    </SafeAreaView>
  );
}