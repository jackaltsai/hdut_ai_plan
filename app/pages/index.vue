<script setup lang="ts">
// 匯入範例事件資料
import { sampleEvents } from '~/data/sample-events';

/**
 * 處理時間軸事件點擊事件
 * @param eventId - 被點擊的事件ID（字串或數字）
 */
const handleEventClick = (eventId: string | number) => {
  console.log('Event clicked:', eventId);
};
</script>

<template>
  <!-- 頁面主容器 -->
  <div class="page-container">
    <!-- 頁面標題區塊 -->
    <header class="page-header">
      <h1>基於AI融入跨系科課程體驗活動鏈結師資設備產業精進技職教育人才培育</h1>

    </header>

    <!-- 主要內容區塊 -->
    <main class="page-main">
      <!-- 時間軸元件 -->
      <!--
        配置說明：
        - events: 傳入事件資料陣列
        - config.minZoom: 最小縮放比例 (0.3)
        - config.maxZoom: 最大縮放比例 (8)
        - config.defaultZoom: 預設縮放比例 (1)
        - config.theme: 主題色調 (dark)
        - config.eventHeight: 事件卡片高度 (220px)
        - @event-click: 事件點擊時的回調函數
      -->
      <Timeline
        :events="sampleEvents"
        :config="{
          minZoom: 0.3,
          maxZoom: 8,
          defaultZoom: 1,
          theme: 'dark',
          eventHeight: 220,
        }"
        @event-click="handleEventClick"
      />
    </main>
  </div>
</template>

<style scoped>
/* 頁面容器樣式 */
.page-container {
  min-height: 2000vh;           /* 最小高度為視窗高度 */
  background: transparent;      /* 透明背景，顯示父層背景圖 */
  color: #e0e0e0;              /* 淺灰色文字 */
  position: relative;           /* 相對定位 */
}

/* 頁首樣式 */
.page-header {
  padding: 2.5rem 2rem;                                /* 上下2.5rem，左右2rem間距 */
  text-align: center;                                   /* 文字置中 */
  background: rgba(255, 255, 255, 0.1);                  /* 半透明深色背景 */
  backdrop-filter: blur(20px);                         /* 背景模糊效果 */
  border-bottom: 2px solid rgba(102, 126, 234, 0.2);   /* 底部紫藍色半透明邊框 */
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);          /* 陰影效果 */
}

/* 頁首標題樣式 */
.page-header h1 {
  margin: 0 0 0.5rem 0;                                       /* 下方0.5rem間距 */
  font-size: 2rem;                                            /* 字體大小2rem */
  font-weight: 700;                                           /* 粗體 */
  background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);  /* 漸層背景色 */
  -webkit-background-clip: text;                              /* 背景裁切為文字形狀 */
  -webkit-text-fill-color: transparent;                       /* 文字填充透明 */
  background-clip: text;                                      /* 背景裁切為文字形狀（標準屬性） */
  text-shadow: 0 0 30px rgba(102, 126, 234, 0.5);           /* 紫藍色發光效果 */
  line-height: 1.4;                                           /* 行高 */
  letter-spacing: -0.02em;                                    /* 字距微調 */
}

/* 頁首段落樣式 */
.page-header p {
  margin: 0;            /* 無外邊距 */
  font-size: 1.125rem;  /* 字體大小1.125rem */
  color: #888;          /* 灰色文字 */
}

/* 主要內容區樣式 */
.page-main {
  padding: 3rem 2rem;    /* 上下3rem，左右2rem間距 */
  max-width: 1800px;     /* 最大寬度1800px */
  margin: 0 auto;        /* 水平置中 */
}
</style>
