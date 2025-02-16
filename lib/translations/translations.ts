export const translations = {
    pl: {
        officerTitle: 'OFICER REKRUTACYJNY',
        mechanicTitle: 'MECHANIK POKŁADOWY',
        captainTitle: 'KAPITAN STATKU',
        dzwoniOfficer: 'Dzwoni officer rekrutujący...',
        odbierzPolaczenie: 'Odbierz połączenie',
        connecting: 'Łączenie z oficerem rekrutującym...',
        welcome: 'Kolejny... Witamy w centrum rekrutacji! Jak się do Ciebie zwracać?',
        pan: 'Pan...',
        pani: 'Pani...',
        dalej: 'Kontynuujemy proces rekrutacji...',

        // Wstęp i Prolog
        introTitle: 'WSTĘP',
        prologTitle: 'PROLOG',
        introText: 'NIE JEST TO HISTORIA O ZŁOCIE, SREBRZE, RELIGII CZY POLITYCE, ALE O CZYMŚ ZNACZNIE BARDZIEJ FASCYNUJĄCYM... ZAPOMNIANYM DZIEDZICTWIE INNYCH, OBCYCH CYWILIZACJI...',
        prologText:
            'SKUPIONA NA SIĘGANIU WZROKIEM W NAJDALSZE ZAKAMARKI WSZECHŚWIATA LUDZKOŚĆ ZAPOMNIAŁA O SWOIM NAJBLIŻSZYM SATELICIE – KSIĘŻYCU. OSTATECZNIE NA JEGO CIEMNEJ STRONIE ODKRYTO PRASTARĄ BAZĘ OBCEJ, DAWNO ZAPOMNIANEJ CYWILIZACJI WYPEŁNIONĄ NIEZLICZONYMI STATKAMI MIĘDZYGWIEZDNYMI...\n\nPYTANIE “SKĄD POCHODZIMY?” STAŁO SIĘ BARDZO AKTUALNE, ALE JEDYNE CO UDAŁO SIĘ USTALIĆ TO JAK URUCHOMIĆ STATKI, KTÓRE ODBYWAŁY PODRÓŻ W NIEZNANYCH KIERUNKACH I NIE ZAWSZE WRACAŁY...\n\nUTWORZONO SPECJALNY KORPUS DO KTÓREGO ZGŁOSIĆ MOŻE SIĘ KAŻDY NIEZALEŻNIE OD STATUSU SPOŁECZNEGO I TWORZĄ ZAŁOGĘ Z INNYMI ŚMIAŁKAMI WYRUSZYĆ W PODRÓŻ “BEZ POWROTU”.',
        clickToContinue: 'KLIKNIJ ABY KONTYNUOWAĆ',
    },
    en: {
        officerTitle: 'RECRUITMENT OFFICER',
        mechanicTitle: 'SHIP MECHANIC',
        captainTitle: 'SHIP CAPTAIN',
        dzwoniOfficer: 'Incoming call from recruitment officer...',
        odbierzPolaczenie: 'Answer the call',
        connecting: 'Connecting to recruitment officer...',
        welcome: 'Next... Welcome to the recruitment center! How should we address you?',
        pan: 'Mr...',
        pani: 'Ms...',
        dalej: 'Continuing recruitment process...',

        // Wstęp i Prolog
        introTitle: 'INTRO',
        prologTitle: 'PROLOGUE',
        introText: 'THIS IS NOT A STORY ABOUT GOLD, SILVER, RELIGION, OR POLITICS, BUT ABOUT SOMETHING MUCH MORE FASCINATING... THE FORGOTTEN LEGACY OF OTHER, ALIEN CIVILIZATIONS...',
        prologText:
            'FOCUSED ON GAZING INTO THE FARTHEST REACHES OF THE UNIVERSE, HUMANITY FORGOT ABOUT ITS NEAREST SATELLITE – THE MOON. EVENTUALLY, ON ITS DARK SIDE, AN ANCIENT BASE OF AN ALIEN, LONG-FORGOTTEN CIVILIZATION WAS DISCOVERED, FILLED WITH COUNTLESS INTERSTELLAR SHIPS...\n\nTHE QUESTION "WHERE DO WE COME FROM?" BECAME VERY RELEVANT, BUT THE ONLY THING WE MANAGED TO DETERMINE WAS HOW TO ACTIVATE THE SHIPS, WHICH TRAVELED TO UNKNOWN DIRECTIONS AND DID NOT ALWAYS RETURN...\n\nA SPECIAL CORPS WAS FORMED TO WHICH ANYONE COULD APPLY, REGARDLESS OF SOCIAL STATUS, FORMING A CREW TO EMBARK ON A JOURNEY "NO RETURN".',
        clickToContinue: 'CLICK TO CONTINUE',
    },
};

export type Language = keyof typeof translations;
