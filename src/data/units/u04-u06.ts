import { unit, w, s } from '../build';

export const u4 = unit({
  id: 'u4',
  title: 'Familie',
  description: 'Je familie en huisdieren voorstellen',
  emoji: '👨‍👩‍👧',
  color: '#ae3ec9',
  guide: [
    {
      title: 'Mijn: moj, moja, moje',
      body: [
        '"Mijn" past zich aan het geslacht van het woord aan:',
        '| moj otac, moj brat | mijn vader, mijn broer (mannelijk)',
        '| moja majka, moja sestra | mijn moeder, mijn zus (vrouwelijk)',
        '| moje ime, moje dete | mijn naam, mijn kind (onzijdig)'
      ]
    },
    {
      title: 'Hebben: imam',
      body: [
        '| imam | ik heb',
        '| imaš | jij hebt',
        '| ima | hij/zij heeft',
        '| imamo / imate / imaju | wij / jullie / zij hebben',
        '"Niet hebben" is één woord: nemam, nemaš, nema …',
        'Na "imam" krijgen levende mannelijke wezens een -a: brat → Imam brata. Een hond (pas) wordt psa: Imam psa. Vrouwelijke woorden krijgen weer -u: Imam sestru.'
      ],
      examples: [
        { sr: 'Imam brata i sestru.', nl: 'Ik heb een broer en een zus.' },
        { sr: 'Nemam psa.', nl: 'Ik heb geen hond.' }
      ]
    },
    {
      title: 'Bijvoeglijke naamwoorden',
      body: [
        'Ook bijvoeglijke naamwoorden passen zich aan: star deda (oude opa), stara baka (oude oma), staro selo (oud dorp). Mannelijk eindigt op een medeklinker of -i, vrouwelijk op -a en onzijdig op -o of -e.'
      ]
    }
  ],
  lessons: [
    {
      title: 'Mijn familie',
      words: [
        w('porodica', 'familie', '👨‍👩‍👧', { nlAlts: ['gezin'] }),
        w('majka', 'moeder', '👩', { nlAlts: ['mama'] }),
        w('otac', 'vader', '👨', { nlAlts: ['papa'] }),
        w('brat', 'broer', '👦'),
        w('sestra', 'zus', '👧', { nlAlts: ['zuster'] }),
        w('moj', 'mijn', '☝️', { note: 'bij mannelijke woorden: moj brat' }),
        w('mama', 'mama', '🤱', { nlAlts: ['mam'] }),
        w('tata', 'papa', '🧔', { nlAlts: ['pap', 'vader'] })
      ],
      sentences: [
        s('Ovo je moja porodica.', 'Dit is mijn familie.', { nlAlts: ['Dit is mijn gezin.'] }),
        s('Ovo je moja majka.', 'Dit is mijn moeder.'),
        s('Ovo je moj otac.', 'Dit is mijn vader.'),
        s('Moj brat je student.', 'Mijn broer is student.', { nlAlts: ['Mijn broer is een student.'] }),
        s('Moja sestra se zove Ana.', 'Mijn zus heet Ana.'),
        s('Mama i tata.', 'Mama en papa.'),
        s('Gde je tata?', 'Waar is papa?'),
        s('Ovo je moj brat Marko.', 'Dit is mijn broer Marko.')
      ]
    },
    {
      title: 'Ik heb…',
      words: [
        w('imam', 'ik heb', '🫴', { nlAlts: ['heb'] }),
        w('nemam', 'ik heb geen', '🤷', { nlAlts: ['ik heb niet'] }),
        w('sin', 'zoon', '👶'),
        w('ćerka', 'dochter', '👧'),
        w('dete', 'kind', '🧒'),
        w('deca', 'kinderen', '👧👦'),
        w('muž', 'man', '🤵', { nlAlts: ['echtgenoot'] }),
        w('žena', 'vrouw', '👰', { nlAlts: ['echtgenote'] })
      ],
      sentences: [
        s('Imam brata.', 'Ik heb een broer.', { srAlts: ['Ja imam brata.'] }),
        s('Imam sestru.', 'Ik heb een zus.', { srAlts: ['Ja imam sestru.'] }),
        s('Ona ima sina.', 'Zij heeft een zoon.'),
        s('On ima ćerku.', 'Hij heeft een dochter.'),
        s('Da li imaš decu?', 'Heb jij kinderen?', { srAlts: ['Da li ti imaš decu?', 'Imaš li decu?'] }),
        s('Ovo je moj muž.', 'Dit is mijn man.'),
        s('Ovo je moja žena.', 'Dit is mijn vrouw.'),
        s('Nemam brata.', 'Ik heb geen broer.', { srAlts: ['Ja nemam brata.'] }),
        s('Dete je malo.', 'Het kind is klein.')
      ]
    },
    {
      title: 'Opa en oma',
      words: [
        w('baka', 'oma', '👵', { nlAlts: ['grootmoeder'] }),
        w('deda', 'opa', '👴', { nlAlts: ['grootvader'] }),
        w('tetka', 'tante', '👩‍🦰'),
        w('ujak', 'oom', '👨‍🦳', { note: 'broer van je moeder' }),
        w('star', 'oud', '🧓', { note: 'mannelijk' }),
        w('stara', 'oud', '👵', { note: 'vrouwelijk' }),
        w('mlad', 'jong', '🧑', { note: 'mannelijk' }),
        w('mlada', 'jong', '👩', { note: 'vrouwelijk' })
      ],
      sentences: [
        s('Moja baka je stara.', 'Mijn oma is oud.'),
        s('Moj deda je star.', 'Mijn opa is oud.'),
        s('Moja tetka je mlada.', 'Mijn tante is jong.'),
        s('Moj ujak je iz Niša.', 'Mijn oom komt uit Niš.', { nlAlts: ['Mijn oom is uit Niš.', 'Mijn oom komt uit Nis.'] }),
        s('Baka i deda su u Srbiji.', 'Oma en opa zijn in Servië.'),
        s('Volim baku.', 'Ik hou van oma.', { srAlts: ['Ja volim baku.', 'Volim baku i dedu.'], nlAlts: ['Ik hou van mijn oma.'] }),
        s('On je mlad.', 'Hij is jong.'),
        s('Deda nije star.', 'Opa is niet oud.')
      ]
    },
    {
      title: 'Huisdieren',
      words: [
        w('pas', 'hond', '🐕'),
        w('mačka', 'kat', '🐈', { nlAlts: ['poes'] }),
        w('ptica', 'vogel', '🐦'),
        w('konj', 'paard', '🐴'),
        w('velik', 'groot', '🐘', { srAlts: ['veliki'], note: 'mannelijk' }),
        w('mali', 'klein', '🐭', { note: 'mannelijk' }),
        w('mala', 'klein', '🐁', { note: 'vrouwelijk' })
      ],
      sentences: [
        s('Imam psa.', 'Ik heb een hond.', { srAlts: ['Ja imam psa.'] }),
        s('Imam mačku.', 'Ik heb een kat.', { srAlts: ['Ja imam mačku.'], nlAlts: ['Ik heb een poes.'] }),
        s('Pas je velik.', 'De hond is groot.', { srAlts: ['Pas je veliki.'] }),
        s('Mačka je mala.', 'De kat is klein.', { nlAlts: ['De poes is klein.'] }),
        s('Da li imaš psa?', 'Heb jij een hond?', { srAlts: ['Da li ti imaš psa?', 'Imaš li psa?'] }),
        s('Moja sestra ima konja.', 'Mijn zus heeft een paard.'),
        s('Ptica je mala.', 'De vogel is klein.'),
        s('Nemam mačku.', 'Ik heb geen kat.', { srAlts: ['Ja nemam mačku.'], nlAlts: ['Ik heb geen poes.'] })
      ]
    }
  ]
});

export const u5 = unit({
  id: 'u5',
  title: 'Getallen',
  description: 'Tellen, je leeftijd zeggen en prijzen vragen',
  emoji: '🔢',
  color: '#f08c00',
  guide: [
    {
      title: 'Tellen tot tien',
      body: [
        '| 1 jedan | 6 šest',
        '| 2 dva | 7 sedam',
        '| 3 tri | 8 osam',
        '| 4 četiri | 9 devet',
        '| 5 pet | 10 deset',
        '"Jedan" (één) past zich aan het geslacht aan: jedan brat, jedna kafa, jedno jaje.',
        '| 20 dvadeset | 100 sto'
      ]
    },
    {
      title: 'Na een getal verandert het woord',
      body: [
        'Na 2, 3 en 4 krijgt een mannelijk woord -a, en een vrouwelijk woord -e: dva brata, tri sestre, četiri kafe.',
        'Na 5 en hoger gebruik je de meervouds-genitief. Die eindigt vaak op -a: pet jabuka, sedam dana, sto dinara.',
        'Dit is lastig, maar maak je geen zorgen: je wordt hier vanzelf beter in.'
      ]
    },
    {
      title: 'Leeftijd en prijzen',
      body: [
        'In het Servisch "heb" je jaren: "Imam dvadeset godina" = "Ik ben twintig jaar" (letterlijk: ik heb twintig jaren).',
        'Een prijs vraag je met "Koliko košta?" (Hoeveel kost het?). In Servië betaal je met de dinar.'
      ],
      examples: [
        { sr: 'Koliko imaš godina?', nl: 'Hoe oud ben je?' },
        { sr: 'Koliko košta kafa?', nl: 'Hoeveel kost de koffie?' }
      ]
    }
  ],
  lessons: [
    {
      title: 'Een, twee, drie',
      words: [
        w('jedan', 'een', '1️⃣', { nlAlts: ['één', '1'] }),
        w('dva', 'twee', '2️⃣', { nlAlts: ['2'] }),
        w('tri', 'drie', '3️⃣', { nlAlts: ['3'] }),
        w('četiri', 'vier', '4️⃣', { nlAlts: ['4'] }),
        w('pet', 'vijf', '5️⃣', { nlAlts: ['5'] }),
        w('broj', 'nummer', '#️⃣', { nlAlts: ['getal'] })
      ],
      sentences: [
        s('Jedan, dva, tri!', 'Een, twee, drie!', { nlAlts: ['Eén, twee, drie!', '1, 2, 3!'] }),
        s('Imam dva brata.', 'Ik heb twee broers.', { srAlts: ['Ja imam dva brata.'] }),
        s('Imam tri sestre.', 'Ik heb drie zussen.', { srAlts: ['Ja imam tri sestre.'] }),
        s('Četiri kafe, molim vas.', 'Vier koffie, alstublieft.', { nlAlts: ["Vier koffie's, alstublieft.", 'Vier koffies, alstublieft.'] }),
        s('Pet jabuka.', 'Vijf appels.'),
        s('Jedna kafa, molim.', 'Eén koffie, alsjeblieft.', { nlAlts: ['Een koffie, alsjeblieft.'] }),
        s('Broj dva.', 'Nummer twee.'),
        s('Četiri, pet!', 'Vier, vijf!')
      ]
    },
    {
      title: 'Tot tien',
      words: [
        w('šest', 'zes', '6️⃣', { nlAlts: ['6'] }),
        w('sedam', 'zeven', '7️⃣', { nlAlts: ['7'] }),
        w('osam', 'acht', '8️⃣', { nlAlts: ['8'] }),
        w('devet', 'negen', '9️⃣', { nlAlts: ['9'] }),
        w('deset', 'tien', '🔟', { nlAlts: ['10'] }),
        w('nula', 'nul', '0️⃣', { nlAlts: ['0'] }),
        w('godina', 'jaar', '🎂')
      ],
      sentences: [
        s('Šest, sedam, osam.', 'Zes, zeven, acht.'),
        s('Imam deset godina.', 'Ik ben tien jaar.', { srAlts: ['Ja imam deset godina.'], nlAlts: ['Ik ben tien jaar oud.', 'Ik ben tien.'] }),
        s('Koliko imaš godina?', 'Hoe oud ben jij?', { srAlts: ['Koliko ti imaš godina?', 'Koliko godina imaš?'] }),
        s('Sedam dana.', 'Zeven dagen.'),
        s('Nula, jedan, dva.', 'Nul, een, twee.', { nlAlts: ['Nul, één, twee.'] }),
        s('On ima devet godina.', 'Hij is negen jaar.', { nlAlts: ['Hij is negen jaar oud.', 'Hij is negen.'] }),
        s('Osam i dva je deset.', 'Acht en twee is tien.', { nlAlts: ['Acht plus twee is tien.'] }),
        s('Imam šest godina.', 'Ik ben zes jaar.', { srAlts: ['Ja imam šest godina.'], nlAlts: ['Ik ben zes jaar oud.', 'Ik ben zes.'] })
      ]
    },
    {
      title: 'Hoeveel kost het?',
      words: [
        w('koliko', 'hoeveel', '🤔'),
        w('košta', 'kost', '🏷️'),
        w('dinar', 'dinar', '💵'),
        w('evro', 'euro', '💶'),
        w('dvadeset', 'twintig', '🎯', { nlAlts: ['20'] }),
        w('sto', 'honderd', '💯', { nlAlts: ['100'] }),
        w('skupo', 'duur', '💸'),
        w('jeftino', 'goedkoop', '🪙'),
        w('to', 'dat', '👉', { nlAlts: ['het'] })
      ],
      sentences: [
        s('Koliko košta?', 'Hoeveel kost het?', { nlAlts: ['Wat kost het?', 'Hoeveel kost dat?', 'Wat kost dat?'] }),
        s('Koliko košta kafa?', 'Hoeveel kost de koffie?', { nlAlts: ['Wat kost de koffie?', 'Hoeveel kost koffie?', 'Wat kost een koffie?'] }),
        s('Sto dinara.', 'Honderd dinar.'),
        s('Deset evra.', 'Tien euro.'),
        s('To je skupo!', 'Dat is duur!', { nlAlts: ['Het is duur!'] }),
        s('To je jeftino.', 'Dat is goedkoop.', { nlAlts: ['Het is goedkoop.'] }),
        s('Kafa košta sto dinara.', 'De koffie kost honderd dinar.', { nlAlts: ['Koffie kost honderd dinar.'] }),
        s('Imam dvadeset godina.', 'Ik ben twintig jaar.', { srAlts: ['Ja imam dvadeset godina.'], nlAlts: ['Ik ben twintig jaar oud.', 'Ik ben twintig.'] })
      ]
    }
  ]
});

export const u6 = unit({
  id: 'u6',
  title: 'Kleuren en gevoelens',
  description: 'Dingen beschrijven en zeggen hoe je je voelt',
  emoji: '🎨',
  color: '#d6336c',
  guide: [
    {
      title: 'Bijvoeglijke naamwoorden passen zich aan',
      body: [
        'Een bijvoeglijk naamwoord krijgt dezelfde "kleur" als het woord waar het bij hoort:',
        '| mannelijk | crven, nov, dobar',
        '| vrouwelijk (-a) | crvena, nova, dobra',
        '| onzijdig (-o) | crveno, novo, dobro',
        'Voorbeelden: Pas je crn. – Mačka je crna. – Mleko je belo.'
      ]
    },
    {
      title: 'Let op: beo',
      body: [
        '"Wit" is in de mannelijke vorm beo, maar vrouwelijk bela en onzijdig belo. Dat komt doordat een l aan het einde van een lettergreep in het Servisch vaak een o wordt.'
      ]
    },
    {
      title: 'Hoe voel je je?',
      body: [
        'Bij gevoelens hangt de vorm af van wie het zegt! Een jongen zegt "Srećan sam" (ik ben blij), een meisje zegt "Srećna sam".',
        '| srećan / srećna | blij',
        '| umoran / umorna | moe',
        '| gladan / gladna | hongerig',
        '| žedan / žedna | dorstig',
        'Let op de uitdrukking: "Gladna sam" betekent letterlijk "ik ben hongerig", in het Nederlands zeggen we "ik heb honger".'
      ]
    }
  ],
  lessons: [
    {
      title: 'Kleuren',
      words: [
        w('crven', 'rood', '🔴'),
        w('plav', 'blauw', '🔵'),
        w('zelen', 'groen', '🟢'),
        w('žut', 'geel', '🟡'),
        w('beo', 'wit', '⚪', { note: 'vrouwelijk: bela, onzijdig: belo' }),
        w('crn', 'zwart', '⚫'),
        w('boja', 'kleur', '🎨')
      ],
      sentences: [
        s('Jabuka je crvena.', 'De appel is rood.'),
        s('Nebo je plavo.', 'De lucht is blauw.', { nlAlts: ['De hemel is blauw.'] }),
        s('Mačka je crna.', 'De kat is zwart.', { nlAlts: ['De poes is zwart.'] }),
        s('Mleko je belo.', 'De melk is wit.'),
        s('Sir je žut.', 'De kaas is geel.'),
        s('Pas je crn.', 'De hond is zwart.'),
        s('Koja je to boja?', 'Welke kleur is dat?', { nlAlts: ['Wat voor kleur is dat?', 'Welke kleur is het?'] }),
        s('Plava i zelena.', 'Blauw en groen.')
      ]
    },
    {
      title: 'Nieuw en oud',
      words: [
        w('nov', 'nieuw', '✨', { srAlts: ['novi'] }),
        w('lep', 'mooi', '🌹', { srAlts: ['lepi'] }),
        w('dobar', 'goed', '👌', { srAlts: ['dobri'] }),
        w('loš', 'slecht', '💩', { srAlts: ['loši'] }),
        w('kuća', 'huis', '🏠'),
        w('auto', 'auto', '🚗'),
        w('knjiga', 'boek', '📖')
      ],
      sentences: [
        s('Kuća je nova.', 'Het huis is nieuw.'),
        s('Auto je star.', 'De auto is oud.'),
        s('Knjiga je dobra.', 'Het boek is goed.'),
        s('Ovo je lepa kuća.', 'Dit is een mooi huis.'),
        s('Imam novi auto.', 'Ik heb een nieuwe auto.', { srAlts: ['Imam nov auto.', 'Ja imam novi auto.', 'Ja imam nov auto.'] }),
        s('Ovo je loša knjiga.', 'Dit is een slecht boek.'),
        s('Lepo!', 'Mooi!'),
        s('Moja kuća je bela.', 'Mijn huis is wit.')
      ]
    },
    {
      title: 'Hoe voel je je?',
      words: [
        w('srećan', 'blij', '😊', { srAlts: ['srećna'], nlAlts: ['gelukkig'] }),
        w('tužan', 'verdrietig', '😢', { srAlts: ['tužna'], nlAlts: ['droevig', 'treurig'] }),
        w('umoran', 'moe', '😴', { srAlts: ['umorna'] }),
        w('gladan', 'hongerig', '🍔', { srAlts: ['gladna'], note: 'gladan sam = ik heb honger' }),
        w('žedan', 'dorstig', '🥵', { srAlts: ['žedna'], note: 'žedan sam = ik heb dorst' }),
        w('visok', 'lang', '🦒', { nlAlts: ['groot', 'hoog'] }),
        w('nizak', 'klein', '🐜', { nlAlts: ['kort', 'laag'], note: 'vrouwelijk: niska' })
      ],
      sentences: [
        s('Ja sam srećna.', 'Ik ben blij.', { srAlts: ['Srećna sam.', 'Ja sam srećan.', 'Srećan sam.'], nlAlts: ['Ik ben gelukkig.'] }),
        s('On je tužan.', 'Hij is verdrietig.', { nlAlts: ['Hij is droevig.'] }),
        s('Umorna sam.', 'Ik ben moe.', { srAlts: ['Ja sam umorna.', 'Umoran sam.', 'Ja sam umoran.'] }),
        s('Gladan sam!', 'Ik heb honger!', { srAlts: ['Gladna sam!', 'Ja sam gladan!', 'Ja sam gladna!'] }),
        s('Da li si žedna?', 'Heb jij dorst?', { srAlts: ['Da li si žedan?', 'Jesi li žedna?', 'Jesi li žedan?', 'Da li si ti žedna?'] }),
        s('Marko je visok.', 'Marko is lang.', { nlAlts: ['Marko is groot.'] }),
        s('Ana je niska.', 'Ana is klein.'),
        s('Mi smo srećni.', 'Wij zijn blij.', { srAlts: ['Srećni smo.'], nlAlts: ['Wij zijn gelukkig.'] })
      ]
    }
  ]
});
