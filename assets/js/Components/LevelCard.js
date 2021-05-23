class LevelClass {
  constructor(level, stars, totalScore, achievedScore) {
    this.level = level;
    this.stars = stars;
    this.totalScore = totalScore;
    this.achievedScore = achievedScore;
  }

  static getLevelsData() {
    const levelCards = [];

    for (let i = 1; i <= LEVELS_NUMBER; i++) {
      levelCards.push(new LevelClass(i, 2, 100, 50));
    }

    return levelCards;
  }
}
