// File: app.js (Frontend - Revised for Mobile Responsiveness)

const { useState, useRef, useEffect } = React;

// --- ICONS & SVGS ---
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

const SidebarSubmenu = ({ title, items, onTopicChange, icon }) => {
    const [isOpen, setIsOpen] = useState(true);
    
    const ChevronDown = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
    );

    const ChevronRight = () => (
        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="9 18 15 12 9 6"></polyline>
        </svg>
    );

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
                    {isOpen ? <ChevronDown /> : <ChevronRight />}
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

// --- DATA: Topic Suggestions ---
const topicSuggestionMap = {
    'Umum': [
        'Apa itu Web3?',
        'Apa itu Blockchain?',
        'Apa bedanya Coin vs Token?',
        'Apa itu Proof-of-Stake?'
    ],
    // ---LITERASI WEB3  ---
    'Akses Informasi': [
        'Di mana saya bisa belajar Web3 yang valid?',
        'Bagaimana cara mencari info project crypto?',
        'Apa itu Whitepaper?',
        'Rekomendasi website berita Web3?'
    ],
    'Evaluasi Informasi': [
        'Bagaimana cara tahu project scam?',
        'Apa tanda-tanda rug pull?',
        'Kenapa harus DYOR (Do Your Own Research)?',
        'Bagaimana mengecek kredibilitas founder?'
    ],
    'Literasi Ekonomi': [
        'Apa dampak ekonomi dari Blockchain?',
        'Bagaimana cara kerja investasi crypto?',
        'Apa itu Tokenomics?',
        'Apa bedanya investasi saham dan crypto?'
    ],
    'Literasi Hukum': [
        'Apakah crypto legal di Indonesia?',
        'Apa aturan Bappebti soal crypto?',
        'Apa itu pajak crypto?',
        'Perlindungan hukum untuk investor crypto?'
    ],
    'Literasi Risiko': [
        'Apa risiko terbesar di Web3?',
        'Bagaimana agar wallet tidak di-hack?',
        'Apa itu Phishing di crypto?',
        'Risiko volatilitas harga crypto?'
    ],
    // --- EXISTING TOPICS ---
    'Web3': ['Apa perbedaan Web2 dan Web3?', 'Apa keuntungan Web3?', 'Apa itu dApp?', 'Bagaimana cara mulai di Web3?'],
    'Blockchain': ['Bagaimana cara kerja blockchain?', 'Apa itu desentralisasi?', 'Apa itu gas fee?', 'Apa itu Layer 2?'],
    'NFT': ['Bagaimana cara membuat NFT?', 'Apa itu minting?', 'Apa kegunaan NFT selain seni?', 'Di mana orang menjual NFT?'],
    'DeFi': ['Apa itu DeFi?', 'Apa itu liquidity pool?', 'Apa resiko pinjam meminjam di DeFi?', 'Contoh aplikasi DeFi?'],
    'DAO': ['Bagaimana cara kerja DAO?', 'Bagaimana cara bergabung dengan DAO?', 'Apa itu token tata kelola?', 'Contoh DAO terkenal?'],
    'Smart Contract': ['Bagaimana cara kerja smart contract?', 'Apa bahasa pemrograman untuk smart contract?', 'Apakah smart contract aman?', 'Contoh penggunaan smart contract?'],
    'Mining': ['Apa itu Proof-of-Work?', 'Apakah mining boros energi?', 'Apa yang dibutuhkan untuk mining?', 'Kenapa mining sulit?'],
    'Staking': ['Apa itu Proof-of-Stake?', 'Apa bedanya mining dan staking?', 'Apa resiko staking?', 'Bagaimana cara mulai staking?'],
    'Wallet Crypto': ['Bagaimana cara mengamankan wallet?', 'Apa itu seed phrase?', 'Apa bedanya hot vs cold wallet?', 'Contoh aplikasi wallet?'],
    'Coin vs Token': ['Apa contoh Coin?', 'Apa contoh Token?', 'Apa itu tokenomics?', 'Bagaimana token dibuat?']
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


    // --- 1. Definisikan Tema Warna ---
    const themes = {
        purple: { bg: 'bg-gradient-to-br from-purple-50 via-indigo-50 to-blue-50', border: 'border-purple-200', iconBg: 'bg-gradient-to-br from-purple-500 to-indigo-600' },
        green: { bg: 'bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50', border: 'border-green-200', iconBg: 'bg-gradient-to-br from-green-500 to-emerald-600' },
        red: { bg: 'bg-gradient-to-br from-red-50 via-pink-50 to-rose-50', border: 'border-red-200', iconBg: 'bg-gradient-to-br from-red-500 to-pink-600' },
        yellow: { bg: 'bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50', border: 'border-yellow-200', iconBg: 'bg-gradient-to-br from-yellow-500 to-amber-600' },
        cyan: { bg: 'bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50', border: 'border-cyan-200', iconBg: 'bg-gradient-to-br from-cyan-500 to-sky-600' }
    };
    
    // --- 2. Komponen Visual Generik ---
    const GenericVisual = ({ icon, title, description, colorTheme }) => {
         const theme = colorTheme || themes.purple; 
         return (
              <div className={`${theme.bg} p-6 rounded-2xl border-2 ${theme.border} mt-4 shadow-lg`}>
                   <div className="flex items-center gap-3 mb-5">
                        <div className={`w-10 h-10 ${theme.iconBg} rounded-xl flex items-center justify-center shadow-md floating`}>
                             <span className="text-white text-xl">{icon}</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">{title}</h3>
                   </div>
                   <div className="bg-white p-5 rounded-2xl border-2 border-gray-200 shadow-inner">
                        <p className="text-sm text-gray-700 leading-relaxed">{description}</p>
                   </div>
              </div>
         );
    };

    // --- 3. Map Diagram Generik ---
    const visualMap = {
        'dapp': { icon: '📱', title: 'dApp (Aplikasi Terdesentralisasi)', description: 'Seperti aplikasi biasa (contoh: Twitter), tapi berjalan di atas blockchain. Tidak ada satu perusahaan yang mengontrolnya.', theme: themes.purple },
        'dao': { icon: '🏛️', title: 'DAO (Organisasi Otonomi)', description: 'Sebuah organisasi atau "klub" yang diatur oleh kode dan voting. Anggota dengan token bisa ikut menentukan arah organisasi.', theme: themes.green },
        'defi': { icon: '💸', title: 'DeFi (Keuangan Terdesentralisasi)', description: 'Layanan keuangan (pinjam, tabung, tukar) yang dibangun di atas blockchain, tanpa perlu bank tradisional.', theme: themes.cyan },
        'smart contract': { icon: '📜', title: 'Smart Contract', description: 'Sebuah "kontrak" atau perjanjian digital yang ditulis dalam kode. Perjanjian ini otomatis berjalan jika syaratnya terpenuhi.', theme: themes.yellow },
        'layer 2': { icon: 'LAYER 2', title: 'Layer 2 Solution', description: 'Sebuah "jalan tol" yang dibangun di atas blockchain utama (Layer 1) untuk membuat transaksi lebih cepat dan murah.', theme: themes.red },
        'gas fee': { icon: '⛽', title: 'Gas Fee', description: 'Biaya "bensin" yang kamu bayar untuk melakukan transaksi atau menjalankan smart contract di blockchain.', theme: themes.yellow },
        'metaverse': { icon: '🕶️', title: 'Metaverse', description: 'Dunia virtual 3D di mana orang bisa berkumpul, bermain, dan memiliki aset digital (seringkali sebagai NFT).', theme: themes.purple },
        'tokenomics': { icon: '📊', title: 'Tokenomics', description: 'Ilmu ekonomi di balik sebuah token. Ini mengatur suplai, distribusi, dan kegunaan token tersebut.', theme: themes.cyan },
        'seed phrase': { icon: '🤫', title: 'Seed Phrase', description: 'Kumpulan 12 atau 24 kata rahasia yang merupakan "kunci master" dari wallet crypto kamu. JANGAN PERNAH bagikan ini!', theme: themes.red },
        'hot wallet': { icon: '📱', title: 'Hot Wallet', description: 'Wallet crypto yang terhubung ke internet (seperti aplikasi di HP atau ekstensi browser). Mudah dipakai, tapi lebih rentan.', theme: themes.yellow },
        'cold wallet': { icon: '🧊', title: 'Cold Wallet', description: 'Wallet crypto yang tidak terhubung internet (seperti USB). Sangat aman untuk menyimpan aset jangka panjang.', theme: themes.cyan },
        'desentralisasi': { icon: '🌐', title: 'Desentralisasi', description: 'Artinya, tidak ada satu pihak (seperti pemerintah atau perusahaan) yang punya kontrol penuh. Kekuatan disebar ke banyak pengguna.', theme: themes.green },
        'bitcoin': { icon: '₿', title: 'Bitcoin', description: 'Mata uang crypto pertama dan paling terkenal. Diciptakan sebagai "emas digital" dan sistem pembayaran peer-to-peer.', theme: themes.yellow },
        'ethereum': { icon: 'Ξ', title: 'Ethereum', description: 'Bukan cuma koin, Ethereum adalah platform untuk membangun dApp dan smart contract. Koinnya disebut Ether (ETH).', theme: themes.purple },
        'altcoin': { icon: '🪙', title: 'Altcoin', description: 'Singkatan dari "Alternative Coin". Ini adalah sebutan untuk semua cryptocurrency selain Bitcoin.', theme: themes.green },
        'stablecoin': { icon: '💵', title: 'Stablecoin', description: 'Jenis token yang harganya "dipatok" ke aset stabil, biasanya Dolar AS (seperti USDT atau USDC). Nilainya 1:1 dengan dolar.', theme: themes.cyan },
        'minting': { icon: '✨', title: 'Minting (NFT)', description: 'Proses "mencetak" atau mendaftarkan sebuah karya digital (gambar, musik) ke blockchain untuk menjadikannya NFT.', theme: themes.purple },
        'marketplace': { icon: '🛒', title: 'NFT Marketplace', description: 'Tempat jual-beli NFT, seperti "Tokopedia" atau "Shopee" tapi khusus untuk aset digital. Contoh: OpenSea.', theme: themes.cyan },
        'liquidity pool': { icon: '🏊', title: 'Liquidity Pool (DeFi)', description: 'Sekumpulan token yang "dikunci" dalam smart contract di DeFi. Ini dipakai untuk memfasilitasi pertukaran token.', theme: themes.green },
        'yield farming': { icon: '🧑‍🌾', title: 'Yield Farming (DeFi)', description: 'Cara untuk "menanam" crypto kamu di protokol DeFi untuk mendapatkan "panen" berupa token atau bunga tambahan.', theme: themes.yellow },
        'airdrop': { icon: '🪂', title: 'Airdrop', description: 'Distribusi token gratis ke banyak alamat wallet. Biasanya sebagai strategi marketing untuk proyek baru.', theme: themes.purple },
        'hash': { icon: '🔑', title: 'Hash', description: 'Sidik jari digital yang unik. Setiap blok di blockchain punya hash-nya sendiri, yang mengamankan data di dalamnya.', theme: themes.red },
        'node': { icon: '🖥️', title: 'Node (Simpul)', description: 'Komputer yang terhubung ke jaringan blockchain. Node menyimpan dan memvalidasi salinan dari seluruh riwayat transaksi.', theme: themes.cyan },
        'consensus': { icon: '🤝', title: 'Consensus Mechanism', description: 'Aturan main yang disepakati oleh jaringan (seperti Proof-of-Work atau Proof-of-Stake) untuk memvalidasi transaksi.', theme: themes.green },
        'p2p': { icon: '🧑‍🤝‍🧑', title: 'Peer-to-Peer (P2P)', description: 'Jaringan di mana transaksi terjadi langsung antar pengguna, tanpa perantara seperti bank atau server pusat.', theme: themes.purple },
        'solidity': { icon: '👨‍💻', title: 'Solidity', description: 'Bahasa pemrograman paling populer yang digunakan untuk menulis smart contract, terutama di blockchain Ethereum.', theme: themes.yellow },
        'gas limit': { icon: '⛽', title: 'Gas Limit', description: 'Jumlah "bensin" maksimum yang kamu rela bayar untuk sebuah transaksi. Ini mencegah error yang menghabiskan semua koinmu.', theme: themes.red },
        'gwei': { icon: '💧', title: 'Gwei', description: 'Satuan kecil dari Ether (ETH) yang digunakan untuk mengukur harga gas fee. Seperti "sen" untuk "rupiah".', theme: themes.cyan },
        'private key': { icon: '🗝️', title: 'Private Key', description: 'Kunci rahasia (seperti password) yang membuktikan kepemilikan atas wallet-mu. JANGAN PERNAH bagikan ini.', theme: themes.red },
        'public key': { icon: '📬', title: 'Public Key / Address', description: 'Alamat wallet-mu yang bisa kamu bagikan ke orang lain untuk menerima koin. Seperti "nomor rekening" bank.', theme: themes.green },
        'oracle': { icon: '🔮', title: 'Blockchain Oracle', description: 'Layanan pihak ketiga yang menyediakan data dari "dunia nyata" (seperti cuaca atau harga saham) ke dalam smart contract.', theme: themes.purple },
        'halving': { icon: '✂️', title: 'Bitcoin Halving', description: 'Peristiwa yang terjadi sekitar 4 tahun sekali di mana imbalan (reward) untuk mining Bitcoin dipotong setengah.', theme: themes.yellow },
        'hard fork': { icon: '🍴', title: 'Hard Fork', description: 'Perubahan besar pada aturan blockchain yang tidak kompatibel dengan versi lama. Ini bisa membelah blockchain menjadi dua.', theme: themes.red },
        'soft fork': { icon: '🥄', title: 'Soft Fork', description: 'Perubahan pada aturan blockchain yang masih kompatibel dengan versi lama. Seperti update software biasa.', theme: themes.green },
        'kyc': { icon: '🆔', title: 'KYC (Know Your Customer)', description: 'Proses di mana platform (biasanya CEX) memverifikasi identitas kamu (pakai KTP/SIM) untuk mematuhi regulasi.', theme: themes.cyan },
        'cex': { icon: '🏦', title: 'CEX (Centralized Exchange)', description: 'Platform jual-beli crypto yang terpusat, seperti bank. Contoh: Binance, Tokocrypto, Indodax.', theme: themes.cyan },
        'dex': { icon: '⚖️', title: 'DEX (Decentralized Exchange)', description: 'Platform jual-beli crypto yang berjalan di atas blockchain (pakai smart contract), tidak ada bos pusat. Contoh: Uniswap.', theme: themes.purple },
        'fud': { icon: '😨', title: 'FUD (Fear, Uncertainty, Doubt)', description: 'Istilah untuk penyebaran berita negatif atau rumor untuk membuat orang panik dan menjual aset mereka.', theme: themes.red },
        'fomo': { icon: '🤩', title: 'FOMO (Fear Of Missing Out)', description: 'Rasa takut ketinggalan. Ini sering membuat orang membeli koin saat harganya sudah tinggi karena ikut-ikutan.', theme: themes.green },
        'hodl': { icon: '🙌', title: 'HODL', description: 'Berasal dari salah ketik "Hold". Artinya menyimpan crypto kamu dalam jangka waktu lama, tidak peduli harga naik atau turun.', theme: themes.yellow },
        'shill': { icon: '📢', title: 'Shill', description: 'Tindakan mempromosikan sebuah koin atau proyek secara berlebihan (seringkali karena dibayar) agar orang lain ikut membeli.', theme: themes.red },
        'rug pull': { icon: '🏃‍♂️', title: 'Rug Pull', description: 'Penipuan di mana pembuat proyek crypto tiba-tiba kabur membawa semua uang investor.', theme: themes.red },
        'dyor': { icon: '🧐', title: 'DYOR (Do Your Own Research)', description: 'Saran untuk selalu melakukan riset sendiri sebelum berinvestasi di proyek crypto apapun.', theme: themes.green }
    };


    // --- 4. Fungsi generateVisual dengan Diagram Baru ---
    const generateVisual = (topic) => {
        const lowerTopic = topic.toLowerCase();
        
        // --- VISUAL BARU: SMART CONTRACT (Logika Otomatis) ---
        if (lowerTopic.includes('smart contract')) {
            return (
                <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">📜</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Logika Smart Contract</h3>
                    </div>
                    <div className="flex flex-col gap-2">
                        {/* Step 1: Syarat */}
                        <div className="flex items-center bg-white p-3 rounded-xl border border-yellow-200 shadow-sm">
                            <div className="w-8 h-8 bg-gray-100 rounded-full flex items-center justify-center mr-3 text-xs font-bold">IF</div>
                            <div className="text-xs text-gray-600">
                                <span className="font-bold text-gray-800">Syarat Terpenuhi</span>
                                <br/>(Contoh: Barang sampai)
                            </div>
                            <div className="ml-auto text-xl">📦</div>
                        </div>
                        
                        <div className="flex justify-center text-yellow-500 text-xl">⬇️</div>

                        {/* Step 2: Proses Otomatis */}
                        <div className="flex items-center bg-gradient-to-r from-yellow-100 to-amber-100 p-3 rounded-xl border-2 border-yellow-300 shadow-md">
                            <div className="w-8 h-8 bg-yellow-500 text-white rounded-full flex items-center justify-center mr-3 text-lg animate-spin-slow">⚙️</div>
                            <div className="text-xs text-gray-800 font-bold">
                                Kode Berjalan Otomatis...
                            </div>
                        </div>

                        <div className="flex justify-center text-yellow-500 text-xl">⬇️</div>

                        {/* Step 3: Hasil */}
                        <div className="flex items-center bg-white p-3 rounded-xl border border-yellow-200 shadow-sm">
                            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-full flex items-center justify-center mr-3 text-xs font-bold">THEN</div>
                            <div className="text-xs text-gray-600">
                                <span className="font-bold text-gray-800">Eksekusi Hasil</span>
                                <br/>(Uang cair ke penjual)
                            </div>
                            <div className="ml-auto text-xl">💸</div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: DeFi (Bank vs DeFi) ---
        if (lowerTopic.includes('defi')) {
            return (
                <div className="bg-gradient-to-br from-cyan-50 via-sky-50 to-blue-50 p-6 rounded-2xl border-2 border-cyan-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-sky-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">💸</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">CeFi (Bank) vs DeFi</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Tradisional */}
                        <div className="bg-gray-50 p-3 rounded-xl border border-gray-200 text-center opacity-70">
                            <div className="text-xs font-bold text-gray-500 mb-2">Tradisional</div>
                            <div className="text-2xl mb-1">🏦</div>
                            <div className="text-[10px] text-gray-500 mb-2">Bank sebagai Perantara</div>
                            <div className="flex justify-center items-center gap-1 text-[10px] bg-red-100 text-red-600 py-1 rounded">
                                <span>❌</span> Ribet & Lama
                            </div>
                        </div>
                        {/* DeFi */}
                        <div className="bg-white p-3 rounded-xl border-2 border-cyan-400 text-center shadow-md transform sm:scale-105">
                            <div className="text-xs font-bold text-cyan-600 mb-2">DeFi</div>
                            <div className="text-2xl mb-1">📱↔️📱</div>
                            <div className="text-[10px] text-gray-500 mb-2">Langsung (P2P)</div>
                            <div className="flex justify-center items-center gap-1 text-[10px] bg-green-100 text-green-600 py-1 rounded font-bold">
                                <span>✅</span> Cepat & Global
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: DAO (Struktur Organisasi) ---
        if (lowerTopic.includes('dao')) {
            return (
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🏛️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Struktur DAO</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* Perusahaan Biasa */}
                        <div className="flex items-center gap-4 opacity-50 grayscale">
                            <div className="flex flex-col items-center">
                                <span className="text-2xl">👔</span>
                                <span className="text-[10px] font-bold">Boss</span>
                            </div>
                            <div className="h-0.5 w-full bg-gray-300"></div>
                            <div className="text-xs text-gray-500 font-mono">Top-Down</div>
                        </div>

                        {/* DAO */}
                        <div className="bg-white p-4 rounded-xl border-2 border-green-400 shadow-md relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-green-400"></div>
                            <div className="flex justify-center items-center gap-2 mb-2">
                                <span className="text-xl">🗳️</span>
                                <span className="text-sm font-bold text-green-700">Voting Komunitas</span>
                            </div>
                            <div className="flex justify-between items-center px-4">
                                <div className="text-2xl">👤</div>
                                <div className="text-2xl">👤</div>
                                <div className="text-2xl">👤</div>
                                <div className="text-2xl">👤</div>
                            </div>
                            <p className="text-[10px] text-center mt-2 text-gray-500">Semua pemegang token punya suara.</p>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: Layer 2 (Jalan Tol) ---
        if (lowerTopic.includes('layer 2') || lowerTopic.includes('l2')) {
            return (
                <div className="bg-gradient-to-br from-red-50 via-rose-50 to-pink-50 p-6 rounded-2xl border-2 border-red-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-red-500 to-rose-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🛣️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Analogi Layer 2</h3>
                    </div>
                    
                    {/* Layer 1 - Macet */}
                    <div className="mb-3">
                        <div className="flex justify-between text-xs text-red-800 font-bold mb-1">
                            <span>Layer 1 (Ethereum)</span>
                            <span>Macet & Mahal 😫</span>
                        </div>
                        <div className="bg-red-200 h-8 rounded-lg flex items-center px-2 gap-1 overflow-hidden relative">
                             <div className="absolute inset-0 bg-red-200 opacity-50"></div>
                             <span className="text-lg relative z-10">🚗</span>
                             <span className="text-lg relative z-10">🚙</span>
                             <span className="text-lg relative z-10">🚛</span>
                             <span className="text-lg relative z-10">🚌</span>
                             <span className="text-lg relative z-10">🏎️</span>
                        </div>
                    </div>

                    {/* Layer 2 - Jalan Tol */}
                    <div>
                        <div className="flex justify-between text-xs text-green-700 font-bold mb-1">
                            <span>Layer 2 (Arbitrum/Optimism)</span>
                            <span>Cepat & Murah 🚀</span>
                        </div>
                        <div className="bg-green-100 h-8 rounded-lg flex items-center justify-between px-2 border border-green-300">
                             <span className="text-lg transform translate-x-20 transition-transform duration-1000">🏎️💨</span>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: Gas Fee (Bensin) ---
        if (lowerTopic.includes('gas fee') || lowerTopic.includes('biaya gas')) {
            return (
                <div className="bg-gradient-to-br from-orange-50 via-amber-50 to-yellow-50 p-6 rounded-2xl border-2 border-orange-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">⛽</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Gas Fee</h3>
                    </div>
                    <div className="flex flex-col items-center">
                        <div className="flex items-center justify-center gap-4 w-full">
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-1">🚗</span>
                                <span className="text-[10px] font-bold text-gray-500">Transaksi</span>
                            </div>
                            <div className="text-2xl text-gray-400">+</div>
                            <div className="flex flex-col items-center">
                                <span className="text-4xl mb-1">⛽</span>
                                <span className="text-[10px] font-bold text-gray-500">Bensin (ETH)</span>
                            </div>
                        </div>
                        <div className="w-full h-0.5 bg-gray-300 my-3"></div>
                        <div className="bg-white p-3 rounded-xl border border-orange-300 w-full text-center shadow-sm">
                            <div className="text-xs text-gray-600">
                                Tanpa bensin, mobil tidak jalan. <br/>
                                <span className="font-bold text-orange-600">Jaringan macet = Bensin makin mahal.</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }



        // --- VISUAL 1: AKSES INFORMASI (Information Access) ---
        if (lowerTopic.includes('akses informasi') || lowerTopic.includes('mencari informasi')) {
            return (
                <div className="bg-gradient-to-br from-blue-50 via-sky-50 to-cyan-50 p-6 rounded-2xl border-2 border-blue-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-sky-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🔍</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Akses Informasi</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack vertically on mobile using Grid */}
                    <div className="grid grid-cols-2 sm:flex sm:justify-between items-center gap-4 bg-white p-4 rounded-xl border border-gray-200">
                        <div className="flex flex-col items-center">
                            <div className="text-3xl mb-1">📰</div>
                            <span className="text-[10px] font-bold text-gray-600">Berita</span>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="text-3xl mb-1">📑</div>
                            <span className="text-[10px] font-bold text-gray-600">Whitepaper</span>
                        </div>
                         <div className="flex flex-col items-center">
                            <div className="text-3xl mb-1">🐦</div>
                            <span className="text-[10px] font-bold text-gray-600">Komunitas</span>
                        </div>
                        {/* Hidden arrow on mobile */}
                        <div className="hidden sm:block text-2xl text-blue-500">→</div>
                        <div className="flex flex-col items-center bg-blue-100 p-2 rounded-lg col-span-2 sm:col-span-1">
                            <span className="text-xl">🧠</span>
                            <span className="text-[10px] font-bold text-blue-700">Wawasan</span>
                        </div>
                    </div>
                     <p className="text-xs text-gray-600 mt-3 italic text-center">"Kemampuan menemukan sumber terpercaya tentang Blockchain & Web3."</p>
                </div>
            );
        }

        // --- VISUAL 2: EVALUASI INFORMASI (Information Evaluation) ---
        if (lowerTopic.includes('evaluasi informasi') || lowerTopic.includes('validasi') || lowerTopic.includes('scam')) {
            return (
                <div className="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-pink-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🧐</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Evaluasi Informasi</h3>
                    </div>
                    <div className="flex flex-col gap-3">
                        <div className="flex items-center gap-3 bg-red-50 p-3 rounded-lg border border-red-200 opacity-50">
                            <span className="text-xl">❌</span>
                            <div className="text-xs text-gray-500 line-through">"Pasti untung 1000%!"</div>
                        </div>
                         <div className="flex items-center gap-3 bg-green-50 p-3 rounded-lg border border-green-200 shadow-sm transform scale-105">
                            <span className="text-xl">✅</span>
                            <div className="text-xs font-bold text-green-800">"Cek Whitepaper & Tim Developer"</div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3 italic text-center">"Kemampuan membedakan fakta vs hype/penipuan."</p>
                </div>
            );
        }

        // --- VISUAL 3: LITERASI EKONOMI (Economic Literacy) ---
        if (lowerTopic.includes('literasi ekonomi') || lowerTopic.includes('dampak ekonomi')) {
            return (
                <div className="bg-gradient-to-br from-emerald-50 via-green-50 to-lime-50 p-6 rounded-2xl border-2 border-emerald-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-green-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">📈</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Literasi Ekonomi</h3>
                    </div>
                    <div className="flex justify-around items-end h-24 bg-white p-4 rounded-xl border border-emerald-100">
                        <div className="w-8 bg-gray-200 h-[40%] rounded-t-md relative group">
                            <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100">Tradisional</span>
                        </div>
                        <div className="w-8 bg-emerald-300 h-[60%] rounded-t-md relative group">
                             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs opacity-0 group-hover:opacity-100">Digital</span>
                        </div>
                        <div className="w-8 bg-emerald-500 h-[85%] rounded-t-md relative group animate-pulse">
                             <span className="absolute -top-6 left-1/2 -translate-x-1/2 text-xs font-bold text-emerald-700">Web3</span>
                        </div>
                    </div>
                    <div className="flex justify-between mt-2 px-2 text-[10px] text-gray-500 font-mono">
                        <span>Aset Fisik</span>
                        <span>Tokenisasi</span>
                    </div>
                    <p className="text-xs text-gray-600 mt-3 italic text-center">"Memahami potensi & nilai ekonomi baru."</p>
                </div>
            );
        }

        // --- VISUAL 4: LITERASI HUKUM (Legal Literacy) ---
        if (lowerTopic.includes('literasi hukum') || lowerTopic.includes('regulasi') || lowerTopic.includes('legal')) {
            return (
                <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 rounded-2xl border-2 border-slate-300 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">⚖️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Literasi Hukum</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack vertical on mobile */}
                    <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-center w-full sm:w-24">
                            <div className="text-2xl mb-1">🏛️</div>
                            <div className="text-[10px] font-bold">Regulator</div>
                            <div className="text-[8px] text-gray-500">(Bappebti/OJK)</div>
                        </div>
                        {/* Rotate arrow on mobile */}
                        <div className="text-xl text-gray-400 transform rotate-90 sm:rotate-0">↔️</div>
                        <div className="bg-white p-3 rounded-xl border border-gray-200 shadow-sm text-center w-full sm:w-24">
                            <div className="text-2xl mb-1">👤</div>
                            <div className="text-[10px] font-bold">Pengguna</div>
                            <div className="text-[8px] text-gray-500">(Hak & Pajak)</div>
                        </div>
                    </div>
                    <p className="text-xs text-gray-600 mt-3 italic text-center">"Kesadaran akan aturan main dan perlindungan hukum."</p>
                </div>
            );
        }

        // --- VISUAL 5: LITERASI RISIKO (Risk Literacy) ---
        if (lowerTopic.includes('literasi risiko') || lowerTopic.includes('keamanan') || lowerTopic.includes('risk')) {
            return (
                <div className="bg-gradient-to-br from-orange-50 via-red-50 to-rose-50 p-6 rounded-2xl border-2 border-orange-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🛡️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Literasi Risiko</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        <div className="bg-white p-3 rounded-lg border-l-4 border-red-500 shadow-sm">
                            <div className="text-xs font-bold text-red-600 mb-1">⚠️ Ancaman</div>
                            <ul className="text-[10px] text-gray-600 list-disc ml-3">
                                <li>Phishing</li>
                                <li>Hack Wallet</li>
                                <li>Volatilitas</li>
                            </ul>
                        </div>
                        <div className="bg-white p-3 rounded-lg border-l-4 border-green-500 shadow-sm">
                            <div className="text-xs font-bold text-green-600 mb-1">🔒 Solusi</div>
                            <ul className="text-[10px] text-gray-600 list-disc ml-3">
                                <li>Cold Wallet</li>
                                <li>Jaga Seed Phrase</li>
                                <li>Verifikasi URL</li>
                            </ul>
                        </div>
                    </div>
                     <p className="text-xs text-gray-600 mt-3 italic text-center">"Waspada dan tahu cara melindungi aset."</p>
                </div>
            );
        }

        if (lowerTopic.includes('blockchain') || lowerTopic.includes('block chain')) {
            return (
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">⛓️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Struktur Blockchain</h3>
                    </div>
                    {/* Scrollable on mobile, okay as is */}
                    <div className="flex items-center gap-2 overflow-x-auto pb-3 scrollbar-hide">
                        {[1, 2, 3, 4].map((block) => (
                            <div key={block} className="flex items-center">
                                <div className="bg-white border-2 border-blue-400 p-4 rounded-xl min-w-[120px] shadow-md hover:shadow-lg transition-all hover:scale-105">
                                    <div className="font-bold text-sm text-gray-800 mb-2">Block {block}</div>
                                    <div className="text-xs mt-2 text-gray-600 font-mono">Hash: {Math.random().toString(36).substr(2, 6)}</div>
                                    <div className="text-xs text-gray-600 font-mono">Prev: {block > 1 ? Math.random().toString(36).substr(2, 6) : '000000'}</div>
                                </div>
                                {block < 4 && (
                                    <div className="text-blue-500 text-2xl mx-2 font-bold">→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            );
        }
        
        if (lowerTopic.includes('web3') || lowerTopic.includes('web 2')) {
            return (
                <div className="bg-gradient-to-br from-emerald-50 via-teal-50 to-cyan-50 p-6 rounded-2xl border-2 border-emerald-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-emerald-500 to-teal-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🌐</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Evolusi Web</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-md flex flex-col items-center sm:block text-center sm:text-left">
                            <div className="text-4xl mb-3 text-center">📄</div>
                            <div className="font-bold text-sm text-blue-600 mb-1 text-center">Web 1.0</div>
                            <div className="text-xs text-gray-500 mb-2 text-center font-semibold">Read-Only</div>
                            <div className="text-xs text-center text-gray-600">Static Pages</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all hover:shadow-md flex flex-col items-center sm:block text-center sm:text-left">
                            <div className="text-4xl mb-3 text-center">💬</div>
                            <div className="font-bold text-sm text-purple-600 mb-1 text-center">Web 2.0</div>
                            <div className="text-xs text-gray-500 mb-2 text-center font-semibold">Read-Write</div>
                            <div className="text-xs text-center text-gray-600">Social Media</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-4 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105 flex flex-col items-center sm:block text-center sm:text-left">
                            <div className="text-4xl mb-3 text-center">🔐</div>
                            <div className="font-bold text-sm mb-1 text-center">Web 3.0</div>
                            <div className="text-xs opacity-90 mb-2 text-center font-semibold">Read-Write-Own</div>
                            <div className="text-xs text-center">Decentralized</div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('mining') || lowerTopic.includes('proof-of-work')) {
            return (
                <div className="bg-gradient-to-br from-amber-50 via-orange-50 to-yellow-50 p-6 rounded-2xl border-2 border-amber-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-amber-500 to-orange-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">⛏️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Proof-of-Work Mining</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack vertically on mobile with rotated arrows */}
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-3">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">💻</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Komputer</div>
                        </div>
                        <div className="text-3xl text-amber-500 transform rotate-90 sm:rotate-0">→</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">🧮</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Solve Puzzle</div>
                        </div>
                        <div className="text-3xl text-amber-500 transform rotate-90 sm:rotate-0">→</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-amber-500 to-orange-600 rounded-2xl flex items-center justify-center shadow-lg mb-3 hover:scale-110 transition-all glow">
                                <span className="text-3xl">🏆</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Reward</div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('proof-of-stake') || lowerTopic.includes('staking')) {
            return (
                <div className="bg-gradient-to-br from-green-50 via-emerald-50 to-teal-50 p-6 rounded-2xl border-2 border-green-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-green-500 to-emerald-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🔒</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Proof-of-Stake</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack vertically on mobile with rotated arrows */}
                    <div className="flex flex-col sm:flex-row items-center justify-around gap-3">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">💰</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Koin Anda</div>
                        </div>
                        <div className="text-3xl text-green-500 transform rotate-90 sm:rotate-0">→</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Stake/Lock</div>
                        </div>
                        <div className="text-3xl text-green-500 transform rotate-90 sm:rotate-0">→</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-600 rounded-2xl flex items-center justify-center shadow-lg mb-3 hover:scale-110 transition-all glow">
                                <span className="text-3xl">🎁</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Reward</div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('coin') && lowerTopic.includes('token')) {
            return (
                <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">💎</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Coin vs Token</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-yellow-100 to-amber-100 p-5 rounded-2xl border-2 border-yellow-400 shadow-md hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-4xl mb-3 text-center">🪙</div>
                            <div className="font-bold text-center mb-2 text-lg">COIN</div>
                            <div className="text-xs text-gray-700 text-center mb-3 font-semibold">Bitcoin, Ethereum</div>
                            <div className="text-xs text-gray-600 text-center">Punya blockchain sendiri • Seperti "uang sungguhan"</div>
                        </div>
                        <div className="bg-gradient-to-br from-blue-100 to-indigo-100 p-5 rounded-2xl border-2 border-blue-400 shadow-md hover:shadow-xl transition-all hover:scale-105">
                            <div className="text-4xl mb-3 text-center">🎟️</div>
                            <div className="font-bold text-center mb-2 text-lg">TOKEN</div>
                            <div className="text-xs text-gray-700 text-center mb-3 font-semibold">SHIBA, UNI, LINK</div>
                            <div className="text-xs text-gray-600 text-center">Menumpang blockchain • Seperti "voucher"</div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('nft')) {
            return (
                <div className="bg-gradient-to-br from-pink-50 via-purple-50 to-fuchsia-50 p-6 rounded-2xl border-2 border-pink-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-pink-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🎨</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">NFT (Non-Fungible Token)</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div className="bg-gradient-to-br from-purple-500 to-pink-600 p-5 rounded-2xl text-white shadow-xl hover:shadow-2xl transition-all hover:scale-105">
                            <div className="text-4xl mb-3 text-center">🖼️</div>
                            <div className="font-bold text-sm text-center mb-1">Digital Art #1234</div>
                            <div className="text-xs mt-3 opacity-90 text-center font-semibold">Unique & Can't be Duplicated</div>
                        </div>
                        <div className="bg-white p-5 rounded-2xl border-2 border-purple-300 shadow-md">
                            <div className="text-xs text-gray-500 mb-2 font-semibold">Token ID:</div>
                            <div className="font-mono text-xs break-all text-gray-700 bg-gray-50 p-2 rounded">0x7a8f...9c2d</div>
                            <div className="text-xs text-green-600 mt-3 font-bold flex items-center justify-center gap-1">
                                <span>✓</span>
                                <span>Verified on Blockchain</span>
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('wallet') || lowerTopic.includes('dompet')) {
            return (
                <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-cyan-50 p-6 rounded-2xl border-2 border-indigo-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">👛</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Crypto Wallet</h3>
                    </div>
                    <div className="bg-white p-5 rounded-2xl border-2 border-indigo-300 shadow-lg">
                        <div className="flex items-center justify-between mb-4">
                            <div className="font-bold text-lg">My Wallet</div>
                            <div className="text-3xl">💼</div>
                        </div>
                        <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 rounded-xl mb-4 border border-gray-200">
                            <div className="text-xs text-gray-500 mb-2 font-semibold">Wallet Address:</div>
                            <div className="font-mono text-xs break-all text-gray-700 font-medium">0x742d35Cc6634C0532925a3b844Bc9e7595f0bEb</div>
                        </div>
                        <div className="flex gap-3">
                            <div className="flex-1 bg-gradient-to-r from-blue-500 to-blue-600 text-white py-3 rounded-xl text-center text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">Send 📤</div>
                            <div className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl text-center text-sm font-bold shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">Receive 📥</div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('private key') || lowerTopic.includes('public key') || lowerTopic.includes('kunci rahasia')) {
            return (
                <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 rounded-2xl border-2 border-slate-300 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-slate-600 to-gray-700 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🔑</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Analogi Wallet</h3>
                    </div>
                    <div className="flex flex-col gap-4">
                        {/* Public Key */}
                        <div className="bg-green-50 p-4 rounded-xl border-l-4 border-green-500 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-green-700">Public Key (Alamat)</span>
                                <span className="text-xl">📬</span>
                            </div>
                            <p className="text-[10px] text-gray-600">Seperti <strong>Alamat Rumah/Email</strong>. Boleh disebar ke siapa saja untuk menerima kiriman.</p>
                            <div className="mt-2 bg-white px-2 py-1 rounded border border-green-200 text-[10px] font-mono text-gray-500 truncate">
                                0x71C...9A2 (Boleh Share ✅)
                            </div>
                        </div>

                        {/* Private Key */}
                        <div className="bg-red-50 p-4 rounded-xl border-l-4 border-red-500 shadow-sm">
                            <div className="flex justify-between items-center mb-2">
                                <span className="text-xs font-bold text-red-700">Private Key (Kunci)</span>
                                <span className="text-xl">🗝️</span>
                            </div>
                            <p className="text-[10px] text-gray-600">Seperti <strong>Kunci Brankas/Password</strong>. Jika orang lain tahu, hartamu hilang selamanya.</p>
                            <div className="mt-2 bg-white px-2 py-1 rounded border border-red-200 text-[10px] font-mono text-red-500 blur-sm hover:blur-none transition-all cursor-pointer">
                                5Kb8...zQ1 (JANGAN SHARE ❌)
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

       
        if (lowerTopic.includes('bull') || lowerTopic.includes('bear') || lowerTopic.includes('market')) {
            return (
                <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-sky-50 p-6 rounded-2xl border-2 border-indigo-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">📈</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Kondisi Pasar</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                        {/* Bull Market */}
                        <div className="bg-white p-3 rounded-xl border-2 border-green-400 shadow-md hover:scale-105 transition-transform">
                            <div className="text-4xl mb-2 text-center animate-bounce">🐂</div>
                            <div className="text-sm font-bold text-green-600 text-center uppercase">Bull Market</div>
                            <div className="h-1 w-full bg-gray-100 my-2 rounded overflow-hidden">
                                <div className="h-full bg-green-500 w-3/4"></div>
                            </div>
                            <div className="text-[10px] text-center text-gray-500">Harga Naik 🚀<br/>Optimisme Tinggi</div>
                        </div>
                        
                        {/* Bear Market */}
                        <div className="bg-white p-3 rounded-xl border-2 border-red-400 shadow-md hover:scale-105 transition-transform">
                            <div className="text-4xl mb-2 text-center">🐻</div>
                            <div className="text-sm font-bold text-red-600 text-center uppercase">Bear Market</div>
                            <div className="h-1 w-full bg-gray-100 my-2 rounded overflow-hidden">
                                <div className="h-full bg-red-500 w-3/4 ml-auto"></div>
                            </div>
                            <div className="text-[10px] text-center text-gray-500">Harga Turun 📉<br/>Pesimisme/Takut</div>
                        </div>
                    </div>
                </div>
            );
        }

        if (lowerTopic.includes('airdrop')) {
            return (
                <div className="bg-gradient-to-br from-sky-50 via-cyan-50 to-teal-50 p-6 rounded-2xl border-2 border-sky-200 mt-4 shadow-lg overflow-hidden relative">
                    <div className="flex items-center gap-3 mb-5 relative z-10">
                        <div className="w-10 h-10 bg-gradient-to-br from-sky-500 to-cyan-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🪂</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Mekanisme Airdrop</h3>
                    </div>
                    
                    {/* Animasi Parachute */}
                    <div className="flex justify-around items-start h-32 relative">
                        <div className="absolute top-0 left-1/4 animate-[float_4s_ease-in-out_infinite]">
                            <div className="text-3xl">🪂</div>
                            <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-[8px] font-bold text-yellow-800 mx-auto -mt-1 shadow-sm">$TOKEN</div>
                        </div>
                        <div className="absolute top-4 left-2/4 animate-[float_5s_ease-in-out_infinite]">
                            <div className="text-3xl">🪂</div>
                            <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-[8px] font-bold text-yellow-800 mx-auto -mt-1 shadow-sm">$TOKEN</div>
                        </div>
                        <div className="absolute top-2 left-3/4 animate-[float_4.5s_ease-in-out_infinite]">
                            <div className="text-3xl">🪂</div>
                            <div className="w-6 h-6 bg-yellow-400 rounded-full border-2 border-yellow-600 flex items-center justify-center text-[8px] font-bold text-yellow-800 mx-auto -mt-1 shadow-sm">$TOKEN</div>
                        </div>
                        
                        <div className="absolute bottom-0 w-full flex justify-around">
                            <div className="text-2xl">🤠</div>
                            <div className="text-2xl">👱‍♀️</div>
                            <div className="text-2xl">👨‍💻</div>
                        </div>
                    </div>
                    
                    <div className="bg-white/60 p-2 rounded-lg text-center mt-2 relative z-10 border border-sky-100">
                        <p className="text-[10px] text-gray-600 italic">"Token gratis dikirim ke dompet pengguna awal sebagai hadiah/marketing."</p>
                    </div>
                </div>
            );
        }

      
        if (lowerTopic.includes('phishing') || lowerTopic.includes('scam') || lowerTopic.includes('hack')) {
            return (
                <div className="bg-gradient-to-br from-orange-50 via-red-50 to-rose-50 p-6 rounded-2xl border-2 border-orange-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-red-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🎣</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Bahaya Phishing</h3>
                    </div>

                    <div className="relative bg-white p-4 rounded-xl border border-gray-200 shadow-inner">
                        {/* RESPONSIVE FIX: Stack Vertical on Mobile */}
                        <div className="flex flex-col sm:flex-row items-center justify-between mb-4 gap-4 sm:gap-0">
                            <div className="flex flex-col items-center w-full sm:w-1/3">
                                <div className="text-4xl mb-1 transform -rotate-12">😈</div>
                                <span className="text-[10px] font-bold text-red-600">Hacker</span>
                            </div>
                            
                            {/* Vertical line on mobile, horizontal on desktop */}
                            <div className="w-0.5 h-16 sm:w-1/3 sm:h-0.5 bg-gray-300 relative">
                                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-xl">🎣</div>
                                <div className="absolute top-full sm:top-2 left-1/2 -translate-x-1/2 text-[8px] bg-yellow-100 px-1 rounded border border-yellow-300 whitespace-nowrap mt-1 sm:mt-0">Link Palsu</div>
                            </div>

                            <div className="flex flex-col items-center w-full sm:w-1/3">
                                <div className="text-4xl mb-1">🐠</div>
                                <span className="text-[10px] font-bold text-blue-600">Korban</span>
                            </div>
                        </div>

                        {/* Tips */}
                        <div className="bg-red-50 p-2 rounded-lg border border-red-100 flex gap-2 items-start">
                            <span className="text-lg">⚠️</span>
                            <div className="text-[10px] text-gray-700">
                                <strong>Jangan klik link sembarangan!</strong> Hacker membuat website palsu yang mirip aslinya untuk mencuri Seed Phrase kamu.
                            </div>
                        </div>
                    </div>
                </div>
            );
        }

  
        if (lowerTopic.includes('metaverse')) {
            return (
                <div className="bg-gradient-to-br from-fuchsia-50 via-purple-50 to-indigo-50 p-6 rounded-2xl border-2 border-fuchsia-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-fuchsia-500 to-purple-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🕶️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Konsep Metaverse</h3>
                    </div>

                    <div className="flex items-center justify-center gap-2 mb-4">
                        <div className="bg-white p-3 rounded-2xl border border-gray-200 shadow-lg z-10 w-24 text-center">
                            <div className="text-2xl mb-1">🧍</div>
                            <div className="text-[10px] font-bold">Kamu</div>
                            <div className="text-[8px] text-gray-400">Dunia Nyata</div>
                        </div>
                        <div className="text-2xl text-purple-500 font-bold animate-pulse">↔️</div>
                        <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-3 rounded-2xl shadow-lg z-10 w-24 text-center text-white">
                            <div className="text-2xl mb-1">🤖</div>
                            <div className="text-[10px] font-bold">Avatar</div>
                            <div className="text-[8px] text-purple-200">Dunia Virtual</div>
                        </div>
                    </div>
                    
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        <div className="bg-white/80 p-2 rounded-lg text-center border border-purple-100">
                            <span className="text-lg">🎮</span>
                            <div className="text-[8px] font-bold mt-1">Main Game</div>
                        </div>
                        <div className="bg-white/80 p-2 rounded-lg text-center border border-purple-100">
                            <span className="text-lg">🎨</span>
                            <div className="text-[8px] font-bold mt-1">Beli Aset (NFT)</div>
                        </div>
                        <div className="bg-white/80 p-2 rounded-lg text-center border border-purple-100">
                            <span className="text-lg">🤝</span>
                            <div className="text-[8px] font-bold mt-1">Sosialisasi</div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: Bitcoin Halving (Pemotongan Reward) ---
        if (lowerTopic.includes('halving')) {
            return (
                <div className="bg-gradient-to-br from-yellow-50 via-amber-50 to-orange-50 p-6 rounded-2xl border-2 border-yellow-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-yellow-500 to-amber-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">✂️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Bitcoin Halving</h3>
                    </div>
                    
                    <div className="relative pt-4 pb-2">
                        {/* Garis Waktu */}
                        <div className="absolute top-1/2 left-0 w-full h-1 bg-gray-200 -z-10 hidden sm:block"></div>
                        
                        {/* RESPONSIVE FIX: Stack on mobile */}
                        <div className="flex flex-col sm:flex-row justify-between items-center text-center gap-4 sm:gap-0">
                            {/* 2012 */}
                            <div className="bg-white p-2 rounded-lg border border-yellow-300 shadow-sm transform scale-90 opacity-60">
                                <div className="text-[10px] font-bold text-gray-500">2012</div>
                                <div className="text-xs font-bold text-yellow-600">50 BTC</div>
                            </div>
                            
                            {/* 2016 */}
                            <div className="bg-white p-2 rounded-lg border border-yellow-300 shadow-sm transform scale-90 opacity-80">
                                <div className="text-[10px] font-bold text-gray-500">2016</div>
                                <div className="text-xs font-bold text-yellow-600">25 BTC</div>
                            </div>

                            {/* Scissors Icon - rotated on mobile */}
                            <div className="text-2xl text-red-500 z-10 animate-pulse transform rotate-90 sm:rotate-0">✂️</div>

                            {/* 2024 */}
                            <div className="bg-gradient-to-br from-yellow-400 to-orange-500 text-white p-2 rounded-lg shadow-lg transform scale-110 z-20">
                                <div className="text-[10px] font-bold text-yellow-100">Now</div>
                                <div className="text-sm font-bold">3.125</div>
                                <div className="text-[8px]">BTC/Block</div>
                            </div>
                        </div>
                        
                        <p className="text-center text-[10px] text-gray-500 mt-4 italic">
                            "Setiap 4 tahun, suplai Bitcoin baru dipotong setengah. Ini yang bikin langka!"
                        </p>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: Hard Fork vs Soft Fork (Analogi Jalan Bercabang) ---
        if (lowerTopic.includes('fork')) {
            return (
                <div className="bg-gradient-to-br from-slate-50 via-gray-50 to-zinc-50 p-6 rounded-2xl border-2 border-gray-300 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-gray-600 to-slate-700 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🍴</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Blockchain Fork</h3>
                    </div>

                    <div className="space-y-4">
                        {/* Hard Fork */}
                        <div className="relative h-16 flex items-center">
                            <div className="absolute left-0 text-[10px] font-bold rotate-90 text-gray-400">OLD</div>
                            <div className="w-1/3 h-2 bg-gray-400 rounded-l-full"></div>
                            
                            {/* Split */}
                            <div className="flex-1 h-16 relative">
                                {/* Jalur Lama (Mati/Beda) */}
                                <div className="absolute top-1 left-0 w-full h-2 bg-gray-300 transform -rotate-12 origin-left opacity-50"></div>
                                {/* Jalur Baru (Hard Fork) */}
                                <div className="absolute bottom-1 left-0 w-full h-2 bg-red-500 transform rotate-12 origin-left rounded-r-full flex items-center justify-end pr-2">
                                    <span className="text-[8px] text-white font-bold">Aturan Baru (Tidak Cocok)</span>
                                </div>
                            </div>
                            <div className="absolute right-0 top-0 text-xs font-bold text-red-600">Hard Fork 🚫</div>
                        </div>

                        {/* Soft Fork */}
                        <div className="relative h-10 flex items-center mt-2">
                             <div className="w-1/3 h-2 bg-gray-400 rounded-l-full"></div>
                             <div className="flex-1 h-2 bg-green-500 rounded-r-full flex items-center justify-center">
                                <span className="text-[8px] text-white font-bold">Update (Masih Cocok)</span>
                             </div>
                             <div className="absolute right-0 text-xs font-bold text-green-600">Soft Fork ✅</div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: Liquidity Pool (Analogi Panci Pencampur) ---
        if (lowerTopic.includes('liquidity pool') || lowerTopic.includes('lp')) {
            return (
                <div className="bg-gradient-to-br from-cyan-50 via-blue-50 to-indigo-50 p-6 rounded-2xl border-2 border-cyan-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🏊</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Liquidity Pool</h3>
                    </div>

                    <div className="flex flex-col items-center">
                        {/* Input Tokens */}
                        <div className="flex gap-8 mb-[-10px] z-10">
                            <div className="flex flex-col items-center animate-bounce">
                                <div className="w-8 h-8 bg-yellow-400 rounded-full flex items-center justify-center border-2 border-yellow-600 font-bold text-[10px]">A</div>
                                <span className="text-[10px] text-gray-500">Token A</span>
                            </div>
                             <div className="flex flex-col items-center animate-bounce" style={{animationDelay: '0.2s'}}>
                                <div className="w-8 h-8 bg-blue-400 rounded-full flex items-center justify-center border-2 border-blue-600 font-bold text-[10px] text-white">B</div>
                                <span className="text-[10px] text-gray-500">Token B</span>
                            </div>
                        </div>

                        {/* The Pool (Pot) */}
                        <div className="w-32 h-24 bg-white/50 backdrop-blur-sm border-b-4 border-x-2 border-cyan-400 rounded-b-[3rem] relative overflow-hidden flex items-end justify-center shadow-inner">
                            <div className="absolute inset-0 bg-cyan-200 opacity-30 w-full h-full animate-pulse"></div>
                            <div className="text-3xl mb-4 z-10 mix-blend-multiply">💧</div>
                            <div className="absolute bottom-2 text-[8px] font-bold text-cyan-800">Smart Contract</div>
                        </div>

                        {/* Output */}
                        <div className="mt-[-10px] z-20">
                             <div className="bg-green-100 px-3 py-1 rounded-full border border-green-400 shadow-sm flex items-center gap-2">
                                <span className="text-xs">🎟️</span>
                                <span className="text-[10px] font-bold text-green-800">LP Token (Bukti Setor)</span>
                             </div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: Market Psychology (FOMO, FUD, HODL) ---
        if (lowerTopic.includes('fomo') || lowerTopic.includes('fud') || lowerTopic.includes('hodl')) {
            return (
                <div className="bg-gradient-to-br from-purple-50 via-fuchsia-50 to-pink-50 p-6 rounded-2xl border-2 border-purple-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-purple-500 to-fuchsia-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">🧠</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Psikologi Market</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                        {/* FOMO */}
                        <div className={`p-2 rounded-xl border-2 text-center transition-all ${lowerTopic.includes('fomo') ? 'bg-white border-green-400 scale-105 shadow-md' : 'bg-white/50 border-gray-200 grayscale opacity-60'}`}>
                            <div className="text-2xl mb-1">🤩</div>
                            <div className="text-[10px] font-bold text-green-600">FOMO</div>
                            <div className="text-[8px] leading-tight text-gray-500">"Takut ketinggalan, beli di pucuk!"</div>
                        </div>

                        {/* FUD */}
                        <div className={`p-2 rounded-xl border-2 text-center transition-all ${lowerTopic.includes('fud') ? 'bg-white border-red-400 scale-105 shadow-md' : 'bg-white/50 border-gray-200 grayscale opacity-60'}`}>
                            <div className="text-2xl mb-1">😱</div>
                            <div className="text-[10px] font-bold text-red-600">FUD</div>
                            <div className="text-[8px] leading-tight text-gray-500">"Panik berita buruk, jual rugi!"</div>
                        </div>

                        {/* HODL */}
                        <div className={`p-2 rounded-xl border-2 text-center transition-all ${lowerTopic.includes('hodl') ? 'bg-white border-blue-400 scale-105 shadow-md' : 'bg-white/50 border-gray-200 grayscale opacity-60'}`}>
                            <div className="text-2xl mb-1">💎🙌</div>
                            <div className="text-[10px] font-bold text-blue-600">HODL</div>
                            <div className="text-[8px] leading-tight text-gray-500">"Tahan terus sampai bulan!"</div>
                        </div>
                    </div>
                </div>
            );
        }

        // --- VISUAL BARU: CEX vs DEX (Perbandingan) ---
        if (lowerTopic.includes('cex') || lowerTopic.includes('dex') || lowerTopic.includes('exchange')) {
            return (
                 <div className="bg-gradient-to-br from-indigo-50 via-blue-50 to-slate-50 p-6 rounded-2xl border-2 border-indigo-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-indigo-500 to-blue-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">⚖️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Tempat Jual Beli (Exchange)</h3>
                    </div>
                    {/* RESPONSIVE FIX: Stack on mobile */}
                    <div className="flex flex-col sm:flex-row gap-2">
                        {/* CEX */}
                        <div className="flex-1 bg-white p-3 rounded-xl border border-gray-200 shadow-sm relative overflow-hidden">
                             <div className="absolute top-0 right-0 bg-gray-200 text-[8px] px-2 py-0.5 rounded-bl font-bold text-gray-600">Bank Style</div>
                             <div className="text-center mb-2 mt-1">
                                <span className="text-2xl">🏦</span>
                                <div className="text-xs font-bold text-indigo-700">CEX</div>
                             </div>
                             <ul className="text-[9px] text-gray-600 space-y-1">
                                <li className="flex gap-1">✅ Mudah (Login)</li>
                                <li className="flex gap-1">❌ Data di Pusat</li>
                                <li className="flex gap-1">❌ Rawan Bankrupt</li>
                             </ul>
                        </div>

                        {/* VS */}
                        <div className="flex items-center justify-center font-bold text-gray-300 text-xs py-2 sm:py-0">VS</div>

                        {/* DEX */}
                        <div className="flex-1 bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-3 rounded-xl shadow-md relative overflow-hidden">
                             <div className="absolute top-0 right-0 bg-white/20 text-[8px] px-2 py-0.5 rounded-bl font-bold">Web3 Style</div>
                             <div className="text-center mb-2 mt-1">
                                <span className="text-2xl">🦄</span>
                                <div className="text-xs font-bold">DEX</div>
                             </div>
                             <ul className="text-[9px] text-indigo-100 space-y-1">
                                <li className="flex gap-1">✅ Anonim</li>
                                <li className="flex gap-1">✅ Kontrol Penuh</li>
                                <li className="flex gap-1">⚠️ Risiko Sendiri</li>
                             </ul>
                        </div>
                    </div>
                </div>
            );
        }
        // Loop melalui map untuk mencari keyword yang cocok (FALLBACK)
        for (const keyword in visualMap) {
            if (lowerTopic.includes(keyword)) {
                const data = visualMap[keyword];
                return <GenericVisual icon={data.icon} title={data.title} description={data.description} colorTheme={data.theme} />;
            }
        }

        return null;
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
        'Apa itu Web3?',
        'Bagaimana cara kerja blockchain?',
        'Apa itu cryptocurrency?',
        'Apa perbedaan Web2 dan Web3?',
        'Apa itu NFT?',
        'Apa itu dApp?',
        'Apa itu DAO?',
        'Apa itu DeFi?',
        'Apa itu smart contract?',
        'Apa itu mining (Proof-of-Work)?',
        'Apa itu staking (Proof-of-Stake)?',
        'Apa perbedaan Coin vs Token?',
        'Apa itu Layer 2?',
        'Apa itu wallet crypto?',
        'Apa itu gas fee?',
        'Apa itu metaverse?',
        'Apa keuntungan Web3?',
        'Bagaimana cara mulai di Web3?'
    ];

    const generateNewSuggestions = (botReply, fullHistory, currentSuggestions, activeTopic) => {
        const lowerReply = botReply.toLowerCase();
        
        // 1. Filter: Apa saja yang SUDAH ditanyakan user? (Agar tidak muncul lagi)
        const askedQuestions = new Set(
            fullHistory
                .filter(msg => msg.role === 'user')
                .map(msg => msg.content.toLowerCase().trim())
        );

        // 2. KAMUS PINTAR: Deteksi kata di jawaban bot -> Saran pertanyaan lanjutan
        //    Format: 'kata_kunci_di_jawaban': ['Saran 1', 'Saran 2']
        const contextualMap = {
            // Topik Dasar
            'blockchain': ['Apa bedanya Public vs Private Blockchain?', 'Apakah blockchain bisa di-hack?'],
            'desentralisasi': ['Apa keuntungan desentralisasi?', 'Apakah ada kelemahan desentralisasi?'],
            'smart contract': ['Contoh penggunaan smart contract sehari-hari?', 'Apakah smart contract bisa diubah?'],
            'web3': ['Apa bedanya Web3 dengan Metaverse?', 'Kapan Web3 akan mainstream?'],
            
            // Topik Transaksi & Biaya
            'gas': ['Kenapa Gas Fee bisa mahal?', 'Bagaimana cara hemat Gas Fee?', 'Apa itu Gwei?'],
            'fee': ['Kenapa biaya transaksi berbeda-beda?', 'Blockchain mana yang biayanya termurah?'],
            'transaksi': ['Berapa lama transaksi crypto diproses?', 'Apa itu TXID (Transaction ID)?'],
            
            // Topik Wallet & Keamanan
            'wallet': ['Apa bedanya Custodial vs Non-Custodial?', 'Rekomendasi wallet untuk pemula?'],
            'dompet': ['Bagaimana cara restore wallet yang hilang?', 'Apa itu Hardware Wallet?'],
            'seed phrase': ['Bolehkan screenshot Seed Phrase?', 'Apa bedanya Seed Phrase dan Private Key?'],
            'private key': ['Apa bedanya Private Key dan Public Key?', 'Bahaya share Private Key?'],
            'hack': ['Bagaimana cara mengamankan aset dari hacker?', 'Apa itu phising?'],
            'scam': ['Apa tanda-tanda project Rug Pull?', 'Bagaimana cek kredibilitas token?'],
            
            // Topik Investasi & Token
            'bitcoin': ['Apa itu Bitcoin Halving?', 'Kenapa jumlah Bitcoin terbatas 21 juta?'],
            'ethereum': ['Apa bedanya Ethereum dan Bitcoin?', 'Apa itu Ethereum 2.0?'],
            'nft': ['Apa kegunaan NFT selain seni?', 'Bagaimana cara jual NFT gratis?', 'Risiko investasi NFT?'],
            'token': ['Apa bedanya Utility Token dan Security Token?', 'Apa itu Tokenomics?'],
            'stablecoin': ['Kenapa kita butuh Stablecoin?', 'Apa itu USDT/USDC?'],
            'volatilitas': ['Kenapa harga crypto naik turun drastis?', 'Tips hadapi market crash?'],
            
            // Topik DeFi & DAO
            'defi': ['Apa risiko terbesar di DeFi?', 'Apa bedanya nabung di Bank vs DeFi?'],
            'bunga': ['Dari mana asal bunga/yield di DeFi?', 'Apa itu Yield Farming?'],
            'dao': ['Bagaimana cara ikut voting di DAO?', 'Contoh DAO yang sukses?'],
            'staking': ['Apakah staking ada risikonya?', 'Berapa persen keuntungan staking?']
        };

        let candidates = [];

        // 3. SCANNING: Cek apakah jawaban bot mengandung kata kunci di atas
        for (const [keyword, questions] of Object.entries(contextualMap)) {
            if (lowerReply.includes(keyword)) {
                candidates.push(...questions);
            }
        }

        // 4. PRIORITAS KEDUA: Ambil dari topik yang sedang aktif (jika ada)

        if (activeTopic && topicSuggestionMap[activeTopic]) {
            candidates.push(...topicSuggestionMap[activeTopic]);
        }

        // 5. PRIORITAS KETIGA: Master List (Cadangan jika jawaban bot pendek/umum)
        candidates.push(...masterSuggestionList);

        // 6. FILTER & FINALISASI
        let finalSuggestions = [];
        const seenCandidates = new Set(); 

        for (const question of candidates) {
            const cleanQ = question.toLowerCase().trim();

            // Syarat masuk:
            // 1. Belum pernah ditanya user (askedQuestions)
            // 2. Belum ada di daftar kandidat terpilih (seenCandidates)
            const isAlreadyAsked = askedQuestions.has(cleanQ);
            const isDuplicate = seenCandidates.has(cleanQ);
            
            if (!isAlreadyAsked && !isDuplicate) {
                finalSuggestions.push(question);
                seenCandidates.add(cleanQ);
            }

            // Batasi maksimal 4 saran
            if (finalSuggestions.length >= 4) break;
        }

        // 7. FALLBACK: Kalau saran masih kurang dari 2 (misal semua sudah ditanya)
        //    Ambil acak dari master list
        if (finalSuggestions.length < 2) {
            const remaining = shuffleArray(masterSuggestionList).filter(q => !askedQuestions.has(q.toLowerCase().trim()));
            finalSuggestions.push(...remaining.slice(0, 4 - finalSuggestions.length));
        }

        return finalSuggestions;
    };

const sendMessage = async (messageText) => {
        const userMessage = messageText || input;
        if (!userMessage.trim()) return;
        
        // 1. Update UI User
        setMessages(prev => [...prev, { role: 'user', content: userMessage, visual: null }]);
        setInput('');
        setIsLoading(true);
        setSuggestions([]);

        try {
            // --- INI RAHASIANYA ---
            // Kita buat aturan tegas agar AI tidak cerewet
            const systemInstruction = {
                role: 'system',
                content: "Kamu adalah asisten belajar Web3 yang asik dan santai. ATURAN WAJIB: 1. Jawab maksimal 3 paragraf pendek. 2. Gunakan bahasa yang mudah dimengerti pemula. 3. Fokus pada analogi sederhana. 4. Jangan bertele-tele atau terlalu formal."
            };

            const cleanHistory = messages.slice(-5).map(msg => ({
                role: msg.role,
                content: msg.content
            }));
            
            // Masukkan instruksi sistem di urutan PERTAMA
            const messagesToSend = [
                systemInstruction, 
                ...cleanHistory,
                { role: 'user', content: userMessage }
            ];

            // Kirim ke API
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

            // Cleaning text
            botReply = botReply.replace(/\*\*(.*?)\*\*/g, '$1'); 
            botReply = botReply.replace(/\*(.*?)\*/g, '$1');   
            botReply = botReply.replace(/`([^`]+)`/g, '$1'); 
            botReply = botReply.replace(/^(#+\s*)/gm, ''); 
            botReply = botReply.replace(/Analogi:/gi, '');
            botReply = botReply.replace(/Contoh:/gi, '');
            botReply = botReply.replace(/\n/g, '<br />');

            let visual = null;
            if (botReply && !botReply.toLowerCase().includes("hmm")) {
                 visual = generateVisual(userMessage);
            }
            
            const newBotMessage = { 
                role: 'assistant', 
                content: botReply,
                visual: visual
            };

            setMessages(prev => [...prev, newBotMessage]);
            
            // Generate saran pertanyaan lanjutan (Logic Pintar)
            const fullHistoryForLogic = [
                ...messages, 
                { role: 'user', content: userMessage },
                newBotMessage
            ];
            
            const newSuggestions = generateNewSuggestions(botReply, fullHistoryForLogic, suggestions, activeTopic);
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
        
        if (topicSuggestionMap[topic]) {
            setActiveTopic(topic);
            
            setMessages([
                {
                    role: 'assistant',
                    content: `Oke! Mari kita fokus membahas ${topic}. Apa yang ingin kamu ketahui pertama?`,
                    visual: generateVisual(topic)
                }
            ]);
            
            setSuggestions(topicSuggestionMap[topic]);
            
            setInput('');
            setIsLoading(false);
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
                    {/* --- Literasi Web3 --- */}
                    <SidebarSubmenu
                        title="Literasi Web3"
                        icon="🧠"
                        items={['Akses Informasi', 'Evaluasi Informasi', 'Literasi Ekonomi', 'Literasi Hukum', 'Literasi Risiko']}
                        onTopicChange={handleTopicChange}
                    />
                    
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
                                {/* RESPONSIVE FIX: Better padding on mobile */}
                                <div className={`max-w-[90%] sm:max-w-[85%] ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-100 shadow-md'} rounded-3xl p-4 sm:p-5 hover:shadow-xl transition-all`}>
                                    
                                    <div className={`text-sm leading-relaxed ${msg.role === 'user' ? 'text-white font-medium' : 'text-gray-800'}`}>
                                        {msg.role === 'user' 
                                            ? msg.content 
                                            : <div dangerouslySetInnerHTML={{ __html: msg.content }} />
                                        }
                                    </div>

                                    {/* Di sinilah visual akan dirender */}
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