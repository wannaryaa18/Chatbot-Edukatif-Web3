// File: app.js (Frontend)

const { useState, useRef, useEffect } = React;

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

const topicSuggestionMap = {
    'Umum': [
        'Apa itu Web3?',
        'Apa itu Blockchain?',
        'Apa bedanya Coin vs Token?',
        'Apa itu Proof-of-Stake?'
    ],
    'Web3': [
        'Apa perbedaan Web2 dan Web3?',
        'Apa keuntungan Web3?',
        'Apa itu dApp?',
        'Bagaimana cara mulai di Web3?'
    ],
    'Blockchain': [
        'Bagaimana cara kerja blockchain?',
        'Apa itu desentralisasi?',
        'Apa itu gas fee?',
        'Apa itu Layer 2?'
    ],
    'NFT': [
        'Bagaimana cara membuat NFT?',
        'Apa itu minting?',
        'Apa kegunaan NFT selain seni?',
        'Di mana orang menjual NFT?'
    ],
    'DeFi': [
        'Apa itu DeFi?',
        'Apa itu liquidity pool?',
        'Apa resiko pinjam meminjam di DeFi?',
        'Contoh aplikasi DeFi?'
    ],
    'DAO': [
        'Bagaimana cara kerja DAO?',
        'Bagaimana cara bergabung dengan DAO?',
        'Apa itu token tata kelola?',
        'Contoh DAO terkenal?'
    ],
    'Smart Contract': [
        'Bagaimana cara kerja smart contract?',
        'Apa bahasa pemrograman untuk smart contract?',
        'Apakah smart contract aman?',
        'Contoh penggunaan smart contract?'
    ],
    'Mining': [
        'Apa itu Proof-of-Work?',
        'Apakah mining boros energi?',
        'Apa yang dibutuhkan untuk mining?',
        'Kenapa mining sulit?'
    ],
     'Staking': [
        'Apa itu Proof-of-Stake?',
        'Apa bedanya mining dan staking?',
        'Apa resiko staking?',
        'Bagaimana cara mulai staking?'
    ],
     'Wallet Crypto': [
        'Bagaimana cara mengamankan wallet?',
        'Apa itu seed phrase?',
        'Apa bedanya hot vs cold wallet?',
        'Contoh aplikasi wallet?'
    ],
    'Coin vs Token': [
        'Apa contoh Coin?',
        'Apa contoh Token?',
        'Apa itu tokenomics?',
        'Bagaimana token dibuat?'
    ]
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
    
    // --- 2. Komponen Visual Generik (Bisa Dipakai Ulang) ---
    const GenericVisual = ({ icon, title, description, colorTheme }) => {
         const theme = colorTheme || themes.purple; // Default ke ungu jika tema tidak diset
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

    // --- 3. Map untuk 43 Diagram Generik ---
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


    // --- 4. Fungsi generateVisual yang Diperbarui ---
    const generateVisual = (topic) => {
        const lowerTopic = topic.toLowerCase();
        
        // --- BAGIAN 1: 7 Diagram Kustom (Prioritas) ---
        // (Ini adalah 7 diagram kustom Anda, tidak diubah)

        if (lowerTopic.includes('blockchain') || lowerTopic.includes('block chain')) {
            return (
                <div className="bg-gradient-to-br from-blue-50 via-indigo-50 to-purple-50 p-6 rounded-2xl border-2 border-blue-200 mt-4 shadow-lg">
                    <div className="flex items-center gap-3 mb-5">
                        <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-indigo-600 rounded-xl flex items-center justify-center shadow-md floating">
                            <span className="text-white text-xl">⛓️</span>
                        </div>
                        <h3 className="font-bold text-gray-800 text-lg">Struktur Blockchain</h3>
                    </div>
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
                    <div className="grid grid-cols-3 gap-4">
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-blue-300 transition-all hover:shadow-md">
                            <div className="text-4xl mb-3 text-center">📄</div>
                            <div className="font-bold text-sm text-blue-600 mb-1 text-center">Web 1.0</div>
                            <div className="text-xs text-gray-500 mb-2 text-center font-semibold">Read-Only</div>
                            <div className="text-xs text-center text-gray-600">Static Pages</div>
                        </div>
                        <div className="bg-white p-4 rounded-xl border-2 border-gray-200 hover:border-purple-300 transition-all hover:shadow-md">
                            <div className="text-4xl mb-3 text-center">💬</div>
                            <div className="font-bold text-sm text-purple-600 mb-1 text-center">Web 2.0</div>
                            <div className="text-xs text-gray-500 mb-2 text-center font-semibold">Read-Write</div>
                            <div className="text-xs text-center text-gray-600">Social Media</div>
                        </div>
                        <div className="bg-gradient-to-br from-emerald-500 to-teal-600 text-white p-4 rounded-xl shadow-xl hover:shadow-2xl transition-all hover:scale-105">
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
                    <div className="flex items-center justify-around gap-3">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">💻</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Komputer</div>
                        </div>
                        <div className="text-3xl text-amber-500">→</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">🧮</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Solve Puzzle</div>
                        </div>
                        <div className="text-3xl text-amber-500">→</div>
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
                    <div className="flex items-center justify-around gap-3">
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">💰</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Koin Anda</div>
                        </div>
                        <div className="text-3xl text-green-500">→</div>
                        <div className="text-center">
                            <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-md mb-3 hover:scale-110 transition-all">
                                <span className="text-3xl">🔒</span>
                            </div>
                            <div className="text-xs font-semibold text-gray-700">Stake/Lock</div>
                        </div>
                        <div className="text-3xl text-green-500">→</div>
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
                    <div className="grid grid-cols-2 gap-4">
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
                    <div className="grid grid-cols-2 gap-4">
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
        
        // --- BAGIAN 2: 43 Diagram Generik ---
        // Loop melalui map untuk mencari keyword yang cocok
        for (const keyword in visualMap) {
            if (lowerTopic.includes(keyword)) {
                const data = visualMap[keyword];
                // Jika cocok, kembalikan komponen GenericVisual dengan data yang sesuai
                return <GenericVisual icon={data.icon} title={data.title} description={data.description} colorTheme={data.theme} />;
            }
        }

        // --- BAGIAN 3: Fallback ---
        // Jika tidak ada visual kustom ATAU generik yang cocok
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

    const generateNewSuggestions = (botReply, lastQuestion, currentSuggestions) => {
        const lowerReply = botReply.toLowerCase();
        const lowerLastQuestion = lastQuestion.toLowerCase();
        const lowerCurrentSuggestions = currentSuggestions.map(s => s.toLowerCase());

        let relevantSuggestions = [];

        const keywordMap = {
            'blockchain': ['Bagaimana cara kerja blockchain?', 'Apa itu smart contract?'],
            'nft': ['Apa itu NFT?', 'Bagaimana cara membuat NFT?'],
            'dao': ['Apa itu DAO?', 'Contoh DAO terkenal?'],
            'defi': ['Apa itu DeFi?', 'Apa resiko DeFi?'],
            'mining': ['Apa itu mining (Proof-of-Work)?', 'Apakah mining boros energi?'],
            'staking': ['Apa itu staking (Proof-of-Stake)?', 'Apa resiko staking?'],
            'wallet': ['Apa itu wallet crypto?', 'Bagaimana cara mengamankan wallet?']
        };

        for (const keyword in keywordMap) {
            if (lowerReply.includes(keyword)) {
                relevantSuggestions.push(...keywordMap[keyword]);
            }
        }
        
        let freshSuggestions = masterSuggestionList.filter(suggestion => {
            const lowerSuggestion = suggestion.toLowerCase();
            return lowerSuggestion !== lowerLastQuestion && !lowerCurrentSuggestions.includes(lowerSuggestion);
        });

        let newSuggestions = [];
        let uniqueRelevant = [...new Set(relevantSuggestions)];
        uniqueRelevant = uniqueRelevant.filter(suggestion => {
                 const lowerSuggestion = suggestion.toLowerCase();
                 return lowerSuggestion !== lowerLastQuestion && !lowerCurrentSuggestions.includes(lowerSuggestion);
        });

        newSuggestions.push(...uniqueRelevant);
        const shuffledFreshList = shuffleArray(freshSuggestions);
        let i = 0;
        while (newSuggestions.length < 4 && i < shuffledFreshList.length) {
            const randomSuggestion = shuffledFreshList[i];
            if (!newSuggestions.map(s => s.toLowerCase()).includes(randomSuggestion.toLowerCase())) {
                newSuggestions.push(randomSuggestion);
            }
            i++;
        }

        return newSuggestions.slice(0, 4);
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

            let visual = null;
            if (botReply && !botReply.toLowerCase().includes("hmm, pertanyaan itu sepertinya jauh banget")) {
                 visual = generateVisual(userMessage);
            }
            
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
                                <div className={`max-w-[85%] ${msg.role === 'user' ? 'bg-gradient-to-br from-purple-500 via-purple-600 to-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-100 shadow-md'} rounded-3xl p-5 hover:shadow-xl transition-all`}>
                                    
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