import React from "react";
import { useState, useEffect, useRef } from "react";
import {
  View,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
  Text,
  Animated,
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
  currentTheme,
  difficulty,
}) => {
  // const [seconds, setSeconds] = useState(0);
  // const timerRef = useRef(null);

  // const prevThemeRef = useRef(currentTheme);
  // const prevDifficultyRef = useRef(difficulty);

  // useEffect(() => {
  //   const themeChanged = prevThemeRef.current !== currentTheme;
  //   const difficultyChanged = prevDifficultyRef.current !== difficulty;

  //   prevThemeRef.current = currentTheme;
  //   prevDifficultyRef.current = difficulty;

  //   if (themeChanged || difficultyChanged) {
  //     setSeconds(0);
  //   }

  //   if (timerRef.current) {
  //     clearInterval(timerRef.current);
  //   }
  //   timerRef.current = setInterval(() => {
  //     setSeconds((prevSeconds) => prevSeconds + 1);
  //   }, 1000);

  //   return () => {
  //     if (timerRef.current) {
  //       clearInterval(timerRef.current);
  //     }
  //   };
  // }, [currentTheme, difficulty]);

  // const formatTime = (totalSeconds) => {
  //   const minutes = Math.floor(totalSeconds / 60);
  //   const seconds = totalSeconds % 60;
  //   return `${minutes.toString().padStart(2, "0")}:${seconds
  //     .toString()
  //     .padStart(2, "0")}`;
  // };

  // useEffect(() => {
  //   console.log("Board rendering with cards:", cards.length);
  //   console.log("First card data:", cards[0]);
  //   console.log("Back image:", backImage);
  // }, [cards, backImage]);

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
        {/* <Text style={styles.statsText}>Time: {formatTime(seconds)}</Text> */}
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
