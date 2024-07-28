//https://cs.fyi/guide/secret-management-best-practices

let cards = []; 
let imageSizeClass = 'image_small'; 
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
          <img src="/heart.png" class="iconImage">
          <div class="iconText">${card.hearts}</div>
        </div>
        <div class="iconContainer photoContainer">
          <img src="/camera.png" class="iconImage">
          <div class="iconText">+${card.photo}</div>
        </div>
      </div>
      <img class="card-footer-image" src="${card.profileImage}" alt="${card.user}" style='border:5px solid ${card.borderColor}'>
      <div class="card-footer">
        <div class="user-info">
          <p>${card.user}</p>
          <div class="card-footer-data">
            <img class="share-icon" src="/share.png" alt="Compartir">
            <p>${card.date}</p>
          </div>
        </div>
      </div>
    `;
    cardsContainer.appendChild(cardDiv);
  });
  
};

const UNSPLASH_ACCESS_KEY =  import.meta.env.VITE_UNSPLASH_ACCESS_KEY;
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
      renderCards();
      if(messageContainer && !fallback){
        messageContainer.innerHTML = '';
      }
    }else if (!fallback) {
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
    if (event.key === 'Enter') {
      fetchFromUnsplash(searchInput.value);
    }
  });
}

import { Header } from './components/header/header.js';
import { Navigation } from './components/header/navigation.js';
import { Footer } from './components/footer/footer.js';
import { MessageContainer } from './components/body/messageContainer.js';
import { CardContainer } from './components/body/cardContainer.js';

document.addEventListener('DOMContentLoaded', () => {
  const root = document.getElementById('root');
  const header = Header()
  root.appendChild(header);

  const navigation = Navigation('nav-container');
  const logo = navigation.querySelector('#logoHome');
  logo.addEventListener('click', () => {
      fetchFromUnsplash();
  });
  header.appendChild(navigation);

  const main = document.createElement('main');
  main.appendChild(MessageContainer());
  main.appendChild(CardContainer());
  root.appendChild(main);
  fetchFromUnsplash();
  const searchInput = document.querySelector('#textSearch');
  if (searchInput) {
    setupEventListeners(searchInput);
  }

  root.appendChild(Footer());
});

