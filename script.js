// Menambahkan event listener ke tombol
document.getElementById('searchButton').addEventListener('click', searchNovels);

// Memungkinkan pencarian dengan menekan 'Enter'
document.getElementById('searchInput').addEventListener('keypress', function(e) {
    if (e.key === 'Enter') {
        searchNovels();
    }
});

// Fungsi async untuk mengambil data dari API
async function searchNovels() {
    const query = document.getElementById('searchInput').value;
    const resultsDiv = document.getElementById('results');
    const loadingDiv = document.getElementById('loading');

    // Jika input kosong, jangan lakukan apa-apa
    if (!query) {
        resultsDiv.innerHTML = '<p style="text-align:center;">Silakan masukkan judul novel untuk dicari.</p>';
        return;
    }

    // Bersihkan hasil lama dan tampilkan loading
    resultsDiv.innerHTML = '';
    loadingDiv.style.display = 'block';

    try {
        // Kita gunakan parameter 'title' untuk pencarian yang lebih spesifik ke judul
        // encodeURIComponent memastikan spasi dan karakter khusus aman untuk URL
        const response = await fetch(`https://openlibrary.org/search.json?title=${encodeURIComponent(query)}`);
        
        if (!response.ok) {
            throw new Error('Respon jaringan tidak OK');
        }
        
        const data = await response.json();
        displayResults(data.docs); // 'docs' adalah array hasil dari Open Library

    } catch (error) {
        console.error('Error fetching data:', error);
        resultsDiv.innerHTML = '<p style="text-align:center; color:red;">Terjadi kesalahan saat mengambil data. Coba lagi nanti.</p>';
    } finally {
        // Sembunyikan loading setelah selesai
        loadingDiv.style.display = 'none';
    }
}

// Fungsi untuk menampilkan hasil ke halaman
function displayResults(books) {
    const resultsDiv = document.getElementById('results');

    if (books.length === 0) {
        resultsDiv.innerHTML = '<p style="text-align:center;">Maaf, tidak ada novel yang ditemukan dengan judul tersebut.</p>';
        return;
    }

    // Loop melalui setiap buku dan buat elemen HTML
    books.forEach(book => {
        // Mendapatkan ID sampul buku (jika ada)
        const coverId = book.cover_i;
        // URL gambar sampul (ukuran Medium)
        const coverUrl = coverId ? `https://covers.openlibrary.org/b/id/${coverId}-M.jpg` : 'https://via.placeholder.com/80x120?text=No+Cover';

        // Mengambil nama penulis (biasanya array)
        const author = book.author_name ? book.author_name.join(', ') : 'Penulis tidak diketahui';
        
        // Mengambil tahun terbit pertama
        const publishYear = book.first_publish_year ? book.first_publish_year : 'Tahun tidak diketahui';

        // Membuat HTML untuk setiap item hasil
        const bookElement = document.createElement('div');
        bookElement.classList.add('result-item');
        bookElement.innerHTML = `
            <img src="${coverUrl}" alt="Sampul ${book.title}">
            <div class="result-info">
                <h3>${book.title}</h3>
                <p><strong>Penulis:</strong> ${author}</p>
                <p><strong>Tahun Terbit Pertama:</strong> ${publishYear}</p>
            </div>
        `;
        
        resultsDiv.appendChild(bookElement);
    });
}