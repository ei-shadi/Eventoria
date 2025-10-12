
<div align="center">
  <h1>
    <a href="https://eventoria-live.netlify.app/" target="_blank" rel="noopener noreferrer">
      🎉➡️ <strong>Eventoria</strong>
    </a>
  </h1>
  <p><strong>Team-based Event Management System (Eventoria) for organizing and attending events.</strong></p>
  <p>Create & manage events, book tickets online, check-in via QR codes, and track reviews & ratings with team dashboards and NextAuth authentication.</p>
</div>

---

<h2 align="center">📷 Interface Snapshots</h2>

<div align="center">
  <img src="https://i.ibb.co/yourimage/Eventoria.png" alt="Eventoria Screenshot" width="700" style="border-radius: 8px; box-shadow: 0 4px 12px rgba(0,0,0,0.1);" />
</div>

---

<h2 align="center">✨ Project Overview</h2>

**Eventoria** is a collaborative event management platform built by a 4-member team. It allows users to create events, book tickets online, manage event check-ins, view event calendars, and provide reviews & ratings. The system includes a dashboard for organizers and integrates modern web technologies for smooth UX and secure authentication.  

---

<h2 align="center">🚀 Features</h2>

* 🎫 **Event Creation & Management** — Organizers can create, update, and delete events  
* 🖥️ **Organizer Dashboard** — View bookings, check-in stats, and manage attendees  
* 🔑 **NextAuth Authentication** — Secure login/signup  
* 💳 **Online Ticket Booking** — Ticket purchase with booking confirmation  
* 📱 **QR Code Check-in** — Easy attendee verification  
* 📅 **Event Calendar View** — Browse upcoming events  
* ⭐ **Review & Rating System** — Feedback for events  
* ⚡ **Realtime Feedback & Animations** — Using Framer Motion  
* 💻 **Responsive Design** — Fully responsive UI with Tailwind CSS  

---

<h2 align="center">🤖 Tech Stack</h2>

<table align="center">
  <tr>
    <th>🛠️ Technology</th>
    <th>💡 Purpose</th>
  </tr>
  <tr>
    <td>⚛ <strong>Next.js</strong></td>
    <td>Frontend framework & SSR</td>
  </tr>
  <tr>
    <td>🎨 <strong>Tailwind CSS</strong></td>
    <td>Styling & Responsive Layout</td>
  </tr>
  <tr>
    <td>🔐 <strong>NextAuth</strong></td>
    <td>Authentication & Security</td>
  </tr>
  <tr>
    <td>🍃 <strong>MongoDB</strong></td>
    <td>Database for events & users</td>
  </tr>
  <tr>
    <td>🧭 <strong>Axios</strong></td>
    <td>API Requests</td>
  </tr>
  <tr>
    <td>🧰 <strong>TanStack Query</strong></td>
    <td>Data Fetching & Caching</td>
  </tr>
  <tr>
    <td>🎯 <strong>Framer Motion</strong></td>
    <td>Animations & Transitions</td>
  </tr>
  <tr>
    <td>🎨 <strong>React Icons</strong></td>
    <td>Icons for UI</td>
  </tr>
</table>

---

<h2 align="center">👥 Team Members</h2>

- **Eftajul Islam Shadi (Leader)**  
- **Md Khalid Hossain (Co-Leader)**  
- **Md Mahmudul Hasan Nayem**  
- **Thaqi Ul Islam Kafi**   

---

<h2 align="center">🌐 Live Site</h2>

🎯 **Visit Live:**  
👉 <a href="https://eventoria-live.netlify.app/" target="_blank" rel="noopener noreferrer">Open Eventoria Now...</a>  

---

<h2 align="center">⚙️ Installation & Setup</h2>

1. **Clone The Repository For Frontend:**
```bash
git clone https://github.com/ei-shadi/Eventoria.git
cd eventoria
npm install
```

3. **Configure environment variables:**  
Create a `.env` file inside `/server` folder with:
```
MONGODB_URI=your_mongodb_uri
NEXTAUTH_SECRET=your_nextauth_secret
```

4. **👀 Start the project:**
```bash
cd eventoria         # frontend
npm run dev

---

## 📦 API Endpoints (Express + MongoDB + NextAuth)

| Method | Endpoint | Description |
|--------|---------|-------------|
| GET    | `/events` | Get all events |
| GET    | `/events/:id` | Get single event details |
| GET    | `/users?email=` | Get user info by email |
| POST   | `/events`, `/bookings`, `/reviews` | Create event, booking, or review |
| PATCH  | `/events/:id`, `/bookings/:id` | Update event or booking |
| DELETE | `/events/:id`, `/bookings/:id` | Delete event or booking |

**🔐 Note:** Protected routes require NextAuth authentication tokens.

