const fs = require("fs");

let imagens = [];

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
          randomImages.push(imageUrl); // O URL da imagem já está correto, não precisa construir o caminho novamente
        }
      }
      console.log(imageUrls);
      resolve(randomImages);
    }
  });
}

function getImage(caminho) {
  const files = fs.readdirSync(caminho);
  //console.log("Arquivos encontrados:", files); // Log dos arquivos encontrados
  const imageUrls = files.map((file) => `${caminho}${file}`);
  return imageUrls;
}

function getRandomImage(caminho) {
  const files = getImage(caminho);
  const randomImages = randomImage(files);
  return randomImages;
}

module.exports = {
  getRandomImage,
};
