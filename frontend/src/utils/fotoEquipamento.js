import wheelRoller from "../assets/equipamentos/roller.png";
import assisted from "../assets/equipamentos/assisted.png";
import band from "../assets/equipamentos/band.png";
import barbell from "../assets/equipamentos/barbell.png";
import bodyWeight from "../assets/equipamentos/body-weight.png";
import bosuBall from "../assets/equipamentos/bosu-ball.png";
import cable from "../assets/equipamentos/cable.png";
import dumbbell from "../assets/equipamentos/dumbbell.png";
import ellipticalMachine from "../assets/equipamentos/elliptical-machine.png";
import ezBarbell from "../assets/equipamentos/ez-barbell.png";
import hammer from "../assets/equipamentos/hammer.png";
import kettlebell from "../assets/equipamentos/kettlebell.png";
import leverageMachine from "../assets/equipamentos/leverage-machine.png";
import medicineBall from "../assets/equipamentos/medicine-ball.png";
import olympicBarbell from "../assets/equipamentos/olympic-barbell.png";
import resistanceBand from "../assets/equipamentos/resistance-band.png";
import rope from "../assets/equipamentos/rope.png";
import skiergMachine from "../assets/equipamentos/skierg-machine.png";
import sledMachine from "../assets/equipamentos/sled-machine.png";
import smithMachine from "../assets/equipamentos/smith-machine.png";
import stabilityBall from "../assets/equipamentos/stability-ball.png";
import stationaryBike from "../assets/equipamentos/stationary-bike.png";
import tire from "../assets/equipamentos/tire.png";
import trapBar from "../assets/equipamentos/trap-bar.png";
import upperBodyErgometer from "../assets/equipamentos/upper-body-ergometer.png";
import weighted from "../assets/equipamentos/weighted.png";

export const fotoEquipamento = (equipamento) => {
   switch (equipamento) {
      case "assisted":
         return assisted;
      case "band":
         return band;
      case "barbell":
         return barbell;
      case "body weight":
         return bodyWeight;
      case "bosu ball":
         return bosuBall;
      case "cable":
         return cable;
      case "dumbbell":
         return dumbbell;
      case "elliptical machine":
         return ellipticalMachine;
      case "ez barbell":
         return ezBarbell;
      case "hammer":
         return hammer;
      case "kettlebell":
         return kettlebell;
      case "leverage machine":
         return leverageMachine;
      case "medicine ball":
         return medicineBall;
      case "olympic barbell":
         return olympicBarbell;
      case "resistance band":
         return resistanceBand;
      case "roller":
         return wheelRoller;
      case "rope":
         return rope;
      case "skierg machine":
         return skiergMachine;
      case "sled machine":
         return sledMachine;
      case "smith machine":
         return smithMachine;
      case "stability ball":
         return stabilityBall;
      case "stationary bike":
         return stationaryBike;
      case "tire":
         return tire;
      case "trap bar":
         return trapBar;
      case "upper body ergometer":
         return upperBodyErgometer;
      case "weighted":
         return weighted;
      default:
         return null;
   }
};
