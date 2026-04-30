const store = require('./utils/store');

App({
  globalData: {
    theme: {
      accent: '#7A5CFF',
      surface: '#11131A'
    }
  },

  onLaunch() {
    store.bootstrap();
  }
});
