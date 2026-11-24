import { unit, w, s } from '../build';

export const u7 = unit({
  id: 'u7',
  title: 'In de stad',
  description: 'De weg vragen en zeggen waar je bent',
  emoji: '🏙️',
  color: '#0c8599',
  guide: [
    {
      title: 'Waar is…?',
      body: ['Met "Gde je …?" vraag je waar iets is. Het antwoord is vaak kort: levo (links), desno (rechts), pravo (rechtdoor), ovde (hier), tamo (daar).'],
      examples: [
        { sr: 'Gde je banka?', nl: 'Waar is de bank?' },
        { sr: 'Banka je levo.', nl: 'De bank is links.' }
      ]
    },
    {
      title: 'In of op: u en na',
      body: [
        '"U" betekent "in", "na" betekent "op". Ook hier verandert het woord (dit heet de locatief): meestal -u voor mannelijke woorden en -i voor vrouwelijke.',
        '| grad → u gradu | in de stad',
        '| škola → u školi | op school',
        '| pijaca → na pijaci | op de markt',
        '| Beograd → u Beogradu | in Belgrado',
        '"Thuis" is een vaste uitdrukking: kod kuće.'
      ]
    },
    {
      title: 'Ergens naartoe gaan',
      body: [
        'Ga je ergens naartoe, dan gebruik je ook "u" of "na", maar met de accusatief (vrouwelijk -u, mannelijk verandert niet):',
        '| Idem u grad. | Ik ga naar de stad.',
        '| Idem u školu. | Ik ga naar school.',
        '| Idem na pijacu. | Ik ga naar de markt.',
        '| Idem kući. | Ik ga naar huis.',
        'Het werkwoord "gaan": idem, ideš, ide, idemo, idete, idu. "Idemo!" betekent ook "Kom op, we gaan!"'
      ]
    }
  ],
  lessons: [
    {
      title: 'De stad',
      words: [
        w('grad', 'stad', '🏙️'),
        w('ulica', 'straat', '🛣️'),
        w('prodavnica', 'winkel', '🏪'),
        w('škola', 'school', '🏫'),
        w('banka', 'bank', '🏦'),
        w('park', 'park', '🌳'),
        w('gde', 'waar', '📍')
      ],
      sentences: [
        s('Gde je banka?', 'Waar is de bank?', { nlAlts: ['Waar is een bank?'] }),
        s('Gde je škola?', 'Waar is de school?'),
        s('Ovo je moja ulica.', 'Dit is mijn straat.'),
        s('Beograd je veliki grad.', 'Belgrado is een grote stad.'),
        s('Park je lep.', 'Het park is mooi.'),
        s('Prodavnica je mala.', 'De winkel is klein.'),
        s('Gde je prodavnica?', 'Waar is de winkel?', { nlAlts: ['Waar is een winkel?'] }),
        s('Gde je park?', 'Waar is het park?')
      ]
    },
    {
      title: 'Links of rechts?',
      words: [
        w('levo', 'links', '⬅️'),
        w('desno', 'rechts', '➡️'),
        w('pravo', 'rechtdoor', '⬆️'),
        w('ovde', 'hier', '📌'),
        w('tamo', 'daar', '🔭'),
        w('blizu', 'dichtbij', '🤏', { nlAlts: ['vlakbij', 'dicht bij'] }),
        w('daleko', 'ver', '🗺️', { nlAlts: ['ver weg'] })
      ],
      sentences: [
        s('Banka je levo.', 'De bank is links.'),
        s('Škola je desno.', 'De school is rechts.'),
        s('Idite pravo.', 'Ga rechtdoor.', { nlAlts: ['Gaat u rechtdoor.', 'Loop rechtdoor.', 'Ga rechtdoor.'] }),
        s('Park je ovde.', 'Het park is hier.'),
        s('Prodavnica je tamo.', 'De winkel is daar.'),
        s('Da li je daleko?', 'Is het ver?', { srAlts: ['Je li daleko?'], nlAlts: ['Is het ver weg?'] }),
        s('Ne, blizu je.', 'Nee, het is dichtbij.', { nlAlts: ['Nee, het is vlakbij.', 'Nee, dichtbij.'] }),
        s('Hotel je blizu.', 'Het hotel is dichtbij.', { nlAlts: ['Het hotel is vlakbij.'] })
      ]
    },
    {
      title: 'Ik ben in…',
      words: [
        w('u', 'in', '📥'),
        w('na', 'op', '🔛', { nlAlts: ['aan'] }),
        w('kod kuće', 'thuis', '🏡'),
        w('stanica', 'station', '🚉'),
        w('pijaca', 'markt', '🧺'),
        w('crkva', 'kerk', '⛪'),
        w('muzej', 'museum', '🏛️')
      ],
      sentences: [
        s('Ja sam u gradu.', 'Ik ben in de stad.', { srAlts: ['U gradu sam.'] }),
        s('Ona je u školi.', 'Zij is op school.', { nlAlts: ['Zij is in de school.', 'Zij is op de school.'] }),
        s('Mi smo na pijaci.', 'Wij zijn op de markt.', { srAlts: ['Na pijaci smo.'] }),
        s('On je kod kuće.', 'Hij is thuis.'),
        s('Muzej je u centru.', 'Het museum is in het centrum.'),
        s('Gde je stanica?', 'Waar is het station?'),
        s('Crkva je blizu.', 'De kerk is dichtbij.', { nlAlts: ['De kerk is vlakbij.'] }),
        s('Ana je u Beogradu.', 'Ana is in Belgrado.')
      ]
    },
    {
      title: 'Ik ga naar…',
      words: [
        w('idem', 'ik ga', '🚶', { nlAlts: ['ga'] }),
        w('ideš', 'jij gaat', '🏃', { nlAlts: ['gaat', 'je gaat'] }),
        w('ide', 'gaat', '🚶‍♀️', { note: 'on/ona ide = hij/zij gaat' }),
        w('idemo', 'we gaan', '👣', { nlAlts: ['wij gaan', 'laten we gaan', 'kom op'] }),
        w('sada', 'nu', '⏱️', { srAlts: ['sad'] }),
        w('kući', 'naar huis', '🏠')
      ],
      sentences: [
        s('Idem u grad.', 'Ik ga naar de stad.', { srAlts: ['Ja idem u grad.'] }),
        s('Idem kući.', 'Ik ga naar huis.', { srAlts: ['Ja idem kući.'] }),
        s('Gde ideš?', 'Waar ga jij naartoe?', { srAlts: ['Gde ti ideš?'], nlAlts: ['Waar ga jij heen?', 'Waar ga jij?', 'Waar ga jij naar toe?'] }),
        s('Ona ide u školu.', 'Zij gaat naar school.'),
        s('Sada idem na pijacu.', 'Nu ga ik naar de markt.', { srAlts: ['Idem sada na pijacu.', 'Sad idem na pijacu.'], nlAlts: ['Ik ga nu naar de markt.'] }),
        s('Idemo u park!', 'We gaan naar het park!', { nlAlts: ['Laten we naar het park gaan!', 'Wij gaan naar het park!'] }),
        s('Marko ide u banku.', 'Marko gaat naar de bank.'),
        s('Idemo kući.', 'We gaan naar huis.', { nlAlts: ['Laten we naar huis gaan.', 'Wij gaan naar huis.'] })
      ]
    }
  ]
});

export const u8 = unit({
  id: 'u8',
  title: 'Dagelijks leven',
  description: 'Werkwoorden: spreken, werken, wonen en hobby\'s',
  emoji: '⚽',
  color: '#5f3dc4',
  guide: [
    {
      title: 'Drie groepen werkwoorden',
      body: [
        'In de tegenwoordige tijd eindigt de ik-vorm van bijna elk werkwoord op -m. Er zijn drie groepen:',
        '| -am: čitam, čitaš, čita, čitamo, čitate, čitaju | lezen',
        '| -im: govorim, govoriš, govori, govorimo, govorite, govore | spreken',
        '| -em: pišem, pišeš, piše, pišemo, pišete, pišu | schrijven',
        'Uitzondering: hoću (ik wil) en mogu (ik kan) eindigen op -u.'
      ]
    },
    {
      title: 'Talen',
      body: [
        'Talen schrijf je met een kleine letter: srpski (Servisch), holandski (Nederlands), engleski (Engels).',
        '"Govoriš li srpski?" en "Da li govoriš srpski?" betekenen allebei "Spreek jij Servisch?".'
      ]
    },
    {
      title: 'Graag doen: volim da …',
      body: [
        'Wil je zeggen dat je iets graag doet, gebruik dan "volim da" + werkwoord in de juiste vorm:',
        '| Volim da čitam. | Ik lees graag.',
        '| Ona voli da peva. | Zij zingt graag.',
        '| Da li voliš da plivaš? | Zwem jij graag?'
      ]
    }
  ],
  lessons: [
    {
      title: 'Spreek je Servisch?',
      words: [
        w('govorim', 'ik spreek', '🗣️', { nlAlts: ['spreek'] }),
        w('govoriš', 'jij spreekt', '💬', { nlAlts: ['spreek je', 'je spreekt', 'spreekt'] }),
        w('srpski', 'Servisch', '🇷🇸'),
        w('holandski', 'Nederlands', '🇳🇱', { nlAlts: ['Hollands'] }),
        w('engleski', 'Engels', '🇬🇧'),
        w('malo', 'een beetje', '🤏', { nlAlts: ['beetje', 'weinig'] }),
        w('razumem', 'ik begrijp', '💡', { nlAlts: ['begrijp', 'ik snap'] })
      ],
      sentences: [
        s('Govorim srpski.', 'Ik spreek Servisch.', { srAlts: ['Ja govorim srpski.'] }),
        s('Govoriš li holandski?', 'Spreek jij Nederlands?', { srAlts: ['Da li govoriš holandski?', 'Da li ti govoriš holandski?'] }),
        s('Malo govorim srpski.', 'Ik spreek een beetje Servisch.', { srAlts: ['Govorim malo srpski.', 'Ja govorim malo srpski.'] }),
        s('Ne razumem.', 'Ik begrijp het niet.', { srAlts: ['Ja ne razumem.'], nlAlts: ['Ik snap het niet.', 'Ik begrijp niet.', 'Dat begrijp ik niet.'] }),
        s('Razumem!', 'Ik begrijp het!', { nlAlts: ['Ik snap het!', 'Begrepen!'] }),
        s('On govori engleski.', 'Hij spreekt Engels.'),
        s('Da li razumeš?', 'Begrijp jij het?', { srAlts: ['Razumeš li?'], nlAlts: ['Snap jij het?', 'Begrijp jij?'] }),
        s('Govorite li engleski?', 'Spreekt u Engels?', { srAlts: ['Da li govorite engleski?'], nlAlts: ['Spreken jullie Engels?'] })
      ]
    },
    {
      title: 'Werken en leren',
      words: [
        w('radim', 'ik werk', '👷', { nlAlts: ['werk', 'ik doe'] }),
        w('učim', 'ik leer', '📚', { nlAlts: ['leer', 'ik studeer'] }),
        w('čitam', 'ik lees', '📖', { nlAlts: ['lees'] }),
        w('pišem', 'ik schrijf', '✍️', { nlAlts: ['schrijf'] }),
        w('pismo', 'brief', '✉️'),
        w('posao', 'baan', '💼', { nlAlts: ['werk'] })
      ],
      sentences: [
        s('Ja radim.', 'Ik werk.', { srAlts: ['Radim.'] }),
        s('Učim srpski.', 'Ik leer Servisch.', { srAlts: ['Ja učim srpski.'] }),
        s('Čitam knjigu.', 'Ik lees een boek.', { srAlts: ['Ja čitam knjigu.'] }),
        s('Pišem pismo.', 'Ik schrijf een brief.', { srAlts: ['Ja pišem pismo.'] }),
        s('Ona radi u banci.', 'Zij werkt bij de bank.', { nlAlts: ['Zij werkt bij een bank.', 'Zij werkt in de bank.', 'Zij werkt in een bank.'] }),
        s('Gde radiš?', 'Waar werk jij?', { srAlts: ['Gde ti radiš?'] }),
        s('Ana čita i piše.', 'Ana leest en schrijft.'),
        s('Imam novi posao.', 'Ik heb een nieuwe baan.', { srAlts: ['Imam nov posao.', 'Ja imam novi posao.'], nlAlts: ['Ik heb nieuw werk.'] })
      ]
    },
    {
      title: 'Thuis',
      words: [
        w('živim', 'ik woon', '🏘️', { nlAlts: ['woon', 'ik leef'] }),
        w('spavam', 'ik slaap', '😴', { nlAlts: ['slaap'] }),
        w('gledam', 'ik kijk', '👀', { nlAlts: ['kijk'] }),
        w('slušam', 'ik luister', '🎧', { nlAlts: ['luister'] }),
        w('muzika', 'muziek', '🎵'),
        w('film', 'film', '🎬'),
        w('televizija', 'televisie', '📺', { nlAlts: ['tv'] })
      ],
      sentences: [
        s('Živim u Holandiji.', 'Ik woon in Nederland.', { srAlts: ['Ja živim u Holandiji.'] }),
        s('Gde živiš?', 'Waar woon jij?', { srAlts: ['Gde ti živiš?'] }),
        s('Ona živi u Beogradu.', 'Zij woont in Belgrado.'),
        s('Gledam film.', 'Ik kijk een film.', { srAlts: ['Ja gledam film.'], nlAlts: ['Ik kijk naar een film.', 'Ik kijk de film.'] }),
        s('Slušam muziku.', 'Ik luister naar muziek.', { srAlts: ['Ja slušam muziku.'], nlAlts: ['Ik luister muziek.'] }),
        s('Mačka spava.', 'De kat slaapt.', { nlAlts: ['De poes slaapt.'] }),
        s('Gledamo televiziju.', 'Wij kijken televisie.', { srAlts: ['Mi gledamo televiziju.'], nlAlts: ['Wij kijken tv.'] }),
        s('Volim da slušam muziku.', 'Ik luister graag naar muziek.', { srAlts: ['Ja volim da slušam muziku.'], nlAlts: ['Ik luister graag muziek.'] })
      ]
    },
    {
      title: 'Hobby\'s',
      words: [
        w('igram', 'ik speel', '🎮', { nlAlts: ['speel'] }),
        w('fudbal', 'voetbal', '⚽'),
        w('kuvam', 'ik kook', '🍳', { nlAlts: ['kook'] }),
        w('plivam', 'ik zwem', '🏊', { nlAlts: ['zwem'] }),
        w('trčim', 'ik ren', '🏃', { nlAlts: ['ren', 'ik loop hard'] }),
        w('pevam', 'ik zing', '🎤', { nlAlts: ['zing'] }),
        w('volim da', 'ik doe graag', '🥰', { note: 'volim da plivam = ik zwem graag' })
      ],
      sentences: [
        s('Igram fudbal.', 'Ik speel voetbal.', { srAlts: ['Ja igram fudbal.'] }),
        s('Volim da kuvam.', 'Ik kook graag.', { srAlts: ['Ja volim da kuvam.'], nlAlts: ['Ik hou van koken.'] }),
        s('Ona voli da peva.', 'Zij zingt graag.', { nlAlts: ['Zij houdt van zingen.'] }),
        s('Da li voliš da plivaš?', 'Zwem jij graag?', { srAlts: ['Voliš li da plivaš?'], nlAlts: ['Hou jij van zwemmen?'] }),
        s('Trčim u parku.', 'Ik ren in het park.', { srAlts: ['Ja trčim u parku.'], nlAlts: ['Ik loop hard in het park.', 'Ik hardloop in het park.'] }),
        s('Mi igramo fudbal.', 'Wij spelen voetbal.', { srAlts: ['Igramo fudbal.'] }),
        s('On ne voli da kuva.', 'Hij kookt niet graag.', { nlAlts: ['Hij houdt niet van koken.'] }),
        s('Pevam i plivam.', 'Ik zing en zwem.', { srAlts: ['Ja pevam i plivam.'], nlAlts: ['Ik zing en ik zwem.'] })
      ]
    }
  ]
});

export const u9 = unit({
  id: 'u9',
  title: 'Tijd en weer',
  description: 'Dagen, klokkijken, seizoenen en het weer',
  emoji: '📅',
  color: '#1971c2',
  guide: [
    {
      title: 'De dagen van de week',
      body: [
        'De dagen schrijf je met een kleine letter. Op een dag = "u" + accusatief: u ponedeljak (op maandag), u subotu (op zaterdag), u nedelju (op zondag).',
        '| ponedeljak | maandag',
        '| utorak | dinsdag',
        '| sreda | woensdag',
        '| četvrtak | donderdag',
        '| petak | vrijdag',
        '| subota | zaterdag',
        '| nedelja | zondag'
      ]
    },
    {
      title: 'Hoe laat is het?',
      body: [
        '"Koliko je sati?" = "Hoe laat is het?". Na 1 zeg je sat, na 2–4 sata en na 5+ sati: jedan sat, tri sata, pet sati.',
        '"Om" is "u": u osam sati = om acht uur.',
        'Handig: "half" werkt net als in het Nederlands! Pola devet = half negen (8:30).'
      ]
    },
    {
      title: 'Het weer',
      body: [
        '"Vreme" betekent zowel "weer" als "tijd". "Pada kiša" (letterlijk: regen valt) = het regent. "Pada sneg" = het sneeuwt.'
      ],
      examples: [
        { sr: 'Kakvo je vreme danas?', nl: 'Hoe is het weer vandaag?' },
        { sr: 'Danas je sunčano.', nl: 'Vandaag is het zonnig.' }
      ]
    }
  ],
  lessons: [
    {
      title: 'Dagen van de week',
      words: [
        w('ponedeljak', 'maandag', '1️⃣'),
        w('utorak', 'dinsdag', '2️⃣'),
        w('sreda', 'woensdag', '3️⃣'),
        w('četvrtak', 'donderdag', '4️⃣'),
        w('petak', 'vrijdag', '5️⃣'),
        w('subota', 'zaterdag', '6️⃣'),
        w('nedelja', 'zondag', '7️⃣')
      ],
      sentences: [
        s('Danas je ponedeljak.', 'Vandaag is het maandag.', { nlAlts: ['Het is vandaag maandag.', 'Vandaag is maandag.'] }),
        s('Sutra je petak.', 'Morgen is het vrijdag.', { nlAlts: ['Het is morgen vrijdag.', 'Morgen is vrijdag.'] }),
        s('U subotu idem u park.', 'Op zaterdag ga ik naar het park.', { srAlts: ['Idem u park u subotu.'], nlAlts: ['Zaterdag ga ik naar het park.', 'Ik ga zaterdag naar het park.', 'Ik ga op zaterdag naar het park.'] }),
        s('U petak radim.', 'Op vrijdag werk ik.', { srAlts: ['Radim u petak.'], nlAlts: ['Vrijdag werk ik.', 'Ik werk op vrijdag.', 'Ik werk vrijdag.'] }),
        s('Utorak i sreda.', 'Dinsdag en woensdag.'),
        s('Danas je četvrtak.', 'Vandaag is het donderdag.', { nlAlts: ['Het is vandaag donderdag.', 'Vandaag is donderdag.'] }),
        s('Sutra je subota.', 'Morgen is het zaterdag.', { nlAlts: ['Het is morgen zaterdag.', 'Morgen is zaterdag.'] }),
        s('Volim nedelju.', 'Ik hou van zondag.', { nlAlts: ['Ik hou van zondagen.'] })
      ]
    },
    {
      title: 'Vandaag en morgen',
      words: [
        w('danas', 'vandaag', '📆'),
        w('sutra', 'morgen', '🔜'),
        w('juče', 'gisteren', '⏪'),
        w('dan', 'dag', '🌞'),
        w('noć', 'nacht', '🌃'),
        w('jutro', 'ochtend', '🌄', { nlAlts: ['morgen'] }),
        w('šta', 'wat', '❓')
      ],
      sentences: [
        s('Danas je lep dan.', 'Vandaag is het een mooie dag.', { nlAlts: ['Het is vandaag een mooie dag.', 'Vandaag is een mooie dag.'] }),
        s('Šta radiš sutra?', 'Wat doe jij morgen?', { srAlts: ['Šta ćeš raditi sutra?', 'Šta ti radiš sutra?'] }),
        s('Juče je bio ponedeljak.', 'Gisteren was het maandag.', { nlAlts: ['Het was gisteren maandag.', 'Gisteren was maandag.'] }),
        s('Ujutru pijem kafu.', "'s Ochtends drink ik koffie.", { srAlts: ['Pijem kafu ujutru.'], nlAlts: ["'s Morgens drink ik koffie.", 'In de ochtend drink ik koffie.', "Ik drink 's ochtends koffie.", "Ik drink 's morgens koffie."] }),
        s('Uveče gledam film.', "'s Avonds kijk ik een film.", { srAlts: ['Gledam film uveče.'], nlAlts: ["Ik kijk 's avonds een film.", 'In de avond kijk ik een film.'] }),
        s('Sutra idem u Beograd.', 'Morgen ga ik naar Belgrado.', { srAlts: ['Idem u Beograd sutra.'], nlAlts: ['Ik ga morgen naar Belgrado.'] }),
        s('Šta je ovo?', 'Wat is dit?'),
        s('Noć je hladna.', 'De nacht is koud.')
      ]
    },
    {
      title: 'Hoe laat is het?',
      words: [
        w('sat', 'uur', '⏰', { nlAlts: ['klok', 'horloge'] }),
        w('koliko je sati', 'hoe laat is het', '🕰️'),
        w('pola', 'half', '🌓'),
        w('rano', 'vroeg', '🐓'),
        w('kasno', 'laat', '🦉'),
        w('minut', 'minuut', '⏲️')
      ],
      sentences: [
        s('Koliko je sati?', 'Hoe laat is het?'),
        s('Sada je tri sata.', 'Het is nu drie uur.', { srAlts: ['Sad je tri sata.'], nlAlts: ['Nu is het drie uur.'] }),
        s('Sada je pet sati.', 'Het is nu vijf uur.', { srAlts: ['Sad je pet sati.'], nlAlts: ['Nu is het vijf uur.'] }),
        s('Idem u školu u osam sati.', 'Ik ga om acht uur naar school.', { srAlts: ['U osam sati idem u školu.'], nlAlts: ['Om acht uur ga ik naar school.'] }),
        s('Pola devet.', 'Half negen.'),
        s('Kasno je!', 'Het is laat!'),
        s('Rano je.', 'Het is vroeg.'),
        s('Film je u sedam sati.', 'De film is om zeven uur.', { nlAlts: ['De film begint om zeven uur.'] }),
        s('Deset minuta.', 'Tien minuten.')
      ]
    },
    {
      title: 'Seizoenen en weer',
      words: [
        w('leto', 'zomer', '🏖️'),
        w('zima', 'winter', '⛄'),
        w('proleće', 'lente', '🌸', { nlAlts: ['voorjaar'] }),
        w('jesen', 'herfst', '🍂', { nlAlts: ['najaar'] }),
        w('vreme', 'weer', '🌦️', { nlAlts: ['tijd'] }),
        w('kiša', 'regen', '🌧️'),
        w('sneg', 'sneeuw', '🌨️'),
        w('sunčano', 'zonnig', '☀️')
      ],
      sentences: [
        s('Leto je toplo.', 'De zomer is warm.', { nlAlts: ['In de zomer is het warm.'] }),
        s('Zima je hladna.', 'De winter is koud.', { nlAlts: ['In de winter is het koud.'] }),
        s('Pada kiša.', 'Het regent.'),
        s('Pada sneg.', 'Het sneeuwt.'),
        s('Kakvo je vreme danas?', 'Hoe is het weer vandaag?', { srAlts: ['Kakvo je danas vreme?'], nlAlts: ['Wat voor weer is het vandaag?'] }),
        s('Danas je sunčano.', 'Vandaag is het zonnig.', { nlAlts: ['Het is vandaag zonnig.'] }),
        s('Volim proleće.', 'Ik hou van de lente.', { srAlts: ['Ja volim proleće.'], nlAlts: ['Ik hou van het voorjaar.'] }),
        s('Jesen je lepa.', 'De herfst is mooi.')
      ]
    }
  ]
});
