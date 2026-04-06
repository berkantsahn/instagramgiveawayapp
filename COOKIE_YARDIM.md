# 🍪 Instagram Session Cookie Login Guide

[Türkçe](#tr) | **English**

If you're experiencing 2FA issues, you can extract your Instagram session cookie from your browser and use it directly in the application.

## 📝 Steps:

### 1. Login to Instagram via Browser
Login normally to instagram.com (complete 2FA if required)

### 2. Extract Cookies

#### Chrome / Edge / Brave:
1. While on Instagram, press **F12** (Developer Tools)
2. Go to **Application** tab
3. On the left sidebar: **Cookies** > **https://www.instagram.com**
4. Find the **sessionid** cookie
5. Copy its **Value** (a long text string)
6. Find the **csrftoken** cookie
7. Copy its **Value** as well

#### Firefox:
1. While on Instagram, press **F12**
2. Go to **Storage** tab
3. Navigate to **Cookies** > **https://www.instagram.com**
4. Find **sessionid** and copy its value
5. Find **csrftoken** and copy its value

#### Safari:
1. Enable Developer Menu: Preferences > Advanced > Show Develop menu
2. While on Instagram: Develop > Show Web Inspector
3. Go to **Storage** tab
4. Select **Cookies** > **https://www.instagram.com**
5. Find and copy **sessionid** value
6. Find and copy **csrftoken** value

### 3. Import Session in Application

1. In the application, find the **"Session Cookie ile Giriş"** section
2. Paste your **sessionid** value
3. Paste your **csrftoken** value
4. Click **"Session Cookie İçe Aktar"** (Import Session Cookie)

### 4. Start Using

No need to enter username/password anymore! Just paste the post link and fetch comments.

## ⚠️ Important Notes:

- Session cookie is valid for approximately **90 days**
- Cookie becomes invalid if you change your password
- Cookie becomes invalid if you logout from Instagram
- **Never share your cookies** with anyone - they provide full account access
- Keep your `instagram_session.json` file private
- Add `instagram_session.json` to `.gitignore` (already configured)

## 🔒 Security Tips:

- Only use this method on your personal computer
- Don't use on public/shared computers
- If you suspect your session is compromised, change your Instagram password immediately
- Regularly check your Instagram login activity

## 🐛 Troubleshooting:

**"Session yükleme başarısız" (Session load failed):**
- Double-check that you copied the entire sessionid and csrftoken values
- Ensure no extra spaces were copied
- Try logging out and back into Instagram, then get fresh cookies

**"Login required" after importing session:**
- Your session may have expired
- Get fresh cookies from your browser
- Ensure you're logged into Instagram in your browser

**Comments not fetching after session import:**
- Wait a moment after importing before fetching
- Refresh the page and try again
- Your session might be rate-limited; wait a few minutes

---
---

<a name="tr"></a>

# 🍪 Instagram Session Cookie Giriş Rehberi

**Türkçe** | [English](#-instagram-session-cookie-login-guide)

2FA sorunu yaşıyorsanız, tarayıcınızdan Instagram session cookie'sini alıp uygulamada doğrudan kullanabilirsiniz.

## 📝 Adımlar:

### 1. Instagram'a Tarayıcıdan Giriş Yapın
Normal şekilde instagram.com'a giriş yapın (gerekirse 2FA'yı tamamlayın)

### 2. Cookie'leri Alın

#### Chrome / Edge / Brave:
1. Instagram'dayken **F12** tuşuna basın (Developer Tools)
2. **Application** sekmesine gidin
3. Sol kenar çubuğunda: **Cookies** > **https://www.instagram.com**
4. **sessionid** adlı cookie'yi bulun
5. **Value** kısmını kopyalayın (uzun bir metin dizisi)
6. **csrftoken** cookie'sini bulun
7. Onun da **Value** kısmını kopyalayın

#### Firefox:
1. Instagram'dayken **F12** tuşuna basın
2. **Storage** sekmesine gidin
3. **Cookies** > **https://www.instagram.com** yolunu izleyin
4. **sessionid** bulun ve değerini kopyalayın
5. **csrftoken** bulun ve değerini kopyalayın

#### Safari:
1. Developer Menüyü Aktifleştirin: Tercihler > Gelişmiş > Develop menüsünü göster
2. Instagram'dayken: Develop > Show Web Inspector
3. **Storage** sekmesine gidin
4. **Cookies** > **https://www.instagram.com** seçin
5. **sessionid** değerini bulup kopyalayın
6. **csrftoken** değerini bulup kopyalayın

### 3. Uygulamada Session'ı İçe Aktarın

1. Uygulamada **"Session Cookie ile Giriş"** bölümünü bulun
2. **sessionid** değerinizi yapıştırın
3. **csrftoken** değerinizi yapıştırın
4. **"Session Cookie İçe Aktar"** butonuna tıklayın

### 4. Kullanmaya Başlayın

Artık kullanıcı adı/şifre girmeye gerek yok! Direkt post linkini yapıştırıp yorumları çekebilirsiniz.

## ⚠️ Önemli Notlar:

- Session cookie yaklaşık **90 gün** geçerlidir
- Şifrenizi değiştirirseniz cookie geçersiz olur
- Instagram'dan çıkış yaparsanız cookie geçersiz olur
- **Cookie'lerinizi kimseyle paylaşmayın** - tam hesap erişimi sağlar
- `instagram_session.json` dosyanızı gizli tutun
- `instagram_session.json` dosyası `.gitignore`'a eklenmiştir (zaten yapılandırılmış)

## 🔒 Güvenlik İpuçları:

- Bu yöntemi sadece kişisel bilgisayarınızda kullanın
- Halka açık/paylaşımlı bilgisayarlarda kullanmayın
- Session'ınızın tehlikeye girdiğinden şüphelenirseniz, Instagram şifrenizi hemen değiştirin
- Instagram giriş aktivitenizi düzenli olarak kontrol edin

## 🐛 Sorun Giderme:

**"Session yükleme başarısız" hatası:**
- Tüm sessionid ve csrftoken değerlerini kopyaladığınızdan emin olun
- Fazladan boşluk kopyalanmadığından emin olun
- Instagram'dan çıkış yapıp tekrar giriş yapın, sonra yeni cookie'leri alın

**Session içe aktardıktan sonra "Login required":**
- Session'ınız sona ermiş olabilir
- Tarayıcınızdan yeni cookie'ler alın
- Tarayıcınızda Instagram'a giriş yaptığınızdan emin olun

**Session içe aktardıktan sonra yorumlar çekilmiyor:**
- İçe aktardıktan sonra bir süre bekleyin
- Sayfayı yenileyip tekrar deneyin
- Session'ınız rate-limit'e takılmış olabilir; birkaç dakika bekleyin
