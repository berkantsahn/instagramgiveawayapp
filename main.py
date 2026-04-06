import tkinter as tk
from tkinter import ttk, messagebox, scrolledtext
import instaloader
import random
import json
from datetime import datetime
import threading

class InstagramCekilisApp:
    def __init__(self, root):
        self.root = root
        self.root.title("Instagram Çekiliş Uygulaması")
        self.root.geometry("800x600")
        self.root.configure(bg='#f0f0f0')
        
        # Instagram loader
        self.loader = instaloader.Instaloader()
        self.yorumlar = []
        
        self.create_widgets()
    
    def create_widgets(self):
        # Başlık
        title_frame = tk.Frame(self.root, bg='#8134AF', pady=20)
        title_frame.pack(fill='x')
        
        title_label = tk.Label(
            title_frame,
            text="🎉 Instagram Çekiliş Uygulaması",
            font=('Arial', 20, 'bold'),
            bg='#8134AF',
            fg='white'
        )
        title_label.pack()
        
        # Ana frame
        main_frame = tk.Frame(self.root, bg='#f0f0f0', padx=20, pady=20)
        main_frame.pack(fill='both', expand=True)
        
        # Instagram link girişi
        link_frame = tk.LabelFrame(main_frame, text="Post Linki", font=('Arial', 11, 'bold'), bg='#f0f0f0', pady=10, padx=10)
        link_frame.pack(fill='x', pady=10)
        
        tk.Label(link_frame, text="Instagram Post URL:", bg='#f0f0f0', font=('Arial', 10)).pack(anchor='w')
        
        self.link_entry = tk.Entry(link_frame, font=('Arial', 10), width=60)
        self.link_entry.pack(fill='x', pady=5)
        self.link_entry.insert(0, "https://www.instagram.com/p/...")
        
        # Kullanıcı adı ve şifre (opsiyonel)
        login_frame = tk.LabelFrame(main_frame, text="Instagram Giriş (Opsiyonel)", font=('Arial', 11, 'bold'), bg='#f0f0f0', pady=10, padx=10)
        login_frame.pack(fill='x', pady=10)
        
        creds_frame = tk.Frame(login_frame, bg='#f0f0f0')
        creds_frame.pack(fill='x')
        
        tk.Label(creds_frame, text="Kullanıcı Adı:", bg='#f0f0f0', font=('Arial', 9)).grid(row=0, column=0, sticky='w', padx=5)
        self.username_entry = tk.Entry(creds_frame, font=('Arial', 9), width=25)
        self.username_entry.grid(row=0, column=1, padx=5, pady=2)
        
        tk.Label(creds_frame, text="Şifre:", bg='#f0f0f0', font=('Arial', 9)).grid(row=0, column=2, sticky='w', padx=5)
        self.password_entry = tk.Entry(creds_frame, font=('Arial', 9), width=25, show='*')
        self.password_entry.grid(row=0, column=3, padx=5, pady=2)
        
        tk.Label(login_frame, text="Not: Bazı gizli hesaplar için giriş gerekebilir", bg='#f0f0f0', font=('Arial', 8), fg='gray').pack(anchor='w')
        
        # Butonlar
        button_frame = tk.Frame(main_frame, bg='#f0f0f0')
        button_frame.pack(pady=10)
        
        self.fetch_button = tk.Button(
            button_frame,
            text="📥 Yorumları Çek",
            command=self.fetch_comments_thread,
            font=('Arial', 11, 'bold'),
            bg='#4CAF50',
            fg='white',
            padx=20,
            pady=10,
            cursor='hand2'
        )
        self.fetch_button.pack(side='left', padx=5)
        
        self.draw_button = tk.Button(
            button_frame,
            text="🎲 Çekiliş Yap",
            command=self.make_draw,
            font=('Arial', 11, 'bold'),
            bg='#2196F3',
            fg='white',
            padx=20,
            pady=10,
            cursor='hand2',
            state='disabled'
        )
        self.draw_button.pack(side='left', padx=5)
        
        # Durum ve sonuç alanı
        result_frame = tk.LabelFrame(main_frame, text="Sonuçlar", font=('Arial', 11, 'bold'), bg='#f0f0f0', pady=10, padx=10)
        result_frame.pack(fill='both', expand=True, pady=10)
        
        self.result_text = scrolledtext.ScrolledText(
            result_frame,
            font=('Arial', 10),
            height=15,
            wrap=tk.WORD
        )
        self.result_text.pack(fill='both', expand=True)
        
        # Durum çubuğu
        self.status_label = tk.Label(
            self.root,
            text="Hazır",
            font=('Arial', 9),
            bg='#e0e0e0',
            anchor='w',
            padx=10,
            pady=5
        )
        self.status_label.pack(side='bottom', fill='x')
    
    def update_status(self, message):
        self.status_label.config(text=message)
        self.root.update()
    
    def fetch_comments_thread(self):
        # Thread ile yorumları çek
        thread = threading.Thread(target=self.fetch_comments)
        thread.start()
    
    def fetch_comments(self):
        try:
            self.fetch_button.config(state='disabled')
            self.draw_button.config(state='disabled')
            self.result_text.delete(1.0, tk.END)
            self.update_status("Yorumlar çekiliyor...")
            
            url = self.link_entry.get().strip()
            
            if not url or url == "https://www.instagram.com/p/...":
                messagebox.showerror("Hata", "Lütfen geçerli bir Instagram post linki girin!")
                self.fetch_button.config(state='normal')
                self.update_status("Hata: Geçersiz link")
                return
            
            # URL'den shortcode çıkar
            shortcode = self.extract_shortcode(url)
            if not shortcode:
                messagebox.showerror("Hata", "Geçersiz Instagram linki!")
                self.fetch_button.config(state='normal')
                self.update_status("Hata: Geçersiz link")
                return
            
            # Giriş yap (eğer bilgiler verildiyse)
            username = self.username_entry.get().strip()
            password = self.password_entry.get().strip()
            
            if username and password:
                self.update_status("Instagram'a giriş yapılıyor...")
                try:
                    self.loader.login(username, password)
                    self.result_text.insert(tk.END, "✅ Instagram'a giriş yapıldı\n\n")
                except Exception as e:
                    self.result_text.insert(tk.END, f"⚠️ Giriş yapılamadı: {str(e)}\n")
                    self.result_text.insert(tk.END, "Giriş yapmadan devam ediliyor...\n\n")
            
            # Post'u al
            self.update_status("Post yükleniyor...")
            post = instaloader.Post.from_shortcode(self.loader.context, shortcode)
            
            self.result_text.insert(tk.END, f"📝 Post Sahibi: @{post.owner_username}\n")
            self.result_text.insert(tk.END, f"❤️ Beğeni Sayısı: {post.likes}\n")
            self.result_text.insert(tk.END, f"💬 Yorum Sayısı: {post.comments}\n\n")
            
            # Yorumları çek
            self.update_status("Yorumlar çekiliyor...")
            self.yorumlar = []
            comment_count = 0
            
            for comment in post.get_comments():
                comment_count += 1
                self.yorumlar.append({
                    'username': comment.owner.username,
                    'text': comment.text,
                    'date': comment.created_at_utc
                })
                
                if comment_count % 10 == 0:
                    self.update_status(f"{comment_count} yorum çekildi...")
            
            self.result_text.insert(tk.END, f"✅ Toplam {len(self.yorumlar)} yorum çekildi!\n\n")
            self.result_text.insert(tk.END, "Yorumlayanlar:\n")
            self.result_text.insert(tk.END, "-" * 50 + "\n")
            
            # Benzersiz kullanıcıları göster
            unique_users = list(set([y['username'] for y in self.yorumlar]))
            for i, user in enumerate(unique_users, 1):
                self.result_text.insert(tk.END, f"{i}. @{user}\n")
            
            self.result_text.insert(tk.END, "-" * 50 + "\n")
            self.result_text.insert(tk.END, f"\n📊 Benzersiz katılımcı sayısı: {len(unique_users)}\n")
            
            self.draw_button.config(state='normal')
            self.update_status(f"Hazır! {len(unique_users)} katılımcı")
            
        except Exception as e:
            messagebox.showerror("Hata", f"Yorumlar çekilirken hata oluştu:\n{str(e)}")
            self.result_text.insert(tk.END, f"\n❌ HATA: {str(e)}\n")
            self.update_status("Hata oluştu")
        finally:
            self.fetch_button.config(state='normal')
    
    def extract_shortcode(self, url):
        # Instagram URL'den shortcode çıkar
        try:
            if '/p/' in url:
                parts = url.split('/p/')
                shortcode = parts[1].split('/')[0].split('?')[0]
                return shortcode
            elif '/reel/' in url:
                parts = url.split('/reel/')
                shortcode = parts[1].split('/')[0].split('?')[0]
                return shortcode
        except:
            return None
        return None
    
    def make_draw(self):
        if not self.yorumlar:
            messagebox.showwarning("Uyarı", "Önce yorumları çekmelisiniz!")
            return
        
        # Benzersiz kullanıcıları al
        unique_users = list(set([y['username'] for y in self.yorumlar]))
        
        if len(unique_users) == 0:
            messagebox.showwarning("Uyarı", "Yorum bulunamadı!")
            return
        
        # Rastgele kazanan seç
        winner = random.choice(unique_users)
        
        # Sonucu göster
        self.result_text.insert(tk.END, f"\n\n{'=' * 50}\n")
        self.result_text.insert(tk.END, "🎊 ÇEKİLİŞ SONUCU 🎊\n")
        self.result_text.insert(tk.END, f"{'=' * 50}\n\n")
        self.result_text.insert(tk.END, f"🏆 KAZANAN: @{winner}\n\n")
        self.result_text.insert(tk.END, f"{'=' * 50}\n")
        
        # Scroll to end
        self.result_text.see(tk.END)
        
        # Sonucu kaydet
        self.save_result(winner, unique_users)
        
        self.update_status(f"Kazanan: @{winner}")
        
        messagebox.showinfo("Çekiliş Sonucu", f"🏆 Kazanan: @{winner}")
    
    def save_result(self, winner, participants):
        # Sonuçları JSON dosyasına kaydet
        result = {
            'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
            'winner': winner,
            'total_participants': len(participants),
            'participants': participants
        }
        
        try:
            # Mevcut sonuçları oku
            try:
                with open('cekilis_sonuclari.json', 'r', encoding='utf-8') as f:
                    results = json.load(f)
            except:
                results = []
            
            # Yeni sonucu ekle
            results.append(result)
            
            # Kaydet
            with open('cekilis_sonuclari.json', 'w', encoding='utf-8') as f:
                json.dump(results, f, ensure_ascii=False, indent=2)
            
            self.result_text.insert(tk.END, "\n💾 Sonuç 'cekilis_sonuclari.json' dosyasına kaydedildi.\n")
        except Exception as e:
            print(f"Kayıt hatası: {e}")

def main():
    root = tk.Tk()
    app = InstagramCekilisApp(root)
    root.mainloop()

if __name__ == "__main__":
    main()
