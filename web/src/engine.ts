import { MediaSample, SAMPLE_MEDIAS } from './samples'

export interface ScanProgressStep {
  status: 'idle' | 'forensic_ela' | 'exifr_audit' | 'k9_sniffer' | 'complete'
  progress: number
  logLine: string
}

// Simulated Forensic Verification Engine
export async function simulateVerification(
  sampleId: string,
  onProgress: (step: ScanProgressStep) => void
): Promise<MediaSample> {
  const sample = SAMPLE_MEDIAS.find((s) => s.id === sampleId) || SAMPLE_MEDIAS[0]

  // Step 1: Forensic Error Level Analysis (ELA)
  onProgress({ status: 'forensic_ela', progress: 10, logLine: 'ForensicAgent initialized. Accessing image pixel arrays...' })
  await delay(600)
  onProgress({ status: 'forensic_ela', progress: 35, logLine: 'Re-compressing image at 90% JPEG density quality...' })
  await delay(500)
  onProgress({ status: 'forensic_ela', progress: 60, logLine: `Pixel difference matrix generated. Error Ratio: ${sample.forensics.avgErrorRatio}%` })
  await delay(400)

  // Step 2: Metadata Audit
  onProgress({ status: 'exifr_audit', progress: 70, logLine: 'MetadataAgent parsing EXIF headers. Accessing manufacturers metadata...' })
  await delay(600)
  onProgress({ status: 'exifr_audit', progress: 85, logLine: `EXIF software signature detected: [${sample.meta.software}]` })
  await delay(500)

  // Step 3: Gemini K-9 Sniffer
  onProgress({ status: 'k9_sniffer', progress: 92, logLine: 'K-9 Sniffer sniffing AI structural anomalies & light refractions...' })
  await delay(800)
  onProgress({ status: 'k9_sniffer', progress: 98, logLine: `Sniffer result: AI probability ${sample.aiProbability}%. Generating Zod verdict.` })
  await delay(400)

  // Done
  onProgress({ status: 'complete', progress: 100, logLine: `AASE Verification completed. Verdict: ${sample.type === 'real' ? 'APPROVED' : 'REJECTED'}` })

  return sample
}

function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
