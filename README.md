# Inside My Closet

The In My Closet Project is an innovative application designed to promote sustainable fashion choices by helping users manage their wardrobe efficiently. The application allows users to track their clothing items, make informed decisions about their purchases, and reduce waste by promoting a circular economy. By leveraging modern technologies, we aim to create a user-friendly platform that encourages sustainable practices in fashion.

# Table of Contents:

- [Getting Started](#getting-started)
- [Pages Overview](#pages-overview)
- [Key Components](#key-components)



## Features

- 📱 **Progressive Web App (PWA)** - Install on any device
- 🎨 **Clean, modern UI** with Inter font
- 🔄 **Automatic updates**
- 📦 **Offline capability**
- 🌐 **Cross-platform compatibility**



## **Features - In App**
- **Wardrobe Management**: Add, edit, and remove clothing items in a virtual closet.  
- **Outfit Creation**: Build, save, and view custom outfits from cataloged wardrobe items.  
- **Sustainability Insights**: Access guides and tips on eco-friendly fashion, along with AI-powered Q&A support.



## Tech Stack

- React 18
- TypeScript
- Vite
- Native Base
- React Router DOM
- PWA (Vite PWA Plugin)

---

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- npm or yarn

### Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/fac30/inside-my-closet.git
   cd inside-my-closet
   ```

2. Install dependencies:

   ```bash
   npm install
   # or
   yarn
   ```

3. Start the development server:

   ```bash
   npm run dev
   # or
   yarn dev
   ```

### Building for Production

```bash
npm run build
# or
yarn build
### Contributing:
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'feat: Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request
### License:
This project is licensed under the Unlicense - see the LICENSE file for details.

---



### Acknowledgments:
- **Font**: Inter by Google Fonts
- **Icons**: Heroicons
```



## **Pages Overview**

### **Homepage (`Home.tsx`)**
- Displays the *In My Closet* logo as a splash screen.  
- Features an instructional guide introducing the navigation bar icons.

### **Closet Page**
- Users interact with a virtual closet divided into categories (e.g., tops, bottoms, coats).  
- **User Journey**:  
  1. Click a category (e.g., tops).  
  2. View cataloged items or add new ones using the **+ button**.  
  3. Add items via camera upload with automatic background removal.  

### **Outfit Maker Page**
- **Features**:  
  - Create outfits by selecting items from wardrobe categories.  
  - Customize a canvas for outfit creation.  
  - Delete unwanted items before saving outfits.  
  - Saved outfits are accessible in a dedicated section with detailed previews.

### **Sustainability Page**
- Dynamic articles provide guidance on sustainable fashion practices.  
- Categories (e.g., "Clothes Swaps") lead to detailed pages with tips and insights.  
- Includes an AI feature to answer user questions about sustainability.

---

## **Key Components**

### **Navigation Bar**
- Mobile-first design, located and fixed at the bottom of the screen.  
- Features three icons:  
  - Closet (renders ClosetPage component).  
  - Outfit (renders OutfitMaker component).  
  - Leaf (Eco Advice - renders Sustainability component).  
- Renders components conditionally without navigating between pages.

### **Buttons**
- Styled using Native Base for consistent design and dynamic updates via `native-base-config.ts`.

---

## **Considerations**

### **Accessibility**
- Native Base ensures accessibility compliance for components.  
- Color schemes are verified through [colorshark.io](https://colorshark.io).  


### **Styling**
- **Library**: Native Base (ensures consistency and mobile-first design).  
- **Colors**: Derived from the app's logo, checked for readability and accessibility.  

---

## **Conclusion**
Thank you for exploring the *In My Closet* project!  

We aim to provide a visually engaging and user-friendly platform for eco-conscious fashionistas 💅. Together, let's reduce reliance on fast fashion by reusing what we own and exploring sustainable options.  

Feel free to contribute, raise issues, or suggest improvements. Let's evolve this project together! 🚀  

If you enjoyed this project, don't forget to ⭐️ star the repository on GitHub!