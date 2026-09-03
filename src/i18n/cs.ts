// Slovník UI textů. Až přibude angličtina, založí se `src/i18n/en.ts` se
// stejným tvarem a `src/i18n/index.ts` bude podle `lang` vracet správný.

export const ui = {
  siteName: 'Nauč se vydělávat online',
  tagline: 'Money Talks. Bullshit Walks.',

  nav: {
    categories: 'Kategorie',
    academy: 'Academy',
    scamAlert: '🚨 Scam Alert',
    about: 'O projektu',
    cta: 'Jak chceš vydělávat?',
    shareStory: '💡 Pošli svůj příběh',
  },

  hero: {
    title: 'Zjisti, jak REÁLNĚ vydělávat online.',
    subtitle:
      'Žádné sliby rychlého zbohatnutí. Konkrétní možnosti, reálná čísla, srozumitelné návody – i pro úplného začátečníka.',
    ctaPrimary: 'Jak chceš vydělávat?',
    ctaSecondary: '📱 Mám jen mobil',
    trust: [
      'Žádné „zbohatni přes noc“',
      'Realistický potenciál příjmu u každé možnosti',
      'Návod krok za krokem, ne jen teorie',
    ],
  },

  filter: {
    title: 'Najdi si cestu',
    subtitle: 'Vyber si podle rozpočtu, obtížnosti a toho, co máš k dispozici.',
    mobileOnlyLabel: 'Jen s mobilem',
    allCategories: 'Všechny kategorie',
    allDifficulty: 'Jakákoliv obtížnost',
    allCost: 'Jakákoliv cena startu',
    resultsEmpty: 'Podle zadaných filtrů jsme nic nenašli. Zkus filtr uvolnit.',
  },

  mobileOnly: {
    title: '📱 Mám jen mobil',
    subtitle:
      'Vybrali jsme možnosti vydělávání, na které si vystačíš jen s telefonem – bez počítače, bez velkých počátečních investic.',
    cta: 'Zobrazit všechny možnosti jen s mobilem',
  },

  ai: {
    title: '🤖 Vydělávání s AI',
    subtitle:
      'AI mění to, co jde zvládnout sám a rychle. Toto je nejrychleji rostoucí a nejdůležitější kategorie na webu.',
    exploreCta: 'Prozkoumat AI možnosti',
  },

  academy: {
    title: '🎓 Academy',
    subtitle: 'Zdarma dostupné lekce, které tě naučí základy – od nuly ke smysluplnému příjmu.',
    cta: 'Otevřít Academy',
    levels: {
      zacatecnik: 'Začátečník',
      pokrocily: 'Pokročilý',
    },
  },

  principles: {
    title: 'Na čem trváme',
    items: [
      { title: 'Žádný bullshit', text: 'Nikdy neslibujeme „zbohatni přes noc“ ani zaručené výdělky.' },
      { title: 'Realistická čísla', text: 'U každé možnosti najdeš reálný rozsah příjmu i rizika.' },
      { title: 'Srozumitelnost', text: 'Vysvětlujeme tak, aby tomu rozuměl i úplný začátečník.' },
    ],
  },

  // Newsletter je teď jen nenápadný doplněk v patičce, ne hlavní CTA –
  // hlavní pozornost patří storySubmission níže.
  newsletter: {
    title: 'Novinky e-mailem',
    subtitle: 'Jednou za čas pošleme shrnutí nových návodů a ověřených nástrojů. Žádný spam.',
    placeholder: 'Tvůj e-mail',
    cta: 'Přihlásit se',
  },

  // Hlavní komunitní CTA webu – sběr reálných zkušeností a příběhů
  // návštěvníků (ne e-mailů). Formulář: CommunityStoryForm.astro,
  // použitý na homepage (CommunityCta.astro) i na /o-projektu.
  storySubmission: {
    title: '💡 Vyděláváš online? Řekni nám jak.',
    subtitle:
      'Znáš zajímavý způsob, jak vydělávat online? Nebo už sis sám něco vyzkoušel? Pošli nám svůj příběh. Zajímavé zkušenosti ověříme a můžeme z nich vytvořit nový návod, případovou studii nebo rozhovor pro ostatní.',
    nameLabel: 'Jméno nebo přezdívka',
    namePlaceholder: 'Jak ti máme říkat?',
    emailLabel: 'E-mail',
    emailPlaceholder: 'Tvůj e-mail',
    methodLabel: 'Jak vyděláváš online?',
    methodPlaceholder: 'Např. freelance copywriting, dropshipping, AI video...',
    incomeLabel: 'Kolik se tím přibližně dá vydělat? (nepovinné)',
    incomePlaceholder: 'Např. 5 000–15 000 Kč / měsíc',
    storyLabel: 'Tvůj příběh / zkušenost',
    storyPlaceholder: 'Jak jsi začal/a, co fungovalo, co ne, co bys poradil/a ostatním...',
    anonymousLabel: 'Chci zůstat anonymní',
    cta: 'Poslat svůj příběh',
    sentMessage: 'Díky za tvůj příběh! Podíváme se na něj – třeba z něj vznikne nový návod. 🙌',
  },

  // Menší CTA box, který jen odkazuje na plný formulář (storySubmission)
  // na /o-projektu – použitý na konci Academy.
  storyCta: {
    title: 'Máš vlastní zkušenost s vyděláváním online?',
    text: 'Poděl se o svůj příběh. Může pomoct ostatním a třeba z něj vytvoříme nový návod nebo případovou studii.',
    cta: 'Pošli svůj příběh',
  },

  method: {
    quickFacts: 'Rychlý přehled',
    startupCost: 'Cena startu',
    difficulty: 'Obtížnost',
    timeToStart: 'Rychlost startu',
    mobileOnly: 'Stačí mobil?',
    incomePotential: 'Potenciál příjmu',
    sections: {
      whatYouDo: 'Co přesně budeš dělat',
      howYouEarn: 'Jak na tom vyděláš',
      requirements: 'Co potřebuješ na start',
      startupCost: 'Kolik to stojí',
      timeToStart: 'Jak rychle můžeš začít',
      firstClient: 'Jak získat prvního zákazníka nebo první příjem',
      tools: 'Nástroje, které budeš potřebovat',
      incomePotential: 'Realistický potenciál příjmu',
      advantages: 'Výhody',
      risks: 'Nevýhody a rizika',
      platforms: 'Kde a jak začít',
      zeroToStartSteps: 'Start od nuly – krok za krokem',
      firstWeekPlan: 'Orientační plán prvního týdne',
      commonMistakes: 'Časté chyby',
      watchOutFor: 'Na co si dát pozor',
      scalingTip: 'Jak to škálovat dál',
    },
    toolsCore: 'Doporučený základ',
    toolsAlternative: 'Alternativy',
    mobileYes: 'Ano, stačí mobil',
    mobileNo: 'Budeš potřebovat počítač',
    affiliateNote: 'partnerský odkaz',
    referralNote: 'referral odkaz',
    affiliateProgram: 'má affiliate program',
  },

  scamAlert: {
    title: '🚨 Scam Alert',
    subtitle:
      'Cílem není naučit tě podvádět. Cílem je, abys poznal/a, jak online podvody fungují, a nenaletěl/a jim.',
    cta: 'Prohlédnout varování',
    sections: {
      howItWorks: 'Jak podvod funguje',
      howVictimsAreLured: 'Jak oběť nalákají',
      warningSigns: 'Varovné signály',
      howToVerify: 'Jak si nabídku ověřit',
      howToProtect: 'Jak se chránit',
      whereToReport: 'Kam podvod nahlásit',
      tools: 'Jak takový obsah reálně vzniká',
    },
    caseStudyLabel: 'Vzdělávací případová studie',
  },

  labels: {
    startupCost: {
      zdarma: 'Zdarma',
      'do-500': 'Do 500 Kč',
      'do-5000': 'Do 5 000 Kč',
      '5000-plus': 'Nad 5 000 Kč',
    },
    difficulty: {
      zacatecnik: 'Pro začátečníky',
      stredni: 'Střední náročnost',
      pokrocily: 'Pokročilé',
    },
    timeToStart: {
      ihned: 'Můžeš začít dnes',
      dny: 'Pár dní příprav',
      tydny: 'Pár týdnů příprav',
      mesice: 'Měsíce budování',
    },
    incomePeriod: {
      mesic: '/ měsíc',
      projekt: '/ projekt',
      hodina: '/ hodina',
    },
  },

  footer: {
    about: 'Praktický český vzdělávací web o tom, jak realisticky vydělávat peníze na internetu.',
    legal: 'Právní',
    affiliateDisclosure: 'Affiliate odkazy',
    rights: 'Všechna práva vyhrazena.',
  },
} as const;
