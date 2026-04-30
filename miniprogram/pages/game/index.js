function createCells() {
  const indices = Array.from({ length: 16 }).map((_, index) => index);

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = indices[index];
    indices[index] = indices[randomIndex];
    indices[randomIndex] = temp;
  }

  const realIndex = indices[0];

  return Array.from({ length: 16 }).map((_, index) => ({
    id: `old-man-${index}`,
    isReal: index === realIndex,
    isRemoved: false,
    isClicked: false,
    isShaking: false,
    reaction: '',
    flowerDelay: `${(index % 4) * 40}ms`
  }));
}

Page({
  data: {
    cells: [],
    gameOver: false,
    showResult: false,
    resultText: '你了，必须喝酒',
    hitPanorama: false
  },

  onLoad() {
    this.resetGame();
  },

  resetGame() {
    this.setData({
      cells: createCells(),
      gameOver: false,
      showResult: false,
      hitPanorama: false
    });
  },

  handleCellTap(event) {
    if (this.data.gameOver) {
      return;
    }

    const { index } = event.currentTarget.dataset;
    const cells = this.data.cells.slice();
    const target = cells[index];

    if (!target || target.isRemoved || target.isClicked) {
      return;
    }

    target.isClicked = true;
    target.isShaking = true;
    target.reaction = target.isReal ? 'cheers' : (Math.random() > 0.5 ? 'boom' : 'flower');

    this.setData({ cells });

    setTimeout(() => {
      const nextCells = this.data.cells.slice();
      const current = nextCells[index];

      if (!current) {
        return;
      }

      current.isShaking = false;

      if (current.isReal) {
        this.setData({
          cells: nextCells,
          gameOver: true,
          hitPanorama: true
        });

        setTimeout(() => {
          this.setData({
            showResult: true
          });
        }, 900);
        return;
      }

      current.isRemoved = true;
      this.setData({
        cells: nextCells
      });
    }, 220);
  },

  handleOverlayTap() {
    if (!this.data.showResult) {
      return;
    }

    this.resetGame();
  }
});
