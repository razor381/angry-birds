class FrameThrottler {
  constructor(fps) {
    this.frameInterval = 1000 / fps; //milliseconds
    this.frameCount = 0;
    this.then = window.performance.now();
    this.startTime = this.then;
    this.now = 0;
    this.elapsed = 0;
  }

  shouldRenderNextFrame(newTime) {
    this.now = newTime;
    this.elapsed = this.now - this.then;

    if (this.elapsed > this.frameInterval) {
      this.then = this.now - this.elapsed % this.frameInterval;

      return true;
    }

    return false;
  }

  getFps() {
    const sinceStart = this.now - this.startTime;
    return Math.round(1000 / (sinceStart / ++this.frameCount) * 100) / 100;
  }
}
