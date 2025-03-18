import { Button } from "@react-navigation/elements";
import { DIRECTION_RIGHT } from "hammerjs";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useBasket } from "@/context/basketcontext";

interface BasketCardProps {
  removeFromBasket: (name: String) => void;
  name: String;
  description: String;
}

export function BasketItem({
  removeFromBasket,
  name,
  description,
}: BasketCardProps) {
  return (
    <SafeAreaView style={styles.container}>
      <SafeAreaView>
        <Text style={styles.itemName}>{name}</Text>
        <Text style={styles.itemDescription}>{description}</Text>
      </SafeAreaView>
      <TouchableOpacity
        onPress={() => removeFromBasket(name)}
        style={styles.removeButton}
      >
        <Text>X</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    padding: 6,
    margin: 5,
    backgroundColor: "#e6ffff",
    flexDirection: "row",
    justifyContent: "space-between",
  },
  removeButton: {
    flexDirection: "column",
    justifyContent: "center",
  },
  itemName: {
    fontSize: 20,
    fontWeight: "bold",
  },
  itemDescription: {
    fontSize: 18,
    fontWeight: 300,
  },
});
