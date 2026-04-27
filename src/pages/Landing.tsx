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
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [activeDemoTab, setActiveDemoTab] = useState('overview');

  // Navigation handlers
  const showPage = (name: string) => {
    setCurrentPage(name);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
    // Trigger fade-ups after page switch
    setTimeout(triggerFadeUps, 120);
  };

  const renderDemoContent = () => {
    if (activeDemoTab === 'overview') {
      return (
        <>
          <div className="demo-stat-row">
            <div className="demo-stat">
              <div className="demo-stat-l">TOTAL BALANCE</div>
              <div className="demo-stat-v">$14,280.40</div>
            </div>
            <div className="demo-stat">
              <div className="demo-stat-l">MONTHLY SPEND</div>
              <div className="demo-stat-v">$2,840.00</div>
            </div>
            <div className="demo-stat">
              <div className="demo-stat-l">SAVINGS RATE</div>
              <div className="demo-stat-v">32%</div>
            </div>
          </div>
          <div className="demo-chart-row">
            <div className="demo-chart-box">
              <div className="demo-chart-title">CASHFLOW HISTORY</div>
              <div className="demo-bars">
                <div className="demo-bar" style={{ height: '30%', background: 'rgba(108, 92, 231, .3)' }}></div>
                <div className="demo-bar" style={{ height: '45%', background: 'rgba(108, 92, 231, .3)' }}></div>
                <div className="demo-bar" style={{ height: '60%', background: 'rgba(108, 92, 231, .6)' }}></div>
                <div className="demo-bar" style={{ height: '55%', background: 'rgba(108, 92, 231, .3)' }}></div>
                <div className="demo-bar" style={{ height: '80%', background: 'var(--violet)' }}></div>
                <div className="demo-bar" style={{ height: '70%', background: 'rgba(108, 92, 231, .3)' }}></div>
              </div>
            </div>
            <div className="demo-chart-box">
              <div className="demo-chart-title">RECENT ACTIVITY</div>
              <div className="demo-tx-row">
                <div className="demo-tx-icon" style={{ background: 'rgba(108, 92, 231, .1)', color: 'var(--violet)' }}><i className="fa-solid fa-shopping-bag"></i></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>Apple Store</div><div style={{ fontSize: '8px', color: 'rgba(255,255,255,.3)' }}>Electronics</div></div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>-$199</div>
              </div>
              <div className="demo-tx-row">
                <div className="demo-tx-icon" style={{ background: 'rgba(16, 214, 126, .1)', color: '#10D67E' }}><i className="fa-solid fa-arrow-trend-up"></i></div>
                <div style={{ flex: 1 }}><div style={{ fontSize: '10px', fontWeight: 700, color: '#fff' }}>Salary Deposit</div><div style={{ fontSize: '8px', color: 'rgba(255,255,255,.3)' }}>Income</div></div>
                <div style={{ fontSize: '10px', fontWeight: 700, color: '#10D67E' }}>+$4,500</div>
              </div>
            </div>
          </div>
        </>
      );
    }
    if (activeDemoTab === 'budgets') {
      return (
        <div className="demo-chart-box" style={{ height: '100%' }}>
          <div className="demo-chart-title">BUDGET ALLOCATION</div>
          {[
            { name: 'Essentials', val: 65, color: 'var(--violet)' },
            { name: 'Lifestyle', val: 40, color: '#10D67E' },
            { name: 'Rent & Bills', val: 90, color: '#F59E0B' }
          ].map(b => (
            <div key={b.name} style={{ marginBottom: '14px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '4px' }}>
                <span style={{ fontSize: '10px', color: '#fff', fontWeight: 600 }}>{b.name}</span>
                <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.4)' }}>{b.val}%</span>
              </div>
              <div style={{ height: '6px', background: 'rgba(255,255,255,.05)', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ height: '100%', width: `${b.val}%`, background: b.color }}></div>
              </div>
            </div>
          ))}
        </div>
      );
    }
    if (activeDemoTab === 'goals') {
      return (
        <div className="demo-chart-box" style={{ height: '100%' }}>
          <div className="demo-chart-title">ACTIVE GOALS</div>
          <div className="gm-card" style={{ background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.1)' }}>
            <div className="gm-top">
              <div className="demo-tx-icon" style={{ background: 'rgba(108, 92, 231, .2)', color: '#A78BFA' }}><i className="fa-solid fa-plane"></i></div>
              <div><div className="gm-name" style={{ color: '#fff' }}>Vacation Fund</div><div className="gm-dead">Deadline: Dec 2024</div></div>
            </div>
            <div className="gm-amounts"><span className="gm-saved" style={{ color: '#fff' }}>$2,300</span><span className="gm-pct" style={{ color: '#A78BFA' }}>76%</span></div>
            <div className="gm-bar" style={{ background: 'rgba(255,255,255,.05)' }}><div className="gm-fill" style={{ width: '76%', background: 'var(--violet)' }}></div></div>
          </div>
          <div className="gm-card" style={{ background: 'rgba(255,255,255,.03)', borderColor: 'rgba(255,255,255,.1)' }}>
            <div className="gm-top">
              <div className="demo-tx-icon" style={{ background: 'rgba(16, 214, 126, .2)', color: '#10D67E' }}><i className="fa-solid fa-house"></i></div>
              <div><div className="gm-name" style={{ color: '#fff' }}>New Home</div><div className="gm-dead">Deadline: July 2026</div></div>
            </div>
            <div className="gm-amounts"><span className="gm-saved" style={{ color: '#fff' }}>$12,400</span><span className="gm-pct" style={{ color: '#10D67E' }}>42%</span></div>
            <div className="gm-bar" style={{ background: 'rgba(255,255,255,.05)' }}><div className="gm-fill" style={{ width: '42%', background: '#10D67E' }}></div></div>
          </div>
        </div>
      );
    }
    return (
      <div className="demo-chart-box" style={{ height: '100%' }}>
        <div className="demo-chart-title">SPENDING ANALYTICS</div>
        <div style={{ height: '160px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ width: '100px', height: '100px', borderRadius: '50%', border: '12px solid var(--violet)', borderRightColor: '#10D67E', borderBottomColor: '#F59E0B', position: 'relative' }}>
            <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%,-50%)', textAlign: 'center' }}>
              <div style={{ fontSize: '12px', fontWeight: 800, color: '#fff' }}>$3,450</div>
              <div style={{ fontSize: '8px', color: 'rgba(255,255,255,.3)' }}>Total</div>
            </div>
          </div>
        </div>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px', marginTop: '10px' }}>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: 'var(--violet)' }}></div> Essentials (45%)</div>
          <div style={{ fontSize: '9px', color: 'rgba(255,255,255,.4)', display: 'flex', alignItems: 'center', gap: '5px' }}><div style={{ width: '6px', height: '6px', borderRadius: '50%', background: '#10D67E' }}></div> Lifestyle (30%)</div>
        </div>
      </div>
    );
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
            <li><a className={currentPage === 'home' ? 'active' : ''} onClick={goHome}>Home</a></li>
            <li><a className={currentPage === 'about' ? 'active' : ''} onClick={() => showPage('about')}>About</a></li>
            <li><a className={currentPage === 'features' ? 'active' : ''} onClick={() => showPage('features')}>Features</a></li>
            <li><a className={currentPage === 'pricing-page' ? 'active' : ''} onClick={() => showPage('pricing-page')}>Pricing</a></li>
            <li><a className={currentPage === 'blog' ? 'active' : ''} onClick={() => showPage('blog')}>Blog</a></li>
            <li><a className={currentPage === 'contact' ? 'active' : ''} onClick={() => showPage('contact')}>Contact</a></li>
          </ul>
          <div className="nav-actions">
            <a className="nav-login" onClick={() => openModal('login')}>Log in</a>
            <a className="btn btn-dark btn-sm" onClick={() => openModal('signup')}>Get Started <i className="fa-solid fa-chevron-right" style={{ fontSize: '10px' }}></i></a>
          </div>
          <button className={`hamburger ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}>
            <span></span>
            <span></span>
            <span></span>
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${isMobileMenuOpen ? 'open' : ''}`} onClick={() => setIsMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${isMobileMenuOpen ? 'open' : ''}`}>
        <div className="mobile-menu-header">
          <a className="nav-logo" onClick={goHome} style={{ cursor: 'pointer', margin: 0 }}>
            <div className="nav-logo-icon"><i className="fa-solid fa-gem" style={{ color: '#fff' }}></i></div> FinFlow
          </a>
          <button className="mobile-menu-close" onClick={() => setIsMobileMenuOpen(false)}><i className="fa-solid fa-xmark"></i></button>
        </div>
        <div className="mobile-nav-links">
          <a className={currentPage === 'home' ? 'active' : ''} onClick={goHome}><i className="fa-solid fa-home"></i> Home</a>
          <a className={currentPage === 'about' ? 'active' : ''} onClick={() => showPage('about')}><i className="fa-solid fa-circle-info"></i> About</a>
          <a className={currentPage === 'features' ? 'active' : ''} onClick={() => showPage('features')}><i className="fa-solid fa-star"></i> Features</a>
          <a className={currentPage === 'pricing-page' ? 'active' : ''} onClick={() => showPage('pricing-page')}><i className="fa-solid fa-tag"></i> Pricing</a>
          <a className={currentPage === 'blog' ? 'active' : ''} onClick={() => showPage('blog')}><i className="fa-solid fa-newspaper"></i> Blog</a>
          <a className={currentPage === 'contact' ? 'active' : ''} onClick={() => showPage('contact')}><i className="fa-solid fa-envelope"></i> Contact</a>
        </div>
        <div className="mobile-menu-actions">
          <a className="btn btn-outline" style={{ justifyContent: 'center' }} onClick={() => { setIsMobileMenuOpen(false); openModal('login'); }}>Log in</a>
          <a className="btn btn-primary" style={{ justifyContent: 'center' }} onClick={() => { setIsMobileMenuOpen(false); openModal('signup'); }}>Get Started</a>
        </div>
      </div>

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

          {/* STATS TICKER */}
          <div className="ticker">
            <div className="ticker-inner">
              <div className="ticker-item"><i className="fa-solid fa-chart-line"></i> 25K+ Active Users</div>
              <div className="ticker-item"><i className="fa-solid fa-gem"></i> $2.4M Saved</div>
              <div className="ticker-item"><i className="fa-solid fa-earth-africa"></i> 140+ Countries</div>
              <div className="ticker-item"><i className="fa-solid fa-shield-halved"></i> Bank-level Security</div>
              <div className="ticker-item"><i className="fa-solid fa-star"></i> 4.9/5 Rating</div>
              <div className="ticker-item"><i className="fa-solid fa-clock"></i> 24/7 Support</div>
              <div className="ticker-item"><i className="fa-solid fa-chart-line"></i> 25K+ Active Users</div>
              <div className="ticker-item"><i className="fa-solid fa-gem"></i> $2.4M Saved</div>
              <div className="ticker-item"><i className="fa-solid fa-earth-africa"></i> 140+ Countries</div>
              <div className="ticker-item"><i className="fa-solid fa-shield-halved"></i> Bank-level Security</div>
              <div className="ticker-item"><i className="fa-solid fa-star"></i> 4.9/5 Rating</div>
              <div className="ticker-item"><i className="fa-solid fa-clock"></i> 24/7 Support</div>
            </div>
          </div>

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

          {/* INTERACTIVE DASHBOARD DEMO */}
          <section className="dash-demo">
            <div className="demo-container">
              <div className="tc" style={{ marginBottom: '40px' }}>
                <div className="section-eyebrow" style={{ background: 'rgba(255,255,255,.08)', color: '#A78BFA' }}><i className="fa-solid fa-desktop" style={{ marginRight: '6px' }}></i> Live Preview</div>
                <h2 className="section-title" style={{ color: '#fff' }}>See the dashboard <span className="italic">in action</span></h2>
                <p className="section-desc" style={{ color: '#4A6A8A', maxWidth: '480px', margin: '0 auto' }}>Every page of the FinFlow dashboard is designed for clarity and speed — here's a preview.</p>
              </div>
              <div className="demo-window fade-up">
                <div className="demo-topbar">
                  <div className="demo-dot" style={{ background: '#FF5F57' }}></div>
                  <div className="demo-dot" style={{ background: '#FFBD2E' }}></div>
                  <div className="demo-dot" style={{ background: '#28C840' }}></div>
                  <div className="demo-tab-row" style={{ margin: '0 0 0 20px' }}>
                    <div className={`demo-tab ${activeDemoTab === 'overview' ? 'active-tab' : ''}`} onClick={() => setActiveDemoTab('overview')}>Overview</div>
                    <div className={`demo-tab ${activeDemoTab === 'budgets' ? 'active-tab' : ''}`} onClick={() => setActiveDemoTab('budgets')}>Budgets</div>
                    <div className={`demo-tab ${activeDemoTab === 'goals' ? 'active-tab' : ''}`} onClick={() => setActiveDemoTab('goals')}>Goals</div>
                    <div className={`demo-tab ${activeDemoTab === 'analytics' ? 'active-tab' : ''}`} onClick={() => setActiveDemoTab('analytics')}>Analytics</div>
                  </div>
                  <div className="demo-title">finflow.app/dashboard</div>
                </div>
                <div className="demo-body">
                  <div className="demo-sidebar">
                    <div className={`demo-nav-item ${activeDemoTab === 'overview' ? 'active-nav' : ''}`}><i className="fa-solid fa-house"></i> Overview</div>
                    <div className={`demo-nav-item ${activeDemoTab === 'budgets' ? 'active-nav' : ''}`}><i className="fa-solid fa-wallet"></i> Budgets</div>
                    <div className={`demo-nav-item ${activeDemoTab === 'goals' ? 'active-nav' : ''}`}><i className="fa-solid fa-bullseye"></i> Goals</div>
                    <div className={`demo-nav-item ${activeDemoTab === 'analytics' ? 'active-nav' : ''}`}><i className="fa-solid fa-chart-line"></i> Analytics</div>
                    <div style={{ height: '1px', background: 'rgba(255,255,255,.05)', margin: '12px 0' }}></div>
                    <div className="demo-nav-item"><i className="fa-solid fa-credit-card"></i> Cards</div>
                    <div className="demo-nav-item"><i className="fa-solid fa-gear"></i> Settings</div>
                  </div>
                  <div className="demo-content">
                    {renderDemoContent()}
                  </div>
                </div>
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

          {/* GOAL TRACKER MOCKUP */}
          <section className="section" style={{ background: 'var(--surface)' }}>
            <div className="container">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '64px', alignItems: 'center' }}>
                <div className="fade-up">
                  <div className="section-eyebrow"><i className="fa-solid fa-bullseye" style={{ marginRight: '6px' }}></i> Goal Tracking</div>
                  <h2 className="section-title">Reach your goals <span className="italic">faster</span></h2>
                  <p className="section-desc">Set specific financial targets and watch your progress in real-time. Whether it's a new home, a dream vacation, or an emergency fund, FinFlow keeps you motivated.</p>
                  <ul style={{ listStyle: 'none', marginTop: '24px' }}>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '15px', color: 'var(--mid)', fontWeight: 500 }}><i className="fa-solid fa-circle-check" style={{ color: 'var(--green)' }}></i> Custom milestones</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '12px', fontSize: '15px', color: 'var(--mid)', fontWeight: 500 }}><i className="fa-solid fa-circle-check" style={{ color: 'var(--green)' }}></i> Automatic progress calculation</li>
                    <li style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '15px', color: 'var(--mid)', fontWeight: 500 }}><i className="fa-solid fa-circle-check" style={{ color: 'var(--green)' }}></i> Deadline alerts</li>
                  </ul>
                </div>
                <div className="goal-mockup fade-up">
                  <div className="gm-header">
                    <div className="gm-title">Financial Goals</div>
                    <div className="gm-badge">3 Active</div>
                  </div>
                  <div className="gm-card">
                    <div className="gm-top">
                      <div className="demo-tx-icon" style={{ background: 'rgba(108, 92, 231, .1)', color: 'var(--violet)' }}><i className="fa-solid fa-plane"></i></div>
                      <div><div className="gm-name">Vacation Fund</div><div className="gm-dead">Deadline: Dec 2024</div></div>
                    </div>
                    <div className="gm-amounts"><span className="gm-saved">$2,300</span><span className="gm-pct">76%</span></div>
                    <div className="gm-bar"><div className="gm-fill" style={{ width: '76%', background: 'var(--violet)' }}></div></div>
                  </div>
                  <div className="gm-card">
                    <div className="gm-top">
                      <div className="demo-tx-icon" style={{ background: 'rgba(16, 214, 126, .1)', color: '#10D67E' }}><i className="fa-solid fa-house"></i></div>
                      <div><div className="gm-name">New Home</div><div className="gm-dead">Deadline: July 2026</div></div>
                    </div>
                    <div className="gm-amounts"><span className="gm-saved">$12,400</span><span className="gm-pct" style={{ color: '#10D67E' }}>42%</span></div>
                    <div className="gm-bar"><div className="gm-fill" style={{ width: '42%', background: '#10D67E' }}></div></div>
                  </div>
                  <div className="gm-card" style={{ marginBottom: 0 }}>
                    <div className="gm-top">
                      <div className="demo-tx-icon" style={{ background: 'rgba(245, 158, 11, .1)', color: '#F59E0B' }}><i className="fa-solid fa-car"></i></div>
                      <div><div className="gm-name">New Car</div><div className="gm-dead">Deadline: Mar 2025</div></div>
                    </div>
                    <div className="gm-amounts"><span className="gm-saved">$1,450</span><span className="gm-pct" style={{ color: '#F59E0B' }}>29%</span></div>
                    <div className="gm-bar"><div className="gm-fill" style={{ width: '29%', background: '#F59E0B' }}></div></div>
                  </div>
                </div>
              </div>

              <div className="integrations-list fade-up">
                {[
                  { name: 'Slack', cat: 'Notifications', icon: <i className="fa-brands fa-slack" style={{ color: '#4A154B' }}></i> },
                  { name: 'Google Drive', cat: 'Storage', icon: <i className="fa-brands fa-google-drive" style={{ color: '#34A853' }}></i> },
                  { name: 'Stripe', cat: 'Payments', icon: <i className="fa-brands fa-stripe" style={{ color: '#635BFF' }}></i> },
                  { name: 'Notion', cat: 'Workspace', icon: <i className="fa-brands fa-notion" style={{ color: '#000' }}></i> },
                  { name: 'Spotify', cat: 'Entertainment', icon: <i className="fa-brands fa-spotify" style={{ color: '#1DB954' }}></i> },
                  { name: 'Amazon', cat: 'Shopping', icon: <i className="fa-brands fa-amazon" style={{ color: '#FF9900' }}></i> },
                ].map(int => (
                  <div className="int-card" key={int.name}>
                    <div className="int-icon" style={{ background: 'var(--surface)' }}>{int.icon}</div>
                    <div><div className="int-name">{int.name}</div><div className="int-cat">{int.cat}</div></div>
                  </div>
                ))}
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

          {/* Comparison Table */}
          <section className="section">
            <div className="container tc">
              <h2 className="section-title">How we compare to <span className="italic">competitors</span></h2>
              <p className="section-desc" style={{ maxWidth: '480px', margin: '0 auto' }}>FinFlow offers a more comprehensive and intuitive financial experience than traditional tools.</p>
              
              <div className="fade-up" style={{ overflowX: 'auto' }}>
                <table className="comp-table">
                  <thead>
                    <tr>
                      <th>Feature</th>
                      <th className="comp-head-free">Traditional Apps</th>
                      <th className="comp-head-pro">FinFlow Pro</th>
                      <th className="comp-head-biz">Spreadsheets</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr><td>Real-time Sync</td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td></tr>
                    <tr><td>Smart Categorization</td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td></tr>
                    <tr><td>Multi-user Access</td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td></tr>
                    <tr><td>Budget Alerts</td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td></tr>
                    <tr><td>Custom Reports</td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td></tr>
                    <tr><td>Bank-level Security</td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-yes"><i className="fa-solid fa-check"></i></td><td className="comp-no"><i className="fa-solid fa-xmark"></i></td></tr>
                  </tbody>
                </table>
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
                  <div className="astat" style={{ marginBottom: '20px' }}>
                    <div className="astat-val">98%</div>
                    <div className="astat-lbl">Customer satisfaction rate</div>
                  </div>
                  <div className="astat" style={{ marginBottom: '20px' }}>
                    <div className="astat-val">24/7</div>
                    <div className="astat-lbl">Global priority support</div>
                  </div>
                  {[5, 6, 7].map(idx => {
                    const qs = [
                      "Is my financial data secure?",
                      "What is your design process?",
                      "Who is FinFlow built for?"
                    ];
                    const as = [
                      "FinFlow uses AES-256 bank-level encryption. We never sell your data. Your privacy and security are our top priorities, with regular third-party security audits.",
                      "FinFlow is designed mobile-first with accessibility as a priority. We follow WCAG 2.1 AA standards and test on real devices across emerging market connectivity conditions.",
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
                    <div className="btag">Finance Tips</div>
                    <h3 style={{ fontSize: '24px', fontWeight: '800', marginBottom: '14px', lineHeight: '1.2' }}>Working on building your savings: 5 steps that actually work</h3>
                    <p style={{ color: 'var(--muted-c)', fontSize: '14px', marginBottom: '20px' }}>Learn how to set up a robust savings system that grows with your income and protects your future.</p>
                    <div className="article-meta">Favour Ndi · 5 min read</div>
                  </div>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <div className="article-card" onClick={() => showPage('blog')} style={{ display: 'flex', gap: '20px', border: 'none', background: 'transparent' }}>
                    <div style={{ width: '140px', height: '110px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}><img src="https://images.unsplash.com/photo-1579621970563-ebec7560ff3e?auto=format&fit=crop&q=80&w=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    <div style={{ padding: '10px 0' }}>
                      <div className="btag">Budgeting</div>
                      <div className="article-title" style={{ fontSize: '16px', fontWeight: 700 }}>Get the Most Out of FinFlow using the Money Flow strategy</div>
                      <div className="article-meta">Carlos Mrueeze · 4 min read</div>
                    </div>
                  </div>
                  <div className="article-card" onClick={() => showPage('blog')} style={{ display: 'flex', gap: '20px', border: 'none', background: 'transparent' }}>
                    <div style={{ width: '140px', height: '110px', borderRadius: '12px', overflow: 'hidden', flexShrink: 0 }}><img src="https://images.unsplash.com/photo-1553729459-efe14ef6055d?auto=format&fit=crop&q=80&w=400" style={{ width: '100%', height: '100%', objectFit: 'cover' }} /></div>
                    <div style={{ padding: '10px 0' }}>
                      <div className="btag">Investing</div>
                      <div className="article-title" style={{ fontSize: '16px', fontWeight: 700 }}>Financial Fitness: How to Pay Down Debt and Build Wealth</div>
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
              <img src="/cta_woman.png" alt="Professional Woman" />
            </div>
          </section>
        </div>
      )}

      {/* FEATURES PAGE */}
      {currentPage === 'features' && (
        <div className="page active" id="page-features">
          <section className="inner-hero">
            <div className="container tc">
              <div className="eyebrow"><i className="fa-solid fa-bolt"></i> Full Feature List</div>
              <h1>Everything You Need to Manage<br /><span style={{ color: 'var(--violet)' }}>Your Money Brilliantly</span></h1>
              <p>Manage expenses, save efficiently, and build wealth — all in one beautiful application.</p>
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'center', marginTop: '28px' }}>
                <a className="btn btn-violet btn-lg" onClick={() => openModal('signup')}>Start Free Today <i className="fa-solid fa-arrow-right"></i></a>
                <a className="btn btn-outline btn-lg" onClick={() => showPage('pricing-page')}>View Pricing</a>
              </div>
            </div>
          </section>

          <section className="section">
            <div className="container">
              {/* Split 1 */}
              <div className="split-sec mb-48" style={{ gap: '72px', marginBottom: '80px' }}>
                <div className="fade-up">
                  <div className="eyebrow eyebrow-blue"><i className="fa-solid fa-chart-pie"></i> Tracking</div>
                  <h2 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '14px' }}>Complete expense tracking <span style={{ color: 'var(--blue)' }}>in seconds</span></h2>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '20px', lineHeight: '1.7' }}>Add transactions on the go or in bulk. FinFlow auto-categorizes everything and gives you instant spending breakdowns by category, merchant, or time period.</p>
                  <ul className="check-list mb-24">
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>20+ default categories with custom colors & icons</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Split transactions across multiple categories</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Attach receipts and notes to any transaction</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Bulk CSV import from your bank statements</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Recurring transaction auto-scheduling</li>
                  </ul>
                  <a className="btn btn-primary" onClick={() => openModal('signup')}>Try Free <i className="fa-solid fa-arrow-right"></i></a>
                </div>
                <div className="fade-up">
                  <div className="mockup-card">
                    <div className="mc-header">
                      <div className="mc-dot" style={{ background: '#FF5F57' }}></div>
                      <div className="mc-dot" style={{ background: '#FEBC2E' }}></div>
                      <div className="mc-dot" style={{ background: '#28C840' }}></div>
                      <span style={{ fontSize: '10px', color: 'rgba(255,255,255,.3)', marginLeft: 'auto' }}>Transactions</span>
                    </div>
                    <div style={{ display: 'flex', gap: '6px', marginBottom: '10px' }}>
                      <div style={{ padding: '4px 10px', background: 'rgba(108,92,231,.3)', borderRadius: '20px', fontSize: '9px', fontWeight: '700', color: '#A78BFA' }}>All</div>
                      <div style={{ padding: '4px 10px', background: 'rgba(255,255,255,.05)', borderRadius: '20px', fontSize: '9px', fontWeight: '600', color: 'rgba(255,255,255,.3)' }}>Income</div>
                      <div style={{ padding: '4px 10px', background: 'rgba(255,255,255,.05)', borderRadius: '20px', fontSize: '9px', fontWeight: '600', color: 'rgba(255,255,255,.3)' }}>Expense</div>
                    </div>
                    <div className="mc-tx"><div className="mc-tx-icon" style={{ background: 'rgba(74,222,128,.2)' }}>💼</div><div><div className="mc-tx-name">Salary — Employer Ltd</div><div className="mc-tx-cat">Jul 1 · Recurring</div></div><div className="mc-tx-amt" style={{ color: '#4ADE80' }}>+$3,500</div></div>
                    <div className="mc-tx"><div className="mc-tx-icon" style={{ background: 'rgba(248,113,113,.2)' }}>🛍</div><div><div className="mc-tx-name">Shoprite</div><div className="mc-tx-cat">Jul 8 · Food & Dining</div></div><div className="mc-tx-amt" style={{ color: '#F87171' }}>-$128</div></div>
                    <div className="mc-tx"><div className="mc-tx-icon" style={{ background: 'rgba(251,191,36,.2)' }}>🎬</div><div><div className="mc-tx-name">Netflix</div><div className="mc-tx-cat">Jul 1 · Entertainment</div></div><div className="mc-tx-amt" style={{ color: '#F87171' }}>-$15.99</div></div>
                    <div className="mc-tx"><div className="mc-tx-icon" style={{ background: 'rgba(108,92,231,.3)' }}>💻</div><div><div className="mc-tx-name">Freelance Project</div><div className="mc-tx-cat">Jul 12 · Freelance</div></div><div className="mc-tx-amt" style={{ color: '#4ADE80' }}>+$850</div></div>
                    <div className="mc-tx"><div className="mc-tx-icon" style={{ background: 'rgba(6,182,212,.2)' }}>🚗</div><div><div className="mc-tx-name">Uber</div><div className="mc-tx-cat">Jul 5 · Transport</div></div><div className="mc-tx-amt" style={{ color: '#F87171' }}>-$65</div></div>
                  </div>
                </div>
              </div>

              {/* Full features grid */}
              <div className="tc mb-48">
                <div className="eyebrow"><i className="fa-solid fa-list-check"></i> All Features</div>
                <h2 className="sec-title">Everything included in <span className="italic">FinFlow</span></h2>
              </div>
              <div className="fp-grid fade-up">
                <div className="fp-card"><div className="fp-icon" style={{ background: '#E3F0FF' }}>📊</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Expense Tracking</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Track daily, weekly, monthly expenses. Smart auto-categorization saves time and gives instant spending clarity with drill-down to individual transactions.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#E8F5E9' }}>💰</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Budget Planning</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Set monthly budgets per category with color-coded progress bars. Alerts at 80% and 100%. Roll-over rules. Zero-based budgeting mode.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#EDE9FF' }}>🏦</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Multi-Account Support</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Manage checking, savings, credit, cash, and mobile money accounts. Unified net worth dashboard with balance trend charts.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#FFF8E1' }}>🎯</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Savings Goals</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Create goals with target amounts, deadlines, and progress tracking. Get projected completion dates and required monthly contribution recommendations.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#E0F7FA' }}>📈</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Rich Analytics</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Monthly charts, category breakdowns, merchant analysis, net worth trends, and income vs expense comparisons over 6 or 12 months.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#FCE4EC' }}>📄</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Monthly PDF Reports</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Auto-generated branded PDF reports every month-end with spending highlights, savings rate, top categories, and biggest transactions.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#E8EAF6' }}>🔄</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>Recurring Tracker</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Track subscriptions automatically, get reminded before charges, see total annual subscription cost, and detect forgotten subscriptions.</p></div></div>
                <div className="fp-card"><div className="fp-icon" style={{ background: '#E0F2F1' }}>📤</div><div><h3 style={{ fontSize: '17px', fontWeight: '700', marginBottom: '8px' }}>CSV Export</h3><p style={{ fontSize: '13.5px', color: 'var(--muted)', lineHeight: '1.65' }}>Export any filtered transaction set to CSV. Choose date range, category, account, and type filters before exporting. Works great with Excel or Google Sheets.</p></div></div>
              </div>
            </div>
          </section>

          <section className="section" style={{ background: 'var(--surface)' }}>
            <div className="container tc">
              <h2 className="sec-title">Why Thousands Trust <span className="italic">FinFlow</span></h2>
              <div className="why-grid fade-up">
                <div className="why-card"><div className="why-icon" style={{ background: '#E3F0FF' }}>⚡</div><h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Save Time on Manual Work</h3><p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65' }}>Smart categorization and auto-recurring detection save hours every month. FinFlow does the work so you don't have to.</p></div>
                <div className="why-card"><div className="why-icon" style={{ background: '#EDE9FF' }}>🔒</div><h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Bank-Level Security</h3><p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65' }}>All data is encrypted at rest and in transit. Row-level security means your data is 100% private — no sharing, no ads, ever.</p></div>
                <div className="why-card"><div className="why-icon" style={{ background: '#E8F5E9' }}>🌍</div><h3 style={{ fontSize: '18px', fontWeight: '700', marginBottom: '10px' }}>Works Worldwide</h3><p style={{ fontSize: '14px', color: 'var(--muted)', lineHeight: '1.65' }}>No US-only bank sync. FinFlow works for anyone, anywhere — Nigeria, Kenya, UK, India, or beyond. Multi-currency support in V2.</p></div>
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
              <div className="eyebrow"><i className="fa-regular fa-gem"></i> Pricing</div>
              <h1>Simple, transparent<br /><span style={{ color: 'var(--violet)' }}>pricing for everyone</span></h1>
              <p>Start free. Upgrade when you need more. No surprises, no hidden fees.</p>
            </div>
          </section>
          <section className="section">
            <div className="container tc">
              <div className="pricing-grid" style={{ maxWidth: '980px', margin: '0 auto 40px' }}>
                <div className="pc fade-up">
                  <div className="pc-plan"><div className="pc-dot" style={{ background: '#9BACC8' }}></div>Basic</div>
                  <div className="pc-price">$0<span>/mo</span></div>
                  <div className="pc-desc">Perfect for getting started</div>
                  <a className="btn btn-dark" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Get Started Free</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>3 accounts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>100 tx/month</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>5 budgets</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>2 goals</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>3-month history</li>
                    <li><div className="pc-x"><i className="fa-solid fa-xmark"></i></div><span style={{ color: 'var(--muted)' }}>PDF reports</span></li>
                    <li><div className="pc-x"><i className="fa-solid fa-xmark"></i></div><span style={{ color: 'var(--muted)' }}>Email alerts</span></li>
                    <li><div className="pc-x"><i className="fa-solid fa-xmark"></i></div><span style={{ color: 'var(--muted)' }}>Recurring tx</span></li>
                  </ul>
                </div>
                <div className="pc featured fade-up">
                  <div className="pc-popular">⚡ Most Popular</div>
                  <div className="pc-plan" style={{ marginTop: '8px' }}><div className="pc-dot" style={{ background: 'var(--violet)' }}></div>Pro</div>
                  <div className="pc-price">$5<span>/mo</span></div>
                  <div className="pc-desc">For individuals & households · $45/yr</div>
                  <a className="btn btn-violet" style={{ width: '100%', justifyContent: 'center' }} onClick={() => openModal('signup')}>Start Pro Free <i className="fa-solid fa-arrow-right"></i></a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Unlimited accounts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Unlimited transactions</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Unlimited budgets</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Unlimited goals</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Lifetime history</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>PDF & CSV reports</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Email alerts</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Priority support</li>
                  </ul>
                </div>
                <div className="pc fade-up">
                  <div className="pc-plan"><div className="pc-dot" style={{ background: 'var(--amber)' }}></div>Business</div>
                  <div className="pc-price">$19<span>/mo</span></div>
                  <div className="pc-desc">For teams & growing businesses</div>
                  <a className="btn btn-outline" style={{ width: '100%', justifyContent: 'center' }} onClick={() => showPage('contact')}>Contact Sales</a>
                  <div className="pc-divider"></div>
                  <ul className="pc-feats">
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Everything in Pro</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>10 team members</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Shared dashboards</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Custom reports</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Dedicated manager</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>API access</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Premium SLA</li>
                    <li><div className="pc-check"><i className="fa-solid fa-check"></i></div>Onboarding call</li>
                  </ul>
                </div>
              </div>
              
              <div style={{ overflowX: 'auto', marginTop: '60px' }}>
                <h2 className="sec-title" style={{ fontSize: '32px', marginBottom: '8px' }}>Compare all plans</h2>
                <table className="comp-table">
                  <thead><tr><th style={{ textAlign: 'left' }}>Feature</th><th className="comp-head-free">Basic</th><th className="comp-head-pro">Pro ⚡</th><th className="comp-head-biz">Business</th></tr></thead>
                  <tbody>
                    <tr><td>Accounts</td><td style={{ color: 'var(--muted)' }}>3</td><td style={{ color: 'var(--violet)', fontWeight: '700' }}>Unlimited</td><td>Unlimited</td></tr>
                    <tr><td>Transactions/month</td><td style={{ color: 'var(--muted)' }}>100</td><td style={{ color: 'var(--violet)', fontWeight: '700' }}>Unlimited</td><td>Unlimited</td></tr>
                    <tr><td>Budget categories</td><td style={{ color: 'var(--muted)' }}>5</td><td style={{ color: 'var(--violet)', fontWeight: '700' }}>Unlimited</td><td>Unlimited</td></tr>
                    <tr><td>Savings goals</td><td style={{ color: 'var(--muted)' }}>2</td><td style={{ color: 'var(--violet)', fontWeight: '700' }}>Unlimited</td><td>Unlimited</td></tr>
                    <tr><td>Analytics history</td><td style={{ color: 'var(--muted)' }}>3 months</td><td style={{ color: 'var(--violet)', fontWeight: '700' }}>Lifetime</td><td>Lifetime</td></tr>
                    <tr><td>PDF reports</td><td className="comp-no">✗</td><td className="comp-yes" style={{ color: 'var(--violet)' }}>✓</td><td className="comp-yes">✓</td></tr>
                    <tr><td>CSV export</td><td className="comp-no">✗</td><td className="comp-yes" style={{ color: 'var(--violet)' }}>✓</td><td className="comp-yes">✓</td></tr>
                    <tr><td>Email alerts</td><td className="comp-no">✗</td><td className="comp-yes" style={{ color: 'var(--violet)' }}>✓</td><td className="comp-yes">✓</td></tr>
                    <tr><td>Team members</td><td className="comp-no">✗</td><td className="comp-no">✗</td><td style={{ fontWeight: '700' }}>Up to 10</td></tr>
                    <tr><td>API access</td><td className="comp-no">✗</td><td className="comp-no">✗</td><td className="comp-yes">✓</td></tr>
                  </tbody>
                </table>
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
              <div className="eyebrow">👋 Our Story</div>
              <h1>Built by people who wanted<br /><span style={{ color: 'var(--violet)' }}>better money tools</span></h1>
              <p>FinFlow started as a weekend project in Lagos. It grew into a mission to give financial clarity to millions.</p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="about-stats fade-up">
                <div className="astat"><div className="astat-val">25K+</div><div className="astat-lbl">Active users worldwide</div></div>
                <div className="astat"><div className="astat-val">2021</div><div className="astat-lbl">Year founded in Lagos</div></div>
                <div className="astat"><div className="astat-val">140+</div><div className="astat-lbl">Countries served</div></div>
                <div className="astat"><div className="astat-val">$2.4M</div><div className="astat-lbl">Saved by our users</div></div>
              </div>

              <div className="split-sec" style={{ marginBottom: '80px' }}>
                <div className="fade-up">
                  <div className="eyebrow">🌍 Mission</div>
                  <h2 style={{ fontSize: '36px', fontWeight: '800', letterSpacing: '-1.5px', marginBottom: '14px' }}>Give every user <span style={{ color: 'var(--violet)' }}>clarity</span> over their finances</h2>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '16px' }}>Most people don't actively track their spending. Those who try use spreadsheets that break, banking apps that lack analysis, or tools like YNAB that are too complex and US-centric.</p>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', lineHeight: '1.7', marginBottom: '24px' }}>FinFlow was built to fill that gap — zero-based budgeting discipline meets the ease of modern apps, designed for the global user, not just Silicon Valley.</p>
                  <ul className="check-list">
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>No bank sync required — works everywhere</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Designed for young professionals in emerging markets</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Privacy-first — your data is never sold or shared</li>
                    <li><span className="check-icon"><i className="fa-solid fa-check"></i></span>Indie SaaS — built to be profitable, not VC-driven</li>
                  </ul>
                </div>
                <div className="fade-up" style={{ background: 'linear-gradient(135deg,#6C5CE7,#4834C4)', borderRadius: '20px', padding: '40px' }}>
                  <div style={{ textAlign: 'center', marginBottom: '24px' }}><div style={{ fontSize: '40px', marginBottom: '10px' }}>💡</div><div style={{ fontSize: '28px', fontWeight: '900', color: '#fff', marginBottom: '10px' }}>Vision</div><p style={{ color: 'rgba(255,255,255,.7)', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic' }}>"Become the go-to personal finance dashboard for young professionals and households in emerging markets and beyond."</p></div>
                  <div style={{ height: '1px', background: 'rgba(255,255,255,.15)', margin: '20px 0' }}></div>
                  <div style={{ textAlign: 'center' }}><div style={{ fontSize: '28px', fontWeight: '900', color: '#A78BFA', marginBottom: '10px' }}>Mission</div><p style={{ color: 'rgba(255,255,255,.7)', fontSize: '15px', lineHeight: '1.6', fontStyle: 'italic' }}>"Give every user clarity over where their money goes and confidence in where it is going."</p></div>
                </div>
              </div>
              <div className="team-grid fade-up">
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#1565C0,#42A5F5)' }}>A</div><div className="team-name">Ade Okonkwo</div><div className="team-role">CEO & Co-Founder</div><div className="team-links"><div className="team-link"><i className="fa-brands fa-linkedin-in"></i></div><div className="team-link"><i className="fa-brands fa-x-twitter"></i></div></div></div>
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#6C5CE7,#A78BFA)' }}>K</div><div className="team-name">Kemi Adeyemi</div><div className="team-role">CTO & Co-Founder</div><div className="team-links"><div className="team-link"><i className="fa-brands fa-github"></i></div><div className="team-link"><i className="fa-brands fa-linkedin-in"></i></div></div></div>
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#E65100,#FF7043)' }}>T</div><div className="team-name">Tunde Balogun</div><div className="team-role">Head of Design</div><div className="team-links"><div className="team-link"><i className="fa-brands fa-dribbble"></i></div><div className="team-link"><i className="fa-brands fa-linkedin-in"></i></div></div></div>
                <div className="team-card"><div className="team-avatar" style={{ background: 'linear-gradient(135deg,#2E7D32,#4CAF50)' }}>S</div><div className="team-name">Sade Musa</div><div className="team-role">Head of Growth</div><div className="team-links"><div className="team-link"><i className="fa-brands fa-linkedin-in"></i></div><div className="team-link"><i className="fa-brands fa-x-twitter"></i></div></div></div>
              </div>

              {/* Values */}
              <div className="tc" style={{ marginTop: '80px' }}>
                <div className="eyebrow">💎 Core Values</div>
                <h2 className="sec-title">What drives us every day</h2>
              </div>
              <div className="values-grid fade-up">
                <div className="val-card"><div className="val-icon">🎯</div><h3>User First, Always</h3><p>We build for the user, not for VCs. Every feature is designed to solve a real problem for our community.</p></div>
                <div className="val-card"><div className="val-icon">🔒</div><h3>Privacy by Default</h3><p>Your financial data is yours. We encrypt it, we protect it, and we never sell it to advertisers.</p></div>
                <div className="val-card"><div className="val-icon">⚡</div><h3>Relentless Simplicity</h3><p>Finance is complicated enough. Our job is to strip away the noise and make managing money effortlessly clear.</p></div>
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
              <div className="eyebrow"><i className="fa-solid fa-pen-nib"></i> Our Blog</div>
              <h1>Financial tips to help<br /><span style={{ color: 'var(--violet)' }}>you grow</span></h1>
              <p>Expert guides, real stories, and actionable advice to master your money.</p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="blog-hero-card fade-up" onClick={() => showToast('Opening article...', '📖')}>
                <div className="blog-hero-img" style={{ background: 'linear-gradient(135deg,#6C5CE7,#4834C4)' }}><i className="fa-solid fa-chart-column" style={{ color: '#fff' }}></i></div>
                <div className="blog-hero-body">
                  <div className="btag">Featured · Finance Tips</div>
                  <h2 style={{ fontSize: '32px', fontWeight: '800', letterSpacing: '-1px', marginBottom: '14px', lineHeight: '1.2' }}>The Zero-Based Budgeting Method: Why Every Dollar Needs a Job</h2>
                  <p style={{ fontSize: '15px', color: 'var(--muted)', marginBottom: '24px', lineHeight: '1.7' }}>Zero-based budgeting is the single most powerful tool for people who want to take control of their spending. Here's a step-by-step guide to implementing it with FinFlow.</p>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '24px' }}>
                    <div style={{ width: '36px', height: '36px', borderRadius: '50%', background: 'linear-gradient(135deg,#6C5CE7,#A78BFA)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: '700', fontSize: '14px' }}>A</div>
                    <div><div style={{ fontSize: '13px', fontWeight: '700' }}>Ade Okonkwo</div><div style={{ fontSize: '12px', color: 'var(--muted)' }}>July 10, 2025 · 8 min read</div></div>
                  </div>
                  <a className="btn btn-dark">Read Article <i className="fa-solid fa-arrow-right"></i></a>
                </div>
              </div>
              
              <div className="articles-grid fade-up">
                <div className="article-card" onClick={() => showToast('Opening article...', '📖')}>
                  <div className="article-img" style={{ background: 'linear-gradient(135deg,#1565C0,#42A5F5)' }}><i className="fa-solid fa-lightbulb" style={{ color: '#fff' }}></i></div>
                  <div className="article-body">
                    <div className="btag">Budgeting</div>
                    <div className="article-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>Working on building your savings: 5 steps that actually work</div>
                    <div className="article-meta" style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#666' }}>F</div>
                      Favour Ndi · Sep 27, 2025 · 5 min read
                    </div>
                  </div>
                </div>
                <div className="article-card" onClick={() => showToast('Opening article...', '📖')}>
                  <div className="article-img" style={{ background: 'linear-gradient(135deg,#2E7D32,#4CAF50)' }}><i className="fa-solid fa-building-columns" style={{ color: '#fff' }}></i></div>
                  <div className="article-body">
                    <div className="btag">Investing</div>
                    <div className="article-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>Get the Most Out of FinFlow using the Money Flow strategy</div>
                    <div className="article-meta" style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#666' }}>C</div>
                      Carlos Mrueeze · Jul 1, 2025 · 4 min read
                    </div>
                  </div>
                </div>
                <div className="article-card" onClick={() => showToast('Opening article...', '📖')}>
                  <div className="article-img" style={{ background: 'linear-gradient(135deg,#E65100,#FF7043)' }}><i className="fa-solid fa-bullseye" style={{ color: '#fff' }}></i></div>
                  <div className="article-body">
                    <div className="btag">Debt</div>
                    <div className="article-title" style={{ fontSize: '18px', fontWeight: '700', marginBottom: '12px', lineHeight: '1.4' }}>Financial Fitness: How to Pay Down Debt and Build Wealth</div>
                    <div className="article-meta" style={{ fontSize: '12px', color: 'var(--muted)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <div style={{ width: '20px', height: '20px', borderRadius: '50%', background: '#eee', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '9px', fontWeight: '700', color: '#666' }}>S</div>
                      Shayan Kuroda · Jun 15 · 7 min read
                    </div>
                  </div>
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
              <div className="eyebrow"><i className="fa-regular fa-paper-plane"></i> Get In Touch</div>
              <h1>We'd love to <span style={{ color: 'var(--violet)' }}>hear from you</span></h1>
              <p>Got a question, feature request, or want to say hello? Our team usually responds within 2 hours.</p>
            </div>
          </section>
          <section className="section">
            <div className="container">
              <div className="contact-grid">
                <div className="fade-up">
                  <h3 style={{ fontSize: '22px', fontWeight: '800', marginBottom: '6px' }}>Send us a message</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '24px' }}>Fill out the form below and we'll get back to you shortly.</p>
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label className="form-label">First Name</label>
                      <input className="form-input" placeholder="John" />
                    </div>
                    <div className="form-group">
                      <label className="form-label">Last Name</label>
                      <input className="form-input" placeholder="Doe" />
                    </div>
                  </div>
                  <div className="form-group">
                    <label className="form-label">Email Address</label>
                    <input className="form-input" type="email" placeholder="john@example.com" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Subject</label>
                    <input className="form-input" placeholder="How can we help?" />
                  </div>
                  <div className="form-group">
                    <label className="form-label">Message</label>
                    <textarea className="form-textarea" placeholder="Tell us more about your inquiry..."></textarea>
                  </div>
                  
                  <button className="btn btn-dark" style={{ width: '100%', justifyContent: 'center', height: '50px', marginTop: '10px' }} onClick={() => showToast('Message sent! We\'ll reply shortly.', '✅')}>
                    Send Message <i className="fa-solid fa-paper-plane"></i>
                  </button>
                </div>
                
                <div className="fade-up">
                  <h3 style={{ fontSize: '20px', fontWeight: '700', marginBottom: '14px' }}>Contact Information</h3>
                  <p style={{ color: 'var(--muted)', fontSize: '14px', marginBottom: '28px', lineHeight: '1.7' }}>Have a quick question about features, pricing, or your account? Feel free to reach out directly via email or our live chat.</p>
                  
                  <div className="contact-methods mb-48">
                    <div className="cm-card">
                      <div className="cm-icon" style={{ color: 'var(--violet)' }}><i className="fa-regular fa-envelope"></i></div>
                      <div>
                        <div className="cm-title">Email</div>
                        <div className="cm-val">hello@finflow.app</div>
                        <div style={{ fontSize: '12px', color: 'var(--violet)', fontWeight: '600', marginTop: '4px', cursor: 'pointer' }} onClick={() => showToast('Copied to clipboard', '📋')}>Copy Address</div>
                      </div>
                    </div>
                    <div className="cm-card">
                      <div className="cm-icon" style={{ background: 'var(--blue-soft)', color: 'var(--blue)' }}><i className="fa-regular fa-comment-dots"></i></div>
                      <div>
                        <div className="cm-title">Live Chat</div>
                        <div className="cm-val">Mon–Fri, 9am–6pm WAT</div>
                      </div>
                    </div>
                    <div className="cm-card">
                      <div className="cm-icon" style={{ background: 'var(--green-soft)', color: 'var(--green)' }}><i className="fa-solid fa-location-dot"></i></div>
                      <div>
                        <div className="cm-title">Location</div>
                        <div className="cm-val">Lagos, Nigeria · Remote-first</div>
                      </div>
                    </div>
                  </div>
                  
                  <div style={{ background: 'var(--violet-soft)', borderRadius: '16px', padding: '24px' }}>
                    <div style={{ fontSize: '18px', marginBottom: '8px' }}><i className="fa-solid fa-rocket" style={{ color: 'var(--violet)' }}></i></div>
                    <div style={{ fontWeight: '700', marginBottom: '6px' }}>Ready to get started?</div>
                    <p style={{ fontSize: '13px', color: 'var(--muted)', marginBottom: '16px' }}>Join 25,000+ users who've taken control of their finances.</p>
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
