# Adhan Weather

Türkiye'deki il ve ilçeler için anlık hava durumu ve namaz vakitlerini görüntüleyen bir web uygulamasıdır. Kullanıcıların konumlarına veya aradıkları il/ilçeye göre detaylı hava durumu ve ezan vakitlerini sunar.

## Özellikler

- **Hava Durumu:** Seçilen il/ilçe için sıcaklık, nem, basınç, rüzgar hızı ve yönü gibi detaylı hava durumu bilgileri.
- **Namaz Vakitleri:** Seçilen konum için hesaplanmış günlük namaz vakitleri (İmsak, Güneş, Öğle, İkindi, Akşam, Yatsı).
- **Konum Bazlı Arama:** Tarayıcı konumu kullanılarak en yakın il/ilçenin verilerini otomatik getirme.
- **Detaylı Arama:** İl ve ilçe ismi ile arama yapabilme.
- **Türkçe Hava Durumu:** Hava durumu açıklamalarının Türkçe çevirileri.

## Gereksinimler

- Node.js
- Bir [OpenWeatherMap](https://openweathermap.org/) API anahtarı

## Kurulum

1. Bu projeyi bilgisayarınıza klonlayın:
   ```bash
   git clone https://github.com/kullaniciadi/adhan-weather.git
   cd adhan-weather
   ```

2. Gerekli paketleri yükleyin:
   ```bash
   npm install
   ```

3. Çevresel değişkenleri ayarlayın:
   Ana dizinde bir `.env` dosyası oluşturun ve OpenWeatherMap API anahtarınızı ekleyin:
   ```env
   OPENWEATHER=sizin_api_anahtariniz
   PORT=8600
   ```

## Çalıştırma

Uygulamayı başlatmak için:

```bash
npm start
# veya
node .
```

Sunucu varsayılan olarak `http://localhost:8600` adresinde çalışacaktır. Konsolda sunucunun çalıştığı yerel IP adresi de gösterilir.

## Kullanım

Tarayıcınızda `http://localhost:8600` adresine gidin.
- **Arama:** Kutucuğa bir il veya ilçe adı yazarak (örn: "İstanbul", "Kadıköy") hava durumu ve namaz vakitlerini görebilirsiniz.
- **Konum:** "Konumumu Bul" butonuna tıklayarak (tarayıcı izni gerektirir) mevcut konumunuzdaki verileri görebilirsiniz.

## API Uç Noktaları

Uygulama ayrıca JSON formatında veri döndüren API uç noktalarına sahiptir:

### 1. İsme Göre Veri Getir

- **URL:** `/weather`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "district": "Fatih"
  }
  ```
- **Başarılı Cevap:** Hava durumu ve namaz vakitlerini içeren JSON nesnesi.

### 2. Koordinata Göre Veri Getir

- **URL:** `/current`
- **Method:** `POST`
- **Body:**
  ```json
  {
    "lat": 41.0082,
    "lon": 28.9784
  }
  ```
- **Başarılı Cevap:** Koordinatlara en yakın ilçe bilgisi, hava durumu ve namaz vakitleri.

## Teknolojiler

- **Node.js & Express:** Sunucu ve API yönetimi.
- **EJS:** Arayüz şablon motoru.
- **Adhan.js:** Namaz vakitleri hesaplaması.
- **OpenWeatherMap API:** Hava durumu verileri.
- **Moment Timezone:** Zaman dilimi yönetimi.

## Lisans

Bu proje ISC lisansı ile lisanslanmıştır.
