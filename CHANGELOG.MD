# Changelog

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

- Sprawdzić czy teraz po usunięciu parametru `"orientation": "portrait"` ekran na iPAD dalej się obraca.
  > Zostało to wcześniej sprawdzone na tablecie Samsung Galaxy - ekran nie obraca się.

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
