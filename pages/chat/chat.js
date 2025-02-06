Page({
  data: {
    scrollToMessage: '',
  },

  goBack() {
    const pages = getCurrentPages();
    if (pages.length > 1) {
      // 如果有历史页面，直接返回
      wx.navigateBack({
        delta: 1
      });
    } else {
      // 如果是第一个页面，跳转到消息列表
      wx.switchTab({
        url: '/pages/message/message'
      });
    }
  },

  onScrollToUpper() {
    // 加载更多历史消息
  }
}) 