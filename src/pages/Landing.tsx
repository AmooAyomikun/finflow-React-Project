import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './landing.css';

const Landing = () => {
  const navigate = useNavigate();
  const [currentPage, setCurrentPage] = useState('home');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState('signup');
  const [openFaq, setOpenFaq] = useState<number | null>(null);
  const [toast, setToast] = useState({ show: false, msg: '', icon: '✅' });

  // Navigation handlers
  const showPage = (name: string) => {
    setCurrentPage(name);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger fade-ups after page switch
    setTimeout(triggerFadeUps, 120);
  };

  const goHome = () => showPage('home');

  // Modal handlers
  const openModal = (type = 'signup') => {
    setIsModalOpen(true);
    setModalType(type);
  };

  const closeModal = () => setIsModalOpen(false);

  // Toast handler
  const showToast = (msg: string, icon = '✅') => {
    setToast({ show: true, msg, icon });
    setTimeout(() => setToast(prev => ({ ...prev, show: false })), 3500);
  };

  // Auth handlers (Mock)
  const handleSignup = () => {
    closeModal();
    showToast('Account created! Welcome to FinFlow 🎉', '🎉');
    // In a real app, you might navigate to dashboard or onboarding
  };

  const handleLogin = () => {
    closeModal();
    showToast('Welcome back! Loading your dashboard...', '✅');
    navigate('/dashboard');
  };

  const handleEmailSubmit = () => {
    showToast('Subscribed! Welcome aboard 🎉', '🎉');
  };

  // FAQ Toggle
  const toggleFaq = (index: number) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  // Animations & UI Effects
  const triggerFadeUps = () => {
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add('visible');
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    document.querySelectorAll('.fade-up:not(.visible)').forEach(el => obs.observe(el));
  };

  useEffect(() => {
    triggerFadeUps();
    const handleScroll = () => {
      const nav = document.getElementById('main-nav');
      if (nav) {
        nav.style.boxShadow = window.scrollY > 20 ? '0 2px 20px rgba(0,0,0,.07)' : 'none';
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [currentPage]);

  // Handle modal backdrop click
  const handleBackdropClick = (e: React.MouseEvent) => {
    if ((e.target as HTMLElement).id === 'auth-modal') closeModal();
  };

  return (
    <div className="landing-body">
      {/* Navigation */}
      <nav className="nav" id="main-nav">
        <div className="nav-inner">
          <a className="nav-logo" onClick={goHome} style={{ cursor: 'pointer' }}>
            <div className="nav-logo-icon"><i className="fa-solid fa-gem" style={{ color: '#fff' }}></i></div> FinFlow
          </a>
          <ul className="nav-links">
            <li><a onClick={goHome}>Home</a></li>
            <li><a onClick={() => showPage('about')}>About</a></li>
            <li><a onClick={() => showPage('features')}>Features</a></li>
            <li><a onClick={() => showPage('pricing-page')}>Pricing</a></li>
            <li><a onClick={() => showPage('blog')}>Blog</a></li>
            <li><a onClick={() => showPage('contact')}>Contact</a></li>
          </ul>
          <div className="nav-actions">
            <a className="nav-login" onClick={() => openModal('login')}>Log in</a>
            <a className="btn btn-dark btn-sm" onClick={() => openModal('signup')}>Get Started <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px' }}></i></a>
          </div>
        </div>
      </nav>

      {/* HOME PAGE */}
      {currentPage === 'home' && (
        <div className="page active" id="page-home">
          {/* Hero */}
          <section className="hero">
            <div className="hero-inner">
              <div>
                <h1>Take Control of Your<br /><span className="italic">Financial Future</span></h1>
                <p className="hero-desc">Take control of your money with FinFlow. Track your spending, save smartly, all in one easy-to-use app.</p>
                <div className="hero-cta">
                  <a className="btn btn-dark btn-lg" onClick={() => showPage('features')}>Explore our services</a>
                </div>
                <p className="hero-note">✓ Free to start &nbsp;·&nbsp; ✓ No credit card required</p>
                <div className="trust-row">
                  <div className="trust-label">TRUSTED BY 500+ BUSINESS TEAMS</div>
                  <div className="trust-logos">
                    <span className="trust-logo">◆ Notion</span>
                    <span className="trust-logo">⬡ mobilinky</span>
                    <span className="trust-logo">△ Airtable</span>
                    <span className="trust-logo">◉ QUITFOOD</span>
                  </div>
                </div>
              </div>

              <div className="hero-visual">
                <div className="float-card fc-tl">
                  <div className="fc-label">Monthly Income</div>
                  <div className="fc-val" style={{ color: 'var(--green)' }}>$4,350</div>
                  <span className="fc-chip chip-g"><i className="fa-solid fa-arrow-up"></i> 12% this month</span>
                </div>
                <div className="phone-frame">
                  <div className="phone-notch"></div>
                  <div className="phone-screen">
                    <div className="ph-header"><span className="ph-title">Dashboard</span><span className="ph-badge">LIVE</span></div>
                    <div className="ph-balance">$24,350</div>
                    <div className="ph-sub">Total net worth · Updated now</div>
                    <div className="ph-bar-row">
                      <div className="ph-bar" style={{ height: '40%', background: 'rgba(108,92,231,.4)' }}></div>
                      <div className="ph-bar" style={{ height: '60%', background: 'rgba(108,92,231,.6)' }}></div>
                      <div className="ph-bar" style={{ height: '50%', background: 'rgba(108,92,231,.4)' }}></div>
                      <div className="ph-bar" style={{ height: '80%', background: 'var(--violet)' }}></div>
                      <div className="ph-bar" style={{ height: '65%', background: 'rgba(108,92,231,.5)' }}></div>
                      <div className="ph-bar" style={{ height: '90%', background: 'var(--violet)' }}></div>
                      <div className="ph-bar" style={{ height: '75%', background: 'var(--green)' }}></div>
                    </div>
                    <div className="ph-stat-row">
                      <div className="ph-stat"><div className="ph-stat-l">INCOME</div><div className="ph-stat-v" style={{ color: '#4ADE80' }}>$4,350</div></div>
                      <div className="ph-stat"><div className="ph-stat-l">EXPENSE</div><div className="ph-stat-v" style={{ color: '#F87171' }}>$2,890</div></div>
                    </div>
                    <div className="ph-tx">
                      <div className="ph-tx-icon" style={{ background: 'rgba(108,92,231,.3)' }}><i className="fa-solid fa-bag-shopping" style={{ color: 'var(--violet)' }}></i></div>
                      <div><div className="ph-tx-name">Shoprite</div><div className="ph-tx-cat">Shopping</div></div>
                      <div className="ph-tx-amt" style={{ color: '#F87171' }}>-$128</div>
                    </div>
                    <div className="ph-tx">
                      <div className="ph-tx-icon" style={{ background: 'rgba(74,222,128,.2)' }}><i className="fa-solid fa-briefcase" style={{ color: 'var(--green)' }}></i></div>
                      <div><div className="ph-tx-name">Salary</div><div className="ph-tx-cat">Income</div></div>
                      <div className="ph-tx-amt" style={{ color: '#4ADE80' }}>+$3,500</div>
                    </div>
                    <div className="ph-tx">
                      <div className="ph-tx-icon" style={{ background: 'rgba(251,191,36,.2)' }}><i className="fa-solid fa-mug-hot" style={{ color: 'var(--amber)' }}></i></div>
                      <div><div className="ph-tx-name">Coffee</div><div className="ph-tx-cat">Food</div></div>
                      <div className="ph-tx-amt" style={{ color: '#F87171' }}>-$8</div>
                    </div>
                  </div>
                </div>
                <div className="phone-2">
                  <div className="phone-notch" style={{ background: '#1a1630' }}></div>
                  <div className="phone-screen" style={{ background: '#1a1630' }}>
                    <div style={{ fontSize: '8px', fontWeight: '700', color: '#A78BFA', marginBottom: '8px' }}>SAVINGS GOALS</div>
                    <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff', marginBottom: '2px' }}>$5,800</div>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.35)', marginBottom: '10px' }}>House deposit goal</div>
                    <div style={{ height: '4px', background: 'rgba(255,255,255,.1)', borderRadius: '2px', marginBottom: '6px', overflow: 'hidden' }}><div style={{ height: '4px', width: '58%', background: 'var(--violet)', borderRadius: '2px' }}></div></div>
                    <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.4)', marginBottom: '12px' }}>58% of $10,000</div>
                    <div style={{ fontSize: '8px', fontWeight: '700', color: '#A78BFA', marginBottom: '6px' }}>SUBSCRIPTIONS</div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px', background: 'rgba(255,255,255,.06)', borderRadius: '6px', marginBottom: '4px' }}>
                      <span style={{ fontSize: '10px' }}><i className="fa-solid fa-music" style={{ color: '#fff', fontSize: '10px' }}></i></span>
                      <div><div style={{ fontSize: '8px', fontWeight: '700', color: '#fff' }}>Spotify</div><div style={{ fontSize: '7px', color: 'rgba(255,255,255,.3)' }}>Monthly</div></div>
                      <div style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: '700', color: '#F87171' }}>$10.99</div>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', padding: '6px', background: 'rgba(255,255,255,.06)', borderRadius: '6px' }}>
                      <span style={{ fontSize: '10px' }}><i className="fa-brands fa-youtube" style={{ color: '#fff', fontSize: '10px' }}></i></span>
                      <div><div style={{ fontSize: '8px', fontWeight: '700', color: '#fff' }}>YouTube</div><div style={{ fontSize: '7px', color: 'rgba(255,255,255,.3)' }}>Monthly</div></div>
                      <div style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: '700', color: '#F87171' }}>$11.99</div>
                    </div>
                  </div>
                </div>
                <div className="float-card fc-br">
                  <div className="fc-label"><i className="fa-solid fa-bullseye" style={{ fontSize: '9px' }}></i> Vacation Goal</div>
                  <div className="fc-val" style={{ color: 'var(--violet)' }}>76%</div>
                  <div style={{ height: '4px', background: '#EDE9FF', borderRadius: '2px', margin: '6px 0', overflow: 'hidden' }}><div style={{ height: '4px', width: '76%', background: 'var(--violet)', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '10px', color: 'var(--muted-c)' }}>$2,300 / $3,000</div>
                </div>
              </div>
            </div>
          </section>

          {/* Proof Bar */}
          <div className="proof-bar">
            <div className="proof-inner">
              <div className="proof-stat"><div className="proof-val">25K+</div><div className="proof-lbl">Active users worldwide</div></div>
              <div className="proof-sep"></div>
              <div className="proof-stat"><div className="proof-val">8.2M</div><div className="proof-lbl">Transactions tracked</div></div>
              <div className="proof-sep"></div>
              <div className="proof-stat"><div className="proof-val">+10%</div><div className="proof-lbl">Avg savings increase</div></div>
              <div className="proof-sep"></div>
              <div className="proof-stat"><div className="proof-val">4.9★</div><div className="proof-lbl">User satisfaction</div></div>
              <div className="proof-sep"></div>
              <div className="proof-stat"><div className="proof-val">$2.4M</div><div className="proof-lbl">Saved by users</div></div>
            </div>
          </div>

          {/* Features */}
          <section className="section">
            <div className="container tc">
              <h2 className="section-title">Powerful Features to Take Control<br />of Your <span className="italic">Finances</span></h2>
              <p className="section-desc" style={{ maxWidth: '520px', margin: '0 auto' }}>Manage your finances with FinFlow. Monitor expenses, save efficiently, all within a single application.</p>

              <div className="features-3-grid fade-up">
                <div className="feat-card">
                  <div className="feat-card-top">
                    <div className="feat-icon-wrap" style={{ background: '#E3F0FF' }}><i className="fa-solid fa-chart-line" style={{ color: 'var(--blue)' }}></i></div>
                    <h3>Expense Tracking</h3>
                    <p>Easily track your daily, weekly, and monthly expenses to stay in control of where your money is being spent.</p>
                  </div>
                  <div className="feat-card-img" style={{ background: 'linear-gradient(180deg,#F0F7FF 0%,#E3F0FF 100%)' }}>
                    <div className="feat-phone">
                      <div className="fp-notch"></div>
                      <div className="fp-screen">
                        <div style={{ fontSize: '8px', color: '#4A6A8A', fontWeight: '700', marginBottom: '8px' }}>EXPENSES THIS MONTH</div>
                        <div style={{ fontSize: '18px', fontWeight: '900', color: '#fff', marginBottom: '8px' }}>$2,890</div>
                        <div style={{ display: 'flex', gap: '2px', alignItems: 'flex-end', height: '40px', marginBottom: '6px' }}>
                          <div style={{ flex: 1, height: '50%', background: 'rgba(21,101,192,.4)', borderRadius: '2px 2px 0 0' }}></div>
                          <div style={{ flex: 1, height: '80%', background: 'rgba(21,101,192,.6)', borderRadius: '2px 2px 0 0' }}></div>
                          <div style={{ flex: 1, height: '60%', background: 'rgba(21,101,192,.4)', borderRadius: '2px 2px 0 0' }}></div>
                          <div style={{ flex: 1, height: '100%', background: 'var(--blue)', borderRadius: '2px 2px 0 0' }}></div>
                          <div style={{ flex: 1, height: '70%', background: 'rgba(21,101,192,.5)', borderRadius: '2px 2px 0 0' }}></div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px', background: 'rgba(255,255,255,.07)', borderRadius: '5px', marginBottom: '3px' }}>
                          <span style={{ fontSize: '9px' }}><i className="fa-solid fa-burger" style={{ fontSize: '9px', color: 'var(--amber)' }}></i></span>
                          <div style={{ fontSize: '8px', fontWeight: '600', color: '#fff', flex: 1 }}>Food</div>
                          <div style={{ fontSize: '8px', fontWeight: '700', color: '#F87171' }}>$450</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', padding: '5px', background: 'rgba(255,255,255,.07)', borderRadius: '5px' }}>
                          <span style={{ fontSize: '9px' }}><i className="fa-solid fa-car" style={{ fontSize: '9px', color: 'var(--blue-light)' }}></i></span>
                          <div style={{ fontSize: '8px', fontWeight: '600', color: '#fff', flex: 1 }}>Transport</div>
                          <div style={{ fontSize: '8px', fontWeight: '700', color: '#F87171' }}>$120</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="feat-card">
                  <div className="feat-card-top">
                    <div className="feat-icon-wrap" style={{ background: '#E8F5E9' }}><i className="fa-solid fa-wallet" style={{ color: 'var(--green)' }}></i></div>
                    <h3>Budget Planning</h3>
                    <p>Set higher budgets, monitor your progress, and avoid overspending with smart, intuitive budget tracking.</p>
                  </div>
                  <div className="feat-card-img" style={{ background: 'linear-gradient(180deg,#F0FFF4 0%,#E8F5E9 100%)' }}>
                    <div className="feat-phone">
                      <div className="fp-notch"></div>
                      <div className="fp-screen">
                        <div style={{ fontSize: '8px', color: '#4A6A8A', fontWeight: '700', marginBottom: '8px' }}>BUDGET OVERVIEW</div>
                        <div style={{ marginBottom: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}><span style={{ fontSize: '8px', color: '#fff' }}>Food</span><span style={{ fontSize: '8px', color: '#4ADE80' }}>75%</span></div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,.1)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '4px', width: '75%', background: '#4ADE80', borderRadius: '2px' }}></div></div>
                        </div>
                        <div style={{ marginBottom: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}><span style={{ fontSize: '8px', color: '#fff' }}>Shopping</span><span style={{ fontSize: '8px', color: '#FBBF24' }}>88%</span></div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,.1)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '4px', width: '88%', background: '#FBBF24', borderRadius: '2px' }}></div></div>
                        </div>
                        <div style={{ marginBottom: '6px' }}>
                          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '3px' }}><span style={{ fontSize: '8px', color: '#fff' }}>Transport</span><span style={{ fontSize: '8px', color: '#F87171' }}>103%</span></div>
                          <div style={{ height: '4px', background: 'rgba(255,255,255,.1)', borderRadius: '2px', overflow: 'hidden' }}><div style={{ height: '4px', width: '100%', background: '#F87171', borderRadius: '2px' }}></div></div>
                        </div>
                        <div style={{ background: 'rgba(248,113,113,.15)', borderRadius: '6px', padding: '5px', fontSize: '7.5px', color: '#F87171', fontWeight: '600' }}>⚠️ Transport budget exceeded!</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="feat-card">
                  <div className="feat-card-top">
                    <div className="feat-icon-wrap" style={{ background: '#EDE9FF' }}><i className="fa-solid fa-building-columns" style={{ color: 'var(--violet)' }}></i></div>
                    <h3>Multi-Account Support</h3>
                    <p>Manage all your bank accounts in one place, track balances, and see your unified net worth at a glance.</p>
                  </div>
                  <div className="feat-card-img" style={{ background: 'linear-gradient(180deg,#F5F3FF 0%,#EDE9FF 100%)' }}>
                    <div className="feat-phone">
                      <div className="fp-notch"></div>
                      <div className="fp-screen">
                        <div style={{ fontSize: '8px', color: '#A78BFA', fontWeight: '700', marginBottom: '8px' }}>MY ACCOUNTS</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px', background: 'rgba(255,255,255,.07)', borderRadius: '6px', marginBottom: '5px' }}>
                          <span style={{ fontSize: '11px' }}><i className="fa-solid fa-building-columns" style={{ color: '#fff', fontSize: '11px' }}></i></span>
                          <div><div style={{ fontSize: '8px', fontWeight: '700', color: '#fff' }}>GTBank</div><div style={{ fontSize: '7px', color: 'rgba(255,255,255,.35)' }}>Checking</div></div>
                          <div style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: '800', color: '#4ADE80' }}>$8,420</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px', background: 'rgba(255,255,255,.07)', borderRadius: '6px', marginBottom: '5px' }}>
                          <span style={{ fontSize: '11px' }}><i className="fa-solid fa-piggy-bank" style={{ color: '#fff', fontSize: '11px' }}></i></span>
                          <div><div style={{ fontSize: '8px', fontWeight: '700', color: '#fff' }}>UBA Savings</div><div style={{ fontSize: '7px', color: 'rgba(255,255,255,.35)' }}>Savings</div></div>
                          <div style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: '800', color: '#4ADE80' }}>$12,300</div>
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '5px', padding: '6px', background: 'rgba(255,255,255,.07)', borderRadius: '6px' }}>
                          <span style={{ fontSize: '11px' }}><i className="fa-solid fa-money-bill-1" style={{ color: '#fff', fontSize: '11px' }}></i></span>
                          <div><div style={{ fontSize: '8px', fontWeight: '700', color: '#fff' }}>Cash Wallet</div><div style={{ fontSize: '7px', color: 'rgba(255,255,255,.35)' }}>Cash</div></div>
                          <div style={{ marginLeft: 'auto', fontSize: '9px', fontWeight: '800', color: '#4ADE80' }}>$350</div>
                        </div>
                        <div style={{ marginTop: '8px', paddingTop: '8px', borderTop: '1px solid rgba(255,255,255,.06)', display: 'flex', justifyContent: 'space-between' }}><span style={{ fontSize: '8px', color: 'rgba(255,255,255,.4)' }}>NET WORTH</span><span style={{ fontSize: '10px', fontWeight: '900', color: '#A78BFA' }}>$21,070</span></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="explore-btn-row">
                <a className="btn btn-outline" onClick={() => showPage('features')}>Explore All Features <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </section>

          {/* Manage section */}
          <section className="manage-section">
            <div className="manage-inner">
              <div className="manage-phone-wrap">
                <div className="manage-phone">
                  <div className="phone-notch" style={{ background: 'rgba(255,255,255,.1)' }}></div>
                  <div className="phone-screen">
                    <div className="mp-tag"><i className="fa-solid fa-circle" style={{ fontSize: '6px', marginRight: '4px' }}></i> TRANSACTIONS</div>
                    <div className="mp-title">This month</div>
                    <div className="mp-sub">July 2025</div>

                    <div className="mp-tx-item">
                      <div className="mp-tx-avatar" style={{ background: '#6C5CE7' }}>P</div>
                      <div><div className="mp-tx-name">Parents</div><div className="mp-tx-date">Today · 9:00</div></div>
                      <div className="mp-tx-amt g">+$50.00</div>
                    </div>
                    <div className="mp-tx-item">
                      <div className="mp-tx-avatar" style={{ background: '#E65100' }}><i className="fa-solid fa-mug-hot"></i></div>
                      <div><div className="mp-tx-name">Paul's Coffee</div><div className="mp-tx-date">Today · 10:30</div></div>
                      <div className="mp-tx-amt r">-$9.80</div>
                    </div>
                    <div className="mp-tx-item">
                      <div className="mp-tx-avatar" style={{ background: '#0097A7' }}>A</div>
                      <div><div className="mp-tx-name">Al & Mia</div><div className="mp-tx-date">Yesterday</div></div>
                      <div className="mp-tx-amt r">-$21.43</div>
                    </div>
                    <div className="mp-tx-item">
                      <div className="mp-tx-avatar" style={{ background: '#2E7D32' }}>P</div>
                      <div><div className="mp-tx-name">Parents</div><div className="mp-tx-date">2 days ago</div></div>
                      <div className="mp-tx-amt g">+$30.00</div>
                    </div>

                    <div style={{ marginTop: '14px', padding: '10px', background: 'rgba(108,92,231,.25)', borderRadius: '10px', textAlign: 'center' }}>
                      <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.6)', marginBottom: '4px' }}>MONTHLY SAVINGS</div>
                      <div style={{ fontSize: '20px', fontWeight: '900', color: '#fff' }}>$1,460</div>
                      <div style={{ display: 'inline-block', fontSize: '9px', fontWeight: '700', background: 'rgba(74,222,128,.2)', color: '#4ADE80', padding: '2px 10px', borderRadius: '20px', marginTop: '4px' }}><i className="fa-solid fa-arrow-up"></i> 18% vs last month</div>
                    </div>
                  </div>
                </div>

                <div className="mp-float mp-f1">
                  <div className="mp-fl-val">$13,209</div>
                  <div className="mp-fl-lbl">Total portfolio value</div>
                  <div className="mp-fl-chip"><i className="fa-solid fa-arrow-up"></i> +12.4%</div>
                </div>
                <div className="mp-float mp-f2">
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.6)', marginBottom: '4px' }}>GOAL PROGRESS</div>
                  <div style={{ fontSize: '14px', fontWeight: '800', color: '#fff', marginBottom: '4px' }}>Vacation <i className="fa-solid fa-plane"></i></div>
                  <div style={{ height: '4px', background: 'rgba(255,255,255,.15)', borderRadius: '2px', overflow: 'hidden', width: '100px' }}><div style={{ height: '4px', width: '76%', background: '#A78BFA', borderRadius: '2px' }}></div></div>
                  <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.5)', marginTop: '3px' }}>76% — $2,300 / $3,000</div>
                </div>
              </div>

              <div className="manage-content">
                <h2>Manage Your Finances in<br /><span className="italic">3 Simple Steps</span></h2>
                <p className="sub">It's easy and takes less than 5 minutes to set up your complete financial command center.</p>

                <div className="manage-steps">
                  <div className="manage-step">
                    <div className="ms-icon"><i className="fa-solid fa-user-plus"></i></div>
                    <div className="ms-body">
                      <h4>Create Your Free Account in Minutes</h4>
                      <p>Sign up with your email or Google account. No credit card required. Your data is secure and private from day one.</p>
                    </div>
                  </div>
                  <div className="manage-step">
                    <div className="ms-icon"><i className="fa-solid fa-chart-line"></i></div>
                    <div className="ms-body">
                      <h4>See Smart Reports, Instantly</h4>
                      <p>Beautiful dashboards populate as soon as you add your first transaction. No setup headaches, no steep learning curve.</p>
                    </div>
                  </div>
                  <div className="manage-step">
                    <div className="ms-icon"><i className="fa-solid fa-bullseye"></i></div>
                    <div className="ms-body">
                      <h4>Track Spending & Stay on Budget</h4>
                      <p>Visualize your expenses, get budget alerts, and never miss a financial goal with FinFlow's smart tracking tools.</p>
                    </div>
                  </div>
                </div>

                <a className="btn btn-white" onClick={() => openModal('signup')}>Try It Free <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </section>

          {/* Why Trust */}
          <section className="section">
            <div className="container tc">
              <h2 className="section-title">Why Thousands Trust <span className="italic">FinFlow</span></h2>
              <p className="section-desc" style={{ maxWidth: '480px', margin: '0 auto' }}>Experience smarter, stress-free financial management backed by simplicity, security, and powerful insights.</p>

              <div className="why-grid fade-up">
                <div className="why-card">
                  <div className="why-icon" style={{ background: '#E3F0FF' }}><i className="fa-solid fa-bolt" style={{ color: 'var(--blue)' }}></i></div>
                  <h3>Save Time on Manual Calculations</h3>
                  <p>Automate your financial tracking and reporting, so you can focus on growing your business — not crunching numbers. Smart categorization saves hours every month.</p>
                </div>
                <div className="why-card">
                  <div className="why-icon" style={{ background: '#EDE9FF' }}><i className="fa-solid fa-chart-line" style={{ color: 'var(--violet)' }}></i></div>
                  <h3>Get Real-Time Financial Insights</h3>
                  <p>Access up-to-date spending data and dashboard reports, giving you full visibility into your finances at a glance. Make confident money decisions every day.</p>
                </div>
                <div className="why-card">
                  <div className="why-icon" style={{ background: '#E8F5E9' }}><i className="fa-solid fa-bullseye" style={{ color: 'var(--green)' }}></i></div>
                  <h3>Stay on Top of Budgets</h3>
                  <p>Set custom budget alerts, helping you control overspending and reach your financial goals with ease. Color-coded warnings keep you on track automatically.</p>
                </div>
              </div>

              <div className="why-cta-row">
                <a className="btn btn-primary btn-lg" onClick={() => showPage('features')}>Explore Full Features <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </section>

          {/* Testimonials */}
          <section className="section" style={{ background: 'var(--testi-bg)', paddingTop: '100px', paddingBottom: '100px' }}>
            <div className="container">
              <div className="testi-header">
                <div>
                  <h2 className="section-title" style={{ marginBottom: 0 }}>Sweetword from <span className="italic">sweet people</span></h2>
                </div>
                <div className="testi-arrows">
                  <button className="testi-arrow"><i className="fa-solid fa-chevron-left"></i></button>
                  <button className="testi-arrow"><i className="fa-solid fa-chevron-right"></i></button>
                </div>
              </div>
              <div className="testi-grid fade-up">
                <div className="testi-card">
                  <div className="t-author" style={{ marginBottom: '16px' }}>
                    <div className="t-avatar" style={{ background: 'linear-gradient(135deg,#1565C0,#42A5F5)' }}>Z</div>
                    <div><div className="t-name">Zanthe M.</div><div className="t-role">Marketing Manager</div></div>
                  </div>
                  <p className="t-quote">"I finally understand where my salary goes each month. FinFlow's budget tracking is incredibly intuitive and the goal tracker kept me motivated to save."</p>
                  <div style={{ height: '1px', background: 'var(--border-c)', margin: '14px 0' }}></div>
                  <div className="t-metric" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="t-metric-val">+102K</div><div className="t-metric-lbl">Savings increase</div>
                  </div>
                </div>
                <div className="testi-card">
                  <div className="t-author" style={{ marginBottom: '16px' }}>
                    <div className="t-avatar" style={{ background: 'linear-gradient(135deg,#2E7D32,#4CAF50)' }}>L</div>
                    <div><div className="t-name">Luan Carter</div><div className="t-role">Freelance Designer</div></div>
                  </div>
                  <p className="t-quote">"Working from multiple devices has never been this seamless. I check finances on my phone and review the dashboard on my laptop every night."</p>
                  <div style={{ height: '1px', background: 'var(--border-c)', margin: '14px 0' }}></div>
                  <div className="t-metric" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="t-metric-val">+95%</div><div className="t-metric-lbl">Expense awareness</div>
                  </div>
                </div>
                <div className="testi-card" style={{ opacity: 0.6 }}>
                  <div className="t-author" style={{ marginBottom: '16px' }}>
                    <div className="t-avatar" style={{ background: 'linear-gradient(135deg,#6C5CE7,#A78BFA)' }}>A</div>
                    <div><div className="t-name">Sarah J.</div><div className="t-role">Product Designer</div></div>
                  </div>
                  <p className="t-quote">"The best financial app I've ever used. Simple, fast, and secure. Highly recommend to everyone."</p>
                  <div style={{ height: '1px', background: 'var(--border-c)', margin: '14px 0' }}></div>
                  <div className="t-metric" style={{ textAlign: 'left', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div className="t-metric-val">+$5K</div><div className="t-metric-lbl">Debt reduction</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* Integrations */}
          <section className="integrations-section">
            <div className="integ-inner">
              <div className="radar-wrap fade-up">
                <div className="radar-circle radar-c1"></div>
                <div className="radar-circle radar-c2"></div>
                <div className="radar-circle radar-c3"></div>
                <div className="radar-center"><i className="fa-solid fa-gem"></i></div>
                {/* Orbital icons */}
                <div className="integ-icon" style={{ top: '15%', left: '15%' }}><i className="fa-brands fa-slack" style={{ color: '#4A154B' }}></i></div>
                <div className="integ-icon" style={{ top: '10%', right: '20%' }}><i className="fa-brands fa-google-drive" style={{ color: '#34A853' }}></i></div>
                <div className="integ-icon" style={{ bottom: '20%', left: '10%' }}><i className="fa-brands fa-stripe" style={{ color: '#635BFF' }}></i></div>
                <div className="integ-icon" style={{ bottom: '15%', right: '15%' }}><i className="fa-brands fa-figma" style={{ color: '#F24E1E' }}></i></div>
                <div className="integ-icon" style={{ top: '45%', right: '5%' }}><i className="fa-brands fa-notion" style={{ color: '#000' }}></i></div>
                <div className="integ-icon" style={{ bottom: '45%', left: '2%' }}><i className="fa-brands fa-spotify" style={{ color: '#1DB954' }}></i></div>
              </div>
              <div className="integ-content">
                <h2 className="section-title">Integrates with all your<br /><span className="italic">favourite tools</span> to get along<br />with others</h2>
                <p className="section-desc">FinFlow works seamlessly with the products you already use. Connect your banks, tools, and platforms in seconds.</p>
                <div style={{ marginTop: '32px' }}>
                  <a className="btn btn-dark" onClick={() => openModal('signup')}>Explore Integrations</a>
                </div>
              </div>
            </div>
          </section>

          {/* Pricing Section in Home */}
          <section className="section" id="pricing-section">
            <div className="container tc">
              <div style={{ fontSize: '11px', fontWeight: '700', color: 'var(--muted-c)', letterSpacing: '1px', textTransform: 'uppercase', marginBottom: '10px' }}>Choose Your Plan · Finance Pricing</div>
              <h2 className="section-title">Transparent Pricing for <span className="italic">Everyone</span></h2>
              <p className="section-desc" style={{ maxWidth: '460px', margin: '0 auto' }}>Choose the perfect plan for your finances — no hidden fees or surprises.</p>

              <div className="pricing-grid">
                <div className="pc fade-up">
                  <div className="pc-plan"><div className="pc-plan-dot" style={{ background: '#9BACC8' }}></div> Basic</div>
                  <div className="pc-price">$0<span>/month</span></div>
                  <div className="pc-desc">Perfect for getting started</div>
                  <a className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Connect up to 3 accounts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Basic expense tracking</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Monthly reports</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Budget planning tools</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Email support</li>
                  </ul>
                </div>

                <div className="pc featured fade-up">
                  <div className="pc-popular"><i className="fa-solid fa-bolt"></i> Pro (Recommended)</div>
                  <div className="pc-plan" style={{ marginTop: '8px' }}><div className="pc-plan-dot" style={{ background: 'var(--violet)' }}></div> Pro</div>
                  <div className="pc-price">$19<span>/month</span></div>
                  <div className="pc-desc">Best for individuals & teams</div>
                  <a className="btn btn-violet" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Connect unlimited accounts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Real-time expense tracking</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Advanced reports & insights</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Smart budget alerts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Priority email support</li>
                  </ul>
                </div>

                <div className="pc fade-up">
                  <div className="pc-plan"><div className="pc-plan-dot" style={{ background: 'var(--amber)' }}></div> Business</div>
                  <div className="pc-price">$49<span>/month</span></div>
                  <div className="pc-desc">For growing businesses</div>
                  <a className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> All Pro features</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Multi-user access</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Automated reports</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Dedicated account manager</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Premium support</li>
                  </ul>
                </div>
              </div>

              <div className="see-feats">
                <a className="btn btn-outline" onClick={() => showPage('pricing-page')}>See All Features <i className="fa-solid fa-arrow-right"></i></a>
              </div>
            </div>
          </section>

          {/* FAQ */}
          <section className="section" style={{ background: 'var(--surface)', paddingTop: '80px', paddingBottom: '80px' }}>
            <div className="container">
              <div className="tc" style={{ marginBottom: '0' }}>
                <h2 className="section-title">Frequently Asked <span className="italic">Questions</span></h2>
                <p className="section-desc" style={{ maxWidth: '460px', margin: '0 auto' }}>Everything you need to know about FinFlow.</p>
              </div>

              <div className="faq-grid">
                <div className="faq-col">
                  {[0, 1, 2, 3, 4].map(idx => {
                    const qs = [
                      "What services does FinFlow offer?",
                      "How long does a typical project take?",
                      "What is your pricing structure?",
                      "Can I see examples of your previous work?",
                      "How do I get started with FinFlow?"
                    ];
                    const as = [
                      "FinFlow offers personal finance tracking, budget management, savings goal tracking, spending analytics, monthly PDF reports, CSV exports, recurring transaction tracking, and multi-account management — all in one clean dashboard.",
                      "You can be up and running in under 5 minutes. Sign up, add your first account, set a budget, and you're tracking. Most users complete the full onboarding wizard in under 3 minutes.",
                      "We offer a free Basic plan, a Pro plan at $19/month, and a Business plan at $49/month. All paid plans come with a 14-day free trial — no credit card required.",
                      "Check out our case studies page where we share real user success stories — like how Amara & Kemi saved $8,000 in 8 months using FinFlow's goal tracker and shared budget views.",
                      "Simply click 'Get Started' to create your free account. You'll be guided through a 3-step onboarding wizard: set your base currency, add your first account, and set your first budget — all in under 5 minutes."
                    ];
                    return (
                      <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                        <div className="faq-q" onClick={() => toggleFaq(idx)}>{qs[idx]} <div className="faq-icon-btn"><i className="fa-solid fa-plus"></i></div></div>
                        <div className="faq-a">{as[idx]}</div>
                      </div>
                    );
                  })}
                </div>
                <div className="faq-col">
                  {[5, 6, 7, 8, 9].map(idx => {
                    const qs = [
                      "Do you provide content writing services?",
                      "What is your design process?",
                      "What industries do you work with?",
                      "How can I contact you?",
                      "Who is FinFlow built for?"
                    ];
                    const as = [
                      "Our blog covers personal finance tips, budgeting strategies, and money management guides written by our team and guest contributors. All content is free to read.",
                      "FinFlow is designed mobile-first with accessibility as a priority. We follow WCAG 2.1 AA standards and test on real devices across emerging market connectivity conditions.",
                      "We work with a diverse range of industries including tech, retail, healthcare, and education. Our users span across Nigeria, Ghana, Kenya, South Africa, the UK, and beyond — we're global by design.",
                      "You can reach us at hello@finflow.app, through live chat (Mon–Fri 9am–6pm WAT), or via the contact form on our website. Pro and Business users get priority email support with responses within 2 hours.",
                      "FinFlow is built for individuals, households, freelancers, and small business owners. We serve users in emerging markets and globally. Our flexible currency and account system works for anyone, anywhere."
                    ];
                    return (
                      <div key={idx} className={`faq-item ${openFaq === idx ? 'open' : ''}`}>
                        <div className="faq-q" onClick={() => toggleFaq(idx)}>{qs[idx - 5]} <div className="faq-icon-btn"><i className="fa-solid fa-plus"></i></div></div>
                        <div className="faq-a">{as[idx - 5]}</div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </section>

          {/* Blog (Updated Layout) */}
          <section className="section">
            <div className="container">
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '40px' }}>
                <div>
                  <h2 className="section-title" style={{ marginBottom: '0' }}>Take a look at the latest <span className="italic">articles</span></h2>
                </div>
                <a className="btn btn-dark btn-sm" onClick={() => showPage('blog')}>View All Blog</a>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '32px' }} className="fade-up">
                <div className="article-card" onClick={() => showPage('blog')} style={{ height: 'auto' }}>
                  <div className="article-img" style={{ background: '#f5f5f5', height: '300px' }}><img src="https://images.unsplash.com/photo-1554224155-6726b3ff858f?auto=format&fit=crop&q=80&w=800" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                  <div className="article-body" style={{ padding: '32px' }}>
                    <div className="article-cat">Finance Tips</div>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '14px', lineHeight: '1.2' }}>Working on building your savings: 5 steps that actually work</h3>
                    <p style={{ color: 'var(--muted-c)', fontSize: '14px', marginBottom: '20px' }}>Learn how to set up a robust savings system that grows with your income and protects your future.</p>
                    <div className="article-meta">Favour Ndi · 5 min read</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="article-card" onClick={() => showPage('blog')} style={{ display: 'flex', gap: '20px', border: 'none', background: 'transparent' }}>
                    <div style={{ width: '140px', height: '110px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}><img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    <div style={{ padding: '10px 0' }}>
                      <div className="article-cat">Budgeting</div>
                      <div className="article-title" style={{ fontSize: '16px' }}>Get the Most Out of FinFlow using the Money Flow strategy</div>
                      <div className="article-meta">Carlos Mrueeze · 4 min read</div>
                    </div>
                  </div>
                  <div className="article-card" onClick={() => showPage('blog')} style={{ display: 'flex', gap: '20px', border: 'none', background: 'transparent' }}>
                    <div style={{ width: '140px', height: '110px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}><img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    <div style={{ padding: '10px 0' }}>
                      <div className="article-cat">Investing</div>
                      <div className="article-title" style={{ fontSize: '16px' }}>Financial Fitness: How to Pay Down Debt and Build Wealth</div>
                      <div className="article-meta">Shayan Kuroda · 7 min read</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          {/* CTA Banner V2 */}
          <section className="cta-v2 fade-up">
            <div className="cta-v2-content">
              <h2>Ready to run your <span className="italic">account</span> better with us</h2>
              <p>Join over 25k+ users who have simplified their finances. Start your free trial today and take the first step towards financial freedom.</p>
              <a className="btn btn-dark btn-lg" onClick={() => openModal('signup')}>Get Started Now</a>
            </div>
            <div className="cta-v2-img">
              <img src="/finflow-React-Project/images/cta_woman.png" alt="Professional Woman" />
            </div>
          </section>
        </div>
      )}

      {/* FEATURES PAGE */}
      {currentPage === 'features' && (
        <div className="page active" id="page-features">
          <section className="inner-hero">
            <div className="container tc">
              <div className="section-eyebrow"><i className="fa-solid fa-bolt" style={{ fontSize: '10px' }}></i> Everything You Need</div>
              <h1>Powerful Features to Take Control<br /><span style={{ color: 'var(--violet)' }}>of Your Finances</span></h1>
              <p>Manage expenses, save efficiently, and build wealth — all in one powerful app.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px' }}>
                <a className="btn btn-dark btn-lg" onClick={() => openModal('signup')}>Start Free Today <i className="fa-solid fa-arrow-right"></i></a>
                <a className="btn btn-outline btn-lg" onClick={() => showPage('pricing-page')}>View Pricing</a>
              </div>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="features-page-grid">
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#E3F0FF' }}><i className="fa-solid fa-chart-column" style={{ color: 'var(--blue)' }}></i></div>
                  <div className="fp-content"><h3>Expense Tracking</h3><p>Track daily, weekly, and monthly expenses. Smart auto-categorization saves time and gives instant spending clarity.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#E8F5E9' }}><i className="fa-solid fa-wallet" style={{ color: 'var(--green)' }}></i></div>
                  <div className="fp-content"><h3>Budget Planning</h3><p>Set monthly budgets per category with color-coded progress bars. Alerts at 80% and 100% keep you on track.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#EDE9FF' }}><i className="fa-solid fa-building-columns" style={{ color: 'var(--violet)' }}></i></div>
                  <div className="fp-content"><h3>Multi-Account Support</h3><p>Manage all your bank accounts, mobile money, and cash in one place with a unified net worth dashboard.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#FFF8E1' }}><i className="fa-solid fa-bullseye" style={{ color: 'var(--amber)' }}></i></div>
                  <div className="fp-content"><h3>Savings Goals</h3><p>Create goals with target amounts, deadlines, and progress tracking. Get projected completion dates automatically.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#E0F7FA' }}><i className="fa-solid fa-chart-line" style={{ color: '#0097A7' }}></i></div>
                  <div className="fp-content"><h3>Smart Analytics</h3><p>Rich visual dashboards with monthly charts, category breakdowns, and income vs expense trends.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#FCE4EC' }}><i className="fa-solid fa-file-pdf" style={{ color: '#C2185B' }}></i></div>
                  <div className="fp-content"><h3>Monthly PDF Reports</h3><p>Auto-generated branded PDF reports every month-end with financial highlights and savings rate.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#E8EAF6' }}><i className="fa-solid fa-arrows-rotate" style={{ color: '#3F51B5' }}></i></div>
                  <div className="fp-content"><h3>Recurring Tracker</h3><p>Track subscriptions, get reminded before charges, and see your total annual subscription cost.</p></div>
                </div>
                <div className="fp-card fade-up">
                  <div className="fp-icon" style={{ background: '#E0F2F1' }}><i className="fa-solid fa-bell" style={{ color: '#00796B' }}></i></div>
                  <div className="fp-content"><h3>Smart Alerts</h3><p>In-app and email notifications for budget limits, goal milestones, and monthly report summaries.</p></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* PRICING PAGE */}
      {currentPage === 'pricing-page' && (
        <div className="page active" id="page-pricing-page">
          <section className="inner-hero">
            <div className="container tc">
              <div className="section-eyebrow"><i className="fa-solid fa-gem" style={{ fontSize: '10px' }}></i> Simple Pricing</div>
              <h1>Transparent pricing for <span style={{ color: 'var(--violet)' }}>everyone</span></h1>
              <p>Start free forever. Upgrade when you need more power. No hidden fees.</p>
            </div>
          </section>
          <section className="section">
            <div className="container tc">
              <div className="pricing-grid" style={{ maxWidth: '980px', margin: '0 auto 40px' }}>
                <div className="pc fade-up">
                  <div className="pc-plan"><div className="pc-plan-dot" style={{ background: '#9BACC8' }}></div> Basic</div>
                  <div className="pc-price">$0<span>/mo</span></div>
                  <div className="pc-desc">Perfect for getting started</div>
                  <a className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Up to 3 accounts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> 100 transactions/month</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> 5 budget categories</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> 2 savings goals</li>
                    <li><div className="pc-x"><i className="fa-solid fa-xmark"></i></div><span style={{ color: 'var(--muted-c)' }}>PDF reports</span></li>
                    <li><div className="pc-x"><i className="fa-solid fa-xmark"></i></div><span style={{ color: 'var(--muted-c)' }}>CSV export</span></li>
                  </ul>
                </div>
                <div className="pc featured fade-up">
                  <div className="pc-popular"><i className="fa-solid fa-bolt"></i> Pro (Recommended)</div>
                  <div className="pc-plan" style={{ marginTop: '8px' }}><div className="pc-plan-dot" style={{ background: 'var(--violet)' }}></div> Pro</div>
                  <div className="pc-price">$19<span>/mo</span></div>
                  <div className="pc-desc">Best for individuals & teams</div>
                  <a className="btn btn-violet" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Unlimited accounts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Unlimited transactions</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Unlimited budgets & goals</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> PDF & CSV reports</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Email alerts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Priority support</li>
                  </ul>
                </div>
                <div className="pc fade-up">
                  <div className="pc-plan"><div className="pc-plan-dot" style={{ background: 'var(--amber)' }}></div> Business</div>
                  <div className="pc-price">$49<span>/mo</span></div>
                  <div className="pc-desc">For teams & businesses</div>
                  <a className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Everything in Pro</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Multi-user access</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Automated reports</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Dedicated manager</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> Premium support</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div> API access</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* ABOUT PAGE */}
      {currentPage === 'about' && (
        <div className="page active" id="page-about">
          <section className="inner-hero">
            <div className="container tc">
              <div className="section-eyebrow"><i className="fa-solid fa-hand-wave" style={{ fontSize: '10px' }}></i> Our Story</div>
              <h1>Built by people who <span style={{ color: 'var(--violet)' }}>wanted</span><br />better money tools</h1>
              <p>FinFlow started as a weekend project and grew into a mission: give everyone clarity over where their money goes.</p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '72px', alignItems: 'center', marginBottom: '80px' }}>
                <div className="fade-up">
                  <div className="section-eyebrow"><i className="fa-solid fa-earth-africa" style={{ fontSize: '10px' }}></i> Mission</div>
                  <h2 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '14px' }}>Give every user <span style={{ color: 'var(--violet)' }}>clarity</span> over their finances</h2>
                  <p style={{ color: 'var(--muted-c)', fontSize: '15px', lineHeight: '1.7', marginBottom: '16px' }}>Most people don't actively track spending. Tools like YNAB are complex and US-centric. FinFlow fills the gap for emerging market users worldwide.</p>
                  <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '10px' }}>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--mid)' }}><span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', flexShrink: 0, marginTop: '2px' }}><i className="fa-solid fa-check"></i></span>No bank sync required — works worldwide</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--mid)' }}><span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', flexShrink: 0, marginTop: '2px' }}><i className="fa-solid fa-check"></i></span>Designed for young professionals globally</li>
                    <li style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', fontSize: '14px', color: 'var(--mid)' }}><span style={{ width: '20px', height: '20px', borderRadius: '50%', background: 'var(--green-soft)', color: 'var(--green)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '10px', fontWeight: '800', flexShrink: 0, marginTop: '2px' }}><i className="fa-solid fa-check"></i></span>Privacy-first — your data stays yours</li>
                  </ul>
                </div>
                <div className="fade-up" style={{ background: 'linear-gradient(135deg,#6C5CE7,#4834C4)', borderRadius: '20px', padding: '40px', textAlign: 'center' }}>
                  <div style={{ fontSize: '48px', marginBottom: '16px' }}><i className="fa-solid fa-lightbulb" style={{ color: '#fff' }}></i></div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#fff', letterSpacing: '-1px', marginBottom: '10px' }}>Our Vision</div>
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '15px', lineHeight: '1.6' }}>"Become the go-to personal finance dashboard for young professionals and households in emerging markets and beyond."</p>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,.15)', margin: '24px 0' }}></div>
                  <div style={{ fontSize: '32px', fontWeight: '900', color: '#A78BFA', letterSpacing: '-1px', marginBottom: '10px' }}>Our Mission</div>
                  <p style={{ color: 'rgba(255,255,255,.7)', fontSize: '15px', lineHeight: '1.6' }}>"Give every user clarity over where their money goes and confidence in where it is going."</p>
                </div>
              </div>
              <div className="tc" style={{ marginBottom: '40px' }}><div className="section-eyebrow"><i className="fa-solid fa-users" style={{ fontSize: '10px' }}></i> Team</div><h2 className="section-title">The people behind <span style={{ fontFamily: 'var(--font-d)', fontStyle: 'italic', fontWeight: 400 }}>FinFlow</span></h2></div>
              <div className="team-grid fade-up">
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#1565C0,#42A5F5)' }}>A</div><div className="team-name">Ade Okonkwo</div><div className="team-role">CEO & Co-Founder</div></div>
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#6C5CE7,#A78BFA)' }}>K</div><div className="team-name">Kemi Adeyemi</div><div className="team-role">CTO & Co-Founder</div></div>
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#E65100,#FF7043)' }}>T</div><div className="team-name">Tunde Balogun</div><div className="team-role">Head of Design</div></div>
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#2E7D32,#4CAF50)' }}>S</div><div className="team-name">Sade Musa</div><div className="team-role">Head of Growth</div></div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* BLOG PAGE */}
      {currentPage === 'blog' && (
        <div className="page active" id="page-blog">
          <section className="inner-hero">
            <div className="container tc">
              <div className="section-eyebrow"><i className="fa-solid fa-pen-nib" style={{ fontSize: '10px' }}></i> FinFlow Blog</div>
              <h1>Financial tips to help<br /><span style={{ color: 'var(--violet)' }}>you grow</span></h1>
              <p>Expert guides, real stories, and actionable advice to master your money.</p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="blog-hero-card fade-up">
                <div className="blog-hero-img" style={{ background: 'linear-gradient(135deg,#6C5CE7,#4834C4)' }}><i className="fa-solid fa-chart-column" style={{ color: '#fff' }}></i></div>
                <div className="blog-hero-body">
                  <div className="blog-tag">Featured · Finance Tips</div>
                  <h2>The Zero-Based Budgeting Method: Why Every Dollar Needs a Job</h2>
                  <p>Zero-based budgeting is the single most powerful tool for people who want to take control of their spending. Here's a step-by-step guide to implementing it with FinFlow.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '18px' }}><div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'linear-gradient(135deg,#6C5CE7,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '13px' }}>A</div><div><div style={{ fontSize: '12px', fontWeight: '700' }}>Ade Okonkwo</div><div style={{ fontSize: '11px', color: 'var(--muted-c)' }}>July 10, 2025 · 8 min read</div></div></div>
                  <a className="btn btn-dark" onClick={() => showToast('Opening article...', '📖')}>Read Article <i className="fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
              <div className="articles-grid fade-up">
                <div className="article-card" onClick={() => showToast('Opening article...', '📖')}>
                  <div className="article-img" style={{ background: 'linear-gradient(135deg,#1565C0,#42A5F5)' }}><i className="fa-solid fa-lightbulb" style={{ color: '#fff' }}></i></div>
                  <div className="article-body"><div className="article-cat">Budgeting</div><div className="article-title">Working on building your savings: 5 steps that actually work</div><div className="article-meta">Favour Ndi · Sep 27, 2025 · 5 min</div></div>
                </div>
                <div className="article-card" onClick={() => showToast('Opening article...', '📖')}>
                  <div className="article-img" style={{ background: 'linear-gradient(135deg,#2E7D32,#4CAF50)' }}><i className="fa-solid fa-building-columns" style={{ color: '#fff' }}></i></div>
                  <div className="article-body"><div className="article-cat">Investing</div><div className="article-title">Get the Most Out of FinFlow using the Money Flow strategy</div><div className="article-meta">Carlos Mrueeze · Jul 1, 2025 · 4 min</div></div>
                </div>
                <div className="article-card" onClick={() => showToast('Opening article...', '📖')}>
                  <div className="article-img" style={{ background: 'linear-gradient(135deg,#E65100,#FF7043)' }}><i className="fa-solid fa-bullseye" style={{ color: '#fff' }}></i></div>
                  <div className="article-body"><div className="article-cat">Debt</div><div className="article-title">Financial Fitness: How to Pay Down Debt and Build Wealth</div><div className="article-meta">Shayan Kuroda · Jun 15 · 7 min</div></div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* CONTACT PAGE */}
      {currentPage === 'contact' && (
        <div className="page active" id="page-contact">
          <section className="inner-hero">
            <div className="container tc">
              <div className="section-eyebrow"><i className="fa-solid fa-envelope" style={{ fontSize: '10px' }}></i> Get in Touch</div>
              <h1>We'd love to <span style={{ color: 'var(--violet)' }}>hear from you</span></h1>
              <p>Got a question, feature request, or want to say hello? We respond within 24 hours.</p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="contact-grid">
                <div className="fade-up">
                  <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px' }}>Send us a message</h3>
                  <p style={{ color: 'var(--muted-c)', fontSize: '14px', marginBottom: '24px' }}>We'll get back to you within 24 hours.</p>
                  <div className="form-row" style={{ marginBottom: '14px' }}>
                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">First Name</label><input className="form-input" placeholder="John" /></div>
                    <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Last Name</label><input className="form-input" placeholder="Doe" /></div>
                  </div>
                  <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="john@example.com" /></div>
                  <div className="form-group"><label className="form-label">Subject</label><input className="form-input" placeholder="How can we help?" /></div>
                  <div className="form-group"><label className="form-label">Message</label><textarea className="form-textarea" placeholder="Tell us more..."></textarea></div>
                  <button className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', height: '50px' }} onClick={() => showToast('Message sent! We\'ll reply within 24hrs.', '✅')}>Send Message <i className="fa-solid fa-paper-plane"></i></button>
                </div>
                <div className="fade-up">
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '14px' }}>Get in touch</h3>
                  <p style={{ color: 'var(--muted-c)', fontSize: '14px', marginBottom: '28px', lineHeight: '1.7' }}>Have a question about features, pricing, or your account? Our team is here to help.</p>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--violet-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}><i className="fa-solid fa-envelope" style={{ color: 'var(--violet)' }}></i></div>
                    <div><h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>Email</h4><p style={{ fontSize: '13px', color: 'var(--muted-c)' }}>hello@finflow.app</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '18px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--blue-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}><i className="fa-solid fa-comment-dots" style={{ color: 'var(--blue)' }}></i></div>
                    <div><h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>Live Chat</h4><p style={{ fontSize: '13px', color: 'var(--muted-c)' }}>Mon–Fri, 9am–6pm WAT</p></div>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'flex-start', gap: '14px', marginBottom: '28px' }}>
                    <div style={{ width: '44px', height: '44px', borderRadius: '12px', background: 'var(--green-soft)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px', flexShrink: 0 }}><i className="fa-solid fa-location-dot" style={{ color: 'var(--green)' }}></i></div>
                    <div><h4 style={{ fontSize: '14px', fontWeight: '700', marginBottom: '2px' }}>Location</h4><p style={{ fontSize: '13px', color: 'var(--muted-c)' }}>Lagos, Nigeria · Remote-first</p></div>
                  </div>
                  <div style={{ background: 'var(--violet-soft)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}><i className="fa-solid fa-rocket" style={{ color: 'var(--violet)' }}></i></div>
                    <div style={{ fontWeight: '700', marginBottom: '6px' }}>Ready to get started?</div>
                    <p style={{ fontSize: '13px', color: 'var(--muted-c)', marginBottom: '16px' }}>Join 25,000+ users who've taken control of their finances.</p>
                    <a className="btn btn-violet btn-sm" onClick={() => openModal('signup')}>Start Free Today <i className="fa-solid fa-arrow-right"></i></a>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}

      {/* Footer V2 */}
      <footer className="footer-v2">
        <div className="container">
          <div className="f2-top">
            <div className="f2-brand">
              <h3><div className="nav-logo-icon" style={{ width: '32px', height: '32px', fontSize: '16px' }}><i className="fa-solid fa-gem" style={{ color: '#fff', fontSize: '14px' }}></i></div> FinFlow</h3>
              <p style={{ color: 'rgba(255,255,255,.5)', fontSize: '14px', marginBottom: '24px', lineHeight: '1.6' }}>The go-to personal finance dashboard for young professionals and households.</p>
              <div className="f2-sub-row">
                <input className="f2-input" placeholder="Your Email Address" />
                <button className="btn btn-sm btn-white" style={{ background: '#F9DA5B', color: '#000', border: 'none' }} onClick={handleEmailSubmit}>Subscribe</button>
              </div>
            </div>
            <div className="f2-col">
              <h4>Pages</h4>
              <ul className="f2-links">
                <li><a onClick={goHome}>Home</a></li>
                <li><a onClick={() => showPage('about')}>About</a></li>
                <li><a onClick={() => showPage('features')}>Features</a></li>
                <li><a onClick={() => showPage('pricing-page')}>Pricing</a></li>
              </ul>
            </div>
            <div className="f2-col">
              <h4>Help</h4>
              <ul className="f2-links">
                <li><a>Instruction</a></li>
                <li><a>Help Center</a></li>
                <li><a>Case Studies</a></li>
                <li><a>Changelog</a></li>
              </ul>
            </div>
            <div className="f2-col">
              <h4>Legal</h4>
              <ul className="f2-links">
                <li><a>Terms of Service</a></li>
                <li><a>Privacy Policy</a></li>
                <li><a>Cookie Policy</a></li>
              </ul>
            </div>
          </div>
          <div className="f2-bottom">
            <div className="f2-social">
              <a className="f2-soc-btn"><i className="fa-brands fa-x-twitter"></i></a>
              <a className="f2-soc-btn"><i className="fa-brands fa-instagram"></i></a>
              <a className="f2-soc-btn"><i className="fa-brands fa-facebook-f"></i></a>
              <a className="f2-soc-btn"><i className="fa-brands fa-linkedin-in"></i></a>
            </div>
            <div style={{ color: 'rgba(255,255,255,.3)', fontSize: '13px' }}>© 2025 FinFlow · All Rights Reserved.</div>
          </div>
        </div>
      </footer>

      {/* Auth Modal */}
      <div className={`modal-overlay ${isModalOpen ? 'open' : ''}`} id="auth-modal" onClick={handleBackdropClick}>
        <div className="modal-box">
          <button className="modal-close" onClick={closeModal}><i className="fa-solid fa-xmark"></i></button>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '16px' }}><div style={{ width: '26px', height: '26px', borderRadius: '6px', background: 'linear-gradient(135deg,var(--violet),#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '13px' }}><i className="fa-solid fa-gem" style={{ fontSize: '12px', color: '#fff' }}></i></div><span style={{ fontWeight: 800, fontSize: '15px' }}>FinFlow</span></div>
          <div className="modal-title">{modalType === 'signup' ? 'Create your account' : 'Welcome back'}</div>
          <div className="modal-sub">{modalType === 'signup' ? 'Start tracking your finances for free' : 'Log in to your FinFlow account'}</div>
          <div className="modal-tabs">
            <div className={`modal-tab ${modalType === 'signup' ? 'active' : ''}`} onClick={() => setModalType('signup')}>Sign Up</div>
            <div className={`modal-tab ${modalType === 'login' ? 'active' : ''}`} onClick={() => setModalType('login')}>Log In</div>
          </div>
          {modalType === 'signup' ? (
            <div id="signup-form">
              <div className="form-row">
                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">First Name</label><input className="form-input" placeholder="John" /></div>
                <div className="form-group" style={{ marginBottom: 0 }}><label className="form-label">Last Name</label><input className="form-input" placeholder="Doe" /></div>
              </div>
              <div style={{ height: '14px' }}></div>
              <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="john@example.com" /></div>
              <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Create a strong password" /></div>
              <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center', height: '48px', marginBottom: '12px', fontSize: '15px' }} onClick={handleSignup}>Create Free Account <i className="fa-solid fa-arrow-right"></i></button>
              <div className="or-row"><div className="or-line"></div><span className="or-text">or</span><div className="or-line"></div></div>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', height: '46px' }} onClick={handleSignup}><i className="fa-brands fa-google" style={{ color: '#4285F4', marginRight: '8px' }}></i> Continue with Google</button>
            </div>
          ) : (
            <div id="login-form">
              <div className="form-group"><label className="form-label">Email Address</label><input className="form-input" type="email" placeholder="john@example.com" /></div>
              <div className="form-group"><label className="form-label">Password</label><input className="form-input" type="password" placeholder="Your password" /></div>
              <div style={{ textAlign: 'right', marginBottom: '14px' }}><a style={{ fontSize: '13px', color: 'var(--violet)', cursor: 'pointer', fontWeight: 600 }}>Forgot password?</a></div>
              <button className="btn btn-violet" style={{ width: '100%', justifyContent: 'center', height: '48px', marginBottom: '12px', fontSize: '15px' }} onClick={handleLogin}>Log In <i className="fa-solid fa-arrow-right"></i></button>
              <div className="or-row"><div className="or-line"></div><span className="or-text">or</span><div className="or-line"></div></div>
              <button className="btn btn-outline" style={{ width: '100%', justifyContent: 'center', height: '46px' }} onClick={handleLogin}><i className="fa-brands fa-google" style={{ color: '#4285F4', marginRight: '8px' }}></i> Continue with Google</button>
            </div>
          )}
          <div className="modal-footer-note">By signing up, you agree to our <a>Terms</a> and <a>Privacy Policy</a></div>
        </div>
      </div>

      {/* Toast */}
      <div className={`toast ${toast.show ? 'show' : ''}`} id="toast">
        <span id="toast-icon">{toast.icon}</span>
        <span id="toast-msg">{toast.msg}</span>
      </div>
    </div>
  );
};

export default Landing;
