const AGE_OPTIONS = ['18-22', '23-26', '27-30', '31+'];

const PROFILE_TAGS = [
  '第一次来',
  '想认识人',
  '想放松',
  '只喝酒不社交',
  '社恐友好',
  '慢节奏'
];

const EVENTS = [
  {
    id: 'evt-001',
    mode: 'official',
    title: '微醺聊天局',
    barName: 'Moonroom Bar',
    city: '上海',
    district: '静安',
    startTime: '周五 21:00',
    dateText: '4月25日',
    joinedCount: 12,
    capacity: 18,
    priceText: '人均 88 左右',
    atmosphere: '轻社交 / 新人友好 / 不催酒',
    tags: ['新人局', '社恐友好', '慢节奏'],
    participants: [
      { id: 'u-11', label: 'L', color: '#FF8BA7' },
      { id: 'u-12', label: 'A', color: '#7A5CFF' },
      { id: 'u-13', label: 'M', color: '#4FC3F7' },
      { id: 'u-14', label: 'K', color: '#F6BD60' }
    ],
    description: '先在安静前厅集合，熟悉之后再统一进场。适合第一次出来玩、想先把尴尬感放低的人。',
    rules: [
      '建议提前 10 分钟到达',
      '适合第一次来',
      '报名成功后进群获取定位和领位信息'
    ],
    groupHint: '报名后可进当晚活动群，统一发定位和集合点。',
    discountRules: {
      fourPeople: '满 4 人，全体 9 折，组局人 5 折',
      sevenPeople: '满 7 人，全体 8.5 折，组局人 5 折'
    }
  },
  {
    id: 'evt-002',
    mode: 'official',
    title: '周六轻松喝一杯',
    barName: 'No.19 Lounge',
    city: '上海',
    district: '黄浦',
    startTime: '周六 20:30',
    dateText: '4月26日',
    joinedCount: 9,
    capacity: 14,
    priceText: '人均 120 左右',
    atmosphere: '偏放松 / 熟人感 / 可早退',
    tags: ['想放松', '只喝酒不社交', '常客多'],
    participants: [
      { id: 'u-21', label: 'J', color: '#FF8BA7' },
      { id: 'u-22', label: 'N', color: '#50C878' },
      { id: 'u-23', label: 'Y', color: '#A78BFA' },
      { id: 'u-24', label: 'R', color: '#F97316' }
    ],
    description: '不做破冰游戏，不强行社交。想坐着聊、听歌、慢慢认识人，这一场更合适。',
    rules: [
      '适合想低压力参与的用户',
      '活动不限喝酒速度，可随时离开',
      '现场会有组织人接应'
    ],
    groupHint: '群里会同步酒吧当晚排队情况和集合时点。',
    discountRules: {
      fourPeople: '满 4 人，全体 9 折，组局人 5 折',
      sevenPeople: '满 7 人，全体 8.5 折，组局人 5 折'
    }
  },
  {
    id: 'evt-003',
    mode: 'official',
    title: '周末搭子预热局',
    barName: 'Afterglow',
    city: '上海',
    district: '徐汇',
    startTime: '周日 19:30',
    dateText: '4月27日',
    joinedCount: 15,
    capacity: 20,
    priceText: '人均 75 左右',
    atmosphere: '熟人带新 / 氛围柔和 / 易复购',
    tags: ['想认识人', '熟人带新', '轻预热'],
    participants: [
      { id: 'u-31', label: 'P', color: '#7A5CFF' },
      { id: 'u-32', label: 'H', color: '#FF6B6B' },
      { id: 'u-33', label: 'C', color: '#2DD4BF' },
      { id: 'u-34', label: 'S', color: '#F59E0B' }
    ],
    description: '适合作为新一周前的轻量预热局。人不会太杂，节奏偏慢，适合连续参加建立熟人感。',
    rules: [
      '建议带一位朋友一起更自然',
      '现场会引导入座和破冰',
      '活动结束后会沉淀下次优先名单'
    ],
    groupHint: '当晚群会同步座位分配和常见问题。',
    discountRules: {
      fourPeople: '满 4 人，全体 9 折，组局人 5 折',
      sevenPeople: '满 7 人，全体 8.5 折，组局人 5 折'
    }
  }
];

const DEFAULT_USER = {
  nickname: '',
  ageRange: '23-26',
  city: '上海',
  tags: []
};

const DEFAULT_LEVELS = ['核心', '活跃', '路人'];

const CREATE_TAGS = [
  '新人局',
  '酒吧预热',
  '轻社交',
  '社恐友好',
  '慢节奏',
  '熟人带新'
];

module.exports = {
  AGE_OPTIONS,
  PROFILE_TAGS,
  CREATE_TAGS,
  EVENTS,
  DEFAULT_USER,
  DEFAULT_LEVELS
};
