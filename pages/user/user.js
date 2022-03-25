Page({

  /**
   * 页面的初始数据
   */
  data: {
    exitLogin: false,
    showModal: false,
    newPwd: '',
    placeholder: '请输入新密码',
    userReserve: '',
  },

  logout: function () {
    this.setData({
      exitLogin: true
    })
  },

  cancelExit: function () {
    this.setData({
      exitLogin: false
    })
  },

  confirmExit: function () {
    // 确定
    wx.removeStorageSync('phone')

    wx.redirectTo({
      url: '/pages/login/login',
    })
  },

  updatePwd: function () {
    this.setData({
      showModal: true
    })
  },

  saveNewPwd: function (e) {
    let newPwd = e.detail.value

    this.setData({
      newPwd: newPwd
    })
  },

  cancel: function () {
    this.setData({
      showModal: false,
      placeholder: '请输入新密码',
      newPwd: ''
    })
  },

  confirm: function () {
    let newPwd = this.data.newPwd

    if (!newPwd) {
      this.setData({
        showModal: true,
        placeholder: '密码不能为空'
      })
    } else {
      let phone = wx.getStorageSync('phone')
      let that = this

      wx.request({
        url: `http://www.mysss.com:8001/resetmm/${phone}-${newPwd}`,
        header: {
          'content-type': 'json' // 默认值
        },
        success(res) {
          if (res.data.msg === 'ok') {
            that.setData({
              showModal: false
            })
            wx.removeStorageSync('phone')

            wx.showToast({
              title: '密码修改成功',
              icon: 'success',
              duration: 2000,
            })

            setTimeout(() => {
              wx.redirectTo({
                url: '/pages/login/login',
              })
            }, 2000)
          }
        }
      })
    }
  },

  // 获取用户预约数据
  getReserve: function () {
    let phone = wx.getStorageSync('phone')
    let that = this

    wx.request({
      url: `http://www.mysss.com:8001/yuyues/${phone}`,
      header: {
        "content-type": "json"
      },
      success(res) {
        that.setData({
          userReserve: res.data
        })
      }
    })
  },

  cancelReserve: function (e) {
    let id = e.currentTarget.dataset.id

    wx.request({
      url: `http://www.mysss.com:8001/cacelyuyue/${id}`,
      header: {
        'content-type': 'json'
      },
      success(res) {
        if (res.data.msg === 'ok') {
          wx.showToast({
            title: '取消成功',
            icon: 'success',
            duration: 2000
          })

          setTimeout(() => {
            wx.reLaunch({
              url: '/pages/user/user',
            })
          }, 2000);
        }
      }
    })
  },

  doRefresh: function () {
    // 背景显示加载动画
    wx.showNavigationBarLoading()

    // 获取预约数据
    this.getReserve()

    setTimeout(() => {
      this.didRefresh()
    }, 500);
  },

  didRefresh: function () {
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    //设置导航栏标题
    wx.setNavigationBarTitle({
      title: '我的预定'
    })
    //设置导航条背景颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3894FF',
    })

    this.getReserve()
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
    this.doRefresh()
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
    this.doRefresh()
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