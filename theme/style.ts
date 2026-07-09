import { StyleSheet } from "react-native";
import { AppTheme, spacing } from "./colors";

export function createSharedStyles(theme: AppTheme) {
  const { colors } = theme;

  return StyleSheet.create({
    screen: {
      flex: 1,
      backgroundColor: colors.background,
    },
    center: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
    },
    rowCenter: {
      flexDirection: "row",
      alignItems: "center",
      justifyContent: "space-between",
    },
    flatListContent: {
      padding: spacing.md,
    },
    listItem: {
      backgroundColor: colors.card,
      borderRadius: 10,
      marginBottom: spacing.md,
      overflow: "hidden",
      elevation: 2,
      shadowColor: "#000",
      shadowOpacity: 0.08,
      shadowRadius: 4,
      shadowOffset: { width: 0, height: 2 },
    },
    listItemHalf: {
      flex: 1,
      marginHorizontal: spacing.xs,
    },
    columnWrapper: {
      paddingHorizontal: spacing.sm,
    },
    thumb: {
      width: "100%",
      height: 160,
      backgroundColor: colors.border,
    },
    listTitle: {
      fontSize: 16,
      fontWeight: "bold",
      flex: 1,
      marginRight: spacing.sm,
      color: colors.text,
    },
    sectionTitle: {
      fontSize: 16,
      fontWeight: "bold",
      marginTop: spacing.md,
      marginBottom: spacing.xs,
      color: colors.primary,
    },
    screenTitle: {
      fontSize: 28,
      fontWeight: "700",
      padding: spacing.md,
      color: colors.text,
    },
    text: {
      color: colors.text,
    },
    textSecondary: {
      color: colors.textSecondary,
    },
    error: {
      fontSize: 16,
      color: "#e74c3c",
      marginBottom: spacing.md,
      textAlign: "center",
    },
    btn: {
      backgroundColor: colors.primary,
      padding: 14,
      borderRadius: 8,
      alignItems: "center",
    },
    btnText: {
      color: colors.primaryText,
      fontWeight: "bold",
    },
    pressedFeedback: {
      opacity: 0.6,
    },
    emptyState: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
      padding: spacing.lg,
    },
    emptyText: {
      color: colors.textSecondary,
      textAlign: "center",
      fontSize: 15,
    },
    card: {
      backgroundColor: colors.card,
      borderRadius: 10,
      paddingHorizontal: spacing.md,
      paddingVertical: spacing.sm + spacing.xs,
      marginBottom: spacing.sm + spacing.xs,
      elevation: 2,
    },
    input: {
      borderWidth: 1,
      borderColor: colors.border,
      borderRadius: 8,
      padding: 12,
      marginBottom: spacing.xs,
      fontSize: 16,
      color: colors.text,
      backgroundColor: colors.card,
    },
  });
}