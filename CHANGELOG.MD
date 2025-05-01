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

## [1.7.0] - 2025-04-26

### ✨ Nowe funkcje

- Dodano pełną kompatybilność z Androidem.
- Ukończono wszystkie akty gry.
- Poprawiono UI w wielu miejscach.

### 🛠 Refaktoryzacja i poprawki

- Naprawiono WaitingScreen, NotifyScreen, GameMenu, ActsSwitch.
- Zakomentowano pokazywanie czasu na WaitingScreenOverlay.
- Zaktualizowano pliki konfiguracyjne, w tym `.gitignore`.
- Poprawiono historię czatów.

### 📦 Inne

- Dodano nowe grafiki.

---

## [1.6.8] - 2025-04-24

### ✨ Nowe funkcje

- Dodano przełączniki (Switch) aktów.
- Ulepszono historię czatów.

### 🛠 Poprawki UI i błędów

- Naprawiono błędy WaitingScreen.
- Poprawiono wyświetlanie ekranów oczekiwania.
- Poprawiono tłumaczenia (translations.ts, PrivacyText).
- Poprawiono wygląd GameMenu.
- Aktualizacja ścieżek importów.

---

## [1.6.7] - 2025-04-22

### ✨ Nowe funkcje

- Utworzono loader dla reklam typu Interstitial.
- Dodano nowy widok `/game` do odgrywania całej gry.
- Utworzono helper do pobierania aktualnego aktu.
- Utworzono kontroler dźwięków i obsługę dialogów.
- Utworzono manager scen i hook dla ciemnego motywu gry.

### 🛠 Refaktoryzacja

- Utworzono główny loader dla reklam bannerowych.
- Przeniesiono komponenty gry i poprawiono kod.
- Dodano helper do przywracania stanu gry.
- Dodano obsługę zapisu danych gry do cache.
- Dodano odświeżanie stanu gry i wykrywanie zmian.

---

## [1.6.6] - 2025-04-20

### ✨ Struktura projektu

- Przeniesiono ekrany z `_components/` do `screens/`.
- Utworzono podfolder `buttons/` w `components/`.
- Utworzono folder `viewmodels/` i dodano modele ActsSwitch i GameMenu.
- Usunięto stare foldery ekranu śmierci i końca aktu.
- Aktualizacja `.gitignore` (dodano \*.zip).
- Utworzono `viewmodel` dla DialogueBox, HomeScreen, PrologScreen, HistoryScreen.

### 🛠 Refaktoryzacja i czyszczenie

- Przeniesiono pliki do `services/`, `i18n/`, `models/`, `hooks/`.
- Usunięto folder `lib/` i stare skrypty.
- Aktualizacja importów w całym projekcie.

---

## [1.6.5] - 2025-04-18

### ✨ Testy jednostkowe

- Utworzono testy dla ActsSwitch, GameMenu, OptionBox, WaitingScreen, SpecialSceneOverlay, CallingScreen, DeathScreens.

### 🛠 Poprawki

- Dodano konfigurację `jest` i mocki dla `expo-av`.
- Poprawiono UI DeathScreen.
- Dodano obsługę DarknessUI w silniku gry.
- Poprawiono logikę włączania/wyłączania DarknessUI.

---

## [1.6.4] - 2025-04-16

### ✨ Powiadomienia

- Dodano prośbę o zgodę na wysyłanie powiadomień w `_layout.tsx`.
- Dodano obsługę przechowywania danych o powiadomieniu.
- Zaktualizowano silnik gry pod usuwanie danych powiadomień.
- Dodano debugowanie w `schedulePushNotifications.ts`.

### 🛠 Poprawki

- Zaktualizowano CallingScreen pod kontroler dźwięku i LanguageContext.
- Utworzono ustawienia assetów dla dźwięku.
- Dodano obsługę ustawień dźwięku w GameMenuViewModel.
- Zaktualizowano tłumaczenia.

---

## [1.6.3] - 2025-04-14

### ✨ Context API

- Utworzono Context API dla WaitingScreen i DarknessUI.
- Podpięto WaitingScreen pod nowy ContextAPI.
- Dodano obsługę WaitingScreenContext w Root Layout.

### 🛠 Poprawki

- Dodano sprawdzanie czasu gry i usuwanie ekranu po zakończeniu czasu.
- Zakomentowano console.log dla załadowanych scen.
- Utworzono testy jednostkowe dla ActsSwitch i GameMenu.
