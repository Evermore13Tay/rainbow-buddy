const store = require('../../utils/store');

Page({
  data: {
    events: [],
    officialEvents: [],
    customEvents: []
  },

  onShow() {
    const events = store.getEvents();

    this.setData({
      events,
      officialEvents: events.filter((item) => item.mode === 'official'),
      customEvents: events.filter((item) => item.mode === 'custom')
    });
  },

  handleOpenDetail(event) {
    const { id } = event.currentTarget.dataset;
    wx.navigateTo({
      url: `/pages/event-detail/index?id=${id}`
    });
  },

  handleCreate() {
    wx.navigateTo({
      url: '/pages/create/index'
    });
  }
});
