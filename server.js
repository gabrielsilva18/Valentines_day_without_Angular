const express = require("express");
const path = require("path");
const fs = require("fs");
const imageService = require("./services/imageService");
//const musicService = require("./services/musicService");

const app = express();
app.set("view engine", "ejs");
app.use("/public", express.static("public"));
app.use("/assets", express.static("assets"));
app.use("/services", express.static("services"));

// Função para obter imagens aleatórias
function getImage(caminho) {
  const files = fs.readdirSync(caminho);
  const imageUrls = files.map((file) => `/assets/imagens/${file}`);
  return imageUrls;
}

function randomImage(imageUrls) {
  return new Promise((resolve) => {
    if (imageUrls.length === 0) {
      resolve([]);
    } else {
      const selectedIndexes = new Set();
      const randomImages = [];
      while (randomImages.length < imageUrls.length) {
        const randomIndex = Math.floor(Math.random() * imageUrls.length);
        if (!selectedIndexes.has(randomIndex)) {
          selectedIndexes.add(randomIndex);
          const imageUrl = imageUrls[randomIndex];
          randomImages.push(imageUrl);
        }
      }
      console.log(imageUrls);
      resolve(randomImages);
    }
  });
}

function getRandomImage(caminho) {
  const files = getImage(caminho);
  return randomImage(files);
}

// Nova rota API para obter imagens aleatórias
app.get("/api/random-images", async (req, res) => {
  try {
    const caminho = path.join(__dirname, "assets/imagens/");
    const images = await getRandomImage(caminho);
    res.json(images);
  } catch (error) {
    console.error("Erro ao listar imagens:", error);
    res.status(500).send("Erro ao listar imagens");
  }
});

// Rota principal
app.get("/", async (req, res) => {
  try {
    const imageUrls = await imageService.getRandomImage(`./assets/imagens/`);
    console.log(imageUrls);
    res.render("index", { imageUrls: imageUrls });
  } catch (error) {
    console.error("Erro ao listar imagens:", error); // Log do erro
    res.status(500).send("Erro ao listar imagens"); // Resposta de erro
  }
});

app.listen(3000, () => {
  console.log("Servidor Node.js rodando na porta 3000");
});
