export const ZK_LOGIN_SESSION_EVENT = 'content-passport:zk-login-session'

const SESSION_KEYS = {
  jwt: 'cp_zk_jwt',
  address: 'cp_zk_address',
  proof: 'cp_zk_proof',
  addressSeed: 'cp_zk_address_seed',
  picture: 'cp_zk_picture',
  name: 'cp_zk_name',
} as const

export interface ZkLoginSessionSnapshot {
  address: string | null
  picture: string | null
  name: string | null
}

export function readZkLoginSession(): ZkLoginSessionSnapshot {
  return {
    address: sessionStorage.getItem(SESSION_KEYS.address),
    picture: sessionStorage.getItem(SESSION_KEYS.picture),
    name: sessionStorage.getItem(SESSION_KEYS.name),
  }
}

export function clearZkLoginSessionStorage(): void {
  Object.values(SESSION_KEYS).forEach((key) => sessionStorage.removeItem(key))
}

export function emitZkLoginSessionChanged(): void {
  window.dispatchEvent(new Event(ZK_LOGIN_SESSION_EVENT))
}

