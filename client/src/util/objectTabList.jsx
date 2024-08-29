const routeTabList = [
  {
    label: "Análises Literárias",
    path: "/analise-literaria",
    hasSubList: true,
    subLists: [
      { label: "Aventura", path: "/analise-literaria/aventura" },
      { label: "AudioBooks", path: "/analise-literaria/audiobooks" },
      { label: "Autoajuda", path: "/analise-literaria/autoajuda" },
      {
        label: "Biografia/Autobiografia",
        path: "/analise-literaria/biografia",
      },
      { label: "Ciências", path: "/analise-literaria/ciencias" },
      { label: "Distopia/Utopia", path: "/analise-literaria/distopia" },
      { label: "Drama", path: "/analise-literaria/drama" },
      { label: "Dramática", path: "/analise-literaria/dramatica" },
      { label: "Ensaios", path: "/analise-literaria/ensaios" },
      { label: "Épica", path: "/analise-literaria/epica" },
      { label: "Fantasia", path: "/analise-literaria/fantasia" },
      { label: "Ficção Científica", path: "/analise-literaria/ficcao" },
      { label: "Guia de Viagem", path: "/analise-literaria/guia-de-viagem" },
      { label: "Haiku", path: "/analise-literaria/haiku" },
      { label: "História", path: "/analise-literaria/historia" },
      { label: "Jornalismo Literário", path: "/analise-literaria/jornalismo" },
      { label: "Lírica", path: "/analise-literaria/lirica" },
      { label: "Manuais/Tutoriais", path: "/analise-literaria/manuais" },
      { label: "Memórias", path: "/analise-literaria/memorias" },
      { label: "Mistério/Policial", path: "/analise-literaria/misterio" },
      {
        label: "Negócios/Empreendedorismo",
        path: "/analise-literaria/negocios",
      },
      { label: "Romance", path: "/analise-literaria/romance" },
      { label: "Terror", path: "/analise-literaria/terror" },
    ],
  },
  {
    label: "Recomendações",
    path: "/recomendacoes",
    hasSubList: true,
    subLists: [
      { label: "Livro da Semana", path: "/recomendacoes/livro-da-semana" },
      { label: "Não Pode Faltar", path: "/recomendacoes/nao-pode-faltar" },
      { label: "Achados", path: "/recomendacoes/achados" },
    ],
  },
  {
    label: "Textos",
    path: "/textos",
    hasSubList: true,
    subLists: [
      { label: "Romance", path: "/textos/romance" },
      { label: "Melancólico", path: "/textos/melancolico" },
      { label: "Reflexivo", path: "/textos/reflexivo" },
    ],
  },
  { label: "Escritores", path: "/escritores", hasSubList: false },
];

export default routeTabList;
