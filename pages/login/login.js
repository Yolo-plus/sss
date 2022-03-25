Page({

  /**
   * 页面的初始数据
   */
  data: {
    phone: '',
    password: '',
  },

  savePhone: function (e) {
    let phone = e.detail.value

    this.setData({
      phone: phone
    })
  },

  savePwd: function (e) {
    let password = e.detail.value

    this.setData({
      password: password
    })
  },

  errToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'error',
      duration: 2000,
    })
  },

  handleSubmit: function () {
    let phone = this.data.phone
    let password = this.data.password

    // 手机号或者密码为空
    if (!phone) {
      this.errToast('请输入手机号')
    } else if (!/^[1][3,4,5,7,8,9][0-9]{9}$/.test(phone)) {
      this.errToast('手机号格式有误')
    } else if (!password) {
      this.errToast('请输入密码')
    } else {
      // request里面不能使用this
      let that = this

      wx.request({
        url: `http://www.mysss.com:8001/yh/${phone}-${password}`,
        header: {
          'content-type': 'json'
        },
        success(res) {
          if (res.data.msg === 'ok') {
            // 手机号密码无误
            wx.removeStorageSync('phone') // 清理缓存
            wx.setStorageSync('phone', phone) // 设置缓存

            // 跳转首页（可以跳转到tabbar）
            wx.reLaunch({
              url: '/pages/index/index',
            })
          } else if (res.data.msg === 'error') {
            that.errToast('请联系管理员')
          } else if (res.data.msg === 'error1') {
            that.errToast('密码有误')
            that.setData({
              password: ''
            })
          }
        }
      })
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 隐藏返回首页按钮
    wx.hideHomeButton()

    // 设置navtitle navbar 
    wx.setNavigationBarTitle({
      title: '登录',
    })

    wx.setNavigationBarColor({
      backgroundColor: 'white',
      frontColor: '#000000',
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})