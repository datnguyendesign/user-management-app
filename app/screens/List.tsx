import React, { useEffect, useState } from "react";
import { View, FlatList, Image, TouchableOpacity } from "react-native";
import { Text, FAB, Card, IconButton } from "react-native-paper";
import { collection, getDocs, deleteDoc, doc } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";

export default function UserListScreen({ navigation }: any) {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
    const data = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  const handleDelete = async (id: any) => {
    await deleteDoc(doc(FIRESTORE_DB, "users", id));
    fetchUsers();
  };

  useEffect(() => {
    const unsubscribe = navigation.addListener("focus", fetchUsers);
    return unsubscribe;
  }, [navigation]);

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={users}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <Card style={{ marginBottom: 10 }}>
            <Card.Title
              title={item.username}
              subtitle={item.email}
              left={() => (
                <Image
                  source={{ uri: item.imageUrl }}
                  style={{ width: 50, height: 50, borderRadius: 25 }}
                />
              )}
              right={() => (
                <View style={{ flexDirection: "row" }}>
                  <IconButton
                    icon="eye"
                    onPress={() => navigation.navigate("UserDetail", { user: item })}
                  />
                  <IconButton
                    icon="pencil"
                    onPress={() => navigation.navigate("UserForm", { user: item })}
                  />
                  <IconButton
                    icon="delete"
                    onPress={() => handleDelete(item.id)}
                  />
                </View>
              )}
            />
          </Card>
        )}
      />
      <FAB
        style={{ position: "absolute", bottom: 20, right: 20 }}
        icon="plus"
        onPress={() => navigation.navigate("UserForm")}
      />
    </View>
  );
}
