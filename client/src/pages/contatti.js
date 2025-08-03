// ...import rimane invariato
import React, { useState } from 'react';
import { Menu, X, Instagram, ExternalLink } from 'lucide-react';
import Header from './header';
import img11 from './img/1.JPG';
import img22 from './img/vetrina.png';
import img33 from './img/social.png';

export default function ContactPage() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleSocialClick = (platform) => {
    if (platform === 'Instagram') {
      alert('Redirect a Instagram: @hellishstorm');
    } else if (platform === 'Vinted') {
      alert('Redirect a Vinted: HellishStorm Store');
    }
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />

      {/* Main Content */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-16">
        {/* Page Title */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-light text-black tracking-wider mb-4">
            COLLABORAZIONI
          </h1>
          <div className="w-24 h-px bg-black mx-auto"></div>
        </div>

        {/* Section 1 */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={img11}
                  alt="Brand Collaboration"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-full h-full flex items-center justify-center bg-gray-100"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-400 mb-2 tracking-wider">BRAND</div>
                    <div className="text-sm text-gray-500 tracking-wider">COLLABORATION</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2">
              <div className="max-w-lg">
                <h2 className="text-2xl font-light text-black tracking-wide mb-6">
                  Collaborazioni con Brand
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Siamo sempre aperti a nuove collaborazioni con brand che condividono
                  la nostra visione di streetwear contemporaneo. Se rappresenti un brand
                  e sei interessato a creare qualcosa di unico insieme a noi,
                  non esitare a contattarci.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Crediamo che le migliori creazioni nascano dall'unione di diverse
                  prospettive creative. La tua proposta potrebbe essere l'inizio
                  di una partnership straordinaria.
                </p>
                <button
                  onClick={() =>
                    window.open(
                      'https://wa.me/3791109939?text=Ciao%2C%20vorrei%20collaborare%20con%20HellishStorm',
                      '_blank'
                    )
                  }
                  className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-900 transition-colors"
                >
                  CONTATTACI
                </button>
              </div>
            </div>
          </div>
        </section>

        {/* Section 2 */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-2 lg:order-1">
              <div className="max-w-lg lg:ml-auto">
                <h2 className="text-2xl font-light text-black tracking-wide mb-6">
                  Partnership con Negozi
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Stai gestendo un negozio di streetwear o moda? Siamo interessati
                  a creare partnership con store selezionati che apprezzano
                  l'unicità e la qualità dei nostri capi.
                </p>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Offriamo condizioni vantaggiose per rivenditori che vogliono
                  portare HellishStorm nel loro punto vendita. Insieme possiamo
                  raggiungere nuovi clienti e far crescere entrambi i nostri brand.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Ogni partnership è studiata su misura per massimizzare
                  i risultati di entrambe le parti.
                </p>
                <button
                  onClick={() =>
                    window.open(
                      'https://wa.me/3791109939?text=Ciao%2C%20sono%20interessato%20a%20diventare%20partner%20di%20HellishStorm',
                      '_blank'
                    )
                  }
                  className="bg-black text-white px-8 py-3 text-sm tracking-wider hover:bg-gray-900 transition-colors"
                >
                  DIVENTA PARTNER
                </button>
              </div>
            </div>
            <div className="order-1 lg:order-2">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={img22}
                  alt="Store Partnership"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-full h-full flex items-center justify-center bg-gray-100"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-400 mb-2 tracking-wider">STORE</div>
                    <div className="text-sm text-gray-500 tracking-wider">PARTNERSHIP</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Section 3 (Social) */}
        {/* Section 3 */}
        <section className="mb-20">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="order-1">
              <div className="aspect-[4/3] bg-gradient-to-br from-gray-100 to-gray-200 overflow-hidden">
                <img
                  src={img33}
                  alt="Community Support"
                  className="w-full h-full object-cover"
                  onError={(e) => {
                    e.target.style.display = 'none';
                    e.target.nextSibling.style.display = 'flex';
                  }}
                />
                <div
                  className="w-full h-full flex items-center justify-center bg-gray-100"
                  style={{ display: 'none' }}
                >
                  <div className="text-center">
                    <div className="text-2xl font-light text-gray-400 mb-2 tracking-wider">COMMUNITY</div>
                    <div className="text-sm text-gray-500 tracking-wider">SUPPORT</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="order-2">
              <div className="max-w-lg">
                <h2 className="text-2xl font-light text-black tracking-wide mb-6">
                  Unisciti alla Community
                </h2>
                <p className="text-gray-600 leading-relaxed mb-6">
                  Credi nel nostro progetto e vuoi aiutare HellishStorm a crescere?
                  La nostra community è il cuore pulsante del brand. Ogni supporto,
                  condivisione e feedback ci aiuta a migliorare e raggiungere
                  nuovi traguardi.
                </p>
                <p className="text-gray-600 leading-relaxed mb-8">
                  Seguici sui nostri canali social per rimanere aggiornato
                  sulle novità, partecipare agli eventi esclusivi e far parte
                  di una community che condivide la passione per lo streetwear autentico.
                </p>

                {/* Social Links */}
                <div className="space-y-4">
                  <h3 className="text-lg font-light text-black mb-4">
                    Seguici sui Social
                  </h3>
                  <div className="flex space-x-4">
                    <button
                      onClick={() => handleSocialClick('Instagram')}
                      className="flex items-center space-x-3 bg-gray-50 px-6 py-3 hover:bg-gray-100 transition-colors group"
                    >
                      <Instagram className="h-5 w-5 text-gray-600 group-hover:text-black" />
                      <span className="text-sm text-gray-700 group-hover:text-black">@hellishstorm</span>
                    </button>
                    <button
                      onClick={() => handleSocialClick('Vinted')}
                      className="flex items-center space-x-3 bg-gray-50 px-6 py-3 hover:bg-gray-100 transition-colors group"
                    >
                      <ExternalLink className="h-5 w-5 text-gray-600 group-hover:text-black" />
                      <span className="text-sm text-gray-700 group-hover:text-black">Vinted Store</span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 mt-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
          <div className="text-center">
            <div className="text-xs text-gray-500">© 2025 HELLISHSTORM. All rights reserved.</div>
          </div>
        </div>
      </footer>
    </div>
  );
}
