//index.js
//获取应用实例
const app = getApp()

Page({
  data: {
    motto: '果麦空气',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    activity: {activityName: '', introduction: ''}
  },
  //事件处理函数
  bindViewTap: function() {
    wx.navigateTo({
      url: '../logs/logs'
    })
  },

  onShow: function (e) {
    let that = this
    wx.request({
      url: 'https://reception.gmair.net/drift/activity/list',
      header: {
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8"
      },
      method: "GET",

      success: function(res) {
        if(res.data.responseCode == "RESPONSE_OK") {
          let activity = that.setData.activity;
          var temporary = res.data.data;
          for(var index in temporary) {
            activity.push({
              activityName: temporary[index].activityName,
              introduction: temporary[index].introduction,
            });
          }

          that.setData({
            activity: activity
          })
        }
      }
    });
  },

  onLoad: function () {
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse){
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  getUserInfo: function(e) {
    console.log(e)
    app.globalData.userInfo = e.detail.userInfo
    this.setData({
      userInfo: e.detail.userInfo,
      hasUserInfo: true
    })
  }
})
