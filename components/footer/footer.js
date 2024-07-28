export function Footer() {
    const footer = document.createElement('footer');
    const footerMenu = document.createElement('section');
    footerMenu.id = 'footerMenu';
    const copyright = document.createElement('p');
    copyright.textContent = '© 2024 Pinterest Demo JIMA. All rights reserved.';

    footerMenu.appendChild(copyright);
    footer.appendChild(footerMenu);

    return footer;
}