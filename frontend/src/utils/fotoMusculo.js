import biceps from "../assets/musculos/biceps.jpg";
import forearms from "../assets/musculos/forearms.jpg";
import abductors from "../assets/musculos/abductors.jpg";
import abs from "../assets/musculos/abs.jpg";
import adductors from "../assets/musculos/adductors.jpg";
import calves from "../assets/musculos/calves.jpg";
import cardiovascularSystem from "../assets/musculos/cardiovascular-system.jpg";
import delts from "../assets/musculos/delts.jpg";
import glutes from "../assets/musculos/glutes.jpg";
import hamstrings from "../assets/musculos/hamstrings.jpg";
import lats from "../assets/musculos/lats.jpg";
import levatorScapulae from "../assets/musculos/levator-scapulae.jpg";
import pectorals from "../assets/musculos/pectorals.jpg";
import quads from "../assets/musculos/quads.jpg";
import serratusAnterior from "../assets/musculos/serratus-anterior.jpg";
import spine from "../assets/musculos/spine.jpg";
import traps from "../assets/musculos/traps.jpg";
import triceps from "../assets/musculos/triceps.jpg";
import upperBack from "../assets/musculos/upper-back.jpg";

export const fotoMusculo = (equipamento) => {
   switch (equipamento) {
      case "biceps":
         return biceps;
      case "forearms":
         return forearms;
      case "adductors":
         return adductors;
      case "abductors":
         return abductors;
      case "abs":
         return abs;
      case "calves":
         return calves;
      case "delts":
         return delts;
      case "glutes":
         return glutes;
      case "lats":
         return lats;
      case "triceps":
         return triceps;
      case "spine":
         return spine;
      case "traps":
         return traps;
      case "quads":
         return quads;
      case "pectorals":
         return pectorals;
      case "hamstrings":
         return hamstrings;
      case "cardiovascular system":
         return cardiovascularSystem;
      case "levator scapulae":
         return levatorScapulae;
      case "upper back":
         return upperBack;
      case "serratus anterior":
         return serratusAnterior;
      default:
         return null;
   }
};
