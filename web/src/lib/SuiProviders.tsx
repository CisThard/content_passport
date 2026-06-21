import { ReactNode, useMemo } from 'react'
import { createNetworkConfig, SuiClientProvider, WalletProvider } from '@mysten/dapp-kit'
import { getJsonRpcFullnodeUrl } from '@mysten/sui/jsonRpc'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { SUI_NETWORK } from './suiNetwork'
import '@mysten/dapp-kit/dist/index.css'

const { networkConfig } = createNetworkConfig({
  testnet: { url: getJsonRpcFullnodeUrl('testnet') },
  mainnet: { url: getJsonRpcFullnodeUrl('mainnet') },
  devnet: { url: getJsonRpcFullnodeUrl('devnet') },
  localnet: { url: getJsonRpcFullnodeUrl('localnet') },
})

export function SuiProviders({ children }: { children: ReactNode }) {
  const queryClient = useMemo(() => new QueryClient(), [])

  return (
    <QueryClientProvider client={queryClient}>
      <SuiClientProvider networks={networkConfig} defaultNetwork={SUI_NETWORK}>
        <WalletProvider autoConnect>{children}</WalletProvider>
      </SuiClientProvider>
    </QueryClientProvider>
  )
}
