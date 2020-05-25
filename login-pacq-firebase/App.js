import React from 'react';
import firebase from "firebase/app";
require('firebase/auth');
import { Container, Item, Form, Input, Button, Label } from "native-base";
import { StyleSheet, Text, View, TextInput, TouchableOpacity } from 'react-native';
import * as Facebook from "expo-facebook";
import expo from 'expo';

var firebaseConfig = {
  apiKey: "AIzaSyApP1vZYLV337XZeiSkpsQjfphWfsb6bQ8",
  authDomain: "pacq-a5b54.firebaseapp.com",
  databaseURL: "https://pacq-a5b54.firebaseio.com",
  projectId: "pacq-a5b54",
  storageBucket: "pacq-a5b54.appspot.com",
  messagingSenderId: "974713837919",
  appId: "1:974713837919:web:97deb3483b29c0f9533eea",
  measurementId: "G-LRB62ZR9R4"
};
// Initialize Firebase
if (firebase.apps.length === 0) {
  firebase.initializeApp(firebaseConfig);
}








export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
      password: ""
    };
  }

  
  SignUp = (email, password) => {
    try {
      firebase
          .auth()
          .createUserWithEmailAndPassword(email, password)
          .then(user => { 
                 console.log(user);
           });
} catch (error) {
      console.log(error.toString(error));
    }
  };

  Login = (email, password) => {
    try {
      firebase
         .auth()
         .signInWithEmailAndPassword(email, password)
         .then(res => {
             console.log(res.user.email);
      });
} catch (error) {
      console.log(error.toString(error));
    }
  };

  async Facebooklogin() {

    const appId = '1:974713837919:web:97deb3483b29c0f9533eea';
    const permissions = ['public_profile', 'email'];
    const appName = ['React-Login'] 

    await Facebook.initializeAsync(appId | undefined, appName | undefined);


const { type, token } = await 
    
    
Expo.Facebook.logInWithReadPermissionsAsync(
       appId,
             { permissions }
);

if (type == "success") {
  const credential =   
    firebase
      .auth
      .FacebookAuthProvider
      .credential(token);
}

firebase
   .auth().signInWithCredential(credential).catch(error => {
       console.log(error);
   });
}

componentDidMount() {
  firebase.auth().onAuthStateChanged(user => {
    if (user != null) {
        console.log(user);
    }
  });

  

  }

  


  


  render() 
  {
  return (

    
    <Container>
      <Form>
    <Item floatingLabel>
            <Label>Email</Label>
            <Input
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={email => this.setState({ email })}
            />
          </Item>
          <Item floatingLabel>
            <Label>Password</Label>
            <Input
              secureTextEntry={true}
              autoCapitalize="none"
              autoCorrect={false}
              onChangeText={password => this.setState({ password })}
            />
        </Item>
        <Button style={{marginTop: 10}}
        full
        rounded
        success
        onPress={() => this.LogIn(this.state.email, this.state.password)}>
          <Text>Login</Text>
        </Button>
        <Button style={{ marginTop: 10 }} 
        full 
        rounded 
        primary
        onPress={() => this.SignUp(this.state.email, this.state.password)}> 
        <Text>Signup</Text>
</Button>
<Button full rounded style={{ marginTop: 10}}
onPress={() => this.Facebooklogin()}>
  <Text>Login with Facebook</Text>
</Button>
      </Form>
    </Container>

    
  );
  
  }
  
}

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: '#fff',
    justifyContent: 'center',
    padding: 10,
  },
});


