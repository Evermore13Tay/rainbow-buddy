const { EVENTS, DEFAULT_USER } = require('./mock');

const STORAGE_KEYS = {
  user: 'rainbow_user_profile',
  participations: 'rainbow_participations',
  customEvents: 'rainbow_custom_events'
};

function bootstrap() {
  if (!wx.getStorageSync(STORAGE_KEYS.user)) {
    wx.setStorageSync(STORAGE_KEYS.user, DEFAULT_USER);
  }

  if (!wx.getStorageSync(STORAGE_KEYS.participations)) {
    wx.setStorageSync(STORAGE_KEYS.participations, []);
  }

  if (!wx.getStorageSync(STORAGE_KEYS.customEvents)) {
    wx.setStorageSync(STORAGE_KEYS.customEvents, []);
  }
}

function getUserProfile() {
  return wx.getStorageSync(STORAGE_KEYS.user) || DEFAULT_USER;
}

function saveUserProfile(profile) {
  wx.setStorageSync(STORAGE_KEYS.user, profile);
}

function getCustomEvents() {
  return wx.getStorageSync(STORAGE_KEYS.customEvents) || [];
}

function saveCustomEvents(events) {
  wx.setStorageSync(STORAGE_KEYS.customEvents, events);
}

function buildAvatar(label, index) {
  const palette = ['#7A5CFF', '#FF4D8D', '#36CFC9', '#F6BD60', '#60A5FA', '#FB7185'];
  return {
    id: `avatar-${Date.now()}-${index}`,
    label: (label || '搭').slice(0, 1).toUpperCase(),
    color: palette[index % palette.length]
  };
}

function getJoinedParticipantMap() {
  return getParticipations().reduce((acc, item) => {
    if (!acc[item.eventId]) {
      acc[item.eventId] = [];
    }

    acc[item.eventId].push(item.participant);
    return acc;
  }, {});
}

function resolveDiscount(event) {
  const count = event.joinedCount;

  if (count >= 7) {
    return {
      status: '满 7 人已成局',
      benefit: '全体 8.5 折，组局人 5 折'
    };
  }

  if (count >= 4) {
    return {
      status: '满 4 人已触发',
      benefit: '全体 9 折，组局人 5 折'
    };
  }

  return {
    status: `差 ${Math.max(4 - count, 0)} 人触发首档`,
    benefit: '满 4 人全体 9 折，组局人 5 折'
  };
}

function getEvents() {
  const participationMap = getJoinedParticipantMap();
  const allEvents = EVENTS.concat(getCustomEvents());

  return allEvents.map((event) => {
    const joinedParticipants = participationMap[event.id] || [];
    const participants = (event.participants || []).concat(joinedParticipants);
    const joinedCount = event.joinedCount + joinedParticipants.length;
    const avatarPreview = participants.slice(0, 4);

    return {
      ...event,
      participants,
      avatarPreview,
      avatarExtraCount: Math.max(participants.length - avatarPreview.length, 0),
      joinedCount,
      remaining: Math.max(event.capacity - joinedCount, 0),
      discountDisplay: resolveDiscount({
        ...event,
        joinedCount
      }),
      sharePath: `/pages/event-detail/index?id=${event.id}`
    };
  }).sort((a, b) => {
    if (a.mode !== b.mode) {
      return a.mode === 'custom' ? 1 : -1;
    }

    return b.id.localeCompare(a.id);
  });
}

function getEventById(eventId) {
  return getEvents().find((event) => event.id === eventId);
}

function getParticipations() {
  return wx.getStorageSync(STORAGE_KEYS.participations) || [];
}

function hasJoined(eventId) {
  return getParticipations().some((item) => item.eventId === eventId);
}

function joinEvent(eventId) {
  if (hasJoined(eventId)) {
    return getParticipations().find((item) => item.eventId === eventId);
  }

  const event = getEventById(eventId);

  if (!event || event.remaining <= 0) {
    return null;
  }

  const record = {
    id: `part-${Date.now()}`,
    eventId,
    eventTitle: event.title,
    barName: event.barName,
    startTime: `${event.dateText} ${event.startTime}`,
    createdAt: new Date().toISOString(),
    status: '已报名',
    participant: buildAvatar(getUserProfile().nickname, getParticipations().length)
  };

  const records = [record].concat(getParticipations());
  wx.setStorageSync(STORAGE_KEYS.participations, records);
  return record;
}

function createCustomEvent(form) {
  const profile = getUserProfile();
  const hostAvatar = buildAvatar(profile.nickname || '组局', 0);
  const eventId = `custom-${Date.now()}`;
  const customEvent = {
    id: eventId,
    mode: 'custom',
    title: form.title,
    barName: form.barName,
    city: profile.city || form.city || '上海',
    district: form.district,
    startTime: form.startTime,
    dateText: form.dateText,
    joinedCount: 0,
    capacity: Number(form.capacity) || 8,
    priceText: form.priceText || '到店后 AA 或各自点单',
    atmosphere: form.atmosphere,
    tags: form.tags,
    participants: [],
    description: form.description,
    rules: [
      '分享出去拉人上车，满 4 人先触发首档优惠',
      '满 7 人全体再升级到 8.5 折，组局人始终 5 折',
      '报名后进群同步集合点和到店时间'
    ],
    groupHint: '创建成功后即可分享小程序链接，朋友点开即可报名上车。',
    hostName: profile.nickname || '发起人',
    discountRules: {
      fourPeople: '满 4 人，全体 9 折，组局人 5 折',
      sevenPeople: '满 7 人，全体 8.5 折，组局人 5 折'
    }
  };

  const events = [customEvent].concat(getCustomEvents());
  saveCustomEvents(events);

  const record = {
    id: `part-${Date.now()}`,
    eventId,
    eventTitle: customEvent.title,
    barName: customEvent.barName,
    startTime: `${customEvent.dateText} ${customEvent.startTime}`,
    createdAt: new Date().toISOString(),
    status: '我是组局人',
    participant: hostAvatar,
    isHost: true
  };

  wx.setStorageSync(STORAGE_KEYS.participations, [record].concat(getParticipations()));
  return customEvent;
}

function getUserLevel() {
  const count = getParticipations().length;

  if (count >= 4) {
    return '核心';
  }

  if (count >= 2) {
    return '活跃';
  }

  return '路人';
}

function getAdminSummary() {
  const participations = getParticipations();
  const events = getEvents();
  const user = getUserProfile();

  return {
    eventCount: events.length,
    signupCount: participations.length,
    activeLevel: getUserLevel(),
    city: user.city || '未填写'
  };
}

module.exports = {
  bootstrap,
  getUserProfile,
  saveUserProfile,
  getEvents,
  getEventById,
  getParticipations,
  joinEvent,
  createCustomEvent,
  hasJoined,
  getUserLevel,
  getAdminSummary
};
