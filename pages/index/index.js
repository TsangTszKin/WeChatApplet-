//index.js

var util = require('../../utils/util.js')
var http = require('../../utils/http.js');
var app = getApp()
Page({
  data: {
    feed: [],
    feed_length: 0
  },
  //事件处理函数
  bindItemTap: function() {
    wx.navigateTo({
      url: '../answer/answer'
    })
  },
  bindQueTap: function() {
    wx.navigateTo({
      url: '../question/question'
    })
  },
  onLoad: function() {
    console.log('onLoad')
    var that = this
    //调用应用实例的方法获取全局数据
    this.getData();


    let mockData = {
      "address|2-4": {
        "110000": "北京市",
        "120000": "天津市",
        "130000": "河北省",
        "140000": "山西省"
      }
    }
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    http.ajax('get', '/api/test', {}, (res) => {
      console.log(res)
    }, mockData)
    wx.hideToash()
  },
  upper: function() {
    wx.showNavigationBarLoading()
    this.refresh();
    console.log("upper");
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      wx.stopPullDownRefresh();
    }, 2000);
  },
  lower: function(e) {
    wx.showNavigationBarLoading();
    var that = this;
    setTimeout(function() {
      wx.hideNavigationBarLoading();
      that.nextLoad();
    }, 1000);
    console.log("lower")
  },
  //scroll: function (e) {
  //  console.log("scroll")
  //},

  //网络请求数据, 实现首页刷新
  refresh0: function() {
    var index_api = '';
    util.getData(index_api)
      .then(function(data) {
        //this.setData({
        //
        //});
        console.log(data);
      });
  },

  //使用本地 fake 数据实现刷新效果
  getData: function() {
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
  },
  refresh: function() {
    wx.showToast({
      title: '刷新中',
      icon: 'loading',
      duration: 3000
    });
    var feed = util.getData2();
    console.log("loaddata");
    var feed_data = feed.data;
    this.setData({
      feed: feed_data,
      feed_length: feed_data.length
    });
    setTimeout(function() {
      wx.showToast({
        title: '刷新成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)

  },

  //使用本地 fake 数据实现继续加载效果
  nextLoad: function() {
    wx.showToast({
      title: '加载中',
      icon: 'loading',
      duration: 4000
    })
    var next = util.getNext();
    console.log("continueload");
    var next_data = next.data;
    this.setData({
      feed: this.data.feed.concat(next_data),
      feed_length: this.data.feed_length + next_data.length
    });
    setTimeout(function() {
      wx.showToast({
        title: '加载成功',
        icon: 'success',
        duration: 2000
      })
    }, 3000)
  }


})