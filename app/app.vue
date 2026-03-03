<template>
  <div class="app-container">
    <NuxtRouteAnnouncer />
    <NuxtPage />
  </div>
</template>

<style scoped>
.app-container {
  min-height: 100vh;
  background-image: url('/img/website_background.png');
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  background-attachment: fixed;
}

/* 手機裝置優化 */
@media (max-width: 768px) {
  .app-container {
    /* 移除 fixed attachment 以改善手機效能和避免 iOS Safari 問題 */
    background-attachment: scroll;
    /* 確保背景覆蓋整個容器 */
    background-size: cover;
  }
}

/* 針對觸控裝置的優化 */
@media (hover: none) and (pointer: coarse) {
  .app-container {
    background-attachment: scroll;
  }
}
</style>
