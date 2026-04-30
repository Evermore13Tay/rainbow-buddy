const { AGE_OPTIONS, PROFILE_TAGS } = require('../../utils/mock');
const store = require('../../utils/store');

Page({
  data: {
    ageOptions: AGE_OPTIONS,
    tags: PROFILE_TAGS,
    form: {
      nickname: '',
      ageRange: AGE_OPTIONS[1],
      city: '上海',
      tags: []
    }
  },

  onLoad(options) {
    this.eventId = options.eventId;
  },

  onShow() {
    const form = store.getUserProfile();
    this.setData({ form });
  },

  handleInput(event) {
    const { field } = event.currentTarget.dataset;
    const value = event.detail.value;
    this.setData({
      [`form.${field}`]: value
    });
  },

  handleAgeChange(event) {
    const ageRange = this.data.ageOptions[event.detail.value];
    this.setData({
      'form.ageRange': ageRange
    });
  },

  handleTagToggle(event) {
    const { tag } = event.currentTarget.dataset;
    const nextTags = this.data.form.tags.slice();
    const index = nextTags.indexOf(tag);

    if (index >= 0) {
      nextTags.splice(index, 1);
    } else {
      nextTags.push(tag);
    }

    this.setData({
      'form.tags': nextTags
    });
  },

  handleSubmit() {
    const { nickname, ageRange, city } = this.data.form;

    if (!nickname || !ageRange || !city) {
      wx.showToast({
        title: '请先补全资料',
        icon: 'none'
      });
      return;
    }

    store.saveUserProfile(this.data.form);

    if (!this.eventId) {
      wx.showToast({
        title: '资料已保存',
        icon: 'success'
      });
      setTimeout(() => {
        wx.navigateBack({
          delta: 1
        });
      }, 500);
      return;
    }

    store.joinEvent(this.eventId);

    wx.redirectTo({
      url: `/pages/success/index?eventId=${this.eventId}`
    });
  }
});
