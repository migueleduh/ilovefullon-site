
const searchInput = document.getElementById("default-search");
const resultsDiv = document.getElementById("results");

const apiKey = '7c68f8de2c25510a83d35375aec4efdb';

async function fetchPsytranceArtists(query) {
  if (query.length < 3) {
    resultsDiv.innerHTML = "";
    return;
  }

  resultsDiv.innerHTML = "<p class='text-white mt-2'>Buscando...</p>";

  try {
    const url = `https://ws.audioscrobbler.com/2.0/?method=tag.gettopartists&tag=psytrance&api_key=${apiKey}&format=json&limit=100`;

    const res = await fetch(url);
    if (!res.ok) throw new Error(`Erro na requisição: ${res.status}`);

    const data = await res.json();

    const filtered = data.topartists.artist.filter(artist =>
      artist.name.toLowerCase().includes(query.toLowerCase())
    );

    if (filtered.length === 0) {
      resultsDiv.innerHTML = "<p class='text-white mt-2'>Nenhum DJ psytrance encontrado.</p>";
      return;
    }

    resultsDiv.innerHTML = filtered.slice(0, 10).map(artist => {
      const image = artist.image.find(img => img.size === 'medium')['#text'] || 'https://via.placeholder.com/64';
      return `
        <div class="flex items-center gap-4 mt-2 bg-gray-800 p-2 rounded">
          <img src="${image}" alt="${artist.name}" class="w-12 h-12 rounded" />
          <div>
            <a href="${artist.url}" target="_blank" class="bg-neutral-900 text-white font-semibold">${artist.name}</a>
            <p class="text-gray-400 text-sm">Listeners: ${artist.listeners}</p>
          </div>
        </div>
      `;
    }).join('');
  } catch (error) {
    resultsDiv.innerHTML = "<p class='text-red-500 mt-2'>Erro ao buscar artistas.</p>";
    console.error(error);
  }
}

// Busca automática enquanto digita
searchInput.addEventListener("input", () => {
  fetchPsytranceArtists(searchInput.value.trim());
});
