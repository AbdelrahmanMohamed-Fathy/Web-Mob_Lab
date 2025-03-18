import { useIsFocused, useNavigation } from "@react-navigation/native";
import { useState, useEffect } from "react";
import { useBasket } from "@/context/basketcontext";
import {
  Text,
  TextInput,
  TouchableHighlight,
  TouchableOpacity,
  View,
  StyleSheet,
} from "react-native";
import { Host } from ".";
import { useFocusEffect } from "expo-router";

export default function LoginScreen({ navigation }: { navigation: any }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { clearBasket } = useBasket();
  const isFocused = useIsFocused();
  useEffect(() => {
    clearBasket();
  }, [isFocused]);

  async function signIn() {
    if (username == "" && password == "") {
      alert("Kindly provide any info!");
    } else if (username == "") {
      alert("Kindly provide a username!");
    } else if (password == "") {
      alert("Kindly provide a password!");
    } else {
      await fetch(Host + "/login", {
        method: "POST",
        headers: { "Content-type": "application/json; charset=UTF-8" },
        body: JSON.stringify({ username: username, password: password }),
      })
        .then((res) => {
          if (res.status >= 200 && res.status <= 299) {
            return res.json();
          } else {
            throw Error("invalid credentials");
          }
        })
        .then((res) => {
          navigation.navigate("items");
        })
        .catch((err) => {
          console.log(err);
          alert(err);
        });
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Welcome!</Text>
      <TextInput
        value={username}
        id="username"
        placeholder="Username..."
        onChangeText={setUsername}
        style={styles.text}
      ></TextInput>
      <TextInput
        value={password}
        id="password"
        placeholder="Password..."
        secureTextEntry={true}
        onChangeText={setPassword}
        style={styles.text}
      ></TextInput>
      <TouchableHighlight onPress={signIn} style={styles.submit}>
        <Text>Login</Text>
      </TouchableHighlight>
      <TouchableOpacity
        style={styles.Register}
        onPress={() => navigation.navigate("Register")}
      >
        <Text>Join Now</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
  },

  title: {
    fontSize: 30,
    fontWeight: "700",
    margin: 20,
  },

  text: {
    width: 200,
    height: 40,
    padding: 10,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 50,
    margin: 5,
  },

  submit: {
    backgroundColor: "#3498db",
    margin: 10,
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  Register: {
    fontStyle: "italic",
    color: "#3498db",
    fontWeight: "bold",
    margin: 10,
  },

  warningInvisible: {},

  warningVisible: {},
});
