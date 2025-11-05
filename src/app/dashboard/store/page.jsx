"use client";
import { GiTomato } from "react-icons/gi";

import { useState } from "react";
import {
  ArrowLeft,
  Grid,
  List,
  Zap,
  Star,
  Lock,
  CheckCircle2,
  TrendingUp,
  Clock,
  Trophy,
  User,
  Sparkles,
  Palette,
  Volume2,
  Crown,
} from "lucide-react";


export default function StorePage() {
  const [pomodots, setPomodots] = useState(150);
  const [view, setView] = useState("grid");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [purchasedItems, setPurchasedItems] = useState([]);

  const categories = [
    { id: "all", label: "Todos", icon: Sparkles },
    { id: "themes", label: "Temas", icon: Palette },
    { id: "sounds", label: "Sons", icon: Volume2 },
    { id: "avatars", label: "Avatares", icon: User },
    { id: "premium", label: "Premium", icon: Crown },
  ];

  const storeItems = [
    {
      id: 1,
      name: "Tema Oceano Profundo",
      description:
        "Interface azul serena inspirada no oceano, perfeita para concentração profunda.",
      price: 40,
      category: "themes",
      image:
        "https://images.unsplash.com/photo-1559827260-dc66d52bef19?w=800&h=600&fit=crop",
      color: "from-blue-400 to-cyan-400",
      popular: false,
    },
    {
      id: 2,
      name: "Sons de Chuva",
      description:
        "Ambiente relaxante com sons de chuva e trovões suaves para melhorar o foco.",
      price: 55,
      category: "sounds",
      image:
        "https://images.unsplash.com/photo-1515694346937-94d85e41e6f0?w=800&h=600&fit=crop",
      color: "from-indigo-400 to-purple-400",
      popular: true,
    },
    {
      id: 3,
      name: "Avatar Premium - Astronauta",
      description:
        "Desbloqueia o avatar exclusivo de astronauta com animações especiais.",
      price: 80,
      category: "avatars",
      image:
        "https://images.unsplash.com/photo-1614732414444-096e5f1122d5?w=800&h=600&fit=crop",
      color: "from-purple-400 to-pink-400",
      popular: true,
    },
    {
      id: 4,
      name: "Tema Floresta Mística",
      description:
        "Tons de verde e marrom que trazem a natureza para sua rotina de estudos.",
      price: 45,
      category: "themes",
      image:
        "https://images.unsplash.com/photo-1511497584788-876760111969?w=800&h=600&fit=crop",
      color: "from-green-400 to-emerald-400",
      popular: false,
    },
    {
      id: 5,
      name: "Relógio Analógico Premium",
      description:
        "Visual de tempo clássico e minimalista com ponteiros elegantes.",
      price: 100,
      category: "premium",
      image:
        "https://images.unsplash.com/photo-1509048191080-d2984bad6ae5?w=800&h=600&fit=crop",
      color: "from-amber-400 to-orange-400",
      popular: false,
    },
    {
      id: 6,
      name: "Sons de Café Shop",
      description:
        "Ambiente acolhedor de cafeteria com conversas leves e músicas suaves.",
      price: 60,
      category: "sounds",
      image:
        "https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800&h=600&fit=crop",
      color: "from-orange-400 to-red-400",
      popular: false,
    },
    {
      id: 7,
      name: "Tema Noite Estrelada",
      description:
        "Modo escuro elegante com tons de roxo e azul escuro, ideal para sessões noturnas.",
      price: 45,
      category: "themes",
      image:
        "https://images.unsplash.com/photo-1419242902214-272b3f66ee7a?w=800&h=600&fit=crop",
      color: "from-indigo-500 to-purple-500",
      popular: true,
    },
    {
      id: 8,
      name: "Avatar Premium - Ninja",
      description:
        "Avatar exclusivo de ninja com máscaras intercambiáveis e efeitos especiais.",
      price: 85,
      category: "avatars",
      image:
        "https://images.unsplash.com/photo-1555952517-2e8e729e0b44?w=800&h=600&fit=crop",
      color: "from-red-400 to-pink-400",
      popular: false,
    },
    {
      id: 9,
      name: "Pack Premium Completo",
      description:
        "Todos os temas, sons e avatares desbloqueados permanentemente.",
      price: 300,
      category: "premium",
      image:
        "https://images.unsplash.com/photo-1579546929518-9e396f3cc809?w=800&h=600&fit=crop",
      color: "from-yellow-400 to-amber-400",
      popular: true,
    },
  ];

  const filteredItems =
    selectedCategory === "all"
      ? storeItems
      : storeItems.filter((item) => item.category === selectedCategory);

  const handleBuy = (item) => {
    if (purchasedItems.includes(item.id)) {
      return;
    }

    if (pomodots >= item.price) {
      setPomodots(pomodots - item.price);
      setPurchasedItems([...purchasedItems, item.id]);
    }
  };

  const isPurchased = (itemId) => purchasedItems.includes(itemId);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 via-blue-50 to-green-50 pb-24">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-md border-b border-neutral-200 sticky top-0 z-10">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex items-center justify-between">
          <button
            className="p-2 hover:bg-neutral-100 rounded-full transition-colors"
            onClick={() => window.history.back()}
          >
            {" "}
            <ArrowLeft className="w-5 h-5 text-neutral-700" />
          </button>
          <h1 className="text-lg font-semibold text-neutral-800">
            Loja Pomofy
          </h1>
          <div className="flex items-center gap-2">
            <div className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-purple-100 to-blue-100 px-3 py-1.5 rounded-full border border-purple-200">
              <GiTomato className="w-4 h-4 text-purple-600" />
              <span className="text-sm font-bold text-purple-800">{pomodots} Pomodots</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-6 space-y-6">
        {/* Stats Card */}
        <div className="bg-gradient-to-br from-purple-500 via-indigo-500 to-blue-500 rounded-3xl p-6 shadow-xl text-white">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-gradient-to-br from-blue-400 to-purple-400 rounded-2xl flex items-center justify-center border-2 border-white/30">
                <Sparkles className="w-8 h-8 text-white" />
              </div>
              <div>
                <h2 className="text-xl font-bold mb-1">Seus Pontos</h2>
                <p className="text-sm text-white/80">
                  Troque Pomodots por recompensas exclusivas
                </p>
              </div>
            </div>
            <div className="flex items-center gap-2 bg-white/20 backdrop-blur-sm px-4 py-2 rounded-full">
              <GiTomato className="w-5 h-5 text-yellow-300" />
              <span className="text-2xl font-bold">{pomodots}</span>
              <span className="text-sm text-white/80">Pomodots</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 mt-6">
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-white/70 mb-1">Itens Comprados</p>
              <p className="text-2xl font-bold">{purchasedItems.length}</p>
            </div>
            <div className="bg-white/10 backdrop-blur-sm rounded-xl p-3 border border-white/20">
              <p className="text-xs text-white/70 mb-1">Disponíveis</p>
              <p className="text-2xl font-bold">
                {storeItems.length - purchasedItems.length}
              </p>
            </div>
          </div>
        </div>

        {/* View Controls */}
        <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between">
          <div className="flex gap-2 flex-wrap">
            {categories.map((cat) => {
              const Icon = cat.icon;
              return (
                <button
                  key={cat.id}
                  onClick={() => setSelectedCategory(cat.id)}
                  className={`flex items-center gap-2 px-3 py-2 rounded-xl font-medium transition-all duration-200 text-sm ${
                    selectedCategory === cat.id
                      ? "bg-gradient-to-r from-purple-400 to-indigo-400 text-white shadow-md"
                      : "bg-white/80 text-neutral-600 hover:bg-white border border-neutral-200"
                  }`}
                >
                  <Icon className="w-4 h-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>

          <div className="flex gap-2 bg-white/80 backdrop-blur-sm rounded-xl p-1 border border-neutral-200">
            <button
              onClick={() => setView("grid")}
              className={`p-2 rounded-lg transition-colors ${
                view === "grid"
                  ? "bg-neutral-100 text-neutral-800"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <Grid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setView("list")}
              className={`p-2 rounded-lg transition-colors ${
                view === "list"
                  ? "bg-neutral-100 text-neutral-800"
                  : "text-neutral-500 hover:text-neutral-700"
              }`}
            >
              <List className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Items Grid/List */}
        <div
          className={`transition-all ${
            view === "grid"
              ? "grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
              : "flex flex-col gap-3"
          }`}
        >
          {filteredItems.map((item) => {
            const purchased = isPurchased(item.id);
            const canAfford = pomodots >= item.price;

            return (
              <div
                key={item.id}
                className={`bg-white/80 backdrop-blur-sm rounded-2xl overflow-hidden shadow-sm border transition-all duration-200 ${
                  purchased
                    ? "border-green-200"
                    : "border-neutral-200 hover:shadow-md"
                } ${view === "list" ? "flex flex-row" : "flex flex-col"}`}
              >
                {/* Image */}
                <div
                  className={`relative ${
                    view === "list" ? "w-32 sm:w-40 h-full" : "h-48 w-full"
                  } flex-shrink-0 overflow-hidden`}
                >
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-full h-full object-cover"
                  />
                  <div
                    className={`absolute inset-0 bg-gradient-to-br ${item.color} opacity-30`}
                  />

                  {item.popular && (
                    <div className="absolute top-2 right-2 bg-orange-500 text-white text-xs font-bold px-2 py-1 rounded-full flex items-center gap-1">
                      <Star className="w-3 h-3 fill-white" />
                      Popular
                    </div>
                  )}

                  {purchased && (
                    <div className="absolute inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center">
                      <div className="bg-green-500 text-white p-3 rounded-full">
                        <CheckCircle2 className="w-6 h-6" />
                      </div>
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="flex flex-col justify-between p-4 flex-1">
                  <div>
                    <h3
                      className={`font-semibold text-neutral-800 mb-1 ${
                        view === "list" ? "text-base" : "text-lg"
                      }`}
                    >
                      {item.name}
                    </h3>
                    <p
                      className={`text-sm text-neutral-600 leading-snug ${
                        view === "list" ? "line-clamp-2" : "line-clamp-3"
                      }`}
                    >
                      {item.description}
                    </p>
                  </div>

                  <div className="flex items-center justify-between mt-4 gap-2">
                    <div className="flex items-center gap-1">
                      <GiTomato
                        className={`w-4 h-4 ${
                          canAfford ? "text-purple-600" : "text-neutral-400"
                        }`}
                      />
                      <span
                        className={`text-sm font-bold ${
                          canAfford ? "text-neutral-800" : "text-neutral-400"
                        }`}
                      >
                        {item.price} Pomodots
                      </span>
                    </div>

                    <button
                      onClick={() => handleBuy(item)}
                      disabled={purchased || !canAfford}
                      className={`px-4 py-2 rounded-xl font-medium text-sm transition-all duration-200 flex items-center gap-2 ${
                        purchased
                          ? "bg-green-100 text-green-700 cursor-default"
                          : canAfford
                          ? "bg-gradient-to-r from-purple-400 to-indigo-400 text-white hover:shadow-md"
                          : "bg-neutral-200 text-neutral-400 cursor-not-allowed"
                      }`}
                    >
                      {purchased ? (
                        <>
                          <CheckCircle2 className="w-4 h-4" />
                          Adquirido
                        </>
                      ) : canAfford ? (
                        "Comprar"
                      ) : (
                        <>
                          <Lock className="w-4 h-4" />
                          Pomodots Insuficiente
                        </>
                      )}
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredItems.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 text-center">
            <div className="w-20 h-20 bg-neutral-100 rounded-full flex items-center justify-center mb-4">
              <Sparkles className="w-10 h-10 text-neutral-400" />
            </div>
            <h3 className="text-lg font-semibold text-neutral-800 mb-2">
              Nenhum item encontrado
            </h3>
            <p className="text-sm text-neutral-600">
              Tente selecionar outra categoria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
