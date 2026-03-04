<script setup lang="ts">
// 匯入範例事件資料
import { sampleEvents } from '~/data/sample-events';

// 控制圖片顯示的響應式狀態
const selectedImage = ref<string | null>(null);
const selectedTitle = ref<string>('');

/**
 * 處理時間軸事件點擊事件
 * @param eventId - 被點擊的事件ID（字串或數字）
 */
const handleEventClick = (eventId: string | number) => {
  console.log('Event clicked:', eventId);

  // 從事件資料中找到對應的事件
  const event = sampleEvents.find(e => e.id === eventId);

  if (event && event.images && event.images.length > 0) {
    // 顯示第一張圖片
    selectedImage.value = event.images[0].url;
    selectedTitle.value = event.title;
  }
};

/**
 * 關閉圖片模態框
 */
const closeModal = () => {
  selectedImage.value = null;
  selectedTitle.value = '';
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

    <!-- 圖片模態框 -->
    <Transition name="modal">
      <div v-if="selectedImage" class="modal-overlay" @click="closeModal">
        <div class="modal-container" @click.stop>
          <button class="modal-close" @click="closeModal" aria-label="關閉">
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
          <div class="modal-content">
            <h2 class="modal-title">{{ selectedTitle }}</h2>
            <img :src="selectedImage" :alt="selectedTitle" class="modal-image">
          </div>
        </div>
      </div>
    </Transition>

    <section class="dashboard-section">
  <h2 class="dashboard-title">量化指標儀表板</h2>

  <div class="dashboard-grid">
    <div class="dashboard-card" v-for="n in 9" :key="n">
      <div class="chart-placeholder">
        <img :src="`/img/d${n}.png`  " alt="圖表佔位符" style="max-width: 100%; max-height: 100%; object-fit: contain;">
      </div>
    </div>
  </div>
</section>


    <!-- 頁尾區塊 -->
    <footer class="page-footer">
      <div class="footer-content">
        <!-- 左側 Logo：教育部技職司 -->
        <div class="footer-item">
          <img src="/img/logo_moe.png" alt="教育部技職司" class="footer-logo">
        </div>
        <div class="footer-item">
          <p class="footer-text">教育部技職司</p>
        </div>
        <!-- 右側 Logo：宏國德霖 -->
        <div class="footer-item">
          <img src="/img/hdut_logo.png" alt="宏國德霖科技大學餐旅學院" class="footer-logo">
        </div>
        <div class="footer-item">
          <p class="footer-text">宏國德霖科技大學餐旅學院</p>
        </div>
      </div>
    </footer>
  </div>




</template>

<style scoped>

/* ==================== 九宮格圖表區 ==================== */

.dashboard-section {
  padding: 4rem 2rem;
  padding-bottom: 22rem; /* 頁尾高度 + 額外間距 */
  background: linear-gradient(180deg, rgba(253, 253, 253, 0.8), rgba(255, 255, 255, 0.9));
  backdrop-filter: blur(10px);
}

.dashboard-title {
  text-align: center;
  font-size: 2rem;
  margin-bottom: 3rem;
  font-weight: 700;
  background: linear-gradient(135deg, #00f5ff, #8b5cf6);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}

.dashboard-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 2rem;
  max-width: 1600px;
  margin: 0 auto;
}

.dashboard-card {
  background: rgba(255,255,255,0.05);
  border-radius: 16px;
  padding: 1.5rem;
  min-height: 260px;
  backdrop-filter: blur(15px);
  border: 1px solid rgba(255,255,255,0.08);
  transition: all 0.3s ease;
}

.dashboard-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 15px 40px rgba(0, 245, 255, 0.2);
}

.chart-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #aaa;
  font-size: 1.25rem;
}


/* 頁面容器樣式 */
.page-container {
  min-height: 100vh;           /* 最小高度為視窗高度 */

  flex-direction: column;
  background: transparent;      /* 透明背景，顯示父層背景圖 */
  color: #e0e0e0;              /* 淺灰色文字 */
  position: relative;         /* 相對定位 */
  font-family: 'DFKai-SB', 'KaiTi', '標楷體', serif;  /* 標楷體字型 */
}

/* 頁首樣式 */
.page-header {
  padding: 2.5rem 2rem;                                /* 上下2.5rem，左右2rem間距 */
  text-align: center;                                   /* 文字置中 */
  background: rgba(255, 255, 255, 0.8);                  /* 半透明深色背景 */
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
  padding: 3rem 10rem;    /* 上下3rem，左右2rem間距 */
  max-width: 1800px;     /* 最大寬度1800px */
  margin: 0 auto;        /* 水平置中 */
}

/* 頁尾樣式 */
.page-footer {
  padding: 2rem;                                      /* 內邊距2rem */
  background: rgb(255, 255, 255);                /* 半透明背景 */
  backdrop-filter: blur(20px);                         /* 背景模糊效果 */
  border-top: 2px solid rgba(102, 126, 234, 0.2);     /* 頂部紫藍色半透明邊框 */
  box-shadow: 0 -4px 20px rgba(0, 0, 0, 0.3);        /* 向上陰影效果 */
  position: absolute;                                   /* 絕對定位 */
  bottom: 0;                                           /* 固定在底部 */
  left: 0;                                             /* 左側對齊 */
  right: 0;                                            /* 右側對齊 */
}

/* 頁尾內容容器 */
.footer-content {
  display: flex;                   /* 彈性盒布局 */
  justify-content: center;  /* 左右分散對齊 */
  align-items: center;             /* 垂直置中 */
  max-width: 1800px;              /* 最大寬度 */
  margin: 0 auto;                 /* 水平置中 */
}

/* 頁尾項目 */
.footer-item {
  display: flex;           /* 彈性盒布局 */
  flex-direction: column;  /* 垂直排列 */
  align-items: center;     /* 水平置中 */
  gap: 0.5rem;            /* 間距0.5rem */
}

/* 頁尾 Logo */
.footer-logo {
  height: 80px;                        /* 高度80px */
  width: auto;                         /* 寬度自動 */
  object-fit: contain;                 /* 保持比例 */
}

/* 頁尾文字 */
.footer-text {
  margin: 0;                    /* 無外邊距 */
  font-size: 2rem;              /* 字體大小1rem */
  font-weight: 600;             /* 半粗體 */
  color: #000000;              /* 淺灰色文字 */
  text-align: left;           /* 文字置中 */
}

/* ==================== 圖片模態框樣式 ==================== */

/* 模態框覆蓋層 */
.modal-overlay {
  position: fixed;                              /* 固定定位 */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.85);             /* 半透明黑色背景 */
  display: flex;                                /* 彈性盒布局 */
  align-items: center;                          /* 垂直置中 */
  justify-content: center;                      /* 水平置中 */
  z-index: 1000;                               /* 高層級顯示 */
  padding: 2rem;                               /* 內邊距 */
  backdrop-filter: blur(5px);                  /* 背景模糊效果 */
}

/* 模態框容器 */
.modal-container {
  position: relative;                           /* 相對定位 */
  background: white;                            /* 白色背景 */
  border-radius: 12px;                         /* 圓角 */
  max-width: 90vw;                             /* 最大寬度90%視窗寬度 */
  max-height: 90vh;                            /* 最大高度90%視窗高度 */
  overflow: auto;                              /* 內容溢出時顯示捲軸 */
  box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5);  /* 陰影效果 */
}

/* 模態框內容 */
.modal-content {
  padding: 2rem;                               /* 內邊距 */
  display: flex;                               /* 彈性盒布局 */
  flex-direction: column;                      /* 垂直排列 */
  align-items: center;                         /* 水平置中 */
  gap: 1.5rem;                                /* 間距 */
}

/* 模態框標題 */
.modal-title {
  margin: 0;                                   /* 無外邊距 */
  font-size: 1.5rem;                          /* 字體大小 */
  font-weight: 700;                           /* 粗體 */
  color: #1a1a1a;                             /* 深色文字 */
  text-align: center;                         /* 文字置中 */
}

/* 模態框圖片 */
.modal-image {
  max-width: 100%;                            /* 最大寬度100% */
  max-height: 70vh;                           /* 最大高度70%視窗高度 */
  width: auto;                                /* 寬度自動 */
  height: auto;                               /* 高度自動 */
  object-fit: contain;                        /* 保持比例 */
  border-radius: 8px;                         /* 圓角 */
}

/* 關閉按鈕 */
.modal-close {
  position: absolute;                         /* 絕對定位 */
  top: 1rem;                                 /* 距離頂部1rem */
  right: 1rem;                               /* 距離右側1rem */
  background: rgba(0, 0, 0, 0.5);           /* 半透明黑色背景 */
  color: white;                              /* 白色文字 */
  border: none;                              /* 無邊框 */
  border-radius: 50%;                        /* 圓形 */
  width: 40px;                               /* 寬度40px */
  height: 40px;                              /* 高度40px */
  display: flex;                             /* 彈性盒布局 */
  align-items: center;                       /* 垂直置中 */
  justify-content: center;                   /* 水平置中 */
  cursor: pointer;                           /* 游標為指標 */
  transition: all 0.2s ease;                /* 過渡動畫 */
  z-index: 10;                              /* 確保在最上層 */
}

/* 關閉按鈕懸停效果 */
.modal-close:hover {
  background: rgba(0, 0, 0, 0.7);           /* 懸停時背景更深 */
  transform: scale(1.1);                     /* 稍微放大 */
}

/* 模態框進入動畫 */
.modal-enter-active {
  transition: opacity 0.3s ease;
}

.modal-enter-from {
  opacity: 0;
}

.modal-leave-active {
  transition: opacity 0.2s ease;
}

.modal-leave-to {
  opacity: 0;
}

/* ==================== 響應式設計 (RWD) ==================== */

/* 平板裝置 (最大寬度 1024px) */
@media (max-width: 1024px) {
  .dashboard-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .page-header {
    padding: 2rem 1.5rem;
  }

  .page-header h1 {
    font-size: 1.75rem;
  }

  .page-main {
    padding: 2rem 5rem;
  }

  .footer-text {
    font-size: 1.5rem;
  }

  .footer-logo {
    height: 70px;
  }

  .modal-content {
    padding: 1.5rem;
  }

  .modal-title {
    font-size: 1.25rem;
  }
}

/* 小型平板裝置 (最大寬度 768px) */
@media (max-width: 768px) {
  .page-header {
    padding: 1.5rem 1rem;
  }

  .page-header h1 {
    font-size: 1.5rem;
    line-height: 1.5;
  }

  .page-main {
    padding: 2rem 2rem;
  }

  .footer-content {
    flex-direction: column;
    gap: 1.5rem;
  }

  .footer-item {
    width: 100%;
  }

  .footer-text {
    font-size: 1.25rem;
  }

  .footer-logo {
    height: 60px;
  }

  .modal-overlay {
    padding: 1rem;
  }

  .modal-content {
    padding: 1rem;
  }

  .modal-title {
    font-size: 1.125rem;
  }
}

@media (max-width: 600px) {
  .dashboard-grid {
    grid-template-columns: 1fr;
  }
}


/* 手機裝置 (最大寬度 480px) */
@media (max-width: 480px) {
  .page-container {
    height: auto;
    min-height: 100vh;
  }

  .page-header {
    padding: 1.25rem 0.75rem;
  }

  .page-header h1 {
    font-size: 1.125rem;
    line-height: 1.6;
    letter-spacing: 0;
  }

  .page-main {
    padding: 1.5rem 1rem;
  }

  .page-footer {
    position: relative;
    padding: 1.5rem 1rem;
  }

  .footer-content {
    gap: 1.25rem;
  }

  .footer-text {
    font-size: 1rem;
  }

  .footer-logo {
    height: 50px;
  }

  .modal-overlay {
    padding: 0.5rem;
  }

  .modal-content {
    padding: 1rem 0.75rem;
  }

  .modal-title {
    font-size: 1rem;
  }

  .modal-close {
    width: 36px;
    height: 36px;
    top: 0.75rem;
    right: 0.75rem;
  }

  .modal-image {
    max-height: 60vh;
  }
}

/* 超小型手機裝置 (最大寬度 360px) */
@media (max-width: 360px) {
  .page-header {
    padding: 1rem 0.5rem;
  }

  .page-header h1 {
    font-size: 1rem;
  }

  .page-main {
    padding: 1rem 0.5rem;
  }

  .page-footer {
    padding: 1.25rem 0.5rem;
  }

  .footer-text {
    font-size: 0.875rem;
  }

  .footer-logo {
    height: 40px;
  }

  .modal-overlay {
    padding: 0.25rem;
  }

  .modal-content {
    padding: 0.75rem 0.5rem;
  }

  .modal-title {
    font-size: 0.875rem;
  }

  .modal-close {
    width: 32px;
    height: 32px;
    top: 0.5rem;
    right: 0.5rem;
  }

  .modal-image {
    max-height: 55vh;
  }
}
</style>
