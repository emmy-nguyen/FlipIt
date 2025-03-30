export const generateDeck = (cardImages, difficulty = "medium") => {
  let pairs;
  switch (difficulty) {
    case "easy":
      pairs = 4;
      break;
    case "medium":
      pairs = 6;
      break;
    case "hard":
      pairs = 8;
      break;
    default:
      pairs = 6;
  }

  const availableImages = cardImages.slice(
    0,
    Math.min(pairs, cardImages.length)
  );

  let cards = [];
  for (let i = 0; i < pairs; i++) {
    const imageIndex = i % availableImages.length;
    const image = availableImages[imageIndex];

    cards.push(
      {
        id: `card_${i}_a`,
        image: image,
        value: i,
        isFlipped: false,
        isMatched: false,
      },
      {
        id: `card_${i}_b`,
        image: image,
        value: i,
        isFlipped: false,
        isMatched: false,
      }
    );
  }
  return shuffleCards(cards);
};

export const checkForMatch = (flippedCards) => {
  if (flippedCards.length !== 2) return false;
  return flippedCards[0].value === flippedCards[1].value;
};

export const isGameCompleted = (cards) => {
  return cards.every((card) => card.isMatched);
};

export const shuffleCards = (cards) => {
  const newCards = [...cards];
  for (let i = newCards.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [newCards[i], newCards[j]] = [newCards[j], newCards[i]];
  }
  return newCards;
};
