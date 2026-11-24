# Govori! 🦔 – Servisch leren vanuit het Nederlands

Een gratis leer-app in de stijl van Duolingo om **Servisch** te leren vanuit het **Nederlands**.
De app werkt in de browser op telefoon, tablet en computer, kan op het beginscherm worden gezet
en werkt daarna ook offline.

## Wat zit erin?

- **Leerpad** met 12 units en 45 lessen: begroeten, kennismaken, eten & drinken, familie, getallen,
  kleuren & gevoelens, de stad, dagelijks leven, tijd & weer, reizen, thuis en lichaam & kleding.
- **Oefentypes** zoals in Duolingo: plaatjes kiezen, meerkeuze, paren koppelen, zinnen bouwen met
  woordblokjes, luisteren (wat hoor je?), zelf typen, woord invullen en spreken (microfoon).
- **Tik op een woord** in een Servische zin om de vertaling te zien.
- **Gids** per unit met uitleg over grammatica en uitspraak, in het Nederlands.
- **Cyrillisch alfabet**: aparte lessen (tabblad "Letters") en een schakelaar om de hele cursus in
  het Cyrillisch te tonen.
- **Motivatie**: XP, dagdoel, streaks 🔥, hartjes ❤️, edelstenen 💎, schatkisten, unit-toetsen 🏆,
  een wekelijkse liga, prestaties en een winkel (streak bevriezen, dubbele XP, hartjes aanvullen).
- **Oefenen**: persoonlijke herhaling van zwakke woorden (spaced repetition) en je fouten opnieuw doen.
- **Woordenlijst** met alle geleerde woorden en hoe goed je ze kent.
- **Fouten worden aan het eind van de les herhaald**, net als in Duolingo.
- Mild nakijken: een vergeten accent (č, ć, š, ž, đ) of een kleine typfout wordt goed gerekend met een tip.
- **Spring vooruit**: kent je al wat? Doe een toets om units over te slaan.
- Donkere modus, geluidseffecten, toetsenbordbediening op de computer (Enter, 1–9).

Voortgang wordt **alleen op het apparaat** bewaard (geen account nodig). In Profiel → ⚙️ Instellingen
kun je een back-up downloaden en op een ander apparaat terugzetten.

### Uitspraak

De app gebruikt de spraakstem van het apparaat. Op Android (Google-spraak) en op computers met Chrome
is meestal een Servische of Kroatische stem beschikbaar. Op een iPhone kun je in
*Instellingen → Toegankelijkheid → Gesproken materiaal → Stemmen* een Kroatische stem downloaden
(die lijkt zo sterk op het Servisch dat hij prima werkt). Zonder stem worden luisteroefeningen
automatisch overgeslagen.

## Online zetten (GitHub Pages)

1. Zet deze code op de `main`-branch.
2. Ga op GitHub naar **Settings → Pages** en kies bij *Source* voor **GitHub Actions**.
3. De workflow `.github/workflows/deploy.yml` bouwt en publiceert de app automatisch.
   De app staat daarna op `https://<gebruikersnaam>.github.io/serbian-learning-app/`.
4. Open die link op de telefoon en kies "Toevoegen aan beginscherm".

## Zelf ontwikkelen

```bash
npm install
npm run dev      # ontwikkelserver
npm test         # unit-tests (inhoud, nakijken, schrift)
npm run build    # productie-build in dist/
```

End-to-end-tests met Playwright (na `npm run build` en `npx vite preview --port 4173`):

```bash
node e2e/play.cjs   # eerste les + screenshots in /tmp/shots
node e2e/full.cjs   # speelt de hele cursus door
```

### Structuur

- `src/data/units/` – de lesinhoud (woorden, zinnen, gids per unit)
- `src/data/glossary.ts` – vertalingen van verbogen vormen voor de woordhints
- `src/lib/generator.ts` – maakt oefeningen van de lesinhoud
- `src/lib/store.ts` – voortgang, XP, streaks, hartjes (opgeslagen in localStorage)
- `src/screens/` en `src/exercises/` – de schermen en oefentypes

Lesinhoud toevoegen: maak een nieuwe unit aan met `unit({...})` in `src/data/units/` en voeg hem toe
aan `UNITS` in `src/data/course.ts`. De tests controleren automatisch of alle oefeningen oplosbaar zijn.
