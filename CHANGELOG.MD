# Changelog

## [1.8.4] - 2025-05-01

### Lista Zmian

- Dodano obsługę Powiadomień
- Naprawiono błąd w wyniku którego powiadomienia przychodziły z znacznym opóźnieniem wynoszącym czas oczekiwania ekranu WaitingScreen.
- Naprawiono błąd wysyłania więcej niż jednego powiadominienia dla sceny który generował się przy ponownym włączaniu się sceny.
- Dodano pozwolenia na powiadomienia.
- Zaktualizowano scenariusz do prawidłowych ustawień.

### Zakończone:

- System powiadomień.

### Uwagi

Trzeba przetestować aplikację pod kontem powiadomień, problem mam z tym, że powiadomienia pomimo tego iż data jest ustawiona z dokładnością co do 20ms to i tak powiadomienie wysyłane jest z opóźnieniem. Support EXPO poinformował mnie, że jest to spowodowane emulatorem EXPO i, że mam to przetestować na Produkcji w urządzeniu bezpośrednio.

> Aplikacja przetestowana - powiadomienia na preview wysyłają się od 20 do 30 sekund po zakończeniu odliczania, opóźnienie spowodowane systemem nie grą.

---

## [1.8.3] - 2025-04-30

### 🛠 Refaktoryzacja

- Podzielenie `CallingScreen` na viewmodel.
- Podzielenie `DeathScreen` na viewmodel.
- Usunięcie starej konfiguracji `WaitingScreens`.
- Utworzono testy jednostkowe dla wszystkich ekranów w `screens/` oraz dla wszystkich komponentów z `components/buttons/`
- Aktualizacja UI dla ekranu `DeathScreen`
- Zaimplementowanie logiki `useDarnkessUI` do `useGameEngine`.

### Zakończone:

- Zakończono dzielenie kodu na ViewModele.
- Utworzenie testów jednostkowych
- Prowadzenie Changeloga projektu
- Utworzenie Stora - Context w context/
- System obsługi dźwięku
- Włączanie / wyłączanie ciemności w grze

### Uwagi

**Wynik testów jednostkowych to:**

> Test Suites: 7 passed, 7 total
> Tests: 14 passed, 14 total
> Snapshots: 0 total
> Time: 1.41 s, estimated 2 s
> Ran all test suites.

---

## [1.8.2] - 2025-04-29

### 🛠 Refaktoryzacja

- Dodano Context API dla LanguageContext.tsx - obsługa i przechowywanie informacji o języku.
- Zaktualizowano index.tsx oraz \_layout.tsx (Root Layout) pod nowe Context API dla LanguageContext.
- Utworzono całkowicie nowy system kontroli dźwięku który został już zaimplementowany do \_layout.tsx, GameMenu.tsx, CallingScreen.tsx,
- Utworzono ustawienia odrębnie dla dźwięku oraz muzyki w tle.

### **Do przetestowania:**

- Sprawdzić czy teraz po usunięciu parametru `"orientation": "portrait"` ekran na iPAD dalej się obraca.
  > Zostało to wcześniej sprawdzone na tablecie Samsung Galaxy - ekran nie obraca się.

> **Uwagi:**
> Commity o ID: 083b5dd, bf93000, a3071f9 wystąpiły z błędu GIT na moim komputerze. Opisałem sytuację na WhatsApp więc pozwole sobie przekopiować tutaj treść wiadomości:

_Treść wiadomości z WHATSAPP_:
Witam chciałbym poinformować o tych 3 commitach, wystąpił u mnie problem z githubem gdy chciałem pozmieniać nazwy nagle wywaliło mi błędami, nie dało się zapisywać plików a na sam koniec wywaliło mnie z brancha na pojedyńczego commita.....
Dlatego wróciłem do projektu raz jeszcze, switchnąłem się na branch dev i pushnąłem to co miałem związane z Context API.
Uwzględnie to w uwagach przy changelog.

> Te 3 commity odnoszą się do zmiany z Context API tj. podpięcie HomeScreen, PrologScreen, HistoryScreen ViewModels pod LanguageContext.tsx.

---

## [1.8.1] - 2025-04-28

### 🛠 Refaktoryzacja

- Usunięto `getSuffix` z kodu, nie jest już potrzebny.
- Usunięto `DialogueController`, nie był już obsługiwany przez aktualny kod.
- Usunięto `useLanguage.ts`, został zastąpiony modelem `LanguageController.ts`
- Usunięto stary folder `translations/`, tłumaczenia zostały przeniesione do i18n/
- Przeniesiono `LoadInterestialAd` oraz `LoadBannerAd` do `servies/`
- Przeniesienie getCurrentAct do `services/`
- Usunięto parametr `"orientation": "portrait",` z app.json aby usunąć prawdopodobne kolidowanie z modułem `expo-screen-orientation`
- Przeniesienie `settings/` do głownej struktury projektu.
- Przeniesienie `NPCData.ts` do `settings/`
- Usunięcie reszty niepotrzebnego kodu z `lib/` oraz przeniesienie ustawień ekranów z `lib/screens/` do `settings/screens`
- Utworzono nowy `viewmodel` o nazwie `useDialogue`.
- Usunięcie `getLoggera` z projektu z powodu braku kompatybilności podczas renderowania komponentów.
- Utworzono nowy `viewmodel` dla ekranu `app/index.tsx` zwanego potocznie `HomeScreen`
- Utworzono nowy `viewmodel` dla ekranu `app/prolog/index.tsx` zwanego potocznie `PrologScreen`
- Usunięto w `/app/game/` folder `_components/` który służył wcześniej jako folder dla dedykowanych komponentów
- Utworzono nowy `viewmodel` dla ekranu `app/history/index.tsx` zwanego potocznie `HistoryScreen`

### **Do przetestowania:**

Sprawdzić czy teraz po usunięciu parametru `"orientation": "portrait"` ekran na iPAD dalej się obraca.

- Zostało to wcześniej sprawdzone na tablecie Samsung Galaxy - ekran nie obraca się. \*

> **Uwagi:**
> W nadchodzącej wersji 1.8.2 zostaną dodane Context API do przechowywania stanu gry.
> Dodatkowo utworzę jeszcze nowy kontroler dźwięku.

---

## [1.8.0] - 2025-04-27

### ✨ Nowe funkcje

- Utworzono strukturę katalogów `/components/`, `/screens/`, `/hooks/`, `/services/`, `/viewmodels/`, `/store/`, `/context/`, `/models/`, `/utils/`, `/i18n/`.
- Przeniesiono tłumaczenia aplikacji do `/i18n/translations.ts`.

### 🛠 Refaktoryzacja

- Przebudowa komponentów `GameMenu`, `ActsSwitch`, `DialogueBox` według architektury MVVM — logika została przeniesiona do osobnych ViewModeli.
- Utworzenie `useGameMenuViewModel.ts`, `useActsSwitchViewModel.ts`, `useDialogueBoxViewModel.ts`.
- Przeniesiono logikę gry (`useGameEngine.ts`) do folderu `/hooks/`.
- Przeniesiono funkcje pomocnicze (`scenarioLoader`, `soundController`, `saveToHistory`, `schedulePushNotification`) do `/services/`.
- Przygotowanie folderu `/store/` pod implementację globalnego store'a (Zustand lub Context API).
- Przygotowanie folderu `/models/` na przyszłe modele danych i typy.

### 🧹 Czyszczenie projektu

- Usunięto niepotrzebne, stare foldery (`_components/`, stare ekrany śmierci i końca aktu).
- Przeniesiono komponenty przycisków (`ActsSwitch`, `GameMenu`, `OptionsBox`) do `/components/buttons/`.
- Zaktualizowano `.gitignore` — dodano ignorowanie plików `.zip`.

### 🧪 Przygotowanie do testów

- Przygotowano strukturę `/__tests__/` pod sanity-checki i testy jednostkowe głównych komponentów.

### 🛡 Stabilność

- Wstępna blokada rotacji ekranu poprzez ustawienia w `app.json`.
- Przygotowanie miejsca na dodatkową obsługę `ScreenOrientation` w runtime.

---

> **Uwagi:**  
> Wersja 1.8.0 obejmuje duże zmiany strukturalne i wprowadzenie architektury MVVM do kluczowych komponentów.  
> Prace nad uzupełnieniem globalnego store'a i testów jednostkowych są zaplanowane na kolejne commity.

---

## [1.7.0] - 2025-04-21

### ✨ Nowe funkcje

- Pełna kompatybilność Android, zakończone wszystkie akty, poprawne działanie funkcji.
- Dodano nowy widok `/game` w wersji alpha.
- Utworzono loader dla reklam Interstitial.
- Utworzono helper do pobierania aktualnego aktu.
- Utworzono silnik gry `useGameEngine.ts`.
- Utworzono loader scenariuszy.
- Utworzono kontroler dźwięków.

### 🛠 Refaktoryzacja i poprawki

- Usunięto niepotrzebne layouty i stare konfiguracje.
- Utworzono nową konfigurację aktów.
- Zaktualizowano Main Layout.
- Aktualizacja komponentów i poprawa kodu.
- Dodano logger dla konsoli.

---

## [1.6.9] - 2025-04-18

### ✨ Nowe funkcje

- Utworzono folder `viewmodels/` z ActsSwitch, GameMenu, DialogueBox, HomeScreen, PrologScreen, HistoryScreen.
- Utworzono podfolder `buttons/` w `components/`.
- Dodano eksport zmiennej z ID bannerów.
- Dodano funkcję zapisu danych gry do cache.
- Utworzono helper do przywracania stanu gry.
- Utworzono nową ścieżkę historii.

### 🛠 Refaktoryzacja i poprawki

- Przeniesiono ekrany z `_components/` do `screens/`.
- Poprawiono odświeżanie stanu gry.
- Drobne poprawki w kodzie.
- Poprawki scenariuszy.
- Aktualizacja importów w projekcie.
- Usunięto stary kod gry.

---

## [1.6.8] - 2025-04-14

### ✨ Nowe funkcje

- Utworzono argument `scenario` w konfiguracji aktów.
- Utworzono główny loader reklam bannerowych.
- Utworzono hook dla ciemnego motywu gry.
- Utworzono obsługę dialogów, opcji wyboru i menedżer scen.

### 🛠 Refaktoryzacja i poprawki

- Aktualizacja komponentów i poprawa kodu.
- Usunięto niepotrzebne layouty.
- Aktualizacja Main Layout.
- Aktualizacja scenariuszy.

---

## [1.6.7] - 2025-04-10

### ✨ Nowe funkcje

- Utworzono testy jednostkowe dla ActsSwitch, GameMenu, OptionBox, WaitingScreen, SpecialSceneOverlay, CallingScreen, DeathScreens.

### 🛠 Poprawki

- Drobne poprawki kodu.
- Zakomentowano console.log dla załadowanych scen.

---

## [1.6.6] - 2025-04-05

### ✨ Nowe funkcje

- Utworzono system WaitingScreenContext API.
- Utworzono DarknessUI Context.
- Zaktualizowano Root Layout pod WaitingScreenContext.

### 🛠 Poprawki

- Sprawdzanie czasu gry i usuwanie ekranu po zakończeniu czasu.
- Poprawa CallingScreen i GameMenu pod nowe API.

---

## [1.6.5] - 2025-03-28

### ✨ Nowe funkcje

- Utworzono akt 3 scenariusza.
- Dodano obsługę zamków żeńskich/męskich.
- Dodano obsługę dialogów dla nowych NPC.
- Utworzono komponent DeathScreens.

### 🛠 Poprawki

- Usunięto zbędne pliki.
- Poprawa wyświetlania ekranów oczekiwania.
- Poprawa błędów w kodzie.

---

## [1.6.4] - 2025-03-20

### ✨ Nowe funkcje

- Utworzono helper dla scenariusza (czasy, statusy, zmiana koloru UI).
- Utworzono specjalne ekrany (Special Screen, NotifyScreen).
- Utworzono nowe zdjęcia NPC.

### 🛠 Poprawki

- Naprawiono błędy w scenariuszach.
- Naprawiono ścieżki, indeksy, start gry.
- Usunięto niepotrzebne pliki.
- Poprawiono prolog.

---

## [1.6.3] - 2025-03-15

### ✨ Nowe funkcje

- Obsługa testowego aktu 1.
- Utworzono obsługę END ACT SCENES i DEF/ACT SCREEN SCENES.
- Utworzono funkcję oczekiwania (WaitingScreen).

### 🛠 Poprawki

- Poprawa kodu oczekiwania.
- Aktualizacja app.json.
- Poprawa UI DeathScreens.
- Aktualizacja checkpointów.
- Poprawa obsługi dźwięku i muzyki.

---

## [1.6.2] - 2025-03-10

### ✨ Nowe funkcje

- Dodano obsługę muzyki (łączonej i w menu).
- Dodano kontroler muzyki i listę w settings.
- Utworzono szkielet GameMenu.
- Utworzono warstwę testową dla aktów.
- Utworzono akt startowy.
- Utworzono kontrolę oczekiwania z postępem.

### 🛠 Poprawki

- Naprawa prologu.
- Poprawa błędów w dialogach.
- Usunięto zbędny kod.
