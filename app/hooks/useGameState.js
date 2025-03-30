import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import {
  getCustomCardImages,
  getCustomBackImage,
  DEFAULT_CARD_IMAGES,
  DEFAULT_BACK_IMAGE,
} from "../../utils/storage";
import {
  generateDeck,
  checkForMatch,
  isGameCompleted,
  shuffleCards,
} from "../../utils/gameLogic";

const useGameState = (difficulty = "medium") => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cardImages, setCardImages] = useState(DEFAULT_CARD_IMAGES);
  const [backImage, setBackImage] = useState(DEFAULT_BACK_IMAGE);

  // animation references
  const flipAnimations = useRef({});

  // process the deck to ensure images are correctly formatted
  const processCards = (deck) => {
    return deck.map((card) => {
      console.log(`Processing card ${card.id}, image:`, card.image);

      if (!flipAnimations.current[card.id]) {
        flipAnimations.current[card.id] = new Animated.Value(0);
      }

      return card;
    });
  };

  const initializeGame = async () => {
    setLoading(true);

    try {
      console.log("Default card images count:", DEFAULT_CARD_IMAGES.length);

      const customImages = await getCustomCardImages();
      const customBackImg = await getCustomBackImage();

      console.log("Custom images loaded:", customImages ? "yes" : "no");

      const images = customImages || DEFAULT_CARD_IMAGES;
      const backImg = customBackImg || DEFAULT_BACK_IMAGE;

      console.log("Using back image:", backImg);
      console.log("Number of card images:", images.length);

      setCardImages(images);
      setBackImage(backImg);

      const generatedDeck = generateDeck(images, difficulty);

      const processedDeck = processCards(generatedDeck);

      setCards(processedDeck);
      setFlippedCards([]);
      setMatchedPairs(0);
      setMoves(0);
      setGameCompleted(false);
    } catch (error) {
      console.error("Error initializing game:", error);
    } finally {
      setLoading(false);
    }
  };

  const flipCard = (cardId) => {
    if (flippedCards.length === 2) return;

    const cardIndex = cards.findIndex((card) => card.id === cardId);
    if (cardIndex === -1) {
      console.warn(`Card ${cardId} not found`);
      return;
    }

    const card = cards[cardIndex];
    if (card.isFlipped || card.isMatched) return;

    console.log(`Flipping card ${cardId}, image:`, card.image);

    // Update card state
    const updatedCards = [...cards];
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      isFlipped: true,
    };

    // Animate card flip
    Animated.spring(flipAnimations.current[cardId], {
      toValue: 180,
      friction: 8,
      tension: 10,
      useNativeDriver: true,
    }).start();

    setCards(updatedCards);
    setFlippedCards([...flippedCards, updatedCards[cardIndex]]);
  };

  useEffect(() => {
    if (flippedCards.length === 2) {
      console.log(
        "Checking match between:",
        flippedCards[0].id,
        "and",
        flippedCards[1].id
      );

      setMoves((prevMoves) => prevMoves + 1);

      // a small delay before checking for matches
      const timer = setTimeout(() => {
        const isMatch = checkForMatch(flippedCards);

        console.log("Match result:", isMatch ? "matched" : "not matched");

        const updatedCards = [...cards];

        if (isMatch) {
          // Mark cards as matched
          flippedCards.forEach((flippedCard) => {
            const index = updatedCards.findIndex(
              (card) => card.id === flippedCard.id
            );
            updatedCards[index] = {
              ...updatedCards[index],
              isMatched: true,
            };
          });

          setMatchedPairs((prevPairs) => prevPairs + 1);
        } else {
          // flip cards back
          flippedCards.forEach((flippedCard) => {
            const index = updatedCards.findIndex(
              (card) => card.id === flippedCard.id
            );
            updatedCards[index] = {
              ...updatedCards[index],
              isFlipped: false,
            };

            Animated.spring(flipAnimations.current[flippedCard.id], {
              toValue: 0,
              friction: 8,
              tension: 10,
              useNativeDriver: true,
            }).start();
          });
        }

        setCards(updatedCards);
        setFlippedCards([]);

        if (isMatch && isGameCompleted(updatedCards)) {
          setGameCompleted(true);
        }
      }, 1000);

      return () => clearTimeout(timer);
    }
  }, [flippedCards]);

  useEffect(() => {
    console.log(`Initializing game with difficulty: ${difficulty}`);
    initializeGame();
  }, [difficulty]);

  const shuffleDeck = () => {
    console.log("Shuffling deck");

    // Reset animations
    Object.keys(flipAnimations.current).forEach((key) => {
      flipAnimations.current[key].setValue(0);
    });

    const newDeck = shuffleCards(
      cards.map((card) => ({
        ...card,
        isFlipped: false,
        isMatched: false,
      }))
    );

    const processedDeck = processCards(newDeck);

    setCards(processedDeck);
    setFlippedCards([]);
    setMatchedPairs(0);
    setMoves(0);
    setGameCompleted(false);
  };

  return {
    cards,
    flippedCards,
    matchedPairs,
    moves,
    gameCompleted,
    loading,
    backImage,
    flipAnimations: flipAnimations.current,
    initializeGame,
    flipCard,
    shuffleDeck,
  };
};

export default useGameState;
