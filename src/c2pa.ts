/**
 * Real C2PA Content Credentials verification.
 *
 * Uses `c2pa-node` (Rust-backed) to actually read + validate the embedded
 * provenance manifest and its signature chain — not a byte-scan. The dependency
 * is optional + lazily imported, so a server/runtime without it (or a failed
 * native build) degrades gracefully instead of crashing.
 *
 * Standard: C2PA / Content Credentials (https://c2pa.org).
 */

export type C2PAStatus = 'verified' | 'present' | 'absent' | 'unavailable'

export interface C2PAResult {
  status: C2PAStatus
  signer?: string
  claimGenerator?: string
  validationErrors?: string[]
}

export async function verifyC2PA(media: Uint8Array, mimeType = 'image/jpeg'): Promise<C2PAResult> {
  // Lazy, optional dependency (as-string specifier keeps tsc from requiring it).
  let mod: any
  try {
    mod = await import('c2pa-node' as string)
  } catch {
    return { status: 'unavailable' }
  }

  try {
    const c2pa = mod.createC2pa()
    const result = await c2pa.read({ buffer: Buffer.from(media), mimeType })
    const manifest = result?.active_manifest
    if (!manifest) return { status: 'absent' }

    const validation: any[] = Array.isArray(result?.validation_status) ? result.validation_status : []
    const errors = validation
      .filter((v) => v && v.passed === false)
      .map((v) => String(v.code ?? 'validation_error'))

    return {
      status: errors.length === 0 ? 'verified' : 'present',
      signer: manifest?.signature_info?.issuer ?? undefined,
      claimGenerator: manifest?.claim_generator ?? undefined,
      validationErrors: errors.length ? errors : undefined,
    }
  } catch {
    // Unreadable / no manifest
    return { status: 'absent' }
  }
}
