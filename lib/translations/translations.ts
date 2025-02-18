export const translations = {
    pl: {
        // TEST
        oczekiwanieStart: 'Czekaj na odpowiedź...',
        oczekiwanieKoniec: 'Dziękuję za czekanie. Przechodzimy dalej...',

        // Tytuły NPC
        officerTitle: 'OFICER REKRUTACYJNY',
        mechanicTitle: 'MECHANIK POKŁADOWY',
        captainTitle: 'KAPITAN STATKU',

        // Ekrany śmierci

        // Ekrany końcowe
        endOfAct: 'Zakończono akt',

        // Scenariusz – Akt 1
        dzwoniOfficer: 'Dzwoni officer rekrutujący...',
        odbierzPolaczenie: 'Odbierz połączenie',
        connecting: 'Łączenie z oficerem rekrutującym...',
        welcome: 'Kolejny... Witamy w centrum rekrutacji! Jak się do Ciebie zwracać?',
        pan: 'Pan...',
        pani: 'Pani...',
        dalej_pan: 'Kontynuujemy proces rekrutacji... Wybrałeś wcześniej swoją płeć.',
        dalej_pani: 'Kontynuujemy proces rekrutacji... Wybrałaś wcześniej swoją płeć.',
        continueText: 'Przejdź dalej.',
        zlyWyborText: 'Wybierasz teraz złą decyzję - test śmierci.',
        zlyRuchText: 'Wybrałeś złą drogę MATOLE!',

        // Intro / Prolog
        introTitle: 'WSTĘP',
        prologTitle: 'PROLOG',
        introText: 'NIE JEST TO HISTORIA O ZŁOCIE...',
        prologText: 'SKUPIONA NA SIĘGANIU...',
        clickToContinue: 'KLIKNIJ ABY KONTYNUOWAĆ',

        // Ekran startowy
        startScreenTitle: 'BEZ POWROTU',
        startScreenSubtitle: 'KLIKNIJ EKRAN ABY ROZPOCZĄĆ',

        // Menu
        menuButtonText: 'MENU',
        menuResetTitle: 'Reset gry',
        menuResetMessage: 'Na pewno chcesz zresetować grę i zacząć od nowa? - Reset wyczyści dane wszystkich aktów.',
        menuResetCancel: 'Anuluj',
        menuResetConfirm: 'Tak, resetuj',
        menuResetError: 'Błąd podczas restartu aplikacji:',
    },
    en: {
        // TEST
        oczekiwanieStart: 'Czekaj na odpowiedź...',
        oczekiwanieKoniec: 'Dziękuję za czekanie. Przechodzimy dalej...',

        // Titles NPC
        officerTitle: 'RECRUITMENT OFFICER',
        mechanicTitle: 'SHIP MECHANIC',
        captainTitle: 'SHIP CAPTAIN',

        // Ekrany śmierci

        // Ekrany końcowe
        endOfAct: 'Zakończono akt',

        // Scenario – Act 1
        dzwoniOfficer: 'Incoming call from recruitment officer...',
        odbierzPolaczenie: 'Answer the call',
        connecting: 'Connecting to recruitment officer...',
        welcome: 'Next... Welcome to the recruitment center! How should we address you?',
        pan: 'Mr...',
        pani: 'Ms...',
        dalej: 'Continuing recruitment process...',
        dalej_pan: 'Continuing recruitment process...',
        dalej_pani: 'Continuing recruitment process...',
        continueText: 'Go On',
        zlyWyborText: 'You are now choosing the wrong decision - the death test.',
        zlyRuchText: 'You have chosen the wrong path MATOLE!',

        // Intro / Prolog
        introTitle: 'INTRO',
        prologTitle: 'PROLOGUE',
        introText: 'THIS IS NOT A STORY ABOUT GOLD...',
        prologText: 'FOCUSED ON GAZING...',
        clickToContinue: 'CLICK TO CONTINUE',

        // Start Screen
        startScreenTitle: 'NO RETURN',
        startScreenSubtitle: 'TAP SCREEN TO START',

        // Menu
        menuButtonText: 'MENU',
        menuResetTitle: 'Reset Game',
        menuResetMessage: 'Are you sure you want to reset the game and start over? - This will clear data for all acts.',
        menuResetCancel: 'Cancel',
        menuResetConfirm: 'Yes, reset',
        menuResetError: 'Error during app restart:',
    },
};

export type Language = keyof typeof translations;
