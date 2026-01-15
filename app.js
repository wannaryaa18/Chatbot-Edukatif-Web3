// File: app.js (Frontend)

const { useState, useRef, useEffect } = React;

// --- 1. KOMPONEN ICON & UI ASLI ---
const Icons = {
    Send: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"></line><polygon points="22 2 15 22 11 13 2 9 22 2"></polygon></svg>,
    Sparkles: () => <svg width="20" height="20" viewBox="0 0 24 24" fill="#FEF9C3" stroke="#FEF9C3" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 3L13.5 7.5L18 9L13.5 10.5L12 15L10.5 10.5L6 9L10.5 7.5L12 3Z"></path><path d="M19 12L19.5 13.5L21 14L19.5 14.5L19 16L18.5 14.5L17 14L18.5 13.5L19 12Z"></path></svg>,
    Menu: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
    X: () => <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="18" y1="6" x2="6" y2="18"></line><line x1="6" y1="6" x2="18" y2="18"></line></svg>,
    ChevronDown: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="6 9 12 15 18 9"></polyline></svg>,
    ChevronRight: () => <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polyline points="9 18 15 12 9 6"></polyline></svg>
};

const Loader = () => (
    <div className="typing-indicator flex gap-1">
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
        <span className="w-2 h-2 bg-purple-500 rounded-full"></span>
    </div>
);

// --- 2. KOMPONEN DIAGRAM VISUAL (DIPERBAIKI AGAR KONSISTEN) ---

// Wrapper standar untuk semua diagram agar ukurannya sama
const DiagramContainer = ({ title, icon, children }) => (
    <div className="w-full bg-white rounded-xl border border-purple-100 shadow-sm mt-3 overflow-hidden">
        <div className="bg-gradient-to-r from-purple-50 to-blue-50 px-4 py-3 border-b border-purple-100 flex items-center gap-2">
            <span className="text-lg">{icon}</span>
            <span className="text-xs font-bold text-gray-700 uppercase tracking-wider">{title}</span>
        </div>
        <div className="p-4 relative min-h-[200px] flex flex-col justify-center">
            {children}
        </div>
    </div>
);

const DiagramFlow = ({ title, steps, color = "blue" }) => {
    const colors = {
        blue: "from-blue-500 to-indigo-600",
        green: "from-emerald-500 to-teal-600",
        purple: "from-purple-500 to-fuchsia-600",
        orange: "from-orange-500 to-red-600",
        red: "from-red-500 to-pink-600",
        pink: "from-pink-500 to-rose-500"
    };
    
    return (
        <DiagramContainer title={title} icon="🔄">
            <div className="grid grid-cols-4 gap-2 items-start">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex flex-col items-center relative group">
                        {/* Garis Konektor (kecuali item terakhir) */}
                        {idx < steps.length - 1 && (
                            <div className="absolute top-5 left-1/2 w-full h-[2px] bg-gray-200 -z-0"></div>
                        )}
                        
                        <div className={`w-10 h-10 bg-gradient-to-br ${colors[color]} rounded-lg flex items-center justify-center text-white text-lg shadow-md mb-2 z-10 relative transform transition-transform group-hover:scale-110`}>
                            {step.icon}
                        </div>
                        <div className="text-[9px] font-bold text-gray-600 text-center leading-tight bg-white px-1 rounded">
                            {step.label}
                        </div>
                    </div>
                ))}
            </div>
        </DiagramContainer>
    );
};

const DiagramMindMap = ({ center, nodes, color = "purple" }) => {
    return (
        <DiagramContainer title={center.title} icon="🧠">
            <div className="relative h-48 w-full flex items-center justify-center">
                {/* Garis Putus-putus Background */}
                <div className="absolute inset-0 flex items-center justify-center pointer-events-none opacity-20">
                     <div className="w-32 h-32 border border-dashed border-purple-400 rounded-full"></div>
                     <div className="absolute w-full h-[1px] bg-purple-200"></div>
                     <div className="absolute h-full w-[1px] bg-purple-200"></div>
                </div>

                {/* Center Node */}
                <div className="absolute z-20 w-16 h-16 bg-gradient-to-br from-gray-800 to-black rounded-full flex flex-col items-center justify-center text-white shadow-xl border-2 border-white">
                    <span className="text-xl mb-0.5">{center.icon}</span>
                    <span className="text-[8px] font-bold uppercase tracking-wider">{center.label}</span>
                </div>

                {/* Nodes (Posisi Absolute Tetap) */}
                {/* Top */}
                <div className="absolute top-0 flex flex-col items-center z-10">
                     <div className={`w-8 h-8 bg-${color}-50 rounded-lg flex items-center justify-center text-sm shadow-sm border border-${color}-200`}>{nodes[0].icon}</div>
                     <span className="text-[8px] font-bold mt-1 bg-white px-1 rounded text-center">{nodes[0].label}</span>
                </div>
                {/* Right */}
                <div className="absolute right-2 flex flex-col items-center z-10">
                     <div className={`w-8 h-8 bg-${color}-50 rounded-lg flex items-center justify-center text-sm shadow-sm border border-${color}-200`}>{nodes[1].icon}</div>
                     <span className="text-[8px] font-bold mt-1 bg-white px-1 rounded text-center">{nodes[1].label}</span>
                </div>
                {/* Bottom */}
                <div className="absolute bottom-0 flex flex-col items-center z-10">
                     <div className={`w-8 h-8 bg-${color}-50 rounded-lg flex items-center justify-center text-sm shadow-sm border border-${color}-200`}>{nodes[2].icon}</div>
                     <span className="text-[8px] font-bold mt-1 bg-white px-1 rounded text-center">{nodes[2].label}</span>
                </div>
                {/* Left */}
                <div className="absolute left-2 flex flex-col items-center z-10">
                     <div className={`w-8 h-8 bg-${color}-50 rounded-lg flex items-center justify-center text-sm shadow-sm border border-${color}-200`}>{nodes[3].icon}</div>
                     <span className="text-[8px] font-bold mt-1 bg-white px-1 rounded text-center">{nodes[3].label}</span>
                </div>
            </div>
        </DiagramContainer>
    );
};

const DiagramComparison = ({ left, right, title }) => {
    return (
        <DiagramContainer title={title} icon="⚖️">
            <div className="flex gap-3 h-full items-stretch">
                {/* Kiri */}
                <div className="flex-1 bg-red-50/50 rounded-lg p-3 border border-red-100 flex flex-col items-center">
                    <div className="text-2xl mb-2">{left.icon}</div>
                    <div className="font-bold text-red-700 text-[10px] uppercase mb-2 text-center">{left.title}</div>
                    <ul className="space-y-1.5 w-full">
                        {left.points.map((p, i) => (
                            <li key={i} className="flex gap-1.5 text-[9px] text-gray-600 bg-white/60 p-1 rounded">
                                <span className="text-red-500 font-bold">x</span> {p}
                            </li>
                        ))}
                    </ul>
                </div>
                
                {/* VS */}
                <div className="flex items-center justify-center">
                    <div className="w-6 h-6 bg-gray-200 rounded-full flex items-center justify-center text-[8px] font-bold text-gray-500">VS</div>
                </div>

                {/* Kanan */}
                <div className="flex-1 bg-green-50/50 rounded-lg p-3 border border-green-100 flex flex-col items-center">
                    <div className="text-2xl mb-2">{right.icon}</div>
                    <div className="font-bold text-green-700 text-[10px] uppercase mb-2 text-center">{right.title}</div>
                    <ul className="space-y-1.5 w-full">
                        {right.points.map((p, i) => (
                            <li key={i} className="flex gap-1.5 text-[9px] text-gray-600 bg-white/60 p-1 rounded">
                                <span className="text-green-500 font-bold">✓</span> {p}
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </DiagramContainer>
    );
};

const DiagramCycle = ({ title, steps }) => {
    return (
        <DiagramContainer title={title} icon="🔁">
            <div className="relative w-full h-48 flex items-center justify-center">
                {/* Circle Background */}
                <div className="absolute w-32 h-32 border-4 border-blue-50 rounded-full"></div>
                <div className="absolute w-32 h-32 border-4 border-blue-500 rounded-full border-t-transparent animate-spin-slow opacity-20"></div>
                
                {/* Center */}
                <div className="absolute z-0 text-3xl opacity-10">🔄</div>

                {/* Nodes (Grid Position) */}
                <div className="w-full h-full relative">
                    {/* Top */}
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white p-1 rounded-lg shadow-sm border border-gray-100 max-w-[80px]">
                        <span className="text-xl">{steps[0].icon}</span>
                        <span className="text-[8px] font-bold text-center leading-tight">{steps[0].label}</span>
                    </div>
                    {/* Right */}
                    <div className="absolute top-1/2 right-0 -translate-y-1/2 flex flex-col items-center bg-white p-1 rounded-lg shadow-sm border border-gray-100 max-w-[80px]">
                        <span className="text-xl">{steps[1].icon}</span>
                        <span className="text-[8px] font-bold text-center leading-tight">{steps[1].label}</span>
                    </div>
                    {/* Bottom */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex flex-col items-center bg-white p-1 rounded-lg shadow-sm border border-gray-100 max-w-[80px]">
                        <span className="text-xl">{steps[2].icon}</span>
                        <span className="text-[8px] font-bold text-center leading-tight">{steps[2].label}</span>
                    </div>
                    {/* Left */}
                    <div className="absolute top-1/2 left-0 -translate-y-1/2 flex flex-col items-center bg-white p-1 rounded-lg shadow-sm border border-gray-100 max-w-[80px]">
                        <span className="text-xl">{steps[3].icon}</span>
                        <span className="text-[8px] font-bold text-center leading-tight">{steps[3].label}</span>
                    </div>
                </div>
            </div>
        </DiagramContainer>
    );
};


// --- SIDEBAR SUBMENU ---
const SidebarSubmenu = ({ title, items, onTopicChange, icon }) => {
    const [isOpen, setIsOpen] = useState(true);
    return (
        <div className="mb-4">
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full flex justify-between items-center text-xs font-bold text-gray-700 uppercase tracking-wider mb-3 focus:outline-none hover:text-purple-600 transition-colors group"
            >
                <div className="flex items-center gap-2">
                    <span className="text-lg">{icon}</span>
                    <span>{title}</span>
                </div>
                <span className="transform transition-transform duration-200 group-hover:scale-110">
                    {isOpen ? <Icons.ChevronDown /> : <Icons.ChevronRight />}
                </span>
            </button>
            {isOpen && (
                <div className="space-y-1">
                    {items.map((topic, idx) => (
                        <button
                            key={idx}
                            onClick={() => onTopicChange(topic)}
                            className="w-full text-left px-4 py-2.5 rounded-xl hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 text-sm text-gray-700 hover:text-purple-600 transition-all font-medium hover:shadow-sm"
                        >
                            {topic}
                        </button>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- DATA TOPIK ---
const topicSuggestionMap = {
    'Umum': ['Apa itu Web3?', 'Apa itu Blockchain?', 'Coin vs Token?', 'Apa itu Proof-of-Stake?'],
    'Web3': ['Apa perbedaan Web2 dan Web3?', 'Apa keuntungan Web3?', 'Apa itu dApp?', 'Bagaimana cara mulai di Web3?'],
    'Blockchain': ['Bagaimana cara kerja blockchain?', 'Apa itu desentralisasi?', 'Apa itu gas fee?', 'Apa itu Layer 2?'],
    'NFT': ['Bagaimana cara membuat NFT?', 'Apa itu minting?', 'Apa kegunaan NFT selain seni?', 'Di mana orang menjual NFT?'],
    'DeFi': ['Apa itu DeFi?', 'Apa itu liquidity pool?', 'Apa resiko pinjam meminjam di DeFi?', 'Contoh aplikasi DeFi?'],
    'DAO': ['Bagaimana cara kerja DAO?', 'Bagaimana cara bergabung dengan DAO?', 'Apa itu token tata kelola?', 'Contoh DAO terkenal?'],
    'Smart Contract': ['Bagaimana cara kerja smart contract?', 'Apa bahasa pemrograman untuk smart contract?', 'Apakah smart contract aman?', 'Contoh penggunaan smart contract?'],
    'Mining': ['Apa itu Proof-of-Work?', 'Apakah mining boros energi?', 'Apa yang dibutuhkan untuk mining?', 'Kenapa mining sulit?'],
     'Staking': ['Apa itu Proof-of-Stake?', 'Apa bedanya mining dan staking?', 'Apa resiko staking?', 'Bagaimana cara mulai staking?'],
     'Wallet Crypto': ['Bagaimana cara mengamankan wallet?', 'Apa itu seed phrase?', 'Apa bedanya hot vs cold wallet?', 'Contoh aplikasi wallet?'],
    'Coin vs Token': ['Apa contoh Coin?', 'Apa contoh Token?', 'Apa itu tokenomics?', 'Bagaimana token dibuat?'],
    // --- DIMENSI SKRIPSI (VARIABEL Y) ---
    'Akses Informasi': ['Di mana sumber berita crypto terpercaya?', 'Apa itu CoinMarketCap?', 'Siapa tokoh Web3 yang wajib difollow?', 'Komunitas crypto Indonesia yang bagus?'],
    'Evaluasi Informasi': ['Bagaimana cara melakukan DYOR?', 'Ciri-ciri proyek crypto scam?', 'Cara membaca Whitepaper?', 'Bagaimana mengecek audit smart contract?'],
    'Literasi Ekonomi': ['Apa potensi ekonomi blockchain?', 'Peluang karir di bidang Web3?', 'Apa itu Tokenomics?', 'Bagaimana mekanisme investasi di DeFi?'],
    'Literasi Hukum': ['Apakah crypto legal di Indonesia?', 'Apa peran Bappebti?', 'Bagaimana aturan pajak crypto?', 'Apakah NFT dilindungi hak cipta?'],
    'Literasi Risiko': ['Bagaimana cara mengamankan Seed Phrase?', 'Apa itu serangan Phishing?', 'Apa risiko Impermanent Loss?', 'Tanda-tanda Rug Pull?']
};

const Web3Chatbot = () => {
    const [messages, setMessages] = useState([
        {
            role: 'assistant',
            content: 'Halo! 👋 Selamat datang di Web3 Learning Hub! Saya siap membantu kamu memahami dunia Web3 dengan cara yang mudah dan menyenangkan. Mau mulai belajar dari mana nih?',
            visual: null
        }
    ]);
    const [input, setInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [suggestions, setSuggestions] = useState(topicSuggestionMap['Umum']);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const messagesEndRef = useRef(null);
    const [activeTopic, setActiveTopic] = useState('Umum');

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // --- GENERATE VISUAL (50+ DIAGRAM) ---
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
                left={{ title: "Web 2.0", icon: "📱", points: ["Terpusat (Google)", "Data milik PT", "Rawan Sensor"] }} 
                right={{ title: "Web 3.0", icon: "🌐", points: ["Desentralisasi", "Data milik User", "Transparan"] }} 
            />;
        }
        // 3. MINING (FLOW)
        if (t.includes('mining') || t.includes('proof of work')) {
            return <DiagramFlow title="Proses Mining (PoW)" color="orange" steps={[
                { icon: '💻', label: 'Komputer' },
                { icon: '🧩', label: 'Puzzle' },
                { icon: '⚡', label: 'Listrik' },
                { icon: '💰', label: 'Reward' }
            ]} />;
        }
        // 4. STAKING (CYCLE)
        if (t.includes('staking') || t.includes('proof of stake')) {
            return <DiagramCycle title="Siklus Staking" steps={[
                { icon: '🔒', label: 'Kunci Koin' },
                { icon: '🛡️', label: 'Validasi' },
                { icon: '🎁', label: 'Reward' },
                { icon: '🔄', label: 'Compound' }
            ]} />;
        }
        // 5. NFT (MINDMAP)
        if (t.includes('nft')) {
            return <DiagramMindMap center={{ title: "Fungsi NFT", icon: "🎨", label: "Unik" }} color="purple" nodes={[
                { icon: "🖌️", label: "Seni" },
                { icon: "🎮", label: "Game" },
                { icon: "🆔", label: "ID" },
                { icon: "🎵", label: "Musik" }
            ]} />;
        }
        // 6. DEFI (MINDMAP)
        if (t.includes('defi')) {
            return <DiagramMindMap center={{ title: "Dunia DeFi", icon: "💸", label: "DeFi" }} color="green" nodes={[
                { icon: "🏦", label: "DEX" },
                { icon: "💰", label: "Lending" },
                { icon: "🚜", label: "Farming" },
                { icon: "💲", label: "Stable" }
            ]} />;
        }
        // 7. DAO (MINDMAP)
        if (t.includes('dao')) {
            return <DiagramMindMap center={{ title: "Struktur DAO", icon: "🏛️", label: "DAO" }} color="blue" nodes={[
                { icon: "🗳️", label: "Voting" },
                { icon: "🎟️", label: "Token" },
                { icon: "📜", label: "Proposal" },
                { icon: "🤝", label: "Komunitas" }
            ]} />;
        }
        // 8. WALLET (COMPARISON)
        if (t.includes('wallet') || t.includes('dompet')) {
            return <DiagramComparison title="Tipe Wallet" 
                left={{ title: "Hot Wallet", icon: "🔥", points: ["Online", "Praktis", "Rawan Hack"] }} 
                right={{ title: "Cold Wallet", icon: "❄️", points: ["Offline", "Ribet", "Sangat Aman"] }} 
            />;
        }
        // 9. COIN VS TOKEN (COMPARISON)
        if ((t.includes('coin') && t.includes('token')) || t.includes('beda')) {
            return <DiagramComparison title="Coin vs Token" 
                left={{ title: "Coin", icon: "🪙", points: ["Chain Sendiri", "Cth: BTC, ETH", "Mata Uang"] }} 
                right={{ title: "Token", icon: "🎫", points: ["Numpang Chain", "Cth: SHIB", "Voucher"] }} 
            />;
        }
        // 10. SMART CONTRACT (FLOW)
        if (t.includes('smart contract') || t.includes('kontrak')) {
            return <DiagramFlow title="Logika Smart Contract" color="blue" steps={[
                { icon: '📜', label: 'Kode' },
                { icon: '⚖️', label: 'Syarat (IF)' },
                { icon: '🤖', label: 'Aksi (THEN)' },
                { icon: '✅', label: 'Auto' }
            ]} />;
        }
        // 11. BITCOIN (MINDMAP)
        if (t.includes('bitcoin') || t.includes('btc')) {
            return <DiagramMindMap center={{ title: "Bitcoin", icon: "₿", label: "Emas" }} color="orange" nodes={[
                { icon: "🥇", label: "Pertama" },
                { icon: "🔒", label: "Aman" },
                { icon: "⛏️", label: "PoW" },
                { icon: "📉", label: "Langka" }
            ]} />;
        }
        // 12. ETHEREUM (MINDMAP)
        if (t.includes('ethereum') || t.includes('eth')) {
            return <DiagramMindMap center={{ title: "Ethereum", icon: "Ξ", label: "Platform" }} color="blue" nodes={[
                { icon: "📜", label: "Kontrak" },
                { icon: "🎨", label: "NFT" },
                { icon: "💸", label: "DeFi" },
                { icon: "⛽", label: "Gas" }
            ]} />;
        }
        // 13. STABLECOIN (MINDMAP)
        if (t.includes('stablecoin') || t.includes('usdt')) {
            return <DiagramMindMap center={{ title: "Stablecoin", icon: "💵", label: "Stabil" }} color="green" nodes={[
                { icon: "🏦", label: "Fiat" },
                { icon: "🪙", label: "Crypto" },
                { icon: "🧮", label: "Algo" },
                { icon: "📉", label: "Stabil" }
            ]} />;
        }
        // 14. GAS FEE (CYCLE)
        if (t.includes('gas') || t.includes('biaya')) {
            return <DiagramCycle title="Siklus Gas Fee" steps={[
                { icon: '👤', label: 'User' },
                { icon: '⛽', label: 'Bayar Gas' },
                { icon: '👷', label: 'Validator' },
                { icon: '✅', label: 'Sukses' }
            ]} />;
        }
        // 15. DESENTRALISASI (MINDMAP)
        if (t.includes('desentralisasi')) {
            return <DiagramMindMap center={{ title: "Desentralisasi", icon: "🌐", label: "P2P" }} color="green" nodes={[
                { icon: "❌", label: "No Bank" },
                { icon: "🤝", label: "P2P" },
                { icon: "🛡️", label: "Anti Sensor" },
                { icon: "🌍", label: "Global" }
            ]} />;
        }
        // 16. MINTING (FLOW)
        if (t.includes('minting')) {
            return <DiagramFlow title="Proses Minting NFT" color="pink" steps={[
                { icon: '📂', label: 'Upload' },
                { icon: '✍️', label: 'Data' },
                { icon: '⛽', label: 'Bayar' },
                { icon: '✨', label: 'Jadi' }
            ]} />;
        }
        // 17. MARKETPLACE (MINDMAP)
        if (t.includes('marketplace') || t.includes('opensea')) {
            return <DiagramMindMap center={{ title: "Marketplace", icon: "🏪", label: "Pasar" }} color="blue" nodes={[
                { icon: "🌊", label: "OpenSea" },
                { icon: "🟡", label: "Rarible" },
                { icon: "🌫️", label: "Blur" },
                { icon: "🪄", label: "Magic" }
            ]} />;
        }
        // 18. METAVERSE (MINDMAP)
        if (t.includes('metaverse')) {
            return <DiagramMindMap center={{ title: "Metaverse", icon: "🕶️", label: "Virtual" }} color="purple" nodes={[
                { icon: "🧍", label: "Avatar" },
                { icon: "🏞️", label: "Tanah" },
                { icon: "💰", label: "Ekonomi" },
                { icon: "🤝", label: "Sosial" }
            ]} />;
        }
        // 19. CEX VS DEX (COMPARISON)
        if (t.includes('cex') || t.includes('dex')) {
            return <DiagramComparison title="Tempat Trading" 
                left={{ title: "CEX (Bank)", icon: "🏦", points: ["Ada CS", "Login Email", "Dana di Admin"] }} 
                right={{ title: "DEX (Chain)", icon: "🦄", points: ["Mandiri", "Login Wallet", "Dana Sendiri"] }} 
            />;
        }
        // 20. LIQUIDITY POOL (CYCLE)
        if (t.includes('liquidity')) {
            return <DiagramCycle title="Liquidity Pool" steps={[
                { icon: '➕', label: 'Setor 2' },
                { icon: '🏊', label: 'Pool' },
                { icon: '💱', label: 'Swap' },
                { icon: '💵', label: 'Fee' }
            ]} />;
        }
        // 21. YIELD FARMING (FLOW)
        if (t.includes('farming')) {
            return <DiagramFlow title="Yield Farming" color="green" steps={[
                { icon: '💰', label: 'Aset' },
                { icon: '🏦', label: 'Pinjam' },
                { icon: '⏳', label: 'Tunggu' },
                { icon: '🌾', label: 'Panen' }
            ]} />;
        }
        // 22. GOVERNANCE (FLOW)
        if (t.includes('governance') || t.includes('voting')) {
            return <DiagramFlow title="Proses Voting DAO" color="blue" steps={[
                { icon: '🪙', label: 'Beli' },
                { icon: '💡', label: 'Usulan' },
                { icon: '🗳️', label: 'Vote' },
                { icon: '⚖️', label: 'Hasil' }
            ]} />;
        }
        // 23. SEED PHRASE (FLOW)
        if (t.includes('seed')) {
            return <DiagramFlow title="Pentingnya Seed" color="red" steps={[
                { icon: '🔑', label: 'Buat' },
                { icon: '📝', label: 'Catat' },
                { icon: '🗄️', label: 'Simpan' },
                { icon: '🔓', label: 'Akses' }
            ]} />;
        }
        // 24. PRIVATE KEY (COMPARISON)
        if (t.includes('key')) {
            return <DiagramComparison title="Kunci Crypto" 
                left={{ title: "Public Key", icon: "📬", points: ["Boleh Sebar", "Terima Dana", "Rekening"] }} 
                right={{ title: "Private Key", icon: "🗝️", points: ["RAHASIA", "Kirim Dana", "PIN ATM"] }} 
            />;
        }
        // 25. SECURITY RISK (MINDMAP)
        if (t.includes('risiko') || t.includes('aman')) {
            return <DiagramMindMap center={{ title: "Risiko", icon: "⚠️", label: "Bahaya" }} color="red" nodes={[
                { icon: "🎣", label: "Phishing" },
                { icon: "🏃", label: "Rug Pull" },
                { icon: "🦠", label: "Malware" },
                { icon: "📉", label: "Volatil" }
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
                { icon: '📉', label: 'Supply ⬇' },
                { icon: '📈', label: 'Demand ⬆' },
                { icon: '🚀', label: 'Harga ⬆' },
                { icon: '🤑', label: 'Profit' }
            ]} />;
        }
        // 28. MARKET CAP (FLOW)
        if (t.includes('market cap')) {
            return <DiagramFlow title="Market Cap" color="blue" steps={[
                { icon: '🪙', label: 'Harga' },
                { icon: '✖️', label: 'Kali' },
                { icon: '🔢', label: 'Jumlah' },
                { icon: '💰', label: 'Total' }
            ]} />;
        }
        // 29. BULL VS BEAR (COMPARISON)
        if (t.includes('bull') || t.includes('bear')) {
            return <DiagramComparison title="Pasar" 
                left={{ title: "Bull (Naik)", icon: "🐂", points: ["Optimis", "Beli", "Hijau"] }} 
                right={{ title: "Bear (Turun)", icon: "🐻", points: ["Pesimis", "Jual", "Merah"] }} 
            />;
        }
        // 30. LAYER 2 (FLOW)
        if (t.includes('layer 2')) {
            return <DiagramFlow title="Solusi Layer 2" color="purple" steps={[
                { icon: '🐌', label: 'L1 Macet' },
                { icon: '⚡', label: 'L2 Proses' },
                { icon: '📦', label: 'Bungkus' },
                { icon: '✅', label: 'Lapor' }
            ]} />;
        }
        // 31. BRIDGE (FLOW)
        if (t.includes('bridge')) {
            return <DiagramFlow title="Bridge" color="orange" steps={[
                { icon: '🔒', label: 'Lock A' },
                { icon: '🌉', label: 'Bridge' },
                { icon: '🔓', label: 'Mint B' },
                { icon: '🔁', label: 'Balik' }
            ]} />;
        }
        // 32. AIRDROP (FLOW)
        if (t.includes('airdrop')) {
            return <DiagramFlow title="Airdrop" color="green" steps={[
                { icon: '🏗️', label: 'Proyek' },
                { icon: '🧪', label: 'Tes' },
                { icon: '📸', label: 'Snap' },
                { icon: '🪂', label: 'Koin' }
            ]} />;
        }
        // 33. FORK (COMPARISON)
        if (t.includes('fork')) {
            return <DiagramComparison title="Jenis Fork" 
                left={{ title: "Soft Fork", icon: "🥄", points: ["Update Ringan", "Kompatibel"] }} 
                right={{ title: "Hard Fork", icon: "🍴", points: ["Update Besar", "Pecah Chain"] }} 
            />;
        }
        // 34. AKSES INFORMASI (MINDMAP) - SKRIPSI
        if (t.includes('sumber') || t.includes('berita')) {
            return <DiagramMindMap center={{ title: "Sumber Info", icon: "📡", label: "Riset" }} color="blue" nodes={[
                { icon: "🦎", label: "Gecko" },
                { icon: "🐦", label: "Twitter" },
                { icon: "💬", label: "Discord" },
                { icon: "📰", label: "Berita" }
            ]} />;
        }
        // 35. DYOR (FLOW) - SKRIPSI
        if (t.includes('dyor')) {
            return <DiagramFlow title="Langkah DYOR" color="purple" steps={[
                { icon: '🌐', label: 'Web' },
                { icon: '👥', label: 'Tim' },
                { icon: '📄', label: 'WP' },
                { icon: '🗺️', label: 'Plan' }
            ]} />;
        }
        // 36. AUDIT (FLOW)
        if (t.includes('audit')) {
            return <DiagramFlow title="Proses Audit" color="blue" steps={[
                { icon: '👨‍💻', label: 'Dev' },
                { icon: '🕵️', label: 'Audit' },
                { icon: '🐛', label: 'Bug' },
                { icon: '🛡️', label: 'Aman' }
            ]} />;
        }
        // 37. WHITEPAPER (MINDMAP)
        if (t.includes('whitepaper')) {
            return <DiagramMindMap center={{ title: "Whitepaper", icon: "📄", label: "Dokumen" }} color="gray" nodes={[
                { icon: "🎯", label: "Visi" },
                { icon: "⚙️", label: "Tekno" },
                { icon: "📊", label: "Ekon" },
                { icon: "👥", label: "Tim" }
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
            return <DiagramFlow title="Pajak Crypto" color="orange" steps={[
                { icon: '🛒', label: 'Beli' },
                { icon: '0,11%', label: 'PPN' },
                { icon: '💰', label: 'Jual' },
                { icon: '0,1%', label: 'PPh' }
            ]} />;
        }
        // 40. BAPPEBTI (MINDMAP)
        if (t.includes('bappebti')) {
            return <DiagramMindMap center={{ title: "Bappebti", icon: "👮", label: "Regulator" }} color="blue" nodes={[
                { icon: "📜", label: "Aturan" },
                { icon: "🏢", label: "Izin" },
                { icon: "⚖️", label: "Lindung" },
                { icon: "📋", label: "Daftar" }
            ]} />;
        }
        // 41. PHISHING (FLOW)
        if (t.includes('phishing')) {
            return <DiagramFlow title="Phishing" color="red" steps={[
                { icon: '🎣', label: 'Palsu' },
                { icon: '🖱️', label: 'Klik' },
                { icon: '⌨️', label: 'Input' },
                { icon: '💸', label: 'Hilang' }
            ]} />;
        }
        // 42. RUG PULL (FLOW)
        if (t.includes('rug')) {
            return <DiagramFlow title="Rug Pull" color="red" steps={[
                { icon: '📢', label: 'Hype' },
                { icon: '💰', label: 'Beli' },
                { icon: '📉', label: 'Jual' },
                { icon: '💀', label: 'Nol' }
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
                { icon: '🚀', label: 'Naik' },
                { icon: '🤩', label: 'Panik' },
                { icon: '📉', label: 'Turun' },
                { icon: '😭', label: 'Rugi' }
            ]} />;
        }
        // 45. IMPERMANENT LOSS (FLOW)
        if (t.includes('impermanent')) {
            return <DiagramFlow title="Imp. Loss" color="orange" steps={[
                { icon: '⚖️', label: 'Pool' },
                { icon: '📊', label: 'Ubah' },
                { icon: '📉', label: 'Kurang' },
                { icon: '📤', label: 'Tarik' }
            ]} />;
        }
        // 46. MASA DEPAN (MINDMAP)
        if (t.includes('masa depan')) {
            return <DiagramMindMap center={{ title: "Potensi", icon: "🔮", label: "Future" }} color="purple" nodes={[
                { icon: "🗳️", label: "Voting" },
                { icon: "🏥", label: "Medis" },
                { icon: "🎓", label: "Ijazah" },
                { icon: "🆔", label: "ID" }
            ]} />;
        }
        // 47. KYC (FLOW)
        if (t.includes('kyc')) {
             return <DiagramFlow title="Proses KYC" color="blue" steps={[
                { icon: '📝', label: 'Daftar' },
                { icon: '📸', label: 'Foto' },
                { icon: '🤳', label: 'Selfie' },
                { icon: '✅', label: 'Verif' }
            ]} />;
        }

        // DEFAULT FALLBACK
        return <DiagramMindMap center={{ title: "Web3", icon: "💡", label: "Info" }} color="gray" nodes={[
                { icon: "🌐", label: "Tekno" },
                { icon: "👥", label: "User" },
                { icon: "💰", label: "Aset" },
                { icon: "🚀", label: "Future" }
            ]} />;
    };

    const shuffleArray = (array) => {
        const newArray = [...array];
        let currentIndex = newArray.length;
        let randomIndex;
        while (currentIndex !== 0) {
            randomIndex = Math.floor(Math.random() * currentIndex);
            currentIndex--;
            [newArray[currentIndex], newArray[randomIndex]] = [newArray[randomIndex], newArray[currentIndex]];
        }
        return newArray;
    };
    
    const masterSuggestionList = [
        'Apa itu Web3?', 'Bagaimana cara kerja blockchain?', 'Apa itu cryptocurrency?',
        'Apa perbedaan Web2 dan Web3?', 'Apa itu NFT?', 'Apa itu dApp?',
        'Apa itu DAO?', 'Apa itu DeFi?', 'Apa itu smart contract?',
        'Apa itu mining?', 'Apa itu staking?', 'Apa perbedaan Coin vs Token?',
        'Apa itu wallet crypto?', 'Apa itu gas fee?', 'Apa itu metaverse?'
    ];

    const generateNewSuggestions = (botReply, lastQuestion, currentSuggestions) => {
        let freshSuggestions = masterSuggestionList.filter(s => s !== lastQuestion);
        return shuffleArray(freshSuggestions).slice(0, 4);
    };

    const sendMessage = async (messageText) => {
        const userMessage = messageText || input;
        if (!userMessage.trim()) return;
        
        setMessages(prev => [...prev, { role: 'user', content: userMessage, visual: null }]);
        setInput('');
        setIsLoading(true);
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

            botReply = botReply.replace(/\*\*(.*?)\*\*/g, '$1'); 
            botReply = botReply.replace(/\*(.*?)\*/g, '$1');   
            botReply = botReply.replace(/`([^`]+)`/g, '$1'); 
            botReply = botReply.replace(/^(#+\s*)/gm, ''); 
            botReply = botReply.replace(/Analogi:/gi, '');
            botReply = botReply.replace(/Contoh:/gi, '');
            botReply = botReply.replace(/\n/g, '<br />');

            let visual = generateVisual(userMessage);
            
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: botReply,
                visual: visual 
            }]);
            
            const newSuggestions = generateNewSuggestions(botReply, userMessage, suggestions);
            setSuggestions(newSuggestions);
            
        } catch (error) {
            console.error(error); 
            setMessages(prev => [...prev, { 
                role: 'assistant', 
                content: `❌ Maaf, terjadi kesalahan: ${error.message}. Coba refresh halaman.`,
                visual: null 
            }]);
            setSuggestions(topicSuggestionMap['Umum']);
        } finally {
            setIsLoading(false);
        }
    };

    const handleTopicChange = (topic) => {
        setIsSidebarOpen(false);
        setActiveTopic(topic);
        
        if (topicSuggestionMap[topic]) {
            setMessages(prev => [...prev, {
                role: 'assistant',
                content: `Oke! Mari kita fokus membahas ${topic}.`,
                visual: generateVisual(topic)
            }]);
            setSuggestions(topicSuggestionMap[topic]);
        } else {
            sendMessage(`Apa itu ${topic}?`);
        }
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
        <div className="flex flex-col h-screen bg-gradient-to-br from-slate-50 to-gray-100">
            {isSidebarOpen && (
                <div 
                    className="lg:hidden fixed inset-0 bg-black bg-opacity-50 z-40"
                    onClick={() => setIsSidebarOpen(false)}
                ></div>
            )}

            <div className={`fixed left-0 top-0 w-80 h-screen bg-gradient-to-b from-white to-slate-50 border-r border-gray-200 p-6 z-50 transition-transform duration-300 ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'} shadow-2xl overflow-y-auto scrollbar-hide`}>
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-4">
                        <div className="flex items-center gap-3">
                            <div className="w-12 h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg glow floating">
                                <Sparkles />
                            </div>
                            <div>
                                <h1 className="font-black text-xl gradient-text">Web3 Hub</h1>
                                <p className="text-xs text-gray-500 font-medium">Learning Center</p>
                            </div>
                        </div>
                        <button 
                            className="lg:hidden text-gray-500 hover:text-gray-700"
                            onClick={() => setIsSidebarOpen(false)}
                        >
                            <X />
                        </button>
                    </div>
                    <p className="text-xs text-gray-600 bg-gradient-to-r from-purple-50 to-blue-50 p-3 rounded-xl border border-purple-100">
                        💡 Asisten AI untuk belajar konsep Web3 dengan mudah dan menyenangkan!
                    </p>
                </div>
                
                <div className="space-y-2">
                    <SidebarSubmenu
                        title="Topik Utama"
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
                        title="Dimensi Literasi"
                        icon="📚"
                        items={['Akses Informasi', 'Evaluasi Informasi', 'Literasi Ekonomi', 'Literasi Hukum', 'Literasi Risiko']}
                        onTopicChange={handleTopicChange}
                    />
                </div>

                <div className="mt-8 p-4 bg-gradient-to-br from-purple-100 to-blue-100 rounded-2xl border border-purple-200">
                    <div className="text-sm font-bold text-purple-800 mb-2">🚀 Tips Belajar</div>
                    <div className="text-xs text-purple-700">Mulai dari dasar, jangan ragu bertanya, dan eksplorasi topik yang menarik untukmu!</div>
                </div>
            </div>

            <div className="flex-1 flex flex-col lg:ml-80">
                <div className="glass-effect border-b border-white border-opacity-30 p-4 shadow-lg">
                    <div className="flex items-center justify-between">
                        <button 
                            className="lg:hidden text-purple-600 hover:text-purple-700 transition-colors"
                            onClick={() => setIsSidebarOpen(true)}
                        >
                            <Menu />
                        </button>
                        <div className="flex items-center gap-3 lg:gap-4">
                            <div className="w-10 h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center shadow-lg glow floating">
                                <Sparkles />
                            </div>
                            <div>
                                <h1 className="font-black text-lg lg:text-xl gradient-text">Web3 Learning Hub</h1>
                                <p className="text-xs text-gray-600 font-medium">Asisten belajar konsep Web3 🚀</p>
                            </div>
                        </div>
                        <div className="hidden md:flex items-center gap-2 bg-white bg-opacity-60 px-4 py-2 rounded-full shadow-sm">
                            <span className="text-xs font-semibold text-gray-600">Topik:</span>
                            <span className="text-xs font-bold text-purple-600">{activeTopic}</span>
                        </div>
                    </div>
                </div>

                <div className="flex-1 overflow-y-auto scrollbar-hide bg-gradient-to-b from-white via-slate-50 to-gray-100">
                    <div className="max-w-4xl mx-auto px-4 py-6 space-y-6">
                        {messages.map((msg, idx) => (
                            <div key={idx} className={`message-enter flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                                {msg.role === 'assistant' && (
                                    <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-3 flex-shrink-0 shadow-lg glow">
                                        <Sparkles />
                                    </div>
                                )}
                                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-100 shadow-md'} rounded-3xl p-5 hover:shadow-xl transition-all`}>
                                    
                                    <div className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white font-medium' : 'text-gray-800'}`}>
                                        {msg.role === 'user' 
                                            ? msg.content 
                                            : <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                                        }
                                    </div>

                                    {msg.visual && msg.visual}
                                </div>
                                {msg.role === 'user' && (
                                    <div className="w-10 h-10 bg-gradient-to-br from-gray-200 to-gray-300 rounded-2xl flex items-center justify-center ml-3 flex-shrink-0 shadow-md">
                                        <span className="text-lg">👤</span>
                                    </div>
                                )}
                            </div>
                        ))}
                        
                        {isLoading && (
                            <div className="flex justify-start message-enter">
                                <div className="w-10 h-10 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 rounded-2xl flex items-center justify-center mr-3 shadow-lg glow">
                                    <Sparkles />
                                </div>
                                <div className="bg-white border-2 border-gray-100 rounded-3xl p-5 shadow-md">
                                    <Loader />
                                </div>
                            </div>
                        )}
                        <div ref={messagesEndRef} />
                    </div>
                </div>

                {!isLoading && suggestions.length > 0 && (
                    <div className="glass-effect border-t border-white border-opacity-30 px-4 py-4 shadow-lg">
                        <div className="max-w-4xl mx-auto">
                            <div className="flex items-center gap-2 mb-3">
                                <span className="text-sm font-bold text-purple-600">💡</span>
                                <div className="text-xs font-bold text-gray-700">
                                    {activeTopic === 'Umum' ? 'Pertanyaan yang mungkin kamu suka:' : `Pertanyaan tentang ${activeTopic}:`}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-2">
                                {suggestions.map((suggestion, idx) => (
                                    <button
                                        key={idx}
                                        onClick={() => handleSuggestionClick(suggestion)}
                                        className="bg-white hover:bg-gradient-to-r hover:from-purple-50 hover:to-blue-50 border-2 border-gray-200 hover:border-purple-300 text-gray-700 hover:text-purple-600 px-4 py-2.5 rounded-2xl text-xs font-semibold transition-all shadow-sm hover:shadow-md hover:scale-105"
                                    >
                                        {suggestion}
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                )}

                <div className="glass-effect border-t border-white border-opacity-30 px-4 py-5 shadow-2xl">
                    <div className="max-w-4xl mx-auto">
                        <form onSubmit={handleFormSubmit} className="relative">
                            <input
                                type="text"
                                value={input}
                                onChange={(e) => setInput(e.target.value)}
                                placeholder="Tanyakan sesuatu tentang Web3... 💬"
                                className="w-full bg-white border-2 border-gray-200 focus:border-purple-400 rounded-3xl pl-6 pr-16 py-4 text-sm focus:outline-none focus:ring-4 focus:ring-purple-100 transition-all placeholder-gray-400 font-medium shadow-md"
                                disabled={isLoading}
                            />
                            <button
                                type="submit"
                                disabled={isLoading || !input.trim()}
                                className="absolute right-2 top-1/2 -translate-y-1/2 bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 hover:from-purple-600 hover:via-purple-700 hover:to-blue-700 disabled:opacity-40 disabled:cursor-not-allowed text-white p-3 rounded-2xl transition-all shadow-lg hover:shadow-xl hover:scale-105 glow"
                            >
                                {isLoading ? <Loader /> : <Send />}
                            </button>
                        </form>
                        <div className="text-center mt-3">
                            <p className="text-xs text-gray-500 font-medium">⚡ Powered by Ridhwan Arya • Belajar Web3 jadi lebih mudah dan menyenangkan!</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(<Web3Chatbot />);