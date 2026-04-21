import { motion } from "framer-motion";
import { useState, useMemo } from "react";
import { CATEGORY_META } from "@/lib/data";
import { useAppStore } from "@/store/useAppStore";
import { Search, Filter, Download, Plus, Edit2, Trash2, X } from "lucide-react";

export default function Transactions() {
  const { setShowAddTransactionModal, transactions, accounts } = useAppStore();
  const [search, setSearch] = useState("");
  const [typeFilter, setTypeFilter] = useState("all");
  const [categoryFilter, setCategoryFilter] = useState("all");
  const [accountFilter, setAccountFilter] = useState("all");

  const filteredTransactions = useMemo(() => {
    return transactions.filter(t => {
      const matchSearch = t.merchant.toLowerCase().includes(search.toLowerCase()) || 
                          (t.note?.toLowerCase() || "").includes(search.toLowerCase());
      const matchType = typeFilter === "all" || t.type === typeFilter;
      const matchCategory = categoryFilter === "all" || t.category === categoryFilter;
      const matchAccount = accountFilter === "all" || t.account === accountFilter;
      return matchSearch && matchType && matchCategory && matchAccount;
    }).sort((a,b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  }, [search, typeFilter, categoryFilter, accountFilter, transactions]);

  const clearFilters = () => {
    setSearch("");
    setTypeFilter("all");
    setCategoryFilter("all");
    setAccountFilter("all");
  };

  const fmt = (n: number) => '$' + Math.abs(n).toLocaleString('en-US', { minimumFractionDigits:2 });

  return (
    <div className="page active fade-in" id="page-transactions">
      <div className="page-header">
        <div>
          <h1>Transactions</h1>
          <div className="page-header-sub">View and manage all your financial activity</div>
        </div>
        <div style={{ display: 'flex', gap: '8px' }}>
          <button className="topbar-btn">
            <Download className="h-4 w-4 mr-2 inline" /> Export
          </button>
          <button className="topbar-btn primary" onClick={() => setShowAddTransactionModal(true)}>
            <Plus className="h-4 w-4 mr-2 inline" /> Add Transaction
          </button>
        </div>
      </div>

      <div className="card mb-16">
        <div className="form-row" style={{ display: 'flex', flexWrap: 'wrap', alignItems: 'center' }}>
          <div className="search-box" style={{ width: '100%', maxWidth: '300px' }}>
            <Search className="h-4 w-4" style={{ color: 'var(--text3)' }} />
            <input 
              type="text" 
              placeholder="Search transactions..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>
          
          <select 
            className="form-input" 
            style={{ width: '150px', height: '34px', fontSize: '12px' }}
            value={typeFilter} 
            onChange={(e) => setTypeFilter(e.target.value)}
          >
            <option value="all">All Types</option>
            <option value="income">Income</option>
            <option value="expense">Expense</option>
            <option value="transfer">Transfer</option>
          </select>

          <select 
            className="form-input" 
            style={{ width: '180px', height: '34px', fontSize: '12px' }}
            value={categoryFilter} 
            onChange={(e) => setCategoryFilter(e.target.value)}
          >
            <option value="all">All Categories</option>
            {Object.entries(CATEGORY_META).map(([key, value]) => (
              <option key={key} value={key}>{value.label}</option>
            ))}
          </select>

          <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
            <select 
              className="form-input" 
              style={{ width: '180px', height: '34px', fontSize: '12px' }}
              value={accountFilter} 
              onChange={(e) => setAccountFilter(e.target.value)}
            >
              <option value="all">All Accounts</option>
              {accounts.map(acc => (
                <option key={acc.id} value={acc.name}>{acc.name}</option>
              ))}
            </select>
            <button className="icon-btn" onClick={clearFilters} title="Clear Filters" style={{ height: '34px' }}>
              <X className="h-4 w-4 text-red-500" />
            </button>
          </div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflowX: 'auto' }}>
        <table className="data-table" style={{ marginTop: '14px' }}>
          <thead>
            <tr>
              <th style={{ paddingLeft: '20px' }}>Date</th>
              <th>Merchant / Category</th>
              <th>Account</th>
              <th>Type</th>
              <th style={{ textAlign: 'right', paddingRight: '20px' }}>Amount</th>
            </tr>
          </thead>
          <tbody>
            {filteredTransactions.map((tx, i) => {
              const meta = CATEGORY_META[tx.category as keyof typeof CATEGORY_META];
              const isInc = tx.type === 'income';
              
              return (
                <tr key={tx.id}>
                  <td style={{ paddingLeft: '20px', color: 'var(--text2)', fontSize: '12px' }}>
                    {tx.date}
                  </td>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <div className="tx-icon" style={{ background: `${meta?.color}15`, color: meta?.color, border: `1px solid ${meta?.color}30` }}>
                         <i className={`${meta?.icon || 'fa-solid fa-box'} font-sm`} />
                      </div>
                      <div>
                         <div className="tx-name" style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                           {tx.merchant}
                           {tx.recurring && <span className="status pending" style={{ fontSize: '7px' }}>🔄 REGULAR</span>}
                         </div>
                         <div className="tx-cat">{meta?.label || tx.category}</div>
                      </div>
                    </div>
                  </td>
                  <td style={{ color: 'var(--text)', fontWeight: 600 }}>{tx.account}</td>
                  <td>
                    <span className={`status ${isInc ? 'paid' : 'failed'}`}>
                      {tx.type}
                    </span>
                  </td>
                  <td style={{ textAlign: 'right', paddingRight: '20px', fontWeight: 800, color: isInc ? 'var(--green)' : 'var(--text)' }}>
                    {isInc ? '+' : '-'}{fmt(tx.amount)}
                  </td>
                </tr>
              );
            })}
            
            {filteredTransactions.length === 0 && (
              <tr>
                <td colSpan={5} style={{ textAlign: 'center', padding: '40px 0', color: 'var(--text2)' }}>
                  <Filter className="h-10 w-10 mx-auto opacity-20 mb-3" />
                  <p style={{ fontWeight: 600 }}>No transactions match your filters</p>
                  <button onClick={clearFilters} style={{ color: 'var(--violet)', fontWeight: 700, fontSize: '11px', marginTop: '8px', cursor: 'pointer', background: 'transparent', border: 'none' }}>
                    Clear all filters
                  </button>
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', color: 'var(--text3)' }}>
        <div style={{ fontSize: '11px', fontWeight: 600 }}>Showing {filteredTransactions.length} of {transactions.length} entries</div>
        <div style={{ display: 'flex', gap: '8px' }}>
           <button className="topbar-btn" disabled>Previous</button>
           <button className="topbar-btn" style={{ color: 'var(--violet)' }}>Next</button>
        </div>
      </div>
    </div>
  );
}
