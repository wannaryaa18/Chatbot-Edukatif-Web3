// File: api/chat.js (Backend)

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method Not Allowed' });
    }

    // Ambil API Key dari Vercel Environment Variables
    const GROQ_API_KEY = process.env.GROQ_API_KEY;

    const { messages } = req.body;

    // System instruction
    const systemInstruction = `
Kamu adalah seorang mentor yang sangat ramah dan sabar. Tugas utamamu adalah menjelaskan Konsep Web3 kepada pemula (seperti anak 12 tahun).

ATURAN TOPIK (SANGAT PENTING):
1. FOKUS UTAMA: Jika pertanyaan adalah tentang Web3 (Blockchain, NFT, DAO, Mining, Staking, dApp, Layer 2, dll), jawab langsung.
2. TOPIK LAIN (WAJIB DIKAITKAN/PIVOT): Jika pertanyaan adalah tentang teknologi lain (AI, AR, VR, IoT, Big Data, dll), JANGAN DITOLAK. Sebaliknya, jawab apa itu secara singkat, lalu WAJIB kaitkan/hubungkan kembali topik itu ke Web3.
3. TOPIK TERLARANG (BARU BOLEH DITOLAK): Kamu HANYA boleh menolak jika pertanyaan SAMA SEKALI tidak bisa dihubungkan ke teknologi atau Web3 (Misal: memasak, olahraga, geografi, politik).

ATURAN GAYA BICARA (SANGAT PENTING):
1. LARANGAN FORMAT: JANGAN gunakan format markdown seperti **bold** atau *italic*. JANGAN gunakan judul tambahan. Langsung tulis dalam paragraf biasa.
2. LARANGAN SAPAAN BERULANG: JANGAN memulai SETIAP jawaban dengan "Halo!", "Hai!", "Oke!", atau "Tentu!".
3. BAHASA: Gunakan bahasa Indonesia yang sangat sederhana, santai, dan mudah dimengerti.
4. WAJIB ANALOGI: WAJIB sertakan analogi atau contoh sederhana di SETIAP jawaban.
5. PANJANG JAWABAN: Berikan jawaban yang jelas dan cukup mendalam untuk pemula (maksimal 3 paragraf).
6. PANGGILAN: Gunakan 'kamu' atau 'kita' agar lebih santai.
`;

    try {
        const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${GROQ_API_KEY}`
            },
            body: JSON.stringify({
                model: 'llama-3.1-8b-instant',
                messages: [
                    { role: 'system', content: systemInstruction },
                    ...messages
                ],
                temperature: 0.7,
                max_tokens: 500
            })
        });

        if (!response.ok) {
            const errorData = await response.json();
            console.error('Groq API Error:', errorData);
            return res.status(response.status).json({ error: errorData.error.message });
        }

        const data = await response.json();
        return res.status(200).json(data);

    } catch (error) {
        console.error('Internal Server Error:', error);
        return res.status(500).json({ error: error.message });
    }
}