const musicService = {
  audio: new Audio("../assets/VMZ - Saturno 💫 _ Lyric Vídeo.mp4"),
  isPlaying: false,
  isLoaded: false,

  init: function () {
    this.audio.loop = true;
    this.audio.addEventListener("loadedmetadata", () => {
      this.isLoaded = true;
      if (this.isPlaying) {
        this.audio.play();
      }
    });
  },

  playMusic: function () {
    if (!this.isPlaying && this.isLoaded) {
      this.audio.play();
      this.isPlaying = true;
    }
  },

  pauseMusic: function () {
    if (this.isPlaying) {
      this.audio.pause();
      this.isPlaying = false;
    }
  },

  toggleMusic: function () {
    if (this.isPlaying) {
      this.pauseMusic();
    } else {
      this.playMusic();
    }
  },
};
