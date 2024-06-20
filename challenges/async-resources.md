# async-resources

有沒有辦法在任意元件中，得知其子孫元件內所有的非同步資源是否載入完成？

例如：

- App.vue 元件得知所有圖片載入完成，隱藏 loading 效果。
- Card 元件確認內部資源載入完成，隱藏局部 loading 效果。
