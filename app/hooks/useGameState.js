import { useState, useEffect, useRef } from "react";
import { Animated } from "react-native";
import {
  DEFAULT_CARD_IMAGES,
  DEFAULT_BACK_IMAGE,
  getCustomCardImages,
  getCustomBackImage,
} from "../../utils/storage";
import { checkforMatch, generateDeck } from "../../utils/gameLogic";

const useGameState = (difficulty = "medium") => {
  const [cards, setCards] = useState([]);
  const [flippedCards, setFlippedCards] = useState([]);
  const [matchedPairs, setMatchedPairs] = useState(0);
  const [moves, setMoves] = useState(0);
  const [gameCompleted, setGameCompleted] = useState(false);
  const [loading, setLoading] = useState(true);

  const [cardImages, setCardImages] = useState(DEFAULT_CARD_IMAGES);
  const [backImage, setBackImage] = useState(DEFAULT_BACK_IMAGE);

  const flipAnimations = useRef({});

  const processCards = (deck) => {
    // Ensure all card animations are initialized
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
      const customImages = await getCustomCardImages();
      const customBackImage = await getCustomBackImage();

      const images = customImages || DEFAULT_CARD_IMAGES;
      const backImage = customBackImage || DEFAULT_BACK_IMAGE;

      setCardImages(images);
      setBackImage(backImage);

      const generatedDeck = generateDeck(images, difficulty);
      const processedDeck = processCards(generatedDeck);

      // Update state with the new cards
      setCards(processedDeck);
      setFlippedCards([]);
      setMatchedCard(0);
      setMoves(0);
      setGameCompleted(false);
    } catch (err) {
      console.error("Error initializing game", err);
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

    const updatedCards = [...cards];
    updatedCards[cardIndex] = {
      ...updatedCards[cardIndex],
      isFlipped: true,
    };

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
      setMoves((prevMoves) => prevMoves + 1);
      const timer = setTimeout(() => {
        const isMatch = checkforMatch(flippedCards);
        const updatedCards = [...cards];

        if (isMatch) {
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

  // when difficulty changes
  useEffect(() => {
    initializeGame();
  }, [difficulty]);
  const shuffleDeck = () => {
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
