# Changelog

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

## [1.8.1] - 2025-04-28

### 🛠 Refaktoryzacja
