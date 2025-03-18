import { Component, useState } from "react";
import { ItemCard } from "@/components/ItemCard";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { BasketItem } from "@/components/basketItem";
import { createStackNavigator } from "@react-navigation/stack";
import ItemScreen from "./itemScreen";
import BasketScreen from "./basketScreen";
import { title } from "process";
import { BasketProvider } from "@/context/basketcontext";
import LoginScreen from "./loginScreen";
import RegisterScreen from "./RegisterScreen";
const Stack = createStackNavigator();

export const Host = "http:/192.168.1.108:8080";

export default function App() {
  return (
    <BasketProvider>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={LoginScreen}
          options={{ title: "", headerShown: false }}
        />
        <Stack.Screen
          name="items"
          component={ItemScreen}
          options={{ title: "items", headerShown: true }}
        />
        <Stack.Screen
          name="basket"
          component={BasketScreen}
          options={{ title: "basket", headerShown: true }}
        />
        <Stack.Screen
          name="Register"
          component={RegisterScreen}
          options={{ title: "Register", headerShown: true }}
        />
      </Stack.Navigator>
    </BasketProvider>
  );
}
