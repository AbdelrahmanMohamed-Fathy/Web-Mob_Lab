import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { BasketItem } from "@/components/basketItem";
import { useBasket } from "@/context/basketcontext";
import { ScrollView } from "react-native-gesture-handler";

export default function BasketScreen() {
  const { basket, removeFromBasket } = useBasket(); // Use context for basket management

  return (
    <View style={styles.container}>
      {basket.length > 0 ? (
        <ScrollView>
          {basket.map((item) => (
            <BasketItem
              key={item.id}
              name={item.name}
              description={item.description}
              removeFromBasket={()=>removeFromBasket(item.name)}
            />
          ))}
        </ScrollView>
      ) : (
        <Text style={styles.emptyText}>Your basket is empty!</Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
  },
  emptyText: {
    fontSize: 18,
    color: "#888",
    textAlign: "center",
    marginTop: 20,
  },
});
