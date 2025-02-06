// index.js
Page({
  data: {
    bannerList: [
      { 
        imageUrl: '/assets/images/banner1.png',
        title: '国际海运',
        loaded: false
      },
      { 
        imageUrl: '/assets/images/banner2.png',
        title: '航空物流'
      },
      { 
        imageUrl: '/assets/images/banner3.png',
        title: '全球贸易'
      },
      { 
        imageUrl: '/assets/images/banner4.png',
        title: '多式联运'
      },
      { 
        imageUrl: '/assets/images/banner5.png',
        title: '智慧物流'
      }
    ],
    quickEntryList1: [
      { icon: '/assets/icons/quick1.png', name: '运价查询' },
      { icon: '/assets/icons/quick2.png', name: '订单跟踪' },
      { icon: '/assets/icons/quick3.png', name: '快速询价' },
      { icon: '/assets/icons/quick4.png', name: '特惠活动' }
    ],
    priceList: [
      {
        id: 1,
        fromPort: 'SHANGHAI',
        fromLabel: "22'",
        toPort: 'LOS ANGELES,CA',
        toLabel: 'NEW PORT',
        prices: ['1,300', '2,600', '2,600'],
        carrier: '船期：五',
        type: '中转',
        company: 'msc',
        validDate: '2025-05-31'
      },
      { id: 2 },
      { id: 3 },
      { id: 4 },
      { id: 5 },
      { id: 6 },
      { id: 7 },
      { id: 8 }
    ],
    newsList: [
      {
        title: "海运费暴涨10倍！多家船公司宣布停航红海",
        desc: "受地缘政治影响，红海航线安全形势严峻，多家船公司宣布暂停红海航线...",
        image: "/assets/images/news1.png"
      },
      {
        title: "2024年全球海运市场展望",
        desc: "专家预测2024年全球海运市场将呈现新格局，集装箱运输需求稳步增长...",
        image: "/assets/images/news2.png"
      },
      {
        title: "新能源船舶成为航运业新趋势",
        desc: "随着环保要求提高，新能源船舶订单量大幅增加，绿色航运成为行业发展方向...",
        image: "/assets/images/news3.png"
      }
    ],
    statusBarHeight: 0,
    x: 0,
    y: 0,
    searchValue: ''
  },
  
  onLoad: function() {
    try {
      const windowInfo = wx.getWindowInfo()
      const appBaseInfo = wx.getAppBaseInfo()
      
      this.setData({
        x: windowInfo.windowWidth - 60,
        y: windowInfo.windowHeight - 100,
        statusBarHeight: appBaseInfo.statusBarHeight
      })
    } catch (error) {
      console.error('获取系统信息失败:', error)
    }

    // 检查所有banner图片并更新加载状态
    this.data.bannerList.forEach((banner, index) => {
      wx.getImageInfo({
        src: banner.imageUrl,
        success: (res) => {
          console.log(`Banner ${index + 1} 加载成功:`, res)
          let key = `bannerList[${index}].loaded`
          this.setData({
            [key]: true
          })
        },
        fail: (err) => {
          console.error(`Banner ${index + 1} 加载失败:`, err, banner.imageUrl)
        }
      })
    })
  },
  
  onShow: function() {
    // 页面显示时的逻辑
  },

  goToPriceCenter() {
    // 跳转到运价中心
    wx.navigateTo({
      url: '/pages/price/price'
    })
  },

  goToNewsCenter() {
    // 跳转到资讯中心
    wx.navigateTo({
      url: '/pages/news/news'
    })
  },

  onChange(e) {
    // 处理拖动结束，实现吸边效果
    if (e.detail.source === 'touch-out-of-bounds') {
      const windowWidth = wx.getSystemInfoSync().windowWidth
      const x = e.detail.x >= windowWidth / 2 ? windowWidth - 80 : 0
      this.setData({
        x: x
      })
    }
  },

  contactService() {
    // 跳转到聊天页面
    wx.navigateTo({
      url: '/pages/chat/chat'
    })
  },

  onSearchInput(e) {
    this.setData({
      searchValue: e.detail.value
    })
  }
})
