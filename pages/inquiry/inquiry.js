Page({
  data: {
    formData: {
      fromPort: '',
      toPort: '',
      cargoName: '',
      readyTime: '',
      weight: '',
      volume: '',
      containerType: '',
      containerCount: ''
    },
    containerGroups: [{
      type: '',
      count: 1
    }],
    polList: ['SHANGHAI', 'NINGBO', 'QINGDAO'],  // 起运港列表
    podList: ['HAMBURG', 'ROTTERDAM', 'ANTWERP'],  // 目的港列表
    containerTypes: ['20GP', '40GP', '40HQ', '45HQ'],
    showPortPicker: false,
    showContainerPicker: false,
    showSuccessPopup: false,
    pickerType: '',  // pol/pod
    currentGroupIndex: 0,  // 当前选择的箱型箱量组索引
    inquiryNo: ''
  },

  onLoad() {
    // 默认选中第一个货好时间选项
    this.setData({
      'formData.readyTime': 'now'
    });
  },

  onBack() {
    wx.switchTab({
      url: '/pages/index/index'
    });
  },

  // 日期选择
  onDateChange(e) {
    this.setData({
      'formData.readyTime': e.detail.value
    });
  },

  // 港口选择
  showPortPicker(e) {
    const type = e.currentTarget.dataset.type;
    this.setData({
      showPortPicker: true,
      pickerType: type
    });
  },

  hidePortPicker() {
    this.setData({ showPortPicker: false });
  },

  selectPort(e) {
    const port = e.currentTarget.dataset.port;
    const key = this.data.pickerType === 'pol' ? 'formData.fromPort' : 'formData.toPort';
    this.setData({
      [key]: port,
      showPortPicker: false
    });
  },

  // 货好时间选择
  selectReadyTime(e) {
    const time = e.currentTarget.dataset.time;
    this.setData({
      'formData.readyTime': time
    });
  },

  // 箱型箱量相关方法
  showContainerPicker(e) {
    const index = e.currentTarget.dataset.index;
    this.setData({
      showContainerPicker: true,
      currentGroupIndex: index
    });
  },

  hideContainerPicker() {
    this.setData({ showContainerPicker: false });
  },

  selectContainerType(e) {
    const type = e.currentTarget.dataset.type;
    const index = this.data.currentGroupIndex;
    const key = `containerGroups[${index}].type`;
    this.setData({
      [key]: type,
      showContainerPicker: false
    });
  },

  // 检查箱型是否已被使用
  isContainerTypeUsed(type) {
    return this.data.containerGroups.some((group, index) => 
      index !== this.data.currentGroupIndex && group.type === type
    );
  },

  // 箱量计数器
  increaseCount(e) {
    const index = e.currentTarget.dataset.index;
    const key = `containerGroups[${index}].count`;
    const currentCount = this.data.containerGroups[index].count;
    this.setData({
      [key]: currentCount + 1
    });
  },

  decreaseCount(e) {
    const index = e.currentTarget.dataset.index;
    const key = `containerGroups[${index}].count`;
    const currentCount = this.data.containerGroups[index].count;
    if (currentCount > 1) {
      this.setData({
        [key]: currentCount - 1
      });
    }
  },

  onCountInput(e) {
    const index = e.currentTarget.dataset.index;
    const value = parseInt(e.detail.value) || 1;
    const key = `containerGroups[${index}].count`;
    this.setData({
      [key]: value
    });
  },

  // 添加/删除箱型箱量组
  addContainerGroup() {
    if (this.data.containerGroups.length < 5) {
      const containerGroups = this.data.containerGroups.concat({
        type: '',
        count: 1
      });
      this.setData({ containerGroups });
    }
  },

  deleteContainerGroup(e) {
    const index = e.currentTarget.dataset.index;
    const containerGroups = this.data.containerGroups.filter((_, i) => i !== index);
    this.setData({ containerGroups });
  },

  // 表单提交
  submitForm(e) {
    const values = e.detail.value;
    const { fromPort, toPort, cargoName, readyTime } = this.data.formData;
    
    // 验证必填项
    if (!fromPort || !toPort || !cargoName || !readyTime) {
      wx.showToast({
        title: '请填写必填项',
        icon: 'none'
      });
      return;
    }

    // 验证三选一
    const hasWeight = !!values.weight;
    const hasVolume = !!values.volume;
    const hasContainer = this.data.containerGroups.some(group => group.type && group.count);

    if (!hasWeight && !hasVolume && !hasContainer) {
      wx.showToast({
        title: '请至少填写毛重、体积、箱型箱量其中之一',
        icon: 'none'
      });
      return;
    }

    // 生成询价单号
    const inquiryNo = 'RE' + Math.random().toString(36).substr(2, 6).toUpperCase();
    
    // 显示成功弹窗
    this.setData({
      showSuccessPopup: true,
      inquiryNo
    });

    // TODO: 保存询价信息到本地或发送到服务器
  },

  // 查看询价列表
  viewInquiryList() {
    // TODO: 跳转到询价列表页面
    wx.showToast({
      title: '功能开发中',
      icon: 'none'
    });
  },

  // 继续询价
  newInquiry() {
    // 重置表单
    this.setData({
      formData: {
        fromPort: '',
        toPort: '',
        cargoName: '',
        readyTime: '',
        weight: '',
        volume: '',
        containerType: '',
        containerCount: ''
      },
      containerGroups: [{
        type: '',
        count: 1
      }],
      showSuccessPopup: false
    });
  }
}); 