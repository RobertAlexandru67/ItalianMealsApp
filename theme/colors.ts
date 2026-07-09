export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
};

export type AppTheme = {
  mode: "light" | "dark";
  colors: {
    background: string;
    card: string;
    text: string;
    textSecondary: string;
    border: string;
    primary: string;
    primaryText: string;
    danger: string;
    dangerText: string;
  };
};

export const lightTheme: AppTheme = {
  mode: "light",
  colors: {
    background: "#F2F2F7",
    card: "#FFFFFF",
    text: "#1A1A1A",
    textSecondary: "#666666",
    border: "#E0E0E0",
    primary: "#e74c3c",
    primaryText: "#FFFFFF",
    danger: "#D63B3B",
    dangerText: "#FFFFFF",
  },
};

export const darkTheme: AppTheme = {
  mode: "dark",
  colors: {
    background: "#121212",
    card: "#1E1E1E",
    text: "#F2F2F2",
    textSecondary: "#AAAAAA",
    border: "#333333",
    primary: "#ff6b5b",
    primaryText: "#1A1A1A",
    danger: "#e05555",
    dangerText: "#1A1A1A",
  },
};