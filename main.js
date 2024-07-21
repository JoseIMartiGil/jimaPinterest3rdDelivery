document.addEventListener('DOMContentLoaded', () => {
  const navContainer = document.querySelector('.nav-container');
  navContainer.innerHTML = `
    <div class="logo">
      <img src="./assets/logo.png" alt="Logo">
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
      <input type="text" placeholder="Buscar">
    </div>
    <div class="icons">
      <img class="toHideIconNav" src="./assets/bell.png" alt="Notificaciones">
      <img class="toHideIconNav" src="./assets/feedback.png" alt="Feedback">
      <img src="./assets/profile.png" alt="Perfil">
    </div>
  `;

  const cards = [
      { title: 'Card 1', description: 'Description for card 1', image: 'https://picsum.photos/200/300', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32',borderColor:'red' , hearts:90, photo:30 },
      { title: 'Card 2', description: 'Description for card 2', image: 'https://picsum.photos/200/301', user: 'Tom Williams', date: '05/10/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'green', hearts:0, photo:30},
      { title: 'Card 3', description: 'Description for card 3', image: 'https://picsum.photos/200/302', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32',borderColor:'yellow', hearts:10, photo:30 },
      { title: 'Card 4', description: 'Description for card 4', image: 'https://picsum.photos/200/303', user: 'Tom Williams', date: '26/3/2024', profileImage: 'https://picsum.photos/32' ,borderColor:'purple', hearts:120, photo:30},
      { title: 'Card 5', description: 'Description for card 5', image: 'https://picsum.photos/200/304', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32',borderColor:'red', hearts:900, photo:30 },
      { title: 'Card 6', description: 'Description for card 1', image: 'https://picsum.photos/200/300', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'green', hearts:9, photo:30},
      { title: 'Card 7', description: 'Description for card 2', image: 'https://picsum.photos/200/301', user: 'Tom Williams', date: '05/10/2023', profileImage: 'https://picsum.photos/32',borderColor:'green' , hearts:10, photo:30},
      { title: 'Card 8', description: 'Description for card 3', image: 'https://picsum.photos/200/302', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'yellow', hearts:20, photo:30},
      { title: 'Card 9', description: 'Description for card 4', image: 'https://picsum.photos/200/303', user: 'Tom Williams', date: '26/3/2024', profileImage: 'https://picsum.photos/32',borderColor:'purple', hearts:900, photo:30 },
      { title: 'Card 10', description: 'Description for card 5', image: 'https://picsum.photos/200/304', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32',borderColor:'brown', hearts:950, photo:30 },
      { title: 'Card 11', description: 'Description for card 1', image: 'https://picsum.photos/200/300', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'violet', hearts:40, photo:30},
      { title: 'Card 12', description: 'Description for card 2', image: 'https://picsum.photos/200/301', user: 'Tom Williams', date: '05/10/2023', profileImage: 'https://picsum.photos/32',borderColor:'pink', hearts:34, photo:30},
      { title: 'Card 13', description: 'Description for card 3', image: 'https://picsum.photos/200/302', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'orange', hearts:91, photo:30},
      { title: 'Card 14', description: 'Description for card 4', image: 'https://picsum.photos/200/303', user: 'Tom Williams', date: '26/3/2024', profileImage: 'https://picsum.photos/32' ,borderColor:'green', hearts:19, photo:30},
      { title: 'Card 15', description: 'Description for card 5', image: 'https://picsum.photos/200/304', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'red', hearts:34, photo:30},
      { title: 'Card 16', description: 'Description for card 1', image: 'https://picsum.photos/200/300', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'green', hearts:23, photo:30},
      { title: 'Card 17', description: 'Description for card 2', image: 'https://picsum.photos/200/301', user: 'Tom Williams', date: '05/10/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'violet', hearts:22, photo:30},
      { title: 'Card 18', description: 'Description for card 3', image: 'https://picsum.photos/200/302', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'green', hearts:0, photo:30},
      { title: 'Card 19', description: 'Description for card 4', image: 'https://picsum.photos/200/303', user: 'Tom Williams', date: '26/3/2024', profileImage: 'https://picsum.photos/32' ,borderColor:'yellow', hearts:10, photo:30},
      { title: 'Card 20', description: 'Description for card 5', image: 'https://picsum.photos/200/304', user: 'Natalia Sanchez', date: '26/11/2023', profileImage: 'https://picsum.photos/32' ,borderColor:'brown', hearts:12, photo:30},
  ];
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
  
});