import { View, Text, StyleSheet, TextInput, Button, ActivityIndicator, KeyboardAvoidingView } from 'react-native';
import React, { useState} from 'react';
import { FIREBASE_APP, FIREBASE_AUTH } from '../../FirebaseConfig';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword } from 'firebase/auth';




const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const auth = FIREBASE_AUTH;

    const signIn = async () => {
        setLoading(true);
        try {
            const response = await signInWithEmailAndPassword(auth, email, password);
            console.log('User signed in successfully:', response.user);
            alert('Check your email for verification link.');
        } catch (error: any) {
            console.log('Error signing in:', error);
            alert('Sign-in failed. Please check your credentials and try again.');
        } finally {
            setLoading(false);
        }
    }

    const signUp = async () => {
        setLoading(true);
        try {
            const response = await createUserWithEmailAndPassword(auth, email, password);
            console.log('User signed up successfully:', response.user);
            alert('Account created successfully. Please verify your email before signing in.');
        } catch (error: any) {
            console.log('Error signing up:', error);
            alert('Sign-up failed. Please try again.');
        } finally {
            setLoading(false);
        }
    }

  return (
    <View style={Styles.container}>
        <KeyboardAvoidingView behavior="padding">
            <TextInput value={email} style={Styles.input} placeholder="Email" autoCapitalize="none" onChangeText={(text) => setEmail(text)}></TextInput>
            <TextInput value={password} style={Styles.input} placeholder="Password" secureTextEntry={true} onChangeText={(text) => setPassword(text)}></TextInput>

            {loading ? (
                <ActivityIndicator size="large" color="#0000ff" />
            ) : (
                <>
                    <Button title="Login" onPress={signIn} />
                    <Button title="Create Account" onPress={signUp} />
                </>
            )
            }
        </KeyboardAvoidingView>
    </View>
  )
}

export default Login;

const Styles = StyleSheet.create({
    container: {
        marginHorizontal: 20,
        flex: 1,
        justifyContent: 'center'
    },
    input: {
        marginVertical: 4,
        height: 50,
        borderWidth: 1,
        borderRadius: 4,
        padding: 10,
        backgroundColor: '#fff'
    }
});