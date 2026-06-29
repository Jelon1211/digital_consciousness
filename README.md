# Digital Consciousness

Retro-cyberpunkowa aplikacja narracyjna z interfejsem terminala. Gracz/uzytkownik wchodzi do systemu ERIS, wpisuje komendy, odblokowuje logi, sektory i nody, a tresc jest renderowana jak transmisja terminalowa z opoznieniami, efektem pisania, beepami, muzyka i obrazami.

Ten plik jest dokumentem roboczym dla devow i dla przyszlego powrotu do projektu. Ma opisac nie tylko jak uruchomic appke, ale tez gdzie dopisywac content, jak dziala engine i czego nie rozjechac przy kolejnych zmianach.

## Stack

- Next.js App Router
- React
- TypeScript
- Zustand
- Tailwind CSS 4
- `html-react-parser` do kontrolowanego renderowania prostych fragmentow HTML w liniach opowiesci

## Przydatne komendy

```bash
npm run dev
npm run build
npm run start
npm run lint
npm run validate:content
```

Najczesciej przed commitem wystarczy:

```bash
npm run lint
npm run validate:content
./node_modules/.bin/tsc --noEmit
```

`validate:content` sprawdza JSON-y w `public/data`. To jest wazne, bo TypeScript nie widzi bledow w runtime'owo ladowanych plikach JSON.

## Struktura projektu

```txt
src/
  app/                         # Next routes, layout, global CSS entry
  assets/fonts/                # lokalne fonty dla next/font/local
  domain/
    content/                   # manifest contentu, sciezki, walidacja, repozytorium
    engine/                    # stan terminala, komendy, registry, engine
  features/
    audio/                     # muzyka, beep sound, audio store
    background/                # grid/tlo
    loading/                   # loading screen dla story
    menu/                      # menu boczne i ustawienia
    shell/                     # MainWrapper wybierajacy Terminal/Story
    story/                     # widok nodu/opowiesci
    terminal/                  # terminal, input, linie, typewriter
  shared/
    config/                    # AppConfig
    hooks/                     # wspolne hooki, np. useTimedLines
  styles/                      # globalne style efektow wizualnych

public/
  audio/                       # mp3
  data/                        # JSON-y opowiesci i terminala
  images/                      # obrazy uzywane przez JSON-y
```

## Glowny przeplyw aplikacji

1. `src/app/page.tsx` renderuje `AudioPlayer`, `Menu`, naglowek ERIS i `MainWrapper`.
2. `MainWrapper` sprawdza `phase` w `engine.store`.
3. Dla `Phase.NODE` pokazuje `Story`, w pozostalych fazach pokazuje `Terminal`.
4. `Terminal` laduje `init.json` po kliknieciu `ENTER`.
5. Po wpisaniu pierwszej wartosci w fazie `INIT`, `Engine` wymusza `StartCommand`.
6. Kolejne inputy sa dopasowywane przez `CommandRegistry`.
7. Komenda aktualizuje Zustand store i podstawia nowa historie do `story`.
8. Linie sa pokazywane przez `useTimedLines`, a tekst w linii jest pisany przez typewriter.

## Engine i fazy

Stan terminala jest w `src/domain/engine/engine.store.ts`.

Najwazniejsze pola:

- `phase` - aktualna faza aplikacji.
- `unitName` - nazwa jednostki podana na starcie.
- `currentCommand` - ostatnia komenda.
- `currentSector` - aktualny sektor.
- `currentNode` - aktualny node.
- `isEntered` - czy uzytkownik wszedl juz do terminala.
- `story` - aktualnie renderowana lista linii.

Fazy sa w `src/domain/engine/EngineState.ts`:

- `INIT` - terminal czeka na start i nazwe jednostki.
- `MAIN` - glowny poziom komend, widok terminala.
- `SECTOR` - uzytkownik przeglada sektor i moze wejsc w node.
- `NODE` - widok narracyjny/story.

`isMusic`, `musicVolume` i `beepVolume` nie naleza do engine store. Sa w `src/features/audio/audio.store.ts`, bo dotycza tylko audio.

## Komendy

Nazwy komend sa w `src/domain/engine/commands/commandNames.ts`.

Aktualne komendy:

- `help` - pokazuje pomoc.
- `logs` - wraca do listy logow.
- `history` - otwiera archiwalny node historii swiata.
- `map` - otwiera archiwalny node mapy.
- `sectors` - pokazuje liste sektorow.
- `sector_XX` - wejscie do sektora z manifestu.
- `node_XX` - wejscie do noda aktywnego sektora.
- `back` - powrot z widoku noda do glownego poziomu logow.

Wazne: `node_00` i `node_01` moga wystepowac w wielu sektorach. Dlatego `NodeCommand` dopasowuje node nie tylko po nazwie inputu, ale tez po `currentSector`.

## Manifest contentu

Jednym z najwazniejszych plikow jest:

```txt
src/domain/content/contentManifest.ts
```

Manifest jest zrodlem prawdy dla:

- podstawowych historii terminala: `init`, `introduction`, `logs`, `sectors`, `help`, `error`;
- specjalnych archiwalnych wejsc: `history`, `map`;
- sektorow;
- nodow w sektorach;
- sciezek do plikow JSON.

Jezeli dodajesz nowy sektor lub node, nie wystarczy dodac JSON-a. Trzeba dopisac go do `contentManifest.ts`, bo z manifestu budowane sa dynamiczne komendy.

Przyklad sektora:

```ts
{
  id: "sector_02",
  title: "Nazwa sektora",
  storyPath: "/logs/sectors/sector_02/sector_02.json",
  nodes: [
    {
      id: "node_00",
      title: "Tytul noda",
      storyPath: "/logs/sectors/sector_02/nodes/node_00.json",
    },
  ],
}
```

## Content JSON

JSON-y mieszkaja w:

```txt
public/data/
```

Aktualne glowne pliki:

- `init.json` - poczatkowy boot terminala.
- `introduction.json` - odpowiedz po wpisaniu nazwy jednostki.
- `help.json` - pomoc.
- `error.json` - odpowiedz na nieznana komende.
- `logs/logs.json` - glowna lista modulow danych.
- `logs/sectors/sectors.json` - lista sektorow.
- `logs/sectors/<sector>/<sector>.json` - ekran sektora.
- `logs/sectors/<sector>/nodes/<node>.json` - tresc noda.

Kazdy plik story jest tablica obiektow:

```json
[
  {
    "text": ">>> Inicjalizacja transmisji...",
    "delay": 300,
    "duration": 1000,
    "type": "system_message"
  }
]
```

Pola:

- `text` - string; tekst linii.
- `delay` - number w ms; ile czekac przed pokazaniem tej linii po poprzedniej.
- `duration` - number w ms; jak dlugo ma trwac pisanie tej linii.
- `type` - opcjonalne; `text`, `command`, `system_message`, `error`.
- `image` - opcjonalne; sciezka publiczna do obrazka, np. `/images/sector_00/steak.png`.
- `group` - opcjonalne; zostawione pod przyszle grupowanie linii.

Konwencje tekstu:

- Linie zaczynajace sie od `>>>` to komunikaty terminala/systemu.
- Zwykly tekst bez `>>>` to narracja ERIS albo opowiesc.
- `type: "command"` renderuje linie jako sugestie komend.
- `type: "system_message"` renderuje linie jako systemowy komunikat.
- `type: "error"` renderuje blad.
- Linie z `image` renderuja obraz zamiast pisanego tekstu.

## Placeholdery w tekstach

Placeholdery sa obslugiwane w:

```txt
src/domain/content/placeholder.ts
```

Aktualnie uzywane placeholdery:

- `<name>` - nazwa jednostki/uzytkownika.
- `<command>` - wpisana komenda, zwykle w `error.json`.

Przyklad:

```json
{
  "text": "Jednostka <span className='font-bold text-[var(--textNeonColor)]'><name></span> zostala przypisana do terminala.",
  "delay": 300,
  "duration": 1000
}
```

Wartosci podstawiane do placeholderow sa escapowane przed wstawieniem do HTML.

## HTML w JSON-ach

Linie tekstu moga zawierac proste tagi HTML/React-like className, np.:

```json
{
  "text": "To jest <span className='font-bold text-[var(--textNeonColor)]'>wazne</span>.",
  "delay": 300,
  "duration": 500
}
```

Renderowanie robi `html-react-parser` w `TerminalTextLine`.

Zasady:

- Uzywaj tego oszczednie, glownie do highlightow.
- Nie wrzucaj skryptow, event handlerow ani zlozonego HTML.
- Preferuj klasy i zmienne CSS juz uzywane w projekcie.

## Audio

Audio jest rozdzielone na:

- muzyke tla - `AudioPlayer`;
- beep sound terminala - `useTerminalSoundManager`;
- ustawienia audio - `src/features/audio/audio.store.ts`.

Audio store trzyma:

- `isMusic` - czy muzyka ma grac.
- `musicVolume` - glosnosc muzyki.
- `beepVolume` - glosnosc beepow.

Wazna zasada techniczna: zmiana `beepVolume` nie moze resetowac typewritera ani terminala. Dlatego `useTerminalSoundManager` czyta aktualna glosnosc przez `useAudioSettingsStore.getState()` dopiero w momencie odtwarzania beepu.

## Renderowanie linii

Najwazniejsze pliki:

- `src/shared/hooks/useTimedLines.ts` - decyduje, ile linii historii jest juz widocznych.
- `src/features/terminal/components/TerminalLine.tsx` - wybiera tekst albo obraz.
- `src/features/terminal/components/TerminalTextLine.tsx` - tekst, typewriter, klasy typu linii i beep.
- `src/features/terminal/components/TerminalImageLine.tsx` - obraz.
- `src/features/terminal/components/useTypewriterText.ts` - efekt pisania znak po znaku.

Jezeli zmieniasz suwaki, store albo audio, uwazaj na zaleznosci hookow w `TerminalTextLine`. Zmiana callbacka typewritera moze spowodowac ponowne pisanie aktualnej linii od poczatku.

## Style

Globalne style sa w `src/styles`.

Podzial:

- `index.css` - importuje pozostale pliki.
- `crt.css` - efekt CRT.
- `glitch.css` - glitch.
- `gridLines.css` - animowany grid w tle.
- `loading.css` - loading screen story.
- `story.css` - panel story.
- `terminal.css` - terminal i cursor.
- `teaser.css` - przyciski wejscia/powrotu.
- `vignette.css` - winieta tla.

Nie dodawaj ogolnych selektorow typu `.flex` albo dodatkowych globalnych `body` w feature CSS. Style feature'ow powinny byc zakresowane klasami, zeby nie nadpisywaly Tailwinda ani layoutu calej aplikacji.

## Dodawanie nowego noda

1. Dodaj plik:

```txt
public/data/logs/sectors/<sector_id>/nodes/<node_id>.json
```

2. Dopisz node w `src/domain/content/contentManifest.ts`.

3. Dopisz linie widoczne na ekranie sektora w:

```txt
public/data/logs/sectors/<sector_id>/<sector_id>.json
```

4. Dodaj obrazy do `public/images/...`, jezeli node ich uzywa.

5. Uruchom:

```bash
npm run validate:content
./node_modules/.bin/tsc --noEmit
npm run lint
```

## Dodawanie nowego sektora

1. Dodaj katalog:

```txt
public/data/logs/sectors/<sector_id>/
```

2. Dodaj plik ekranu sektora:

```txt
public/data/logs/sectors/<sector_id>/<sector_id>.json
```

3. Dodaj nody w:

```txt
public/data/logs/sectors/<sector_id>/nodes/
```

4. Dopisz sektor i nody w `contentManifest.ts`.

5. Dopisz sektor do listy w:

```txt
public/data/logs/sectors/sectors.json
```

6. Sprawdz walidacje i lint.

## API story

Endpoint:

```txt
GET /api/story?path=/init.json
```

Endpoint uzywa `loadStoryContent`, czyli czyta tylko z `public/data` i przechodzi przez walidacje contentu. Domyslnie zwraca `init.json`.

Na ten moment glowne UI korzysta z server action `getStory`, nie musi bezposrednio wolac tego endpointu.

## Store i persistencja

`engine.store.ts`:

- nazwa jednostki;
- faza terminala;
- aktualna komenda;
- aktualny sektor/node;
- aktualna historia;
- `isEntered`.

Persist name:

```txt
terminal-engine-store
```

`audio.store.ts`:

- `isMusic`;
- `musicVolume`;
- `beepVolume`.

Persist name:

```txt
eris-audio-settings
```

Reset terminala w menu resetuje engine store i odswieza strone. Ustawienia audio sa osobne i nie powinny byc resetowane razem z historia terminala.

## Znane miejsca, na ktore trzeba uwazac

- `contentManifest.ts` musi byc aktualny wzgledem JSON-ow.
- `node_XX` jest zalezne od aktywnego sektora.
- Zmiana stanu audio nie powinna restartowac typewritera.
- JSON-y moga zawierac HTML, wiec trzymaj je proste i przewidywalne.
- `validate:content` jest obowiazkowe po zmianach w `public/data`.
- `.next` jest generowane i nie jest zrodlem prawdy.
