import Lightbox from "yet-another-react-lightbox";
import "yet-another-react-lightbox/styles.css";
// Plugins
import Fullscreen from "yet-another-react-lightbox/plugins/fullscreen";
import Slideshow from "yet-another-react-lightbox/plugins/slideshow";
import Zoom from "yet-another-react-lightbox/plugins/zoom";
import Thumbnails from "yet-another-react-lightbox/plugins/thumbnails";
import "yet-another-react-lightbox/plugins/thumbnails.css";

const LightBoxDeFotos = ({ mostrar, fotos, onClose }) => {
   return <Lightbox close={onClose} open={mostrar} slides={fotos?.map((v) => ({ src: v?.getUrl() }))} plugins={[Fullscreen, Slideshow, Zoom, Thumbnails]}  />;
};
export default LightBoxDeFotos;
