const store = require('../../utils/store');

Page({
  data: {
    user: null,
    level: '路人',
    records: [],
    summary: null,
    events: []
  },

  onShow() {
    this.setData({
      user: store.getUserProfile(),
      level: store.getUserLevel(),
      records: store.getParticipations(),
      summary: store.getAdminSummary(),
      events: store.getEvents()
    });
  },

  handleEditProfile() {
    wx.navigateTo({
      url: '/pages/profile/index'
    });
  }
});
