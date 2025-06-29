const searchInput = document.getElementById("default-search");
const resultsDiv = document.getElementById("results");
const form = document.querySelector("form");

async function fetchArtists(query) {
  if (query.length < 3) {
    resultsDiv.innerHTML = "";
    return;
  }

  resultsDiv.innerHTML = "<p class='text-white mt-2'>Buscando...</p>";

  try {
    const res = await fetch(`http://localhost/api-rest/spotify.php?q=${encodeURIComponent(query)}`);
    if (!res.ok) throw new Error(`HTTP error! status: ${res.status}`);

    const data = await res.json();

    if (!data.artists || !data.artists.items || data.artists.items.length === 0) {
      resultsDiv.innerHTML = "<p class='text-white mt-2'>Nenhum artista encontrado.</p>";
      return;
    }

    // Filtra só artistas que tenham 'psytrance' no gênero
    const psytranceArtists = data.artists.items.filter(artist =>
      artist.genres.some(genre => genre.toLowerCase().includes('psytrance'))
    );

    if (psytranceArtists.length === 0) {
      resultsDiv.innerHTML = "<p class='text-white mt-2'>Nenhum DJ psytrance encontrado.</p>";
      return;
    }

    resultsDiv.innerHTML = psytranceArtists
      .slice(0, 5)
      .map(artist => {
        const name = artist.name;
        const image = artist.images[1]?.url || "https://via.placeholder.com/100";
        return `
          <div class="flex items-center gap-4 mt-2 bg-gray-800 p-2 rounded">
            <img src="${image}" alt="${name}" class="w-12 h-12 rounded">
            <span class="text-white">${name}</span>
          </div>
        `;
      })
      .join("");
  } catch (error) {
    resultsDiv.innerHTML = "<p class='text-red-500 mt-2'>Erro ao buscar artistas.</p>";
    console.error("Fetch error:", error);
  }
}

// Busca ao digitar
searchInput.addEventListener("input", () => {
  fetchArtists(searchInput.value.trim());
});

// Busca ao enviar o formulário
form.addEventListener("submit", e => {
  e.preventDefault();
  fetchArtists(searchInput.value.trim());
});
