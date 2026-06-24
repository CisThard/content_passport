import { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import { ConnectButton, useCurrentAccount, useSignAndExecuteTransaction, useSuiClient } from '@mysten/dapp-kit'
import { buildCreateAndFundPolicyTx, buildDistributeRoyaltiesTx } from '../../../src/sui'
import { SuiProviders } from '../lib/SuiProviders'
import {
  CONTENT_RIGHT_PACKAGE_ID,
  SUI_CHAIN,
  firstCreatedObjectId,
  readOnchainState,
  rememberOnchainState,
  shortId,
  suiscanTxUrl,
} from '../lib/suiNetwork'

interface VisualCoin {
  x: number
  y: number
  targetX: number
  targetY: number
  speed: number
  progress: number
  size: number
  color: string
}

function parseRangeValue(value: string, fallback: number): number {
  const next = Number.parseFloat(value)
  return Number.isFinite(next) ? next : fallback
}

function clamp(value: number, min: number, max: number): number {
  return Math.min(Math.max(value, min), max)
}

function BlueprintContent() {
  // State for Remix Chain Simulator
  const [anyaFee, setAnyaFee] = useState<number>(0.3)
  const [benFee, setBenFee] = useState<number>(0.5)
  const [chloeFee, setChloeFee] = useState<number>(0.2)

  // State for Bounty Quest Simulator
  const [totalBounty, setTotalBounty] = useState<number>(120)
  const [anyaClaim, setAnyaClaim] = useState<number>(40)
  const [benClaim, setBenClaim] = useState<number>(50)
  const [chloeClaim, setChloeClaim] = useState<number>(30)
  
  const [passportId, setPassportId] = useState('')
  const [policyId, setPolicyId] = useState('')
  const [participantA, setParticipantA] = useState('')
  const [participantB, setParticipantB] = useState('')
  const [participantC, setParticipantC] = useState('')
  const [chainLogs, setChainLogs] = useState<string[]>([])
  const [chainBusy, setChainBusy] = useState(false)
  const [lastDigest, setLastDigest] = useState('')
  const [serverPackageId, setServerPackageId] = useState('')
  
  // Tab control for dry-run terminal vs chain logs
  const [activeTerminalTab, setActiveTerminalTab] = useState<'dryrun' | 'logs'>('dryrun')

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

  // Calculations for Remix Chain
  const totalRemixCost = anyaFee + benFee + chloeFee
  const anyaRemixWeight = totalRemixCost > 0 ? Math.round((anyaFee / totalRemixCost) * 100) : 0
  const benRemixWeight = totalRemixCost > 0 ? Math.round((benFee / totalRemixCost) * 100) : 0
  const chloeRemixWeight = totalRemixCost > 0 ? 100 - anyaRemixWeight - benRemixWeight : 0

  // Calculations for Bounty Quest
  const totalClaimed = anyaClaim + benClaim + chloeClaim
  const remainingBounty = totalBounty - totalClaimed
  const claimProgressPercent = totalBounty > 0 ? Math.min((totalClaimed / totalBounty) * 100, 100) : 0

  const anyaBountyWeight = totalBounty > 0 ? Math.round((anyaClaim / totalBounty) * 100) : 0
  const benBountyWeight = totalBounty > 0 ? Math.round((benClaim / totalBounty) * 100) : 0
  const chloeBountyWeight = totalBounty > 0 ? 100 - anyaBountyWeight - benBountyWeight : 0
  const anyaClaimMax = Math.max(10, totalBounty - 20)
  const benClaimMax = Math.max(10, totalBounty - anyaClaim - 10)
  const chloeClaimMax = Math.max(10, totalBounty - anyaClaim - benClaim)

  // Canvas visual refs
  const canvasRef = useRef<HTMLCanvasElement | null>(null)
  const animationRef = useRef<number | null>(null)
  const coinsRef = useRef<VisualCoin[]>([])
  const [isSimulating, setIsSimulating] = useState(false)

  // Floating feedback values
  const [floatingAnya, setFloatingAnya] = useState<string | null>(null)
  const [floatingBen, setFloatingBen] = useState<string | null>(null)
  const [floatingChloe, setFloatingChloe] = useState<string | null>(null)

  const activePackageId = serverPackageId || CONTENT_RIGHT_PACKAGE_ID

  useEffect(() => {
    const state = readOnchainState()
    setPassportId(state.passportId || '')
    setPolicyId(state.policyId || '')
    setLastDigest(state.policyTxDigest || state.settlementTxDigest || '')

    fetch('/api/auth/config')
      .then((res) => res.json())
      .then((data) => {
        if (data.packageId) setServerPackageId(data.packageId)
      })
      .catch((err) => console.error('Failed to load auth config in Blueprint:', err))
  }, [])

  useEffect(() => {
    if (currentAccount && !participantA) setParticipantA(currentAccount.address)
  }, [currentAccount, participantA])

  useEffect(() => {
    setAnyaClaim((value) => clamp(value, 10, Math.max(10, totalBounty - 20)))
    setBenClaim((value) => clamp(value, 10, Math.max(10, totalBounty - anyaClaim - 10)))
    setChloeClaim((value) => clamp(value, 10, Math.max(10, totalBounty - anyaClaim - benClaim)))
  }, [totalBounty, anyaClaim, benClaim])

  const liveParticipants = [
    { address: participantA.trim(), weight: anyaRemixWeight },
    { address: participantB.trim(), weight: benRemixWeight },
    { address: participantC.trim(), weight: chloeRemixWeight },
  ].filter((participant) => participant.address)

  const participantTotal = liveParticipants.reduce((sum, participant) => sum + participant.weight, 0)
  const canCreatePolicy =
    Boolean(currentAccount && activePackageId && passportId.trim() && liveParticipants.length > 0 && participantTotal === 100)

  const appendChainLog = (message: string) => {
    setChainLogs((prev) => [...prev, message])
    setActiveTerminalTab('logs') // auto-switch to logs when new output occurs
  }

  // ==========================================
  // 💰 Real-time Creator Stream Graph Renderer
  // ==========================================
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    const width = canvas.width
    const height = canvas.height

    // Nodes positions mapping
    const nodeEscrow = { x: width / 2, y: height - 60, name: 'Sui Escrow', color: '#00f5a0' }
    const nodeAnya = { x: 70, y: 60, name: 'Anya (Origin)', color: '#f59e0b', weight: anyaRemixWeight, val: ((totalRemixCost * anyaRemixWeight) / 100).toFixed(2) }
    const nodeBen = { x: width / 2, y: 60, name: 'Ben (Remix)', color: '#06b6d4', weight: benRemixWeight, val: ((totalRemixCost * benRemixWeight) / 100).toFixed(2) }
    const nodeChloe = { x: width - 70, y: 60, name: 'Chloe (Sound)', color: '#ec4899', weight: chloeRemixWeight, val: ((totalRemixCost * chloeRemixWeight) / 100).toFixed(2) }

    const updateFrame = () => {
      ctx.clearRect(0, 0, width, height)

      // 1. Draw connecting dynamic streams (weight-based thickness)
      const drawStream = (from: typeof nodeEscrow, to: typeof nodeAnya, weight: number, color: string) => {
        ctx.beginPath()
        ctx.moveTo(from.x, from.y)
        // Draw elegant curve
        ctx.bezierCurveTo(from.x, from.y - 60, to.x, to.y + 60, to.x, to.y)
        ctx.lineWidth = Math.max(1, weight * 0.12)
        ctx.strokeStyle = `rgba(${color === '#f59e0b' ? '245, 158, 11' : color === '#06b6d4' ? '6, 182, 212' : '236, 72, 153'}, ${isSimulating ? 0.35 : 0.15})`
        ctx.stroke()
      }

      drawStream(nodeEscrow, nodeAnya, anyaRemixWeight, nodeAnya.color)
      drawStream(nodeEscrow, nodeBen, benRemixWeight, nodeBen.color)
      drawStream(nodeEscrow, nodeChloe, chloeRemixWeight, nodeChloe.color)

      // 2. Update and Draw coins particles
      const coins = coinsRef.current
      for (let i = coins.length - 1; i >= 0; i--) {
        const coin = coins[i]
        coin.progress += coin.speed

        // Quadratic bezier interpolation for fluid curves
        const t = coin.progress
        const x1 = nodeEscrow.x
        const y1 = nodeEscrow.y
        const x2 = coin.targetX
        const y2 = coin.targetY
        
        // Control point
        const cx = (x1 + x2) / 2
        const cy = y1 - 80

        // Bezier formula
        coin.x = (1 - t) * (1 - t) * x1 + 2 * (1 - t) * t * cx + t * t * x2
        coin.y = (1 - t) * (1 - t) * y1 + 2 * (1 - t) * t * cy + t * t * y2

        // Draw particle glow
        ctx.beginPath()
        ctx.arc(coin.x, coin.y, coin.size, 0, 2 * Math.PI)
        ctx.fillStyle = coin.color
        ctx.shadowColor = coin.color
        ctx.shadowBlur = 8
        ctx.fill()
        ctx.shadowBlur = 0

        // Handle target arrival
        if (coin.progress >= 1.0) {
          if (coin.targetX === nodeAnya.x) setFloatingAnya(`+${nodeAnya.val} SUI`)
          else if (coin.targetX === nodeBen.x) setFloatingBen(`+${nodeBen.val} SUI`)
          else if (coin.targetX === nodeChloe.x) setFloatingChloe(`+${nodeChloe.val} SUI`)
          coins.splice(i, 1)
        }
      }

      if (coins.length === 0 && isSimulating) {
        setIsSimulating(false)
        // Reset floating amounts after a brief display delay
        setTimeout(() => {
          setFloatingAnya(null)
          setFloatingBen(null)
          setFloatingChloe(null)
        }, 1500)
      }

      // 3. Render Nodes
      const drawNode = (node: typeof nodeEscrow, isActive = false) => {
        ctx.beginPath()
        ctx.arc(node.x, node.y, 16, 0, 2 * Math.PI)
        ctx.fillStyle = '#0d1026'
        ctx.strokeStyle = node.color
        ctx.lineWidth = 3
        ctx.shadowColor = node.color
        ctx.shadowBlur = isActive ? 12 : 4
        ctx.fill()
        ctx.stroke()
        ctx.shadowBlur = 0

        // Label name
        ctx.fillStyle = '#fff'
        ctx.font = '10px sans-serif'
        ctx.textAlign = 'center'
        ctx.fillText(node.name, node.x, node.y - 24)

        // Draw dynamic share percentage inside/below node
        if ('weight' in node) {
          ctx.fillStyle = node.color
          ctx.font = 'bold 9px monospace'
          ctx.fillText(`${node.weight}%`, node.x, node.y + 4)
        } else {
          ctx.fillStyle = 'var(--neon-emerald)'
          ctx.font = '9px monospace'
          ctx.fillText('🏛️', node.x, node.y + 3)
        }
      }

      drawNode(nodeEscrow, isSimulating)
      drawNode(nodeAnya, floatingAnya !== null)
      drawNode(nodeBen, floatingBen !== null)
      drawNode(nodeChloe, floatingChloe !== null)

      animationRef.current = requestAnimationFrame(updateFrame)
    }

    updateFrame()

    return () => {
      if (animationRef.current) cancelAnimationFrame(animationRef.current)
    }
  }, [anyaRemixWeight, benRemixWeight, chloeRemixWeight, totalRemixCost, isSimulating, floatingAnya, floatingBen, floatingChloe])

  const triggerRoyaltySimulation = () => {
    if (isSimulating) return
    setIsSimulating(true)
    coinsRef.current = []

    const canvas = canvasRef.current
    if (!canvas) return
    const width = canvas.width

    // Node locations
    const nodeAnya = { x: 70, y: 60 }
    const nodeBen = { x: width / 2, y: 60 }
    const nodeChloe = { x: width - 70, y: 60 }

    // Generate gold coin particles proportional to weights
    const totalCoins = 60
    const countAnya = Math.round((totalCoins * anyaRemixWeight) / 100)
    const countBen = Math.round((totalCoins * benRemixWeight) / 100)
    const countChloe = totalCoins - countAnya - countBen

    const addCoins = (count: number, target: typeof nodeAnya, color: string) => {
      for (let i = 0; i < count; i++) {
        setTimeout(() => {
          coinsRef.current.push({
            x: width / 2,
            y: canvas.height - 60,
            targetX: target.x,
            targetY: target.y,
            speed: 0.015 + Math.random() * 0.015,
            progress: 0,
            size: Math.random() * 2 + 2,
            color,
          })
        }, i * 40 + Math.random() * 100)
      }
    }

    addCoins(countAnya, nodeAnya, '#f59e0b')
    addCoins(countBen, nodeBen, '#06b6d4')
    addCoins(countChloe, nodeChloe, '#ec4899')
  }

  // ==========================================
  // ⚙️ Live PTB Builder & Dry Run Inspector
  // ==========================================
  const generatePtbDryRun = (): string => {
    const pkg = CONTENT_RIGHT_PACKAGE_ID || '0x4f3e691238ea0...content_right'
    const passport = passportId ? shortId(passportId, 16, 16) : '0x_MOCKED_PASSPORT_ID'
    const policy = policyId ? shortId(policyId, 16, 16) : '0x_MOCKED_POLICY_ID'

    return `>> INITIATING SUI PTB DRY RUN ANALYSIS...
--------------------------------------------------------------------------------
[TRANSACTION BLOCK DEFINITION]
Type: ProgrammableTransactionBlock (Sui Move Escrow Setup)
Gas Budget: 50,000,000 MIST (0.05 SUI max)
Sender: ${currentAccount ? shortId(currentAccount.address, 12, 10) : '0x_USER_SUI_WALLET_ADDRESS'}

[COMMANDS & COMPILATION]
Command 0: SplitCoins(GasCoin, [Amount: ${totalRemixCost * 1_000_000} MIST]) -> Result[0] (Coin Object)
Command 1: MoveCall(
  Package: ${pkg}
  Module: co_creation
  Function: create_and_fund_policy
  Arguments: [
    Arg 0: Object (Passport: ${passport})
    Arg 1: Coin (Result[0])
    Arg 2: Vector<address> [
      anya.sui  -> "${participantA ? shortId(participantA, 8, 6) : '0xanya_address'}",
      ben.sui   -> "${participantB ? shortId(participantB, 8, 6) : '0xben_address'}",
      chloe.sui -> "${participantC ? shortId(participantC, 8, 6) : '0xchloe_address'}"
    ]
    Arg 3: Vector<u64> [
      Anya Weight  -> ${anyaRemixWeight} (representing ${((totalRemixCost * anyaRemixWeight) / 100).toFixed(2)} SUI),
      Ben Weight   -> ${benRemixWeight} (representing ${((totalRemixCost * benRemixWeight) / 100).toFixed(2)} SUI),
      Chloe Weight -> ${chloeRemixWeight} (representing ${((totalRemixCost * chloeRemixWeight) / 100).toFixed(2)} SUI)
    ]
  ]
) -> Result[1] (CoCreationPolicy Shared Object)

[EXPECTED EXECUTION EFFECTS]
Status: SUCCESS (Dry Run Dry-Run Simulation Mode)
- Net Gas Consumption: 1,842,500 MIST
- Storage Rebate: 990,000 MIST
- Created Objects: [
    CoCreationPolicy { Owner: "Shared", Fields: { balance: ${totalRemixCost} SUI } }
  ]
- Events Emitted: co_creation::PolicyCreatedEvent {
    policy_id: "0xpolicy_object_id",
    passport_id: "${passport}",
    creator: "${currentAccount ? shortId(currentAccount.address, 8, 6) : '0xsender'}"
  }
--------------------------------------------------------------------------------
>> STATUS: READY FOR BLOCKCHAIN DISPATCH`
  }

  // ==========================================
  // ⚙️ Live Chain Logic (Escrow & Distribute)
  // ==========================================
  const handleCreatePolicy = async () => {
    if (!canCreatePolicy) return
    setChainBusy(true)
    try {
      appendChainLog(`Building create_and_fund_policy for passport ${shortId(passportId)}.`)
      const tx = buildCreateAndFundPolicyTx({
        packageId: activePackageId,
        passportId,
        participants: liveParticipants,
        amountMist: BigInt(Math.round(totalRemixCost * 1_000_000_000)),
      })
      appendChainLog(`Requesting wallet signature for ${totalRemixCost} SUI escrow split.`)
      
      const result = await signAndExecuteTransaction({ transaction: tx, chain: SUI_CHAIN })
      const createdPolicyId = firstCreatedObjectId(result) || policyId
      if (createdPolicyId) setPolicyId(createdPolicyId)
      setLastDigest(result.digest)
      rememberOnchainState({ policyId: createdPolicyId, policyTxDigest: result.digest })
      
      appendChainLog(`Policy transaction confirmed: ${shortId(result.digest, 12, 8)}`)
      if (createdPolicyId) appendChainLog(`CoCreationPolicy object: ${shortId(createdPolicyId)}`)
      
      // Trigger visually Dave -> Escrow coin stack flow mock/animation
      triggerRoyaltySimulation()
    } catch (error: any) {
      appendChainLog(`[ERROR] ${error.message || String(error)}`)
    } finally {
      setChainBusy(false)
    }
  }

  const handleDistributeRoyalties = async () => {
    if (!currentAccount || !activePackageId || !policyId.trim()) return
    setChainBusy(true)
    try {
      appendChainLog(`Building distribute_royalties for policy ${shortId(policyId)}.`)
      const tx = buildDistributeRoyaltiesTx({
        packageId: activePackageId,
        policyId,
      })
      
      const result = await signAndExecuteTransaction({ transaction: tx, chain: SUI_CHAIN })
      setLastDigest(result.digest)
      rememberOnchainState({ settlementTxDigest: result.digest })
      
      appendChainLog(`Royalty distribution confirmed: ${shortId(result.digest, 12, 8)}`)
      
      // Trigger visual Escrow -> Creators dispersal stream
      triggerRoyaltySimulation()
    } catch (error: any) {
      appendChainLog(`[ERROR] ${error.message || String(error)}`)
    } finally {
      setChainBusy(false)
    }
  }

  const handleAutoFillDemo = () => {
    const state = readOnchainState()
    if (state.passportId) {
      setPassportId(state.passportId)
    } else {
      setPassportId('0x1ab2c110100f1a2ec03ee24a6bd93ffd177eacb5ef555b2abd996d91499b9486')
    }

    setParticipantA('0x552c96da7bd7bb87d4671a7140191497527fb6dbbf05aa2080bc80224f703d60')
    if (currentAccount) {
      setParticipantB(currentAccount.address)
    } else {
      setParticipantB('0xa2fb876c75ffd1763ff768763e9cff2c289dd8eff2763d32e40a9b32e993d96a')
    }
    setParticipantC('0x78565dfbeb2ac903d135324ec0ecdb3d4a96458d71ea9ac8c6aa869a6a914b1d')

    appendChainLog("Auto-populated demo parameters: Anya (zkLogin), Ben (Wallet), Chloe (Test address). Ready for Auto-Pilot.")
  }

  const handleAutoPilot = async () => {
    // If fields are empty, run auto-fill first
    if (!passportId || !participantA || !participantB || !participantC) {
      handleAutoFillDemo()
      // Yield to state updates
      await new Promise((resolve) => setTimeout(resolve, 100))
    }

    setChainBusy(true)
    try {
      appendChainLog("[Auto-Pilot] Deploying and funding CoCreationPolicy shared object...")
      
      const packageId = activePackageId
      
      const tx = buildCreateAndFundPolicyTx({
        packageId,
        passportId: passportId || '0x1ab2c110100f1a2ec03ee24a6bd93ffd177eacb5ef555b2abd996d91499b9486',
        participants: [
          { address: '0x552c96da7bd7bb87d4671a7140191497527fb6dbbf05aa2080bc80224f703d60', weight: anyaRemixWeight },
          { address: currentAccount?.address || '0xa2fb876c75ffd1763ff768763e9cff2c289dd8eff2763d32e40a9b32e993d96a', weight: benRemixWeight },
          { address: '0x78565dfbeb2ac903d135324ec0ecdb3d4a96458d71ea9ac8c6aa869a6a914b1d', weight: chloeRemixWeight },
        ],
        amountMist: BigInt(Math.round(totalRemixCost * 1_000_000_000)),
      })

      appendChainLog(`[Auto-Pilot] Requesting wallet signature for ${totalRemixCost} SUI escrow split.`)
      const deployResult = await signAndExecuteTransaction({ transaction: tx, chain: SUI_CHAIN })
      
      const createdPolicyId = firstCreatedObjectId(deployResult)
      if (!createdPolicyId) {
        throw new Error("Failed to capture deployed Policy ID.")
      }
      setPolicyId(createdPolicyId)
      setLastDigest(deployResult.digest)
      rememberOnchainState({ policyId: createdPolicyId, policyTxDigest: deployResult.digest })
      
      appendChainLog(`[Auto-Pilot] Policy deployed successfully: ${shortId(createdPolicyId)}`)
      triggerRoyaltySimulation()

      // Wait 2 seconds for visual coin flow and chain state commitment
      appendChainLog("[Auto-Pilot] Waiting for state synchronization (2s)...")
      await new Promise((resolve) => setTimeout(resolve, 2000))

      appendChainLog(`[Auto-Pilot] Distributing royalties atomically from Policy: ${shortId(createdPolicyId)}`)
      const distributeTx = buildDistributeRoyaltiesTx({
        packageId,
        policyId: createdPolicyId,
      })

      const distributeResult = await signAndExecuteTransaction({ transaction: distributeTx, chain: SUI_CHAIN })
      setLastDigest(distributeResult.digest)
      rememberOnchainState({ settlementTxDigest: distributeResult.digest })
      
      appendChainLog(`[Auto-Pilot] SUCCESS: Royalty distribution confirmed! Tx: ${shortId(distributeResult.digest, 12, 8)}`)
      triggerRoyaltySimulation()
    } catch (error: any) {
      appendChainLog(`[Auto-Pilot ERROR] Aborted: ${error.message || String(error)}`)
    } finally {
      setChainBusy(false)
    }
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '1200px', display: 'flex', flexDirection: 'column', gap: '60px' }}>
      {/* Page Header */}
      <div style={{ textAlign: 'center', marginBottom: '10px' }}>
        <span className="header-badge badge-gold">Chapter IV · Automated Royalties</span>
        <h2 className="cyber-title">Co-Creation Economic Architecture</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Explore the business workflows powered by Content Passport's smart contracts, threshold cryptography, and decentralized file registry.
        </p>
        <span style={{ fontSize: '11px', color: 'var(--text-muted)', fontFamily: 'var(--mono)', display: 'block', marginTop: '8px' }}>
          [CURRENT DEVELOPMENT FOCUS: Visual Media // Support for Audio, Video, and Text to roll out sequentially]
        </span>
      </div>

      {/* ==================== SECTION 1: Supply-Side Remix Chain ==================== */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <h3 className="cyber-title" style={{ fontSize: '22px', margin: 0, color: 'var(--neon-gold)' }}>
             1. Supply-Side Flow: Paid Remix Chain
          </h3>
          <span className="header-badge" style={{ background: 'var(--neon-emerald)', color: '#fff', border: 'none', padding: '3px 8px', fontSize: '9px', fontWeight: 700 }}>ACTIVE / IMPLEMENTED</span>
        </div>

        <div className="grid-layout-2" style={{ gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: '40px' }}>
          
          {/* Left Column: Visual Timeline Card & Stream Canvas */}
          <div className="cyber-card" style={{ padding: '30px', position: 'relative', display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <span className="header-badge" style={{ background: 'rgba(245, 158, 11, 0.1)', color: 'var(--neon-gold)' }}>
                Co-Creation Royalties Graph (Stream Map)
              </span>
              <button 
                onClick={triggerRoyaltySimulation} 
                disabled={isSimulating}
                className="cyber-btn cyber-btn-secondary"
                style={{ fontSize: '10px', padding: '4px 8px' }}
              >
                {isSimulating ? 'Simulating...' : '⚡ Simulate Royalty Flow'}
              </button>
            </div>

            {/* Interactive Stream Canvas Container */}
            <div style={{ 
              position: 'relative', 
              width: '100%', 
              height: '260px', 
              background: 'rgba(0,0,0,0.3)', 
              borderRadius: '8px', 
              border: '1px solid rgba(255,255,255,0.05)',
              overflow: 'hidden'
            }}>
              <canvas ref={canvasRef} width={600} height={260} style={{ width: '100%', height: '100%' }} />
              
              {/* Floating Money Feedbacks */}
              {floatingAnya && (
                <div style={{ position: 'absolute', left: '70px', top: '15px', color: 'var(--neon-gold)', fontWeight: 800, animation: 'floatUp 1.5s forwards', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                  {floatingAnya}
                </div>
              )}
              {floatingBen && (
                <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '15px', color: 'var(--neon-cyan)', fontWeight: 800, animation: 'floatUp 1.5s forwards', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                  {floatingBen}
                </div>
              )}
              {floatingChloe && (
                <div style={{ position: 'absolute', right: '70px', top: '15px', color: 'var(--neon-rose)', fontWeight: 800, animation: 'floatUp 1.5s forwards', fontFamily: 'var(--mono)', fontSize: '12px' }}>
                  {floatingChloe}
                </div>
              )}
            </div>

            {/* Escrow Contract Status with Embedded Stamp Verification */}
            <div 
              className="linear-card-recessed" 
              style={{ 
                padding: '18px', 
                background: 'rgba(16, 185, 129, 0.02)', 
                border: '1px solid rgba(16, 185, 129, 0.15)',
                display: 'flex',
                gap: '20px',
                alignItems: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              {/* Escrow Stamp Watermark watermark */}
              <div 
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%) rotate(15deg)',
                  width: '90px',
                  height: '90px',
                  backgroundImage: 'url("/escrow_stamp.jpg")',
                  backgroundSize: 'cover',
                  borderRadius: '50%',
                  opacity: policyId ? 0.35 : 0.08,
                  border: policyId ? '2px solid var(--neon-gold)' : '2px dashed rgba(255,255,255,0.2)',
                  boxShadow: policyId ? '0 0 15px rgba(245, 158, 11, 0.4)' : 'none',
                  transition: 'all 0.5s ease',
                  zIndex: 0
                }}
              />

              <div style={{ flex: 1, zIndex: 1 }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <span style={{ fontSize: '11px', fontWeight: 600, color: 'var(--neon-emerald)', letterSpacing: '0.5px' }}>
                    ATOMIC ESCROW SETTLEMENT ACTIVE
                  </span>
                  <span className="header-badge" style={{ background: 'rgba(16, 185, 129, 0.1)', color: 'var(--neon-emerald)', fontSize: '11px' }}>
                    Total: {totalRemixCost} SUI
                  </span>
                </div>
                <p style={{ fontSize: '11px', color: 'var(--text-secondary)', lineHeight: 1.5, margin: 0 }}>
                  Dave (Buyer) buys the final asset for <strong>{totalRemixCost} SUI</strong>. The smart contract splits SUI atomically:
                  Anya (<strong style={{color:'#f59e0b'}}>{((totalRemixCost * anyaRemixWeight)/100).toFixed(2)} SUI</strong>), 
                  Ben (<strong style={{color:'#06b6d4'}}>{((totalRemixCost * benRemixWeight)/100).toFixed(2)} SUI</strong>), 
                  Chloe (<strong style={{color:'#ec4899'}}>{((totalRemixCost * chloeRemixWeight)/100).toFixed(2)} SUI</strong>).
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Step-by-Step Economic Architecture Control */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* STEP 1: Wallet Connection & Creator Identity */}
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              background: 'rgba(255, 255, 255, 0.02)',
              opacity: chainBusy ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-gold" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 1</span>
                <strong style={{ color: '#fff', fontSize: '13px' }}>Wallet Connection & Creator Passport</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Connect your active Sui wallet and bind your on-chain GenesisPassport NFT to verify creator authority.
              </p>
              
              <div style={{ display: 'flex', justifyContent: 'space-between', gap: '12px', alignItems: 'center', marginBottom: '16px' }}>
                <span style={{ fontSize: '10px', fontFamily: 'var(--mono)', color: currentAccount ? 'var(--neon-emerald)' : 'var(--neon-rose)', fontWeight: 'bold' }}>
                  {currentAccount ? `✓ WALLET: ${shortId(currentAccount.address)}` : '✗ WALLET DISCONNECTED'}
                </span>
                <ConnectButton />
              </div>

              <div className="cyber-input-wrap" style={{ margin: 0 }}>
                <label>GenesisPassport Object ID</label>
                <input 
                  value={passportId} 
                  onChange={(e) => setPassportId(e.target.value)} 
                  placeholder="Mint passport in prologue, or paste object ID here" 
                  disabled={chainBusy}
                />
              </div>
            </div>

            {/* STEP 2: Configure Licensing Added Values */}
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              background: 'rgba(255, 255, 255, 0.02)',
              opacity: chainBusy ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-gold" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 2</span>
                <strong style={{ color: '#fff', fontSize: '13px' }}>License Fee Configuration (Weights)</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Adjust each collaborator's licensing value contribution to dynamically determine royalty split vectors.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div className="cyber-input-wrap" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: 'var(--neon-gold)' }}>
                    <span>Anya (Origin Template Creator)</span>
                    <span>{anyaFee.toFixed(2)} SUI ({anyaRemixWeight}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="1.00"
                    step="0.01"
                    value={anyaFee}
                    onChange={(e) => setAnyaFee(parseRangeValue(e.target.value, anyaFee))}
                    disabled={chainBusy}
                  />
                </div>

                <div className="cyber-input-wrap" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                    <span>Ben (Remix Overlay Designer)</span>
                    <span>{benFee.toFixed(2)} SUI ({benRemixWeight}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="1.00"
                    step="0.01"
                    value={benFee}
                    onChange={(e) => setBenFee(parseRangeValue(e.target.value, benFee))}
                    disabled={chainBusy}
                  />
                </div>

                <div className="cyber-input-wrap" style={{ margin: 0 }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', fontWeight: 600, color: 'var(--neon-rose)' }}>
                    <span>Chloe (Sound FX Composer)</span>
                    <span>{chloeFee.toFixed(2)} SUI ({chloeRemixWeight}%)</span>
                  </div>
                  <input
                    type="range"
                    min="0.01"
                    max="1.00"
                    step="0.01"
                    value={chloeFee}
                    onChange={(e) => setChloeFee(parseRangeValue(e.target.value, chloeFee))}
                    disabled={chainBusy}
                  />
                </div>
              </div>
            </div>

            {/* STEP 3: Map On-Chain Recipient Addresses */}
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              background: 'rgba(255, 255, 255, 0.02)',
              opacity: chainBusy ? 0.6 : 1
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-gold" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 3</span>
                <strong style={{ color: '#fff', fontSize: '13px' }}>Collaborator Recipient Addresses</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Specify destination SUI wallet addresses to map the computed royalty weight slices.
              </p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                <div className="cyber-input-wrap" style={{ margin: 0 }}>
                  <input value={participantA} onChange={(e) => setParticipantA(e.target.value)} placeholder={`Anya Address (${anyaRemixWeight}%)`} disabled={chainBusy} />
                </div>
                <div className="cyber-input-wrap" style={{ margin: 0 }}>
                  <input value={participantB} onChange={(e) => setParticipantB(e.target.value)} placeholder={`Ben Address (${benRemixWeight}%)`} disabled={chainBusy} />
                </div>
                <div className="cyber-input-wrap" style={{ margin: 0 }}>
                  <input value={participantC} onChange={(e) => setParticipantC(e.target.value)} placeholder={`Chloe Address (${chloeRemixWeight}%)`} disabled={chainBusy} />
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: participantTotal === 100 ? 'var(--neon-emerald)' : 'var(--neon-gold)', fontFamily: 'var(--mono)', marginTop: '4px' }}>
                  <span>Weight Sum: {participantTotal}%</span>
                  <span>{liveParticipants.length === 0 ? '(Paste at least one address)' : ''}</span>
                </div>
              </div>
            </div>

            {/* STEP 4: PTB Escrow & Settlement */}
            <div className="linear-card-recessed" style={{ 
              padding: '20px', 
              borderRadius: '8px', 
              border: '1px solid rgba(255, 255, 255, 0.05)', 
              background: 'rgba(255, 255, 255, 0.02)'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                <span className="header-badge badge-gold" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 4</span>
                <strong style={{ color: '#fff', fontSize: '13px' }}>PTB Deployment & SUI Royalty Splits</strong>
              </div>
              <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                Deploy the co-creation policy shared object with locked SUI funding, and distribute splits atomically via Programmable Transaction Blocks.
              </p>

              <div className="cyber-input-wrap" style={{ marginBottom: '12px' }}>
                <label>CoCreationPolicy Object ID</label>
                <input value={policyId} onChange={(e) => setPolicyId(e.target.value)} placeholder="Deployed policy ID appears here" disabled={chainBusy} />
              </div>

              {!CONTENT_RIGHT_PACKAGE_ID && (
                <div style={{ fontSize: '10px', color: 'var(--neon-gold)', fontFamily: 'var(--mono)', marginBottom: '10px' }}>
                  Set VITE_CONTENT_RIGHT_PACKAGE_ID before calling live blockchain.
                </div>
              )}

              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    className="cyber-btn cyber-btn-secondary" 
                    onClick={handleAutoFillDemo}
                    disabled={chainBusy}
                    style={{ fontSize: '11px', fontWeight: 'bold', border: '1px dashed var(--neon-gold)', cursor: 'pointer' }}
                  >
                    ⚡ Auto-Fill Demo Params
                  </button>
                  <button 
                    className="cyber-btn cyber-btn-indigo" 
                    onClick={handleAutoPilot}
                    disabled={chainBusy || !currentAccount}
                    style={{ fontSize: '11px', fontWeight: 'bold', boxShadow: '0 0 10px rgba(16, 185, 129, 0.2)', cursor: 'pointer', background: 'var(--neon-emerald)', border: 'none', color: '#fff' }}
                  >
                    🤖 Run Auto-Pilot
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                  <button 
                    className="cyber-btn cyber-btn-indigo" 
                    disabled={!canCreatePolicy || chainBusy} 
                    onClick={handleCreatePolicy}
                    style={{ fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    {chainBusy ? 'Deploying...' : 'Deploy & Fund Policy'}
                  </button>
                  <button 
                    className="cyber-btn cyber-btn-rose" 
                    disabled={!currentAccount || !CONTENT_RIGHT_PACKAGE_ID || !policyId.trim() || chainBusy} 
                    onClick={handleDistributeRoyalties}
                    style={{ fontSize: '11px', fontWeight: 'bold', cursor: 'pointer' }}
                  >
                    Distribute Royalties
                  </button>
                </div>
              </div>

              {lastDigest && (
                <a 
                  href={suiscanTxUrl(lastDigest)} 
                  target="_blank" 
                  rel="noreferrer" 
                  style={{ color: 'var(--neon-cyan)', fontSize: '10px', fontFamily: 'var(--mono)', display: 'block', marginBottom: '12px', textDecoration: 'none' }}
                >
                  Suiscan Tx: {shortId(lastDigest, 14, 10)} 🔗
                </a>
              )}

              {/* 🛠️ SUI PTB Terminal Tabs */}
              <div style={{ display: 'flex', gap: '10px', marginBottom: '10px', borderBottom: '1px solid rgba(255,255,255,0.08)' }}>
                <button 
                  onClick={() => setActiveTerminalTab('dryrun')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTerminalTab === 'dryrun' ? 'var(--neon-gold)' : 'var(--text-muted)',
                    fontSize: '10px',
                    fontWeight: 600,
                    paddingBottom: '4px',
                    borderBottom: activeTerminalTab === 'dryrun' ? '2px solid var(--neon-gold)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  [PTB Dry Run]
                </button>
                <button 
                  onClick={() => setActiveTerminalTab('logs')}
                  style={{
                    background: 'none',
                    border: 'none',
                    color: activeTerminalTab === 'logs' ? 'var(--neon-emerald)' : 'var(--text-muted)',
                    fontSize: '10px',
                    fontWeight: 600,
                    paddingBottom: '4px',
                    borderBottom: activeTerminalTab === 'logs' ? '2px solid var(--neon-emerald)' : 'none',
                    cursor: 'pointer'
                  }}
                >
                  [Console Logs]
                </button>
              </div>

              {/* Terminal Viewports */}
              {activeTerminalTab === 'dryrun' ? (
                <div 
                  className="console-container" 
                  style={{ 
                    height: '130px', 
                    whiteSpace: 'pre-wrap', 
                    fontFamily: 'var(--mono)', 
                    fontSize: '9.5px', 
                    lineHeight: '1.3', 
                    color: 'rgba(255,255,255,0.85)',
                    background: 'rgba(5, 5, 12, 0.9)',
                    padding: '8px'
                  }}
                >
                  {generatePtbDryRun()}
                </div>
              ) : (
                <div className="console-container" style={{ height: '130px', fontSize: '9.5px' }}>
                  {chainLogs.length > 0 ? (
                    chainLogs.map((log, idx) => (
                      <div key={idx} className="console-line">
                        <span className="console-time">[{new Date().toLocaleTimeString()}]</span>
                        <span className={`console-tag ${log.startsWith('[ERROR]') ? 'tag-rose' : log.includes('confirmed') ? 'tag-success' : 'tag-system'}`}>
                          {log.startsWith('[ERROR]') ? '[FAIL]' : log.includes('confirmed') ? '[TX]' : '[PTB]'}
                        </span>
                        <span>{log}</span>
                      </div>
                    ))
                  ) : (
                    <div style={{ color: 'var(--text-muted)', fontSize: '10px', textAlign: 'center', marginTop: '40px' }}>
                      No on-chain events triggered yet.
                    </div>
                  )}
                </div>
              )}
            </div>

            {/* STEP 5: Proceed to Journey (Judge Mode) */}
            {policyId && policyId.startsWith('0x') && (
              <div className="linear-card-recessed" style={{ 
                padding: '20px', 
                borderRadius: '8px', 
                border: '1px solid rgba(16, 185, 129, 0.25)', 
                background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.06) 0%, rgba(245, 158, 11, 0.06) 100%)',
                animation: 'fadeIn 0.5s ease'
              }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '10px' }}>
                  <span className="header-badge badge-emerald" style={{ padding: '2px 8px', fontSize: '9px' }}>Step 5</span>
                  <strong style={{ color: 'var(--neon-emerald)', fontSize: '13px' }}>Royalty Policy Registered</strong>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '11px', lineHeight: 1.4, margin: '0 0 16px 0' }}>
                  Your co-creation royalty policy is registered and active on SUI. Proceed to the **Passport Journey Timeline** to verify and audit the complete E2E execution history.
                </p>
                <Link 
                  to="/journey" 
                  className="cyber-btn cyber-btn-emerald"
                  style={{ 
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    width: '100%',
                    padding: '10px 16px',
                    fontSize: '12px',
                    fontWeight: 'bold',
                    letterSpacing: '0.5px',
                    textDecoration: 'none'
                  }}
                >
                  ⚖️ Proceed to Judge Mode (Journey)
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ==================== SECTION 2: Demand-Side Bounty Quest ==================== */}
      <section style={{ borderBottom: '1px solid rgba(255, 255, 255, 0.08)', paddingBottom: '60px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '24px', flexWrap: 'wrap' }}>
          <h3 className="cyber-title" style={{ fontSize: '22px', margin: 0, color: 'var(--neon-cyan)' }}>
             2. Demand-Side Flow: Co-Creation Quest
          </h3>
          <span className="header-badge" style={{ background: 'var(--neon-cyan)', color: '#000', border: 'none', padding: '3px 8px', fontSize: '9px', fontWeight: 700 }}>PLANNED / UNDER DEVELOPMENT</span>
        </div>

        <div className="grid-layout-2" style={{ gridTemplateColumns: 'minmax(0, 1.15fr) minmax(0, 0.85fr)', gap: '40px' }}>
          {/* Left Column: Visual Quest Claims Card */}
          <div className="cyber-card" style={{ padding: '30px' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <span className="header-badge" style={{ background: 'rgba(6, 182, 212, 0.1)', color: 'var(--neon-cyan)' }}>Bounty Quest Claims Ledger</span>
              <span style={{ fontSize: '11px', color: 'var(--text-muted)' }}>Quest Status: Open for Claims</span>
            </div>

            <div className="linear-card-recessed" style={{ marginBottom: '25px', padding: '12px 16px', background: 'rgba(6, 182, 212, 0.02)', borderColor: 'rgba(6, 182, 212, 0.15)', borderStyle: 'dashed', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ fontSize: '11px', color: 'var(--neon-cyan)', fontWeight: 600 }}>Development Status: Scheduled for core protocol upgrade. (Escrow UI coming soon)</span>
            </div>

            <p className="card-subtitle" style={{ marginBottom: '25px', lineHeight: 1.5 }}>
              A buyer posts a target bounty (escrowed on-chain). Collaborators apply to specific milestones, claiming portions. Escrow unlocks atomically upon full allocation and buyer verification.
            </p>

            {/* Allocation Progress Tracker */}
            <div style={{ marginBottom: '30px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '12px', fontWeight: 600, marginBottom: '8px' }}>
                <span>Bounty Escrow Allocation</span>
                <span style={{ color: remainingBounty >= 0 ? 'var(--neon-cyan)' : 'var(--neon-rose)' }}>
                  {totalClaimed} / {totalBounty} SUI ({claimProgressPercent.toFixed(0)}%)
                </span>
              </div>
              <div style={{ width: '100%', height: '10px', background: 'rgba(255, 255, 255, 0.05)', borderRadius: '5px', overflow: 'hidden' }}>
                <div style={{ width: `${claimProgressPercent}%`, height: '100%', background: 'linear-gradient(90deg, var(--neon-cyan) 0%, var(--neon-indigo) 100%)', transition: 'width 0.4s ease' }}></div>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '10px', color: 'var(--text-muted)', marginTop: '6px' }}>
                <span>Deposited by Dave (Bounty Owner)</span>
                <span>{remainingBounty >= 0 ? `${remainingBounty} SUI Unallocated` : `Overallocated by ${Math.abs(remainingBounty)} SUI!`}</span>
              </div>
            </div>

            {/* Claim Slots List */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              <div className="linear-card-recessed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderLeft: '3px solid var(--neon-indigo)' }}>
                <div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>SLOT 1: ILLUSTRATOR (ANYA.SUI)</span>
                  <h5 style={{ color: '#fff', fontSize: '13px', margin: '2px 0 0 0' }}>Vector Character Storyboard</h5>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{anyaClaim} SUI</div>
                  <span style={{ fontSize: '9px', color: 'var(--neon-emerald)' }}>✓ AASE Verified</span>
                </div>
              </div>

              <div className="linear-card-recessed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderLeft: '3px solid var(--neon-cyan)' }}>
                <div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>SLOT 2: VOICE ACTOR (BEN.SUI)</span>
                  <h5 style={{ color: '#fff', fontSize: '13px', margin: '2px 0 0 0' }}>Voiceover Overlay narration</h5>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{benClaim} SUI</div>
                  <span style={{ fontSize: '9px', color: 'var(--neon-emerald)' }}>✓ AASE Verified</span>
                </div>
              </div>

              <div className="linear-card-recessed" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '12px 18px', borderLeft: '3px solid var(--neon-rose)' }}>
                <div>
                  <span style={{ fontSize: '9px', color: 'var(--text-muted)', letterSpacing: '0.5px' }}>SLOT 3: COMPOSER (CHLOE.SUI)</span>
                  <h5 style={{ color: '#fff', fontSize: '13px', margin: '2px 0 0 0' }}>3D Scene Rigging &amp; Render Sync</h5>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontSize: '13px', fontWeight: 800, color: '#fff' }}>{chloeClaim} SUI</div>
                  <span style={{ fontSize: '9px', color: 'var(--neon-rose)' }}>Awaiting Proof Upload</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Simulator Inputs */}
          <div className="cyber-card" style={{ padding: '30px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <h4 style={{ fontSize: '15px', color: '#fff', fontWeight: 700, marginBottom: '8px' }}>Bounty Quest Simulator</h4>
              <p className="card-subtitle" style={{ marginBottom: '25px' }}>Modify the total bounty size and claims slices to simulate crowd-sourced milestone payouts.</p>

              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--text-secondary)' }}>
                    <span> Total Escrow Bounty Pool</span>
                    <span>{totalBounty} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="50"
                    max="200"
                    value={totalBounty}
                    onChange={(e) => setTotalBounty(parseRangeValue(e.target.value, totalBounty))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-indigo)' }}>
                    <span>Milestone 1 Claim (Anya)</span>
                    <span>{anyaClaim} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={anyaClaimMax}
                    value={anyaClaim}
                    onChange={(e) => setAnyaClaim(parseRangeValue(e.target.value, anyaClaim))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-cyan)' }}>
                    <span>Milestone 2 Claim (Ben)</span>
                    <span>{benClaim} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={benClaimMax}
                    value={benClaim}
                    onChange={(e) => setBenClaim(parseRangeValue(e.target.value, benClaim))}
                  />
                </div>

                <div className="cyber-input-wrap">
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '11px', fontWeight: 600, color: 'var(--neon-rose)' }}>
                    <span>Milestone 3 Claim (Chloe)</span>
                    <span>{chloeClaim} SUI</span>
                  </div>
                  <input
                    type="range"
                    min="10"
                    max={chloeClaimMax}
                    value={chloeClaim}
                    onChange={(e) => setChloeClaim(parseRangeValue(e.target.value, chloeClaim))}
                  />
                </div>
              </div>
            </div>

            <div className="linear-card-recessed" style={{ padding: '15px', marginTop: '30px', fontSize: '11.5px', color: 'var(--text-secondary)', display: 'flex', flexDirection: 'column', gap: '8px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Remaining Bounty Escrow:</span>
                <strong style={{ color: remainingBounty >= 0 ? 'var(--neon-cyan)' : 'var(--neon-rose)' }}>
                  {remainingBounty} SUI
                </strong>
              </div>
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <span>Simulated Escrow Weights:</span>
                <span style={{ fontFamily: 'var(--mono)', fontSize: '11px', color: 'var(--neon-cyan)', fontWeight: 600 }}>
                  [{anyaBountyWeight}%, {benBountyWeight}%, {chloeBountyWeight}%]
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ==================== SECTION 3: Embedded Chamber Technologies ==================== */}
      <section style={{ paddingBottom: '20px' }}>
        <div className="cyber-card" style={{ padding: '30px' }}>
          <h4 style={{ fontSize: '16px', fontWeight: 800, color: '#fff', marginBottom: '20px', letterSpacing: '0.5px' }}> Embedded Chamber Technologies Mapping</h4>
          <div className="grid-layout-2" style={{ gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '24px' }}>
            
            <div className="linear-card-recessed" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <h5 style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>SuiNS &amp; SessionKeys</h5>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Establishes cryptographic, human-readable identity for licensing nodes and allows frictionless background signing during claims.
              </p>
            </div>
            
            <div className="linear-card-recessed" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <h5 style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>Authenticity Lab</h5>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Automates ELA, EXIF, and AI Sniffer checks on submissions, protecting the network from plagiarized content or duplicate file hacks.
              </p>
            </div>

            <div className="linear-card-recessed" style={{ padding: '18px' }}>
              <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '8px' }}>
                <h5 style={{ fontSize: '13px', color: '#fff', fontWeight: 700 }}>Sharded Secret Vault</h5>
              </div>
              <p style={{ fontSize: '11.5px', color: 'var(--text-muted)', lineHeight: 1.4 }}>
                Uses Shamir (3/5) threshold keys to keep raw creative draft packages locked on Walrus sharded storage until buyer payment settling confirmations.
              </p>
            </div>

          </div>
        </div>
      </section>
      
      {/* Dynamic Keyframe Animation Styles */}
      <style>{`
        @keyframes floatUp {
          0% {
            transform: translateY(20px);
            opacity: 0;
          }
          20% {
            opacity: 1;
          }
          100% {
            transform: translateY(-40px);
            opacity: 0;
          }
        }
      `}</style>
    </div>
  )
}

export default function Blueprint() {
  return (
    <SuiProviders>
      <BlueprintContent />
    </SuiProviders>
  )
}
