from flask import Flask, render_template, request, jsonify, session as flask_session
from instagrapi import Client
from instagrapi.exceptions import LoginRequired, ClientError
import random
import json
from datetime import datetime
import os

app = Flask(__name__)
app.secret_key = 'instagram_cekilis_secret_key_2024'

# Global değişkenler
cl = Client()
current_comments = []
SESSION_FILE = "instagram_session.json"
fetch_progress = {'status': 'idle', 'fetched': 0, 'total': 0}

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/login', methods=['POST'])
def login():
    try:
        data = request.json
        username = data.get('username', '')
        password = data.get('password', '')
        
        if not username or not password:
            return jsonify({'success': False, 'error': 'Kullanıcı adı ve şifre gerekli'}), 400
        
        try:
            cl.login(username, password)
            
            # Session'ı basit formatta kaydet
            session_data = {
                'sessionid': cl.sessionid,
                'csrftoken': ''
            }
            
            with open(SESSION_FILE, 'w', encoding='utf-8') as f:
                json.dump(session_data, f, indent=2)
            
            return jsonify({'success': True, 'message': 'Giriş başarılı'})
                
        except Exception as e:
            error_msg = str(e)
            if 'challenge' in error_msg.lower() or 'checkpoint' in error_msg.lower():
                return jsonify({'success': False, 'error': 'Instagram güvenlik kontrolü. Lütfen session cookie yöntemini kullanın.'}), 400
            return jsonify({'success': False, 'error': f'Giriş hatası: {error_msg}'}), 400
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/check-login', methods=['GET'])
def check_login():
    try:
        # Session dosyası varsa giriş yapılmış demektir
        if os.path.exists(SESSION_FILE):
            try:
                with open(SESSION_FILE, 'r', encoding='utf-8') as f:
                    session_id = f.read().strip()
                
                if session_id and len(session_id) > 10:
                    # Session ID varsa cookie'ye yükle
                    loader.context._session.cookies.set(
                        'sessionid', 
                        session_id, 
                        domain='.instagram.com',
                        path='/'
                    )
                    return jsonify({'logged_in': True})
            except:
                pass
        return jsonify({'logged_in': False})
    except:
        return jsonify({'logged_in': False})

@app.route('/api/import-session', methods=['POST'])
def import_session():
    try:
        data = request.json
        session_id = data.get('session_id', '').strip()
        csrf_token = data.get('csrf_token', '').strip()
        
        if not session_id:
            return jsonify({'success': False, 'error': 'Session ID gerekli'}), 400
        
        # instagrapi session formatı - basit versiyon
        session_data = {
            'sessionid': session_id,
            'csrftoken': csrf_token if csrf_token else ''
        }
        
        # Session dosyasını kaydet
        with open(SESSION_FILE, 'w', encoding='utf-8') as f:
            json.dump(session_data, f, indent=2)
        
        # Client'a yükle
        try:
            cl.login_by_sessionid(session_id)
            return jsonify({'success': True, 'message': 'Session başarıyla yüklendi!'})
        except Exception as e:
            # Session kaydedildi, çekme sırasında yüklenecek
            return jsonify({'success': True, 'message': 'Session kaydedildi'})
            
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/progress', methods=['GET'])
def get_progress():
    return jsonify(fetch_progress)

@app.route('/api/fetch-comments', methods=['POST'])
def fetch_comments():
    global current_comments, fetch_progress
    
    print("=" * 50)
    print("FETCH COMMENTS İSTEĞİ GELDİ!")
    print("=" * 50)
    
    # Progress'i sıfırla
    fetch_progress = {'status': 'fetching', 'fetched': 0, 'total': 0}
    
    try:
        data = request.json
        url = data.get('url', '')
        max_comments_requested = data.get('max_comments', 5000)
        
        if not url:
            return jsonify({'success': False, 'error': 'URL gerekli'}), 400
        
        # Shortcode çıkar
        shortcode = extract_shortcode(url)
        if not shortcode:
            return jsonify({'success': False, 'error': 'Geçersiz Instagram linki'}), 400
        
        # Session'ı yükle
        print("Session yükleniyor...")
        if os.path.exists(SESSION_FILE):
            try:
                with open(SESSION_FILE, 'r', encoding='utf-8') as f:
                    session_data = json.load(f)
                
                sessionid = session_data.get('sessionid', '')
                print(f"Session ID bulundu: {sessionid[:20]}...")
                
                if sessionid:
                    try:
                        print("Login by sessionid deneniyor...")
                        cl.login_by_sessionid(sessionid)
                        print("Login başarılı!")
                    except Exception as login_err:
                        print(f"Login hatası: {login_err}")
                        return jsonify({'success': False, 'error': f'Session geçersiz veya süresi dolmuş: {str(login_err)}'}), 401
                else:
                    return jsonify({'success': False, 'error': 'Session dosyası bozuk'}), 500
            except Exception as e:
                print(f"Session yükleme hatası: {e}")
                return jsonify({'success': False, 'error': f'Session yükleme hatası: {str(e)}'}), 500
        else:
            print("Session dosyası bulunamadı!")
            return jsonify({'success': False, 'error': 'Lütfen önce Instagram session cookie\'sini yükleyin'}), 401
        
        # Media ID'yi al
        try:
            print(f"Shortcode: {shortcode}")
            print("Media PK alınıyor...")
            media_pk = cl.media_pk_from_code(shortcode)
            print(f"Media PK: {media_pk}")
            print("Media info alınıyor...")
            media_info = cl.media_info(media_pk)
            print("Media info alındı!")
            
            # Post bilgileri
            post_owner = media_info.user.username
            likes = media_info.like_count
            comment_count = media_info.comment_count
            
            # Progress güncelle
            fetch_progress['total'] = comment_count
            fetch_progress['status'] = 'fetching'
            fetch_progress['fetched'] = 0
            
            print(f"Toplam {comment_count} yorum çekiliyor...")
            
            # Kullanıcının belirlediği limit
            if max_comments_requested == 0:
                # Tümü istenmiş
                total_to_fetch = comment_count
            else:
                total_to_fetch = min(comment_count, max_comments_requested)
            
            # Yorumları çek - basit liste olarak
            print("Yorumlar çekiliyor (bu uzun sürebilir)...")
            
            skipped_comments = 0  # Try bloğundan önce tanımla
            try:
                # Tüm yorumları bir liste olarak al (generator değil)
                comments_list = list(cl.media_comments(media_pk, amount=total_to_fetch))
                print(f"Liste oluşturuldu: {len(comments_list)} yorum")
                
                current_comments = []
                for i, comment in enumerate(comments_list, 1):
                    try:
                        # Kullanıcı bilgisi olmayan yorumları atla (silinmiş kullanıcılar)
                        if not hasattr(comment, 'user') or not comment.user or not hasattr(comment.user, 'username'):
                            skipped_comments += 1
                            continue
                        
                        current_comments.append({
                            'username': comment.user.username,
                            'text': comment.text,
                            'date': str(comment.created_at_utc)
                        })
                    except Exception as comment_parse_error:
                        # Hatalı yorum formatını atla
                        print(f"Yorum parse hatası (atlandı): {comment_parse_error}")
                        skipped_comments += 1
                        continue
                    
                    # Her 100 yorumda bir progress güncelle
                    if i % 100 == 0:
                        fetch_progress['fetched'] = len(current_comments)
                        print(f"{len(current_comments)}/{len(comments_list)} yorum işlendi...")
                
                # Final progress
                fetch_progress['fetched'] = len(current_comments)
                fetch_progress['status'] = 'completed'
                print(f"Toplam {len(current_comments)} yorum çekildi")
                if skipped_comments > 0:
                    print(f"{skipped_comments} yorum atlandı (silinmiş/geçersiz kullanıcı)")
                
            except Exception as comment_error:
                print(f"Yorum çekme hatası: {comment_error}")
                raise
            
            # Benzersiz kullanıcılar
            unique_users = list(set([c['username'] for c in current_comments]))
            
            # Post görseli ve detayları - HttpUrl'leri string'e çevir
            post_image = str(media_info.thumbnail_url) if hasattr(media_info, 'thumbnail_url') and media_info.thumbnail_url else None
            post_caption = media_info.caption_text[:200] if hasattr(media_info, 'caption_text') and media_info.caption_text else ''
            
            response_data = {
                'success': True,
                'post_owner': post_owner,
                'likes': likes,
                'total_comments': len(current_comments),
                'unique_users': len(unique_users),
                'participants': unique_users,
                'post_image': post_image,
                'post_caption': post_caption,
                'post_url': str(url)
            }
            
            # Uyarı mesajları
            warnings = []
            if comment_count > total_to_fetch:
                warnings.append(f'Post\'ta toplam {comment_count} yorum var, ancak seçtiğiniz limit nedeniyle ilk {total_to_fetch} yorum çekildi.')
            
            if skipped_comments > 0:
                warnings.append(f'{skipped_comments} yorum atlandı (silinmiş veya geçersiz kullanıcılar).')
            
            if warnings:
                response_data['warning'] = ' '.join(warnings)
            
            # Progress'i tamamla
            fetch_progress['status'] = 'completed'
            
            return jsonify(response_data)
            
        except LoginRequired:
            fetch_progress['status'] = 'error'
            return jsonify({'success': False, 'error': 'Session süresi dolmuş. Lütfen yeni session cookie yükleyin'}), 401
        except ClientError as e:
            fetch_progress['status'] = 'error'
            return jsonify({'success': False, 'error': f'Instagram hatası: {str(e)}'}), 500
        except Exception as e:
            fetch_progress['status'] = 'error'
            return jsonify({'success': False, 'error': f'Hata: {str(e)}'}), 500
        
    except Exception as e:
        fetch_progress['status'] = 'error'
        return jsonify({'success': False, 'error': str(e)}), 500


@app.route('/api/make-draw', methods=['POST'])
def make_draw():
    global current_comments
    
    try:
        if not current_comments:
            return jsonify({'success': False, 'error': 'Önce yorumları çekin'}), 400
        
        # İstek verilerini al
        data = request.json or {}
        winner_count = data.get('winner_count', 1)
        reserve_count = data.get('reserve_count', 0)
        
        # Benzersiz kullanıcıları al
        unique_users = list(set([c['username'] for c in current_comments]))
        
        if len(unique_users) == 0:
            return jsonify({'success': False, 'error': 'Katılımcı bulunamadı'}), 400
        
        # Toplam seçilecek kişi sayısını kontrol et
        total_needed = winner_count + reserve_count
        if total_needed > len(unique_users):
            return jsonify({
                'success': False, 
                'error': f'Toplam {total_needed} kişi seçilemez, sadece {len(unique_users)} katılımcı var'
            }), 400
        
        # Rastgele kazananları seç
        shuffled = unique_users.copy()
        random.shuffle(shuffled)
        
        winners = shuffled[:winner_count]
        reserves = shuffled[winner_count:winner_count + reserve_count] if reserve_count > 0 else []
        
        # Sonucu kaydet
        save_result_multiple(winners, reserves, unique_users)
        
        return jsonify({
            'success': True,
            'winners': winners,
            'reserves': reserves,
            'total_participants': len(unique_users)
        })
        
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

@app.route('/api/results', methods=['GET'])
def get_results():
    try:
        if os.path.exists('cekilis_sonuclari.json'):
            with open('cekilis_sonuclari.json', 'r', encoding='utf-8') as f:
                results = json.load(f)
            return jsonify({'success': True, 'results': results})
        else:
            return jsonify({'success': True, 'results': []})
    except Exception as e:
        return jsonify({'success': False, 'error': str(e)}), 500

def extract_shortcode(url):
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

def save_result_multiple(winners, reserves, participants):
    result = {
        'date': datetime.now().strftime('%Y-%m-%d %H:%M:%S'),
        'winners': winners,
        'reserves': reserves,
        'winner_count': len(winners),
        'reserve_count': len(reserves),
        'total_participants': len(participants),
        'participants': participants
    }
    
    try:
        try:
            with open('cekilis_sonuclari.json', 'r', encoding='utf-8') as f:
                results = json.load(f)
        except:
            results = []
        
        results.append(result)
        
        with open('cekilis_sonuclari.json', 'w', encoding='utf-8') as f:
            json.dump(results, f, ensure_ascii=False, indent=2)
    except Exception as e:
        print(f"Kayıt hatası: {e}")

if __name__ == '__main__':
    # Production mode için debug=False yapabilirsiniz
    app.run(debug=True, port=5000, host='0.0.0.0')
