import { useState, useRef, useEffect } from 'react'

interface ChatMessage {
  sender: 'user' | 'agent'
  text: string
  time: string
}

export default function Chat() {
  const [messages, setMessages] = useState<ChatMessage[]>([
    {
      sender: 'agent',
      text: 'Hello. I am the K-9 Sniffer Agent guarding the border checkpoints. Feel free to ask me anything about creator passports, SuiNS namespace identities, AASE forensic ELA algorithms, sharded security vaults, or Move royalty stamp contracts.',
      time: new Date().toLocaleTimeString().slice(0, -3)
    }
  ])
  const [inputValue, setInputValue] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const scrollRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight
    }
  }, [messages, isTyping])

  const handleSendMessage = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMsg = inputValue
    setInputValue('')
    setMessages((prev) => [
      ...prev,
      {
        sender: 'user',
        text: userMsg,
        time: new Date().toLocaleTimeString().slice(0, -3)
      }
    ])

    setIsTyping(true)

    // Generate context-aware agent response
    let responseText = 'Searching knowledge base for matching query signatures. Please stand by...'
    const normalized = userMsg.toLowerCase()
    
    if (normalized.includes('passport') || normalized.includes('register') || normalized.includes('identity')) {
      responseText = 'Creator Passports are registered as distinct NFTs on the Sui blockchain. Ephemeral Ed25519 SessionKeys allow you to run sign-free sponsored transactions for 10 minutes, optimizing browser UI responsiveness.'
    } else if (normalized.includes('verify') || normalized.includes('ai') || normalized.includes('forensic') || normalized.includes('ela')) {
      responseText = 'The Aurelius Forensics Lab utilizes the 3-layer Agent Authenticity Checkpoint (AASE). It evaluates JPEG compression quantization artifacts via Error Level Analysis (ELA), kameraraw EXIF headers, and Gemini Flash refractions.'
    } else if (normalized.includes('vault') || normalized.includes('shamir') || normalized.includes('shards') || normalized.includes('seal')) {
      responseText = 'The SEAL Vault decomposes your symmetric AES-256 file keys into 5 threshold shares via Shamir Secret Sharing. Since at least 3 shards are required to reconstruct, raw masterpiece assets remain absolutely secure on Walrus.'
    } else if (normalized.includes('remix') || normalized.includes('escrow') || normalized.includes('royalty') || normalized.includes('stamp')) {
      responseText = 'Stamp Escrow payouts route contributors dynamically according to weights on co_creation_policy.move smart contracts. The Sui VM splits royalty balances atomatically inside single transaction blocks as remixes are stamped.'
    }

    await new Promise((resolve) => setTimeout(resolve, 1000 + Math.random() * 1200))

    setMessages((prev) => [
      ...prev,
      {
        sender: 'agent',
        text: responseText,
        time: new Date().toLocaleTimeString().slice(0, -3)
      }
    ])
    setIsTyping(false)
  }

  return (
    <div className="dashboard-container" style={{ maxWidth: '900px' }}>
      <div style={{ textAlign: 'center', marginBottom: '40px' }}>
        <span className="header-badge badge-rose">MemWal Chat</span>
        <h2 className="cyber-title">K-9 Sniffer AI Central</h2>
        <p className="cyber-subtitle" style={{ margin: '10px auto 0' }}>
          Consult with our security agent to query architectural parameters of the Sui blockchain and Walrus sharded storage protocols.
        </p>
      </div>

      <div className="cyber-card" style={{ padding: '24px' }}>
        <div className="chat-window">
          {/* Messages Scroller */}
          <div className="chat-scroller" ref={scrollRef}>
            {messages.map((msg, idx) => (
              <div key={idx} className={`bubble-wrap ${msg.sender}`}>
                <span className="bubble-meta" style={{ marginBottom: '4px' }}>
                  {msg.sender === 'user' ? 'CREATOR NODE' : '🐕 K-9 AGENT'}
                </span>
                <div className="chat-bubble">
                  {msg.text}
                </div>
                <span className="bubble-meta">{msg.time}</span>
              </div>
            ))}

            {isTyping && (
              <div className="bubble-wrap agent" style={{ animation: 'fadeIn 0.3s infinite alternate' }}>
                <span className="bubble-meta">🐕 K-9 AGENT is computing...</span>
                <div className="chat-bubble" style={{ background: 'rgba(255,255,255,0.01)', borderStyle: 'dashed' }}>
                  <span style={{ display: 'inline-flex', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--neon-rose)', marginRight: '4px', animation: 'pulseDot 1s infinite' }} />
                  <span style={{ display: 'inline-flex', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--neon-rose)', marginRight: '4px', animation: 'pulseDot 1s infinite 0.2s' }} />
                  <span style={{ display: 'inline-flex', width: '6px', height: '6px', borderRadius: '50%', backgroundColor: 'var(--neon-rose)', animation: 'pulseDot 1s infinite 0.4s' }} />
                </div>
              </div>
            )}
          </div>

          {/* Input form bar */}
          <form onSubmit={handleSendMessage} className="chat-input-row">
            <input
              type="text"
              placeholder="Ask K-9 Sniffer... (e.g. ELA forensics, SEAL secret vault, co-creation escrow weights)"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              disabled={isTyping}
            />
            <button type="submit" className="chat-btn-send" disabled={isTyping || !inputValue.trim()}>
              TRANSMIT ➔
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
