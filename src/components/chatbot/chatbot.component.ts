import { Component, OnInit, OnDestroy } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

interface Message {
  id: string;
  text: string;
  sender: 'visitor' | 'you';
  timestamp: Date;
  status: 'sending' | 'sent' | 'failed';
}

@Component({
  selector: 'app-chatbot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chatbot.component.html',
  styleUrls: ['./chatbot.component.css']
})
export class ChatbotComponent implements OnInit, OnDestroy {
  isOpen = false;
  isMinimized = false;
  messages: Message[] = [];
  newMessage = '';
  visitorName = '';
  visitorEmail = '';
  conversationId: string | null = null;
  isLoading = false;
  isConversationStarted = false;
  pollingInterval: any;
  
  // Backend API URL (update this to your deployed backend)
  private apiUrl = 'http://localhost:3001/api';
  
  ngOnInit() {
    // Initialize newMessage to ensure it's not undefined
    this.newMessage = '';
    
    // Add welcome message
    this.messages.push({
      id: '1',
      text: '👋 Hey there! I\'m Nawaz\'s assistant. Send me a message and I\'ll forward it directly to him via SMS. He\'ll respond as soon as possible!',
      sender: 'you',
      timestamp: new Date(),
      status: 'sent'
    });
    
    console.log('Chatbot initialized, newMessage:', this.newMessage);
  }
  
  ngOnDestroy() {
    // Stop polling when component is destroyed
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
  }
  
  toggleChat() {
    this.isOpen = !this.isOpen;
    this.isMinimized = false;
  }
  
  minimizeChat() {
    this.isMinimized = true;
  }
  
  maximizeChat() {
    this.isMinimized = false;
  }
  
  async sendMessage() {
    console.log('Send button clicked. Message:', this.newMessage);
    console.log('Message trimmed:', this.newMessage.trim());
    console.log('Is loading:', this.isLoading);
    
    if (!this.newMessage.trim()) {
      console.log('Message is empty, not sending');
      return;
    }
    
    const messageId = Date.now().toString();
    const message: Message = {
      id: messageId,
      text: this.newMessage,
      sender: 'visitor',
      timestamp: new Date(),
      status: 'sending'
    };
    
    this.messages.push(message);
    this.isLoading = true;
    
    try {
      const response = await fetch(`${this.apiUrl}/send-message`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          message: this.newMessage,
          visitorName: this.visitorName || 'Portfolio Visitor',
          visitorEmail: this.visitorEmail || 'No email provided'
        })
      });
      
      const result = await response.json();
      
      if (result.success) {
        message.status = 'sent';
        this.conversationId = result.conversationId;
        this.isConversationStarted = true;
        this.newMessage = '';
        
        // Start polling for new messages
        this.startPolling();
        
        // Add confirmation message
        this.messages.push({
          id: (Date.now() + 1).toString(),
          text: '✅ Message sent! Nawaz will receive this via SMS and respond soon. I\'ll notify you when he replies!',
          sender: 'you',
          timestamp: new Date(),
          status: 'sent'
        });
      } else {
        throw new Error(result.error || 'Failed to send message');
      }
    } catch (error) {
      console.error('Error sending message:', error);
      message.status = 'failed';
      
      this.messages.push({
        id: (Date.now() + 1).toString(),
        text: '❌ Sorry, there was an error sending your message. Please try again or contact me directly.',
        sender: 'you',
        timestamp: new Date(),
        status: 'sent'
      });
    } finally {
      this.isLoading = false;
    }
  }
  
  onKeyPress(event: KeyboardEvent) {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      this.sendMessage();
    }
  }
  
  onMessageInput(event: any) {
    // Force change detection
    this.newMessage = event.target.value;
    console.log('Message input changed:', this.newMessage);
  }
  
  formatTime(timestamp: Date): string {
    return timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  }
  
  get isSendButtonDisabled(): boolean {
    return !this.newMessage || !this.newMessage.trim() || this.isLoading;
  }

  // Start polling for new messages from Nawaz
  private startPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
    }
    
    // Poll every 3 seconds for new messages
    this.pollingInterval = setInterval(() => {
      this.checkForNewMessages();
    }, 3000);
  }

  // Check for new messages from the backend
  private async checkForNewMessages() {
    if (!this.conversationId) return;

    try {
      const response = await fetch(`${this.apiUrl}/conversation/${this.conversationId}/messages`);
      const data = await response.json();
      
      if (data.messages) {
        // Get the last message timestamp
        const lastMessage = this.messages[this.messages.length - 1];
        const lastTimestamp = lastMessage ? lastMessage.timestamp : new Date(0);
        
        // Filter new messages (from Nawaz)
        const newMessages = data.messages.filter((msg: any) => 
          msg.from === 'you' && new Date(msg.timestamp) > lastTimestamp
        );
        
        // Add new messages to the conversation
        newMessages.forEach((msg: any) => {
          this.messages.push({
            id: Date.now().toString() + Math.random(),
            text: msg.message,
            sender: 'you',
            timestamp: new Date(msg.timestamp),
            status: 'sent'
          });
        });
      }
    } catch (error) {
      console.error('Error checking for new messages:', error);
    }
  }

  // Stop polling (when conversation ends)
  private stopPolling() {
    if (this.pollingInterval) {
      clearInterval(this.pollingInterval);
      this.pollingInterval = null;
    }
  }
}
