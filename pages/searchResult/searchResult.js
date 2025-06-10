// pages/searchResult/searchResult.js
Page({
  data: {
    keyword: '',
    results: [],
    allProductList: []
  },

  onLoad: function (options) {
    console.log("----------- SearchResult onLoad -----------");
    console.log("Received options object:", JSON.stringify(options));
    console.log("Raw options.keyword:", options.keyword);

    let decodedKeyword = ''; // 用于存储解码后的关键词
    if (options.keyword) {
      try {
        // 关键改动：手动解码
        decodedKeyword = decodeURIComponent(options.keyword);
        console.log("Decoded keyword:", decodedKeyword); // 确认解码后的值
      } catch (e) {
        console.error("Error decoding keyword:", options.keyword, e);
        decodedKeyword = options.keyword; // 或者设置为 ''
      }
    } else {
      console.log("Keyword not provided in options.");
    }

    this.setData({
      keyword: decodedKeyword // 使用解码后的关键词设置到 data
    });

    const allProducts = wx.getStorageSync('allProductList');
    console.log("--- searchResult onLoad: allProductList from Storage ---", allProducts); // 打印获取到的值
    if (allProducts && allProducts.length > 0) {
        this.setData({ allProductList: allProducts });
        if (decodedKeyword) { // 使用解码后的关键词进行搜索
            this.performSearch(decodedKeyword);
        } else {
            console.log("Decoded keyword is empty, not performing search.");
            this.setData({ results: [] });
        }
    } else {
        console.error("Product list not found in Storage or is empty.");
        wx.showToast({
          title: '商品数据加载失败',
          icon: 'none'
        });
        this.setData({ results: [] });
    }
  },

  performSearch: function (keywordToSearch) {
    console.log("Performing search with keyword:", keywordToSearch);
    if (!keywordToSearch) {
      this.setData({ results: [] });
      return;
    }
    const lowerKeyword = keywordToSearch.toLowerCase();
    
    if (!this.data.allProductList || this.data.allProductList.length === 0) {
        console.error("allProductList is empty in performSearch. Cannot search.");
        this.setData({ results: [] });
        return;
    }
    console.log("Searching in allProductList (first 3 items):", JSON.stringify(this.data.allProductList.slice(0,3)));

    const searchResult = this.data.allProductList.filter(item => {
      const pNameMatch = item.pname && item.pname.toLowerCase().includes(lowerKeyword);
      const catalogMatch = item.catalog && item.catalog.toLowerCase().includes(lowerKeyword);
      const noteMatch = item.note && item.note.toLowerCase().includes(lowerKeyword);
      return pNameMatch || catalogMatch || noteMatch;
    });

    console.log("Search results count:", searchResult.length);
    this.setData({
      results: searchResult
    });

    if (searchResult.length === 0) {
        console.log(`No results found for keyword: "${keywordToSearch}"`);
    }
  },

  goToDetail: function(e) {
    let pd = e.currentTarget.dataset.product;
    pd = JSON.stringify(pd);
    pd = encodeURIComponent(pd);
    wx.navigateTo({
      url: '/pages/detail/detail?product=' + pd,
    });
  },

  goBackHome: function() {
    wx.switchTab({
      url: '/pages/index/index',
      fail: () => {
        wx.navigateBack({ delta: 1 });
      }
    });
  }
});