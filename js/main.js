// ========================================
// CapVert Emotions - JavaScript
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // ===== Navigation entre les onglets =====
    const navLinks = document.querySelectorAll('.nav-link:not(.nav-item-dropdown > .nav-link)');
    const dropdownLinks = document.querySelectorAll('.dropdown-link');
    const allNavLinks = [...navLinks, ...dropdownLinks];
    const sections = document.querySelectorAll('.section');
    
    // Fonction pour changer d'onglet
    function switchTab(targetId) {
        // Retire la classe active de tous les liens
        navLinks.forEach(link => link.classList.remove('active'));
        
        // Retire la classe active de toutes les sections
        sections.forEach(section => section.classList.remove('section-active'));
        
        // Ajoute la classe active au lien cliqué
        const activeLink = document.querySelector(`a[href="#${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
        
        // Affiche la section correspondante
        const targetSection = document.getElementById(targetId);
        if (targetSection) {
            targetSection.classList.add('section-active');
            
            // Scroll vers le haut de la section
            window.scrollTo({
                top: targetSection.offsetTop - 80,
                behavior: 'smooth'
            });
        }
        
        // Gestion de la Hero Section : ajouter/retirer classe sur body
        if (targetId === 'contact') {
            document.body.classList.add('contact-active');
        } else {
            document.body.classList.remove('contact-active');
        }
        
        // Ferme le menu mobile si ouvert
        const navMenu = document.getElementById('navMenu');
        navMenu.classList.remove('active');
        
        // Met à jour l'URL sans recharger la page
        history.pushState(null, '', `#${targetId}`);
    }
    
    // Écoute les clics sur les liens de navigation
    allNavLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            // Seulement empêcher le défaut pour les liens internes (#)
            if (href && href.startsWith('#')) {
                e.preventDefault();
                const targetId = href.substring(1);
                switchTab(targetId);
            }
            // Sinon, laisser le lien fonctionner normalement (ex: annonces.html)
        });
    });
    
    // Gère le hash dans l'URL au chargement
    function handleInitialHash() {
        const hash = window.location.hash.substring(1);
        if (hash && document.getElementById(hash)) {
            switchTab(hash);
        } else {
            // Par défaut, affiche la section Découvrir
            switchTab('decouvrir');
        }
    }
    
    // Gère les changements de hash
    window.addEventListener('hashchange', function() {
        const hash = window.location.hash.substring(1);
        if (hash) {
            switchTab(hash);
        }
    });
    
    // Initialise au chargement
    handleInitialHash();
    
    
    // ===== Menu hamburger mobile =====
    const menuToggle = document.getElementById('menuToggle');
    const navMenu = document.getElementById('navMenu');
    
    menuToggle.addEventListener('click', function() {
        navMenu.classList.toggle('active');
        
        // Animation du bouton hamburger
        const spans = this.querySelectorAll('span');
        if (navMenu.classList.contains('active')) {
            spans[0].style.transform = 'rotate(45deg) translateY(10px)';
            spans[1].style.opacity = '0';
            spans[2].style.transform = 'rotate(-45deg) translateY(-10px)';
        } else {
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    // Ferme le menu en cliquant en dehors
    document.addEventListener('click', function(e) {
        if (!navMenu.contains(e.target) && !menuToggle.contains(e.target)) {
            navMenu.classList.remove('active');
            const spans = menuToggle.querySelectorAll('span');
            spans[0].style.transform = 'none';
            spans[1].style.opacity = '1';
            spans[2].style.transform = 'none';
        }
    });
    
    
    // ===== Dropdown mobile toggle =====
    const dropdownParents = document.querySelectorAll('.nav-item-dropdown');
    
    dropdownParents.forEach(parent => {
        const toggle = parent.querySelector('.nav-link');
        
        toggle.addEventListener('click', function(e) {
            // Ne prévient pas le comportement par défaut que si c'est le parent dropdown
            if (parent.classList.contains('nav-item-dropdown')) {
                e.preventDefault();
                
                // Ferme les autres dropdowns
                document.querySelectorAll('.nav-item-dropdown').forEach(item => {
                    if (item !== parent) {
                        item.classList.remove('active');
                    }
                });
                
                // Toggle le dropdown actuel
                parent.classList.toggle('active');
            }
        });
    });
    
    // Fermer le menu mobile après sélection dropdown
    dropdownLinks.forEach(link => {
        link.addEventListener('click', function() {
            // Ferme le menu mobile après sélection
            navMenu.classList.remove('active');
            // Ferme le dropdown
            this.closest('.nav-item-dropdown').classList.remove('active');
        });
    });
    
    
    // ===== Header sticky avec effet au scroll =====
    const header = document.getElementById('header');
    let lastScroll = 0;
    
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Ajoute une ombre au header lors du scroll
        if (currentScroll > 100) {
            header.style.boxShadow = '0 5px 20px rgba(0,0,0,0.15)';
        } else {
            header.style.boxShadow = '0 2px 10px rgba(0,0,0,0.1)';
        }
        
        lastScroll = currentScroll;
    });
    
    
    // ===== Bouton retour en haut =====
    const scrollTopBtn = document.getElementById('scrollTop');
    
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 500) {
            scrollTopBtn.classList.add('show');
        } else {
            scrollTopBtn.classList.remove('show');
        }
    });
    
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
    
    
    // ===== Animation au scroll pour les cartes =====
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.style.opacity = '1';
                entry.target.style.transform = 'translateY(0)';
            }
        });
    }, observerOptions);
    
    // Observe tous les éléments avec animation
    const animatedElements = document.querySelectorAll('.island-card, .hebergement-card, .activite-card, .info-item');
    animatedElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
    
    
    // ===== Formulaire de contact =====
    const contactForm = document.getElementById('contactForm');
    
    contactForm.addEventListener('submit', async function(e) {
        e.preventDefault();
        e.stopPropagation();
        e.stopImmediatePropagation();
        
        // Récupère les valeurs
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const subject = document.getElementById('subject').value;
        const message = document.getElementById('message').value;
        
        // Validation basique
        if (!name || !email || !subject || !message) {
            showNotification('Veuillez remplir tous les champs', 'error');
            return;
        }
        
        // Validation email
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            showNotification('Veuillez entrer une adresse email valide', 'error');
            return;
        }
        
        // Désactive le bouton pendant l'envoi
        const submitBtn = contactForm.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.disabled = true;
        submitBtn.textContent = 'Envoi en cours...';
        
        // Envoi via Web3Forms
        try {
            const formData = new FormData(contactForm);
            
            const response = await fetch('https://api.web3forms.com/submit', {
                method: 'POST',
                body: formData
            });
            
            const data = await response.json();
            
            if (data.success) {
                showNotification('✅ Message envoyé avec succès ! Nous vous répondrons bientôt.', 'success');
                contactForm.reset();
            } else {
                showNotification('❌ Une erreur est survenue. Veuillez réessayer.', 'error');
            }
        } catch (error) {
            showNotification('❌ Erreur de connexion. Veuillez réessayer.', 'error');
            console.error('Erreur:', error);
        } finally {
            // Réactive le bouton
            submitBtn.disabled = false;
            submitBtn.textContent = originalText;
        }
        
        return false;
    });
    
    
    // ===== Système de notifications =====
    function showNotification(message, type = 'info') {
        // Crée l'élément notification
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        
        // Style de la notification
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            padding: 1rem 1.5rem;
            background-color: ${type === 'success' ? '#4CAF50' : type === 'error' ? '#f44336' : '#2196F3'};
            color: white;
            border-radius: 8px;
            box-shadow: 0 5px 20px rgba(0,0,0,0.2);
            z-index: 10000;
            animation: slideIn 0.3s ease;
            max-width: 350px;
            font-weight: 500;
        `;
        
        // Ajoute l'animation CSS
        if (!document.getElementById('notification-styles')) {
            const style = document.createElement('style');
            style.id = 'notification-styles';
            style.textContent = `
                @keyframes slideIn {
                    from {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                    to {
                        transform: translateX(0);
                        opacity: 1;
                    }
                }
                @keyframes slideOut {
                    from {
                        transform: translateX(0);
                        opacity: 1;
                    }
                    to {
                        transform: translateX(400px);
                        opacity: 0;
                    }
                }
            `;
            document.head.appendChild(style);
        }
        
        // Ajoute au document
        document.body.appendChild(notification);
        
        // Retire après 4 secondes
        setTimeout(() => {
            notification.style.animation = 'slideOut 0.3s ease';
            setTimeout(() => {
                document.body.removeChild(notification);
            }, 300);
        }, 4000);
    }
    
    
    // ===== Liens hero vers sections =====
    const heroBtn = document.querySelector('.hero .btn-primary');
    if (heroBtn) {
        heroBtn.addEventListener('click', function(e) {
            e.preventDefault();
            switchTab('decouvrir');
        });
    }
    
    
    // ===== Smooth scroll pour tous les liens d'ancre =====
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            const href = this.getAttribute('href');
            
            // Ignore les liens qui sont déjà gérés par la navigation
            if (this.classList.contains('nav-link')) {
                return;
            }
            
            if (href !== '#' && href.length > 1) {
                const targetId = href.substring(1);
                const targetElement = document.getElementById(targetId);
                
                if (targetElement) {
                    e.preventDefault();
                    
                    // Si c'est une section, utilise switchTab
                    if (targetElement.classList.contains('section')) {
                        switchTab(targetId);
                    } else {
                        // Sinon, scroll normal
                        window.scrollTo({
                            top: targetElement.offsetTop - 80,
                            behavior: 'smooth'
                        });
                    }
                }
            }
        });
    });
    
    
    // ===== Lazy loading des images (optimisation) =====
    const images = document.querySelectorAll('img[loading="lazy"]');
    
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const img = entry.target;
                    img.src = img.src; // Force le chargement
                    img.classList.add('loaded');
                    imageObserver.unobserve(img);
                }
            });
        });
        
        images.forEach(img => imageObserver.observe(img));
    }
    
    
    // ===== Gestion des erreurs d'images =====
    document.querySelectorAll('img').forEach(img => {
        img.addEventListener('error', function() {
            // Image de fallback si une image ne charge pas
            this.style.backgroundColor = '#e0e0e0';
            this.style.minHeight = '200px';
            this.alt = 'Image non disponible';
        });
    });
    
    
    // ===== Performance: Debounce pour les événements scroll =====
    function debounce(func, wait) {
        let timeout;
        return function executedFunction(...args) {
            const later = () => {
                clearTimeout(timeout);
                func(...args);
            };
            clearTimeout(timeout);
            timeout = setTimeout(later, wait);
        };
    }
    
    // Applique le debounce au scroll
    window.addEventListener('scroll', debounce(function() {
        // Code de scroll optimisé
    }, 100));
    
    
    // ===== Console log stylisé =====
    console.log(
        '%c🏝️ CapVert Emotions',
        'color: #00B4D8; font-size: 24px; font-weight: bold; text-shadow: 2px 2px 4px rgba(0,0,0,0.1);'
    );
    console.log(
        '%cSite créé avec passion ❤️',
        'color: #FF6B6B; font-size: 14px;'
    );
    
});

// ===== Gestion de l'état de chargement =====
window.addEventListener('load', function() {
    // Masque le loader si présent
    const loader = document.querySelector('.loader');
    if (loader) {
        loader.style.display = 'none';
    }
    
    // Ajoute la classe loaded au body
    document.body.classList.add('loaded');
});

// ===== Export des fonctions pour utilisation externe =====
window.CapVertEmotions = {
    switchTab: function(tabId) {
        const event = new CustomEvent('switchTab', { detail: { tabId } });
        document.dispatchEvent(event);
    }
};