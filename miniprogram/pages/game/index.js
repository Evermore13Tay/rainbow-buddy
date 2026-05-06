const MBTI_OLD_MEN = [
  {
    type: 'INTJ',
    groupClass: 'group-purple',
    expressionClass: 'expression-deadpan',
    shapeClass: 'shape-flat shape-bald shape-beard',
    prop: '♟',
    propSide: 'right',
    resultName: 'INTJ 军师爷',
    missText: 'INTJ 早就算到你点错了。'
  },
  {
    type: 'INTP',
    groupClass: 'group-purple',
    expressionClass: 'expression-panic',
    shapeClass: 'shape-tall shape-spike',
    prop: '🧠',
    propSide: 'left',
    bubble: '?',
    resultName: 'INTP 漏洞爷',
    missText: 'INTP 说先定义一下什么叫点中。'
  },
  {
    type: 'ENTJ',
    groupClass: 'group-purple',
    expressionClass: 'expression-boss',
    shapeClass: 'shape-wide shape-flat shape-crown shape-darkhair',
    prop: '📣',
    propSide: 'right',
    bubble: '♛',
    resultName: 'ENTJ 老板爷',
    missText: 'ENTJ 说下一轮听他指挥。'
  },
  {
    type: 'ENTP',
    groupClass: 'group-purple',
    expressionClass: 'expression-troll',
    shapeClass: 'shape-round shape-horns shape-spike',
    prop: '🎲',
    propSide: 'left',
    bubble: '!',
    resultName: 'ENTP 抬杠爷',
    missText: 'ENTP 不是不喝，是质疑规则。'
  },
  {
    type: 'INFJ',
    groupClass: 'group-green',
    expressionClass: 'expression-deadpan',
    shapeClass: 'shape-tall shape-bald shape-beard',
    prop: '🔮',
    propSide: 'right',
    resultName: 'INFJ 预言爷',
    missText: 'INFJ 预感今晚还没轮到他。'
  },
  {
    type: 'INFP',
    groupClass: 'group-green',
    expressionClass: 'expression-cry',
    shapeClass: 'shape-tiny shape-round',
    prop: '💘',
    propSide: 'right',
    hasSweat: true,
    resultName: 'INFP 诗人爷',
    missText: 'INFP 说这不是酒，是命运。'
  },
  {
    type: 'ENFJ',
    groupClass: 'group-green',
    expressionClass: 'expression-party',
    shapeClass: 'shape-wide shape-hat shape-darkhair',
    prop: '🎤',
    propSide: 'right',
    resultName: 'ENFJ 主持爷',
    missText: 'ENFJ 开始帮全桌找气氛。'
  },
  {
    type: 'ENFP',
    groupClass: 'group-green',
    expressionClass: 'expression-panic',
    shapeClass: 'shape-tall shape-round shape-horns shape-spike',
    prop: '✨',
    propSide: 'right',
    bubble: '♫',
    resultName: 'ENFP 蹦迪爷',
    missText: 'ENFP 说再来一局，他有预感。'
  },
  {
    type: 'ISTJ',
    groupClass: 'group-blue',
    expressionClass: 'expression-deadpan',
    shapeClass: 'shape-flat shape-hat shape-bald',
    prop: '📒',
    propSide: 'right',
    resultName: 'ISTJ 规矩爷',
    missText: 'ISTJ 已经把点错记录进账本。'
  },
  {
    type: 'ISFJ',
    groupClass: 'group-blue',
    expressionClass: 'expression-party',
    shapeClass: 'shape-round shape-beard',
    prop: '🫖',
    propSide: 'right',
    resultName: 'ISFJ 保姆爷',
    missText: 'ISFJ 先给你倒杯热水。'
  },
  {
    type: 'ESTJ',
    groupClass: 'group-blue',
    expressionClass: 'expression-boss',
    shapeClass: 'shape-wide shape-flat shape-crown shape-darkhair',
    prop: '📯',
    propSide: 'right',
    bubble: '!!',
    resultName: 'ESTJ 裁判爷',
    missText: 'ESTJ 说规则就是规则。'
  },
  {
    type: 'ESFJ',
    groupClass: 'group-blue',
    expressionClass: 'expression-party',
    shapeClass: 'shape-round',
    prop: '🥂',
    propSide: 'right',
    resultName: 'ESFJ 社交爷',
    missText: 'ESFJ 已经开始敬下一桌。'
  },
  {
    type: 'ISTP',
    groupClass: 'group-yellow',
    expressionClass: 'expression-troll',
    shapeClass: 'shape-tiny shape-flat shape-darkhair',
    prop: '🔧',
    propSide: 'right',
    resultName: 'ISTP 手艺爷',
    missText: 'ISTP 想把游戏机制拆开看看。'
  },
  {
    type: 'ISFP',
    groupClass: 'group-yellow',
    expressionClass: 'expression-deadpan',
    shapeClass: 'shape-tall shape-spike',
    prop: '🎨',
    propSide: 'right',
    resultName: 'ISFP 艺术爷',
    missText: 'ISFP 说点格子也要讲感觉。'
  },
  {
    type: 'ESTP',
    groupClass: 'group-yellow',
    expressionClass: 'expression-panic',
    shapeClass: 'shape-wide shape-horns shape-darkhair',
    prop: '🎲',
    propSide: 'left',
    bubble: 'GO',
    resultName: 'ESTP 莽夫爷',
    missText: 'ESTP 说别分析，点就完事。'
  },
  {
    type: 'ESFP',
    groupClass: 'group-yellow',
    expressionClass: 'expression-party',
    shapeClass: 'shape-tall shape-round shape-hat shape-spike',
    prop: '🍻',
    propSide: 'right',
    bubble: '♪',
    resultName: 'ESFP 派对爷',
    missText: 'ESFP 说音乐起，先跳一下。'
  }
];

const MBTI_ICON_BASE = '/images/mbti-icons';

function createCells() {
  const indices = Array.from({ length: MBTI_OLD_MEN.length }).map((_, index) => index);

  for (let index = indices.length - 1; index > 0; index -= 1) {
    const randomIndex = Math.floor(Math.random() * (index + 1));
    const temp = indices[index];
    indices[index] = indices[randomIndex];
    indices[randomIndex] = temp;
  }

  const realIndex = indices[0];

  return MBTI_OLD_MEN.map((oldMan, index) => ({
    ...oldMan,
    id: `mbti-old-man-${oldMan.type}`,
    imageSrc: `${MBTI_ICON_BASE}/${oldMan.type}.png`,
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
    remainingCount: 16,
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
      remainingCount: 16,
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
          hitPanorama: true,
          resultText: `今晚被酒杯锁定的是 ${current.resultName}`
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
        cells: nextCells,
        remainingCount: nextCells.filter((cell) => !cell.isRemoved).length
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
