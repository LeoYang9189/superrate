// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,  // 当前选中的tab索引
    certList: [1, 2], // 资质证书列表
    partnerList: [1, 2]  // 先测试2个logo
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad(options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady() {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow() {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide() {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload() {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh() {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom() {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage() {

  },

  // 点击切换tab
  switchTab(e) {
    const index = e.currentTarget.dataset.index;
    if (this.data.currentTab === index) return;
    this.setData({
      currentTab: index
    });
  },

  // 滑动切换tab
  swiperChange(e) {
    const index = e.detail.current;
    this.setData({
      currentTab: index
    });
  }
})