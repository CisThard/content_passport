import { AuthenticityMemoryClient } from "./memory.js";

export interface LangChainMessage {
  type: "human" | "ai" | "system" | "generic";
  content: string;
  name?: string;
  additional_kwargs?: Record<string, unknown>;
}

/**
 * A LangChain-compatible Chat Message History class that persists chat history
 * to Walrus Memory (MemWal) using the AuthenticityMemoryClient.
 *
 * This provides verifiable, cross-session long-term memory for LangChain agents.
 */
export class MemWalChatMessageHistory {
  constructor(
    private readonly client: AuthenticityMemoryClient,
    private readonly sessionId: string,
    private readonly namespace = "langchain-chat-history",
  ) {
    if (!sessionId.trim()) {
      throw new Error("Session ID is required for MemWalChatMessageHistory.");
    }
  }

  /**
   * Fetch all messages from the session's chat history stored on MemWal.
   */
  async getMessages(): Promise<LangChainMessage[]> {
    const key = this.historyKey();
    const history = await this.client.recall<LangChainMessage[]>(this.namespace, key);
    return history ?? [];
  }

  /**
   * Add a single message to the history on MemWal.
   */
  async addMessage(message: LangChainMessage): Promise<void> {
    const messages = await this.getMessages();
    messages.push(message);
    const key = this.historyKey();
    await this.client.remember(this.namespace, key, messages);
  }

  /**
   * Helper to add a human/user message to the history.
   */
  async addUserMessage(content: string, name?: string): Promise<void> {
    await this.addMessage({ type: "human", content, name });
  }

  /**
   * Helper to add an AI/assistant message to the history.
   */
  async addAIChatMessage(content: string, name?: string): Promise<void> {
    await this.addMessage({ type: "ai", content, name });
  }

  /**
   * Clear the entire chat history for this session from MemWal.
   */
  async clear(): Promise<void> {
    const key = this.historyKey();
    await this.client.remember(this.namespace, key, []);
  }

  private historyKey(): string {
    return `session:${this.sessionId}`;
  }
}
