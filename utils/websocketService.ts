// utils/websocketService.ts
type MessageHandler = (message: any) => void;

class WebSocketService {
  private socket: WebSocket | null = null;
  private messageHandlers: Map<string, MessageHandler[]> = new Map();
  private reconnectAttempts = 0;
  private maxReconnectAttempts = 5;
  private reconnectTimeout: NodeJS.Timeout | null = null;

  get isConnected(): boolean {
    return this.socket?.readyState === WebSocket.OPEN;
  }

  connect() {
    if (this.isConnected) return;

    try {
      console.log("Attempting to connect to WebSocket...");
      this.socket = new WebSocket("wss://healthsync-backend-bfrv.onrender.com");
    } catch (error) {
      console.error("Error creating WebSocket connection:", error);
      this.attemptReconnect();
      return;
    }

    this.socket.onopen = () => {
      console.log("WebSocket connected");
      this.reconnectAttempts = 0;
      if (this.messageHandlers.has("open")) {
        this.messageHandlers.get("open")?.forEach((handler) => handler(null));
      }
    };

    this.socket.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        const eventType = data.type || "message";
        const payload = data; // Backend sends the whole object as payload

        if (this.messageHandlers.has(eventType)) {
          this.messageHandlers
            .get(eventType)
            ?.forEach((handler) => handler(payload));
        }
      } catch (error) {
        console.error("Error parsing WebSocket message:", error);
      }
    };

    this.socket.onclose = () => {
      console.log("WebSocket disconnected");
      if (this.messageHandlers.has("close")) {
        this.messageHandlers.get("close")?.forEach((handler) => handler(null));
      }
      this.attemptReconnect();
    };

    this.socket.onerror = (error) => {
      console.error("WebSocket error:", error);
      if (this.messageHandlers.has("error")) {
        this.messageHandlers.get("error")?.forEach((handler) => handler(error));
      }
      this.socket?.close();
    };
  }

  private attemptReconnect() {
    if (this.reconnectAttempts >= this.maxReconnectAttempts) {
      console.error("Max reconnect attempts reached");
      return;
    }

    this.reconnectAttempts++;
    const delay = Math.min(1000 * 2 ** this.reconnectAttempts, 30000);

    this.reconnectTimeout = setTimeout(() => {
      console.log(
        `Attempting to reconnect (${this.reconnectAttempts}/${this.maxReconnectAttempts})`
      );
      this.connect();
    }, delay);
  }

  disconnect() {
    if (this.reconnectTimeout) {
      clearTimeout(this.reconnectTimeout);
      this.reconnectTimeout = null;
    }

    if (this.socket) {
      this.socket.close();
      this.socket = null;
    }
  }

  on(eventType: string, handler: MessageHandler) {
    if (!this.messageHandlers.has(eventType)) {
      this.messageHandlers.set(eventType, []);
    }
    this.messageHandlers.get(eventType)?.push(handler);
  }

  off(eventType: string, handler: MessageHandler) {
    if (this.messageHandlers.has(eventType)) {
      const handlers = this.messageHandlers.get(eventType) || [];
      const index = handlers.indexOf(handler);
      if (index !== -1) {
        handlers.splice(index, 1);
      }
    }
  }

  send(eventType: string, payload: any) {
    if (this.socket?.readyState !== WebSocket.OPEN) {
      console.error("WebSocket is not connected");
      return false;
    }

    try {
      this.socket.send(
        JSON.stringify({
          type: eventType,
          ...payload, // Spread the payload directly
        })
      );
      return true;
    } catch (error) {
      console.error("Error sending message:", error);
      return false;
    }
  }
}

// Singleton instance
export const webSocketService = new WebSocketService();
export default webSocketService;
