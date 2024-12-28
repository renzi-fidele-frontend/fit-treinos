// Fotos
import back from "../assets/bodyparts/back.jpg";
import cardio from "../assets/bodyparts/cardio.jpg";
import chest from "../assets/bodyparts/chest.jpg";
import neck from "../assets/bodyparts/neck.jpg";
import waist from "../assets/bodyparts/waist.jpg";
import shoulders from "../assets/bodyparts/shoulders.jpg";
import lowerArms from "../assets/bodyparts/lower-arms.jpg";
import lowerLegs from "../assets/bodyparts/lower-legs.jpg";
import upperArms from "../assets/bodyparts/upper-arms.jpg";
import upperLegs from "../assets/bodyparts/upper-legs.jpg";

export const fotoDaParteDoCorpo = (parteDoCorpo) => {
   switch (parteDoCorpo) {
      case "back":
         return back;
      case "cardio":
         return cardio;
      case "chest":
         return chest;
      case "lower arms":
         return lowerArms;
      case "lower legs":
         return lowerLegs;
      case "neck":
         return neck;
      case "shoulders":
         return shoulders;
      case "upper arms":
         return upperArms;
      case "upper legs":
         return upperLegs;
      case "waist":
         return waist;
      default:
         return null;
   }
};
