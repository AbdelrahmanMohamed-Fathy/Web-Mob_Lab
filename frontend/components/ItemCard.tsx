import { View, Text, StyleSheet, TouchableOpacity } from "react-native";

interface ItemCardProps {
  addToBasket: () => void;
  name: String;
  description: String;
}

export function ItemCard({ addToBasket, name, description }: ItemCardProps) {
  return (
    <View style={styles.container}>
      <Text id="ItemName" style={styles.TextName}>
        {name}
      </Text>
      <Text id="ItemDescription" style={styles.TextDescription}>
        {description}
      </Text>
      <TouchableOpacity style={styles.AddButton} onPress={addToBasket}>
        <Text style={styles.AddButtonText}>Add To Cart</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "45%",
    height: "15%",
    margin: 10,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#e6ffff",
  },
  TextName: {
    fontSize: 40,
    fontWeight: "900",
  },
  TextDescription: {
    fontSize: 25,
    fontWeight: "100",
    marginBottom: 20,
  },
  AddButton: {
    width: "50%",
    height: "15%",
    backgroundColor: "#00cc99",
    borderWidth: 1,
    borderRadius: 10,
    borderColor: "#33adff",
    justifyContent: "center",
    alignItems: "center",
  },
  AddButtonText: {
    color: "#fff",
  },
});
