// Ana JavaScript Dosyası
document.addEventListener('DOMContentLoaded', function() {
    // Mobil menü
    const menuToggle = document.querySelector('.menu-toggle');
    const nav = document.querySelector('nav');
    
    if (menuToggle) {
        menuToggle.addEventListener('click', function() {
            nav.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
    }
    
    // Sayfa kaydırma animasyonları
    const animateOnScroll = function() {
        const elementsToAnimate = document.querySelectorAll('.post-card, .category-card');
        
        elementsToAnimate.forEach(element => {
            const elementPosition = element.getBoundingClientRect().top;
            const screenHeight = window.innerHeight;
            
            if (elementPosition < screenHeight * 0.9) {
                element.style.opacity = '1';
                element.style.transform = 'translateY(0)';
            }
        });
    };
    
    // İlk yüklendiğinde elementleri gizle
    document.querySelectorAll('.post-card, .category-card').forEach(element => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
    });
    
    // Sayfa yüklendiğinde ve kaydırma olduğunda animasyon uygula
    window.addEventListener('load', animateOnScroll);
    window.addEventListener('scroll', animateOnScroll);
    
    // Form gönderimi
    const forms = document.querySelectorAll('form');
    forms.forEach(form => {
        form.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const emailInput = this.querySelector('input[type="email"]');
            
            if (emailInput && emailInput.value) {
                // Form doğrulama başarılı
                const successMessage = document.createElement('div');
                successMessage.className = 'success-message';
                successMessage.textContent = 'Abone olduğunuz için teşekkür ederiz!';
                successMessage.style.color = '#10b981';
                successMessage.style.marginTop = '10px';
                
                // Var olan mesaj elemanını kaldır
                const existingMessage = this.querySelector('.success-message');
                if (existingMessage) {
                    existingMessage.remove();
                }
                
                // Form sonuna mesaj ekle
                this.appendChild(successMessage);
                
                // Formu sıfırla
                this.reset();
                
                // 3 saniye sonra mesajı gizle
                setTimeout(() => {
                    successMessage.style.opacity = '0';
                    successMessage.style.transition = 'opacity 0.5s ease';
                    
                    setTimeout(() => {
                        successMessage.remove();
                    }, 500);
                }, 3000);
            }
        });
    });
});