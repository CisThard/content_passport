import { Ed25519Keypair } from '@mysten/sui/keypairs/ed25519'
import { generateNonce, generateRandomness } from '@mysten/sui/zklogin'

// Session Storage keys
const EPHEMERAL_KEY_KEY = 'content_passport_ephemeral_key'
const RANDOMNESS_KEY = 'content_passport_zklogin_randomness'
const MAX_EPOCH_KEY = 'content_passport_zklogin_max_epoch'

export interface EphemeralSession {
  keypair: Ed25519Keypair
  randomness: string
  maxEpoch: number
}

/**
 * Loads the existing ephemeral session keypair from sessionStorage or generates a new one.
 * The session is valid for the current epoch + 10 (approx. 24h validity).
 */
export function getOrSetEphemeralSession(currentEpoch: number | null = 100): EphemeralSession {
  const storedKey = sessionStorage.getItem(EPHEMERAL_KEY_KEY)
  const storedRandomness = sessionStorage.getItem(RANDOMNESS_KEY)
  const storedMaxEpoch = sessionStorage.getItem(MAX_EPOCH_KEY)

  const parsedMaxEpoch = Number.parseInt(storedMaxEpoch || '', 10)
  const epochToCheck = currentEpoch ?? 100
  if (storedKey && storedRandomness && Number.isSafeInteger(parsedMaxEpoch) && parsedMaxEpoch > epochToCheck) {
    try {
      const keypair = Ed25519Keypair.fromSecretKey(storedKey)
      return {
        keypair,
        randomness: storedRandomness,
        maxEpoch: parsedMaxEpoch
      }
    } catch (e) {
      console.warn('Failed to load ephemeral session, recreating...', e)
    }
  } else if (storedKey || storedRandomness || storedMaxEpoch) {
    clearEphemeralSession()
  }

  // Create new session keypair
  const keypair = new Ed25519Keypair()
  const randomness = generateRandomness()
  const maxEpoch = epochToCheck + 10

  sessionStorage.setItem(EPHEMERAL_KEY_KEY, keypair.getSecretKey())
  sessionStorage.setItem(RANDOMNESS_KEY, randomness)
  sessionStorage.setItem(MAX_EPOCH_KEY, maxEpoch.toString())

  return { keypair, randomness, maxEpoch }
}

/**
 * Builds the redirection URL to Google OAuth for OIDC identity verification.
 */
export function buildGoogleAuthUrl(params: {
  clientId: string
  redirectUri: string
  nonce: string
}): string {
  const url = new URL('https://accounts.google.com/o/oauth2/v2/auth')
  url.searchParams.set('client_id', params.clientId)
  url.searchParams.set('redirect_uri', params.redirectUri)
  url.searchParams.set('response_type', 'id_token')
  url.searchParams.set('scope', 'openid email profile')
  url.searchParams.set('nonce', params.nonce)
  return url.toString()
}

/**
 * Extracts the OIDC JSON Web Token (JWT) from the window location hash after redirection.
 */
export function getJwtFromUrlHash(): string | null {
  const hash = window.location.hash
  if (!hash) return null
  const params = new URLSearchParams(hash.substring(1))
  return params.get('id_token')
}

/**
 * Clears the session keys.
 */
export function clearEphemeralSession(): void {
  sessionStorage.removeItem(EPHEMERAL_KEY_KEY)
  sessionStorage.removeItem(RANDOMNESS_KEY)
  sessionStorage.removeItem(MAX_EPOCH_KEY)
}
