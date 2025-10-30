# User Management App (React Native + Firebase)

---

## Giới thiệu
Ứng dụng **User Management** được xây dựng bằng **React Native (Expo)** cho phép **Admin** quản lý người dùng bao gồm:
- Hiện thị danh sách người dùng.
- Thêm, sửa, xóa và xem thông tin chi tiết.
- Hỗ trợ chọn ảnh đại diện cho người dùng (Thay vì sử dụng Storage -> sử dụng URL Local)
- Lưu trữ dữ liệu bằng **Firebase FireStore**.

---

## Công nghệ sử dụng
- Ngôn ngữ: **TypeScript**
- Framework: **React Native (Expo)**
- Cơ sở dữ liệu: **Firebase Firestore**
- UI Library: **React Native Paper**
- Navigation: **React Navigation**
- Image Picker: **Expo Image Picker**

---

## Cấu trúc thư mục
userManagement/
│
├── app/
│ ├── screens/
│ │ ├── Login.tsx # Màn hình đăng nhập (Admin)
│ │ ├── List.tsx # Danh sách người dùng
│ │ ├── Details.tsx # Xem chi tiết người dùng
│ │ └── UserForm.tsx # Thêm/Sửa người dùng
│
├── assets/ # Thư mục chứa hình ảnh (nếu có)
├── App.tsx # File điều hướng chính
├── FirebaseConfig.ts # Cấu hình Firebase
├── index.ts
├── package.json
└── tsconfig.json

---

## Các bước thực hiện
### Tạo dự án
1. Khởi tạo
```bash 
npx create-expo-app userManagement -t expo-template-blank-typescript
cd ./userManagement
```

2. Cài đặt thư viện
```bash
# Navigation
npm install @react-navigation/native @react-navigation/native-stack
npx expo install react-native-screens react-native-safe-area-context

# UI
npx expo install react-native-paper

# Image Picker
npx expo install expo-image-picker

npx expo install firebase
```

3. Cấu hình Firebase
B1: Truy cập https://console.firebase.google.com
B2: Tạo Project mới → Thêm ứng dụng Web.
B3: Sao chép cấu hình(**config**) và dán vào file **FirebaseConfig.ts**(create new)

```tsx 
const firebaseConfig = {
  apiKey: "AIzaSyAlVlEX1bb0bkYWOMt23Eple_PlCLbCaNk",
  authDomain: "user-management-app-28ac3.firebaseapp.com",
  projectId: "user-management-app-28ac3",
  storageBucket: "user-management-app-28ac3.firebasestorage.app",
  messagingSenderId: "1044383758539",
  appId: "1:1044383758539:web:490dd231659897aeb5834e",
  measurementId: "G-J07BZCYXVS"
};
```

4. Cấu hình Navigation (**App.tsx**)
* Mô hình của ứng dụng được chia làm 2 phân luồng:
    * Phân luồng Login (màn hình hiển thị đầu tiên sau khi truy cập vào ứng dụng):
    ```tsx
    <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="InsideLayout" component={InsideLayout} options={{ headerShown: false }}/>
        ) : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>}
        
      </Stack.Navigator>
    ```
    ---

    * Phân luồng Inside (sau khi Login vào bên trong ứng dụng)
    ```tsx
    function InsideLayout() {
        return (
            <InsideStack.Navigator>
            <InsideStack.Screen name='User Lists' component={List} />
            <InsideStack.Screen name='UserDetail' component={Details} />
            <InsideStack.Screen name="UserForm" component={UserForm} options={{ title: 'Add / Edit User' }} />
            </InsideStack.Navigator>
        );
    }
    ```

5. Màn hình Login (**Login.tsx**)
![Giao diện đăng kí/đăng nhập](assets/login.jpg)
- Bao gồm 2 trường **email** và **password**
- Đăng nhập/đăng kí thông qua **Firebase Authentication**


6. Màn hình danh sách người dùng (**List.tsx**)
![Giao diện danh sách người dùng](assets/list.jpg)
- Cho phép admin xem, sửa, xóa và thêm user.
- Thông tin users được lưu vào **Firestore Database**


7. Form thêm/sửa người dùng (**UserForm.tsx**)
![Giao diện form thêm người dùng](assets/add.jpg)
![Giao diện form sửa người dùng](assets/edit.jpg)

8. Màn hình chi tiết người dùng (**Details.tsx**)
![Giao diện chi tiết người dùng](assets/view.jpg)