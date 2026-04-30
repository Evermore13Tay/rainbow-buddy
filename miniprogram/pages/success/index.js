const store = require('../../utils/store');

Page({
  data: {
    event: null,
    user: null,
    recordCount: 0
  },

  onLoad(options) {
    this.eventId = options.eventId;
  },

  onShow() {
    this.setData({
      event: store.getEventById(this.eventId),
      user: store.getUserProfile(),
      recordCount: store.getParticipations().length
    });
  },

  handleViewRecords() {
    wx.switchTab({
      url: '/pages/records/index'
    });
  },

  handleBackHome() {
    wx.switchTab({
      url: '/pages/home/index'
    });
  }
});
