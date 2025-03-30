import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
} from "react-native";
import Card from "./Card";

const { width } = Dimensions.get("window");
const Board = ({
  cards,
  backImage,
  flipAnimations,
  onCardPress,
  loading,
  moves,
  matchedPairs,
}) => {
  useEffect(() => {
    console.log("Board rendering with cards:", cards.length);
    console.log("First card data:", cards[0]);
    console.log("Back image:", backImage);
  }, [cards, backImage]);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
        <Text style={styles.loadingText}>Loading game...</Text>
      </View>
    );
  }

  const handleCardPress = (cardId) => {
    console.log("Flipping card:", cardId);
    onCardPress(cardId);
  };

  return (
    <View style={styles.container}>
      <View style={styles.statsContainer}>
        <Text style={styles.statsText}>Moves: {moves}</Text>
        <Text style={styles.statsText}>Matches: {matchedPairs}</Text>
      </View>

      <View style={[styles.board, { width: width * 0.9 }]}>
        {cards.map((card) => {
          // Debug: Log each card's image props
          console.log(
            `Card ${card.id} - image: ${card.image ? "exists" : "missing"}`
          );

          return (
            <Card
              key={card.id}
              id={card.id}
              image={card.image}
              backImage={backImage}
              isFlipped={card.isFlipped}
              isMatched={card.isMatched}
              onPress={handleCardPress}
              animationValue={flipAnimations[card.id] || new Animated.Value(0)}
            />
          );
        })}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    padding: 10,
  },
  loadingContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
  },
  loadingText: {
    marginTop: 10,
    fontSize: 16,
  },
  board: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
    alignItems: "center",
  },
  statsContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  statsText: {
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default Board;
