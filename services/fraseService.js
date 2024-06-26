const frasesService = {
  frases: [],
  usedFrases: [],
  apiUrl: "../public/frases_carinhosas.json",

  init: function () {
    fetch(this.apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.frases = this.removerDuplicatas(data.frases);
      })
      .catch((error) => {
        console.error("Erro ao carregar frases:", error);
        this.frases = [];
      });
  },

  getFraseCarinhosaAleatoria: function () {
    if (this.frases.length === 0) {
      return "";
    }

    const randomIndex = Math.floor(Math.random() * this.frases.length);
    const randomFrase = this.frases[randomIndex];

    this.usedFrases.push(randomFrase);
    this.frases.splice(randomIndex, 1);

    return randomFrase;
  },

  removerDuplicatas: function (frases) {
    return frases.filter((frase, index) => frases.indexOf(frase) === index);
  },
};

document.addEventListener("DOMContentLoaded", function () {
  frasesService.init();
});
