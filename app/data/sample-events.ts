import type { TimelineEvent } from '~/types/timeline';

/**
 * Sample historical events for timeline demonstration
 */
export const sampleEvents: TimelineEvent[] = [
  {
    id: 1,
    title: 'Google AI 教學萬花筒',
    date: new Date('2025-11-06'),
    category: 'AI專題演講',
    description: '',
    images: [
      {
        url: '/img/1106.png',
        alt: 'Google AI 教學萬花筒',
        caption: 'Google AI 教學萬花筒'
      }
    ]
  },
  {
    id: 2,
    title: 'AI趨勢當頭對教學研究的影響',
    date: new Date('2025-11-27'),
    category: 'AI專題演講',
    description: '',
    images: [
      {
        url: '/img/1127.png',
        alt: 'AI趨勢當頭對教學研究的影響',
        caption: 'AI趨勢當頭對教學研究的影響'
      }
    ]
  },
  {
    id: 3,
    title: 'AI智慧工作實務應用-智慧協作篇',
    date: new Date('2025-12-04'),
    category: 'AI專題演講',
    description: '',
    images: [
      {
        url: '/img/1204.png',
        alt: 'AI智慧工作實務應用-智慧協作篇',
        caption: 'AI智慧工作實務應用-智慧協作篇'
      }
    ]
  },
  {
    id: 4,
    title: 'AI智慧工作實務應用-知識管理篇',
    date: new Date('2025-12-11'),
    category: 'AI專題演講',
    description: '',
    images: [
      {
        url: '/img/1211.png',
        alt: 'AI智慧工作實務應用-知識管理篇',
        caption: 'AI智慧工作實務應用-知識管理篇'
      }
    ]
  },
  {
    id: 5,
    title: 'AI基礎應用與創意繪圖競賽人才培育營',
    date: new Date('2026-01-21'),
    category: '建置實做場域',
    description: '',
    images: [
      {
        url: '/img/0121.png',
        alt: 'AI基礎應用與創意繪圖競賽人才培育營',
        caption: 'AI基礎應用與創意繪圖競賽人才培育營'
      }
    ]
  },{
    id: 6,
    title: '生成式AI師資精進課程教材設計工作坊',
    date: new Date('2026-02-09'),
    category: 'AI工作坊',
    description: '',
    images: [
      {
        url: '/img/0209.png',
        alt: '生成式AI師資精進課程教材設計工作坊',
        caption: '生成式AI師資精進課程教材設計工作坊'
      }
    ]
  }




];
