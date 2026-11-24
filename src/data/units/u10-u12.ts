import { unit, w, s } from '../build';

export const u10 = unit({
  id: 'u10',
  title: 'Op reis',
  description: 'Reizen, hotel, vakantie en hulp vragen',
  emoji: '✈️',
  color: '#c92a2a',
  guide: [
    {
      title: 'Met de trein of bus',
      body: [
        'Waarmee je reist, zeg je met de instrumentalis: het woord krijgt -om (mannelijk) of -om/-em. "Idem vozom" = "Ik ga met de trein", "Idem autobusom" = "Ik ga met de bus".',
        'Een kaartje koop je met: "Jednu kartu za Novi Sad, molim vas."'
      ]
    },
    {
      title: 'Beleefd vragen',
      body: [
        'Tegen een onbekende gebruik je "vi" (u). Het werkwoord eindigt dan op -te:',
        '| Imate li …? | Heeft u …?',
        '| Možete li …? | Kunt u …?',
        '| Izvinite! | Pardon!'
      ]
    },
    {
      title: 'Als je hulp nodig hebt',
      body: [
        '"Treba mi …" = "Ik heb … nodig" (letterlijk: … is mij nodig).',
        '"Boli me …" = "Mijn … doet pijn": Boli me glava (ik heb hoofdpijn), Boli me stomak (ik heb buikpijn).',
        'Het noodnummer in Servië is 112, net als in Nederland.'
      ]
    }
  ],
  lessons: [
    {
      title: 'Onderweg',
      words: [
        w('aerodrom', 'vliegveld', '🛫', { nlAlts: ['luchthaven'] }),
        w('avion', 'vliegtuig', '✈️'),
        w('voz', 'trein', '🚆'),
        w('autobus', 'bus', '🚌'),
        w('karta', 'kaartje', '🎫', { nlAlts: ['kaart', 'ticket'] }),
        w('pasoš', 'paspoort', '🛂'),
        w('putujem', 'ik reis', '🧳', { nlAlts: ['reis'] })
      ],
      sentences: [
        s('Putujem u Srbiju.', 'Ik reis naar Servië.', { srAlts: ['Ja putujem u Srbiju.'] }),
        s('Gde je aerodrom?', 'Waar is het vliegveld?', { nlAlts: ['Waar is de luchthaven?'] }),
        s('Idem vozom.', 'Ik ga met de trein.', { srAlts: ['Ja idem vozom.'], nlAlts: ['Ik reis met de trein.'] }),
        s('Autobus je tamo.', 'De bus is daar.'),
        s('Jednu kartu, molim.', 'Eén kaartje, alsjeblieft.', { nlAlts: ['Een kaartje, alsjeblieft.', 'Eén ticket, alsjeblieft.', 'Een ticket, alsjeblieft.'] }),
        s('Imam pasoš.', 'Ik heb een paspoort.', { srAlts: ['Ja imam pasoš.'], nlAlts: ['Ik heb mijn paspoort.'] }),
        s('Avion je velik.', 'Het vliegtuig is groot.', { srAlts: ['Avion je veliki.'] }),
        s('Da li je ovo voz za Beograd?', 'Is dit de trein naar Belgrado?', { srAlts: ['Je li ovo voz za Beograd?'] })
      ]
    },
    {
      title: 'In het hotel',
      words: [
        w('hotel', 'hotel', '🏨'),
        w('soba', 'kamer', '🛏️'),
        w('ključ', 'sleutel', '🔑'),
        w('doručak', 'ontbijt', '🥐'),
        w('rezervacija', 'reservering', '📋', { nlAlts: ['reservatie', 'boeking'] }),
        w('imate li', 'heeft u', '🙋‍♂️', { nlAlts: ['hebben jullie'] }),
        w('vaš', 'uw', '🫵', { nlAlts: ['jullie'] })
      ],
      sentences: [
        s('Imate li slobodnu sobu?', 'Heeft u een kamer vrij?', { srAlts: ['Da li imate slobodnu sobu?'], nlAlts: ['Heeft u een vrije kamer?', 'Hebben jullie een kamer vrij?', 'Hebben jullie een vrije kamer?'] }),
        s('Imam rezervaciju.', 'Ik heb een reservering.', { srAlts: ['Ja imam rezervaciju.'], nlAlts: ['Ik heb gereserveerd.'] }),
        s('Ovo je vaš ključ.', 'Dit is uw sleutel.', { nlAlts: ['Dit is jullie sleutel.'] }),
        s('Soba je mala, ali lepa.', 'De kamer is klein, maar mooi.'),
        s('Doručak je u sedam sati.', 'Het ontbijt is om zeven uur.'),
        s('Hotel je blizu stanice.', 'Het hotel is dichtbij het station.', { nlAlts: ['Het hotel is vlak bij het station.', 'Het hotel is vlakbij het station.', 'Het hotel is dicht bij het station.'] }),
        s('Za dve noći.', 'Voor twee nachten.'),
        s('Gde je moja soba?', 'Waar is mijn kamer?')
      ]
    },
    {
      title: 'Vakantie',
      words: [
        w('more', 'zee', '🌊'),
        w('plaža', 'strand', '🏝️'),
        w('planina', 'berg', '⛰️'),
        w('reka', 'rivier', '🏞️'),
        w('jezero', 'meer', '💦'),
        w('odmor', 'vakantie', '🌴', { nlAlts: ['rust', 'pauze'] }),
        w('slika', 'foto', '📷', { nlAlts: ['foto', 'schilderij', 'afbeelding', 'plaatje'] })
      ],
      sentences: [
        s('Na odmoru sam.', 'Ik ben op vakantie.', { srAlts: ['Ja sam na odmoru.'] }),
        s('Idemo na more.', 'We gaan naar zee.', { srAlts: ['Mi idemo na more.'], nlAlts: ['We gaan naar de zee.', 'Wij gaan naar zee.', 'Laten we naar zee gaan.'] }),
        s('Plaža je lepa.', 'Het strand is mooi.'),
        s('Volim planine.', 'Ik hou van bergen.', { srAlts: ['Ja volim planine.'], nlAlts: ['Ik hou van de bergen.'] }),
        s('Dunav je velika reka.', 'De Donau is een grote rivier.'),
        s('Ovo je lepa slika.', 'Dit is een mooie foto.', { nlAlts: ['Dit is een mooi schilderij.', 'Dit is een mooie afbeelding.'] }),
        s('Jezero je hladno.', 'Het meer is koud.'),
        s('More je toplo.', 'De zee is warm.', { nlAlts: ['Het zeewater is warm.'] })
      ]
    },
    {
      title: 'Hulp!',
      words: [
        w('upomoć', 'help', '🆘'),
        w('apoteka', 'apotheek', '💊'),
        w('lekar', 'dokter', '🩺', { nlAlts: ['arts'] }),
        w('bolestan', 'ziek', '🤒', { srAlts: ['bolesna'] }),
        w('glava', 'hoofd', '🤕'),
        w('toalet', 'wc', '🚻', { nlAlts: ['toilet'] }),
        w('treba mi', 'ik heb nodig', '🙏')
      ],
      sentences: [
        s('Upomoć!', 'Help!'),
        s('Gde je toalet?', 'Waar is de wc?', { nlAlts: ['Waar is het toilet?'] }),
        s('Gde je apoteka?', 'Waar is de apotheek?', { nlAlts: ['Waar is een apotheek?'] }),
        s('Bolestan sam.', 'Ik ben ziek.', { srAlts: ['Bolesna sam.', 'Ja sam bolestan.', 'Ja sam bolesna.'] }),
        s('Boli me glava.', 'Ik heb hoofdpijn.', { nlAlts: ['Mijn hoofd doet pijn.'] }),
        s('Treba mi lekar.', 'Ik heb een dokter nodig.', { nlAlts: ['Ik heb een arts nodig.'] }),
        s('Možete li mi pomoći?', 'Kunt u mij helpen?', { srAlts: ['Da li možete da mi pomognete?'], nlAlts: ['Kunnen jullie mij helpen?'] }),
        s('Treba mi pomoć.', 'Ik heb hulp nodig.')
      ]
    }
  ]
});

export const u11 = unit({
  id: 'u11',
  title: 'Thuis',
  description: 'Het huis, de kamers en wat erin staat',
  emoji: '🏡',
  color: '#2b8a3e',
  guide: [
    {
      title: 'Er is / er zijn: ima',
      body: [
        '"Ima" betekent niet alleen "heeft", maar ook "er is / er zijn". "Nema" is "er is geen".',
        '| U sobi ima krevet. | In de kamer staat een bed.',
        '| U kuhinji nema stolice. | In de keuken is geen stoel.'
      ]
    },
    {
      title: 'Meervoud',
      body: [
        'Het meervoud vorm je zo:',
        '| mannelijk: -i | krevet → kreveti, prozor → prozori',
        '| vrouwelijk: -e | soba → sobe, stolica → stolice',
        '| onzijdig: -a | kupatilo → kupatila',
        '"Vrata" (deur) is altijd meervoud: Vrata su otvorena (De deur is open).'
      ]
    }
  ],
  lessons: [
    {
      title: 'De kamers',
      words: [
        w('kuhinja', 'keuken', '🍳'),
        w('kupatilo', 'badkamer', '🛁'),
        w('spavaća soba', 'slaapkamer', '🛌'),
        w('dnevna soba', 'woonkamer', '🛋️', { nlAlts: ['huiskamer', 'zitkamer'] }),
        w('stan', 'appartement', '🏢', { nlAlts: ['flat', 'woning'] }),
        w('bašta', 'tuin', '🌻')
      ],
      sentences: [
        s('Ovo je kuhinja.', 'Dit is de keuken.', { nlAlts: ['Dit is een keuken.'] }),
        s('Kupatilo je malo.', 'De badkamer is klein.'),
        s('Moj stan je u Beogradu.', 'Mijn appartement is in Belgrado.', { nlAlts: ['Mijn flat is in Belgrado.'] }),
        s('Mama je u kuhinji.', 'Mama is in de keuken.'),
        s('Imamo lepu baštu.', 'Wij hebben een mooie tuin.', { srAlts: ['Mi imamo lepu baštu.'] }),
        s('Gde je kupatilo?', 'Waar is de badkamer?'),
        s('Spavaća soba je velika.', 'De slaapkamer is groot.'),
        s('Tata je u dnevnoj sobi.', 'Papa is in de woonkamer.', { nlAlts: ['Papa is in de huiskamer.'] })
      ]
    },
    {
      title: 'Meubels',
      words: [
        w('sto', 'tafel', '🍽️', { note: 'let op: sto is ook "honderd"' }),
        w('stolica', 'stoel', '🪑'),
        w('krevet', 'bed', '🛏️'),
        w('prozor', 'raam', '🪟'),
        w('vrata', 'deur', '🚪'),
        w('lampa', 'lamp', '💡'),
        w('ima', 'er is', '📦', { nlAlts: ['heeft', 'er zijn'] })
      ],
      sentences: [
        s('U sobi ima krevet.', 'In de kamer is een bed.', { srAlts: ['Ima krevet u sobi.'], nlAlts: ['In de kamer staat een bed.', 'Er is een bed in de kamer.', 'Er staat een bed in de kamer.'] }),
        s('Sto je u kuhinji.', 'De tafel is in de keuken.', { nlAlts: ['De tafel staat in de keuken.'] }),
        s('Prozor je velik.', 'Het raam is groot.', { srAlts: ['Prozor je veliki.'] }),
        s('Vrata su zatvorena.', 'De deur is dicht.', { nlAlts: ['De deur is gesloten.'] }),
        s('Imam novu stolicu.', 'Ik heb een nieuwe stoel.', { srAlts: ['Ja imam novu stolicu.'] }),
        s('Lampa je na stolu.', 'De lamp staat op de tafel.', { nlAlts: ['De lamp is op de tafel.', 'De lamp staat op tafel.'] }),
        s('Mačka spava na krevetu.', 'De kat slaapt op het bed.', { nlAlts: ['De poes slaapt op het bed.'] }),
        s('Nema stolice.', 'Er is geen stoel.')
      ]
    },
    {
      title: 'Klusjes',
      words: [
        w('perem', 'ik was', '🧼', { nlAlts: ['was', 'ik afwas'] }),
        w('čistim', 'ik maak schoon', '🧹', { nlAlts: ['maak schoon', 'ik poets'] }),
        w('otvaram', 'ik open', '🔓', { nlAlts: ['ik doe open', 'open'] }),
        w('zatvaram', 'ik sluit', '🔒', { nlAlts: ['ik doe dicht', 'sluit'] }),
        w('sudovi', 'afwas', '🍽️', { nlAlts: ['vaat', 'borden'] }),
        w('čisto', 'schoon', '✨')
      ],
      sentences: [
        s('Perem sudove.', 'Ik doe de afwas.', { srAlts: ['Ja perem sudove.'], nlAlts: ['Ik was af.', 'Ik was de borden.'] }),
        s('Čistim kuću.', 'Ik maak het huis schoon.', { srAlts: ['Ja čistim kuću.'] }),
        s('Otvaram prozor.', 'Ik open het raam.', { srAlts: ['Ja otvaram prozor.'], nlAlts: ['Ik doe het raam open.'] }),
        s('Zatvaram vrata.', 'Ik sluit de deur.', { srAlts: ['Ja zatvaram vrata.'], nlAlts: ['Ik doe de deur dicht.'] }),
        s('Kuhinja je čista.', 'De keuken is schoon.'),
        s('Soba nije čista.', 'De kamer is niet schoon.'),
        s('Ona čisti kupatilo.', 'Zij maakt de badkamer schoon.'),
        s('Sada je sve čisto!', 'Nu is alles schoon!', { srAlts: ['Sad je sve čisto!'], nlAlts: ['Alles is nu schoon!'] })
      ]
    }
  ]
});

export const u12 = unit({
  id: 'u12',
  title: 'Lichaam en kleding',
  description: 'Lichaamsdelen, kleren en winkelen',
  emoji: '👕',
  color: '#e67700',
  guide: [
    {
      title: 'Kleding kopen',
      body: [
        '"Kupujem" = "ik koop". In de winkel vraag je: "Mogu li da probam?" (Mag ik het passen?) en "Koliko košta ova majica?" (Hoeveel kost dit T-shirt?).',
        '"Ovaj, ova, ovo" = "deze/dit" en past zich aan: ovaj džemper, ova majica, ovo odelo.'
      ]
    },
    {
      title: 'Woorden die altijd meervoud zijn',
      body: [
        'Net als in het Nederlands (een broek = één ding) zijn sommige woorden altijd meervoud: pantalone (broek), naočare (bril), usta (mond), vrata (deur).'
      ]
    }
  ],
  lessons: [
    {
      title: 'Het lichaam',
      words: [
        w('ruka', 'hand', '✋', { nlAlts: ['arm'] }),
        w('noga', 'been', '🦵', { nlAlts: ['voet'] }),
        w('oko', 'oog', '👁️'),
        w('uvo', 'oor', '👂', { srAlts: ['uho'] }),
        w('nos', 'neus', '👃'),
        w('usta', 'mond', '👄'),
        w('kosa', 'haar', '💇')
      ],
      sentences: [
        s('Boli me ruka.', 'Mijn hand doet pijn.', { nlAlts: ['Mijn arm doet pijn.', 'Ik heb pijn aan mijn hand.', 'Ik heb pijn aan mijn arm.'] }),
        s('Ona ima plavu kosu.', 'Zij heeft blond haar.', { nlAlts: ['Zij heeft blauw haar.'] }),
        s('Imam smeđe oči.', 'Ik heb bruine ogen.', { srAlts: ['Ja imam smeđe oči.'] }),
        s('Pas ima veliki nos.', 'De hond heeft een grote neus.'),
        s('Boli me noga.', 'Mijn been doet pijn.', { nlAlts: ['Ik heb pijn aan mijn been.', 'Mijn voet doet pijn.'] }),
        s('Kosa je duga.', 'Het haar is lang.'),
        s('Operi ruke!', 'Was je handen!'),
        s('Otvori usta.', 'Doe je mond open.', { nlAlts: ['Open je mond.'] })
      ]
    },
    {
      title: 'Kleding',
      words: [
        w('majica', 'T-shirt', '👕', { nlAlts: ['shirt', 'tshirt', 't shirt', 'shirtje'] }),
        w('pantalone', 'broek', '👖'),
        w('haljina', 'jurk', '👗'),
        w('cipele', 'schoenen', '👟'),
        w('jakna', 'jas', '🧥', { nlAlts: ['jack', 'jasje'] }),
        w('kapa', 'muts', '🧢', { nlAlts: ['pet'] }),
        w('nosim', 'ik draag', '🧍‍♀️', { nlAlts: ['draag'] })
      ],
      sentences: [
        s('Nosim crvenu majicu.', 'Ik draag een rood T-shirt.', { srAlts: ['Ja nosim crvenu majicu.'], nlAlts: ['Ik draag een rood shirt.', 'Ik draag een rood tshirt.', 'Ik draag een rode T-shirt.'] }),
        s('Haljina je lepa.', 'De jurk is mooi.'),
        s('Ovo su moje cipele.', 'Dit zijn mijn schoenen.'),
        s('Gde je moja jakna?', 'Waar is mijn jas?'),
        s('Nosim plave pantalone.', 'Ik draag een blauwe broek.', { srAlts: ['Ja nosim plave pantalone.'] }),
        s('Hladno je, nosim kapu.', 'Het is koud, ik draag een muts.'),
        s('Ona nosi belu haljinu.', 'Zij draagt een witte jurk.'),
        s('Cipele su nove.', 'De schoenen zijn nieuw.')
      ]
    },
    {
      title: 'Winkelen',
      words: [
        w('kupujem', 'ik koop', '🛍️', { nlAlts: ['koop'] }),
        w('ovaj', 'deze', '👈', { note: 'mannelijk; vrouwelijk: ova, onzijdig: ovo' }),
        w('ova', 'deze', '👈', { nlAlts: ['dit'], note: 'vrouwelijk' }),
        w('mogu li', 'mag ik', '🙋‍♀️', { nlAlts: ['kan ik'] }),
        w('probam', 'ik pas', '🪞', { nlAlts: ['ik probeer', 'passen', 'proberen'] }),
        w('džemper', 'trui', '🧶', { nlAlts: ['sweater'] }),
        w('skup', 'duur', '💰', { note: 'vrouwelijk: skupa, onzijdig: skupo' })
      ],
      sentences: [
        s('Kupujem novu jaknu.', 'Ik koop een nieuwe jas.', { srAlts: ['Ja kupujem novu jaknu.'] }),
        s('Koliko košta ova majica?', 'Hoeveel kost dit T-shirt?', { nlAlts: ['Wat kost dit T-shirt?', 'Hoeveel kost dit shirt?', 'Wat kost dit shirt?', 'Hoeveel kost deze T-shirt?'] }),
        s('Mogu li da probam?', 'Mag ik het passen?', { srAlts: ['Da li mogu da probam?'], nlAlts: ['Kan ik het passen?', 'Mag ik het proberen?', 'Mag ik passen?'] }),
        s('Ova haljina je lepa.', 'Deze jurk is mooi.'),
        s('Ovaj džemper je skup.', 'Deze trui is duur.'),
        s('Cipele su mi male.', 'De schoenen zijn me te klein.', { nlAlts: ['De schoenen zijn te klein voor mij.', 'De schoenen zijn mij te klein.'] }),
        s('Kupujem ovu majicu.', 'Ik koop dit T-shirt.', { srAlts: ['Ja kupujem ovu majicu.', 'Uzimam ovu majicu.'], nlAlts: ['Ik koop dit shirt.', 'Ik koop deze T-shirt.'] }),
        s('Imate li veći broj?', 'Heeft u een grotere maat?', { nlAlts: ['Hebben jullie een grotere maat?'] })
      ]
    }
  ]
});
