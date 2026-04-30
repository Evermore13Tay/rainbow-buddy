const store = require('../../utils/store');

Page({
  data: {
    event: null,
    joined: false,
    created: false
  },

  onLoad(options) {
    this.eventId = options.id;
    this.setData({
      created: options.created === '1'
    });
  },

  onShow() {
    const event = store.getEventById(this.eventId);
    const joined = store.hasJoined(this.eventId);

    this.setData({
      event,
      joined
    });
  },

  handleSignup() {
    const profile = store.getUserProfile();
    const isProfileComplete = profile.nickname && profile.city && profile.ageRange;

    if (!isProfileComplete) {
      wx.navigateTo({
        url: `/pages/profile/index?eventId=${this.eventId}`
      });
      return;
    }

    const record = store.joinEvent(this.eventId);

    if (!record) {
      wx.showToast({
        title: '名额已满',
        icon: 'none'
      });
      return;
    }

    wx.redirectTo({
      url: `/pages/success/index?eventId=${this.eventId}`
    });
  },

  handleCopyLink() {
    const { event } = this.data;
    wx.setClipboardData({
      data: event.sharePath
    });
  },

  onShareAppMessage() {
    const { event } = this.data;

    return {
      title: `${event.title}，现在 ${event.joinedCount} 人已上车`,
      path: event.sharePath
    };
  }
});
