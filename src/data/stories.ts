export interface StoryLine {
  speaker: string;
  sr: string;
  nl: string;
}
export interface StoryQuestion {
  question: string;
  options: string[];
  /** index of the correct option */
  answer: number;
}
export type StoryStep = ({ kind: 'line' } & StoryLine) | ({ kind: 'question' } & StoryQuestion);

export interface Story {
  id: string;
  title: string;
  emoji: string;
  /** story unlocks when this unit is finished */
  afterUnit: string;
  speakers: Record<string, string>;
  steps: StoryStep[];
}

const L = (speaker: string, sr: string, nl: string): StoryStep => ({ kind: 'line', speaker, sr, nl });
const Q = (question: string, options: string[], answer = 0): StoryStep => ({ kind: 'question', question, options, answer });

export const STORIES: Story[] = [
  {
    id: 'story-1',
    title: 'Goedemorgen!',
    emoji: '🌅',
    afterUnit: 'u1',
    speakers: { Ana: '👩', Marko: '👨' },
    steps: [
      L('Ana', 'Dobro jutro, Marko!', 'Goedemorgen, Marko!'),
      L('Marko', 'Dobro jutro, Ana! Kako si?', 'Goedemorgen, Ana! Hoe gaat het?'),
      L('Ana', 'Dobro sam, hvala. A ti?', 'Het gaat goed, bedankt. En met jou?'),
      Q('Hoe gaat het met Ana?', ['Goed', 'Slecht', 'Niet zo goed']),
      L('Marko', 'Loše sam.', 'Het gaat slecht met me.'),
      L('Ana', 'Oh ne! Izvini, Marko.', 'O nee! Sorry, Marko.'),
      L('Marko', 'Nema problema. Vidimo se!', 'Geen probleem. Tot ziens!'),
      Q('Wat zegt Marko aan het eind?', ['Goedenavond!', 'Tot ziens!', 'Dank je wel!'], 1),
      L('Ana', 'Ćao, Marko!', 'Doei, Marko!')
    ]
  },
  {
    id: 'story-2',
    title: 'Een nieuwe vriendin',
    emoji: '🤝',
    afterUnit: 'u2',
    speakers: { Luka: '🧔', Sanne: '👱‍♀️' },
    steps: [
      L('Luka', 'Zdravo! Ja sam Luka. Kako se zoveš?', 'Hallo! Ik ben Luka. Hoe heet je?'),
      L('Sanne', 'Zdravo, Luka! Zovem se Sanne.', 'Hallo, Luka! Ik heet Sanne.'),
      L('Luka', 'Drago mi je, Sanne! Odakle si?', 'Aangenaam, Sanne! Waar kom je vandaan?'),
      L('Sanne', 'Ja sam iz Holandije, iz Amsterdama.', 'Ik kom uit Nederland, uit Amsterdam.'),
      Q('Waar komt Sanne vandaan?', ['Uit Belgrado', 'Uit Niš', 'Uit Amsterdam'], 2),
      L('Luka', 'Super! Ja sam iz Beograda.', 'Super! Ik kom uit Belgrado.'),
      L('Sanne', 'Da li si ti student?', 'Ben jij student?'),
      L('Luka', 'Ne, nisam student. Ja sam konobar.', 'Nee, ik ben geen student. Ik ben ober.'),
      Q('Wat is Luka?', ['Student', 'Ober', 'Leraar'], 1),
      L('Sanne', 'A ja sam studentkinja!', 'En ik ben studente!')
    ]
  },
  {
    id: 'story-3',
    title: 'In het café',
    emoji: '☕',
    afterUnit: 'u3',
    speakers: { Konobar: '🤵', Mila: '👩‍🦰' },
    steps: [
      L('Konobar', 'Dobar dan! Izvolite.', 'Goedendag! Zegt u het maar.'),
      L('Mila', 'Dobar dan! Hoću kafu, molim vas.', 'Goedendag! Ik wil koffie, alstublieft.'),
      L('Konobar', 'Kafu sa mlekom?', 'Koffie met melk?'),
      L('Mila', 'Da, sa mlekom. I vodu, molim vas.', 'Ja, met melk. En water, alstublieft.'),
      Q('Wat bestelt Mila?', ['Koffie met melk en water', 'Thee en sap', 'Een biertje'], 0),
      L('Konobar', 'Hoćete li tortu? Torta je ukusna!', 'Wilt u taart? De taart is lekker!'),
      L('Mila', 'Ne, hvala. Ne volim tortu.', 'Nee, dank u. Ik hou niet van taart.'),
      Q('Neemt Mila een stuk taart?', ['Ja, twee stukken', 'Nee, ze houdt niet van taart', 'Ja, met chocolade'], 1),
      L('Konobar', 'U redu. Prijatno!', 'Oké. Eet smakelijk!'),
      L('Mila', 'Hvala! Račun, molim vas.', 'Bedankt! De rekening, alstublieft.')
    ]
  },
  {
    id: 'story-4',
    title: 'Mijn familie',
    emoji: '👨‍👩‍👧',
    afterUnit: 'u4',
    speakers: { Jovana: '👧', Daan: '👦' },
    steps: [
      L('Jovana', 'Ovo je moja porodica.', 'Dit is mijn familie.'),
      L('Daan', 'Ko je ovo?', 'Wie is dit?'),
      L('Jovana', 'Ovo je moja majka, a ovo je moj otac.', 'Dit is mijn moeder, en dit is mijn vader.'),
      L('Daan', 'A ko je ovo?', 'En wie is dit?'),
      L('Jovana', 'To je moj brat Nikola. On je student.', 'Dat is mijn broer Nikola. Hij is student.'),
      Q('Wie is Nikola?', ['Haar vader', 'Haar broer', 'Haar opa'], 1),
      L('Daan', 'Da li imaš sestru?', 'Heb jij een zus?'),
      L('Jovana', 'Nemam sestru, ali imam psa! Zove se Žuća.', 'Ik heb geen zus, maar ik heb een hond! Hij heet Žuća.'),
      Q('Heeft Jovana een zus?', ['Ja, één', 'Nee, maar wel een hond', 'Ja, twee'], 1),
      L('Daan', 'I pas je član porodice!', 'De hond hoort ook bij de familie!')
    ]
  },
  {
    id: 'story-5',
    title: 'De weg vragen',
    emoji: '🗺️',
    afterUnit: 'u7',
    speakers: { Turista: '🧑‍🦱', Žena: '👵' },
    steps: [
      L('Turista', 'Izvinite! Gde je muzej?', 'Pardon! Waar is het museum?'),
      L('Žena', 'Muzej? Nije daleko. Idite pravo, pa levo.', 'Het museum? Het is niet ver. Ga rechtdoor en dan links.'),
      L('Turista', 'Pravo, pa levo. Hvala!', 'Rechtdoor, dan links. Bedankt!'),
      Q('Hoe kom je bij het museum?', ['Rechts en dan rechtdoor', 'Rechtdoor en dan links', 'Het is heel ver weg'], 1),
      L('Žena', 'Nema na čemu. Da li ste iz Holandije?', 'Graag gedaan. Komt u uit Nederland?'),
      L('Turista', 'Da! Ja sam iz Utrehta.', 'Ja! Ik kom uit Utrecht.'),
      L('Žena', 'Moja ćerka živi u Amsterdamu!', 'Mijn dochter woont in Amsterdam!'),
      Q('Waar woont de dochter van de vrouw?', ['In Utrecht', 'In Belgrado', 'In Amsterdam'], 2),
      L('Turista', 'Super! Doviđenja!', 'Super! Tot ziens!')
    ]
  },
  {
    id: 'story-6',
    title: 'Een dag in Belgrado',
    emoji: '🏙️',
    afterUnit: 'u9',
    speakers: { Ema: '👩', Stefan: '🧑' },
    steps: [
      L('Stefan', 'Šta radiš danas?', 'Wat doe je vandaag?'),
      L('Ema', 'Danas idem u grad. Hoćeš li i ti?', 'Vandaag ga ik naar de stad. Wil jij ook?'),
      L('Stefan', 'Da! Kada?', 'Ja! Wanneer?'),
      L('Ema', 'U deset sati. Prvo idemo na pijacu.', 'Om tien uur. Eerst gaan we naar de markt.'),
      Q('Waar gaan ze eerst naartoe?', ['Naar de markt', 'Naar het museum', 'Naar school'], 0),
      L('Stefan', 'Kakvo je vreme?', 'Hoe is het weer?'),
      L('Ema', 'Sunčano je i toplo.', 'Het is zonnig en warm.'),
      L('Stefan', 'Odlično! Posle pijace idemo u park.', 'Uitstekend! Na de markt gaan we naar het park.'),
      Q('Hoe is het weer?', ['Het regent', 'Het sneeuwt', 'Zonnig en warm'], 2),
      L('Ema', 'Važi! Vidimo se u deset.', 'Afgesproken! Tot tien uur.')
    ]
  },
  {
    id: 'story-7',
    title: 'Naar Novi Sad',
    emoji: '🚆',
    afterUnit: 'u10',
    speakers: { Petar: '👨‍🦰', Prodavac: '👩‍💼' },
    steps: [
      L('Petar', 'Dobar dan. Jednu kartu za Novi Sad, molim vas.', 'Goedendag. Eén kaartje naar Novi Sad, alstublieft.'),
      L('Prodavac', 'Za voz ili za autobus?', 'Voor de trein of voor de bus?'),
      L('Petar', 'Za voz. Koliko košta?', 'Voor de trein. Hoeveel kost het?'),
      L('Prodavac', 'Hiljadu dinara.', 'Duizend dinar.'),
      Q('Hoeveel kost het kaartje?', ['Honderd dinar', 'Duizend dinar', 'Twintig euro'], 1),
      L('Petar', 'Izvolite. Kada ide voz?', 'Alstublieft. Wanneer gaat de trein?'),
      L('Prodavac', 'U deset sati. Sada je pola deset.', 'Om tien uur. Het is nu half tien.'),
      Q('Hoe laat vertrekt de trein?', ['Om half tien', 'Om acht uur', 'Om tien uur'], 2),
      L('Petar', 'Odlično, hvala!', 'Uitstekend, bedankt!'),
      L('Prodavac', 'Srećan put!', 'Goede reis!')
    ]
  }
];
