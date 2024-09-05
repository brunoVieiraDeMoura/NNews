import NotFound from "../ListLeft/NotFound";

import AnalisesLiterarias from "../ListLeft/AnalisesLiterarias";

import Aventura from "../ListLeft/analise/Aventura";
import AudioBooks from "../ListLeft/analise/AudioBooks";
import AutoAjuda from "../ListLeft/analise/AutoAjuda";
import BiografiaAutobiografia from "../ListLeft/analise/BiografiaAutobiografia";
import Ciencias from "../ListLeft/analise/Ciencias";
import DistopiaUtopia from "../ListLeft/analise/DistopiaUtopia";
import Drama from "../ListLeft/analise/Drama";
import Dramatica from "../ListLeft/analise/Dramatica";
import Ensaios from "../ListLeft/analise/Ensaios";
import Epica from "../ListLeft/analise/Epica";
import Fantasia from "../ListLeft/analise/Fantasia";
import FiccaoCientifica from "../ListLeft/analise/FiccaoCientifica";
import GuiadeViagem from "../ListLeft/analise/GuiadeViagem";
import Haiku from "../ListLeft/analise/Haiku";
import Historia from "../ListLeft/analise/Historia";
import JornalismoLiterario from "../ListLeft/analise/JornalismoLiterario";
import Lirica from "../ListLeft/analise/Lirica";
import ManuaisTutoriais from "../ListLeft/analise/ManuaisTutoriais";
import Memorias from "../ListLeft/analise/Memorias";
import MisterioPolicial from "../ListLeft/analise/MisterioPolicial";
import NegociosEmpreendedorismo from "../ListLeft/analise/NegociosEmpreendedorismo";
import Romance from "../ListLeft/analise/Romance";
import Terror from "../ListLeft/analise/Terror";
import Utopia from "../ListLeft/analise/Utopia";

import Recomendacoes from "../ListLeft/Recomendacoes";

import LivroDaSemana from "../ListLeft/recomendacao/LivroDaSemana";
import NaoPodeFaltar from "../ListLeft/recomendacao/NaoPodeFaltar";
import Achados from "../ListLeft/recomendacao/Achados";

import Textos from "../ListLeft/Textos";

import RomanceAuto from "../ListLeft/textos/RomanceAuto";
import MelancolicoAuto from "../ListLeft/textos/MelancolicoAuto";
import ReflexivoAuto from "../ListLeft/textos/ReflexivoAuto";

import Escritores from "../ListLeft/Escritores";

import Perfil from "./../ListRight/Perfil";

import Dashboard from "../../pages/dashboard/Dashboard";
import Entrar from "./../../pages/register/Entrar";
import Registrar from "./../../pages/register/Registrar";
import ListDashBoard from "../../pages/editList/ListDashBoard";

const routeComponentMap = {
  "/analise-literaria": AnalisesLiterarias,
  "/analise-literaria/aventura": Aventura,
  "/analise-literaria/audiobooks": AudioBooks,
  "/analise-literaria/autoajuda": AutoAjuda,
  "/analise-literaria/biografia": BiografiaAutobiografia,
  "/analise-literaria/ciencias": Ciencias,
  "/analise-literaria/distopia": DistopiaUtopia,
  "/analise-literaria/drama": Drama,
  "/analise-literaria/dramatica": Dramatica,
  "/analise-literaria/ensaios": Ensaios,
  "/analise-literaria/epica": Epica,
  "/analise-literaria/fantasia": Fantasia,
  "/analise-literaria/ficcao": FiccaoCientifica,
  "/analise-literaria/guia-de-viagem": GuiadeViagem,
  "/analise-literaria/haiku": Haiku,
  "/analise-literaria/historia": Historia,
  "/analise-literaria/jornalismo": JornalismoLiterario,
  "/analise-literaria/lirica": Lirica,
  "/analise-literaria/manuais": ManuaisTutoriais,
  "/analise-literaria/memorias": Memorias,
  "/analise-literaria/misterio": MisterioPolicial,
  "/analise-literaria/negocios": NegociosEmpreendedorismo,
  "/analise-literaria/romance": Romance,
  "/analise-literaria/terror": Terror,
  "/analise-literaria/utopia": Utopia,
  "/recomendacoes": Recomendacoes,
  "/recomendacoes/livro-da-semana": LivroDaSemana,
  "/recomendacoes/nao-pode-faltar": NaoPodeFaltar,
  "/recomendacoes/achados": Achados,
  "/textos": Textos,
  "/textos/romance": RomanceAuto,
  "/textos/melancolico": MelancolicoAuto,
  "/textos/reflexivo": ReflexivoAuto,
  "/escritores": Escritores,
  "/perfil": Perfil,
  "/configuracoes": ListDashBoard,
  "/notfound": NotFound,
  "/entrar": Entrar,
  "/registrar": Registrar,
  "/dashboard": Dashboard,
};

export default routeComponentMap;
