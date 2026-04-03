/**
 * ┌──────────────────────────────────────────────────────────┐
 * │  RS Digital Solutions – Zentraler Content                │
 * │  Alle Texte, Daten und Konfigurationen an einem Ort.     │
 * │  Nichts hardcoded – alles änderbar.                      │
 * └──────────────────────────────────────────────────────────┘
 */

/* ─── Firmen-Daten ─── */
export const company = {
  name: 'RS Digital Solutions',
  nameShort: 'RS',
  nameSuffix: 'Digital Solutions',
  email: 'info@rs-digitalsolutions.de',
  phone: '+49 176 1234 5678',
  phoneTel: 'tel:+4917612345678',
  whatsapp: 'https://wa.me/4917612345678',
  location: 'Deutschland',
  copyright: `© ${new Date().getFullYear()} RS Digital Solutions. Alle Rechte vorbehalten.`,
  social: {
    instagram: '#',
    linkedin: '#',
    facebook: '#',
  },
};

/* ─── Navigation ─── */
export const navigation = [
  { label: 'Home', path: '/' },
  { label: 'Leistungen', path: '/leistungen' },
  { label: 'Referenzen', path: '/referenzen' },
  { label: 'Über uns', path: '/about' },
  { label: 'Kontakt', path: '#kontakt', isAnchor: true },
];

/* ─── SEO Meta-Daten pro Seite ─── */
export const seo = {
  siteUrl: 'https://rs-digitalsolutions.de',
  defaults: {
    title: 'RS Digital Solutions – Ihre Webagentur | Professionelles Webdesign in 48 Stunden',
    description:
      'RS Digital Solutions – Hochprofessionelle Websites, Online-Shops, KI-Chatbots & Terminbuchung. Die 48-Stunden-Präsenz: In 2 Tagen online. Jetzt Kontakt aufnehmen!',
    ogImage: '/og-image.jpg',
    locale: 'de_DE',
    type: 'website',
  },
  pages: {
    home: {
      title: 'RS Digital Solutions – Webdesign, KI-Chatbots & 48h Websites',
      description:
        'Hochprofessionelle Websites, Online-Shops & intelligente KI-Lösungen – maßgeschneidert und in nur 48 Stunden live.',
      path: '/',
    },
    leistungen: {
      title: 'Leistungen – Webdesign, E-Commerce, KI & mehr | RS Digital Solutions',
      description:
        'Von der ersten Idee bis zum fertigen Produkt – alles aus einer Hand. Webdesign, Online-Shops, KI-Chatbots, SEO & Terminbuchung.',
      path: '/leistungen',
    },
    referenzen: {
      title: 'Referenzen – Unsere Projekte | RS Digital Solutions',
      description:
        'Sehen Sie unsere erfolgreich umgesetzten Projekte: Unternehmenswebsites, Restaurants, E-Commerce – alles mit Leidenschaft gebaut.',
      path: '/referenzen',
    },
    about: {
      title: 'Über uns – Ihr Partner für digitale Exzellenz | RS Digital Solutions',
      description:
        'Mehr als nur Webdesign – wir sind Ihr Partner für digitale Exzellenz. Erfahren Sie, wer wir sind und was uns antreibt.',
      path: '/about',
    },
    ki: {
      title: 'KI-Chatbots & Intelligente Websites | RS Digital Solutions',
      description:
        'Ihre Website spricht mit Ihren Kunden – KI-Chatbots für automatische Beratung, Terminvereinbarung & personalisierte Empfehlungen.',
      path: '/ki',
    },
    fortyEightHours: {
      title: 'In 48 Stunden online – Website-Relaunch | RS Digital Solutions',
      description:
        'Vom Briefing zur fertigen Website in nur zwei Tagen. Unser 48-Stunden-Versprechen für Ihren digitalen Erfolg.',
      path: '/48h',
    },
  },
};

/* ─── Home Page ─── */
export const homePage = {
  hero: {
    titleLine1: 'Wir erschaffen',
    titleGradient: 'digitale Meisterwerke',
    titleLine3: 'für Ihr Unternehmen.',
    subtitle:
      'Hochprofessionelle Websites, Online-Shops & intelligente KI-Lösungen – maßgeschneidert und in nur 48 Stunden live.',
    primaryButton: 'Projekt starten',
    secondaryButton: 'Unsere Leistungen',
  },
  cta: {
    heading: 'Bereit, Ihre digitale Präsenz auf das nächste Level zu bringen?',
    subtitle:
      'Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie wir Ihr Unternehmen online nach vorne bringen können.',
    primaryButton: 'Beratungsgespräch',
    secondaryButton: 'Jetzt anrufen',
  },
  contact: {
    tag: 'Kontakt',
    title: 'Lassen Sie uns sprechen',
    intro:
      'Haben Sie ein Projekt im Kopf? Erzählen Sie uns davon. Wir freuen uns auf Ihre Nachricht und melden uns innerhalb von 24 Stunden bei Ihnen.',
    labels: {
      email: 'E-Mail',
      phone: 'Telefon',
      location: 'Standort',
    },
    form: {
      name: { label: 'Name *', placeholder: 'Ihr vollständiger Name' },
      email: { label: 'E-Mail *', placeholder: 'ihre@email.de' },
      phone: { label: 'Telefon', placeholder: '+49 ...' },
      service: {
        label: 'Gewünschte Leistung',
        placeholder: 'Bitte wählen...',
        options: [
          'Professionelles Webdesign',
          'E-Commerce / Online-Shop',
          '48h Website-Relaunch',
          'KI-Chatbot Integration',
          'SEO & Online-Marketing',
          'Terminbuchungssoftware',
          'Sonstiges',
        ],
      },
      message: { label: 'Ihre Nachricht *', placeholder: 'Erzählen Sie uns von Ihrem Projekt...' },
      submit: { default: 'Senden', loading: 'Sendet...', success: 'Gesendet!' },
    },
  },
};

/* ─── Leistungen Page ─── */
export const leistungenPage = {
  hero: {
    tag: 'Leistungen',
    title: 'Was wir für Sie <span class="highlight">leisten</span>',
    subtitle: 'Von der ersten Idee bis zum fertigen Produkt – alles aus einer Hand.',
  },
  section: {
    tag: 'Alles inklusive',
    title: 'Wir bieten alles, was Ihr <span class="highlight">Unternehmen</span> braucht',
    description:
      'Von der ersten Idee bis zum fertigen Produkt – wir bieten alles, was Ihr Unternehmen für eine beeindruckende Internetpräsenz braucht.',
    button: 'Projekt starten',
  },
  services: [
    {
      label: 'Profes\u00ADsionelles Webdesign',
      image: 'https://images.unsplash.com/photo-1547658719-da2b51169166?q=80&w=800&auto=format&fit=crop',
      icon: 'fas fa-laptop-code',
    },
    {
      label: 'E-Commerce & Shops',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?q=80&w=800&auto=format&fit=crop',
      icon: 'fas fa-store',
    },
    {
      label: '48h Website-Relaunch',
      image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=800&auto=format&fit=crop',
      icon: 'fas fa-bolt',
    },
    {
      label: 'KI-Chatbot Integration',
      image: 'https://images.unsplash.com/photo-1677442136019-21780ecad995?q=80&w=800&auto=format&fit=crop',
      icon: 'fas fa-robot',
    },
    {
      label: 'SEO & Online-Marketing',
      image: 'https://images.unsplash.com/photo-1432888498266-38ffec3eaf0a?q=80&w=800&auto=format&fit=crop',
      icon: 'fas fa-search',
    },
    {
      label: 'Termin\u00ADbuchungs\u00ADsoftware',
      image: 'https://images.unsplash.com/photo-1506784983877-45594efa4cbe?q=80&w=800&auto=format&fit=crop',
      icon: 'fas fa-calendar-check',
    },
  ],
};

/* ─── Referenzen Page ─── */
export const referenzenPage = {
  hero: {
    tag: 'Referenzen',
    title: 'Beispiele unserer <span class="highlight">Arbeit</span>',
    subtitle: 'Was wir gestalten, soll nicht nur gut aussehen – es soll wirken.',
  },
  projectsSection: {
    tag: 'Live Projekte',
    title: 'Unsere Projekte <span class="highlight">im Überblick</span>',
  },
  testimonialsSection: {
    tag: 'Kundenstimmen',
    title: 'Was unsere <span class="highlight">Kunden</span> sagen',
  },
  projects: [
    {
      title: 'Akkilinc Buchhaltung',
      desc: 'Unternehmenswebsite · 6 Sprachen',
      image: '/screenshots/akkilinc.webp',
      url: 'https://akkilinc-fq2f.vercel.app',
    },
    {
      title: 'Antephaus Stuttgart',
      desc: 'Restaurant · Online-Bestellung',
      image: '/screenshots/antephaus.png',
      url: 'http://76.13.0.11',
    },
    {
      title: 'Bera Gold & Diamond',
      desc: 'Juwelier · E-Commerce',
      image: '/screenshots/bera-gold.webp',
      url: 'https://bera-gold-diamond.vercel.app',
    },
  ],
  testimonials: [
    {
      stars: 5,
      text: '„Unsere neue Website ist genau so geworden, wie wir es uns vorgestellt haben – modern, mehrsprachig und perfekt auf unsere Mandanten zugeschnitten. Die Zusammenarbeit war hervorragend!"',
      avatar: 'AA',
      name: 'Akkilinc Buchhaltungsservice',
      role: 'Buchhaltung, Stuttgart',
    },
    {
      stars: 5,
      text: '„Die Website mit Online-Bestellsystem hat unseren Betrieb auf ein neues Level gebracht. Unsere Kunden können jetzt bequem online bestellen und abholen. Absolute Empfehlung!"',
      avatar: 'AH',
      name: 'Antephaus',
      role: 'Restaurant, Stuttgart Nord',
    },
    {
      stars: 5,
      text: '„Professionelles Webdesign, schnelle Umsetzung und ein Team, das wirklich zuhört. Unsere Produktpräsentation online ist jetzt genauso hochwertig wie unser Schmuck."',
      avatar: 'BG',
      name: 'Bera Gold & Diamond',
      role: 'Juwelier',
    },
  ],
};

/* ─── KI Page ─── */
export const kiPage = {
  hero: {
    tag: 'Intelligente Websites',
    title: 'Ihre Website <span class="highlight">spricht</span> mit Ihren Kunden',
    subtitle: 'KI-gestützte Chatbots, die Ihre Kunden beraten, Termine vereinbaren und Umsatz steigern – 24/7.',
  },
  benefits: [
    'Automatische Kundenberatung in Echtzeit',
    'Intelligente Terminvereinbarung',
    'Personalisierte Produktempfehlungen',
    'Mehrsprachiger Support',
    'Nahtlose CRM-Integration',
    'Lernfähig & kontinuierlich besser',
  ],
  chat: {
    name: 'RS Digital Assistent',
    status: 'Online',
    messages: [
      { role: 'bot', text: 'Hallo! 👋 Willkommen bei RS Digital Solutions. Wie kann ich Ihnen helfen?' },
      { role: 'user', text: 'Ich brauche eine neue Website für mein Restaurant.' },
      {
        role: 'bot',
        text: 'Perfekt! Für Restaurants empfehle ich unser 48h-Paket mit integrierter Speisekarte, Online-Reservierung und Google Maps Integration. Soll ich einen Beratungstermin vereinbaren? 📅',
      },
      { role: 'user', text: 'Ja bitte, am liebsten morgen Vormittag.' },
    ],
  },
  section: {
    tag: 'Warum KI?',
    title: 'Mehr als nur ein <span class="highlight">Chatbot</span>',
    description:
      'Unsere KI-Lösung lernt kontinuierlich dazu, kennt Ihr Unternehmen in- und auswendig und bietet Ihren Kunden ein Erlebnis, das begeistert – rund um die Uhr, in jeder Sprache.',
    button: 'KI-Demo anfragen',
  },
};

/* ─── About Page ─── */
export const aboutPage = {
  hero: {
    tag: 'Über uns',
    title: 'Uns liegt Ihr <span class="highlight">Erfolg</span> am Herzen',
    subtitle: 'Mehr als nur Webdesign – wir sind Ihr Partner für digitale Exzellenz.',
  },
  intro: {
    tag: 'Wer wir sind',
    title: 'Nicht nur eine Agentur – Ihr <span class="highlight">digitaler Partner</span>',
    paragraphs: [
      'Bei RS Digital Solutions geht es um mehr als nur Webdesign. Wir sind eine Full-Service-Digitalagentur, die Unternehmen dabei unterstützt, im digitalen Zeitalter nicht nur präsent zu sein, sondern zu dominieren.',
      'Unser Team verbindet kreatives Design mit technischer Exzellenz. Von der ersten Beratung über das Konzept bis hin zur Umsetzung und darüber hinaus – wir sind an Ihrer Seite.',
    ],
  },
  values: [
    { icon: 'fas fa-heart', title: 'Leidenschaft', desc: 'Jedes Projekt ist eine Herzensangelegenheit' },
    { icon: 'fas fa-handshake', title: 'Partnerschaft', desc: 'Ihr Erfolg ist unser Antrieb' },
    { icon: 'fas fa-gem', title: 'Qualität', desc: 'Keine Kompromisse, nur Exzellenz' },
  ],
  stats: [
    { value: 5, suffix: '+', label: 'Jahre Erfahrung' },
    { value: 150, suffix: '+', label: 'Projekte realisiert' },
    { value: 100, suffix: '%', label: 'Weiterempfehlungsrate' },
  ],
  faq: {
    tag: 'FAQ',
    title: 'Häufig gestellte <span class="highlight">Fragen</span>',
    items: [
      {
        q: 'Was kostet eine Website bei RS Digital Solutions?',
        a: 'Unsere Preise richten sich nach dem Umfang des Projekts. Eine professionelle Website beginnt ab 1.500 €. Kontaktieren Sie uns für ein individuelles Angebot.',
      },
      {
        q: 'Schafft ihr wirklich eine Website in 48 Stunden?',
        a: 'Ja! Mit unserem optimierten Workflow und einem eingespielten Team setzen wir Ihr Projekt in nur 48 Stunden um – ohne Kompromisse bei der Qualität.',
      },
      {
        q: 'Was ist ein KI-Chatbot und brauche ich das?',
        a: 'Ein KI-Chatbot ist ein intelligenter Assistent auf Ihrer Website, der Kundenanfragen beantwortet, Termine bucht und Produkte empfiehlt – 24/7, automatisch.',
      },
      {
        q: 'Bietet ihr auch Wartung und Support nach dem Launch?',
        a: 'Selbstverständlich! Nach der Liveschaltung bieten wir verschiedene Wartungspakete an, damit Ihre Website immer aktuell, sicher und performant bleibt.',
      },
      {
        q: 'Kann ich meine Website selbst bearbeiten?',
        a: 'Ja! Wir bauen Ihre Website auf einem benutzerfreundlichen CMS auf, sodass Sie Texte, Bilder und Inhalte jederzeit selbst anpassen können.',
      },
      {
        q: 'Wie läuft die Terminbuchungsintegration ab?',
        a: 'Wir integrieren ein professionelles Buchungssystem direkt in Ihre Website – mit Kalenderansicht, automatischen Bestätigungen und Google Calendar Sync.',
      },
    ],
  },
};

/* ─── 48h Page ─── */
export const fortyEightHoursPage = {
  hero: {
    tag: 'Unser Versprechen',
    title: 'Die <span class="highlight">48-Stunden</span>-Präsenz',
    subtitle: 'Vom Briefing zur fertigen Website – in nur zwei Tagen.',
  },
  usp: {
    title: 'Ihre neue Website in <span class="highlight">48 Stunden</span>',
    description:
      'Zeit ist Geld – und wir verschwenden weder das eine noch das andere. In nur <strong>zwei Tagen</strong> wird Ihre Website entweder komplett modernisiert oder von Grund auf neu erstellt. Hochprofessionell, inklusive aller Funktionen, die Ihr Unternehmen braucht.',
  },
  features: [
    {
      icon: 'fas fa-rocket',
      title: 'Blitzschnelle Umsetzung',
      desc: 'Vom Briefing bis zur Liveschaltung in nur 48 Stunden – dank optimierter Prozesse und einem eingespielten Team.',
    },
    {
      icon: 'fas fa-shopping-cart',
      title: 'Kompletter Online-Shop',
      desc: 'Voll funktionsfähiger E-Commerce mit Produktkatalog, Warenkorb und sicherer Zahlung – in Rekordzeit.',
    },
    {
      icon: 'fas fa-brain',
      title: 'Intelligente KI-Integration',
      desc: 'Chatbots, die mit Ihren Kunden sprechen, Termine buchen und Fragen beantworten – automatisch und rund um die Uhr.',
    },
    {
      icon: 'fas fa-calendar-check',
      title: 'Terminbuchungssystem',
      desc: 'Professionelle Buchungssoftware direkt in Ihre Website integriert – mit automatischen Bestätigungen.',
    },
  ],
  steps: [
    { number: '01', title: 'Briefing & Analyse', desc: 'Wir hören zu, analysieren Ihre Branche und definieren Ziele für Ihren digitalen Auftritt.' },
    { number: '02', title: 'Konzept & Design', desc: 'Unser Designteam erstellt ein maßgeschneidertes Konzept, das Ihre Marke perfekt repräsentiert.' },
    { number: '03', title: 'Entwicklung & Integration', desc: 'Technische Umsetzung mit modernsten Technologien – responsive, schnell und SEO-optimiert.' },
    { number: '04', title: 'Go Live & Support', desc: 'Nach finalem Testing geht Ihre Website live. Wir bleiben an Ihrer Seite für Updates und Support.' },
  ],
  timer: {
    digits: ['4', '8'],
    label: 'STUNDEN',
    subtitle: 'Vom Konzept zur fertigen Website',
    milestones: ['Briefing & Konzept', 'Design & Entwicklung', 'Testing & Optimierung', 'Go Live!'],
  },
  processSection: {
    tag: 'Unser Prozess',
    title: 'In <span class="highlight">4 Schritten</span> zu Ihrer Traumwebsite',
  },
  customCta: 'Jetzt in 48h online gehen',
  customCtaTitle: 'Bereit für Ihre neue Website<br><span class="highlight">in nur 48 Stunden</span>?',
};

/* ─── CTA Section (Defaults) ─── */
export const ctaDefaults = {
  title: 'Bereit, Ihre digitale Präsenz<br><span class="highlight">auf das nächste Level</span> zu bringen?',
  subtitle:
    'Lassen Sie uns in einem unverbindlichen Gespräch herausfinden, wie wir Ihr Unternehmen online nach vorne bringen können.',
  primaryButton: 'Beratungsgespräch',
  secondaryButton: 'Jetzt anrufen',
};

/* ─── Trusted-By / Logo Marquee ─── */
export const trustedBy = {
  label: 'Vertrauen schenken uns unter anderem',
  clients: [
    'Akkilinc Buchhaltung',
    'Antephaus Stuttgart',
    'Bera Gold & Diamond',
    'RS Digital Solutions',
  ],
};

/* ─── Footer ─── */
export const footer = {
  description:
    'Hochprofessionelle Websites, Online-Shops & intelligente KI-Lösungen – maßgeschneidert und in nur 48 Stunden live.',
  columns: [],
  contactHeading: 'Kontakt',
  legalLinks: [
    { label: 'Datenschutz', href: '/datenschutz' },
    { label: 'Impressum', href: '/impressum' },
    { label: 'AGB', href: '/agb' },
  ],
};

/* ─── UI Strings ─── */
export const ui = {
  themeToggle: {
    light: 'Light Mode',
    dark: 'Dark Mode',
    ariaLight: 'Light Mode aktivieren',
    ariaDark: 'Dark Mode aktivieren',
  },
  theme: {
    darkColor: '#ffffff',
    lightColor: '#1a1a2e',
  },
  errorBoundary: { heading: 'Etwas ist schiefgelaufen.', message: 'Bitte laden Sie die Seite neu.' },
  scanner: { loading: 'Screenshot wird geladen…', viewProject: 'Ansehen' },
  backToTop: { ariaLabel: 'Nach oben scrollen' },
  whatsapp: { ariaLabel: 'WhatsApp Chat' },
};
