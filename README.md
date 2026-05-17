# 🚀 XHTTP Relay - Coolify Edition

**ریلی قدرتمند XHTTP برای Xray/V2Ray**

---

<div dir="rtl">

### 🇮🇷 فارسی

**XHTTP Relay** ابزاری سبک، سریع و پایدار است که ترافیک پروتکل **XHTTP** را از طریق دامنه Coolify (یا هر سرور Node.js) به سرور اصلی Xray شما فوروارد می‌کند.

این پروژه جایگزین عالی برای Netlify Edge Functions است و هیچ محدودیتی در ترافیک و تعداد درخواست ندارد.

</div>

---

### 🇬🇧 English

**XHTTP Relay** is a lightweight, fast, and stable tool that forwards **XHTTP** protocol traffic from your Coolify domain (or any Node.js server) to your main Xray server.

This project is a great alternative to Netlify Edge Functions with **no traffic or request limitations**.

---

## ✨ Features

- **Full XHTTP Protocol Support**
- **Smart `x-host` Header Handling**
- **High Performance & Low Latency**
- **Automatic HTTPS (via Coolify)**
- **No Credit / Usage Limits** (Unlike Netlify, Vercel, etc.)
- **Easy Deployment on Coolify**
- **Modern & Clean Codebase**

---

## 📸 Preview

![XHTTP Relay Preview](https://github.com/hooman-sadeghi/xhttp-relay/blob/main/public/index.html) <!-- بعداً می‌تونی عکس بذاری -->

---

## 🚀 Quick Start (Coolify)

1. Fork or clone this repository
2. Go to **Coolify** → **New Application**
3. Connect your GitHub repository (`xhttp-relay`)
4. Set the following:

   | Setting          | Value              |
   |------------------|--------------------|
   | Build Command    | `npm install`      |
   | Start Command    | `npm start`        |
   | Port             | `3000`             |

5. Deploy and get your domain.

---

## 📌 How to Use

1. After deployment, copy your Coolify domain.
2. Go to your config generator (e.g. `ir-netlify.github.io/NETLIFY`)
3. Enter your Coolify domain and generate the XHTTP config.
4. Use it in v2rayN, Nekobox, Hiddify, etc.

**Important Header**: `x-host` → Your main Xray server address (e.g. `yourserver.com:444`)

---

<div dir="rtl">

## 🛠️ نحوه استفاده (فارسی)

۱. بعد از دیپلوی، دامنه‌ای که Coolify به شما داد را کپی کنید.  
۲. وارد سایت کانفیگ ساز مورد نظرتان شوید.  
۳. دامنه Coolify را وارد کنید و کانفیگ XHTTP را بسازید.  
۴. در کلاینت‌های خود (v2rayN، Nekoray و ...) از کانفیگ استفاده کنید.

</div>

---

## 📁 Project Structure

```bash
.
├── server.js              # Main relay server
├── package.json
├── public/
│   └── index.html         # Beautiful landing page
├── README.md
└── .gitignore