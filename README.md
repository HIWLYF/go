# index-page
一个简单的导航页

不懂前端，借用了 [@skywalker512](https://github.com/skywalker512/go) 的静态导航页做了一些修改, 使用json文件来控制页面显示的内容。


# 
```
{
  "page_title": "主页",
  "page_logo": "/static/img/logo3.jpg",
  "page_icon": "/static/img/logo3.jpg",
  "page_desc": "这是一个导航页面",
  "page_background": "/static/img/mountain.jpg",
  "page_background_m": "/static/img/mountain_m.jpg",
  "blocks": [
    {
      "block_title": "常用",
      "display": true,
      "items": [
        {
          "block_title": "模板",
          "display": false,
          "items": [
            {
              "title": "标题",
              "display": true,
              "url": "https://www.example.com",
              "hotkey": []
            },
            {
              "title": "标题",
              "display": true,
              "url": "https://www.example.com",
              "hotkey": []
            }
          ]
        }
      ]
    }
  ]
}
```
