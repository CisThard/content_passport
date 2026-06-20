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
    title: 'East Sea Dawn Fishing Boat (DSLR Original Raw)',
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
    note: 'The camera sensor noise profile matches the EXIF metadata signatures perfectly. No synthetic pixel grid variations or artificial modifications were observed, certifying this as a 100% authentic capture.'
  },
  {
    id: 'ai-stable-diffusion',
    name: 'sdxl_cyberpunk_neon_city.jpg',
    type: 'ai',
    title: 'Cyberpunk Neon Alley in Seoul (AI Generated)',
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
    note: 'EXIF hardware metadata has been completely stripped, and Error Level Analysis (ELA) detected a massive density of artificial pixel grid structures typical of modern generative neural networks.'
  }
]
