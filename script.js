document.addEventListener('DOMContentLoaded', () => {
    const surpriseBtn = document.getElementById('surpriseBtn');
    const birthdaySong = document.getElementById('birthdaySong');
    const screens = document.querySelectorAll('.screen');
    
    // Ускоренные анимации
    const animationDuration = 0.4; // секунды
    
    // 1. При нажатии на кнопку:
    surpriseBtn.addEventListener('click', () => {
        surpriseBtn.textContent = "Поехали! 🚀";
        surpriseBtn.style.transform = "scale(1.1)";
        
        // Запуск песни
        birthdaySong.play();
        
        // Запуск конфетти
        confetti({
            particleCount: 250,
            spread: 80,
            origin: { y: 0.6 },
            colors: ['#ffd700', '#ffcc00', '#ffffff'],
            scalar: 1.2
        });

        // Автопрокрутка с ускоренными анимациями
        let currentScreen = 0;
        const scrollInterval = setInterval(() => {
            if (currentScreen < screens.length - 1) {
                currentScreen++;
                window.scrollTo({
                    top: screens[currentScreen].offsetTop,
                    behavior: 'smooth'
                });
                
                // Дополнительные конфетти для некоторых экранов
                if (currentScreen % 2 === 0) {
                    confetti({ 
                        particleCount: 120, 
                        spread: 60,
                        origin: { y: 0.5 }
                    });
                }
            } else {
                clearInterval(scrollInterval);
            }
        }, 3500); // Уменьшен интервал между экранами
    });

    // Ускоренная анимация при скролле
    document.querySelectorAll('.anim-fly, .anim-scale, .anim-pop').forEach(el => {
        el.style.transitionDuration = `${animationDuration}s`;
    });

    // Параллакс-эффект для фото
    window.addEventListener('scroll', () => {
        const scrollY = window.scrollY * 0.3;
        document.querySelectorAll('.photo').forEach((img, index) => {
            img.style.transform = `translateY(${scrollY * (0.1 + index * 0.01)}px)`;
        });
    });

    // 3D-эффект для карточек
    document.querySelectorAll('.card').forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            card.style.transform = `
                rotateX(${(centerY - y) / 15}deg)
                rotateY(${(x - centerX) / 15}deg)
                scale(1.05)
            `;
        });

        card.addEventListener('mouseleave', () => {
            card.style.transform = 'rotateY(0) scale(1)';
        });
    });

    // Активация ленты памяти при прокрутке к ней
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            }
        });
    }, {threshold: 0.5});

    document.querySelector('.memory-tape').classList.remove('active');
    observer.observe(document.querySelector('.memory-tape'));

    // Приколюха для фото - при клике увеличиваем
    document.querySelectorAll('.grid-container img').forEach(img => {
        img.addEventListener('click', function() {
            this.classList.toggle('zoom-photo');
        });
    });
});