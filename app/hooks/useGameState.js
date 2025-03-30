import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import {
  getCustomCardImages,
  getCustomBackImage,
  DEFAULT_CARD_IMAGES,
  DEFAULT_BACK_IMAGE,
  MARIO_BACK_IMAGE,
  MARIO_CARD_IMAGES,
} from "../../utils/storage";
import {
  generateDeck,
  checkForMatch,
  isGameCompleted,
  shuffleCards,
} from "../../utils/gameLogic";

const useGameState = (difficulty = "medium", theme = "default") => {
  const [cards, setCards] = useState([]);
  const [currentTheme, setCurrentTheme] = useState(theme);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cardImages, setCardImages] = useState(DEFAULT_CARD_IMAGES);
  const [backImage, setBackImage] = useState(DEFAULT_BACK_IMAGE);

  const getThemeAssets = (themeName) => {
    switch (themeName) {
      case "mario":
        return {
          cardImages: MARIO_CARD_IMAGES,
          backImage: MARIO_BACK_IMAGE,
        };
      case "default":
        return {
          cardImages: DEFAULT_CARD_IMAGES,
          backImage: DEFAULT_BACK_IMAGE,
        };
      default:
        return {
          cardImages: DEFAULT_CARD_IMAGES,
          backImage: DEFAULT_BACK_IMAGE,
        };
    }
  };
  // animation references
  const flipAnimations = useRef({});

  // process the deck to ensure images are correctly formatted
  const processCards = (deck) => {
    return deck.map((card) => {
      if (!flipAnimations.current[card.id]) {
        flipAnimations.current[card.id] = new Animated.Value(0);
      }

      return card;
    });
  };

  const initializeGame = async () => {
    setLoading(true);

    try {
      const themeAssets = getThemeAssets(currentTheme);

      const customImages = await getCustomCardImages();
      const customBackImg = await getCustomBackImage();

      const images = customImages || themeAssets.cardImages;
      const backImg = customBackImg || themeAssets.backImage;

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

  const changeTheme = (newTheme) => {
    setCurrentTheme(newTheme);
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
  }, [difficulty, currentTheme]);

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
    currentTheme,
    changeTheme,
  };
};

export default useGameState;
