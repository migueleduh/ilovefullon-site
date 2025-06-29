const API_KEY = '7c68f8de2c25510a83d35375aec4efdb'; // Substitua pela sua chave
const tag = 'psytrance';
const url = `https://ws.audioscrobbler.com/2.0/?method=tag.getTopArtists&tag=${tag}&api_key=${API_KEY}&format=json&limit=20`;

fetch(url)
  .then(response => response.json())
  .then(data => {
    const artistas = data.topartists.artist;
    const container = document.getElementById('lista-djs');

    artistas.forEach(artista => {
      const nome = artista.name;
      const imagem = artista.image.find(img => img.size === 'large')['#text'] || '';
      const link = artista.url;

      const card = `
        <a href="${link}" target="_blank" class="bg-gray-800 p-4 rounded-lg shadow hover:bg-cyan-700 transition">
          <img src="${imagem}" alt="${nome}" class="w-full h-40 object-cover rounded mb-2">
          <h2 class="text-lg font-semibold text-center">${nome}</h2>
        </a>
      `;

      container.innerHTML += card;
    });
  })
  .catch(error => {
    console.error('Erro ao buscar DJs:', error);
    document.getElementById('lista-djs').innerHTML = `<p class="text-red-400">Erro ao carregar os dados.</p>`;
  });