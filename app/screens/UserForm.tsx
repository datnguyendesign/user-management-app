import React, { useState } from "react";
import { View, Image, TouchableOpacity, Alert } from "react-native";
import { TextInput, Button } from "react-native-paper";
import * as ImagePicker from "expo-image-picker";
import { FIRESTORE_DB } from "../../FirebaseConfig";
import { collection, addDoc, updateDoc, doc } from "firebase/firestore";

export default function UserFormScreen({ route, navigation }:any) {
  const user = route.params?.user;
  const [username, setUsername] = useState(user?.username || "");
  const [email, setEmail] = useState(user?.email || "");
  const [password, setPassword] = useState(user?.password || "");
  const [image, setImage] = useState(user?.imageUrl || null);

  // 📸 Chọn ảnh từ thư viện
  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (status !== "granted") {
      Alert.alert("Lỗi", "Vui lòng cho phép quyền truy cập ảnh.");
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 0.8,
    });

    if (!result.canceled) {
      setImage(result.assets[0].uri);
    }
  };

  // 💾 Lưu thông tin người dùng (chỉ lưu link URI)
  const handleSave = async () => {
    if (!username || !email || !password) {
      Alert.alert("Lỗi", "Vui lòng nhập đầy đủ thông tin!");
      return;
    }

    try {
      const userData = {
        username,
        email,
        password,
        imageUrl: image, // lưu URI local
      };

      if (user) {
        await updateDoc(doc(FIRESTORE_DB, "users", user.id), userData);
        Alert.alert("Thành công", "Cập nhật người dùng thành công!");
      } else {
        await addDoc(collection(FIRESTORE_DB, "users"), userData);
        Alert.alert("Thành công", "Thêm người dùng mới thành công!");
      }

      navigation.goBack();
    } catch (error) {
      console.error("Lỗi khi lưu:", error);
      Alert.alert("Lỗi", "Không thể lưu dữ liệu người dùng!");
    }
  };

  return (
    <View style={{ flex: 1, padding: 20 }}>
      <TouchableOpacity
        onPress={pickImage}
        style={{ alignSelf: "center", marginBottom: 20 }}
      >
        {image ? (
          <Image
            source={{ uri: image }}
            style={{ width: 120, height: 120, borderRadius: 60 }}
          />
        ) : (
          <Button mode="outlined">Chọn ảnh</Button>
        )}
      </TouchableOpacity>

      <TextInput
        label="Username"
        value={username}
        onChangeText={setUsername}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Email"
        value={email}
        onChangeText={setEmail}
        style={{ marginBottom: 10 }}
      />
      <TextInput
        label="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={{ marginBottom: 10 }}
      />

      <Button mode="contained" onPress={handleSave}>
        {user ? "Cập nhật" : "Thêm mới"}
      </Button>
    </View>
  );
}
