import wheelRoller from "../assets/equipamentos/roller.png";

export const fotoEquipamento = (equipamento) => {
   switch (equipamento) {
      case "wheel roller":
         return wheelRoller;
      default:
         return null;
   }
};
