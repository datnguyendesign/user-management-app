import React from "react";
import { View, Image } from "react-native";
import { Text } from "react-native-paper";

export default function UserDetail({ route }:any) {
  const { user } = route.params;

  return (
    <View style={{ flex: 1, alignItems: "center", padding: 20 }}>
      <Image
        source={{ uri: user.imageUrl }}
        style={{ width: 150, height: 150, borderRadius: 75, marginBottom: 20 }}
      />
      <Text variant="titleLarge">{user.username}</Text>
      <Text>{user.email}</Text>
      <Text>Mật khẩu: {user.password}</Text>
    </View>
  );
}
