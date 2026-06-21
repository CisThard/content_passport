import { createNetworkConfig } from '@mysten/dapp-kit'
import { getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc'

export const SUI_NETWORK = (import.meta.env.VITE_SUI_NETWORK || 'testnet') as 'testnet' | 'mainnet' | 'devnet' | 'localnet'
export const SUI_CHAIN = `sui:${SUI_NETWORK}`
export const CONTENT_RIGHT_PACKAGE_ID = import.meta.env.VITE_CONTENT_RIGHT_PACKAGE_ID || import.meta.env.VITE_SUI_PACKAGE_ID || ''

export const { networkConfig } = createNetworkConfig({
  testnet: { url: getJsonRpcFullnodeUrl('testnet') },
  mainnet: { url: getJsonRpcFullnodeUrl('mainnet') },
  devnet: { url: getJsonRpcFullnodeUrl('devnet') },
  localnet: { url: getJsonRpcFullnodeUrl('localnet') },
})

export function suiscanTxUrl(digest: string) {
  const networkPath = SUI_NETWORK === 'mainnet' ? 'mainnet' : SUI_NETWORK
  return `https://suiscan.xyz/${networkPath}/tx/${digest}`
}

export function shortId(value: string, head = 8, tail = 6) {
  if (!value) return ''
  if (value.length <= head + tail + 3) return value
  return `${value.slice(0, head)}...${value.slice(-tail)}`
}

export function firstCreatedObjectId(result: unknown) {
  const changes = (result as { objectChanges?: Array<Record<string, unknown>> }).objectChanges || []
  const created = changes.find((change) => change.type === 'created' && typeof change.objectId === 'string')
  return created?.objectId as string | undefined
}

export function lastVerification() {
  try {
    const raw = localStorage.getItem('cr:lastVerification')
    return raw ? JSON.parse(raw) : null
  } catch {
    return null
  }
}

export function rememberOnchainState(patch: Record<string, unknown>) {
  const current = readOnchainState()
  localStorage.setItem('cr:onchain', JSON.stringify({ ...current, ...patch, updatedAt: new Date().toISOString() }))
}

export function readOnchainState(): Record<string, any> {
  try {
    return JSON.parse(localStorage.getItem('cr:onchain') || '{}')
  } catch {
    return {}
  }
}
