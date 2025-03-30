import React, { useState, useEffect } from "react";
import {
  View,
  StyleSheet,
  Text,
  TouchableOpacity,
  Modal,
  Animated,
  Dimensions,
} from "react-native";

const CongratulationsModal = ({ visible, moves, onClose }) => {
  const [animation] = useState(new Animated.Value(0));
  const { width, height } = Dimensions.get("window");

  useEffect(() => {
    if (visible) {
      animation.setValue(0);
      Animated.sequence([
        Animated.timing(animation, {
          toValue: 1,
          duration: 500,
          useNativeDriver: true,
        }),
        Animated.spring(animation, {
          toValue: 1.05,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }),
        Animated.spring(animation, {
          toValue: 1,
          friction: 8,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [visible, animation]);

  const modalStyle = {
    transform: [
      {
        scale: animation.interpolate({
          inputRange: [0, 1],
          outputRange: [0.5, 1],
        }),
      },
    ],
    opacity: animation.interpolate({
      inputRange: [0, 1],
      outputRange: [0, 1],
    }),
  };

  const confettiItems = Array.from({ length: 40 }, (_, i) => {
    const size = Math.random() * 10 + 5;
    const rotateVal = Math.random() * 360;
    const color = [
      "#FFD700", // gold
      "#FF6347", // tomato
      "#4682B4", // steel blue
      "#32CD32", // lime green
      "#FF69B4", // hot pink
      "#9370DB", // medium purple
    ][Math.floor(Math.random() * 6)];
    return (
      <View
        key={i}
        style={{
          position: "absolute",
          width: size,
          height: size,
          backgroundColor: color,
          borderRadius: size / 2,
          top: Math.random() * height * 0.5,
          left: Math.random() * width * 0.8 + width * 0.1,
          transform: [{ rotate: `${rotateVal}deg` }],
        }}
      />
    );
  });

  return (
    <Modal
      transparent={true}
      visible={visible}
      animationType="none"
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        {confettiItems}
        <Animated.View style={[styles.modalContainer, modalStyle]}>
          <Text style={styles.congratsTitle}>Congratulations!</Text>
          <Text style={styles.congratsText}>
            You completed the game in {moves} moves!
          </Text>
          <View style={styles.starContainer}>
            {/* Star rating based on moves */}
            {Array.from({ length: moves <= 20 ? 3 : moves <= 30 ? 2 : 1 }).map(
              (_, i) => (
                <Text key={i} style={styles.starIcon}>
                  ⭐
                </Text>
              )
            )}
          </View>
          <TouchableOpacity style={styles.playAgainButton} onPress={onClose}>
            <Text style={styles.playAgainText}>Play Again</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: "rgba(0, 0, 0, 0.7)",
    justifyContent: "center",
    alignItems: "center",
  },
  modalContainer: {
    width: "80%",
    backgroundColor: "white",
    borderRadius: 20,
    padding: 20,
    alignItems: "center",
    elevation: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 6 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
  },
  congratsTitle: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 15,
    textAlign: "center",
  },
  congratsText: {
    fontSize: 16,
    color: "#555",
    marginBottom: 20,
    textAlign: "center",
  },
  starContainer: {
    flexDirection: "row",
    marginBottom: 20,
    justifyContent: "center",
  },
  starIcon: {
    fontSize: 30,
    marginHorizontal: 5,
  },
  playAgainButton: {
    backgroundColor: "#34495e",
    paddingVertical: 12,
    paddingHorizontal: 30,
    borderRadius: 25,
    elevation: 3,
  },
  playAgainText: {
    color: "white",
    fontSize: 16,
    fontWeight: "bold",
  },
});

export default CongratulationsModal;
