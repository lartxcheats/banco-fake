// DOM Elements
const balanceElement = document.getElementById('balance');
const modal = document.getElementById('modal');
const modalOverlay = document.querySelector('.modal-overlay');
const balanceInput = document.getElementById('balanceInput');
const saveBtn = document.getElementById('saveBtn');
const cancelBtn = document.getElementById('cancelBtn');

// Load balance from localStorage
let currentBalance = localStorage.getItem('nubank_balance') || '7,67';
balanceElement.textContent = `R$ ${currentBalance}`;

// Open modal when clicking on balance
balanceElement.addEventListener('click', () => {
    modal.classList.add('active');
    balanceInput.value = `R$ ${currentBalance}`;
    balanceInput.select();
    setTimeout(() => balanceInput.focus(), 100);
});

// Close modal
const closeModal = () => {
    modal.classList.remove('active');
};

cancelBtn.addEventListener('click', closeModal);
modalOverlay.addEventListener('click', closeModal);

// Format currency input
balanceInput.addEventListener('input', (e) => {
    let value = e.target.value.replace(/\D/g, '');
    
    if (value.length === 0) {
        e.target.value = 'R$ ';
        return;
    }
    
    value = value.padStart(3, '0');
    const intPart = value.slice(0, -2);
    const decPart = value.slice(-2);
    
    const formatted = intPart.replace(/\B(?=(\d{3})+(?!\d))/g, '.') + ',' + decPart;
    e.target.value = 'R$ ' + formatted;
});

// Save new balance
saveBtn.addEventListener('click', () => {
    let value = balanceInput.value.replace('R$ ', '').trim();
    
    if (value && value !== ',00') {
        currentBalance = value;
        balanceElement.textContent = `R$ ${currentBalance}`;
        localStorage.setItem('nubank_balance', currentBalance);
        
        // Success animation
        balanceElement.style.transition = 'all 0.3s ease';
        balanceElement.style.transform = 'scale(1.05)';
        balanceElement.style.color = '#820AD1';
        
        setTimeout(() => {
            balanceElement.style.transform = 'scale(1)';
            balanceElement.style.color = '#fff';
        }, 300);
    }
    
    closeModal();
});

// Enter to save
balanceInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
        saveBtn.click();
    }
});

// Escape to close
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) {
        closeModal();
    }
});
