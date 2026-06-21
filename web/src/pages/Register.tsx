import { useState } from 'react'
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { buildIssueGenesisPassportTx } from '../../../src/sui'
import {
  CONTENT_RIGHT_PACKAGE_ID,
  SUI_CHAIN,
  firstCreatedObjectId,
  lastVerification,
  rememberOnchainState,
  shortId,
  suiscanTxUrl,
} from '../lib/suiNetwork'

export default function Register() {
  const [suinsName, setSuinsName] = useState('')
  const [isMinting, setIsMinting] = useState(false)
  const [mintLogs, setMintLogs] = useState<string[]>([])
  const [passportData, setPassportData] = useState<{
    suins: string
    address: string
    issuedAt: string
    serial: string
    txDigest: string
    explorerUrl: string
  } | null>(null)
  const currentAccount = useCurrentAccount()
  const suiClient = useSuiClient()
  const { mutateAsync: signAndExecuteTransaction } = useSignAndExecuteTransaction({
    execute: async ({ bytes, signature }) =>
      suiClient.executeTransactionBlock({
        transactionBlock: bytes,
        signature,
        options: {
          showRawEffects: true,
          showObjectChanges: true,
          showEvents: true,
        },
      }),
  })

  const handleMintPassport = async () => {
    if (!suinsName.trim() || !currentAccount || !CONTENT_RIGHT_PACKAGE_ID) return
    setIsMinting(true)
    setPassportData(null)
    setMintLogs([])

    try {
      const verification = lastVerification()
      const contentHash = verification?.objective?.sha256 || `manual:${suinsName.trim().toLowerCase()}`
      const grade = verification?.assessment?.grade || 'A'
      const mediaBlobId = verification?.objective?.perceptualHash?.hash || `suins:${suinsName.trim()}`
      const evidenceBlobId = verification?.clueIds?.[0] || verification?.objective?.perceptualHash?.hash || 'local-evidence'

      setMintLogs((prev) => [...prev, `Wallet connected: ${shortId(currentAccount.address)}`])
      setMintLogs((prev) => [...prev, `Building PTB: genesis_passport::issue_passport(${grade}, ${shortId(contentHash, 10, 8)})`])
      const tx = buildIssueGenesisPassportTx({
        packageId: CONTENT_RIGHT_PACKAGE_ID,
        recipient: currentAccount.address,
        contentHash,
        grade,
        mediaBlobId,
        evidenceBlobId,
      })

      setMintLogs((prev) => [...prev, 'Requesting wallet signature and executing on Sui...'])
      const result = await signAndExecuteTransaction({ transaction: tx, chain: SUI_CHAIN })
      const passportObjectId = firstCreatedObjectId(result) || ''
      const timestamp = new Date().toUTCString()

      rememberOnchainState({
        passportId: passportObjectId,
        passportTxDigest: result.digest,
        suins: suinsName.endsWith('.sui') ? suinsName : suinsName + '.sui',
      })
      setMintLogs((prev) => [...prev, `Transaction confirmed: ${shortId(result.digest, 12, 8)}`])
      if (passportObjectId) setMintLogs((prev) => [...prev, `GenesisPassport object: ${shortId(passportObjectId)}`])

      setPassportData({
        suins: suinsName.endsWith('.sui') ? suinsName : suinsName + '.sui',
        address: passportObjectId || currentAccount.address,
        issuedAt: timestamp,
        serial: `SUI-${result.digest.slice(0, 10).toUpperCase()}`,
        txDigest: result.digest,
        explorerUrl: suiscanTxUrl(result.digest),
      })
    } catch (error: any) {
      setMintLogs((prev) => [...prev, `[ERROR] ${error.message || String(error)}`])
    } finally {
      setIsMinting(false)
    }
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1000px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge">Prologue · Identity Gate</span>
        <h2 className="cyber-title">On-chain Identity Registry</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Declare your sovereign SuiNS (Sui Name Service) identity and generate local ephemeral session keys to mint your tamper-proof creator passport NFT.
        </p>
      </div>

      <div className="grid-layout-2">
        {/* Registration Form & Console */}
        <div className="cyber-card">
          <h3 className="card-title">Passport Authority Form</h3>
          <p className="card-subtitle">Connect a Sui wallet and issue a real GenesisPassport transaction from the deployed Move package.</p>

          <div className="linear-card-recessed" style={{ padding: '14px 16px', marginBottom: '20px', display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center' }}>
            <div>
              <div style={{ fontSize: '10px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SUI WALLET STATUS</div>
              <strong style={{ color: currentAccount ? 'var(--neon-emerald)' : 'var(--neon-rose)', fontSize: '12px' }}>
                {currentAccount ? `Connected ${shortId(currentAccount.address)}` : 'Wallet required for real mint'}
              </strong>
              {!CONTENT_RIGHT_PACKAGE_ID && (
                <div style={{ color: 'var(--neon-gold)', fontSize: '10px', marginTop: '4px' }}>
                  Set VITE_CONTENT_RIGHT_PACKAGE_ID to enable package calls.
                </div>
              )}
            </div>
            <ConnectButton />
          </div>

          <div className="cyber-input-wrap">
            <label>Declare SuiNS Identity Name</label>
            <div style={{ display: 'flex', gap: '12px' }}>
              <input
                type="text"
                placeholder="e.g. charles.sui"
                value={suinsName}
                onChange={(e) => setSuinsName(e.target.value)}
                disabled={isMinting}
                style={{ flex: 1 }}
              />
              <button
                onClick={handleMintPassport}
                disabled={isMinting || !suinsName.trim() || !currentAccount || !CONTENT_RIGHT_PACKAGE_ID}
                className="cyber-btn cyber-btn-indigo"
                style={{ padding: '0 28px', whiteSpace: 'nowrap' }}
              >
                {isMinting ? 'Signing On-chain...' : 'Mint Passport'}
              </button>
            </div>
          </div>

          {/* Hologram Terminal Logs */}
          {(isMinting || mintLogs.length > 0) && (
            <div style={{ marginTop: '30px' }}>
              <span className="header-badge" style={{ marginBottom: '10px', fontSize: '9px' }}>Minting Terminal</span>
              <div className="console-container" style={{ height: '200px' }}>
                {mintLogs.map((log, idx) => (
                  <div key={idx} className="console-line">
                    <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                    <span className={`console-tag ${log.startsWith('[ERROR]') ? 'tag-rose' : log.startsWith('Transaction') ? 'tag-success' : 'tag-system'}`}>
                      {log.startsWith('[ERROR]') ? '[FAIL]' : log.startsWith('Transaction') ? '[TX]' : '[PROCESS]'}
                    </span>
                    <span>{log}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 3D Holographic Passport Card Widget */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          {passportData ? (
            <div className="holo-passport-container" style={{ animation: 'fadeInUp 0.6s ease' }}>
              <div className="holo-passport certified scanning" style={{ backgroundImage: "url('/digital-passport.jpg')", backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="holo-laser-scanner"></div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span style={{ fontFamily: 'var(--sans)', fontSize: '10px', fontWeight: 800, color: 'var(--neon-gold)', letterSpacing: '1px' }}>
                    SUI CREATOR PASSPORT
                  </span>
                  
                </div>

                <div className="holo-seal-emblem"></div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <div style={{ borderTop: '1px solid rgba(255,255,255,0.06)', paddingTop: '10px' }}>
                    <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SOVEREIGN IDENTITY</div>
                    <div style={{ fontSize: '18px', fontWeight: 800, color: '#fff', fontFamily: 'var(--sans)' }}>{passportData.suins}</div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>OBJECT ADDRESS</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{shortId(passportData.address)}</div>
                    </div>
                    <div>
                      <div style={{ fontSize: '8px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>SERIAL NUMBER</div>
                      <div style={{ fontSize: '11px', color: 'var(--text-secondary)', fontFamily: 'var(--mono)' }}>{passportData.serial}</div>
                    </div>
                  </div>

                  <div style={{ borderTop: '1px dashed rgba(255,255,255,0.06)', paddingTop: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ fontSize: '7px', color: 'var(--text-muted)', fontFamily: 'var(--mono)' }}>ISSUED TIMESTAMP</div>
                      <div style={{ fontSize: '9px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', overflow: 'hidden', textOverflow: 'ellipsis', maxWidth: '140px', whiteSpace: 'nowrap' }}>{passportData.issuedAt}</div>
                    </div>
                    <a href={passportData.explorerUrl} target="_blank" rel="noreferrer" style={{ color: 'var(--neon-cyan)', fontSize: '9px', fontFamily: 'var(--mono)' }}>
                      Suiscan
                    </a>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div 
              className="cyber-card" 
              style={{ 
                width: '280px', 
                height: '420px', 
                display: 'flex', 
                flexDirection: 'column', 
                alignItems: 'center', 
                justifyContent: 'center', 
                borderStyle: 'dashed',
                background: 'rgba(13, 16, 38, 0.1)',
                opacity: 0.6 
              }}
            >
              <span style={{ fontSize: '40px', marginBottom: '16px' }}></span>
              <p style={{ fontSize: '13px', color: 'var(--text-muted)', textAlign: 'center', padding: '0 20px', lineHeight: 1.5 }}>
                Your holographic gold passport card will materialize here once identity registration completes.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
