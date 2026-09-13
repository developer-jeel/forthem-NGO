/* ============================================
   UNKE LIYE (ForThem) NGO
   Volunteer Manager Panel - Broadcast Center
   ============================================ */

(function() {
  'use strict';

  const Broadcast = {
    recipients: [],
    selectedChannels: [],
    
    init() {
      this.recipients = Array.from(document.querySelectorAll('.recipient-item'));
      this.selectedChannels = ['whatsapp']; // Default
      
      this.bindEvents();
      this.updateAudienceCount();
      this.updatePreviews();
    },
    
    bindEvents() {
      // Channel selection
      document.querySelectorAll('.channel-option').forEach(option => {
        option.addEventListener('click', () => {
          const checkbox = option.querySelector('input');
          if (checkbox) {
            checkbox.checked = !checkbox.checked;
            option.classList.toggle('selected', checkbox.checked);
            
            const value = checkbox.value;
            if (checkbox.checked) {
              if (!this.selectedChannels.includes(value)) {
                this.selectedChannels.push(value);
              }
            } else {
              this.selectedChannels = this.selectedChannels.filter(c => c !== value);
            }
            
            this.updateAudienceCount();
          }
        });
      });
      
      // Filter changes
      document.getElementById('broadcast-area')?.addEventListener('change', () => {
        this.updateAudienceCount();
        this.updatePreviews();
      });
      
      document.getElementById('broadcast-skill')?.addEventListener('change', () => {
        this.updateAudienceCount();
        this.updatePreviews();
      });
      
      document.getElementById('broadcast-status')?.addEventListener('change', () => {
        this.updateAudienceCount();
        this.updatePreviews();
      });
      
      // Message input
      document.getElementById('broadcast-message')?.addEventListener('input', (e) => {
        this.updatePreviews();
        this.updateCharCounter(e.target.value.length);
      });
      
      // Title input
      document.getElementById('broadcast-title')?.addEventListener('input', () => {
        this.updatePreviews();
      });
      
      // Send broadcast
      document.getElementById('send-broadcast')?.addEventListener('click', () => {
        this.openConfirmModal();
      });
      
      // Confirm send
      document.getElementById('confirm-broadcast-send')?.addEventListener('click', () => {
        this.sendBroadcast();
      });
      
      // Save draft
      document.getElementById('save-draft')?.addEventListener('click', () => {
        Toast.info('Draft saved locally', 'Broadcast Saved');
      });
    },
    
    updateAudienceCount() {
      const area = document.getElementById('broadcast-area')?.value || 'all';
      const skill = document.getElementById('broadcast-skill')?.value || 'all';
      const status = document.getElementById('broadcast-status')?.value || 'all';
      
      const matchedRecipients = this.recipients.filter(recipient => {
        if (area !== 'all' && recipient.dataset.city !== area) return false;
        if (skill !== 'all' && !recipient.dataset.skill?.includes(skill)) return false;
        if (status !== 'all' && recipient.dataset.status !== status) return false;
        return true;
      });
      
      const count = matchedRecipients.length;
      document.getElementById('audience-count').textContent = count;
      
      // Update recipients list visibility
      this.recipients.forEach(recipient => {
        if (matchedRecipients.includes(recipient)) {
          recipient.style.display = '';
        } else {
          recipient.style.display = 'none';
        }
      });
      
      // Update confirm modal
      document.getElementById('confirm-recipients').textContent = count;
    },
    
    updatePreviews() {
      const title = document.getElementById('broadcast-title')?.value || '';
      const message = document.getElementById('broadcast-message')?.value || 'Your message preview will appear here as you type...';
      
      // SMS Preview
      const smsPreview = document.getElementById('sms-preview');
      if (smsPreview) {
        const smsText = title ? `[UNKE LIYE] ${title}: ${message}` : message;
        smsPreview.textContent = smsText || 'Your message preview will appear here as you type...';
      }
      
      // WhatsApp Preview
      const whatsappPreview = document.getElementById('whatsapp-preview');
      if (whatsappPreview) {
        const whatsappText = title ? `*${title}*\n\n${message}` : message;
        whatsappPreview.textContent = whatsappText || 'Your message preview will appear here as you type...';
      }
      
      // Update confirm modal message
      const confirmMessage = document.getElementById('confirm-message');
      if (confirmMessage) {
        confirmMessage.textContent = message || 'No message entered';
      }
    },
    
    updateCharCounter(length) {
      const counter = document.getElementById('char-counter');
      if (!counter) return;
      
      counter.textContent = `${length} / 320 characters`;
      counter.classList.remove('warning', 'error');
      
      if (length > 300) {
        counter.classList.add('error');
      } else if (length > 250) {
        counter.classList.add('warning');
      }
    },
    
    openConfirmModal() {
      const title = document.getElementById('broadcast-title')?.value;
      const message = document.getElementById('broadcast-message')?.value;
      const area = document.getElementById('broadcast-area')?.value;
      const skill = document.getElementById('broadcast-skill')?.value;
      
      // Validation
      if (!message || !message.trim()) {
        Toast.error('Please enter a message');
        return;
      }
      
      if (this.selectedChannels.length === 0) {
        Toast.error('Please select at least one communication channel');
        return;
      }
      
      const recipientCount = parseInt(document.getElementById('audience-count').textContent) || 0;
      if (recipientCount === 0) {
        Toast.warning('No recipients match your criteria. Adjust your filters.');
        return;
      }
      
      // Update confirm modal
      document.getElementById('confirm-area').textContent = area === 'all' ? 'All Areas' : area;
      document.getElementById('confirm-skill').textContent = skill === 'all' ? 'All Skills' : skill;
      document.getElementById('confirm-channels').textContent = this.selectedChannels.join(' + ').toUpperCase();
      document.getElementById('confirm-message').textContent = message;
      
      Modal.open('broadcast-confirm-modal');
    },
    
    sendBroadcast() {
      const message = document.getElementById('broadcast-message')?.value;
      const recipientCount = parseInt(document.getElementById('audience-count').textContent) || 0;
      
      // Close confirm modal
      Modal.close();
      
      // Show sending progress
      Modal.open('sending-modal');
      
      // Simulate sending delay
      setTimeout(() => {
        Modal.close();
        Toast.success(`Emergency alert sent to ${recipientCount} matched volunteers`, 'Broadcast Sent');
        
        // Clear form
        document.getElementById('broadcast-title').value = '';
        document.getElementById('broadcast-message').value = '';
        this.updatePreviews();
        this.updateCharCounter(0);
        
        // Reset channels
        document.querySelectorAll('.channel-option').forEach(opt => {
          opt.classList.remove('selected');
          const checkbox = opt.querySelector('input');
          if (checkbox) checkbox.checked = false;
        });
        this.selectedChannels = [];
        
      }, 2000);
    }
  };

  // Initialize on DOM ready
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => Broadcast.init());
  } else {
    Broadcast.init();
  }
  
  window.Broadcast = Broadcast;
  
})();
