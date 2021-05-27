class Sound {

  static async loadTracks(loader) {
    Sound.tracks = {
      THEME: await Utils.loadSound(AUDIO_THEME),
    };

    Sound.checkTracksLoaded(loader);
  }

  static async checkTracksLoaded(loader) {
    await Promise.all(Object.values(Sound.tracks));
    loader.hasSoundLoaded = true;
  }

  static play(sound) {
    const track = Sound.tracks[sound];

    track.currentTime = 0;
    track.play();
  }

  static stop(sound) {
    Sound.tracks[sound].pause();
  }

}
