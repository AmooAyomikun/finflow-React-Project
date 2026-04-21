export const CATEGORY_META = {
  food:          { icon: 'fa-solid fa-utensils', label: 'Food & Dining',   color: '#1565C0' },
  transport:     { icon: 'fa-solid fa-car', label: 'Transport',        color: '#2E7D32' },
  utilities:     { icon: 'fa-solid fa-lightbulb', label: 'Utilities',        color: '#0097A7' },
  entertainment: { icon: 'fa-solid fa-film', label: 'Entertainment',    color: '#E65100' },
  shopping:      { icon: 'fa-solid fa-bag-shopping', label: 'Shopping',         color: '#7B1FA2' },
  health:        { icon: 'fa-solid fa-heart-pulse', label: 'Health',           color: '#C62828' },
  salary:        { icon: 'fa-solid fa-money-bill-wave', label: 'Salary',           color: '#1B5E20' },
  freelance:     { icon: 'fa-solid fa-laptop-code', label: 'Freelance',        color: '#1A237E' },
  other:         { icon: 'fa-solid fa-box', label: 'Other',            color: '#546E7A' },
};

export const MOCK_DATA = {
  transactions: [
    { id: 1, type:'expense', amount:128.45, category:'food', account:'GTBank Current', merchant:'Shoprite', date:'2025-07-08', note:'Weekly groceries', recurring:false },
    { id: 2, type:'expense', amount:245.00, category:'shopping', account:'GTBank Current', merchant:'Zara', date:'2025-07-10', note:'Shirt & trousers', recurring:false },
    { id: 3, type:'expense', amount:200.00, category:'entertainment', account:'UBA Savings', merchant:'Netflix & Coffee', date:'2025-07-08', note:'', recurring:false },
    { id: 4, type:'income', amount:3500.00, category:'salary', account:'GTBank Current', merchant:'Employer Ltd', date:'2025-07-01', note:'Monthly salary', recurring:true },
    { id: 5, type:'expense', amount:65.00, category:'transport', account:'Cash Wallet', merchant:'Uber', date:'2025-07-05', note:'', recurring:false },
    { id: 6, type:'expense', amount:45.00, category:'utilities', account:'GTBank Current', merchant:'EKEDC Electric', date:'2025-07-03', note:'Electricity bill', recurring:true },
    { id: 7, type:'income', amount:850.00, category:'freelance', account:'GTBank Current', merchant:'Freelance Client', date:'2025-07-12', note:'Logo design project', recurring:false },
    { id: 8, type:'expense', amount:30.00, category:'health', account:'UBA Savings', merchant:'Pharmacy', date:'2025-07-09', note:'', recurring:false },
    { id: 9, type:'expense', amount:80.00, category:'food', account:'Cash Wallet', merchant:'Jollof Kitchen', date:'2025-07-11', note:'Lunch for team', recurring:false },
    { id: 10, type:'expense', amount:22.00, category:'entertainment', account:'GTBank Current', merchant:'Spotify', date:'2025-07-01', note:'', recurring:true },
  ],
  accounts: [
    { id: 1, name:'GTBank Current', type:'checking', institution:'GTBank', balance:8420.50, currency:'USD' },
    { id: 2, name:'UBA Savings', type:'savings', institution:'UBA', balance:12300.00, currency:'USD' },
    { id: 3, name:'Cash Wallet', type:'cash', institution:'', balance:350.00, currency:'USD' },
  ],
  budgets: [
    { id: 1, category:'food', limit:600, color:'#1565C0' },
    { id: 2, category:'shopping', limit:400, color:'#7B1FA2' },
    { id: 3, category:'entertainment', limit:200, color:'#E65100' },
    { id: 4, category:'transport', limit:150, color:'#2E7D32' },
    { id: 5, category:'utilities', limit:100, color:'#0097A7' },
  ],
  goals: [
    { id: 1, name:'Vacation', icon:'fa-solid fa-plane', target:3000, saved:2300, deadline:'Nov 2025', color:'#1565C0' },
    { id: 2, name:'New House', icon:'fa-solid fa-house-chimney', target:10000, saved:5800, deadline:'Jul 2026', color:'#2E7D32' },
    { id: 3, name:'Car', icon:'fa-solid fa-car', target:5000, saved:1450, deadline:'Mar 2026', color:'#E65100' },
    { id: 4, name:'Emergency Fund', icon:'fa-solid fa-shield-halved', target:2000, saved:700, deadline:'Dec 2025', color:'#7B1FA2' },
  ],
  recurring: [
    { name:'Spotify Premium', icon:'fa-brands fa-spotify', amount:10.99, freq:'Monthly', nextDate:'Aug 15' },
    { name:'ChatGPT Plus', icon:'fa-solid fa-robot', amount:20.00, freq:'Monthly', nextDate:'Aug 15' },
    { name:'YouTube Premium', icon:'fa-brands fa-youtube', amount:11.99, freq:'Monthly', nextDate:'Jul 22' },
    { name:'Adobe CC', icon:'fa-brands fa-adobe', amount:54.99, freq:'Monthly', nextDate:'Aug 1' },
    { name:'iCloud Storage', icon:'fa-solid fa-cloud', amount:2.99, freq:'Monthly', nextDate:'Jul 20' },
  ],
};

export const EMPTY_DATA = {
  transactions: [],
  accounts: [],
  budgets: [],
  goals: [],
  recurring: [],
};
