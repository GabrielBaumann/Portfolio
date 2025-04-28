document.addEventListener('DOMContentLoaded', function() {
    // Verificar o tema armazenado
    const savedTheme = localStorage.getItem('theme') || 'dark';
    const html = document.documentElement;
    
    // Aplicar o tema salvo
    if (savedTheme === 'dark') {
        html.classList.add('dark');
    } else {
        html.classList.remove('dark');
    }
    
    // Configurar o botão de alternância de tema
    const themeToggle = document.getElementById('theme-toggle');
    if (themeToggle) {
        themeToggle.innerHTML = savedTheme === 'dark' ? '<i class="fas fa-sun"></i>' : '<i class="fas fa-moon"></i>';
        
        themeToggle.addEventListener('click', () => {
            if (html.classList.contains('dark')) {
                html.classList.remove('dark');
                localStorage.setItem('theme', 'light');
                themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
            } else {
                html.classList.add('dark');
                localStorage.setItem('theme', 'dark');
                themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
            }
        });
    }
    
    // Highlight do menu lateral
    const sections = document.querySelectorAll('section');
    const navItems = document.querySelectorAll('.sidebar-item');
    
    function highlightNavItem() {
        let current = '';
        const scrollPosition = window.scrollY + 300;
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            
            if (scrollPosition >= sectionTop && scrollPosition <= sectionTop + sectionHeight) {
                current = section.getAttribute('id');
            }
        });
        
        navItems.forEach(item => {
            item.classList.remove('active');
            if (item.getAttribute('href') === `#${current}` || item.getAttribute('href').includes(current)) {
                item.classList.add('active');
            }
        });
    }
    
    window.addEventListener('scroll', highlightNavItem);
    highlightNavItem();

    // efeito news 
    document.querySelector('.group').addEventListener('mousemove', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        this.style.setProperty('--mouse-x', `${x}px`);
        this.style.setProperty('--mouse-y', `${y}px`);
    });

    // Usando um objeto para encapsular todas as funções do Lightbox
const Lightbox = {
    currentIndex: 0,
    images: [
        {src: "/assets/oficiofacil/Login Office - Google Chrome 28_04_2025 10_18_49.png", alt: "FinApp Dashboard"},
        {src: "/assets/oficiofacil/mobile_oficio_facil.png", alt: "FinApp Reports"},
        {src: "/assets/oficiofacil/oficio_facil.png", alt: "FinApp Analytics"},
        {src: "/assets/oficiofacil/OfícioFácil - Google Chrome 28_04_2025 10_46_27.png", alt: "FinApp Transactions"},
        {src: "/assets/oficiofacil/OfícioFácil - Google Chrome 28_04_2025 10_49_44.png", alt: "FinApp Budget"},
        {src: "/assets/oficiofacil/OfícioFácil - Google Chrome 28_04_2025 11_07_03.png", alt: "FinApp Settings"}
    ],
    
    init: function() {
        // Adiciona event listeners para todas as imagens da galeria
        document.querySelectorAll('.gallery-image img').forEach(img => {
            img.addEventListener('click', () => {
                this.open(parseInt(img.getAttribute('data-index')));
            });
        });
        
        // Prepara o slider do lightbox
        const slider = document.getElementById('lightbox-slider');
        this.images.forEach((img, index) => {
            const slide = document.createElement('div');
            slide.className = 'w-full h-full flex-shrink-0 flex items-center justify-center';
            slide.innerHTML = `<img src="${img.src}" alt="${img.alt}" class="max-w-full max-h-full object-contain">`;
            slider.appendChild(slide);
        });
        
        // Configura eventos de teclado
        document.addEventListener('keydown', (e) => {
            if (!document.getElementById('lightbox').classList.contains('hidden')) {
                if (e.key === 'Escape') this.close();
                if (e.key === 'ArrowLeft') this.navigate(-1);
                if (e.key === 'ArrowRight') this.navigate(1);
            }
        });
        
        // Configura toque para mobile
        this.setupTouch();
    },
    
    open: function(index) {
        this.currentIndex = index;
        document.getElementById('lightbox').classList.remove('hidden');
        document.body.style.overflow = 'hidden';
        this.update();
    },
    
    close: function() {
        document.getElementById('lightbox').classList.add('hidden');
        document.body.style.overflow = 'auto';
    },
    
    navigate: function(direction) {
        this.currentIndex += direction;
        if (this.currentIndex < 0) this.currentIndex = this.images.length - 1;
        if (this.currentIndex >= this.images.length) this.currentIndex = 0;
        this.update();
    },
    
    update: function() {
        const slider = document.getElementById('lightbox-slider');
        const caption = document.getElementById('lightbox-caption');
        const counter = document.getElementById('lightbox-counter');
        
        slider.style.transform = `translateX(-${this.currentIndex * 100}%)`;
        caption.textContent = this.images[this.currentIndex].alt;
        counter.textContent = `${this.currentIndex + 1} / ${this.images.length}`;
    },
    
    setupTouch: function() {
        const slider = document.getElementById('lightbox-slider');
        let startX = 0;
        let isDragging = false;
        
        slider.addEventListener('touchstart', (e) => {
            startX = e.touches[0].clientX;
            isDragging = true;
            slider.style.transition = 'none';
        }, {passive: true});
        
        slider.addEventListener('touchmove', (e) => {
            if (!isDragging) return;
            const x = e.touches[0].clientX;
            const diff = startX - x;
            slider.style.transform = `translateX(calc(-${this.currentIndex * 100}% - ${diff}px))`;
        }, {passive: true});
        
        slider.addEventListener('touchend', (e) => {
            if (!isDragging) return;
            isDragging = false;
            
            const endX = e.changedTouches[0].clientX;
            const diff = startX - endX;
            
            slider.style.transition = 'transform 0.3s ease';
            
            if (Math.abs(diff) > 50) {
                if (diff > 0) {
                    this.navigate(1);
                } else {
                    this.navigate(-1);
                }
            } else {
                this.update();
            }
        }, {passive: true});
    }
};

// Inicializa o Lightbox quando o DOM estiver carregado
document.addEventListener('DOMContentLoaded', () => {
    Lightbox.init();
    
    // Fechar ao clicar fora da imagem
    document.getElementById('lightbox').addEventListener('click', function(e) {
        if (e.target === this) {
            Lightbox.close();
        }
    });
});
});