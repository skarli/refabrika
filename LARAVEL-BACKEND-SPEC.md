# Re:Fabrika Backend API — Laravel Spesifikasyonu

**Hedef:** Next.js frontend'in tüketeceği bir REST API. Sanity yerine geçer. Tek seferde ve eksiksiz.

**Base URL:** `https://api.refabrika.com` (veya neyse)
**Format:** JSON (UTF-8)
**Auth:** Public okumalar token gerektirmez. Sadece form submission'a rate-limit (Laravel Throttle). Admin yazıları Filament panelinden yapılır.
**Image storage:** R2. Tüm image alanları full URL döner (`https://cdn.refabrika.com/...`). Frontend transform için query parametresi destekler: `?w=1200&h=630&q=80` (opsiyonel, yoksa orijinal).
**Tarih formatı:** Hepsi ISO 8601, UTC. (`2026-05-22T18:10:05Z`)
**Slug formatı:** lowercase, kebab-case, unique per resource.
**HTTP kodları:** `200` başarılı, `404` bulunamadı, `422` validation, `429` rate-limit, `500` server. Body her zaman JSON.
**Hata cevabı her endpoint için aynı:**
```json
{ "error": "Human readable mesaj", "code": "validation_failed", "details": {} }
```

---

## RICH TEXT (PORTABLE TEXT YERİNE)

Sanity Portable Text yerine **basit HTML string** dön. Frontend'te `dangerouslySetInnerHTML` ile basacağız. Filament'te WYSIWYG (Tiptap veya TinyMCE) editör kullan, output HTML olsun.

Eğer block tabanlı içerik istersen, alternatif olarak şu basit JSON dizisi formatı kabul edilir:

```json
[
  { "type": "paragraph", "text": "..." },
  { "type": "heading", "level": 2, "text": "..." },
  { "type": "image", "url": "https://...", "alt": "..." },
  { "type": "list", "ordered": false, "items": ["...", "..."] },
  { "type": "code", "language": "js", "text": "..." },
  { "type": "quote", "text": "..." }
]
```

**Karar: HTML string seçtim.** Daha basit, frontend zaten string bekliyor.

---

## ORTAK TİPLER

### `ImageObject`
```json
{
  "url": "https://cdn.refabrika.com/uploads/abc123.webp",
  "alt": "Açıklayıcı metin",
  "width": 1920,
  "height": 1080
}
```
> `url` her zaman zorunlu. `alt` her zaman string (boş olabilir ama field olmalı). `width` ve `height` opsiyonel ama tercih edilir (CLS önler).

### `SeoObject`
```json
{
  "meta_title": "Sayfa başlığı | re:fabrika",
  "meta_description": "150 karaktere kadar açıklama",
  "og_image": { "url": "...", "alt": "...", "width": 1200, "height": 630 },
  "no_index": false,
  "canonical_url": null
}
```
> Tüm field opsiyonel ama key'ler her zaman bulunmalı (`null` veya değer). `no_index` zorunlu boolean.

### `Slug`
```json
{ "current": "blog-post-slug" }
```
> Sanity uyumluluğu için bu yapı korunsun. Sadece string yerine `{ current: "..." }`.

---

# ENDPOINTLER

## 1. GET `/api/site-settings`

Site genelinde her sayfada kullanılır. Her yerde `getSiteSettings()` çağrısı buraya gelir. **TEK obje döner, array değil.**

**Cache:** 1 saat (3600 sn). Filament'te güncellenince Laravel cache'i invalidate etsin.

**Response:**
```json
{
  "site_name": "re:fabrika",
  "site_description": "AI-powered creative agency since 2009",
  "logo": { "url": "...", "alt": "re:fabrika logo", "width": 200, "height": 60 },
  "favicon": { "url": "...", "alt": "", "width": 32, "height": 32 },
  "header_text": "re:fabrika — digital marketing & brand growth agency [since 2009]",
  "social_links": {
    "instagram": "https://instagram.com/refabrika",
    "facebook": "https://facebook.com/refabrika",
    "twitter": "https://twitter.com/refabrika",
    "linkedin": "https://linkedin.com/company/refabrika",
    "behance": null,
    "dribbble": null,
    "youtube": null
  },
  "contact_info": {
    "email": "sadettin@refabrika.com",
    "phone": "+90 532 374 55 68",
    "address": "Mustafa Kemal Blv., 158A, Fethiye, Muğla, TR"
  },
  "footer_text": "© 2026 re:fabrika. Tüm hakları saklıdır.",
  "cta_text": "Let's start your project",
  "cta_link": "/contact"
}
```

**Notlar:**
- `logo`, `favicon` null olabilir (yoksa).
- `social_links` içindeki her platform null olabilir ama key her zaman var.
- `contact_info` içindeki field'lar null olabilir.

---

## 2. GET `/api/navigation`

Header ve side menu. **TEK obje döner.**

**Cache:** 1 saat.

**Response:**
```json
{
  "main_menu": [
    { "key": "nav-1", "label": "Home", "href": "/" },
    { "key": "nav-2", "label": "Services", "href": "/services" },
    { "key": "nav-3", "label": "Portfolio", "href": "/portfolio" },
    { "key": "nav-4", "label": "Blog", "href": "/blog" },
    { "key": "nav-5", "label": "FAQ", "href": "/faq" },
    { "key": "nav-6", "label": "Contact", "href": "/contact" }
  ],
  "side_menu_contact_title": "Get in touch",
  "side_menu_button_text": "Send a message"
}
```

**Notlar:**
- `key` unique olmalı (Laravel'de auto-id veya uuid kullan, sadece string olarak gönder).
- `main_menu` her zaman array (boş olabilir).

---

## 3. GET `/api/home`

Anasayfanın tüm verisi. **TEK obje döner.**

**Cache:** 60 sn.

**Response:**
```json
{
  "hero": {
    "subtitle": "Full-service digital agency — Since 2009®",
    "title": "Strategy-driven digital agency, based in",
    "location": "Fethiye",
    "location_image": { "url": "...", "alt": "Fethiye office", "width": 800, "height": 600 },
    "description": "We build brands that perform. From social media...",
    "button_text": "Get started",
    "button_link": "/contact",
    "stats": "17 years of digital excellence",
    "social_links": [
      { "key": "hsl-1", "label": "Instagram", "url": "https://..." },
      { "key": "hsl-2", "label": "LinkedIn", "url": "https://..." }
    ]
  },
  "about": {
    "title": "Creating virtual emotion in the universe, for the largest brands & market since",
    "year_start": "2009",
    "year_end": "2026",
    "description": "We help brands and people be part of the solution...",
    "button_text": "Learn More",
    "button_link": "/about"
  },
  "work": {
    "section_title": "We find the unique, easy solution for each creative project",
    "button_text": "View all work",
    "featured_works": [
      {
        "id": "w-1",
        "title": "Blue More Yachting",
        "slug": { "current": "blue-more-yachting" },
        "thumbnail": { "url": "...", "alt": "...", "width": 1200, "height": 800 },
        "year": "2024",
        "tags": ["Branding", "Web"]
      }
    ]
  },
  "services": {
    "section_title": "Services we provide",
    "subtitle": "Services",
    "description": "We are here to build solid and courageous brands...",
    "featured_services": [
      {
        "id": "s-1",
        "title": "Web Development",
        "slug": { "current": "web-development" },
        "number": "01",
        "short_description": "Custom web solutions...",
        "thumbnail": { "url": "...", "alt": "...", "width": 600, "height": 400 }
      }
    ]
  },
  "clients": {
    "title": "Client: Helping brands to grow...",
    "description": "We're a great team of creatives...",
    "logos": [
      {
        "key": "cl-1",
        "logo": { "url": "...", "alt": "Client name", "width": 200, "height": 80 },
        "bg_theme": false
      }
    ]
  },
  "blog": {
    "section_title": "Learn our recent journal",
    "button_text": "Learn all news",
    "featured_blogs": [
      {
        "id": "b-1",
        "title": "Server-side tracking with Meta",
        "slug": { "current": "server-side-tracking-meta-advertising" },
        "thumbnail": { "url": "...", "alt": "...", "width": 1200, "height": 800 },
        "author": "Sadettin Karli",
        "published_at": "2026-04-15T09:00:00Z"
      }
    ]
  },
  "seo": {
    "meta_title": "re:fabrika — Digital Marketing & Brand Growth Agency",
    "meta_description": "...",
    "og_image": null,
    "no_index": false,
    "canonical_url": null
  }
}
```

**Notlar:**
- `featured_works`, `featured_services`, `featured_blogs` boş array olabilir ama key her zaman var.
- `featured_works` max 6 (Filament'te limit koy). `featured_services` max 4. `featured_blogs` max 3.
- `social_links` her zaman array (boş olabilir).

---

## 4. GET `/api/blog-page`

Blog liste sayfası başlıkları.

**Cache:** 1 saat.

**Response:**
```json
{
  "page_title": "Latest news and insights",
  "seo": {
    "meta_title": "Blog | re:fabrika",
    "meta_description": "Expert insights on digital marketing...",
    "og_image": null,
    "no_index": false,
    "canonical_url": null
  }
}
```

---

## 5. GET `/api/blog-posts`

Tüm blog yazıları, **publish tarihine göre yeniden eskiye sıralı**.

**Cache:** 60 sn.

**Query param:** yok şu an. İleride pagination eklenecekse `?page=1&per_page=10`.

**Response:**
```json
[
  {
    "id": "b-1",
    "title": "Server-side tracking with Meta",
    "slug": { "current": "server-side-tracking-meta-advertising" },
    "excerpt": "150 karaktere kadar özet.",
    "thumbnail": { "url": "...", "alt": "...", "width": 1200, "height": 800 },
    "author": "Sadettin Karli",
    "published_at": "2026-04-15T09:00:00Z",
    "tags": ["Marketing", "Meta", "Tracking"]
  }
]
```

**Notlar:**
- Her zaman array döner (boşsa `[]`).
- Sadece `published` (taslak değil) olanlar dahil.
- `author` string (basit). Object istemiyoruz, sadece isim.
- `tags` string array (boş olabilir).

---

## 6. GET `/api/blog-posts/{slug}`

Tek blog yazısı detayı.

**Cache:** 60 sn.

**Path param:** `slug` (örn: `server-side-tracking-meta-advertising`)

**Response (200):**
```json
{
  "id": "b-1",
  "title": "Server-side tracking with Meta",
  "slug": { "current": "server-side-tracking-meta-advertising" },
  "excerpt": "150 karaktere kadar özet.",
  "content": "<p>Tam HTML içerik buraya gelir. Frontend dangerouslySetInnerHTML ile basacak.</p><h2>Alt başlık</h2><p>Detay metin...</p>",
  "thumbnail": { "url": "...", "alt": "...", "width": 1200, "height": 800 },
  "author": "Sadettin Karli",
  "published_at": "2026-04-15T09:00:00Z",
  "tags": ["Marketing", "Meta", "Tracking"],
  "seo": {
    "meta_title": "Server-side tracking with Meta | re:fabrika",
    "meta_description": "...",
    "og_image": null,
    "no_index": false,
    "canonical_url": null
  }
}
```

**Response (404):**
```json
{ "error": "Blog post not found", "code": "not_found" }
```

**Notlar:**
- `content` HTML string. Filament'te WYSIWYG editor output'u. **Sanitize edilmiş olmalı** (XSS riski) ama tag'ler korunsun (`<p>`, `<h2>`, `<h3>`, `<a href>`, `<img src alt>`, `<strong>`, `<em>`, `<ul>`, `<ol>`, `<li>`, `<blockquote>`, `<code>`, `<pre>`, `<br>` yeterli).

---

## 7. GET `/api/blog-slugs`

Sitemap ve `generateStaticParams` için. Sadece slug listesi.

**Cache:** 60 sn.

**Response:**
```json
[
  { "slug": "server-side-tracking-meta-advertising", "updated_at": "2026-04-20T12:00:00Z" },
  { "slug": "postgresql-supabase-backend-guide", "updated_at": "2026-03-10T08:30:00Z" }
]
```

**Notlar:** `updated_at` ISO 8601. Sitemap için `lastmod` olarak kullanılır.

---

## 8. GET `/api/portfolio-page`

Portfolyo liste sayfası başlıkları.

**Cache:** 1 saat.

**Response:**
```json
{
  "page_title": "Our selected works",
  "seo": {
    "meta_title": "Portfolio | re:fabrika",
    "meta_description": "...",
    "og_image": null,
    "no_index": false,
    "canonical_url": null
  }
}
```

---

## 9. GET `/api/portfolio`

Tüm portfolyo projeleri, **`order` artan, sonra `year` azalan** sıralı.

**Cache:** 60 sn.

**Response:**
```json
[
  {
    "id": "p-1",
    "title": "Blue More Yachting",
    "slug": { "current": "blue-more-yachting" },
    "thumbnail": { "url": "...", "alt": "...", "width": 1200, "height": 800 },
    "year": "2024",
    "tags": ["Web", "Branding"],
    "featured": true
  }
]
```

**Notlar:**
- `order` field DB'de var ama API'de görünmüyor (sadece sort için).
- `featured` boolean (homepage'de filtre için).

---

## 10. GET `/api/portfolio/{slug}`

Tek portfolyo projesi detayı.

**Cache:** 60 sn.

**Response (200):**
```json
{
  "id": "p-1",
  "title": "Blue More Yachting",
  "slug": { "current": "blue-more-yachting" },
  "thumbnail": { "url": "...", "alt": "...", "width": 1200, "height": 800 },
  "year": "2024",
  "tags": ["Web", "Branding"],
  "client": "Blue More Yachting Co.",
  "service": "Web Development & Branding",
  "date": "March 2024",
  "technology": "Next.js, Sanity, R2",
  "short_description": "Tek satırlık açıklama, max 200 karakter.",
  "full_description": "<p>Tam HTML açıklama, blog content gibi.</p>",
  "gallery": [
    { "url": "...", "alt": "Project screenshot 1", "width": 1920, "height": 1080 },
    { "url": "...", "alt": "Project screenshot 2", "width": 1920, "height": 1080 }
  ],
  "features": [
    "Custom CMS",
    "Multi-language",
    "Booking system"
  ],
  "seo": {
    "meta_title": "Blue More Yachting Case Study | re:fabrika",
    "meta_description": "...",
    "og_image": null,
    "no_index": false,
    "canonical_url": null
  }
}
```

**Response (404):**
```json
{ "error": "Portfolio project not found", "code": "not_found" }
```

**Notlar:**
- `gallery` array her zaman var (boşsa `[]`).
- `features` string array, boş olabilir.
- `full_description` HTML string, blog `content` ile aynı sanitizasyon.

---

## 11. GET `/api/portfolio-slugs`

Sitemap için.

**Response:**
```json
[
  { "slug": "blue-more-yachting", "updated_at": "2026-04-01T10:00:00Z" }
]
```

---

## 12. GET `/api/services-page`

Hizmetler liste sayfası başlıkları.

**Cache:** 1 saat.

**Response:**
```json
{
  "page_title": "Services we provide",
  "page_subtitle": "What we do",
  "page_description": "Comprehensive digital solutions...",
  "seo": { "...": "..." }
}
```

---

## 13. GET `/api/services`

Tüm hizmetler, **`order` artan**.

**Cache:** 1 saat.

**Response:**
```json
[
  {
    "id": "s-1",
    "title": "Web Development",
    "slug": { "current": "web-development" },
    "number": "01",
    "short_description": "Custom web solutions built with cutting-edge technology.",
    "thumbnail": { "url": "...", "alt": "...", "width": 600, "height": 400 }
  }
]
```

---

## 14. GET `/api/services/{slug}`

Tek hizmet detayı. **Bu endpoint en complex.**

**Cache:** 1 saat.

**Response (200):**
```json
{
  "id": "s-1",
  "title": "Web Development",
  "slug": { "current": "web-development" },
  "number": "01",
  "short_description": "Custom web solutions...",
  "thumbnail": { "url": "...", "alt": "...", "width": 600, "height": 400 },
  "serial_number": "S/01",
  "tag_label": "Development",
  "hero_description": "We craft custom web experiences that perform.",
  "hero_features": [
    "Custom development",
    "Performance-first",
    "SEO optimized"
  ],
  "approach_title": "Our approach",
  "approach_description": "How we deliver projects step by step.",
  "approach_steps": [
    {
      "key": "step-1",
      "title": "Discovery",
      "description": "Understanding requirements and goals."
    },
    {
      "key": "step-2",
      "title": "Design",
      "description": "Wireframes and prototypes."
    }
  ],
  "feature_cards": [
    {
      "key": "fc-1",
      "title": "Performance",
      "description": "Lighthouse 100/100."
    }
  ],
  "value_section_title": "Why choose us",
  "value_stats": [
    {
      "key": "vs-1",
      "value": "150+",
      "description": "Projects delivered"
    }
  ],
  "faqs": [
    {
      "key": "faq-1",
      "question": "How long does a project take?",
      "answer": "Typically 6-12 weeks."
    }
  ],
  "seo": { "...": "..." }
}
```

**Response (404):**
```json
{ "error": "Service not found", "code": "not_found" }
```

**Notlar:**
- `approach_steps`, `feature_cards`, `value_stats`, `faqs` array, her biri boş olabilir.
- `hero_features` string array, boş olabilir.
- `key` her array elemanında unique, frontend React `key` prop'u için kullanılıyor.

---

## 15. GET `/api/service-slugs`

```json
[
  { "slug": "web-development", "updated_at": "2026-03-15T09:00:00Z" }
]
```

---

## 16. GET `/api/faq-page`

SSS sayfası.

**Cache:** 1 saat.

**Response:**
```json
{
  "page_title": "Frequently Asked Questions",
  "faqs": [
    {
      "key": "faq-1",
      "question": "What services do you offer?",
      "answer": "We offer full digital marketing, branding, and web development services."
    }
  ],
  "seo": { "...": "..." }
}
```

**Notlar:**
- `answer` plain text. Eğer HTML istersen söyle ama default plain text yeter.

---

## 17. GET `/api/contact-page`

İletişim sayfası.

**Cache:** 1 saat.

**Response:**
```json
{
  "page_title": "Let's talk",
  "section_title": "Get in touch with us",
  "section_description": "Tell us about your project...",
  "follow_title": "Follow us",
  "form_labels": {
    "name_placeholder": "Your name",
    "email_placeholder": "Your email",
    "phone_placeholder": "Your phone",
    "company_placeholder": "Your company",
    "budget_placeholder": "Select budget",
    "solution_placeholder": "What solution?",
    "message_placeholder": "Tell us about your project",
    "button_text": "Send message"
  },
  "budget_options": [
    "< 5K USD",
    "5K - 15K USD",
    "15K - 50K USD",
    "50K+ USD"
  ],
  "seo": { "...": "..." }
}
```

---

## 18. POST `/api/contact-submissions`

Form gönderimi. **TEK YAZMA endpoint'i.**

**Rate-limit:** IP başına 5 istek / 10 dakika. Aşılırsa 429.

**Honeypot:** `website` field'ı gelirse silently 200 dön (botları aldat).

**Request body:**
```json
{
  "name": "Ali Veli",
  "email": "ali@example.com",
  "phone": "+90 555 123 4567",
  "company": "Acme Inc",
  "budget": "15K - 50K USD",
  "solution": "Website redesign",
  "message": "We need a new website...",
  "website": ""
}
```

**Validation kuralları:**
- `name`: required, string, max 200
- `email`: required, valid email format
- `phone`: required, string, max 50
- `company`: optional, string, max 200
- `budget`: required, string (budget_options'tan biri olmalı ama strict validation şart değil)
- `solution`: required, string, max 200
- `message`: required, string, max 5000
- `website`: honeypot, gelirse silent reject

**Response (200):**
```json
{ "success": true, "id": "cs-uuid-here" }
```

**Response (422 - validation):**
```json
{
  "error": "Missing required fields",
  "code": "validation_failed",
  "details": {
    "email": ["Invalid email format"],
    "phone": ["The phone field is required"]
  }
}
```

**Response (429 - rate-limit):**
```json
{ "error": "Too many requests. Try again later.", "code": "rate_limited" }
```

**Server-side davranış:**
1. Validate
2. DB'ye `contact_submissions` tablosuna yaz (alanlar: id, name, email, phone, company, budget, solution, message, ip, user_agent, submitted_at, read=false)
3. Email gönder (opsiyonel — kullanmıyorsan atla): admin'e bildirim
4. 200 dön

---

# FİLAMENT ADMIN PANEL

Bu endpoint'lerin **TÜMÜNÜN Filament tarafından yönetilmesi** gerekiyor. Her endpoint'in karşılığı olan bir Filament Resource:

1. **SiteSettingsResource** — singleton (tek kayıt)
2. **NavigationResource** — singleton (tek kayıt, `mainMenu` repeater)
3. **HomePageResource** — singleton (tek kayıt, çok field)
4. **BlogPageResource** — singleton
5. **BlogPostResource** — CRUD
6. **PortfolioPageResource** — singleton
7. **PortfolioResource** — CRUD
8. **ServicesPageResource** — singleton
9. **ServiceResource** — CRUD
10. **FaqPageResource** — singleton (faqs repeater)
11. **ContactPageResource** — singleton
12. **ContactSubmissionResource** — read-only liste (Filament'te view, hiç create form yok)

**Önemli:** Singleton resource'larda **birden fazla kayıt oluşturulamamalı** (Filament'te `canCreate: false` after first record).

---

# IMAGE STORAGE (R2)

Tüm image upload R2'ye gitsin. Filament'in built-in `FileUpload` field'ı (`disk: 'r2'`) kullan. Storage config Laravel'de:

```php
// config/filesystems.php
'r2' => [
    'driver' => 's3',
    'key' => env('R2_ACCESS_KEY_ID'),
    'secret' => env('R2_SECRET_ACCESS_KEY'),
    'region' => 'auto',
    'bucket' => env('R2_BUCKET'),
    'endpoint' => env('R2_ENDPOINT'),
    'use_path_style_endpoint' => true,
    'url' => env('R2_PUBLIC_URL'),
],
```

API'de image dönerken:
- `url`: `$env('R2_PUBLIC_URL') . '/' . $imagePath` (full URL)
- `alt`: DB'de saklanan string
- `width`/`height`: upload sırasında image header'dan çek (`intervention/image` paketi)

---

# ÖZET: ENDPOINT TABLOSU

| Method | Endpoint | Cache | Auth | Açıklama |
|---|---|---|---|---|
| GET | `/api/site-settings` | 1h | - | Singleton |
| GET | `/api/navigation` | 1h | - | Singleton |
| GET | `/api/home` | 60s | - | Anasayfa full |
| GET | `/api/blog-page` | 1h | - | Liste sayfa başlık |
| GET | `/api/blog-posts` | 60s | - | Tüm blog yazıları |
| GET | `/api/blog-posts/{slug}` | 60s | - | Tek blog yazısı |
| GET | `/api/blog-slugs` | 60s | - | Sitemap için |
| GET | `/api/portfolio-page` | 1h | - | Liste sayfa başlık |
| GET | `/api/portfolio` | 60s | - | Tüm portfolyo |
| GET | `/api/portfolio/{slug}` | 60s | - | Tek portfolyo |
| GET | `/api/portfolio-slugs` | 60s | - | Sitemap için |
| GET | `/api/services-page` | 1h | - | Liste sayfa başlık |
| GET | `/api/services` | 1h | - | Tüm hizmetler |
| GET | `/api/services/{slug}` | 1h | - | Tek hizmet |
| GET | `/api/service-slugs` | 1h | - | Sitemap için |
| GET | `/api/faq-page` | 1h | - | SSS |
| GET | `/api/contact-page` | 1h | - | İletişim sayfa |
| POST | `/api/contact-submissions` | - | Rate-limit | Form gönder |

**18 endpoint. Hepsi bu.**

---

# DİKKAT EDİLECEK 6 NOKTA

1. **JSON key naming**: snake_case (örn: `meta_title`, `site_name`, `featured_works`). camelCase YAPMA.
2. **`null` vs eksik field**: Tüm key'ler response'ta her zaman olmalı. Değer yoksa `null` veya `[]` dön. Frontend hata vermez.
3. **`slug` her zaman `{ "current": "..." }`** formatında. String değil.
4. **Tarih her zaman ISO 8601 UTC** (`2026-05-22T18:10:05Z`). Timezone offset YAZMA.
5. **Image URL full URL** (CDN). Relative path dönderme.
6. **`featured` ve `order` field'ları**: portfolyo ve hizmetlerde DB'de var, API'de sadece `featured` görünür, `order` sıralama için kullanılır ama response'a girmez.

---

# DB SCHEMA İPUCU (Laravel migrations)

Sana bağlı, ama referans:

```
site_settings (id, site_name, site_description, logo_path, favicon_path, header_text, social_links JSON, contact_info JSON, footer_text, cta_text, cta_link)
navigations (id, main_menu JSON, side_menu_contact_title, side_menu_button_text)
home_pages (id, hero JSON, about JSON, work JSON, services JSON, clients JSON, blog JSON, seo JSON)
blog_pages (id, page_title, seo JSON)
blog_posts (id, title, slug, excerpt, content, thumbnail_path, thumbnail_alt, thumbnail_w, thumbnail_h, author, published_at, tags JSON, seo JSON, status, order)
portfolio_pages (id, page_title, seo JSON)
portfolios (id, title, slug, thumbnail_path, thumbnail_alt, thumbnail_w, thumbnail_h, year, tags JSON, featured, client, service, date_label, technology, short_description, full_description, gallery JSON, features JSON, seo JSON, order)
services_pages (id, page_title, page_subtitle, page_description, seo JSON)
services (id, title, slug, number, short_description, thumbnail_path, ..., serial_number, tag_label, hero_description, hero_features JSON, approach_title, approach_description, approach_steps JSON, feature_cards JSON, value_section_title, value_stats JSON, faqs JSON, seo JSON, order)
faq_pages (id, page_title, faqs JSON, seo JSON)
contact_pages (id, page_title, section_title, section_description, follow_title, form_labels JSON, budget_options JSON, seo JSON)
contact_submissions (id, name, email, phone, company, budget, solution, message, ip, user_agent, submitted_at, read)
```

JSON field'lar Laravel'in `casts` ile array'e cast edilsin.

---

# SLUG'LAR (MEVCUT İÇERİK)

Şu an Sanity'de bunlar var, bunları seed olarak girersen frontend'in route'ları kırılmaz:

**Blog (10):**
- server-side-tracking-meta-advertising
- conversion-api-implementation-guide
- postgresql-supabase-backend-guide
- laravel-12-modern-php-development
- (geri kalan 6'sı için Sanity'den listele)

**Portfolio (3):**
- blue-more-yachting
- online-ciftci
- villa-kalkan

**Services (5):**
- web-development
- ecommerce
- branding-identity
- digital-marketing
- social-media

---

# ÖRNEK İSTEK / CEVAP (curl)

```bash
# Site settings
curl https://api.refabrika.com/api/site-settings

# Blog liste
curl https://api.refabrika.com/api/blog-posts

# Tek blog
curl https://api.refabrika.com/api/blog-posts/server-side-tracking-meta-advertising

# Form gönder
curl -X POST https://api.refabrika.com/api/contact-submissions \
  -H "Content-Type: application/json" \
  -d '{"name":"Ali","email":"ali@x.com","phone":"+9055...","budget":"5K - 15K USD","solution":"Web","message":"...","website":""}'
```

---

---

# SEED VERİSİ (MEVCUT SİTE İÇERİĞİ)

Bu bölüm, Sanity'deki **gerçek production verisini** snake_case'e çevrilmiş halde içerir. Bunu Laravel migration/seeder'larında olduğu gibi kullan, sıfırdan içerik üretme.

**Tam dosya:** `seed-data.json` (bu repo'nun kök dizininde, 84 KB)

İçinde 11 üst seviye anahtar var, hepsi yukarıdaki API endpoint cevaplarıyla **bire bir aynı yapıda**:

| Anahtar | Tip | Adet | Açıklama |
|---|---|---|---|
| `site_settings` | object | 1 | `/api/site-settings` response'u |
| `navigation` | object | 1 | `/api/navigation` response'u |
| `home` | object | 1 | `/api/home` response'u |
| `blog_page` | object | 1 | `/api/blog-page` response'u |
| `portfolio_page` | object | 1 | `/api/portfolio-page` response'u |
| `services_page` | object | 1 | `/api/services-page` response'u |
| `faq_page` | object | 1 | `/api/faq-page` response'u (7 FAQ) |
| `contact_page` | object | 1 | `/api/contact-page` response'u |
| `blog_posts` | array | 10 | `/api/blog-posts` response'u |
| `portfolios` | array | 3 | `/api/portfolio` response'u |
| `services` | array | 5 | `/api/services` response'u |

## Seed Stratejisi (Laravel)

1. `seed-data.json` dosyasını `database/seeders/data/seed-data.json` olarak repoya kopyala.
2. Her tablo için ayrı bir Seeder class yaz, JSON'dan ilgili dilimi oku, DB'ye yaz.
3. `DatabaseSeeder` içinde sırayla çağır:
   ```php
   $this->call([
       SiteSettingsSeeder::class,
       NavigationSeeder::class,
       HomePageSeeder::class,
       BlogPageSeeder::class,
       PortfolioPageSeeder::class,
       ServicesPageSeeder::class,
       FaqPageSeeder::class,
       ContactPageSeeder::class,
       ServicesSeeder::class,        // önce services (homepage featured ref'ler bunlara)
       PortfoliosSeeder::class,
       BlogPostsSeeder::class,
   ]);
   ```

## Önemli: Image URL'ler

Seed'deki tüm `url` alanları **Sanity CDN'inden gerçek URL'lere** çözüldü (`https://cdn.sanity.io/images/28nepg2u/...`). Migration sırasında iki yaklaşım var:

**A) Sanity URL'leri olduğu gibi kullan** (en hızlı): API response'ta direkt bu URL'leri dön, R2'ye taşıma sonradan yap.

**B) R2'ye aktar** (önerilen): Seeder içinde her image URL'sini wget/curl ile indir, R2'ye upload et, DB'ye R2 URL'sini yaz.

Şu an seed'de **çoğu thumbnail boş** çünkü Sanity'de henüz yüklü değil. Sadece `home.hero.location_image` dolu (yeni yüklediğin görsel).

## Mevcut İçerik — Hızlı Tablo

### Site Settings (`site_settings`)
```json
{
  "site_name": "re:fabrika",
  "site_description": "AI-Powered Creative Agency | Since 2009 | Fethiye & Istanbul",
  "header_text": "re:fabrika — digital marketing\n& brand growth agency\n[since 2009]",
  "footer_text": "© 2024 re:fabrika. AI-Powered Creative Agency.",
  "cta_text": "Start Your Project",
  "cta_link": "/contact",
  "contact_info": {
    "address": "Fethiye, Muğla, Turkey",
    "email": "hello@refabrika.com",
    "phone": "+90 252 612 00 00"
  },
  "social_links": {
    "instagram": "https://instagram.com/refabrika",
    "facebook": "https://facebook.com/refabrika",
    "twitter": "https://twitter.com/refabrika",
    "linkedin": "https://linkedin.com/company/refabrika",
    "behance": "https://behance.net/refabrika",
    "dribbble": "https://dribbble.com/refabrika",
    "youtube": "https://youtube.com/@refabrika"
  },
  "logo": null,
  "favicon": null
}
```

### Home Page Hero (kısaltılmış)
```json
{
  "hero": {
    "subtitle": "Full-service digital agency — Since 2009®",
    "title": "Strategy-driven digital agency, based in",
    "location": "Fethiye",
    "location_image": {
      "url": "https://cdn.sanity.io/images/28nepg2u/production/01d65fa0f8fe8d226302cc4bf5a9e3d84e60a16d-1805x823.heif",
      "alt": "",
      "width": 1805,
      "height": 823
    },
    "description": "We build brands that perform. From social media management and Google & Meta ads to full-scale digital marketing strategy, we turn visibility into measurable growth.",
    "button_text": "Get started",
    "button_link": "/contact",
    "stats": "17 years of digital excellence"
  }
}
```

### Blog Posts (10 adet)

Tam `content` ve `excerpt` `seed-data.json`'da. Özet:

| # | Slug | Title | Tags | Published |
|---|---|---|---|---|
| 1 | `server-side-tracking-meta-advertising` | The Critical Role of Server-Side Tracking in Meta Advertising | Digital Marketing, Meta Ads, Tracking | 2024-12-15 |
| 2 | `migrate-to-gtm-server` | Why You Should Migrate to Google Tag Manager Server | GTM, Analytics, Performance | 2024-12-10 |
| 3 | `conversion-api-implementation-guide` | Boost Your Conversion Tracking by 30% with Conversion API | Conversion API, Meta Ads, Google Ads | 2024-12-05 |
| 4 | `laravel-12-modern-php-development` | Laravel 12: The Future of PHP and Modern Web Development | Laravel, PHP, Web Development | 2024-11-28 |
| 5 | `nextjs-15-headless-cms-sanity` | Headless CMS Integration with Next.js 15: A Complete Guide | Next.js, Sanity CMS, Jamstack | 2024-11-20 |
| 6 | `ai-personalization-ecommerce` | AI-Powered Personalization Strategies for E-commerce | AI, E-commerce, Personalization | 2024-11-15 |
| 7 | `tourism-digital-marketing-trends-2025` | Digital Marketing Trends in Tourism Industry 2025 | Tourism, Digital Marketing, Trends | 2024-11-08 |
| 8 | `postgresql-supabase-backend-guide` | PostgreSQL and Supabase: Building Modern Backend Infrastructure | PostgreSQL, Supabase, Backend | 2024-11-01 |
| 9 | `redis-caching-strategies-performance` | Redis Caching Strategies: How to 10x Your Site Speed | Redis, Performance, Caching | 2024-10-25 |
| 10 | `ai-agents-agency-automation` | AI Agents and Automation: Maximizing Agency Productivity | AI, Automation, Productivity | 2024-10-18 |

Tüm yazıların `author` alanı `"re:fabrika"`.

**`content` field önemli not:** Şu an Sanity'de Portable Text **block array** olarak duruyor. API tarafında bunu HTML string'e çevirmen gerekiyor (Spec'te öyle dedik). Pratik için iki seçenek:

- **A)** Seeder içinde Portable Text blocks → HTML çeviren basit bir helper yaz (paragraph, heading, list, link, image desteği yeter).
- **B)** Seed verisini önce manuel olarak HTML'e çevir, sonra seed olarak yükle. Birinci seçenek daha temiz.

Block tipi örnek (seed'de bu formatta):
```json
[
  {
    "_type": "block",
    "style": "h2",
    "children": [{ "_type": "span", "text": "Heading text", "marks": [] }],
    "markDefs": []
  },
  {
    "_type": "block",
    "style": "normal",
    "children": [
      { "_type": "span", "text": "Bir paragraf ", "marks": [] },
      { "_type": "span", "text": "kalın yazı", "marks": ["strong"] }
    ],
    "markDefs": []
  }
]
```

### Portfolio (3 adet)

| Slug | Title | Year | Client | Service |
|---|---|---|---|---|
| `blue-more-yachting` | Blue More Yachting | 2024 | Blue More Yachting | Full Digital Solution |
| `villa-kalkan` | Villa Kalkan | 2024 | Villa Kalkan | Complete Digital Transformation |
| `online-ciftci` | Online Çiftçi | 2024 | Online Çiftçi | Full Digital Transformation |

Her birinin `features`, `short_description`, `tags` ve Portable Text `full_description` alanları `seed-data.json`'da.

### Services (5 adet)

| Slug | Title | Number | Approach Steps | Feature Cards | FAQs |
|---|---|---|---|---|---|
| `branding-identity` | Branding & Identity | (001) | 3 | 3 | 4 |
| `web-development` | Web Development | (002) | 3 | 3 | 4 |
| `digital-marketing` | Digital Marketing | (003) | 3 | 3 | 4 |
| `social-media` | Social Media Management | (004) | 3 | 3 | 4 |
| `ecommerce` | E-commerce Solutions | (005) | 3 | 3 | 4 |

Her hizmetin `hero_description`, `approach_steps`, `feature_cards`, `value_stats`, `faqs` alanları `seed-data.json`'da.

### FAQ Page (7 FAQ)

| Question | Answer (özet) |
|---|---|
| What services does re:fabrika offer? | Social media, Google & Meta ads, digital marketing strategy, brand identity, web development. |
| How do you measure campaign success? | KPIs (engagement, reach, conversion, ROAS), monthly reports. |
| What is your typical project timeline? | Social media: 2-3 wk, Brand: 4-6 wk, Campaigns: 3-4 wk. |
| Do you work with small businesses? | Evet, her ölçek. Bütçe ve hedefe göre uyarlıyoruz. |
| How does the onboarding process work? | Discovery call → tailored proposal → strategy approval → roadmap & content calendar. |
| Can you manage existing ad accounts? | Evet. Audit + optimize. |
| What makes re:fabrika different? | 17 yıl deneyim, strategic + hands-on execution. |

### Contact Page

```json
{
  "page_title": "Get in touch",
  "section_title": "Let's start your project",
  "form_labels": {
    "name_placeholder": "Your name",
    "email_placeholder": "Your email",
    "phone_placeholder": "Your phone",
    "company_placeholder": "Your company",
    "budget_placeholder": "Select budget",
    "solution_placeholder": "What solution?",
    "message_placeholder": "Tell us about your project",
    "button_text": "Send message"
  },
  "budget_options": [
    "< 5K USD",
    "5K - 15K USD",
    "15K - 50K USD",
    "50K+ USD"
  ]
}
```

(Gerçek değerler `seed-data.json`'da; yukarıdaki structure örneği.)

### Navigation

```json
{
  "main_menu": [
    { "key": "nav-1", "label": "Home", "href": "/" },
    { "key": "nav-2", "label": "Services", "href": "/services" },
    { "key": "nav-3", "label": "Portfolio", "href": "/portfolio" },
    { "key": "nav-4", "label": "Blog", "href": "/blog" },
    { "key": "nav-5", "label": "Contact", "href": "/contact" }
  ]
}
```

---

## Bilinen Eksikler (Production'a geçmeden önce ekle)

1. **Çoğu thumbnail boş.** Blog post, portfolio, service thumbnail'ları Sanity'de yüklenmemiş. Filament'te bunları yüklemen gerekecek.
2. **`home.about.title`**: Sanity'de "Creating virtual emotion in the universe, for the largest brands & market since" yazıyor — kontrol et, doğru cümle bu mu.
3. **`home.work.featured_works` / `featured_services` / `featured_blogs`**: Sanity'de reference'lar var, seed'de full obje halinde resolve edildi. Backend tarafında bu reference ilişkilerini Filament'te `Select` field (multi, sortable) olarak kur.
4. **Service `number` formatı**: `(001)`, `(002)` şeklinde parantez içinde. Frontend bunu olduğu gibi gösteriyor; değiştirme.

---

# ENTEGRASYON SÖZÜ

Bu spec ve seed verisiyle Laravel backend'i yazdığında, frontend tarafında sadece şu değişiklik yapılacak:

**Dosya:** `src/sanity/lib/fetch.ts`
**Değişiklik:** `client.fetch(query)` çağrıları → `fetch('https://api.refabrika.com/api/...')`
**Süre:** ~30 dakika (12 fetch fonksiyonu, her biri tek satırlık değişiklik)

**Tip dosyası** (`src/types/sanity.ts`) zaten doğru yapıda — sadece field isimlerini camelCase → snake_case map eden bir mapper helper'ı yazılacak. Veya backend response'larında **camelCase** dönmesini de tercih edebilirsin, o zaman frontend sıfır değişiklik gerektirir (ama Laravel norm değil).

**Bu kadar. Spec + seed eksiksiz. Yazıp ver, bağlarım.**
