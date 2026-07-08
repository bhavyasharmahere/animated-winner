# animated-winner
# 🚀 Upload Hub - 13207

> A premium, lightweight, and modern temporary workspace built for effortless file sharing between teachers and students. Features zero-bloat glassmorphism, instant mobile-responsive uploads, and automatic visibility expiration.

---

## ✨ Features At A Glance

* **⚡ Custom File Drop Zone:** Ditch standard ugly file-input buttons. Experience a drag-and-drop or single-tap upload arena designed for mobile workflows.
* **⏳ Self-Destruct Timers:** Keep storage footprint near zero. Files vanish automatically after 30 minutes, 1 hour, 4 hours, or 24 hours.
* **📱 Smart Mobile Truncation:** Long filenames will never break your CSS layout again. Implements smart ellipsis (`...`) text handling for fluid responsive grids.
* **🔒 Access Control Safeguards:** Protected workspace uploads ensure only authoritative users can push materials to the student dashboard.

---

## 🛠️ Tech Stack & Architecture

Classroom Hub is built with high-performance, minimalist modern web architecture:

| Layer | Technology | Key Advantage |
| :--- | :--- | :--- |
| **Frontend** | Vanilla HTML5 / Modern CSS3 | Ultra-low latency, zero client-side hydration, pure native fluid layout. |
| **Backend** | Cloudflare Workers / Serverless V8 | Global Edge performance, 0ms cold starts, and secure routing. |
| **Storage** | Cloudflare R2 / KV | Enterprise-grade asset storage paired with key-value TTL metadata expiration. |

---

## 📂 Repository Structure

```repo
├── index.html          # Main hub application layout (Dynamic views)
├── dev.html            # Premium developer portfolio landing page
├── avatar.png          # Developer avatar profile brand image
└── README.md           # Repository documentation
