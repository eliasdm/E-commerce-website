Modules
   tanstack/react-query
   axios
   dayjs
   react-toastify
   recharts
   styled-components
   react-router-dom



   vs-Code extensions
      auto-import
      styled-components


folder struncture 
***************************************
/src
├── /domains
│   ├── /products
│   │   ├── ProductList.js
│   │   ├── ProductDetail.js
│   │   ├── productSlice.js
│   │   ├── productApi.js
│   │   └── productStyles.js
│   ├── /cart
│   │   ├── Cart.js
│   │   ├── cartSlice.js
│   │   ├── cartApi.js
│   │   └── cartStyles.js
│   ├── /checkout
│   │   ├── Checkout.js
│   │   ├── checkoutSlice.js
│   │   ├── checkoutApi.js
│   │   └── checkoutStyles.js
│   └── /user
│       ├── UserProfile.js
│       ├── userSlice.js
│       ├── userApi.js
│       └── userStyles.js
├── /components
│   ├── Button.js
│   ├── Header.js
│   ├── Footer.js
│   ├── Modal.js
│   └── Loader.js
├── /assets
│   ├── /images
│   │   ├── logo.png
│   │   ├── product-placeholder.png
│   │   └── ...
│   ├── /fonts
│   │   ├── OpenSans-Regular.ttf
│   │   └── ...
│   └── /icons
│       ├── cart-icon.svg
│       └── ...
├── /styles
│   ├── theme.js
│   ├── global.css
│   └── variables.css
├── /hooks
│   ├── useFetch.js
│   └── useAuth.js
├── /context
│   ├── AuthContext.js
│   └── ThemeContext.js
├── /utils
│   ├── api.js
│   └── helpers.js
├── /routes
│   ├── AppRoutes.js
│   └── PrivateRoute.js
├── App.js                       # Main application component
├── main.js                      # Entry point for the application
└── index.js                     # Main entry point for the application
