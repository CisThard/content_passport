export interface MediaSample {
  id: string
  name: string
  type: 'real' | 'ai'
  title: string
  meta: {
    camera: string
    lens: string
    software: string
    creationDate: string
    focalLength: string
    exposure: string
    iso: string
    location: string
  }
  forensics: {
    elaGrade: string
    avgErrorRatio: number
    stdDev: number
    inconsistentPixels: number
  }
  aiProbability: number // 0 to 100
  note: string
}

export const SAMPLE_MEDIAS: MediaSample[] = [
  {
    id: 'real-sony-a7r4',
    name: 'sony_a7r4_raw_origin.jpg',
    type: 'real',
    title: '동해 새벽녘 어선 광경 (DSLR 촬영 원본)',
    meta: {
      camera: 'Sony ILCE-7RM4 (Alpha 7R IV)',
      lens: 'FE 24-70mm F2.8 GM',
      software: 'ILCE-7RM4 v1.20',
      creationDate: '2026-05-12 05:24:11',
      focalLength: '35mm',
      exposure: '1/160s',
      iso: '200',
      location: 'Gangwon, South Korea (37.7556, 128.9839)'
    },
    forensics: {
      elaGrade: 'A+',
      avgErrorRatio: 3.12,
      stdDev: 0.85,
      inconsistentPixels: 140
    },
    aiProbability: 4.8,
    note: '센서 고유 노이즈 패턴과 EXIF 메타데이터 서명이 완벽히 일치합니다. 인공적인 픽셀 그리드 변형 흔적이 관찰되지 않아 100% 실사 촬영물로 판정되었습니다.'
  },
  {
    id: 'ai-stable-diffusion',
    name: 'sdxl_cyberpunk_neon_city.jpg',
    type: 'ai',
    title: '네온 불빛의 사이버펑크 서울 골목길 (AI 생성)',
    meta: {
      camera: 'Camera Hardware Undefined (Missing Header)',
      lens: 'LENS PARAMETERS NOT FOUND',
      software: 'Stable Diffusion XL v1.0 (Automatic1111)',
      creationDate: '2026-06-18 14:02:44 (Synthetic Stamp)',
      focalLength: 'N/A',
      exposure: 'N/A',
      iso: 'N/A',
      location: 'Virtual Grid Coordinate #4419'
    },
    forensics: {
      elaGrade: 'F',
      avgErrorRatio: 78.45,
      stdDev: 34.21,
      inconsistentPixels: 458920
    },
    aiProbability: 99.4,
    note: 'EXIF 하드웨어 메타데이터가 아예 제거되어 있으며, sharpness 오차율 밀도(ELA) 검사에서 생성 AI 특유의 인공 구조적 픽셀 그리드가 대량 감지되었습니다.'
  }
]
