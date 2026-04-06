let currentParticipants = [];

// Sayfa yüklendiğinde giriş durumunu kontrol et
document.addEventListener('DOMContentLoaded', function() {
    checkLoginStatus();
});

// Login section toggle
function toggleLogin() {
    const section = document.getElementById('loginSection');
    const icon = document.getElementById('loginToggle');
    
    if (section.style.display === 'none') {
        section.style.display = 'block';
        icon.classList.add('rotated');
    } else {
        section.style.display = 'none';
        icon.classList.remove('rotated');
    }
}

// Instagram'a giriş yap
async function loginToInstagram() {
    const username = document.getElementById('username').value.trim();
    const password = document.getElementById('password').value.trim();
    const twoFactorCode = document.getElementById('twoFactorCode').value.trim();
    const loginStatus = document.getElementById('loginStatus');
    const loginBtn = document.getElementById('loginBtn');
    
    if (!username || !password) {
        showLoginStatus('Lütfen kullanıcı adı ve şifre girin!', false);
        return;
    }
    
    loginStatus.style.display = 'none';
    loginBtn.disabled = true;
    loginBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Giriş yapılıyor...';
    
    try {
        const response = await fetch('/api/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, two_factor_code: twoFactorCode })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showLoginStatus('✅ Giriş başarılı! Artık herhangi bir posttan yorum çekebilirsiniz.', true);
            // Şifreyi ve kodu temizle
            document.getElementById('password').value = '';
            document.getElementById('twoFactorCode').value = '';
            document.getElementById('twoFactorGroup').style.display = 'none';
        } else {
            if (data.needs_2fa) {
                // 2FA gerekli, kod giriş alanını göster
                document.getElementById('twoFactorGroup').style.display = 'block';
                showLoginStatus('⚠️ İki faktörlü doğrulama kodu girin ve tekrar "Giriş Yap" butonuna tıklayın.', false);
            } else {
                showLoginStatus('❌ ' + data.error, false);
            }
        }
    } catch (error) {
        showLoginStatus('❌ Bağlantı hatası: ' + error.message, false);
    } finally {
        loginBtn.disabled = false;
        loginBtn.innerHTML = '<i class="fas fa-sign-in-alt"></i> Giriş Yap';
    }
}

// Giriş durumunu kontrol et
async function checkLoginStatus() {
    try {
        const response = await fetch('/api/check-login');
        const data = await response.json();
        
        if (data.logged_in) {
            showLoginStatus('✅ Zaten giriş yapılmış! Yorum çekmeye başlayabilirsiniz.', true);
        }
    } catch (error) {
        console.log('Giriş durumu kontrol edilemedi');
    }
}

// Giriş durumu mesajını göster
function showLoginStatus(message, isSuccess) {
    const loginStatus = document.getElementById('loginStatus');
    loginStatus.textContent = message;
    loginStatus.className = 'login-status ' + (isSuccess ? 'success' : 'error');
}

// Session cookie import
async function importSessionCookie() {
    const sessionId = document.getElementById('sessionId').value.trim();
    const csrfToken = document.getElementById('csrfToken').value.trim();
    const loginStatus = document.getElementById('loginStatus');
    
    if (!sessionId) {
        showLoginStatus('Lütfen session ID girin!', false);
        return;
    }
    
    loginStatus.style.display = 'none';
    
    try {
        const response = await fetch('/api/import-session', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                session_id: sessionId,
                csrf_token: csrfToken 
            })
        });
        
        const data = await response.json();
        
        if (data.success) {
            showLoginStatus('✅ Session başarıyla yüklendi! Artık yorum çekebilirsiniz.', true);
            document.getElementById('sessionId').value = '';
            document.getElementById('csrfToken').value = '';
        } else {
            showLoginStatus('❌ ' + data.error, false);
        }
    } catch (error) {
        showLoginStatus('❌ Bağlantı hatası: ' + error.message, false);
    }
}

// Cookie yardım modalını göster
function showCookieHelp() {
    document.getElementById('cookieHelpModal').style.display = 'flex';
}

// Cookie yardım modalını kapat
function closeCookieHelp() {
    document.getElementById('cookieHelpModal').style.display = 'none';
}

// Yorumları çek
async function fetchComments() {
    const url = document.getElementById('postUrl').value.trim();
    
    if (!url || url === 'https://www.instagram.com/p/...') {
        showError(t('msg.invalid.url'));
        return;
    }
    
    // UI güncelle
    document.getElementById('fetchBtn').disabled = true;
    document.getElementById('drawBtn').disabled = true;
    document.getElementById('loading').style.display = 'block';
    document.getElementById('resultsCard').style.display = 'none';
    document.getElementById('winnerCard').style.display = 'none';
    document.getElementById('drawSettings').style.display = 'none';
    document.getElementById('loadingText').textContent = 'Post bilgileri alınıyor...';
    document.getElementById('progressInfo').textContent = '';
    
    // Progress polling başlat (daha sık kontrol)
    const progressInterval = setInterval(checkProgress, 1000);
    
    try {
        const maxComments = parseInt(document.getElementById('maxComments').value) || 5000;
        
        const response = await fetch('/api/fetch-comments', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ 
                url: url,
                max_comments: maxComments
            })
        });
        
        clearInterval(progressInterval);
        
        const data = await response.json();
        
        if (data.success) {
            currentParticipants = data.participants;
            displayResults(data);
            document.getElementById('drawBtn').disabled = false;
            document.getElementById('drawSettings').style.display = 'block';
        } else {
            showError(data.error || t('msg.error'));
        }
    } catch (error) {
        clearInterval(progressInterval);
        showError(t('msg.connection.error') + ': ' + error.message);
    } finally {
        document.getElementById('loading').style.display = 'none';
        document.getElementById('fetchBtn').disabled = false;
    }
}

// Progress kontrolü
async function checkProgress() {
    try {
        const response = await fetch('/api/progress');
        const data = await response.json();
        
        if (data.status === 'fetching') {
            const loadingText = document.getElementById('loadingText');
            const progressInfo = document.getElementById('progressInfo');
            
            loadingText.textContent = t('loading.fetch');
            
            if (data.fetched > 0) {
                progressInfo.textContent = `${data.fetched} ${t('msg.fetched')}... (${t('msg.estimated.total')}: ${data.total || '?'})`;
            }
        }
    } catch (error) {
        // Hata olursa ses çıkarma
    }
}

// Sonuçları göster
function displayResults(data) {
    const resultsCard = document.getElementById('resultsCard');
    const resultsContent = document.getElementById('resultsContent');
    
    let warningHtml = '';
    if (data.warning) {
        warningHtml = `
            <div class="info-text" style="background: #fff3cd; color: #856404; margin-bottom: 20px;">
                <i class="fas fa-exclamation-triangle"></i>
                ${data.warning}
            </div>
        `;
    }
    
    let postPreviewHtml = '';
    if (data.post_image) {
        postPreviewHtml = `
            <div class="post-preview">
                <div class="post-preview-image">
                    <img src="${data.post_image}" alt="Post görseli" />
                </div>
                <div class="post-preview-info">
                    <div class="post-owner">
                        <i class="fab fa-instagram"></i>
                        <a href="https://www.instagram.com/${data.post_owner}/" target="_blank">@${data.post_owner}</a>
                    </div>
                    ${data.post_caption ? `<div class="post-caption">${data.post_caption}${data.post_caption.length >= 200 ? '...' : ''}</div>` : ''}
                    <a href="${data.post_url}" target="_blank" class="view-post-btn">
                        <i class="fas fa-external-link-alt"></i>
                        ${t('msg.view.post')}
                    </a>
                </div>
            </div>
        `;
    }
    
    resultsContent.innerHTML = `
        ${postPreviewHtml}
        ${warningHtml}
        <div class="stat-grid">
            <div class="stat-card">
                <div class="stat-number">${data.likes}</div>
                <div class="stat-label">❤️ Beğeni</div>
            </div>
            <div class="stat-card">
                <div class="stat-number">${data.total_comments}</div>
                <div class="stat-label">💬 Yorum</div>
            </div>
        </div>
    `;
    
    resultsCard.style.display = 'block';
}

// Çekiliş yap
async function makeDraw() {
    if (currentParticipants.length === 0) {
        showError(t('msg.fetch.first'));
        return;
    }
    
    const winnerCount = parseInt(document.getElementById('winnerCount').value) || 1;
    const reserveCount = parseInt(document.getElementById('reserveCount').value) || 0;
    
    if (winnerCount + reserveCount > currentParticipants.length) {
        showError(t('msg.more.than.participants'));
        return;
    }
    
    document.getElementById('drawBtn').disabled = true;
    document.getElementById('winnerCard').style.display = 'none';
    
    // Çekiliş animasyonunu göster
    showDrawAnimation();
    
    // Rastgele isimler animasyonu
    const nameAnimationInterval = startRandomNameAnimation();
    
    // 3-5 saniye arası rastgele bekleme (dramatik etki)
    const waitTime = 3000 + Math.random() * 2000;
    await new Promise(resolve => setTimeout(resolve, waitTime));
    
    try {
        const response = await fetch('/api/make-draw', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                winner_count: winnerCount,
                reserve_count: reserveCount
            })
        });
        
        const data = await response.json();
        
        // Animasyonu durdur
        clearInterval(nameAnimationInterval);
        hideDrawAnimation();
        
        if (data.success) {
            // Biraz daha bekle, sonra kazananları göster
            await new Promise(resolve => setTimeout(resolve, 500));
            displayWinners(data.winners, data.reserves, data.info);
        } else {
            showError(data.error || t('msg.error'));
        }
    } catch (error) {
        clearInterval(nameAnimationInterval);
        hideDrawAnimation();
        showError(t('msg.connection.error') + ': ' + error.message);
    } finally {
        document.getElementById('drawBtn').disabled = false;
    }
}

// Çekiliş animasyonunu göster
function showDrawAnimation() {
    document.getElementById('drawAnimation').style.display = 'block';
    document.getElementById('resultsCard').style.display = 'none';
    document.getElementById('drawAnimation').scrollIntoView({ behavior: 'smooth', block: 'center' });
}

// Çekiliş animasyonunu gizle
function hideDrawAnimation() {
    document.getElementById('drawAnimation').style.display = 'none';
}

// Rastgele isim animasyonu başlat
function startRandomNameAnimation() {
    const randomNamesEl = document.getElementById('randomNames');
    
    return setInterval(() => {
        // Katılımcılardan rastgele birini göster
        if (currentParticipants.length > 0) {
            const randomUser = currentParticipants[Math.floor(Math.random() * currentParticipants.length)];
            randomNamesEl.textContent = '@' + randomUser;
        }
    }, 100); // Her 100ms'de bir değiştir (hızlı geçiş efekti)
}

// Kazananları göster
function displayWinners(winners, reserves, info) {
    const winnerCard = document.getElementById('winnerCard');
    
    let winnersHtml = '';
    
    // Bilgi mesajı varsa ekle
    if (info) {
        winnersHtml += `
            <div class="info-banner">
                <i class="fas fa-info-circle"></i>
                ${info}
            </div>
        `;
    }
    
    if (winners.length === 1) {
        // Tek kazanan - eski görünüm
        winnersHtml = `
            <div class="confetti">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <h2>🎊 KAZANAN 🎊</h2>
            <div class="winner-name">@${winners[0]}</div>
            <p class="winner-subtitle">Tebrikler! 🎉</p>
        `;
    } else {
        // Birden fazla kazanan
        winnersHtml = `
            <div class="confetti">
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
                <i class="fas fa-star"></i>
            </div>
            <h2>🎊 KAZANANLAR 🎊</h2>
            <div class="winners-list">
                ${winners.map((winner, index) => `
                    <div class="winner-item">
                        <span class="winner-number">${index + 1}</span>
                        <span class="winner-username">@${winner}</span>
                    </div>
                `).join('')}
            </div>
            <p class="winner-subtitle">Tebrikler! 🎉</p>
        `;
    }
    
    // Yedekler varsa ekle
    if (reserves && reserves.length > 0) {
        winnersHtml += `
            <div class="reserves-section">
                <h3>🔄 Yedek Kazananlar</h3>
                <div class="reserves-list">
                    ${reserves.map((reserve, index) => `
                        <div class="reserve-item">
                            <span class="reserve-number">${index + 1}</span>
                            <span class="reserve-username">@${reserve}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
        `;
    }
    
    winnerCard.innerHTML = winnersHtml;
    winnerCard.style.display = 'block';
    
    // Sayfayı kazanan kartına kaydır
    winnerCard.scrollIntoView({ behavior: 'smooth', block: 'center' });
}


// Bildirimler
function showSuccess(message) {
    alert('✅ ' + message);
}

function showError(message) {
    alert('❌ ' + message);
}
