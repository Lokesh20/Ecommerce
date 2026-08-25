playwright-ecommerce-framework/
│
├── tests/
│   ├── auth/
│   │   ├── login.spec.js
│   │   ├── logout.spec.js
│   │
│   ├── registration/
│   │   ├── registration.spec.js
│   │
│   ├── products/
│   │   ├── searchProduct.spec.js
│   │   ├── filterProduct.spec.js
│   │
│   ├── cart/
│   │   ├── addToCart.spec.js
│   │   ├── removeFromCart.spec.js
│   │
│   ├── checkout/
│   │   ├── checkout.spec.js
│   │
│   ├── orders/
│   │   ├── orderHistory.spec.js
│   │
│   ├── api/
│   │   ├── loginAPI.spec.js
│   │   ├── productAPI.spec.js
│   │
│   ├── mocks/
│   │   ├── mockProducts.spec.js
│   │
│   ├── visual/
│   │   ├── visual.spec.js
│   │
│   ├── accessibility/
│   │   ├── accessibility.spec.js
│   │
│   └── e2e/
│       ├── purchaseFlow.spec.js
│       ├── orderDeleteFlow.spec.js
│
├── pages/
│   ├── LoginPage.js
│   ├── RegisterPage.js
│   ├── DashboardPage.js
│   ├── ProductPage.js
│   ├── CartPage.js
│   ├── CheckoutPage.js
│   ├── OrdersPage.js
│
├── fixtures/
│   ├── baseTest.js
│
├── utils/
│   ├── APIUtils.js
│   ├── DataGenerator.js
│   ├── Helper.js
│   ├── Logger.js
│
├── testData/
│   ├── users.json
│   ├── products.json
│   ├── checkoutData.json
│
├── constants/
│   ├── routes.js
│   ├── messages.js
│
├── mocks/
│   ├── products.json
│   ├── emptyProducts.json
│
├── storageState/
│   ├── user.json
│   ├── admin.json
│
├── screenshots/
│
├── downloads/
│
├── reports/
│   ├── allure-results/
│   ├── html-report/
│
├── playwright.config.js
│
├── globalSetup.js
│
├── package.json
│
└── README.md
