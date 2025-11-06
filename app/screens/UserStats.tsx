import React, { useEffect, useState } from "react";
import { View, ScrollView, Dimensions } from "react-native";
import { Text, Card } from "react-native-paper";
import { BarChart, PieChart } from "react-native-chart-kit";
import { collection, getDocs } from "firebase/firestore";
import { FIRESTORE_DB } from "../../FirebaseConfig";

export default function UserStatsScreen() {
  const [users, setUsers] = useState<any[]>([]);

  const fetchUsers = async () => {
    const querySnapshot = await getDocs(collection(FIRESTORE_DB, "users"));
    const data = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    setUsers(data);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const totalUsers = users.length;

  // Giả sử bạn có field 'createdAt' là timestamp trong Firestore
  const monthlyData = new Array(12).fill(0);
  users.forEach((user) => {
    if (user.createdAt) {
      const month = new Date(user.createdAt.seconds * 1000).getMonth();
      monthlyData[month]++;
    }
  });

  const chartData = {
    labels: ["1", "2", "3", "4", "5", "6", "7", "8", "9", "10", "11", "12"],
    datasets: [
      {
        data: monthlyData,
      },
    ],
  };

  // Biểu đồ tròn theo giới tính (nếu có field gender)
  const genderCount = {
    male: users.filter((u) => u.gender === "male").length,
    female: users.filter((u) => u.gender === "female").length,
  };

  const pieData = [
    {
      name: "Nam",
      population: genderCount.male,
      color: "#36A2EB",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
    {
      name: "Nữ",
      population: genderCount.female,
      color: "#FF6384",
      legendFontColor: "#7F7F7F",
      legendFontSize: 14,
    },
  ];

  return (
    <ScrollView style={{ flex: 1, padding: 10 }}>
      <Card style={{ padding: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold" }}>Tổng số người dùng</Text>
        <Text style={{ fontSize: 30, color: "#2196F3", marginTop: 10 }}>{totalUsers}</Text>
      </Card>

      <Card style={{ padding: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Biểu đồ người dùng theo tháng
        </Text>
        <BarChart
          data={chartData}
          width={Dimensions.get("window").width - 40}
          height={220}
          yAxisLabel=""
          yAxisSuffix=""
          chartConfig={{
            backgroundColor: "#fff",
            backgroundGradientFrom: "#fff",
            backgroundGradientTo: "#fff",
            decimalPlaces: 0,
            color: (opacity = 1) => `rgba(33, 150, 243, ${opacity})`,
            labelColor: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          style={{ borderRadius: 8 }}
        />
      </Card>

      <Card style={{ padding: 20, marginBottom: 20 }}>
        <Text style={{ fontSize: 18, fontWeight: "bold", marginBottom: 10 }}>
          Phân bố giới tính
        </Text>
        <PieChart
          data={pieData}
          width={Dimensions.get("window").width - 40}
          height={220}
          accessor="population"
          backgroundColor="transparent"
          paddingLeft="15"
          chartConfig={{
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
          }}
          absolute
        />
      </Card>
    </ScrollView>
  );
}
