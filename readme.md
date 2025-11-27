# 🎬 Movie Explorer — Trabalho Final (React + TypeScript)

Aplicação desenvolvida como projeto final da disciplina **Front-end Frameworks**, utilizando **React.js com TypeScript**, componentização, hooks, rotas, Context API e integração com API externa (TMDB).

## 📌 1. Objetivo do Projeto

Criar uma aplicação web completa que permita:

- Listar filmes
- Pesquisar filmes
- Visualizar detalhes
- Favoritar e desfavoritar filmes
- Adicionar filmes manualmente
- Consumir dados de API externa
- Navegar entre múltiplas páginas

---

## 🧱 2. Tecnologias Utilizadas

- React.js + TypeScript
- Vite
- React Router DOM
- Context API
- TMDB API
- Hooks do React
- CSS

---

## 📂 3. Estrutura Principal do Projeto

```
src/
│── components/
│── pages/
│── context/
│── hooks/
│── services/
│── types/
```

---

## 🧭 4. Como Rodar o Projeto

### 1️⃣ Instalar dependências
```
npm install
```

### 2️⃣ Rodar o servidor
```
npm run dev
```

### 3️⃣ Acessar no navegador:
```
http://localhost:5173/
```

---

## 📑 5. Páginas da Aplicação

- Home
- Movies
- MovieDetails
- Favorites
- AddMovie
- About

---

## 🧩 6. Componentes Funcionais

- Header
- Footer
- MovieCard
- MovieList
- FavoriteButton
- SearchBar
- Entre outros

---

## 🪝 7. Hooks Utilizados

- useState  
- useEffect  
- useContext  
- useMemo  
- Custom Hook (useMovies)  
- useParams  

---

## 🔌 8. Integração com API (TMDB)

A aplicação consome dados reais através dos arquivos:

- `services/api.ts`
- `services/tmdb.ts`

---

## 🧠 9. Context API

Gerencia os filmes favoritos no arquivo:

```
context/FavoritesContext.tsx
```

---

## 📷 10. Prints da Aplicação

(Adicionar antes da entrega)

---

## 📦 11. Build para Produção

```
npm run build
```

---

## ✔ 12. Conclusão

Este projeto atende a **todos os requisitos obrigatórios** do trabalho e ainda conta com integração real com API para pontuação extra.

Pronto para ser enviado ao GitHub e para apresentação.
