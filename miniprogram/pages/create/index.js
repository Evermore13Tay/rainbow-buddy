const { CREATE_TAGS } = require('../../utils/mock');
const store = require('../../utils/store');

Page({
  data: {
    tags: CREATE_TAGS,
    form: {
      title: '',
      barName: '',
      district: '',
      dateText: '本周五',
      startTime: '21:00',
      capacity: 8,
      atmosphere: '',
      priceText: '',
      description: '',
      tags: []
    }
  },

  handleInput(event) {
    const { field } = event.currentTarget.dataset;
    this.setData({
      [`form.${field}`]: event.detail.value
    });
  },

  handleTagToggle(event) {
    const { tag } = event.currentTarget.dataset;
    const nextTags = this.data.form.tags.slice();
    const index = nextTags.indexOf(tag);

    if (index > -1) {
      nextTags.splice(index, 1);
    } else {
      nextTags.push(tag);
    }

    this.setData({
      'form.tags': nextTags
    });
  },

  handleSubmit() {
    const profile = store.getUserProfile();
    const { title, barName, district, dateText, startTime, atmosphere, description } = this.data.form;

    if (!profile.nickname) {
      wx.navigateTo({
        url: '/pages/profile/index'
      });
      return;
    }

    if (!title || !barName || !district || !dateText || !startTime || !atmosphere || !description) {
      wx.showToast({
        title: '请先填写完整信息',
        icon: 'none'
      });
      return;
    }

    const event = store.createCustomEvent(this.data.form);
    wx.redirectTo({
      url: `/pages/event-detail/index?id=${event.id}&created=1`
    });
  }
});
