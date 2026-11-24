import { unit, w, s } from '../build';

export const u13 = unit({
  id: 'u13',
  title: 'Werk en school',
  description: 'Beroepen, school en huiswerk',
  emoji: '🎒',
  color: '#3b5bdb',
  guide: [
    {
      title: 'Beroepen',
      body: [
        'Ook beroepen hebben vaak een mannelijke en een vrouwelijke vorm:',
        '| učitelj / učiteljica | leraar / lerares',
        '| kuvar / kuvarica | kok',
        '| prodavac / prodavačica | verkoper / verkoopster',
        '| lekar / lekarka | dokter',
        'Wat iemands beroep is, vraag je met: "Šta si po zanimanju?" (Wat doe je voor werk?)'
      ]
    },
    {
      title: 'Ik wil … worden',
      body: ['"Želim da budem …" betekent "ik wil … worden/zijn". "Želim da budem lekar" = "Ik wil dokter worden".']
    }
  ],
  lessons: [
    {
      title: 'Beroepen',
      words: [
        w('učitelj', 'leraar', '👨‍🏫', { nlAlts: ['meester', 'docent'] }),
        w('učiteljica', 'lerares', '👩‍🏫', { nlAlts: ['juf', 'docente'] }),
        w('kuvar', 'kok', '👨‍🍳'),
        w('vozač', 'chauffeur', '🚕', { nlAlts: ['bestuurder'] }),
        w('policajac', 'agent', '👮', { nlAlts: ['politieagent', 'politieman'] }),
        w('prodavac', 'verkoper', '🧑‍💼'),
        w('inženjer', 'ingenieur', '👷')
      ],
      sentences: [
        s('Moja majka je učiteljica.', 'Mijn moeder is lerares.', { nlAlts: ['Mijn moeder is juf.', 'Mijn moeder is docente.'] }),
        s('On je kuvar u restoranu.', 'Hij is kok in een restaurant.', { nlAlts: ['Hij is kok in het restaurant.'] }),
        s('Moj otac je inženjer.', 'Mijn vader is ingenieur.'),
        s('Šta si po zanimanju?', 'Wat doe jij voor werk?', { srAlts: ['Šta si ti po zanimanju?'], nlAlts: ['Wat is jouw beroep?', 'Wat is je beroep?'] }),
        s('Prodavac je ljubazan.', 'De verkoper is vriendelijk.', { nlAlts: ['De verkoper is aardig.'] }),
        s('Policajac je na ulici.', 'De agent is op straat.', { nlAlts: ['De politieagent is op straat.'] }),
        s('Želim da budem lekar.', 'Ik wil dokter worden.', { srAlts: ['Ja želim da budem lekar.', 'Želim da budem lekarka.'], nlAlts: ['Ik wil arts worden.'] }),
        s('Vozač je mlad.', 'De chauffeur is jong.', { nlAlts: ['De bestuurder is jong.'] })
      ]
    },
    {
      title: 'Op school',
      words: [
        w('olovka', 'potlood', '✏️', { nlAlts: ['pen'] }),
        w('sveska', 'schrift', '📓'),
        w('torba', 'tas', '🎒', { nlAlts: ['schooltas'] }),
        w('domaći zadatak', 'huiswerk', '📝'),
        w('ispit', 'toets', '📄', { nlAlts: ['examen', 'proefwerk'] }),
        w('pitanje', 'vraag', '❓'),
        w('odgovor', 'antwoord', '💬'),
        w('težak', 'moeilijk', '🧗', { nlAlts: ['zwaar'], note: 'vrouwelijk: teška, onzijdig: teško' })
      ],
      sentences: [
        s('Imam olovku i svesku.', 'Ik heb een potlood en een schrift.', { srAlts: ['Ja imam olovku i svesku.'] }),
        s('Gde je moja torba?', 'Waar is mijn tas?', { nlAlts: ['Waar is mijn schooltas?'] }),
        s('Danas imam ispit.', 'Vandaag heb ik een toets.', { srAlts: ['Imam ispit danas.'], nlAlts: ['Ik heb vandaag een toets.', 'Vandaag heb ik een examen.', 'Ik heb vandaag een examen.'] }),
        s('Radim domaći zadatak.', 'Ik maak mijn huiswerk.', { srAlts: ['Ja radim domaći zadatak.', 'Pišem domaći zadatak.'], nlAlts: ['Ik maak huiswerk.', 'Ik doe mijn huiswerk.'] }),
        s('Imam pitanje.', 'Ik heb een vraag.', { srAlts: ['Ja imam pitanje.'] }),
        s('Odgovor je tačan.', 'Het antwoord is goed.', { nlAlts: ['Het antwoord is juist.', 'Het antwoord is correct.'] }),
        s('Učiteljica je u učionici.', 'De lerares is in het klaslokaal.', { nlAlts: ['De juf is in de klas.', 'De lerares is in de klas.'] }),
        s('Ispit je težak.', 'De toets is moeilijk.', { nlAlts: ['Het examen is moeilijk.'] })
      ]
    }
  ]
});

export const u14 = unit({
  id: 'u14',
  title: 'Verleden tijd',
  description: 'Vertellen wat je gisteren hebt gedaan',
  emoji: '⏮️',
  color: '#a61e4d',
  guide: [
    {
      title: 'De verleden tijd maken',
      body: [
        'De verleden tijd is in het Servisch eigenlijk makkelijk! Je neemt de korte vorm van "biti" (sam, si, je …) en een vorm van het werkwoord die eindigt op -o, -la of -li:',
        '| radio sam | ik heb gewerkt (jongen)',
        '| radila sam | ik heb gewerkt (meisje)',
        '| radili smo | wij hebben gewerkt',
        'Er is maar één verleden tijd: "radila sam" betekent zowel "ik werkte" als "ik heb gewerkt".'
      ]
    },
    {
      title: 'Jongen of meisje?',
      body: [
        'De vorm hangt af van wie het zegt of over wie het gaat:',
        '| mannelijk: -o | bio, radio, gledao, išao',
        '| vrouwelijk: -la | bila, radila, gledala, išla',
        '| meervoud: -li | bili, radili, gledali, išli',
        'In deze unit gebruiken we vaak de vrouwelijke vorm (bila sam), maar de mannelijke (bio sam) wordt ook goed gerekend.'
      ]
    },
    {
      title: 'Woordvolgorde',
      body: [
        'Ook hier mag "sam, si, je" niet vooraan staan: "Bila sam kod kuće" of "Juče sam bila kod kuće", maar nooit "Sam bila…".',
        'Bij "on/ona" (hij/zij) gebruik je "je": "On je bio u školi", of korter: "Bio je u školi".'
      ]
    }
  ],
  lessons: [
    {
      title: 'Ik was…',
      words: [
        w('bila sam', 'ik was', '🙋‍♀️', { srAlts: ['bio sam'], note: 'meisje: bila sam, jongen: bio sam' }),
        w('bio', 'was', '👨', { note: 'mannelijk: on je bio = hij was' }),
        w('bila', 'was', '👩', { note: 'vrouwelijk: ona je bila = zij was' }),
        w('bili', 'waren', '👥', { note: 'meervoud: mi smo bili = wij waren' }),
        w('bilo', 'was', '🌡️', { note: 'onzijdig: bilo je hladno = het was koud' }),
        w('prošle godine', 'vorig jaar', '🗓️')
      ],
      sentences: [
        s('Juče sam bila kod kuće.', 'Gisteren was ik thuis.', { srAlts: ['Juče sam bio kod kuće.', 'Bila sam kod kuće juče.', 'Bio sam kod kuće juče.'], nlAlts: ['Ik was gisteren thuis.'] }),
        s('Gde si bila?', 'Waar was jij?', { srAlts: ['Gde si bio?', 'Gde si ti bila?', 'Gde si ti bio?'] }),
        s('Bila sam u Beogradu.', 'Ik was in Belgrado.', { srAlts: ['Bio sam u Beogradu.', 'Ja sam bila u Beogradu.', 'Ja sam bio u Beogradu.'] }),
        s('On je bio u školi.', 'Hij was op school.', { srAlts: ['Bio je u školi.'], nlAlts: ['Hij was in de school.'] }),
        s('Mi smo bili na moru.', 'Wij waren aan zee.', { srAlts: ['Bili smo na moru.'], nlAlts: ['Wij waren aan de zee.', 'Wij waren bij de zee.'] }),
        s('Ona je bila umorna.', 'Zij was moe.', { srAlts: ['Bila je umorna.'] }),
        s('Juče je bilo hladno.', 'Gisteren was het koud.', { srAlts: ['Bilo je hladno juče.'], nlAlts: ['Het was gisteren koud.'] }),
        s('Prošle godine smo bili u Nišu.', 'Vorig jaar waren wij in Niš.', { srAlts: ['Bili smo u Nišu prošle godine.'], nlAlts: ['Wij waren vorig jaar in Niš.', 'Vorig jaar waren wij in Nis.'] })
      ]
    },
    {
      title: 'Wat heb je gedaan?',
      words: [
        w('radila sam', 'ik heb gewerkt', '💼', { srAlts: ['radio sam'], nlAlts: ['ik werkte', 'ik deed'] }),
        w('gledala sam', 'ik heb gekeken', '📺', { srAlts: ['gledao sam'], nlAlts: ['ik keek'] }),
        w('čitala sam', 'ik heb gelezen', '📖', { srAlts: ['čitao sam'], nlAlts: ['ik las'] }),
        w('jeo', 'gegeten', '🍽️', { note: 'vrouwelijk: jela' }),
        w('pila', 'gedronken', '🥤', { note: 'mannelijk: pio' }),
        w('učili smo', 'wij hebben geleerd', '📚', { nlAlts: ['we leerden', 'wij leerden'] })
      ],
      sentences: [
        s('Juče sam radila.', 'Gisteren heb ik gewerkt.', { srAlts: ['Juče sam radio.', 'Radila sam juče.', 'Radio sam juče.'], nlAlts: ['Ik heb gisteren gewerkt.', 'Gisteren werkte ik.', 'Ik werkte gisteren.'] }),
        s('Gledala sam film.', 'Ik heb een film gekeken.', { srAlts: ['Gledao sam film.', 'Ja sam gledala film.'], nlAlts: ['Ik keek een film.', 'Ik heb naar een film gekeken.'] }),
        s('Šta si radila juče?', 'Wat heb jij gisteren gedaan?', { srAlts: ['Šta si radio juče?', 'Šta si juče radila?', 'Šta si juče radio?'], nlAlts: ['Wat deed jij gisteren?'] }),
        s('Čitala sam knjigu.', 'Ik heb een boek gelezen.', { srAlts: ['Čitao sam knjigu.'], nlAlts: ['Ik las een boek.'] }),
        s('On je jeo ribu.', 'Hij heeft vis gegeten.', { srAlts: ['Jeo je ribu.'], nlAlts: ['Hij at vis.'] }),
        s('Ona je pila kafu.', 'Zij heeft koffie gedronken.', { srAlts: ['Pila je kafu.'], nlAlts: ['Zij dronk koffie.'] }),
        s('Učili smo srpski.', 'Wij hebben Servisch geleerd.', { srAlts: ['Mi smo učili srpski.'], nlAlts: ['Wij leerden Servisch.'] }),
        s('Šta ste jeli?', 'Wat hebben jullie gegeten?', { nlAlts: ['Wat heeft u gegeten?', 'Wat aten jullie?'] })
      ]
    },
    {
      title: 'Ik ging…',
      words: [
        w('išla sam', 'ik ging', '🚶‍♀️', { srAlts: ['išao sam'], nlAlts: ['ik ben gegaan'] }),
        w('došla sam', 'ik kwam', '🏃‍♀️', { srAlts: ['došao sam'], nlAlts: ['ik ben gekomen'] }),
        w('putovali smo', 'wij reisden', '✈️', { nlAlts: ['we reisden', 'wij zijn gereisd'] }),
        w('videla sam', 'ik zag', '👀', { srAlts: ['video sam'], nlAlts: ['ik heb gezien'] }),
        w('kupila sam', 'ik kocht', '🛒', { srAlts: ['kupio sam'], nlAlts: ['ik heb gekocht'] }),
        w('tvoj', 'jouw', '🫵', { nlAlts: ['je'], note: 'tvoj brat, tvoja sestra, tvoje ime' })
      ],
      sentences: [
        s('Išla sam u grad.', 'Ik ging naar de stad.', { srAlts: ['Išao sam u grad.'], nlAlts: ['Ik ben naar de stad gegaan.'] }),
        s('Došla sam kući kasno.', 'Ik kwam laat thuis.', { srAlts: ['Došao sam kući kasno.', 'Kasno sam došla kući.', 'Kasno sam došao kući.'], nlAlts: ['Ik ben laat thuisgekomen.', 'Ik kwam laat naar huis.'] }),
        s('Putovali smo u Srbiju.', 'Wij zijn naar Servië gereisd.', { srAlts: ['Mi smo putovali u Srbiju.'], nlAlts: ['Wij reisden naar Servië.'] }),
        s('Videla sam tvog brata.', 'Ik heb jouw broer gezien.', { srAlts: ['Video sam tvog brata.'], nlAlts: ['Ik zag jouw broer.', 'Ik zag je broer.', 'Ik heb je broer gezien.'] }),
        s('Kupila sam novu haljinu.', 'Ik heb een nieuwe jurk gekocht.', { srAlts: ['Kupio sam novu haljinu.'], nlAlts: ['Ik kocht een nieuwe jurk.'] }),
        s('On je išao na posao.', 'Hij ging naar zijn werk.', { srAlts: ['Išao je na posao.'], nlAlts: ['Hij is naar zijn werk gegaan.', 'Hij ging naar het werk.'] }),
        s('Kada si došla?', 'Wanneer ben jij gekomen?', { srAlts: ['Kada si došao?'], nlAlts: ['Wanneer kwam jij?'] }),
        s('Videli smo more.', 'Wij hebben de zee gezien.', { srAlts: ['Mi smo videli more.'], nlAlts: ['Wij zagen de zee.'] })
      ]
    }
  ]
});

export const u15 = unit({
  id: 'u15',
  title: 'Plannen maken',
  description: 'De toekomst, moeten, kunnen en feestjes',
  emoji: '🎉',
  color: '#087f5b',
  guide: [
    {
      title: 'De toekomende tijd',
      body: [
        'De toekomst maak je met ću, ćeš, će … + het hele werkwoord (de infinitief, die meestal op -ti of -ći eindigt):',
        '| ja ću raditi | ik zal werken / ik ga werken',
        '| ti ćeš raditi | jij zult werken',
        '| on/ona će raditi | hij/zij zal werken',
        '| mi ćemo / vi ćete / oni će | wij / jullie / zij zullen',
        'Staat het werkwoord vooraan, dan smelt alles samen: "Radiću" = "Ik zal werken", "Učiću" = "Ik zal leren", "Bićemo" = "We zullen zijn".'
      ]
    },
    {
      title: 'Moeten, kunnen, willen + da',
      body: [
        'Na moram (ik moet), mogu (ik kan) en želim (ik wil graag) volgt "da" + werkwoord in de gewone vorm:',
        '| Moram da radim. | Ik moet werken.',
        '| Mogu da dođem. | Ik kan komen.',
        '| Želim da putujem. | Ik wil graag reizen.'
      ]
    },
    {
      title: 'Feest!',
      body: ['"Srećan rođendan!" = "Gefeliciteerd met je verjaardag!" En bij het proosten roep je "Živeli!"']
    }
  ],
  lessons: [
    {
      title: 'Morgen ga ik…',
      words: [
        w('ću', 'ik zal', '🔮', { nlAlts: ['zal', 'ik ga'] }),
        w('ćeš', 'jij zult', '🔭', { nlAlts: ['zul je', 'ga je', 'zult'] }),
        w('će', 'zal', '⏭️', { nlAlts: ['gaat'], note: 'on/ona će = hij/zij zal' }),
        w('svaki dan', 'elke dag', '📆', { nlAlts: ['iedere dag'] }),
        w('telefon', 'telefoon', '📱', { nlAlts: ['mobiel'] }),
        w('doći', 'komen', '🚪'),
        w('ići', 'gaan', '🚶')
      ],
      sentences: [
        s('Sutra ću ići u Beograd.', 'Morgen ga ik naar Belgrado.', { srAlts: ['Ići ću sutra u Beograd.', 'Ja ću sutra ići u Beograd.'], nlAlts: ['Morgen zal ik naar Belgrado gaan.', 'Ik ga morgen naar Belgrado.'] }),
        s('Šta ćeš raditi?', 'Wat ga jij doen?', { srAlts: ['Šta ćeš ti raditi?'], nlAlts: ['Wat zul jij doen?'] }),
        s('Učiću srpski svaki dan.', 'Ik ga elke dag Servisch leren.', { srAlts: ['Ja ću učiti srpski svaki dan.', 'Svaki dan ću učiti srpski.'], nlAlts: ['Ik zal elke dag Servisch leren.', 'Ik ga iedere dag Servisch leren.'] }),
        s('Ona će doći sutra.', 'Zij komt morgen.', { srAlts: ['Doći će sutra.', 'Ona će sutra doći.'], nlAlts: ['Zij zal morgen komen.'] }),
        s('Bićemo u parku.', 'Wij zullen in het park zijn.', { srAlts: ['Mi ćemo biti u parku.'], nlAlts: ['Wij zijn in het park.'] }),
        s('Kupiću novi telefon.', 'Ik ga een nieuwe telefoon kopen.', { srAlts: ['Ja ću kupiti novi telefon.'], nlAlts: ['Ik zal een nieuwe telefoon kopen.', 'Ik koop een nieuwe telefoon.'] }),
        s('Da li ćeš doći?', 'Kom jij?', { srAlts: ['Hoćeš li doći?'], nlAlts: ['Zul jij komen?', 'Kom jij ook?'] }),
        s('Videćemo se sutra.', 'We zien elkaar morgen.', { srAlts: ['Vidimo se sutra.'], nlAlts: ['Tot morgen.', 'Wij zien elkaar morgen.'] })
      ]
    },
    {
      title: 'Moeten en kunnen',
      words: [
        w('moram', 'ik moet', '⚠️', { nlAlts: ['moet'] }),
        w('mogu', 'ik kan', '💪', { nlAlts: ['kan', 'ik mag'] }),
        w('želim', 'ik wil graag', '🌠', { nlAlts: ['ik wil', 'ik wens'] }),
        w('vikend', 'weekend', '🛋️'),
        w('rođendan', 'verjaardag', '🎂'),
        w('poklon', 'cadeau', '🎁', { nlAlts: ['cadeautje', 'kado'] }),
        w('živeli', 'proost', '🥂')
      ],
      sentences: [
        s('Moram da radim.', 'Ik moet werken.', { srAlts: ['Ja moram da radim.'] }),
        s('Mogu da dođem sutra.', 'Ik kan morgen komen.', { srAlts: ['Sutra mogu da dođem.', 'Ja mogu da dođem sutra.'] }),
        s('Želim da putujem.', 'Ik wil graag reizen.', { srAlts: ['Ja želim da putujem.'], nlAlts: ['Ik wil reizen.'] }),
        s('Za vikend idemo na planinu.', 'In het weekend gaan wij naar de bergen.', { srAlts: ['Idemo na planinu za vikend.'], nlAlts: ['Dit weekend gaan wij naar de bergen.', 'In het weekend gaan wij de bergen in.'] }),
        s('Sutra je moj rođendan!', 'Morgen is mijn verjaardag!', { nlAlts: ['Morgen ben ik jarig!', 'Morgen is het mijn verjaardag!'] }),
        s('Ovo je poklon za tebe.', 'Dit is een cadeau voor jou.', { nlAlts: ['Dit is een cadeautje voor jou.'] }),
        s('Srećan rođendan!', 'Gefeliciteerd met je verjaardag!', { nlAlts: ['Fijne verjaardag!', 'Gefeliciteerd!', 'Hartelijk gefeliciteerd!'] }),
        s('Ne mogu danas.', 'Ik kan vandaag niet.', { srAlts: ['Danas ne mogu.'] }),
        s('Živeli!', 'Proost!')
      ]
    }
  ]
});
