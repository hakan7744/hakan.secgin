// Sayfa yüklendiğinde çalışacak fonksiyonlar
document.addEventListener('DOMContentLoaded', function() {
    // Animasyonlu sayfa içi geçişler
    setupSmoothScrolling();
    
    // İletişim formu işleme
    setupContactForm();
    
    // Scroll olayları için görünüm animasyonları 
    setupScrollAnimations();
});

// Sayfa içi geçişler için düzgün kaydırma
function setupSmoothScrolling() {
    const links = document.querySelectorAll('nav a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
}

// İletişim formu gönderme ve doğrulama
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Form verilerini alma
            const name = document.getElementById('name').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Basit doğrulama
            if (name === '' || email === '' || message === '') {
                showFormMessage('Lütfen tüm alanları doldurun.', 'error');
                return;
            }
            
            if (!isValidEmail(email)) {
                showFormMessage('Lütfen geçerli bir e-posta adresi girin.', 'error');
                return;
            }
            
            // Form gönderildi mesajı (normalde burada bir AJAX çağrısı yapılır)
            showFormMessage('Mesajınız başarıyla gönderildi! En kısa sürede size dönüş yapacağım.', 'success');
            contactForm.reset();
        });
    }
}

// E-posta doğrulama
function isValidEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

// Form mesajlarını gösterme
function showFormMessage(message, type) {
    // Mevcut mesaj varsa kaldır
    const existingMessage = document.querySelector('.form-message');
    if (existingMessage) {
        existingMessage.remove();
    }
    
    // Yeni mesaj oluştur
    const messageElement = document.createElement('div');
    messageElement.className = `form-message ${type}`;
    messageElement.textContent = message;
    
    // Forma ekle
    const form = document.getElementById('contact-form');
    form.appendChild(messageElement);
    
    // 3 saniye sonra mesajı kaldır
    setTimeout(() => {
        messageElement.classList.add('fade-out');
        setTimeout(() => {
            messageElement.remove();
        }, 500);
    }, 3000);
}

// Sayfa kaydırma animasyonları
function setupScrollAnimations() {
    // Blog kartlarına animasyon ekle
    const blogCards = document.querySelectorAll('.blog-card');
    if (blogCards.length > 0) {
        blogCards.forEach((card, index) => {
            // Karta gecikme ekleyerek sırayla görünmesini sağla
            setTimeout(() => {
                card.classList.add('visible');
            }, 100 * index);
        });
    }
    
    // Scroll olayını dinle ve görünüm içine giren elementlere animasyon ekle
    window.addEventListener('scroll', function() {
        const interestCards = document.querySelectorAll('.interest-card');
        interestCards.forEach(card => {
            if (isElementInViewport(card) && !card.classList.contains('animate')) {
                card.classList.add('animate');
            }
        });
        
        const galleryItems = document.querySelectorAll('.gallery-item');
        galleryItems.forEach(item => {
            if (isElementInViewport(item) && !item.classList.contains('animate')) {
                item.classList.add('animate');
            }
        });
    });
}

// Element görünüm alanında mı kontrolü
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top <= (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom >= 0
    );
}

// Ekrandaki aktif bölümü izleme ve menü vurgusu
window.addEventListener('scroll', function() {
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('nav ul li a');
    
    let currentSectionId = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop - 100;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
            currentSectionId = section.getAttribute('id');
        }
    });
    
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${currentSectionId}`) {
            link.classList.add('active');
        }
    });
});