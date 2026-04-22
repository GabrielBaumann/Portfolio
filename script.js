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
});