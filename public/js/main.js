document.addEventListener("DOMContentLoaded", function () {
  const photoContainer = document.getElementById("photoContainer");
  const menuButton = document.getElementById("menuButton");
  const floatingMenu = document.getElementById("floatingMenu");
  const updatePhotosButton = document.getElementById("updatePhotosButton");
  const updatePhraseButton = document.getElementById("updatePhraseButton");
  const musicControlButton = document.getElementById("musicControlButton");

  let textoBotaoFotos = "Mostrar Fotos";
  let menuOpen = false;
  let isPlaying = false; // Inicialize como false para garantir que a música não comece automaticamente

  async function getRandomImage() {
    const response = await fetch("/api/random-images");
    return response.json();
  }

  // Função para atualizar as imagens
  async function setValuesToComponent() {
    const imageUrls = await getRandomImage();
    photoContainer.innerHTML = ""; // Limpar o container de fotos
    imageUrls.forEach((url) => {
      const imgElement = document.createElement("img");
      imgElement.src = url;
      imgElement.alt = "Imagem do Card";
      photoContainer.appendChild(imgElement);
    });
  }

  // Função para atualizar a frase carinhosa
  function setFraseCarinhosa() {
    const fraseCarinhosaElement = document.getElementById("fraseCarinhosa");
    const novaFrase = frasesService.getFraseCarinhosaAleatoria();
    fraseCarinhosaElement.textContent = novaFrase; // Atualiza com a frase aleatória
  }

  function atualizarFrases() {
    setFraseCarinhosa();
    if (updatePhraseButton.textContent.trim() === "Mostrar Frases") {
      updatePhraseButton.textContent = "Atualizar Frases";
    }
  }

  // Função para atualizar as fotos
  function atualizarFotos() {
    setValuesToComponent();
    if (updatePhotosButton.textContent.trim() === "Mostrar Fotos") {
      updatePhotosButton.textContent = "Atualizar Fotos";
    }
  }

  // Função para alternar o menu
  function toggleMenu() {
    console.log("Menu button clicked");
    menuOpen = !menuOpen;
    floatingMenu.classList.toggle("show", menuOpen);
    console.log("Menu state:", menuOpen);
  }

  // Função para controlar a música
  function musicControl() {
    // Verifica se a música está tocando
    if (isPlaying) {
      musicService.pauseMusic(); // Pausa a música
      isPlaying = false; // Atualiza o estado de reprodução
      musicControlButton.textContent = "Play Music"; // Altera o texto do botão para "Play Music"
    } else {
      musicService.playMusic(); // Toca a música
      isPlaying = true; // Atualiza o estado de reprodução
      musicControlButton.textContent = "Pause Music"; // Altera o texto do botão para "Pause Music"
    }
  }

  // Inicialização do serviço de música
  musicService.init();

  // Event listeners para os botões
  musicControlButton.addEventListener("click", musicControl);
  menuButton.addEventListener("click", toggleMenu);
  updatePhotosButton.addEventListener("click", atualizarFotos);
  updatePhraseButton.addEventListener("click", atualizarFrases);

  // Inicialização do componente
  // Remover chamadas para exibir fotos e frases inicialmente
  // setValuesToComponent();
  setFraseCarinhosa();
});
