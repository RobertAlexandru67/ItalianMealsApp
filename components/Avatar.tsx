import React from 'react';
import { View, Text, Image } from 'react-native';

interface AvatarProps {
  uri: string;
  size?: number;
}

export default function Avatar({ uri, size = 48 }: AvatarProps) {
  const [failed, setFailed] = React.useState(false);
  const radius = size / 2;

  return (
    <View
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        overflow: "hidden",
        borderWidth: 1,
      }}
    >
      {failed ? (
        <Text style={{ textAlign: "center", lineHeight: size }}>?</Text>
      ) : (
        <Image
          source={{ uri }}
          style={{ width: size, height: size }}
          onError={() => setFailed(true)}
          accessibilityLabel="Avatar utente"
        />
      )}
    </View>
  );
}