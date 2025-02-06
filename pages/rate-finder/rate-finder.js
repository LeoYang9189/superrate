Page({
  data: {
    pol: 'SHANGHAI',  // 起始港
    pod: '',  // 目的港
    polList: ['SHANGHAI', 'NINGBO', 'QINGDAO'],
    podList: ['DURBAN', 'ROTTERM', 'BANGKON'],
    showPortPicker: false,  // 是否显示港口选择器
    pickerType: '',  // 当前选择的类型：pol/pod
    historyList: []
  },

  onLoad() {
    // 从本地存储加载历史记录
    const historyList = wx.getStorageSync('rateSearchHistory') || [];
    this.setData({ historyList });
  },

  onBack() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  showPortPicker(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      showPortPicker: true,
      pickerType: type
    });
  },

  hidePortPicker() {
    this.setData({
      showPortPicker: false
    });
  },

  onPortSelect(e) {
    const port = e.currentTarget.dataset.port;
    if (this.data.pickerType === 'pol') {
      this.setData({ pol: port });
    } else {
      this.setData({ pod: port });
    }
    this.hidePortPicker();
  },

  onSearch() {
    const { pol, pod } = this.data;
    if (!pod) {
      wx.showToast({
        title: '请选择目的港',
        icon: 'none'
      });
      return;
    }

    // 添加到历史记录
    const route = `${pol}--${pod}`;
    const historyList = this.data.historyList;
    if (!historyList.includes(route)) {
      const newHistory = [route, ...historyList].slice(0, 10);
      this.setData({ historyList: newHistory });
      wx.setStorageSync('rateSearchHistory', newHistory);
    }

    // TODO: 跳转到结果页面
  },

  goToSubscribe() {
    // TODO: 跳转到订阅页面
  },

  onHistoryTap(e) {
    const route = e.currentTarget.dataset.item;
    // TODO: 处理历史记录点击
  },

  deleteHistory(e) {
    const index = e.currentTarget.dataset.index;
    const newList = [...this.data.historyList];
    newList.splice(index, 1);
    this.setData({ historyList: newList });
    wx.setStorageSync('rateSearchHistory', newList);
  },

  clearHistory() {
    wx.showModal({
      title: '提示',
      content: '确定要清除所有历史记录吗？',
      success: (res) => {
        if (res.confirm) {
          this.setData({ historyList: [] });
          wx.removeStorageSync('rateSearchHistory');
        }
      }
    });
  }
}); 