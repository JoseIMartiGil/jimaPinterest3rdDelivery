//https://cs.fyi/guide/secret-management-best-practices
let cards = []; 

function renderNav(){
  const navContainer = document.querySelector('.nav-container');
  navContainer.innerHTML = `
    <div class="logo">
      <img src="./assets/logo.png" alt="Logo" id="logoHome">
    </div>
    <nav class="toHideIconNav">
      <ul>
        <li><a href="#">Inicio</a></li>
        <li><a href="#">Explorar</a></li>
        <li><a href="#">Crear</a></li>
      </ul>
    </nav>
    <div class="search-container">
      <img src="./assets/find.png" alt="Buscar">
      <input id="textSearch" type="text" placeholder="Buscar. Haz click en Enter">
    </div>
    <div class="icons">
      <img class="toHideIconNav" src="./assets/bell.png" alt="Notificaciones">
      <img class="toHideIconNav" src="./assets/feedback.png" alt="Feedback">
      <img src="./assets/profile.png" alt="Perfil">
    </div>
  `;
  const logo = document.getElementById('logoHome');
  logo.addEventListener('click', () => {
    fetchFromUnsplash();
  });

}

function renderCards() {
  const cardsContainer = document.querySelector('.cardContainer');
  cards.forEach((card, index) => {
    const cardDiv = document.createElement('div');
    let cardSizeClass = '';
    switch (index % 3) {
      case 0:
        cardSizeClass = 'cardDiv card_small';
        imageSizeClass = 'image_small'; 
        break;
      case 1:
        cardSizeClass = 'cardDiv card_medium';
        imageSizeClass = 'image_medium'; 
        break;
      case 2:
        cardSizeClass = 'cardDiv card_large';
        imageSizeClass = 'image_large'; 
        break;
    }
    cardDiv.className=cardSizeClass;
    cardDiv.innerHTML = `
      <div class="imageMainCardContainer">
        <img src="${card.image}" alt="${card.title}" class="imageMainCard card ${imageSizeClass}">
        <button class="hoverButton">Visitar</button>
        <div class="iconContainer heartContainer">
          <img src="./assets/heart.png" class="iconImage">
          <div class="iconText">${card.hearts}</div>
        </div>
        <div class="iconContainer photoContainer">
          <img src="./assets/camera.png" class="iconImage">
          <div class="iconText">+${card.photo}</div>
        </div>
      </div>
      <img class="card-footer-image" src="${card.profileImage}" alt="${card.user}" style='border:5px solid ${card.borderColor}'>
      <div class="card-footer">
        <div class="user-info">
          <p>${card.user}</p>
          <div class="card-footer-data">
            <img class="share-icon" src="./assets/share.png" alt="Compartir">
            <p>${card.date}</p>
          </div>
        </div>
      </div>
    `;
    cardsContainer.appendChild(cardDiv);
  });
  
};


const UNSPLASH_ACCESS_KEY = 'GymD1Pec4fPpm1OcPahSXs3VydEWaVjF4W_GGJLgDNo';
async function fetchFromUnsplash(query = '', fallback = false) {
  const orderByOptions = 'latest';
  let url = query.trim() ?
    `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&order_by=${orderByOptions}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=20` :
    `https://api.unsplash.com/photos?order_by=${orderByOptions}&client_id=${UNSPLASH_ACCESS_KEY}&per_page=20`;

  const cardsContainer = document.querySelector('.cardContainer');
  const messageContainer = document.querySelector('.messageContainer');
  cardsContainer.innerHTML='';

  try {
    const response = await fetch(url);
    const data = await response.json();
    if ((data.results && data.results.length > 0) || data.length > 0) {
      cards = (data.results || data).map(img => ({
        title: img.description || 'No title',
        description: img.alt_description || 'No description',
        image: img.urls.small,
        user: img.user.name,
        date: new Date(img.created_at).toLocaleDateString(),
        profileImage: img.user.profile_image.medium,
        borderColor: 'default',
        hearts: img.likes,
        photo: img.user.total_photos
      }));
      if(messageContainer && !fallback){
        messageContainer.innerHTML = '';
      }
      renderCards();
    }else if (!fallback) {
      // Si no se encuentran imágenes y es la primera búsqueda, intenta con "gatos"
      fetchFromUnsplash('gatos', true);
      if(messageContainer){
        messageContainer.innerHTML = '<p>Usa otra palabra o término para una búsqueda correcta</p>';
      }  
    }
     else {
      if(messageContainer){
        messageContainer.innerHTML = '<p>No se han encontrado imágenes para tus términos de búsqueda.</p>';
      }
    }
  } catch (error) {
    console.error('Error fetching images:', error);
    if(messageContainer){
      messageContainer.innerHTML = '<p>Hubo un error al cargar las imágenes. Por favor, inténtalo de nuevo.</p>';
    }
  } finally{
    const searchInput = document.querySelector('#textSearch');
    searchInput.value=''
  }
}

function setupEventListeners(searchInput) {
  
  searchInput.addEventListener('keydown', (event) => {
    console.log("Key pressed:", event.key, "| Key code:", event.keyCode, "| Search Input:", searchInput.value.trim());
      if (event.key === 'Enter') {
        fetchFromUnsplash(searchInput.value);
      }
    });

}
document.addEventListener('DOMContentLoaded', () => {
  renderNav();
  fetchFromUnsplash();
  const searchInput = document.querySelector('#textSearch');
  if (searchInput) {
    setupEventListeners(searchInput);
  }
});

