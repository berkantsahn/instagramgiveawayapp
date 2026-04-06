# 🎉 Instagram Giveaway Application

[Türkçe](#tr) | **English**

A modern web application that fetches comments from Instagram posts and randomly selects winners for giveaways.

## ✨ Features

- 📥 Automatic comment fetching from Instagram post links
- 🎲 Random and fair winner selection
- 🎯 Multiple winners and reserves support
- 🖼️ Post preview with image, caption, and owner info
- 💾 Automatic giveaway result saving
- 🎨 Modern and responsive web interface
- 🔐 Instagram login support (username/password or session cookies)
- 📊 Real-time progress tracking with live updates
- 🎬 Animated winner reveal with dramatic countdown
- 🔢 Configurable comment fetch limits (1k, 3k, 5k, 10k, or All)

## 🚀 Installation

### Prerequisites
- Python 3.7 or higher

### Setup

1. Clone the repository:
```bash
git clone https://github.com/yourusername/instagram-giveaway.git
cd instagram-giveaway
```

2. Install required dependencies:
```bash
pip install -r requirements.txt
```

## 📖 Usage

### 1. Start the Web Server
```bash
python app.py
```

### 2. Open Your Browser
Navigate to:
```
http://localhost:5000
```

### 3. Login to Instagram
Choose one of two methods:

**Method A: Username & Password**
- Enter your Instagram credentials
- Handle 2FA if required

**Method B: Session Cookie** (Recommended if you have 2FA issues)
- See [COOKIE_HELP.md](COOKIE_HELP.md) for detailed instructions
- Enter your `sessionid` and `csrftoken` from browser cookies

### 4. Fetch Comments
- Paste Instagram post link (e.g., `https://www.instagram.com/p/ABC123/`)
- Select maximum comments to fetch (1k to All)
- Click "📥 Yorumları Çek" (Fetch Comments)
- Watch real-time progress as comments are fetched

### 5. Make a Draw
- Set number of winners and reserves
- Click "🎲 Çekiliş Yap" (Make Draw)
- Enjoy the animated winner reveal
- Results are automatically saved

## 📋 Supported Link Formats

- Standard posts: `https://www.instagram.com/p/ABC123/`
- Reels: `https://www.instagram.com/reel/ABC123/`

## 💾 Results Storage

All giveaway results are saved in `cekilis_sonuclari.json` containing:
- Draw date and time
- Winner username(s)
- Reserve winner(s)
- Total participant count
- Complete participant list

## 🔧 Troubleshooting

**Login Issues:**
- Verify your credentials are correct
- If using password, try session cookie method instead
- Check if Instagram requires verification in browser

**2FA Problems:**
- Use session cookie import method (see COOKIE_HELP.md)
- Ensure you've completed 2FA in your browser first

**Comments Not Fetching:**
- Verify link format is correct
- Check if post has comments enabled
- Try increasing the comment fetch limit
- Ensure your session is still valid

**Progress Stuck at 0:**
- Wait a bit longer, initial fetching can take time
- Check your internet connection
- Try refreshing and logging in again

## ⚙️ Configuration

- **Debug Mode**: Set `debug=True` in `app.py` (line ~398)
- **Port**: Default is `5000`, change in `app.py` if needed
- **Host**: Set to `0.0.0.0` for network access

## 📦 Dependencies

- `flask` - Web framework
- `instagrapi` - Instagram private API client
- `requests` - HTTP library

See `requirements.txt` for full list with versions.

## ⚠️ Important Notes

- Respect Instagram's rate limits
- Use responsibly and follow Instagram's Terms of Service
- Session cookies expire after ~90 days
- For educational purposes only

## 🤝 Contributing

Issues and pull requests are welcome! Feel free to:
- Report bugs
- Suggest new features
- Improve documentation

## 📄 License

This project is for educational purposes. Please use it responsibly and in accordance with Instagram's Terms of Service.

## 👨‍💻 Author

Created by **Berkant Şahin**

---

Happy giveaways! 🎊

---
---

<a name="tr"></a>

# 🎉 Instagram Çekiliş Uygulaması

**Türkçe** | [English](#-instagram-giveaway-application)

Instagram postlarından yorum çeken ve rastgele kazanan seçen modern web uygulaması.

## ✨ Özellikler

- 📥 Instagram post linkinden otomatik yorum çekme
- 🎲 Rastgele ve adil kazanan seçimi
- 🎯 Birden fazla kazanan ve yedek desteği
- 🖼️ Gönderi önizlemesi (görsel, açıklama ve sahip bilgisi)
- 💾 Çekiliş sonuçlarını otomatik kaydetme
- 🎨 Modern ve responsive web arayüzü
- 🔐 Instagram girişi desteği (kullanıcı adı/şifre veya session cookies)
- 📊 Canlı ilerleme takibi ve anlık güncellemeler
- 🎬 Animasyonlu kazanan gösterimi ve dramatik geri sayım
- 🔢 Ayarlanabilir yorum çekme limitleri (1k, 3k, 5k, 10k veya Tümü)

## 🚀 Kurulum

### Gereksinimler
- Python 3.7 veya üstü

### Kurulum Adımları

1. Projeyi klonlayın:
```bash
git clone https://github.com/yourusername/instagram-giveaway.git
cd instagram-giveaway
```

2. Gerekli kütüphaneleri yükleyin:
```bash
pip install -r requirements.txt
```

## 📖 Kullanım

### 1. Web Sunucusunu Başlatın
```bash
python app.py
```

### 2. Tarayıcınızı Açın
Şu adrese gidin:
```
http://localhost:5000
```

### 3. Instagram'a Giriş Yapın
İki yöntemden birini seçin:

**Yöntem A: Kullanıcı Adı & Şifre**
- Instagram bilgilerinizi girin
- Gerekirse 2FA'yı tamamlayın

**Yöntem B: Session Cookie** (2FA sorunu yaşıyorsanız önerilir)
- Detaylı talimatlar için [COOKIE_YARDIM.md](COOKIE_YARDIM.md) dosyasına bakın
- Tarayıcınızdan `sessionid` ve `csrftoken` değerlerini girin

### 4. Yorumları Çekin
- Instagram post linkini yapıştırın (örn: `https://www.instagram.com/p/ABC123/`)
- Maksimum yorum sayısını seçin (1k ila Tümü)
- "📥 Yorumları Çek" butonuna tıklayın
- Yorumlar çekilirken canlı ilerlemeyi izleyin

### 5. Çekiliş Yapın
- Kazanan ve yedek sayısını belirleyin
- "🎲 Çekiliş Yap" butonuna tıklayın
- Animasyonlu kazanan gösteriminin tadını çıkarın
- Sonuçlar otomatik olarak kaydedilir

## 📋 Desteklenen Link Formatları

- Normal postlar: `https://www.instagram.com/p/ABC123/`
- Reels: `https://www.instagram.com/reel/ABC123/`

## 💾 Sonuç Kayıtları

Tüm çekiliş sonuçları `cekilis_sonuclari.json` dosyasında saklanır ve şunları içerir:
- Çekiliş tarihi ve saati
- Kazanan kullanıcı adı/adları
- Yedek kazanan/kazananlar
- Toplam katılımcı sayısı
- Tüm katılımcıların listesi

## 🔧 Sorun Giderme

**Giriş Sorunları:**
- Bilgilerinizin doğru olduğundan emin olun
- Şifre kullanıyorsanız, session cookie yöntemini deneyin
- Instagram'ın tarayıcıdan doğrulama isteyip istemediğini kontrol edin

**2FA Sorunları:**
- Session cookie import yöntemini kullanın (bkz. COOKIE_YARDIM.md)
- Önce tarayıcınızda 2FA'yı tamamladığınızdan emin olun

**Yorumlar Çekilmiyor:**
- Link formatının doğru olduğunu kontrol edin
- Post'un yorumlara açık olup olmadığını kontrol edin
- Yorum çekme limitini artırmayı deneyin
- Oturumunuzun hala geçerli olduğundan emin olun

**İlerleme 0'da Takılı Kaldı:**
- Biraz daha bekleyin, ilk çekme zaman alabilir
- İnternet bağlantınızı kontrol edin
- Sayfayı yenileyip tekrar giriş yapmayı deneyin

## ⚙️ Yapılandırma

- **Debug Modu**: `app.py` dosyasında `debug=True` olarak ayarlayın (~398. satır)
- **Port**: Varsayılan `5000`, gerekirse `app.py`'de değiştirin
- **Host**: Ağ erişimi için `0.0.0.0` olarak ayarlı

## 📦 Bağımlılıklar

- `flask` - Web framework
- `instagrapi` - Instagram private API istemcisi
- `requests` - HTTP kütüphanesi

Versiyonlarla birlikte tam liste için `requirements.txt` dosyasına bakın.

## ⚠️ Önemli Notlar

- Instagram'ın rate limitlerini aşmayın
- Sorumlu kullanın ve Instagram'ın Kullanım Şartlarına uyun
- Session cookie'leri yaklaşık 90 gün sonra sona erer
- Sadece eğitim amaçlıdır

## 🤝 Katkıda Bulunma

Issue ve pull request'ler memnuniyetle karşılanır! Şunları yapabilirsiniz:
- Hata bildirin
- Yeni özellik önerin
- Dokümantasyonu geliştirin

## 📄 Lisans

Bu proje eğitim amaçlıdır. Lütfen sorumlu bir şekilde ve Instagram'ın Kullanım Şartlarına uygun olarak kullanın.

## 👨‍💻 Geliştirici

**Berkant Şahin** tarafından geliştirilmiştir.

---

Mutlu çekilişler! 🎊
