import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Login from './app/screens/Login';
import List from './app/screens/List';
import Details from './app/screens/Details';
import UserForm from './app/screens/UserForm';
import UserStats from './app/screens/UserStats';
import { useEffect, useState } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { FIREBASE_AUTH } from './FirebaseConfig';

const Stack = createNativeStackNavigator();

const InsideStack = createNativeStackNavigator();

function InsideLayout() {
  return (
    <InsideStack.Navigator>
      <InsideStack.Screen name='User Lists' component={List} />
      <InsideStack.Screen name='UserDetail' component={Details} />
      <InsideStack.Screen name="UserForm" component={UserForm} options={{ title: 'Add / Edit User' }} />
      <InsideStack.Screen name="UserStats" component={UserStats} options={{ title: 'User Statistics' }} />
    </InsideStack.Navigator>
  );
}

export default function App() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    onAuthStateChanged(FIREBASE_AUTH, (User) => {
      console.log('User', User);
      setUser(User);
    });
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        {user ? (
          <Stack.Screen name="InsideLayout" component={InsideLayout} options={{ headerShown: false }}/>
        ) : <Stack.Screen name="Login" component={Login} options={{ headerShown: false }}/>}
        
      </Stack.Navigator>
    </NavigationContainer>
  );
}