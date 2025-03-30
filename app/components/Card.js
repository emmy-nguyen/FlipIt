import React from "react";
import {
  StyleShee,
  TouchableOpacity,
  Image,
  Animated,
  View,
} from "react-native";
import { Dimensions } from "react-native";

const { width } = Dimensions.get("window");
const cardSize = width * 0.2;

const Card = ({
  id,
  image,
  backImage,
  isFlipped,
  isMatched,
  onPress,
  animationValue,
}) => {
  const frontInterpolate = animationValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["0deg", "180deg"],
  });
  const backInterpolate = animationValue.interpolate({
    inputRange: [0, 180],
    outputRange: ["180deg", "360deg"],
  });

  const frontAnimatedStyle = {
    transform: [{ rotateY: frontInterpolate }],
  };
  const backAnimatedStyle = {
    transform: [{ rotateY: backInterpolate }],
  };

  const cardStyle = isMatched ? [styles.card, styles.matchedCard] : styles.card;

  return (
    <TouchableOpacity
      styles={styles.container}
      onPress={() => onPress(id)}
      disabled={isFlipped || isMatched}
    >
      <Animated.View
        style={[cardStyle, frontAnimatedStyle, isFlipped && { opacity: 0 }]}
      >
        <Image source={backImage} style={styles.cardImage} resizeMode="cover" />
      </Animated.View>

      <Animated.View
        style={[
          cardStyle,
          styles.cardBack,
          backAnimatedStyle,
          !isFlipped && { opacity: 0 },
        ]}
      >
        <Image source={image} style={styles.cardImage} resizeMode="cover" />
      </Animated.View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    margin: 5,
    width: cardSize,
    height: cardSize * 1.5,
    borderRadius: 10,
  },
  card: {
    height: "100%",
    width: "100%",
    backgroundColor: "#fff",
    borderRadius: 10,
    position: "absolute",
    backfaceVisibility: "hidden",
    overflow: "hidden",
    elevation: 5,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
  },
  cardBack: {
    backgroundColor: "#fff",
  },
  cardImage: {
    width: "100%",
    height: "100%",
    borderRadius: 10,
  },
  matchedCard: {
    borderWidth: 2,
    borderColor: "#4caf50",
    opacity: 0.7,
  },
  placeholder: {
    backgroundColor: "#f0f0f0",
    justifyContent: "center",
    alignItems: "center",
  },
  placeholderText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
  },
});

export default Card;
