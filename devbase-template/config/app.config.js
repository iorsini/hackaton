// config/app.config.js
// Centralize todas as configurações do app aqui

export const appConfig = {
  // Informações básicas do app
  name: "DevBase Template",
  description: "Next.js starter template with authentication",
  version: "1.0.0",
  author: "Your Name",
  
  // URLs
  url: process.env.NEXTAUTH_URL || "http://localhost:3000",
  apiUrl: process.env.NEXT_PUBLIC_API_URL || "/api",
  
  // Branding
  logo: {
    text: "DB", // Sigla que aparece
    image: null, // ou "/logo.png"
  },
  
  // Cores (sincroniza com Tailwind)
  colors: {
    primary: "#0B111c",
    secondary: "#1e2939",
    accent: "#00c951",
  },
  
  // Features habilitadas/desabilitadas
  features: {
    auth: {
      credentials: true,
      github: !!process.env.GITHUB_ID,
      google: !!process.env.GOOGLE_CLIENT_ID,
    },
    profile: {
      avatarUpload: true,
      accountDeletion: true,
    },
  },
  
  // Limites
  limits: {
    avatar: {
      maxSize: 5 * 1024 * 1024, // 5MB
      allowedTypes: ["image/jpeg", "image/png", "image/webp"],
    },
  },
  
  // Rotas
  routes: {
    home: "/",
    login: "/login",
    register: "/register",
    dashboard: "/dashboard/home",
    profile: "/dashboard/profile",
    settings: "/dashboard/settings",
  },
  
  // Mensagens padrão
  messages: {
    loginSuccess: "Welcome back!",
    registerSuccess: "Account created successfully!",
    updateSuccess: "Changes saved successfully!",
    deleteSuccess: "Account deleted successfully",
    genericError: "Something went wrong. Please try again.",
  },
};

// Helper para verificar features
export const isFeatureEnabled = (feature) => {
  const keys = feature.split('.');
  let value = appConfig.features;
  
  for (const key of keys) {
    value = value?.[key];
    if (value === undefined) return false;
  }
  
  return value;
};

// Helper para obter limites
export const getLimit = (type) => {
  return appConfig.limits[type];
};