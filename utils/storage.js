import AsyncStorage from "@react-native-async-storage/async-storage";

export const DEFAULT_BACK_IMAGE = require("../assets/images/card-back.jpeg");
export const DEFAULT_CARD_IMAGES = [
  require("../assets/images/1.jpeg"),
  require("../assets/images/2.jpeg"),
  require("../assets/images/3.jpeg"),
  require("../assets/images/4.jpeg"),
  require("../assets/images/5.jpeg"),
  require("../assets/images/6.jpeg"),
  require("../assets/images/7.jpeg"),
  require("../assets/images/8.jpeg"),
];

const CUSTOM_CARD_IMAGES_KEY = "flipit_custom_cards";
const CUSTOM_BACK_IMAGE_KEY = "flipit_back_image";

export const saveCustomCardImages = async (imageUris) => {
  try {
    await AsyncStorage.setItem(
      CUSTOM_CARD_IMAGES_KEY,
      JSON.stringify(imageUris)
    );
    return true;
  } catch (error) {
    console.error("Error saving custom card images", error);
    return false;
  }
};

export const saveCustomBackCard = async (imageUri) => {
  try {
    await AsyncStorage.setItem(CUSTOM_BACK_IMAGE_KEY, imageUri);
    return true;
  } catch (error) {
    console.error("Error saving custom back card image", error);
    return null;
  }
};

export const getCustomCardImages = async () => {
  try {
    const customImages = await AsyncStorage.getItem(CUSTOM_CARD_IMAGES_KEY);
    return customImages ? JSON.parse(customImages) : null;
  } catch (error) {
    console.error("Error retrieving custom card images", error);
    return null;
  }
};

export const getCustomBackImage = async () => {
  try {
    const customBackImage = await AsyncStorage.getItem(CUSTOM_BACK_IMAGE_KEY);
    return customBackImage || null;
  } catch (error) {
    console.error("Error retrieving custom back card image", error);
    return null;
  }
};
