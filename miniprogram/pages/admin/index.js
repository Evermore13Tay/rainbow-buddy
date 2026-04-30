const store = require('../../utils/store');

Page({
  data: {
    summary: null,
    events: [],
    user: null,
    records: []
  },

  onShow() {
    this.setData({
      summary: store.getAdminSummary(),
      events: store.getEvents(),
      user: store.getUserProfile(),
      records: store.getParticipations()
    });
  }
});
