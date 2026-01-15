// File: app.js (Frontend)

const { useState, useRef, useEffect, useMemo } = React;

// --- 1. KOMPONEN ICON & UI DASAR ---
const Send = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="22" y1="2" x2="11" y2="13"></line>
        <polygon points="22 2 15 22 11 13 2 9 22 2"></polygon>
    </svg>
);

const Sparkles = () => (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="#FEF9C3" stroke="#FEF9C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3L13.5 7.5L18 9L13.5 10.5L12 15L10.5 10.5L6 9L10.5 7.5L12 3Z"></path>
        <path d="M19 12L19.5 13.5L21 14L19.5 14.5L19 16L18.5 14.5L17 14L18.5 13.5L19 12Z"></path>
    </svg>
);

const Loader = () => (
    <div className="typing-indicator flex gap-1">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
    </div>
);

const Menu = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="3" y1="12" x2="21" y2="12"></line>
        <line x1="3" y1="6" x2="21" y2="6"></line>
        <line x1="3" y1="18" x2="21" y2="18"></line>
    </svg>
);

const X = () => (
    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <line x1="18" y1="6" x2="6" y2="18"></line>
        <line x1="6" y1="6" x2="18" y2="18"></line>
    </svg>
);

// --- 2. KOMPONEN DIAGRAM VISUAL (RESPONSIF MOBILE/DESKTOP) ---

// Helper warna
const getGradient = (color) => {
    const maps = {
        blue: "from-blue-500 to-indigo-600",
        green: "from-emerald-500 to-teal-600",
        purple: "from-purple-500 to-fuchsia-600",
        orange: "from-orange-500 to-red-600",
        red: "from-red-500 to-pink-600",
        pink: "from-pink-500 to-rose-500",
        gray: "from-slate-500 to-gray-600"
    };
    return maps[color] || maps.blue;
};

// Diagram Alur (Flow): Vertikal di HP, Horizontal di Desktop
const DiagramFlow = ({ title, steps, color = "blue" }) => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg mt-3 w-full">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider border-b border-gray-100 pb-2">
                <span className="text-lg">🔄</span> {title}
            </h3>
            <div className="flex flex-col md:flex-row items-center justify-between gap-2 relative">
                {steps.map((step, idx) => (
                    <React.Fragment key={idx}>
                        <div className="flex flex-row md:flex-col items-center gap-3 md:gap-2 w-full md:w-auto bg-gray-50 md:bg-transparent p-2 md:p-0 rounded-xl">
                            <div className={`w-10 h-10 md:w-12 md:h-12 bg-gradient-to-br ${getGradient(color)} rounded-xl flex items-center justify-center text-white text-xl shadow-md shrink-0`}>
                                {step.icon}
                            </div>
                            <div className="text-xs font-bold text-gray-700 text-left md:text-center">
                                {step.label}
                            </div>
                        </div>
                        {idx < steps.length - 1 && (
                            // Panah: Ke bawah di HP, Ke kanan di Desktop
                            <div className="text-gray-300 text-lg md:rotate-0 rotate-90 my-[-5px] md:my-0">➜</div>
                        )}
                    </React.Fragment>
                ))}
            </div>
        </div>
    );
};

// Diagram MindMap: Grid Layout (Aman untuk Mobile)
const DiagramMindMap = ({ center, nodes, color = "purple" }) => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg mt-3 w-full relative overflow-hidden">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider border-b border-gray-100 pb-2 relative z-10">
                <span className="text-lg">🧠</span> {center.title}
            </h3>
            
            <div className="flex flex-col items-center justify-center relative z-10 gap-4">
                {/* Center Node */}
                <div className={`w-20 h-20 bg-gradient-to-br ${getGradient(color)} rounded-full flex flex-col items-center justify-center text-white shadow-xl border-4 border-white z-20`}>
                    <span className="text-2xl mb-0.5">{center.icon}</span>
                    <span className="text-[9px] font-bold uppercase tracking-wide">{center.label}</span>
                </div>

                {/* Branches using Grid */}
                <div className="grid grid-cols-2 gap-3 w-full">
                    {nodes.map((node, idx) => (
                        <div key={idx} className="flex flex-col items-center bg-slate-50 p-2 rounded-xl border border-slate-100 relative">
                             {/* Line connector simulation */}
                             <div className="absolute top-[-12px] left-1/2 w-0.5 h-3 bg-gray-200 -z-10"></div>
                             
                             <div className={`w-8 h-8 bg-white rounded-lg flex items-center justify-center text-lg shadow-sm border border-gray-200 mb-1`}>
                                {node.icon}
                             </div>
                             <span className="text-[10px] font-bold text-center text-gray-600 leading-tight">
                                {node.label}
                             </span>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

// Diagram Perbandingan: Stack di HP, Side-by-Side di Desktop
const DiagramComparison = ({ left, right, title }) => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg mt-3 w-full">
             <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider border-b border-gray-100 pb-2">
                <span className="text-lg">⚖️</span> {title}
            </h3>
            <div className="flex flex-col md:flex-row gap-3">
                {/* Kiri */}
                <div className="flex-1 bg-red-50 rounded-xl p-3 border border-red-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-10 text-4xl">❌</div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{left.icon}</span>
                        <div className="font-bold text-red-600 text-xs uppercase">{left.title}</div>
                    </div>
                    <ul className="space-y-1.5">
                        {left.points.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700 leading-tight">
                                <span className="text-red-500 font-bold mt-0.5">×</span> {p}
                            </li>
                        ))}
                    </ul>
                </div>

                <div className="flex items-center justify-center text-gray-400 font-bold text-xs bg-gray-100 rounded-full w-8 h-8 self-center shrink-0">VS</div>

                {/* Kanan */}
                <div className="flex-1 bg-green-50 rounded-xl p-3 border border-green-100 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-1 opacity-10 text-4xl">✅</div>
                    <div className="flex items-center gap-2 mb-2">
                        <span className="text-2xl">{right.icon}</span>
                        <div className="font-bold text-green-600 text-xs uppercase">{right.title}</div>
                    </div>
                    <ul className="space-y-1.5">
                        {right.points.map((p, i) => (
                            <li key={i} className="flex items-start gap-1.5 text-[11px] text-gray-700 leading-tight">
                                <span className="text-green-500 font-bold mt-0.5">✓</span> {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </div>
    );
};

// Diagram Siklus: Grid Box Simple
const DiagramCycle = ({ title, steps }) => {
    return (
        <div className="bg-white p-4 rounded-2xl border border-gray-100 shadow-lg mt-3 w-full">
            <h3 className="font-bold text-gray-800 mb-4 flex items-center gap-2 text-xs uppercase tracking-wider border-b border-gray-100 pb-2">
                <span className="text-lg">🔁</span> {title}
            </h3>
            <div className="grid grid-cols-2 gap-3 relative">
                 <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                     <div className="w-16 h-16 border-2 border-dashed border-blue-200 rounded-full animate-spin-slow opacity-60"></div>
                </div>
                {steps.map((step, idx) => (
                    <div key={idx} className="bg-slate-50 border border-slate-100 p-2 rounded-xl z-10 flex flex-col items-center text-center shadow-sm">
                        <span className="text-xl mb-1">{step.icon}</span>
                        <span className="text-[10px] font-bold text-gray-700">{step.label}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

const SidebarSubmenu = ({ title, items, onTopicChange, icon }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider mb-2 focus:outline-none hover:text-purple-600 transition-colors group py-1"
            >
                <div className="flex items-center gap-2">
                    <span className="text-base">{icon}</span>
                    <span>{title}</span>
                </div>
                <span className={`transform transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`}>
                    ▼
                </span>
            </button>
            {isOpen && (
                <div className="space-y-1 ml-1 pl-2 border-l-2 border-gray-100">
                    {items.map((topic, idx) => (
                        <button
                            key={idx}
                            onClick={() => onTopicChange(topic)}
                            className="w-full text-left px-3 py-2 rounded-lg hover:bg-purple-50 text-xs text-gray-600 hover:text-purple-700 transition-all font-medium truncate"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- DATA TOPIK & LOGIKA SARAN PINTAR (CONTEXT AWARE) ---

const contextMappings = {
    'Web3_Intro': {
        keywords: ['web3', 'internet', 'masa depan', 'beda web2'],
        suggestions: ['Apa perbedaan Web2 dan Web3?', 'Apa keuntungan Web3?', 'Bagaimana cara mulai di Web3?']
    },
    'Blockchain_Tech': {
        keywords: ['blockchain', 'rantai', 'blok', 'teknologi', 'data'],
        suggestions: ['Bagaimana cara kerja blockchain?', 'Apakah blockchain aman?', 'Apa itu desentralisasi?']
    },
    'Economy_Token': {
        keywords: ['ekonomi', 'uang', 'cuan', 'profit', 'harga', 'market', 'investasi', 'tokenomics', 'supply', 'demand', 'inflasi', 'deflasi'],
        suggestions: ['Apa itu Tokenomics?', 'Apa bedanya Coin dan Token?', 'Mengapa harga crypto naik turun?', 'Apa itu Market Cap?']
    },
    'DeFi': {
        keywords: ['defi', 'bank', 'pinjam', 'bunga', 'farming', 'pool', 'liquidity'],
        suggestions: ['Apa itu DeFi?', 'Apa risiko Yield Farming?', 'Bagaimana cara kerja Liquidity Pool?', 'Beda CEX dan DEX?']
    },
    'NFT': {
        keywords: ['nft', 'gambar', 'seni', 'koleksi', 'game', 'mint'],
        suggestions: ['Cara membuat NFT?', 'Kenapa NFT mahal?', 'Apa kegunaan NFT selain seni?', 'Di mana jual beli NFT?']
    },
    'Security': {
        keywords: ['aman', 'scam', 'tipu', 'hack', 'phishing', 'rug pull', 'kunci', 'seed', 'password'],
        suggestions: ['Bagaimana mengamankan Wallet?', 'Apa ciri-ciri penipuan crypto?', 'Apa itu Seed Phrase?', 'Apa itu Cold Wallet?']
    },
    'Legal': {
        keywords: ['hukum', 'legal', 'ilegal', 'pajak', 'bappebti', 'pemerintah', 'aturan'],
        suggestions: ['Apakah crypto legal di Indonesia?', 'Berapa pajak crypto?', 'Apa peran Bappebti?', 'Crypto haram atau halal?']
    },
    'Mining_Staking': {
        keywords: ['mining', 'staking', 'tambang', 'listrik', 'validasi', 'proof'],
        suggestions: ['Apa bedanya Mining dan Staking?', 'Apa itu Proof of Work?', 'Apakah mining boros listrik?', 'Cara mulai staking?']
    }
};

const defaultSuggestions = ['Apa itu Web3?', 'Jelaskan Blockchain', 'Apa itu Bitcoin?', 'Cara beli Crypto?'];

const detectContext = (text) => {
    const lowerText = text.toLowerCase();
    for (const [key, data] of Object.entries(contextMappings)) {
        if (data.keywords.some(keyword => lowerText.includes(keyword))) {
            return key;
        }
    }
    return null; // Tidak ketemu konteks spesifik
};

const getSuggestionsByContext = (text) => {
    const contextKey = detectContext(text);
    if (contextKey) {
        return contextMappings[contextKey].suggestions;
    }
    // Fallback: Random mix jika tidak ada konteks jelas
    return defaultSuggestions;
};


// --- MAIN APP COMPONENT ---

const Web3Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Halo! 👋 Saya Web3 Assistant. Saya bisa bantu jelaskan konsep Web3, Blockchain, hingga Ekonomi Crypto dengan bahasa simpel. Mau belajar apa hari ini?',
            visual: null
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(defaultSuggestions);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const [activeTopic, setActiveTopic] = useState('Menu Utama');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // --- LOGIKA GENERATOR VISUAL (50 DIAGRAM) ---
    const generateVisual = (topic) => {
        const t = topic.toLowerCase();

        // 1. BLOCKCHAIN (FLOW)
        if (t.includes('blockchain') || t.includes('rantai')) {
            return <DiagramFlow title="Cara Kerja Blockchain" color="blue" steps={[
                { icon: '📝', label: 'Transaksi' },
                { icon: '📦', label: 'Masuk Blok' },
                { icon: '🔗', label: 'Rantai Blok' },
                { icon: '✅', label: 'Validasi' }
            ]} />;
        }
        // 2. WEB3 VS WEB2 (COMPARISON)
        if (t.includes('web3') && (t.includes('web2') || t.includes('beda'))) {
            return <DiagramComparison title="Evolusi Internet" 
                left={{ title: "Web 2.0", icon: "📱", points: ["Terpusat (Google/FB)", "Data milik PT", "Rawan Sensor"] }} 
                right={{ title: "Web 3.0", icon: "🌐", points: ["Terdesentralisasi", "Data milik User", "Transparan"] }} 
            />;
        }
        // 3. MINING (FLOW)
        if (t.includes('mining') || t.includes('proof of work')) {
            return <DiagramFlow title="Proses Mining (PoW)" color="orange" steps={[
                { icon: '💻', label: 'Komputer' },
                { icon: '🧩', label: 'Hitung Kode' },
                { icon: '⚡', label: 'Butuh Listrik' },
                { icon: '💰', label: 'Dapat Koin' }
            ]} />;
        }
        // 4. STAKING (CYCLE)
        if (t.includes('staking') || t.includes('proof of stake')) {
            return <DiagramCycle title="Siklus Staking" steps={[
                { icon: '🔒', label: 'Kunci Koin' },
                { icon: '🛡️', label: 'Validasi' },
                { icon: '🎁', label: 'Dapat Reward' },
                { icon: '🔄', label: 'Compound' }
            ]} />;
        }
        // 5. NFT (MINDMAP)
        if (t.includes('nft')) {
            return <DiagramMindMap center={{ title: "Fungsi NFT", icon: "🎨", label: "Unik" }} color="purple" nodes={[
                { icon: "🖌️", label: "Seni Digital" },
                { icon: "🎮", label: "Item Game" },
                { icon: "🆔", label: "Identitas" },
                { icon: "🎵", label: "Musik/Karya" }
            ]} />;
        }
        // 6. DEFI (MINDMAP)
        if (t.includes('defi')) {
            return <DiagramMindMap center={{ title: "Dunia DeFi", icon: "💸", label: "Keuangan" }} color="green" nodes={[
                { icon: "🏦", label: "DEX (Tukar)" },
                { icon: "💰", label: "Lending" },
                { icon: "🚜", label: "Farming" },
                { icon: "💲", label: "Stablecoin" }
            ]} />;
        }
        // 7. DAO (MINDMAP)
        if (t.includes('dao')) {
            return <DiagramMindMap center={{ title: "Struktur DAO", icon: "🏛️", label: "Organisasi" }} color="blue" nodes={[
                { icon: "🗳️", label: "Voting" },
                { icon: "🎟️", label: "Token" },
                { icon: "📜", label: "Proposal" },
                { icon: "🤝", label: "Komunitas" }
            ]} />;
        }
        // 8. WALLET (COMPARISON)
        if (t.includes('wallet') || t.includes('dompet')) {
            return <DiagramComparison title="Tipe Wallet" 
                left={{ title: "Hot Wallet", icon: "🔥", points: ["Online (App)", "Mudah Dipakai", "Kurang Aman"] }} 
                right={{ title: "Cold Wallet", icon: "❄️", points: ["Offline (USB)", "Ribet Dipakai", "Sangat Aman"] }} 
            />;
        }
        // 9. COIN VS TOKEN (COMPARISON)
        if ((t.includes('coin') && t.includes('token')) || t.includes('beda')) {
            return <DiagramComparison title="Coin vs Token" 
                left={{ title: "Coin", icon: "🪙", points: ["Punya Blockchain", "Contoh: BTC, ETH", "Mata Uang Asli"] }} 
                right={{ title: "Token", icon: "🎫", points: ["Numpang Chain", "Contoh: SHIB, UNI", "Aset Proyek"] }} 
            />;
        }
        // 10. SMART CONTRACT (FLOW)
        if (t.includes('smart contract') || t.includes('kontrak')) {
            return <DiagramFlow title="Logika Smart Contract" color="blue" steps={[
                { icon: '📜', label: 'Tulis Kode' },
                { icon: '⚖️', label: 'Syarat (IF)' },
                { icon: '🤖', label: 'Aksi (THEN)' },
                { icon: '✅', label: 'Otomatis' }
            ]} />;
        }
        // 11. BITCOIN (MINDMAP)
        if (t.includes('bitcoin') || t.includes('btc')) {
            return <DiagramMindMap center={{ title: "Bitcoin", icon: "₿", label: "Emas Digital" }} color="orange" nodes={[
                { icon: "🥇", label: "Koin #1" },
                { icon: "🔒", label: "Paling Aman" },
                { icon: "⛏️", label: "Proof of Work" },
                { icon: "📉", label: "Max 21 Juta" }
            ]} />;
        }
        // 12. ETHEREUM (MINDMAP)
        if (t.includes('ethereum') || t.includes('eth')) {
            return <DiagramMindMap center={{ title: "Ethereum", icon: "Ξ", label: "Platform" }} color="blue" nodes={[
                { icon: "📜", label: "Smart Contract" },
                { icon: "🎨", label: "Rumah NFT" },
                { icon: "💸", label: "Pusat DeFi" },
                { icon: "⛽", label: "Gas Fee" }
            ]} />;
        }
        // 13. STABLECOIN (MINDMAP)
        if (t.includes('stablecoin') || t.includes('usdt')) {
            return <DiagramMindMap center={{ title: "Stablecoin", icon: "💵", label: "Stabil" }} color="green" nodes={[
                { icon: "🏦", label: "Fiat (USDT)" },
                { icon: "🪙", label: "Crypto (DAI)" },
                { icon: "🧮", label: "Algo (UST)" },
                { icon: "📉", label: "Anti Volatil" }
            ]} />;
        }
        // 14. GAS FEE (CYCLE)
        if (t.includes('gas') || t.includes('biaya')) {
            return <DiagramCycle title="Siklus Gas Fee" steps={[
                { icon: '👤', label: 'User Kirim' },
                { icon: '⛽', label: 'Bayar Gas' },
                { icon: '👷', label: 'Validator' },
                { icon: '✅', label: 'Konfirmasi' }
            ]} />;
        }
        // 15. DESENTRALISASI (MINDMAP)
        if (t.includes('desentralisasi')) {
            return <DiagramMindMap center={{ title: "Desentralisasi", icon: "🌐", label: "P2P" }} color="green" nodes={[
                { icon: "❌", label: "Tanpa Bank" },
                { icon: "🤝", label: "User ke User" },
                { icon: "🛡️", label: "Tahan Sensor" },
                { icon: "🌍", label: "Global" }
            ]} />;
        }
        // 16. MINTING (FLOW)
        if (t.includes('minting')) {
            return <DiagramFlow title="Proses Minting NFT" color="pink" steps={[
                { icon: '📂', label: 'Upload File' },
                { icon: '✍️', label: 'Isi Data' },
                { icon: '⛽', label: 'Bayar Gas' },
                { icon: '✨', label: 'Jadi NFT' }
            ]} />;
        }
        // 17. MARKETPLACE (MINDMAP)
        if (t.includes('marketplace') || t.includes('opensea')) {
            return <DiagramMindMap center={{ title: "Marketplace", icon: "🏪", label: "Pasar" }} color="blue" nodes={[
                { icon: "🌊", label: "OpenSea" },
                { icon: "🟡", label: "Rarible" },
                { icon: "🌫️", label: "Blur" },
                { icon: "🪄", label: "Magic Eden" }
            ]} />;
        }
        // 18. METAVERSE (MINDMAP)
        if (t.includes('metaverse')) {
            return <DiagramMindMap center={{ title: "Metaverse", icon: "🕶️", label: "Virtual" }} color="purple" nodes={[
                { icon: "🧍", label: "Avatar" },
                { icon: "🏞️", label: "Tanah Virtual" },
                { icon: "💰", label: "Ekonomi" },
                { icon: "🤝", label: "Sosial" }
            ]} />;
        }
        // 19. CEX VS DEX (COMPARISON)
        if (t.includes('cex') || t.includes('dex')) {
            return <DiagramComparison title="Tempat Trading" 
                left={{ title: "CEX (Binance/Toko)", icon: "🏦", points: ["Ada CS", "Login Email", "Dana di Admin"] }} 
                right={{ title: "DEX (Uniswap)", icon: "🦄", points: ["Mandiri", "Login Wallet", "Dana Sendiri"] }} 
            />;
        }
        // 20. LIQUIDITY POOL (CYCLE)
        if (t.includes('liquidity')) {
            return <DiagramCycle title="Liquidity Pool" steps={[
                { icon: '➕', label: 'Setor 2 Aset' },
                { icon: '🏊', label: 'Masuk Pool' },
                { icon: '💱', label: 'Trader Swap' },
                { icon: '💵', label: 'Dapat Fee' }
            ]} />;
        }
        // 21. YIELD FARMING (FLOW)
        if (t.includes('farming')) {
            return <DiagramFlow title="Yield Farming" color="green" steps={[
                { icon: '💰', label: 'Punya Aset' },
                { icon: '🏦', label: 'Pinjamkan' },
                { icon: '⏳', label: 'Tunggu' },
                { icon: '🌾', label: 'Panen Bunga' }
            ]} />;
        }
        // 22. GOVERNANCE (FLOW)
        if (t.includes('governance') || t.includes('voting')) {
            return <DiagramFlow title="Proses Voting DAO" color="blue" steps={[
                { icon: '🪙', label: 'Beli Token' },
                { icon: '💡', label: 'Buat Usulan' },
                { icon: '🗳️', label: 'Voting' },
                { icon: '⚖️', label: 'Keputusan' }
            ]} />;
        }
        // 23. SEED PHRASE (FLOW)
        if (t.includes('seed')) {
            return <DiagramFlow title="Pentingnya Seed" color="red" steps={[
                { icon: '🔑', label: 'Buat Wallet' },
                { icon: '📝', label: 'Catat Kata' },
                { icon: '🗄️', label: 'Simpan Aman' },
                { icon: '🔓', label: 'Kunci Utama' }
            ]} />;
        }
        // 24. PRIVATE KEY (COMPARISON)
        if (t.includes('key')) {
            return <DiagramComparison title="Kunci Crypto" 
                left={{ title: "Public Key", icon: "📬", points: ["Boleh Disebar", "Utk Terima", "No. Rekening"] }} 
                right={{ title: "Private Key", icon: "🗝️", points: ["RAHASIA", "Utk Kirim", "PIN ATM"] }} 
            />;
        }
        // 25. SECURITY RISK (MINDMAP)
        if (t.includes('risiko') || t.includes('aman')) {
            return <DiagramMindMap center={{ title: "Risiko", icon: "⚠️", label: "Bahaya" }} color="red" nodes={[
                { icon: "🎣", label: "Phishing" },
                { icon: "🏃", label: "Rug Pull" },
                { icon: "🦠", label: "Malware" },
                { icon: "📉", label: "Volatilitas" }
            ]} />;
        }
        // 26. TOKENOMICS (CYCLE)
        if (t.includes('tokenomics')) {
            return <DiagramCycle title="Ekonomi Token" steps={[
                { icon: '🏭', label: 'Supply' },
                { icon: '🎁', label: 'Insentif' },
                { icon: '🛒', label: 'Demand' },
                { icon: '🔥', label: 'Burn' }
            ]} />;
        }
        // 27. SUPPLY DEMAND (FLOW)
        if (t.includes('supply') || t.includes('harga')) {
            return <DiagramFlow title="Hukum Harga" color="green" steps={[
                { icon: '📉', label: 'Supply Turun' },
                { icon: '📈', label: 'Demand Naik' },
                { icon: '🚀', label: 'Harga Naik' },
                { icon: '🤑', label: 'Profit' }
            ]} />;
        }
        // 28. MARKET CAP (FLOW)
        if (t.includes('market cap')) {
            return <DiagramFlow title="Market Cap" color="blue" steps={[
                { icon: '🪙', label: 'Harga Koin' },
                { icon: '✖️', label: 'Dikali' },
                { icon: '🔢', label: 'Jml Beredar' },
                { icon: '💰', label: '= Valuasi' }
            ]} />;
        }
        // 29. BULL VS BEAR (COMPARISON)
        if (t.includes('bull') || t.includes('bear')) {
            return <DiagramComparison title="Kondisi Pasar" 
                left={{ title: "Bull (Naik)", icon: "🐂", points: ["Optimis", "Beli", "Grafik Hijau"] }} 
                right={{ title: "Bear (Turun)", icon: "🐻", points: ["Pesimis", "Jual", "Grafik Merah"] }} 
            />;
        }
        // 30. LAYER 2 (FLOW)
        if (t.includes('layer 2')) {
            return <DiagramFlow title="Solusi Layer 2" color="purple" steps={[
                { icon: '🐌', label: 'L1 Macet' },
                { icon: '⚡', label: 'L2 Proses' },
                { icon: '📦', label: 'Bungkus' },
                { icon: '✅', label: 'Lapor L1' }
            ]} />;
        }
        // 31. BRIDGE (FLOW)
        if (t.includes('bridge')) {
            return <DiagramFlow title="Bridge (Jembatan)" color="orange" steps={[
                { icon: '🔒', label: 'Lock di A' },
                { icon: '🌉', label: 'Lewat Bridge' },
                { icon: '🔓', label: 'Mint di B' },
                { icon: '🔁', label: 'Bisa Balik' }
            ]} />;
        }
        // 32. AIRDROP (FLOW)
        if (t.includes('airdrop')) {
            return <DiagramFlow title="Proses Airdrop" color="green" steps={[
                { icon: '🏗️', label: 'Proyek Baru' },
                { icon: '🧪', label: 'User Test' },
                { icon: '📸', label: 'Snapshot' },
                { icon: '🪂', label: 'Dapat Koin' }
            ]} />;
        }
        // 33. FORK (COMPARISON)
        if (t.includes('fork')) {
            return <DiagramComparison title="Jenis Fork" 
                left={{ title: "Soft Fork", icon: "🥄", points: ["Update Ringan", "Kompatibel", "Minor"] }} 
                right={{ title: "Hard Fork", icon: "🍴", points: ["Update Besar", "Pecah Chain", "Mayor"] }} 
            />;
        }
        // 34. AKSES INFORMASI (MINDMAP) - SKRIPSI
        if (t.includes('sumber') || t.includes('berita') || t.includes('informasi')) {
            return <DiagramMindMap center={{ title: "Sumber Info", icon: "📡", label: "Riset" }} color="blue" nodes={[
                { icon: "🦎", label: "CoinGecko" },
                { icon: "🐦", label: "Twitter/X" },
                { icon: "💬", label: "Discord" },
                { icon: "📰", label: "Berita" }
            ]} />;
        }
        // 35. DYOR (FLOW) - SKRIPSI
        if (t.includes('dyor')) {
            return <DiagramFlow title="Langkah DYOR" color="purple" steps={[
                { icon: '🌐', label: 'Cek Web' },
                { icon: '👥', label: 'Cek Tim' },
                { icon: '📄', label: 'Baca WP' },
                { icon: '🗺️', label: 'Roadmap' }
            ]} />;
        }
        // 36. AUDIT (FLOW)
        if (t.includes('audit')) {
            return <DiagramFlow title="Proses Audit" color="blue" steps={[
                { icon: '👨‍💻', label: 'Dev Buat' },
                { icon: '🕵️', label: 'Auditor Cek' },
                { icon: '🐛', label: 'Temu Bug' },
                { icon: '🛡️', label: 'Skor Aman' }
            ]} />;
        }
        // 37. WHITEPAPER (MINDMAP)
        if (t.includes('whitepaper')) {
            return <DiagramMindMap center={{ title: "Isi Whitepaper", icon: "📄", label: "Dokumen" }} color="gray" nodes={[
                { icon: "🎯", label: "Visi Misi" },
                { icon: "⚙️", label: "Teknologi" },
                { icon: "📊", label: "Tokenomics" },
                { icon: "👥", label: "Tim Dev" }
            ]} />;
        }
        // 38. HUKUM INDONESIA (COMPARISON) - SKRIPSI
        if (t.includes('hukum') || t.includes('legal')) {
            return <DiagramComparison title="Hukum RI" 
                left={{ title: "BOLEH (Aset)", icon: "✅", points: ["Investasi", "Trading", "Disimpan"] }} 
                right={{ title: "DILARANG (Bayar)", icon: "🚫", points: ["Beli Barang", "Ganti Rupiah", "Alat Bayar"] }} 
            />;
        }
        // 39. PAJAK (FLOW)
        if (t.includes('pajak')) {
            return <DiagramFlow title="Pajak Crypto RI" color="orange" steps={[
                { icon: '🛒', label: 'Beli' },
                { icon: '0,11%', label: 'PPN 0.11%' },
                { icon: '💰', label: 'Jual' },
                { icon: '0,1%', label: 'PPh 0.1%' }
            ]} />;
        }
        // 40. BAPPEBTI (MINDMAP)
        if (t.includes('bappebti')) {
            return <DiagramMindMap center={{ title: "Bappebti", icon: "👮", label: "Pengawas" }} color="blue" nodes={[
                { icon: "📜", label: "Buat Aturan" },
                { icon: "🏢", label: "Izin Bursa" },
                { icon: "⚖️", label: "Lindungi" },
                { icon: "📋", label: "List Aset" }
            ]} />;
        }
        // 41. PHISHING (FLOW)
        if (t.includes('phishing')) {
            return <DiagramFlow title="Serangan Phishing" color="red" steps={[
                { icon: '🎣', label: 'Link Palsu' },
                { icon: '🖱️', label: 'User Klik' },
                { icon: '⌨️', label: 'Isi Seed' },
                { icon: '💸', label: 'Dana Hilang' }
            ]} />;
        }
        // 42. RUG PULL (FLOW)
        if (t.includes('rug')) {
            return <DiagramFlow title="Modus Rug Pull" color="red" steps={[
                { icon: '📢', label: 'Promo Hype' },
                { icon: '💰', label: 'User Beli' },
                { icon: '📉', label: 'Dev Jual' },
                { icon: '💀', label: 'Harga 0' }
            ]} />;
        }
        // 43. HODL (CYCLE)
        if (t.includes('hodl')) {
            return <DiagramCycle title="Strategi HODL" steps={[
                { icon: '💵', label: 'Beli' },
                { icon: '😴', label: 'Tidur' },
                { icon: '🙈', label: 'Abaikan' },
                { icon: '💰', label: 'Cuan' }
            ]} />;
        }
        // 44. FOMO (FLOW)
        if (t.includes('fomo')) {
            return <DiagramFlow title="Siklus FOMO" color="red" steps={[
                { icon: '🚀', label: 'Harga Naik' },
                { icon: '🤩', label: 'Ikut Beli' },
                { icon: '📉', label: 'Harga Turun' },
                { icon: '😭', label: 'Nyangkut' }
            ]} />;
        }
        // 45. IMPERMANENT LOSS (FLOW)
        if (t.includes('impermanent')) {
            return <DiagramFlow title="Imp. Loss" color="orange" steps={[
                { icon: '⚖️', label: 'Masuk Pool' },
                { icon: '📊', label: 'Harga Beda' },
                { icon: '📉', label: 'Nilai Turun' },
                { icon: '📤', label: 'Tarik Rugi' }
            ]} />;
        }
        // 46. MASA DEPAN (MINDMAP)
        if (t.includes('masa depan') || t.includes('future')) {
            return <DiagramMindMap center={{ title: "Potensi", icon: "🔮", label: "Future" }} color="purple" nodes={[
                { icon: "🗳️", label: "Voting" },
                { icon: "🏥", label: "Medis" },
                { icon: "🎓", label: "Ijazah" },
                { icon: "🆔", label: "ID Digital" }
            ]} />;
        }
        // 47. KYC (FLOW)
        if (t.includes('kyc')) {
             return <DiagramFlow title="Proses KYC" color="blue" steps={[
                { icon: '📝', label: 'Daftar' },
                { icon: '📸', label: 'Foto KTP' },
                { icon: '🤳', label: 'Selfie' },
                { icon: '✅', label: 'Verified' }
            ]} />;
        }
        // 48. HALVING (FLOW)
        if (t.includes('halving')) {
             return <DiagramFlow title="Bitcoin Halving" color="orange" steps={[
                { icon: '⏰', label: '4 Tahun' },
                { icon: '✂️', label: 'Reward / 2' },
                { icon: '📉', label: 'Supply Seret' },
                { icon: '🚀', label: 'Harga Naik' }
            ]} />;
        }
         // 49. REKT (FLOW)
        if (t.includes('rekt') || t.includes('bangkrut')) {
             return <DiagramFlow title="Kena Rekt" color="red" steps={[
                { icon: '🎰', label: 'Judi' },
                { icon: '📉', label: 'Salah Posisi' },
                { icon: '💸', label: 'Likuidasi' },
                { icon: '😭', label: 'Habis' }
            ]} />;
        }
        // 50. ATH (FLOW)
        if (t.includes('ath')) {
             return <DiagramFlow title="All Time High" color="green" steps={[
                { icon: '🚀', label: 'Rally' },
                { icon: '📈', label: 'Tembus Atas' },
                { icon: '🏆', label: 'Rekor Baru' },
                { icon: '💰', label: 'Profit' }
            ]} />;
        }

        // DEFAULT FALLBACK
        return <DiagramMindMap center={{ title: "Web3", icon: "💡", label: "Konsep" }} color="gray" nodes={[
                { icon: "🌐", label: "Teknologi" },
                { icon: "👥", label: "Komunitas" },
                { icon: "💰", label: "Ekonomi" },
                { icon: "🚀", label: "Masa Depan" }
            ]} />;
    };

    const sendMessage = async (messageText) => {
        const userMessage = messageText || input;
        if (!userMessage.trim()) return;
        
        setMessages(prev => [...prev, { role: 'user', content: userMessage, visual: null }]);
        setInput('');
        setIsLoading(true);
        // Hapus suggestion sementara loading
        setSuggestions([]);

        try {
            const cleanHistory = messages.slice(-5).map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            
            const messagesToSend = [
                ...cleanHistory,
                { role: 'user', content: userMessage }
            ];

            const response = await fetch('/api/chat', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    messages: messagesToSend
                })
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.error || 'API request failed');
            }

            const data = await response.json();
            let botReply = data.choices[0].message.content;

            // Simple formatting
            botReply = botReply.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>'); 
            botReply = botReply.replace(/\*(.*?)\*/g, '<i>$1</i>');   
            botReply = botReply.replace(/`([^`]+)`/g, '<code class="bg-gray-100 px-1 rounded">$1</code>'); 
            botReply = botReply.replace(/^(#+\s*)/gm, ''); 
            botReply = botReply.replace(/Analogi:/gi, '<br/><b>Analogi:</b>');
            botReply = botReply.replace(/\n/g, '<br />');

            let visual = generateVisual(userMessage);
            
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: botReply,
                visual: visual 
            }]);
            
            // Generate Context-Aware Suggestions
            const relevantSuggestions = getSuggestionsByContext(userMessage);
            setSuggestions(relevantSuggestions);
            
        } catch (error) {
            console.error(error); 
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `❌ Maaf, ada gangguan sinyal: ${error.message}. Coba lagi ya!`,
                visual: null 
            }]);
            setSuggestions(defaultSuggestions);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicChange = (topic) => {
        setIsSidebarOpen(false);
        setActiveTopic(topic);
        
        // Pancing bot dengan pertanyaan awal topik
        let starterQuestion = `Apa itu ${topic}?`;
        if(topic === 'Akses Informasi') starterQuestion = 'Bagaimana cara mencari informasi crypto yang valid?';
        if(topic === 'Literasi Ekonomi') starterQuestion = 'Jelaskan potensi ekonomi dan risiko di Web3';
        if(topic === 'Literasi Hukum') starterQuestion = 'Bagaimana hukum crypto di Indonesia?';

        sendMessage(starterQuestion);
    };
    
    const handleSuggestionClick = (suggestion) => {
        setInput(suggestion); 
        sendMessage(suggestion);
    };
    
    const handleFormSubmit = (e) => {
        e.preventDefault(); 
        sendMessage();
    };

    return (
        <div className="flex flex-col h-screen bg-slate-50 font-sans">
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black/50 z-40 backdrop-blur-sm"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            {/* SIDEBAR */}
            <div className={`fixed left-0 top-0 w-[280px] h-screen bg-white border-r border-gray-200 p-5 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-xl overflow-y-auto scrollbar-hide`}>
                <div className="mb-6">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-10 h-10 bg-gradient-to-br from-purple-600 to-indigo-600 rounded-xl flex items-center justify-center shadow-lg text-white">
                                <Sparkles />
                            </div>
                            <div>
                                <h1 className="font-bold text-lg text-gray-800 tracking-tight">Web3 Hub</h1>
                                <p className="text-[10px] text-gray-500 uppercase font-bold tracking-wider">Learning Center</p>
                            </div>
                        </div>
                        <button 
                            className="lg:hidden text-gray-400 hover:text-gray-600"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X />
                        </button>
                    </div>
                </div>
                
                <div className="space-y-1">
                    <SidebarSubmenu
                        title="Topik Dasar"
                        icon="🎯"
                        items={['Web3', 'Blockchain', 'NFT', 'DeFi', 'DAO']}
                        onTopicChange={handleTopicChange}
                    />
                    <SidebarSubmenu
                        title="Mekanisme"
                        icon="⚙️"
                        items={['Smart Contract', 'Mining', 'Staking', 'Wallet Crypto', 'Coin vs Token']}
                        onTopicChange={handleTopicChange}
                    />
                    <SidebarSubmenu
                        title="Dimensi Skripsi"
                        icon="🎓"
                        items={['Akses Informasi', 'Evaluasi Informasi', 'Literasi Ekonomi', 'Literasi Hukum', 'Literasi Risiko']}
                        onTopicChange={handleTopicChange}
                    />
                </div>

                <div className="mt-8 p-4 bg-indigo-50 rounded-xl border border-indigo-100">
                    <div className="text-xs font-bold text-indigo-800 mb-1">🚀 Tips</div>
                    <div className="text-[11px] text-indigo-600 leading-relaxed">Gunakan fitur saran pertanyaan di bawah chat untuk eksplorasi lebih dalam!</div>
                </div>
            </div>

            {/* MAIN CONTENT */}
            <div className="flex-1 flex flex-col lg:ml-[280px] h-screen relative">
                {/* HEADER */}
                <div className="bg-white/80 backdrop-blur-md border-b border-gray-200 px-4 py-3 sticky top-0 z-30">
                    <div className="flex items-center justify-between max-w-3xl mx-auto w-full">
                        <div className="flex items-center gap-3">
                            <button 
                                className="lg:hidden text-gray-600 hover:text-purple-600 transition-colors p-1"
                                onClick={() => setIsSidebarOpen(true)}
                            >
                                <Menu />
                            </button>
                            <div>
                                <h1 className="font-bold text-gray-800 text-sm md:text-base">Web3 Learning Hub</h1>
                                <div className="flex items-center gap-1.5">
                                    <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></span>
                                    <p className="text-xs text-gray-500">Online • Topik: {activeTopic}</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* CHAT AREA */}
                <div className="flex-1 overflow-y-auto bg-slate-50 p-4 scroll-smooth">
                    <div className="max-w-3xl mx-auto space-y-6 pb-4">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`flex flex-col ${msg.role === 'user' ? 'items-end' : 'items-start'} animate-fade-in-up`}>
                                <div className={`flex gap-3 max-w-[95%] md:max-w-[85%] ${msg.role === 'user' ? 'flex-row-reverse' : 'flex-row'}`}>
                                    {/* Avatar */}
                                    <div className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 shadow-sm ${msg.role === 'user' ? 'bg-gray-200' : 'bg-gradient-to-br from-purple-600 to-blue-600'}`}>
                                        {msg.role === 'user' ? '👤' : <span className="text-white text-xs">AI</span>}
                                    </div>
                                    
                                    {/* Bubble */}
                                    <div className={`rounded-2xl p-4 shadow-sm text-sm leading-relaxed ${
                                        msg.role === 'user' 
                                            ? 'bg-blue-600 text-white rounded-tr-none' 
                                            : 'bg-white text-gray-800 border border-gray-100 rounded-tl-none'
                                    }`}>
                                        <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                                    </div>
                                </div>

                                {/* Visual Diagram (muncul di bawah bubble bot) */}
                                {msg.visual && (
                                    <div className="ml-11 mt-2 w-full max-w-[90%] md:max-w-[80%]">
                                        {msg.visual}
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex items-center gap-3 ml-1">
                                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-600 flex items-center justify-center shrink-0">
                                    <span className="text-white text-xs">AI</span>
                                </div>
                                <div className="bg-white px-4 py-3 rounded-2xl rounded-tl-none border border-gray-100 shadow-sm">
                                    <Loader />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {/* SUGGESTIONS & INPUT AREA */}
                <div className="bg-white border-t border-gray-200 p-4 pb-6 sticky bottom-0 z-30">
                    <div className="max-w-3xl mx-auto w-full">
                        {/* Suggestions List */}
                        {!isLoading && suggestions.length > 0 && (
                            <div className="mb-3 overflow-x-auto scrollbar-hide flex gap-2 pb-1">
                                {suggestions.map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="whitespace-nowrap bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-100 px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        )}

                        {/* Input Form */}
                        <form onSubmit={handleFormSubmit} className="relative flex items-center gap-2">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Ketik pertanyaanmu..."
                                className="flex-1 bg-gray-50 border border-gray-200 rounded-full px-5 py-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:bg-white transition-all"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="bg-purple-600 hover:bg-purple-700 disabled:bg-gray-300 disabled:cursor-not-allowed text-white p-3 rounded-full transition-all shadow-md flex items-center justify-center"
                            >
                                {isLoading ? <span className="w-5 h-5 block border-2 border-white/30 border-t-white rounded-full animate-spin"></span> : <Send />}
                            </button>
                        </form>
                        <div className="text-center mt-2">
                            <p className="text-[10px] text-gray-400">Powered by Groq AI • Ridhwan Gantenk</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Web3Chatbot />);