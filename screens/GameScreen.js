import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  Animated,
} from "react-native";
import Board from "../app/components/Board";
import useGameState from "../app/hooks/useGameState";

const GameScreen = () => {
  const [difficulty, setDifficulty] = useState("medium");

  const {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    gameCompleted,
    loading,
    backImage,
    flipAnimations,
    initializeGame,
    flipCard,
    shuffleDeck,
  } = useGameState(difficulty);

  const changeDifficulty = (newDifficulty) => {
    console.log(`Changing difficulty to ${newDifficulty}`);
    setDifficulty(newDifficulty);
  };

  // Handle game completion
  React.useEffect(() => {
    if (gameCompleted) {
      Alert.alert(
        "Congratulations!",
        `You completed the game in ${moves} moves!`,
        [{ text: "Play Again", onPress: shuffleDeck }]
      );
    }
  }, [gameCompleted, moves, shuffleDeck]);

  // Debug: Log card status
  React.useEffect(() => {
    if (cards.length > 0) {
      console.log("Cards loaded:", cards.length);
      console.log("Sample card image type:", typeof cards[0].image);

      // Import check - log what the card.image actually is
      if (cards[0].image) {
        const imageInfo = cards[0].image;
        console.log("First card image info:", JSON.stringify(imageInfo));
      }
    }
  }, [cards]);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Memory Game</Text>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.button} onPress={shuffleDeck}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.button} onPress={() => {}}>
            <Text style={styles.buttonText}>Setting</Text>
          </TouchableOpacity>
        </View>
      </View>

      <View style={styles.difficultyContainer}>
        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "easy" && styles.activeButton,
          ]}
          onPress={() => changeDifficulty("easy")}
        >
          <Text style={styles.difficultyText}>Easy</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "medium" && styles.activeButton,
          ]}
          onPress={() => changeDifficulty("medium")}
        >
          <Text style={styles.difficultyText}>Medium</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "hard" && styles.activeButton,
          ]}
          onPress={() => changeDifficulty("hard")}
        >
          <Text style={styles.difficultyText}>Hard</Text>
        </TouchableOpacity>
      </View>

      <Board
        cards={cards}
        backImage={backImage}
        flipAnimations={flipAnimations}
        onCardPress={flipCard}
        loading={loading}
        moves={moves}
        matchedPairs={matchedPairs}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#4682B4",
    padding: 16,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "white",
  },
  headerButtons: {
    flexDirection: "row",
  },
  button: {
    marginLeft: 10,
  },
  buttonText: {
    color: "white",
    fontSize: 16,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
    backgroundColor: "#e0e0e0",
  },
  difficultyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#d0d0d0",
  },
  activeButton: {
    backgroundColor: "#4682B4",
  },
  difficultyText: {
    fontWeight: "bold",
    color: "#333",
  },
});

export default GameScreen;
