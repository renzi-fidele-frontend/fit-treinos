import biceps from "../assets/musculos/biceps.webp";
import forearms from "../assets/musculos/forearms.webp";

export const fotoMusculo = (equipamento) => {
   switch (equipamento) {
      case "biceps":
         return biceps;
      case "forearms":
         return forearms;
      default:
         return null;
   }
};
