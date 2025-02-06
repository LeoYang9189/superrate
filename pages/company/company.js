// pages/company/company.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    currentTab: 0,  // 当前选中的tab索引
    certList: [1, 2], // 资质证书列表
    partnerList: [1, 2],  // 先测试2个logo
    advantageList: [
      {
        title: "海运出口",
        desc: "沃特货代是中国最大的国际货运代理公司之一，拥有强大的海运公共订舱平台和操作系统，最具经验及实力的销售、客服、操作团队，优质的服务理念及值得信赖的服务水准。"
      },
      {
        title: "空运服务",
        desc: "沃特货代空运部拥有多年的国际空运从业经验和优秀的操作团队，为客人提供优质的空运物流方案，并专业、准确、快捷地确保货物第一时间出运，满足客人的各种需求。提供从宁波栎社国际机场、上海浦东国际机场、杭州萧山国际机场、北京首都国际机场、广州白云国际机场、南昌昌北国际机场、成都双流国际机场、天津滨海国际机场等全国各大空运机场的订舱服务，与各大航空公司也有着良好合作关系。"
      }
    ],
    isLoading: false,
    hasMore: true,
    timelineList: [
      {
        date: "2020-01-11",
        title: "我们在一起",
        subtitle: "一群人，一件事，一起走，一辈子。",
      },
      {
        date: "2019-12-26",
        title: "大爱·万年青",
        subtitle: "第二届静安区特殊儿童迎新音乐会特别支持单位，万年青的公益项目、公益事业一直在持续，为了孩子们灿烂的明天，为了千万个家庭的幸福，为了社会的和谐与美好，让我们携手共献一片爱！",
      }
    ]
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
  },

  // 加载更多
  onLoadMore() {
    if (this.data.isLoading || !this.data.hasMore) return;
    
    this.setData({
      isLoading: true
    });

    // 模拟加载更多数据
    setTimeout(() => {
      this.setData({
        isLoading: false,
        hasMore: false  // 示例中只有2条数据，所以直接设为false
      });
    }, 1000);
  }
})