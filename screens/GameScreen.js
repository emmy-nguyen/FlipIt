import React, { useState } from "react";
import {
  View,
  StyleSheet,
  TouchableOpacity,
  Text,
  SafeAreaView,
  Alert,
  Animated,
  Modal,
  TouchableWithoutFeedback,
} from "react-native";
import Board from "../app/components/Board";
import useGameState from "../app/hooks/useGameState";

const GameScreen = () => {
  const [difficulty, setDifficulty] = useState("medium");
  const [showThemeSelector, setShowThemeSelector] = useState(false);

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
    currentTheme,
    changeTheme,
  } = useGameState(difficulty, "default");

  const handleThemeChange = (newTheme) => {
    changeTheme(newTheme);
    setShowThemeSelector(false);
  };
  const changeDifficulty = (newDifficulty) => {
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

  React.useEffect(() => {
    if (cards.length > 0) {
      // Import check - log what the card.image actually is
      if (cards[0].image) {
        const imageInfo = cards[0].image;
        console.log("First card image info:", JSON.stringify(imageInfo));
      }
    }
  }, [cards]);

  const themes = ["default", "mario"];
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <View style={styles.headerButtons}>
          <TouchableOpacity style={styles.button} onPress={shuffleDeck}>
            <Text style={styles.buttonText}>Shuffle</Text>
          </TouchableOpacity>
          <View style={styles.themeDropdownContainer}>
            <TouchableOpacity
              style={styles.themeButton}
              onPress={() => setShowThemeSelector(!showThemeSelector)}
            >
              <Text style={styles.buttonText}>Change Theme</Text>
            </TouchableOpacity>

            {showThemeSelector && (
              <View style={styles.themeDropdown}>
                {themes.map((theme) => (
                  <TouchableOpacity
                    key={theme}
                    style={[
                      styles.themeOption,
                      currentTheme === theme && styles.activeThemeOption,
                    ]}
                    onPress={() => handleThemeChange(theme)}
                  >
                    <Text
                      style={[
                        styles.themeOptionText,
                        currentTheme === theme && styles.activeThemeOptionText,
                      ]}
                    >
                      {theme.charAt(0).toUpperCase() + theme.slice(1)}
                    </Text>
                  </TouchableOpacity>
                ))}
                {/* <ThemeSelector
                  currentTheme={currentTheme}
                  onThemeSelect={handleThemeChange}
                /> */}
              </View>
            )}
          </View>
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
          <Text
            style={[
              styles.difficultyText,
              difficulty === "easy" && styles.activeButtonText,
            ]}
          >
            Easy
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "medium" && styles.activeButton,
          ]}
          onPress={() => changeDifficulty("medium")}
        >
          <Text
            style={[
              styles.difficultyText,
              difficulty === "medium" && styles.activeButtonText,
            ]}
          >
            Medium
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.difficultyButton,
            difficulty === "hard" && styles.activeButton,
          ]}
          onPress={() => changeDifficulty("hard")}
        >
          <Text
            style={[
              styles.difficultyText,
              difficulty === "hard" && styles.activeButtonText,
            ]}
          >
            Hard
          </Text>
        </TouchableOpacity>
      </View>

      {showThemeSelector && (
        <TouchableWithoutFeedback onPress={() => setShowThemeSelector(false)}>
          <View style={styles.touchableOverlay} />
        </TouchableWithoutFeedback>
      )}

      <Board
        cards={cards}
        backImage={backImage}
        flipAnimations={flipAnimations}
        onCardPress={flipCard}
        loading={loading}
        moves={moves}
        matchedPairs={matchedPairs}
        currentTheme={currentTheme}
        difficulty={difficulty}
        gameCompleted={gameCompleted}
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
    padding: 16,
    flexDirection: "row",
    justifyContent: "flex-end",
    alignItems: "center",
    zIndex: 9,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#34495e",
  },
  headerButtons: {
    flexDirection: "row",
    zIndex: 9,
  },
  button: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  buttonText: {
    color: "#34495e",
    fontSize: 16,
  },
  difficultyContainer: {
    flexDirection: "row",
    justifyContent: "center",
    paddingVertical: 10,
  },
  difficultyButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    marginHorizontal: 5,
    borderRadius: 20,
    backgroundColor: "#ffff",
  },
  activeButton: {
    backgroundColor: "#000000",
  },
  activeButtonText: {
    color: "#ffffff",
  },
  difficultyText: {
    fontWeight: "bold",
    color: "#333",
  },
  themeDropdownContainer: {
    position: "relative",
    zIndex: 10,
  },
  themeDropdown: {
    position: "absolute",
    top: "100%",
    right: 0,
    width: 150,
    backgroundColor: "white",
    borderRadius: 5,
    borderWidth: 1,
    borderColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 8,
    zIndex: 11,
  },
  themeOption: {
    paddingVertical: 10,
    paddingHorizontal: 15,
    borderBottomWidth: 1,
    borderBottomColor: "#eee",
  },
  themeButton: {
    marginLeft: 10,
    paddingVertical: 8,
    paddingHorizontal: 12,
  },
  activeThemeOption: {
    backgroundColor: "#f0f0f0",
  },
  themeOptionText: {
    fontSize: 14,
    color: "#333",
  },
  activeThemeOptionText: {
    fontWeight: "bold",
  },
});

export default GameScreen;
