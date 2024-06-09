async function initializeWallet() {
    await fetch('/api/wallet/initialize', { method: 'POST' });
    updateBalance();
  }
  
  async function updateBalance() {
    const res = await fetch('/api/wallet/balance');
    const data = await res.json();
    document.getElementById('balance').textContent = data.balance;
  }
  
  async function deposit() {
    const amount = document.getElementById('amount').value;
    if (amount && Number(amount) > 0) {
      await fetch('/api/wallet/deposit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) })
      });
      updateBalance();
    } else {
      alert('Please enter a valid amount');
    }
  }
  
  async function withdraw() {
    const amount = document.getElementById('amount').value;
    if (amount && Number(amount) > 0) {
      await fetch('/api/wallet/withdraw', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ amount: Number(amount) })
      });
      updateBalance();
    } else {
      alert('Please enter a valid amount');
    }
  }
  
  document.addEventListener('DOMContentLoaded', () => {
    initializeWallet();
  });
  