export function Navigation(navClassName) {
    const navContainer = document.createElement('section');
    navContainer.className = navClassName;
    navContainer.innerHTML = `
        <div class="logo">
          <img src="/logo.png" alt="Logo" id="logoHome">
        </div>
        <nav class="toHideIconNav">
          <ul>
            <li><a href="#">Inicio</a></li>
            <li><a href="#">Explorar</a></li>
            <li><a href="#">Crear</a></li>
          </ul>
        </nav>
        <div class="search-container">
          <img src="/find.png" alt="Buscar">
          <input id="textSearch" type="text" placeholder="Buscar. Haz click en Enter">
        </div>
        <div class="icons">
          <img class="toHideIconNav" src="/bell.png" alt="Notificaciones">
          <img class="toHideIconNav" src="/feedback.png" alt="Feedback">
          <img src="/profile.png" alt="Perfil">
        </div>
    `;
    return navContainer;
}