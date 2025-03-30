import { ScrollView, Text, View, StyleSheet, Image } from "react-native";

export default function Rule() {
  return (
    <ScrollView
      style={styles.scrollView}
      contentContainerStyle={styles.container}
    >
      <Text style={styles.title}>FlipIt: Memory Card Game Rules</Text>
      <Image
        source={require("../../assets/images/Flipit-logo.png")}
        style={styles.headerImage}
        resizeMode="contain"
      />

      <View style={styles.section}>
        <Text style={styles.subtitle}>Objective:</Text>
        <Text style={styles.text}>
          The goal of FlipIt is to match pairs of cards. You flip two cards at a
          time and try to find a matching pair. The game continues untill all
          pairs are matched. The fewer flips it takes to match all pairs, the
          better!{" "}
        </Text>
        <View style={styles.imageContainer}>
          <View style={styles.cardContainer}>
            <Image
              source={require("../../assets/images/1.jpeg")}
              style={styles.inlineImage}
              resizeMode="contain"
            />
            <Text style={styles.cardLabel}>Front Card</Text>
          </View>
          <View style={styles.cardContainer}>
            <Image
              source={require("../../assets/images/card-back.jpeg")}
              style={styles.inlineImage}
              resizeMode="contain"
            />
            <Text style={styles.cardLabel}>Back Card</Text>
          </View>
        </View>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Levels:</Text>
        <Text style={styles.text}>
          All levels share the same basic rules. Players take turns flipping two
          cards at a time. If they match, the cards remain face-up. If not,
          they're flipped back face-down. The game ends when all pairs are
          matched, with the fewest flips winning.
        </Text>
        <Text style={styles.levelTitle}>1. Easy: 4 pairs (8 cards)</Text>
        <Text style={styles.levelTitle}>2. Medium: 6 pairs (12 cards)</Text>
        <Text style={styles.levelTitle}>3. Hard: 8 pairs (16 cards)</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Strategy:</Text>
        <Text style={styles.text}>
          Remember the locations of previously seen cards. A good memory and the
          ability to track card positions are key to winning with fewer flips{" "}
        </Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Game Variations:</Text>
        <Text style={styles.boldText}>Time Challenge (Comming soon)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  scrollView: {
    flex: 1,
    backgroundColor: "#f9f9f9",
  },
  container: {
    padding: 20,
  },
  section: {
    marginBottom: 15,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    textAlign: "center",
    marginBottom: 20,
    color: "#2c3e50",
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginVertical: 10,
    color: "#3498db",
  },
  levelTitle: {
    fontSize: 16,
    fontWeight: "600",
    marginVertical: 5,
    color: "#2c3e50",
  },
  boldText: {
    fontSize: 16,
    fontWeight: "600",
    marginTop: 10,
    marginBottom: 5,
    color: "#2c3e50",
  },
  text: {
    fontSize: 16,
    lineHeight: 24,
    color: "#34495e",
    marginBottom: 10,
  },
  imageContainer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    marginVertical: 15,
    width: "100%",
  },
  cardContainer: {
    alignItems: "center",
    width: "45%",
  },
  inlineImage: {
    width: "90%",
    height: 150,
    marginBottom: 8,
  },
  cardLabel: {
    fontSize: 14,
    fontWeight: "500",
    textAlign: "center",
    color: "#34495e",
  },
  headerImage: {
    width: "100%",
    height: 120,
    marginBottom: 20,
  },
});
