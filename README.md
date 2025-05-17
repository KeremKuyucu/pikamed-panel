# PikaMed Admin Paneli

Bu panel, PikaMed sisteminin yönetimi ve kullanıcı işlemleri için geliştirilmiştir. Panel üzerinden kullanıcı, doktor ve admin yönetimi, bildirim gönderimi ve sistem istatistikleri gibi işlemler yapılabilir.

## Özellikler
- Google ile giriş ve admin yetkilendirme
- Kullanıcı, doktor ve admin listeleri
- Doktor ekleme ve silme
- Bildirim gönderme (HTML destekli, Mailjet ile uyumlu)
- Hasta detaylarını görüntüleme
- Karanlık mod desteği

## Kurulum

1. **Depoyu klonlayın:**
   ```bash
   git clone <repo-url>
   cd pikamed-panel
   ```
2. **Bağımlılıkları yükleyin:**
   ```bash
   npm install
   # veya
   yarn install
   ```
3. **Gerekli ortam değişkenlerini ayarlayın:**
   - Firebase ve Mailjet gibi servisler için gerekli anahtarları `.env` dosyasına ekleyin.

4. **Projeyi başlatın:**
   ```bash
   npm run dev
   # veya
   yarn dev
   ```

## Kullanım
- Google hesabınız ile giriş yapın.
- Sol menüden kullanıcılar, doktorlar, bildirimler ve diğer sayfalara geçiş yapabilirsiniz.
- Bildirim gönderme sayfasında HTML formatında e-posta şablonunuzu yapıştırabilir ve önizlemesini görebilirsiniz.
- Sadece admin yetkisine sahip kullanıcılar panele erişebilir.

## Geliştirme
- Proje React ve Next.js ile geliştirilmiştir.
- Firebase kimlik doğrulama ve veritabanı kullanılmaktadır.
- Bildirimler için Mailjet ve Firebase Cloud Messaging (FCM) desteği vardır.

## Katkı
Katkıda bulunmak için lütfen bir fork oluşturun ve pull request gönderin.

## Lisans
Bu proje MIT lisansı ile lisanslanmıştır. 