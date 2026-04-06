// Language translations
const translations = {
    en: {
        // Header
        'app.title': 'Instagram Giveaway Application',
        'app.subtitle': 'Pick random winners from comments',
        
        // Post Link Section
        'post.link.title': 'Instagram Post Link',
        'post.link.placeholder': 'https://www.instagram.com/p/...',
        'post.link.max.comments': 'Maximum Comment Count (Less = Faster)',
        'post.link.max.1000': '1,000 comments (Very Fast - ~30 seconds)',
        'post.link.max.3000': '3,000 comments (Fast - ~1-2 minutes)',
        'post.link.max.5000': '5,000 comments (Medium - ~2-3 minutes)',
        'post.link.max.10000': '10,000 comments (Slow - ~5-7 minutes)',
        'post.link.max.all': 'All (Very Slow - may take long)',
        'post.link.info': 'If there are too many comments, you can speed it up by selecting a lower limit.',
        
        // Login Section
        'login.title': 'Instagram Login',
        'login.subtitle': 'Click to expand',
        'login.required': 'Login required to fetch comments',
        'login.method.username': 'Method 1: Username & Password',
        'login.username': 'Username',
        'login.password': 'Password',
        'login.2fa.code': '2FA Code (if requested)',
        'login.2fa.placeholder': 'Enter if requested',
        'login.btn': 'Login',
        'login.method.cookie': 'Method 2: Session Cookie',
        'login.cookie.info': 'Get sessionid and csrftoken from browser cookies',
        'login.cookie.help': 'How to get cookies?',
        'login.sessionid': 'sessionid',
        'login.csrftoken': 'csrftoken',
        'login.import': 'Import Session Cookie',
        'login.status': 'Login Status',
        
        // Action Buttons
        'btn.fetch': 'Fetch Comments',
        'btn.draw': 'Make Draw',
        
        // Draw Settings
        'draw.settings': 'Draw Settings',
        'draw.winner.count': 'Winner Count',
        'draw.reserve.count': 'Reserve Count',
        'draw.info': 'Set the number of winners and reserves. All winners are randomly selected.',
        
        // Loading
        'loading.fetch': 'Fetching comments...',
        'loading.wait': 'Please wait, this may take a while...',
        
        // Draw Animation
        'draw.animation.title': 'Making Draw...',
        'draw.animation.subtitle': 'Analyzing participants...',
        
        // Results
        'results.title': 'Giveaway Results',
        'results.post.info': 'Post Information',
        'results.post.owner': 'Owner',
        'results.post.view': 'View on Instagram',
        'results.winners': 'Winners',
        'results.reserves': 'Reserves',
        'results.stats': 'Statistics',
        'results.total.participants': 'Total Participants',
        'results.no.reserves': 'No reserves selected',
        
        // Footer
        'footer.made': 'Made with',
        'footer.for': 'for fair giveaways',
        'footer.created': 'Created by',
        
        // Cookie Help Modal
        'cookie.help.title': 'How to Get Instagram Session Cookies?',
        'cookie.help.step1.title': '1. Login to Instagram',
        'cookie.help.step1.desc': 'Login to instagram.com in your browser (complete 2FA)',
        'cookie.help.step2.title': '2. Open Developer Tools',
        'cookie.help.step2.chrome': 'Chrome/Edge/Brave: Press F12 > Application tab > Cookies > instagram.com',
        'cookie.help.step2.firefox': 'Firefox: Press F12 > Storage tab > Cookies > instagram.com',
        'cookie.help.step3.title': '3. Copy Values',
        'cookie.help.step3.desc': 'Find "sessionid" and "csrftoken", copy their values',
        'cookie.help.step4.title': '4. Paste Here',
        'cookie.help.step4.desc': 'Paste the values in the fields above and click import',
        'cookie.help.close': 'Close',
        
        // Messages
        'msg.login.success': 'Login successful!',
        'msg.session.imported': 'Session successfully imported!',
        'msg.comments.fetched': 'comments fetched successfully!',
        'msg.select.winner.count': 'Please select the number of winners and reserves',
        'msg.more.than.participants': 'Total winners and reserves cannot exceed the number of participants!',
        'msg.fetch.first': 'Please fetch comments first!',
        'msg.error': 'Error',
        'msg.fill.fields': 'Please fill in all required fields',
        'msg.invalid.url': 'Please enter a valid Instagram post link!',
        'msg.enter.url': 'Please enter a post URL',
        'msg.connection.error': 'Connection error',
        'msg.fetched': 'fetched',
        'msg.estimated.total': 'Estimated total',
        'msg.post.owner': 'Owner',
        'msg.view.post': 'View Post',
    },
    tr: {
        // Header
        'app.title': 'Instagram Çekiliş Uygulaması',
        'app.subtitle': 'Yorumlardan rastgele kazanan seç',
        
        // Post Link Section
        'post.link.title': 'Instagram Post Linki',
        'post.link.placeholder': 'https://www.instagram.com/p/...',
        'post.link.max.comments': 'Maksimum Yorum Sayısı (Daha az = Daha hızlı)',
        'post.link.max.1000': '1.000 yorum (Çok Hızlı - ~30 saniye)',
        'post.link.max.3000': '3.000 yorum (Hızlı - ~1-2 dakika)',
        'post.link.max.5000': '5.000 yorum (Orta - ~2-3 dakika)',
        'post.link.max.10000': '10.000 yorum (Yavaş - ~5-7 dakika)',
        'post.link.max.all': 'Tümü (Çok Yavaş - uzun sürebilir)',
        'post.link.info': 'Çok fazla yorum varsa daha düşük limit seçerek hızlandırabilirsiniz.',
        
        // Login Section
        'login.title': 'Instagram Girişi',
        'login.subtitle': 'Genişletmek için tıklayın',
        'login.required': 'Yorumları çekmek için giriş gerekli',
        'login.method.username': 'Yöntem 1: Kullanıcı Adı & Şifre',
        'login.username': 'Kullanıcı Adı',
        'login.password': 'Şifre',
        'login.2fa.code': '2FA Kodu (istenirse)',
        'login.2fa.placeholder': 'İstenirse girin',
        'login.btn': 'Giriş Yap',
        'login.method.cookie': 'Yöntem 2: Session Cookie',
        'login.cookie.info': 'Tarayıcı cookie\'lerinden sessionid ve csrftoken alın',
        'login.cookie.help': 'Cookie\'ler nasıl alınır?',
        'login.sessionid': 'sessionid',
        'login.csrftoken': 'csrftoken',
        'login.import': 'Session Cookie İçe Aktar',
        'login.status': 'Giriş Durumu',
        
        // Action Buttons
        'btn.fetch': 'Yorumları Çek',
        'btn.draw': 'Çekiliş Yap',
        
        // Draw Settings
        'draw.settings': 'Çekiliş Ayarları',
        'draw.winner.count': 'Kazanan Sayısı',
        'draw.reserve.count': 'Yedek Sayısı',
        'draw.info': 'Kazanan ve yedek sayılarını belirleyin. Tüm kazananlar tamamen rastgele seçilir.',
        
        // Loading
        'loading.fetch': 'Yorumlar çekiliyor...',
        'loading.wait': 'Lütfen bekleyin, bu biraz zaman alabilir...',
        
        // Draw Animation
        'draw.animation.title': 'Çekiliş Yapılıyor...',
        'draw.animation.subtitle': 'Katılımcılar analiz ediliyor...',
        
        // Results
        'results.title': 'Çekiliş Sonuçları',
        'results.post.info': 'Gönderi Bilgileri',
        'results.post.owner': 'Sahip',
        'results.post.view': 'Instagram\'da Görüntüle',
        'results.winners': 'Kazananlar',
        'results.reserves': 'Yedekler',
        'results.stats': 'İstatistikler',
        'results.total.participants': 'Toplam Katılımcı',
        'results.no.reserves': 'Yedek seçilmedi',
        
        // Footer
        'footer.made': 'Made with',
        'footer.for': 'for fair giveaways',
        'footer.created': 'Created by',
        
        // Cookie Help Modal
        'cookie.help.title': 'Instagram Session Cookie\'leri Nasıl Alınır?',
        'cookie.help.step1.title': '1. Instagram\'a Giriş Yapın',
        'cookie.help.step1.desc': 'Tarayıcınızda instagram.com\'a giriş yapın (2FA dahil)',
        'cookie.help.step2.title': '2. Geliştirici Araçlarını Açın',
        'cookie.help.step2.chrome': 'Chrome/Edge/Brave: F12 tuşu > Application sekmesi > Cookies > instagram.com',
        'cookie.help.step2.firefox': 'Firefox: F12 tuşu > Storage sekmesi > Cookies > instagram.com',
        'cookie.help.step3.title': '3. Değerleri Kopyalayın',
        'cookie.help.step3.desc': '"sessionid" ve "csrftoken" bulun, değerlerini kopyalayın',
        'cookie.help.step4.title': '4. Buraya Yapıştırın',
        'cookie.help.step4.desc': 'Yukarıdaki alanlara yapıştırın ve içe aktar\'a tıklayın',
        'cookie.help.close': 'Kapat',
        
        // Messages
        'msg.login.success': 'Giriş başarılı!',
        'msg.session.imported': 'Session başarıyla yüklendi!',
        'msg.comments.fetched': 'yorum başarıyla çekildi!',
        'msg.select.winner.count': 'Lütfen kazanan ve yedek sayısını seçin',
        'msg.more.than.participants': 'Toplam kazanan ve yedek sayısı katılımcı sayısından fazla olamaz!',
        'msg.fetch.first': 'Önce yorumları çekmelisiniz!',
        'msg.error': 'Hata',
        'msg.fill.fields': 'Lütfen tüm gerekli alanları doldurun',
        'msg.invalid.url': 'Lütfen geçerli bir Instagram post linki girin!',
        'msg.enter.url': 'Lütfen bir post URL\'si girin',
        'msg.connection.error': 'Bağlantı hatası',
        'msg.fetched': 'çekildi',
        'msg.estimated.total': 'Tahmini toplam',
        'msg.post.owner': 'Sahip',
        'msg.view.post': 'Gönderiyi Aç',
    }
};

// Current language (default: Turkish)
let currentLang = localStorage.getItem('language') || 'tr';

// Initialize language on page load
document.addEventListener('DOMContentLoaded', function() {
    applyLanguage(currentLang);
    updateLanguageButton();
});

// Toggle language
function toggleLanguage() {
    currentLang = currentLang === 'tr' ? 'en' : 'tr';
    localStorage.setItem('language', currentLang);
    applyLanguage(currentLang);
    updateLanguageButton();
}

// Apply language to all elements
function applyLanguage(lang) {
    document.documentElement.lang = lang;
    
    // Update all elements with data-i18n attribute
    document.querySelectorAll('[data-i18n]').forEach(element => {
        const key = element.getAttribute('data-i18n');
        if (translations[lang] && translations[lang][key]) {
            // Check if it's a placeholder
            if (element.hasAttribute('placeholder')) {
                element.placeholder = translations[lang][key];
            } else {
                // Preserve HTML structure (for icons, etc.)
                const innerHTML = element.innerHTML;
                const hasIcon = innerHTML.includes('<i class=');
                
                if (hasIcon) {
                    const iconMatch = innerHTML.match(/<i class="[^"]+"><\/i>/);
                    if (iconMatch) {
                        element.innerHTML = iconMatch[0] + ' ' + translations[lang][key];
                    } else {
                        element.textContent = translations[lang][key];
                    }
                } else {
                    element.textContent = translations[lang][key];
                }
            }
        }
    });
    
    // Update document title
    document.title = translations[lang]['app.title'];
}

// Update language button text
function updateLanguageButton() {
    const langText = document.getElementById('langText');
    if (langText) {
        langText.textContent = currentLang === 'tr' ? 'EN' : 'TR';
    }
}

// Get translation for a key
function t(key) {
    return translations[currentLang][key] || key;
}
