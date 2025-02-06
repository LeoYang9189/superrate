Page({
  data: {
    billNumber: '',
    historyList: []
  },

  onLoad() {
    // 从本地存储加载历史记录
    const historyList = wx.getStorageSync('trackingHistory') || [];
    this.setData({ historyList });
  },

  onBack() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  onInputChange(e) {
    this.setData({
      billNumber: e.detail.value
    });
  },

  fillExample() {
    this.setData({
      billNumber: 'SHSE12345678'
    });
  },

  onSearch() {
    const { billNumber, historyList } = this.data;
    if (!billNumber.trim()) {
      wx.showToast({
        title: '请输入提单号',
        icon: 'none'
      });
      return;
    }

    // 添加到历史记录
    if (!historyList.includes(billNumber)) {
      const newHistory = [billNumber, ...historyList].slice(0, 10);
      this.setData({ historyList: newHistory });
      wx.setStorageSync('trackingHistory', newHistory);
    }

    // 跳转到详情页
    wx.navigateTo({
      url: `/pages/tracking-detail/tracking-detail?billNumber=${billNumber}`
    });
  },

  onHistoryTap(e) {
    const number = e.currentTarget.dataset.number;
    this.setData({ billNumber: number });
  },

  deleteHistory(e) {
    const index = e.currentTarget.dataset.index;
    const newList = [...this.data.historyList];
    newList.splice(index, 1);
    this.setData({ historyList: newList });
    wx.setStorageSync('trackingHistory', newList);
  },

  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ historyList: [] });
          wx.removeStorageSync('trackingHistory');
        }
      }
    });
  }
}); 