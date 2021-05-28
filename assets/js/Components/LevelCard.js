class LevelCard {
  constructor(level, stars, totalScore, achievedScore) {
    this.level = level;
    this.stars = stars;
    this.totalScore = totalScore;
    this.achievedScore = achievedScore;
  }

  static getLevelCards(levelsData) {

    return levelsData.map(({ level, stars, totalScore, achievedScore }) => {
      return new LevelCard(level, stars, totalScore, achievedScore);
    });
  }
}
