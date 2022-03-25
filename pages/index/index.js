let util = require('../../utils/util')

Page({


  /**
   * 页面的初始数据
   */
  data: {
    date: '日期',
    time: '时间',
    date1: '日期',
    time1: '时间',
    btn1: false,
    btn2: true,
    kxsrc: '../../images/kexuanzuowei.png',
    yxsrc: '../../images/yixuanzuowei.png',
    seat: '',
    username: '',
    phone: '',
    color1: '#3894FF',
    color2: '#ccc',
    color3: '#ccc',
    color4: '#ccc',
    type1: 'zhibokecheng',
    seats: '',
    vip1: '',
    vip2: '',
    vip3: '',
    vip4: '',
    vip5: '',
    vip6: '',
    vip7: '',
    vip8: '',
    vip9: '',
    vip10: '',
    a1: '',
    a2: '',
    a3: '',
    a4: '',
    a5: '',
    a6: '',
    a7: '',
    a8: '',
    b1: '',
    b2: '',
    b3: '',
    b4: '',
    b5: '',
    b6: '',
    b7: '',
    b8: '',
    b9: '',
    b10: '',
    b11: '',
    b12: '',
    c1: '',
    c2: '',
    c3: '',
    c4: '',
    c5: '',
    c6: '',
    c7: '',
    c8: '',
    c9: '',
    c10: '',
    c11: '',
    c12: '',
    didreserve: '',
  },

  bindDateChange: function (e) {
    this.setData({
      date: e.detail.value
    })
  },

  bindTimeChange: function (e) {
    this.setData({
      time: e.detail.value
    })
  },

  bindDateChange1: function (e) {
    this.setData({
      date1: e.detail.value
    })
  },

  bindTimeChange1: function (e) {
    this.setData({
      time1: e.detail.value
    })
  },

  btn1: function () {
    this.setData({
      btn1: false,
      btn2: true,
      color1: '#3894FF',
      color2: '#ccc',
      color3: '#ccc',
      color4: '#ccc',
      type1: 'zhibokecheng',

    })
  },

  btn2: function () {
    this.setData({
      btn1: false,
      btn2: true,
      color1: '#ccc',
      color2: '#3894FF',
      color3: '#ccc',
      color4: '#ccc',
      type1: 'juemikecheng',
    })
  },

  btn3: function () {
    this.setData({
      btn2: false,
      btn1: true,
      color1: '#ccc',
      color2: '#ccc',
      color3: '#3894FF',
      color4: '#ccc',
      type1: 'dianbokecheng',
    })
  },

  btn4: function () {
    this.setData({
      btn2: false,
      btn1: true,
      color1: '#ccc',
      color2: '#ccc',
      color3: '#ccc',
      color4: '#3894FF',
      type1: 'yanxuekecheng',
    })
  },

  // 选择座位
  chooseseat: function (e) {
    this.setData({
      seats: e.currentTarget.dataset.seats
    })
  },

  // 收集姓名数据
  saveName: function (e) {
    this.setData({
      username: e.detail
    })
  },

  errToast: function (title) {
    wx.showToast({
      title: title,
      icon: 'error',
      duration: 2000
    })
  },

  // 确定预定
  reserve: function () {
    let {
      type1,
      seats,
      date,
      time,
      date1,
      time1,
      username,
      phone
    } = this.data

    let starttime = date + ' ' + time
    starttime = starttime.replace(/\-/g, '.')
    let endtime = date1 + ' ' + time1
    endtime = endtime.replace(/\-/g, '.')

    // 获取预约时长
    let arr = time.split(':') // 开始
    let arr1 = time1.split(':') // 结束
    let second = (arr[0] * 60 + arr[1] * 1) * 60
    let second1 = (arr1[0] * 60 + arr1[1] * 1) * 60

    let res = second1 - second

    if (!seats) {
      this.errToast('请选择座位')
    } else if (date1 === '日期' || time1 === '时间') {
      this.errToast('请选择结束时间')
    } else if (!username) {
      this.errToast('请输入姓名')
    } else {
      wx.request({
        url: `http://www.mysss.com:8001/yuyue/${type1}-${seats}-${starttime}-${endtime}-${username}-${phone}-${res}`, // 仅为示例，并非真实的接口地址
        header: {
          'content-type': 'application/json' // 默认值
        },
        success(res) {
          if (res.data.msg === 'ok') {
            wx.showToast({
              title: '预约成功',
              icon: 'success',
              duration: 2000
            })

            setTimeout(() => {
              wx.reLaunch({
                url: '/pages/index/index',
              })
            }, 2000)
          }
        }
      })
    }
  },

  // 获取全部预约数据
  getReserve: function () {
    let that = this

    wx.request({
      url: 'http://www.mysss.com:8001/getallzw',
      header: {
        'content-type': 'json'
      },
      success(res) {
        let reserve = res.data

        that.setData({
          didreserve: reserve
        })

        reserve.forEach(item => {
          // 属性值包含变量的时候可以使用[]
          that.setData({
            [`${item.toLowerCase()}`]: true
          })
        })
      }
    })
  },

  doRefresh: function () {
    // 背景显示加载动画
    wx.showNavigationBarLoading()

    // 获取预约数据
    this.getReserve()

    let date = util.formatDate(new Date())
    let time = util.formatTime(new Date())

    // 保存当前时间
    this.setData({
      date: date,
      time: time
    })

    setTimeout(() => {
      this.didRefresh()
    }, 500);
  },

  didRefresh: function () {
    wx.hideNavigationBarLoading()
    wx.stopPullDownRefresh()

    this.setData({
      seats: ''
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 设置导航条背景颜色
    wx.setNavigationBarColor({
      frontColor: '#ffffff',
      backgroundColor: '#3894FF',
    })

    // 获取当前时间
    let date = util.formatDate(new Date())
    let time = util.formatTime(new Date())

    // 保存当前时间
    this.setData({
      date: date,
      time: time
    })

    // 收集手机号
    let phone = wx.getStorageSync('phone')

    this.setData({
      phone: phone
    })

    // 获取全部预约数据
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