import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';

// --- Helper Data ---
const navLinks = [
  { name: 'หน้าแรก', page: 'home' },
  { name: 'หวยออนไลน์', page: 'lottery' },
  { name: 'คาสิโนสด', page: 'live-casino' },
  { name: 'สล็อตเว็บตรง', page: 'slots' },
  { name: 'โปรโมชั่น', page: 'promotions' },
  { name: 'ติดต่อเรา', page: 'contact' },
];

const popularGames = [
  { id: 1, title: 'Treasures of Aztec', imgSrc: 'https://via.placeholder.com/300x400/FF5733/FFFFFF?text=Game+1' },
  { id: 2, title: 'Sweet Bonanza', imgSrc: 'https://via.placeholder.com/300x400/33FF57/FFFFFF?text=Game+2' },
  { id: 3, title: 'Gates of Olympus', imgSrc: 'https://via.placeholder.com/300x400/3357FF/FFFFFF?text=Game+3' },
  { id: 4, title: 'Lucky Neko', imgSrc: 'https://via.placeholder.com/300x400/FF33A1/FFFFFF?text=Game+4' },
  { id: 5, title: 'Roma Legacy', imgSrc: 'https://via.placeholder.com/300x400/F3FF33/000000?text=Game+5' },
  { id: 6, title: 'Wild Bandito', imgSrc: 'https://via.placeholder.com/300x400/33FFF3/000000?text=Game+6' },
];

// --- Components ---

const Header = ({ onNavClick, onAuthClick, isLoggedIn, onLogout, currentPage }) => (
  <header className="header">
    <div className="container header-container">
      <div className="logo">Artkitthana</div>
      <nav className="main-nav">
        <ul>
          {navLinks.map(link => (
            <li key={link.page}>
              <a href="#" 
                 onClick={(e) => { e.preventDefault(); onNavClick(link.page); }}
                 className={currentPage === link.page ? 'active' : ''}>
                {link.name}
              </a>
            </li>
          ))}
        </ul>
      </nav>
      <div className="auth-buttons">
        {isLoggedIn ? (
          <>
            <span className="welcome-message">ยินดีต้อนรับ!</span>
            <button className="btn btn-secondary" onClick={onLogout}>ออกจากระบบ</button>
          </>
        ) : (
          <>
            <button className="btn btn-secondary" onClick={() => onAuthClick('login')}>เข้าสู่ระบบ</button>
            <button className="btn btn-primary" onClick={() => onAuthClick('register')}>สมัครสมาชิก</button>
          </>
        )}
      </div>
    </div>
  </header>
);

const HeroSection = ({ onRegisterClick }) => (
  <section className="hero">
    <div className="container hero-content">
      <h1>Artkitthana หวยออนไลน์ อันดับ1</h1>
      <p>มั่นคง ปลอดภัย จ่ายจริง 100% สมัครสมาชิกวันนี้รับโบนัสฟรีทันที!</p>
      <button className="btn btn-primary btn-lg" onClick={() => onRegisterClick('register')}>สมัครสมาชิกรับเครดิตฟรี</button>
    </div>
  </section>
);

const PopularGamesSection = () => (
  <section className="popular-games">
    <div className="container">
      <h2 className="section-title">เกมสล็อตยอดนิยม</h2>
      <div className="games-grid">
        {popularGames.map(game => (
          <div key={game.id} className="game-card">
            <img src={game.imgSrc} alt={game.title} />
            <div className="game-card-overlay">
              <h3>{game.title}</h3>
              <button className="btn btn-primary" onClick={() => alert(`กำลังเปิดเกม ${game.title}...`)}>เล่นเลย</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  </section>
);

const AuthModal = ({ modalType, onClose, onLogin }) => {
    if (!modalType) return null;

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const isRegister = modalType === 'register';

    const handleSubmit = (e) => {
        e.preventDefault();
        if (username && password) {
            onLogin(username);
        } else {
            alert('กรุณากรอกข้อมูลให้ครบถ้วน');
        }
    };

    return (
        <div className="modal-overlay" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose}>&times;</button>
                <h2>{isRegister ? 'สมัครสมาชิก' : 'เข้าสู่ระบบ'}</h2>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">ชื่อผู้ใช้</label>
                        <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} required />
                    </div>
                    <div className="form-group">
                        <label htmlFor="password">รหัสผ่าน</label>
                        <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                    </div>
                    {isRegister && (
                         <div className="form-group">
                            <label htmlFor="confirm-password">ยืนยันรหัสผ่าน</label>
                            <input type="password" id="confirm-password" required />
                        </div>
                    )}
                    <button type="submit" className="btn btn-primary btn-block">{isRegister ? 'ยืนยันการสมัคร' : 'เข้าสู่ระบบ'}</button>
                </form>
            </div>
        </div>
    );
};


const HomePage = ({ onRegisterClick }) => (
    <>
        <HeroSection onRegisterClick={onRegisterClick} />
        <PopularGamesSection />
    </>
);

const PlaceholderPage = ({ title, imgSrc }) => (
    <div className="container page-content">
        <h1>{title}</h1>
        {imgSrc && <img src={imgSrc} alt={title} className="page-image" />}
        <p>เนื้อหาสำหรับหน้านี้กำลังจะมาในเร็วๆ นี้...</p>
    </div>
);


const App = () => {
  const [currentPage, setCurrentPage] = useState('home');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [modalType, setModalType] = useState(null); // 'login', 'register', or null

  const handleLogin = (username) => {
      setIsLoggedIn(true);
      setModalType(null);
      alert(`ยินดีต้อนรับ, ${username}!`);
  };

  const handleLogout = () => {
      setIsLoggedIn(false);
      alert('ออกจากระบบสำเร็จ');
  };

  const renderContent = () => {
      switch(currentPage) {
          case 'home':
              return <HomePage onRegisterClick={setModalType} />;
          case 'lottery':
              return <PlaceholderPage title="หวยออนไลน์" imgSrc="https://via.placeholder.com/800x400/FFC300/000000?text=หวยออนไลน์" />;
          case 'live-casino':
              return <PlaceholderPage title="คาสิโนสด" imgSrc="https://via.placeholder.com/800x400/C70039/FFFFFF?text=คาสิโนสด" />;
          case 'slots':
              return <PlaceholderPage title="สล็อตเว็บตรง" imgSrc="https://via.placeholder.com/800x400/900C3F/FFFFFF?text=สล็อตเว็บตรง" />;
          case 'promotions':
              return <PlaceholderPage title="โปรโมชั่น" imgSrc="https://via.placeholder.com/800x400/581845/FFFFFF?text=โปรโมชั่นสุดพิเศษ" />;
          case 'contact':
              return <PlaceholderPage title="ติดต่อเรา" imgSrc="https://via.placeholder.com/800x400/001F3F/FFFFFF?text=ติดต่อเรา" />;
          default:
              return <HomePage onRegisterClick={setModalType} />;
      }
  }

  return (
    <>
      <Header 
        onNavClick={setCurrentPage} 
        onAuthClick={setModalType}
        isLoggedIn={isLoggedIn}
        onLogout={handleLogout}
        currentPage={currentPage}
      />
      <main>
        {renderContent()}
      </main>
      <footer className="footer">
          <div className="container">
              <p>&copy; 2024 Artkitthana หวยออนไลน์. สงวนลิขสิทธิ์.</p>
          </div>
      </footer>
      <AuthModal 
        modalType={modalType} 
        onClose={() => setModalType(null)}
        onLogin={handleLogin}
      />
    </>
  );
};

const rootElement = document.getElementById('root');
if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <React.StrictMode>
            <App />
        </React.StrictMode>
    );
}