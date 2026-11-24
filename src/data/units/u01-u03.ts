import { unit, w, s } from '../build';

export const u1 = unit({
  id: 'u1',
  title: 'Begroeten',
  description: 'Hallo zeggen, bedanken en afscheid nemen',
  emoji: '👋',
  color: '#1c7ed6',
  guide: [
    {
      title: 'Welkom bij het Servisch!',
      body: [
        'Servisch wordt gesproken in Servië, Bosnië en Montenegro, en lijkt sterk op het Kroatisch en Bosnisch. Als je Servisch leert, kun je je dus in een groot deel van de Balkan verstaanbaar maken.',
        'Goed nieuws: Servisch spreek je uit zoals je het schrijft. Elke letter heeft altijd dezelfde klank.',
        'Servisch kent twee schriften: Latijn en Cyrillisch. In deze cursus begin je met het Latijnse schrift. In het tabblad "Letters" kun je het Cyrillische alfabet leren, en in de instellingen kun je de hele cursus in het Cyrillisch zetten.'
      ]
    },
    {
      title: 'Uitspraak van speciale letters',
      body: [
        '| č | tsj, zoals in "tsjilpen"',
        '| ć | zachte tj, zoals in "katje"',
        '| š | sj, zoals in "sjaal"',
        '| ž | zj, zoals in "garage"',
        '| đ | zachte dj, zoals in "Djokovic" (Đoković)',
        '| dž | dzj, zoals in "jeans"',
        '| c | ts, zoals in "iets"',
        '| j | j, zoals in "ja"',
        '| h | ch, zoals in "lachen"',
        'De r wordt gerold. Soms is de r zelfs een klinker, zoals in "Srbija" (Servië) en "prst" (vinger).'
      ]
    },
    {
      title: 'Formeel en informeel',
      body: [
        'Net als in het Nederlands (jij/u) is er een informele en een formele vorm. "Izvini" (sorry) zeg je tegen een vriend, "izvinite" tegen iemand die je met "u" aanspreekt.',
        '"Ćao" is heel informeel en betekent zowel "hoi" als "doei". "Zdravo" is een vriendelijk "hallo" dat je bijna altijd kunt gebruiken.'
      ],
      examples: [
        { sr: 'Zdravo!', nl: 'Hallo!' },
        { sr: 'Dobar dan!', nl: 'Goedendag!' },
        { sr: 'Hvala! – Molim.', nl: 'Bedankt! – Graag gedaan.' }
      ]
    },
    {
      title: '"Molim" – een handig woord',
      body: [
        '"Molim" betekent "alsjeblieft" als je iets vraagt, maar ook "graag gedaan" als iemand je bedankt. En als je iemand niet verstaat, zeg je "Molim?" (Wat zei je?).',
        '"Molim vas" is de beleefde vorm: "alstublieft".'
      ]
    }
  ],
  lessons: [
    {
      title: 'Hallo!',
      words: [
        w('zdravo', 'hallo', '👋', { nlAlts: ['hoi', 'dag'] }),
        w('ćao', 'hoi', '🙋', { nlAlts: ['doei', 'hallo', 'dag', 'tot ziens'], note: 'informeel: hoi én doei' }),
        w('da', 'ja', '✅'),
        w('ne', 'nee', '❌', { nlAlts: ['niet'] }),
        w('hvala', 'bedankt', '🙏', { nlAlts: ['dank je', 'dank u', 'dankjewel', 'dankuwel', 'dank je wel', 'dank u wel'] }),
        w('molim', 'alsjeblieft', '🤲', { nlAlts: ['graag gedaan', 'alstublieft', 'asjeblieft'] })
      ],
      sentences: [
        s('Zdravo!', 'Hallo!', { nlAlts: ['Hoi!', 'Dag!'] }),
        s('Ćao!', 'Hoi!', { nlAlts: ['Hallo!', 'Doei!', 'Dag!'] }),
        s('Da, hvala.', 'Ja, bedankt.', { nlAlts: ['Ja, dank je.', 'Ja, dank u.', 'Ja, dankjewel.', 'Ja, dank je wel.', 'Ja graag.'] }),
        s('Ne, hvala.', 'Nee, bedankt.', { nlAlts: ['Nee, dank je.', 'Nee, dank u.', 'Nee, dankjewel.', 'Nee, dank je wel.'] }),
        s('Hvala!', 'Bedankt!', { nlAlts: ['Dank je!', 'Dank u!', 'Dankjewel!', 'Dank je wel!'] }),
        s('Zdravo, Ana!', 'Hallo, Ana!', { nlAlts: ['Hoi, Ana!', 'Dag, Ana!'] }),
        s('Ćao, Marko!', 'Hoi, Marko!', { nlAlts: ['Hallo, Marko!', 'Doei, Marko!', 'Dag, Marko!'] }),
        s('Hvala, Ana!', 'Bedankt, Ana!', { nlAlts: ['Dank je, Ana!', 'Dankjewel, Ana!', 'Dank je wel, Ana!'] })
      ]
    },
    {
      title: 'Goedendag',
      words: [
        w('dobar dan', 'goedendag', '☀️', { nlAlts: ['goedemiddag', 'goeiedag', 'dag'] }),
        w('dobro jutro', 'goedemorgen', '🌅', { nlAlts: ['goeiemorgen'] }),
        w('dobro veče', 'goedenavond', '🌆', { nlAlts: ['goeienavond'] }),
        w('laku noć', 'welterusten', '🌙', { nlAlts: ['goedenacht', 'slaap lekker', 'goede nacht'] }),
        w('doviđenja', 'tot ziens', '🚶', { nlAlts: ['dag', 'doei'] }),
        w('vidimo se', 'tot ziens', '👀', { nlAlts: ['we zien elkaar', 'tot later', 'tot snel'], note: 'letterlijk: we zien elkaar' })
      ],
      sentences: [
        s('Dobar dan!', 'Goedendag!', { nlAlts: ['Goedemiddag!', 'Goeiedag!', 'Dag!'] }),
        s('Dobro jutro, Ana!', 'Goedemorgen, Ana!', { nlAlts: ['Goeiemorgen, Ana!'] }),
        s('Dobro veče, Marko.', 'Goedenavond, Marko.', { nlAlts: ['Goeienavond, Marko.'] }),
        s('Laku noć!', 'Welterusten!', { nlAlts: ['Goedenacht!', 'Slaap lekker!'] }),
        s('Doviđenja!', 'Tot ziens!', { nlAlts: ['Dag!'] }),
        s('Vidimo se!', 'Tot ziens!', { nlAlts: ['We zien elkaar!', 'Tot later!', 'Tot snel!'] }),
        s('Hvala, doviđenja!', 'Bedankt, tot ziens!', { nlAlts: ['Dank je, tot ziens!', 'Dank u, tot ziens!', 'Dankjewel, tot ziens!'] }),
        s('Ćao, vidimo se!', 'Doei, tot ziens!', { nlAlts: ['Hoi, tot ziens!', 'Doei, tot later!', 'Doei, we zien elkaar!', 'Dag, tot ziens!'] })
      ]
    },
    {
      title: 'Hoe gaat het?',
      words: [
        w('kako', 'hoe', '❓'),
        w('dobro', 'goed', '👍'),
        w('loše', 'slecht', '👎'),
        w('ja', 'ik', '🙋‍♀️'),
        w('ti', 'jij', '👉', { nlAlts: ['je'] }),
        w('i', 'en', '➕', { nlAlts: ['ook'] }),
        w('a', 'en', '↔️', { nlAlts: ['maar'], note: '"a" gebruik je bij een tegenstelling: "A ti?" = "En jij?"' })
      ],
      sentences: [
        s('Kako si?', 'Hoe gaat het?', { nlAlts: ['Hoe gaat het met je?', 'Hoe is het?', 'Hoe gaat het met jou?'] }),
        s('Dobro sam.', 'Het gaat goed.', { nlAlts: ['Goed.', 'Het gaat goed met me.', 'Met mij gaat het goed.', 'Het gaat goed met mij.'] }),
        s('Dobro, hvala. A ti?', 'Goed, bedankt. En jij?', { nlAlts: ['Goed, dank je. En jij?', 'Goed, dankjewel. En jij?', 'Goed, dank je wel. En jij?', 'Goed, bedankt. En met jou?'] }),
        s('Kako si, Ana?', 'Hoe gaat het, Ana?', { nlAlts: ['Hoe is het, Ana?', 'Hoe gaat het met je, Ana?'] }),
        s('Loše sam.', 'Het gaat slecht.', { nlAlts: ['Slecht.', 'Het gaat niet goed.', 'Het gaat slecht met me.'] }),
        s('Ja sam dobro.', 'Het gaat goed met mij.', { nlAlts: ['Met mij gaat het goed.', 'Het gaat goed met me.', 'Het gaat goed.'] }),
        s('A ti?', 'En jij?', { nlAlts: ['En met jou?', 'En jou?'] }),
        s('Dobro sam, a ti?', 'Het gaat goed, en met jou?', { srAlts: ['Ja sam dobro, a ti?'], nlAlts: ['Het gaat goed met mij, en met jou?', 'Het gaat goed met me, en met jou?', 'Met mij gaat het goed, en met jou?', 'Het gaat goed, en jij?', 'Goed, en jij?', 'Goed, en met jou?'] })
      ]
    },
    {
      title: 'Sorry!',
      words: [
        w('izvini', 'sorry', '😅', { nlAlts: ['pardon', 'excuus'], note: 'informeel' }),
        w('izvinite', 'pardon', '🙇', { nlAlts: ['sorry', 'neemt u mij niet kwalijk', 'excuseer'], note: 'formeel' }),
        w('nema problema', 'geen probleem', '👌'),
        w('u redu', 'oké', '🆗', { nlAlts: ['in orde', 'ok', 'goed', 'prima'] }),
        w('važi', 'oké', '🤝', { nlAlts: ['afgesproken', 'ok', 'goed', 'prima'] }),
        w('nema na čemu', 'graag gedaan', '😊', { nlAlts: ['geen dank'] })
      ],
      sentences: [
        s('Izvini!', 'Sorry!', { nlAlts: ['Pardon!'] }),
        s('Izvinite!', 'Pardon!', { nlAlts: ['Sorry!', 'Excuseer!', 'Neemt u mij niet kwalijk!'] }),
        s('Nema problema.', 'Geen probleem.'),
        s('U redu je.', 'Het is oké.', { nlAlts: ['Het is in orde.', 'Het is goed.', 'Het is ok.', 'Het is prima.'] }),
        s('Hvala! – Nema na čemu.', 'Bedankt! – Graag gedaan.', { nlAlts: ['Dank je! – Graag gedaan.', 'Dankjewel! – Graag gedaan.', 'Bedankt! – Geen dank.', 'Dank je! – Geen dank.'] }),
        s('Važi, vidimo se!', 'Oké, tot ziens!', { nlAlts: ['Oké, we zien elkaar!', 'Oké, tot later!', 'Afgesproken, tot ziens!', 'Ok, tot ziens!', 'Prima, tot ziens!'] }),
        s('Izvini, Marko!', 'Sorry, Marko!', { nlAlts: ['Pardon, Marko!'] }),
        s('Da, u redu.', 'Ja, oké.', { nlAlts: ['Ja, in orde.', 'Ja, goed.', 'Ja, prima.', 'Ja, ok.'] })
      ]
    }
  ]
});

export const u2 = unit({
  id: 'u2',
  title: 'Kennismaken',
  description: 'Jezelf voorstellen en zeggen waar je vandaan komt',
  emoji: '🤝',
  color: '#e8590c',
  guide: [
    {
      title: 'Het werkwoord "biti" (zijn)',
      body: [
        'Het belangrijkste werkwoord is "biti" (zijn). In een gewone zin gebruik je de korte vormen:',
        '| ja sam | ik ben',
        '| ti si | jij bent',
        '| on / ona / ono je | hij / zij / het is',
        '| mi smo | wij zijn',
        '| vi ste | jullie zijn / u bent',
        '| oni / one su | zij zijn'
      ],
      examples: [
        { sr: 'Ja sam Ana.', nl: 'Ik ben Ana.' },
        { sr: 'On je student.', nl: 'Hij is student.' }
      ]
    },
    {
      title: 'Het voornaamwoord mag weg',
      body: [
        'Omdat je aan het werkwoord al ziet wie het doet, laten Serviërs "ja", "ti" enzovoort vaak weg. "Ja sam Ana" en "Ana sam" betekenen allebei "Ik ben Ana".',
        'Let op: de korte vorm (sam, si, je…) mag nooit vooraan in de zin staan. Je zegt dus "Student sam" en niet "Sam student".'
      ]
    },
    {
      title: 'Ontkennen en vragen',
      body: [
        'Ontkennen doe je met "ni-": nisam (ik ben niet), nisi, nije, nismo, niste, nisu.',
        'Een ja/nee-vraag maak je met "Da li …?" aan het begin: "Da li si ti student?" = "Ben jij student?".',
        'Servisch heeft geen lidwoorden: geen "de", "het" of "een". "Student" betekent dus "student", "een student" of "de student".'
      ],
      examples: [
        { sr: 'Ja nisam student.', nl: 'Ik ben geen student.' },
        { sr: 'Da li si ti Holanđanka?', nl: 'Ben jij Nederlandse?' }
      ]
    },
    {
      title: 'Waar kom je vandaan?',
      body: [
        'Na "iz" (uit) verandert de uitgang van het woord (dat heet de genitief). Woorden op -a krijgen -e, mannelijke woorden krijgen -a:',
        '| Srbija → iz Srbije | uit Servië',
        '| Holandija → iz Holandije | uit Nederland',
        '| Beograd → iz Beograda | uit Belgrado',
        'Je hoeft dit nog niet uit je hoofd te leren – je pikt het vanzelf op!'
      ]
    },
    {
      title: 'Mannelijk en vrouwelijk',
      body: [
        'Veel woorden voor mensen hebben een mannelijke en een vrouwelijke vorm:',
        '| student / studentkinja | student / studente',
        '| Holanđanin / Holanđanka | Nederlander / Nederlandse',
        '| Srbin / Srpkinja | Serviër / Servische',
        '| prijatelj / prijateljica | vriend / vriendin'
      ]
    }
  ],
  lessons: [
    {
      title: 'Ik ben…',
      words: [
        w('on', 'hij', '👨'),
        w('ona', 'zij', '👩', { nlAlts: ['ze'] }),
        w('sam', 'ben', '🧍', { note: 'ja sam = ik ben' }),
        w('si', 'bent', '🫵', { note: 'ti si = jij bent' }),
        w('je', 'is', '🟰', { note: 'on/ona je = hij/zij is' }),
        w('student', 'student', '🎓', { note: 'mannelijk' }),
        w('studentkinja', 'studente', '👩‍🎓', { nlAlts: ['student'], note: 'vrouwelijk' })
      ],
      sentences: [
        s('Ja sam Ana.', 'Ik ben Ana.', { srAlts: ['Ana sam.'] }),
        s('Ti si Marko.', 'Jij bent Marko.', { srAlts: ['Marko si.'] }),
        s('On je student.', 'Hij is student.', { nlAlts: ['Hij is een student.', 'Hij is de student.'] }),
        s('Ona je studentkinja.', 'Zij is studente.', { nlAlts: ['Zij is student.', 'Zij is een studente.', 'Zij is een student.'] }),
        s('Ja sam student.', 'Ik ben student.', { srAlts: ['Student sam.', 'Ja sam studentkinja.', 'Studentkinja sam.'], nlAlts: ['Ik ben een student.', 'Ik ben studente.'] }),
        s('Ti si studentkinja.', 'Jij bent studente.', { nlAlts: ['Jij bent student.', 'Jij bent een studente.'] }),
        s('Ana je studentkinja.', 'Ana is studente.', { nlAlts: ['Ana is student.', 'Ana is een studente.', 'Ana is een student.'] }),
        s('Marko je student.', 'Marko is student.', { nlAlts: ['Marko is een student.'] })
      ]
    },
    {
      title: 'Hoe heet je?',
      words: [
        w('zovem se', 'ik heet', '🏷️'),
        w('kako se zoveš', 'hoe heet je', '❔', { nlAlts: ['hoe heet jij', 'wat is je naam'] }),
        w('ime', 'naam', '📛'),
        w('moje', 'mijn', '☝️', { note: 'bij onzijdige woorden: moje ime' }),
        w('drago mi je', 'aangenaam', '😊', { nlAlts: ['leuk je te ontmoeten', 'leuk je te leren kennen', 'aangenaam kennis te maken'] })
      ],
      sentences: [
        s('Kako se zoveš?', 'Hoe heet je?', { nlAlts: ['Hoe heet jij?', 'Wat is je naam?', 'Wat is jouw naam?'] }),
        s('Zovem se Ana.', 'Ik heet Ana.', { srAlts: ['Ja se zovem Ana.'], nlAlts: ['Mijn naam is Ana.'] }),
        s('Moje ime je Marko.', 'Mijn naam is Marko.', { nlAlts: ['Ik heet Marko.'] }),
        s('Drago mi je!', 'Aangenaam!', { nlAlts: ['Leuk je te ontmoeten!', 'Leuk je te leren kennen!', 'Aangenaam kennis te maken!'] }),
        s('Ja sam Ana, drago mi je.', 'Ik ben Ana, aangenaam.', { nlAlts: ['Ik ben Ana, leuk je te ontmoeten.', 'Ik ben Ana, leuk je te leren kennen.'] }),
        s('Kako se on zove?', 'Hoe heet hij?', { srAlts: ['Kako se zove on?'], nlAlts: ['Wat is zijn naam?'] }),
        s('Ona se zove Milica.', 'Zij heet Milica.', { nlAlts: ['Haar naam is Milica.'] }),
        s('On se zove Luka.', 'Hij heet Luka.', { nlAlts: ['Zijn naam is Luka.'] })
      ]
    },
    {
      title: 'Waar kom je vandaan?',
      words: [
        w('odakle', 'waar vandaan', '🧭', { nlAlts: ['vanwaar', 'waarvandaan'] }),
        w('iz', 'uit', '📤', { nlAlts: ['van'] }),
        w('Holandija', 'Nederland', '🇳🇱', { nlAlts: ['Holland'] }),
        w('Srbija', 'Servië', '🇷🇸'),
        w('Beograd', 'Belgrado', '🏰'),
        w('Amsterdam', 'Amsterdam', '🚲')
      ],
      sentences: [
        s('Odakle si?', 'Waar kom je vandaan?', { srAlts: ['Odakle si ti?'], nlAlts: ['Waar kom jij vandaan?', 'Waar ben je vandaan?', 'Waar kom je vandaan?', 'Vanwaar kom je?'] }),
        s('Ja sam iz Holandije.', 'Ik kom uit Nederland.', { srAlts: ['Iz Holandije sam.'], nlAlts: ['Ik ben uit Nederland.', 'Ik kom uit Holland.'] }),
        s('On je iz Srbije.', 'Hij komt uit Servië.', { nlAlts: ['Hij is uit Servië.'] }),
        s('Ona je iz Beograda.', 'Zij komt uit Belgrado.', { nlAlts: ['Zij is uit Belgrado.'] }),
        s('Marko je iz Amsterdama.', 'Marko komt uit Amsterdam.', { nlAlts: ['Marko is uit Amsterdam.'] }),
        s('Odakle je Ana?', 'Waar komt Ana vandaan?', { nlAlts: ['Waar is Ana vandaan?'] }),
        s('Ana je iz Srbije.', 'Ana komt uit Servië.', { nlAlts: ['Ana is uit Servië.'] }),
        s('Ti si iz Holandije.', 'Jij komt uit Nederland.', { srAlts: ['Iz Holandije si.'], nlAlts: ['Jij bent uit Nederland.'] })
      ]
    },
    {
      title: 'Wij en jullie',
      words: [
        w('mi', 'wij', '👫', { nlAlts: ['we'] }),
        w('vi', 'jullie', '👥', { nlAlts: ['u'], note: 'ook beleefd: u' }),
        w('oni', 'zij', '👨‍👩‍👦', { nlAlts: ['ze'], note: 'meervoud' }),
        w('smo', 'zijn', '🔗', { note: 'mi smo = wij zijn' }),
        w('ste', 'zijn', '🔗', { nlAlts: ['bent'], note: 'vi ste = jullie zijn / u bent' }),
        w('su', 'zijn', '🔗', { note: 'oni su = zij zijn' }),
        w('prijatelj', 'vriend', '🧑‍🤝‍🧑'),
        w('prijateljica', 'vriendin', '👭'),
        w('moja', 'mijn', '☝️', { note: 'bij vrouwelijke woorden: moja prijateljica' })
      ],
      sentences: [
        s('Mi smo prijatelji.', 'Wij zijn vrienden.', { srAlts: ['Prijatelji smo.'] }),
        s('Vi ste iz Holandije.', 'Jullie komen uit Nederland.', { nlAlts: ['U komt uit Nederland.', 'Jullie zijn uit Nederland.', 'U bent uit Nederland.'] }),
        s('Oni su studenti.', 'Zij zijn studenten.'),
        s('Ana i Marko su prijatelji.', 'Ana en Marko zijn vrienden.'),
        s('Ona je moja prijateljica.', 'Zij is mijn vriendin.'),
        s('Mi smo iz Srbije.', 'Wij komen uit Servië.', { srAlts: ['Iz Srbije smo.'], nlAlts: ['Wij zijn uit Servië.'] }),
        s('Marko je moj prijatelj.', 'Marko is mijn vriend.'),
        s('Vi ste studenti.', 'Jullie zijn studenten.', { srAlts: ['Studenti ste.'] })
      ]
    },
    {
      title: 'Ja of nee?',
      words: [
        w('nisam', 'ben niet', '🙅', { nlAlts: ['ben geen'], note: 'ja nisam = ik ben niet / geen' }),
        w('nije', 'is niet', '🚫', { nlAlts: ['is geen'] }),
        w('da li', 'is het zo dat', '❓', { note: 'maakt van een zin een ja/nee-vraag' }),
        w('Holanđanin', 'Nederlander', '🧑‍🌾'),
        w('Holanđanka', 'Nederlandse', '👱‍♀️'),
        w('Srbin', 'Serviër', '🧔'),
        w('Srpkinja', 'Servische', '👩‍🦱')
      ],
      sentences: [
        s('Ja nisam student.', 'Ik ben geen student.', { srAlts: ['Nisam student.'], nlAlts: ['Ik ben niet student.'] }),
        s('On nije iz Srbije.', 'Hij komt niet uit Servië.', { nlAlts: ['Hij is niet uit Servië.'] }),
        s('Da li si ti Holanđanka?', 'Ben jij Nederlandse?', { srAlts: ['Da li si Holanđanka?', 'Jesi li ti Holanđanka?', 'Jesi li Holanđanka?'] }),
        s('Da, ja sam Holanđanka.', 'Ja, ik ben Nederlandse.', { srAlts: ['Da, Holanđanka sam.'] }),
        s('Ne, nisam Srpkinja.', 'Nee, ik ben geen Servische.', { srAlts: ['Ne, ja nisam Srpkinja.'] }),
        s('Marko je Srbin.', 'Marko is Serviër.', { nlAlts: ['Marko is een Serviër.'] }),
        s('Da li je on Holanđanin?', 'Is hij Nederlander?', { srAlts: ['Je li on Holanđanin?'], nlAlts: ['Is hij een Nederlander?'] }),
        s('Ona nije Holanđanka.', 'Zij is geen Nederlandse.', { nlAlts: ['Zij is niet Nederlands.'] })
      ]
    }
  ]
});

export const u3 = unit({
  id: 'u3',
  title: 'Eten en drinken',
  description: 'Bestellen, eten en zeggen wat je lekker vindt',
  emoji: '🍽️',
  color: '#2f9e44',
  guide: [
    {
      title: 'Drie geslachten',
      body: [
        'Elk Servisch zelfstandig naamwoord is mannelijk, vrouwelijk of onzijdig. Meestal zie je dat aan het einde van het woord:',
        '| mannelijk: medeklinker | hleb, sok, čaj',
        '| vrouwelijk: -a | voda, kafa, jabuka',
        '| onzijdig: -o of -e | mleko, pivo, jaje'
      ]
    },
    {
      title: 'Het lijdend voorwerp: -a wordt -u',
      body: [
        'Als je iets eet, drinkt of wilt, verandert een vrouwelijk woord op -a in -u (dit heet de accusatief):',
        '| voda → Pijem vodu. | Ik drink water.',
        '| kafa → Hoću kafu. | Ik wil koffie.',
        '| jabuka → Jedem jabuku. | Ik eet een appel.',
        'Mannelijke dingen (hleb, sok, čaj) en onzijdige woorden (mleko, pivo) veranderen niet.'
      ]
    },
    {
      title: 'Werkwoorden: ik, jij, hij',
      body: [
        'Servische werkwoorden krijgen een uitgang die laat zien wie het doet:',
        '| pijem / piješ / pije | ik drink / jij drinkt / hij drinkt',
        '| jedem / jedeš / jede | ik eet / jij eet / hij eet',
        '| volim / voliš / voli | ik hou van / jij houdt van / hij houdt van',
        '| hoću / hoćeš / hoće | ik wil / jij wilt / hij wil',
        'Ontkennen doe je met "ne" voor het werkwoord: "Ne jedem meso" = "Ik eet geen vlees".'
      ]
    },
    {
      title: 'In het restaurant',
      body: [
        'Met "molim vas" (alstublieft) ben je altijd beleefd. Voor het eten wens je elkaar "Prijatno!" (Eet smakelijk!). En bij het proosten roep je "Živeli!" (Proost!).'
      ],
      examples: [
        { sr: 'Hoću kafu, molim vas.', nl: 'Ik wil koffie, alstublieft.' },
        { sr: 'Račun, molim vas.', nl: 'De rekening, alstublieft.' }
      ]
    }
  ],
  lessons: [
    {
      title: 'Drinken',
      words: [
        w('voda', 'water', '💧'),
        w('kafa', 'koffie', '☕'),
        w('čaj', 'thee', '🍵'),
        w('mleko', 'melk', '🥛'),
        w('sok', 'sap', '🧃', { nlAlts: ['sapje', 'limonade'] }),
        w('pivo', 'bier', '🍺', { nlAlts: ['biertje'] }),
        w('pijem', 'ik drink', '🥤', { nlAlts: ['drink'] })
      ],
      sentences: [
        s('Pijem vodu.', 'Ik drink water.', { srAlts: ['Ja pijem vodu.'] }),
        s('Pijem kafu.', 'Ik drink koffie.', { srAlts: ['Ja pijem kafu.'], nlAlts: ['Ik drink een koffie.'] }),
        s('Ana pije čaj.', 'Ana drinkt thee.'),
        s('Marko pije pivo.', 'Marko drinkt bier.', { nlAlts: ['Marko drinkt een biertje.', 'Marko drinkt een bier.'] }),
        s('Da li piješ mleko?', 'Drink jij melk?', { srAlts: ['Da li ti piješ mleko?', 'Piješ li mleko?'] }),
        s('Ja pijem sok.', 'Ik drink sap.', { srAlts: ['Pijem sok.'], nlAlts: ['Ik drink sapje.'] }),
        s('Voda, molim.', 'Water, alsjeblieft.'),
        s('Kafa i mleko.', 'Koffie en melk.')
      ]
    },
    {
      title: 'Eten',
      words: [
        w('hleb', 'brood', '🍞'),
        w('sir', 'kaas', '🧀'),
        w('jabuka', 'appel', '🍎'),
        w('jaje', 'ei', '🥚'),
        w('meso', 'vlees', '🥩'),
        w('riba', 'vis', '🐟'),
        w('jedem', 'ik eet', '🍴', { nlAlts: ['eet'] })
      ],
      sentences: [
        s('Jedem hleb.', 'Ik eet brood.', { srAlts: ['Ja jedem hleb.'] }),
        s('Jedem jabuku.', 'Ik eet een appel.', { srAlts: ['Ja jedem jabuku.'], nlAlts: ['Ik eet de appel.'] }),
        s('Ona jede ribu.', 'Zij eet vis.'),
        s('On jede meso.', 'Hij eet vlees.'),
        s('Hleb i sir.', 'Brood en kaas.'),
        s('Da li jedeš ribu?', 'Eet jij vis?', { srAlts: ['Da li ti jedeš ribu?', 'Jedeš li ribu?'] }),
        s('Ne jedem meso.', 'Ik eet geen vlees.', { srAlts: ['Ja ne jedem meso.'] }),
        s('Jedem jaje i hleb.', 'Ik eet een ei en brood.', { srAlts: ['Ja jedem jaje i hleb.'] })
      ]
    },
    {
      title: 'In het restaurant',
      words: [
        w('hoću', 'ik wil', '🙋', { nlAlts: ['wil'] }),
        w('molim vas', 'alstublieft', '🎩', { nlAlts: ['alsjeblieft'] }),
        w('račun', 'rekening', '🧾'),
        w('supa', 'soep', '🍲'),
        w('salata', 'salade', '🥗'),
        w('konobar', 'ober', '🤵', { nlAlts: ['kelner'] }),
        w('prijatno', 'eet smakelijk', '😋', { nlAlts: ['smakelijk', 'eet smakelijk', 'fijne dag'] })
      ],
      sentences: [
        s('Hoću kafu, molim vas.', 'Ik wil koffie, alstublieft.', { srAlts: ['Ja hoću kafu, molim vas.'], nlAlts: ['Ik wil graag koffie, alstublieft.', 'Ik wil een koffie, alstublieft.'] }),
        s('Račun, molim vas.', 'De rekening, alstublieft.'),
        s('Hoću supu i salatu.', 'Ik wil soep en salade.', { srAlts: ['Ja hoću supu i salatu.'], nlAlts: ['Ik wil soep en een salade.', 'Ik wil graag soep en salade.'] }),
        s('Konobar, molim vas!', 'Ober, alstublieft!', { nlAlts: ['Kelner, alstublieft!'] }),
        s('Prijatno!', 'Eet smakelijk!', { nlAlts: ['Smakelijk!'] }),
        s('Hoćeš li čaj?', 'Wil jij thee?', { srAlts: ['Da li hoćeš čaj?'], nlAlts: ['Wil jij een thee?', 'Wil jij een kopje thee?'] }),
        s('Ja hoću vodu.', 'Ik wil water.', { srAlts: ['Hoću vodu.'], nlAlts: ['Ik wil graag water.'] }),
        s('Salata, molim vas.', 'Een salade, alstublieft.', { nlAlts: ['Salade, alstublieft.', 'De salade, alstublieft.'] })
      ]
    },
    {
      title: 'Lekker!',
      words: [
        w('volim', 'ik hou van', '❤️', { nlAlts: ['ik vind lekker', 'hou van'] }),
        w('ukusno', 'lekker', '😋'),
        w('ali', 'maar', '🔀'),
        w('ovo', 'dit', '👇'),
        w('hladno', 'koud', '🧊'),
        w('toplo', 'warm', '♨️'),
        w('čokolada', 'chocolade', '🍫'),
        w('torta', 'taart', '🎂')
      ],
      sentences: [
        s('Volim čokoladu.', 'Ik hou van chocolade.', { srAlts: ['Ja volim čokoladu.'], nlAlts: ['Ik vind chocolade lekker.'] }),
        s('Ovo je ukusno.', 'Dit is lekker.'),
        s('Volim čaj, ali ne volim kafu.', 'Ik hou van thee, maar ik hou niet van koffie.', { nlAlts: ['Ik vind thee lekker, maar ik vind koffie niet lekker.', 'Ik hou van thee, maar niet van koffie.'] }),
        s('Mleko je toplo.', 'De melk is warm.'),
        s('Pivo je hladno.', 'Het bier is koud.'),
        s('Ona voli tortu.', 'Zij houdt van taart.', { nlAlts: ['Zij vindt taart lekker.'] }),
        s('Ukusno je!', 'Het is lekker!', { nlAlts: ['Lekker!'] }),
        s('Ovo je torta.', 'Dit is een taart.', { nlAlts: ['Dit is taart.', 'Dit is de taart.'] })
      ]
    }
  ]
});
