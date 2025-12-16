![fit-treinos git](https://github.com/user-attachments/assets/c059adf9-b0ba-4674-9909-ce30a304a827)

# Fit Treinos
Site de ginástica com funcionalidade de controle de treinamentos feito com ReactJs, Bootstrap, NodeJs, Express, MongoDB e integrando diversas Apis do RapidApi.

## Descrição
Este projeto é um site de ginástica com funcionalidade de controle de treinamentos. Ele foi desenvolvido utilizando as seguintes tecnologias:

-  **Frontend**: ReactJs, Bootstrap, Redux Toolkit, Chart.js, React Slick, Tippy.js, React Lightbox e ConfettiJs
-  **Backend**: NodeJs, Express, e Nodemon
-  **Banco de Dados**: MongoDB e Mongoose
-  **APIs e Integrações**: RapidApi, Google Maps, YouTube e Tsparticles
-  **Utilitários**: Axios, Moment.js, i18next (internacionalização), Redux Persist, Bcrypt, Cloudinary, CORS, Dotenv, JSON Web Token, Multer, Passport, Passport Facebook, Passport Google OAuth 20, e UUID

## Esboço do Site
O esboço do design do site pode ser acessado no Figma através do seguinte link: [Esboço do Site no Figma](https://www.figma.com/design/viLtIUD6qFsNJtn8bPz4ZU/Fit-Treinos?node-id=0-1&t=JGMPK3hJ0n3U9IYt-1)

## 📐 Boas Práticas e Estruturação do Código
O projeto segue padrões reconhecidos de arquitetura e desenvolvimento:
- **Estrutura em camadas**: Separação clara entre Frontend, Backend e persistência de dados
- **Componentes reutilizáveis**: Componentes React modularizados e bem encapsulados
- **Padrão MVC**: Organização do código backend seguindo princípios de separação de responsabilidades
- **Variáveis de ambiente**: Uso de .env para configurações sensíveis
- **Validação e segurança**: Implementação de JWT, Bcrypt e CORS
- **Versionamento semântico**: Git com histórico limpo e commits descritivos
- **Responsividade**: Mobile-first approach com Bootstrap e media queries

## 🏋️‍♂️ Funcionalidades

### 📊 Controle e Progresso de Treinamento
-  Rastreamento de progresso com visualização por período (última semana, mês, ano)
-  Estatísticas detalhadas: tempo total, média diária, partes do corpo mais treinadas
-  Histórico completo de treinos realizados

### 🧠 Sessões de Treino
-  Criação e realização de sessões com registro automático de tempo
-  Associação de exercícios às sessões
-  Armazenamento no histórico do usuário

### 🏋️ Biblioteca de Exercícios (1000+)
-  Mais de 1000 exercícios detalhados com descrição, músculos trabalhados e vídeos tutoriais

### 🎯 Filtragem Avançada
-  Filtros por parte do corpo, músculo alvo e tipo de equipamento
-  Seleção visual de músculos e busca intuitiva

### ⭐ Favoritos
-  Salvamento de exercícios e ginásios favoritos
-  Acesso rápido aos itens personalizados

### 🏆 Gamificação
-  Sistema de classificação (Leaderboard) com competição entre usuários
-  Comparação de desempenho e progresso

### 📍 Busca de Ginásios
-  Localização automática com busca em raio de 2km a 10km
-  Visualização no Google Maps com cálculo de distância
-  Contato via WhatsApp e salvamento nos favoritos

### 🔐 Autenticação
-  Cadastro e login com autenticação via Google e Facebook
-  Dados sincronizados com a conta do usuário

### 🌍 Interface
-  Design moderno, responsivo e intuitivo para desktop e mobile

## Licença
Este projeto está licenciado sob a licença MIT.