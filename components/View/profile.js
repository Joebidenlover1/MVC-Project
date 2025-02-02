class Navigation {
    constructor(iconId, menuId) {
        this.icon = document.getElementById(iconId);
        this.menu = document.getElementById(menuId);
        this.init();
    }

    init() {
        this.icon.addEventListener('click', () => {
            this.menu.style.display = this.menu.style.display === 'block' ? 'none' : 'block';
        });
    }
}

// Initialize the navigation
new Navigation('navIcon', 'navMenu');
