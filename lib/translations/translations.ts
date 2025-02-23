export const translations = {
  pl: {
    // TEST
    oczekiwanieStart: "Czekaj na odpowiedź...",
    oczekiwanieKoniec: "Dziękuję za czekanie. Przechodzimy dalej...",

    // Tytuły NPC - muszą być dodsane do NPCData.ts w /lib
    officerTitle: "Oficer Rekrutacyjny",
    mechanicTitle: "Mechanik Pokładowy",
    captainTitle: "Kapitan Statku",
    flightControlCenterTitle: "Centrum Kontroli Lotów",

    // Ekrany śmierci

    // Ekrany końcowe
    endActCompleted: "Zakończono akt",
    endActNext: "Przenosimy się do następnego aktu...",
    endActWaiting: "Proszę czekać...",

    // Scenariusz – startgame (startgame.tsx)
    dzwoniOfficer: "Dzwoni officer rekrutujący...",
    odbierzPolaczenie: "Odbierz połączenie",
    connecting: "Łączenie z oficerem rekrutującym...",
    welcome:
      "Kolejny... Witamy w centrum rekrutacji! Jak się do Ciebie zwracać?",
    pan: "Pan...",
    pani: "Pani...",
    dalej_pan:
      "Kontynuujemy proces rekrutacji... Wybrałeś wcześniej swoją płeć.",
    dalej_pani:
      "Kontynuujemy proces rekrutacji... Wybrałaś wcześniej swoją płeć.",
    continueText: "Przejdź dalej.",
    zlyWyborText: "Wybierasz teraz złą decyzję - test śmierci.",
    zlyRuchText: "Wybrałeś złą drogę MATOLE!",
    pytanieOPowody00001:
      "Masz pojęcie na co się w ogóle piszesz? Mało kto wraca.",
    odpowiedzPowod00001: "Mam swoje powody...",
    odpowiedzPowod00002: "Nie twój interest...",
    przejscieDoMisjiPowody00001:
      "No dobrze. Przejdźmy do procedury rekrutacyjnej... Która to będzie Twoja misja?",
    pytaniePowitalneOpcja1: "Mam swoje powody...",
    pytaniePowitalneOpcja2: "Nie twój interes...",
    przejscieDoMisjiOpcja1: "To będzie moja pierwsza misja.",
    przejscieDoMisjiOpcja2: "[Skłam] Chyba trzecia.",
    pierwszaMisjaOpcja1: "Lubię grać w drużynie.",
    pierwszaMisjaOpcja2: "Jestem samotnym wilkiem.",
    wyborStatkuOpcja1: "Klasa Selenari.",
    wyborStatkuOpcja2: "Klasa Venturi.",
    wyborZaopatrzeniaOpcja1: "Dodatkowy prowiant.",
    wyborZaopatrzeniaOpcja2: "Broń i dron zwiadowczy.",
    pytanieOZdrowieOpcja1: "Nie. Wszystko ze mną dobrze.",
    pytanieOZdrowieOpcja2: "Kiedyś coś się stało...",
    potwierdzenieFormularzaOpcja1: "Wyślij zgłoszenie",
    potwierdzenieFormularzaOpcja2: "Zacznij od nowa",
    rozpatrzenieOpcja1: "Startujemy!",
    rozpatrzenieOpcja2: "Zacznij od nowa.",
    przejscie_do_misji_nie_interes:
      "Masz racje. Już więcej nie zapytam. Przejdźmy do procedury rekrutacyjnej... Która to będzie misja?",
    pierwsza_misja:
      "Ok. Czyli zaczynamy wszystko od początku. Wolisz lot załogowy czy pojedynczy?",
    klamstwo_trzecia_misja:
      "Dziwne. Nie figurujesz w mojej bazie danych. Nieważne, musimy zacząć od początku. Wolisz lot załogowy czy pojedynczy?",
    zalogowy: "Znajdziemy Ci ciekawą załogę... Jaki statek preferujesz?",
    pojedynczy: "Nie widzę przeszkód... Jaki statek preferujesz?",
    wybor_zaopatrzenia:
      "Przekonamy się, ile masz szczęścia... Wybierz dodatkowe zaopatrzenie.",
    pytanie_o_zdrowie:
      "Czy miałeś/aś stwierdzone zaburzenia wpływające na misję?",
    potwierdzenie_formularza: "Potwierdź wysłanie formularza...",
    rozpatrzenie_wynik:
      "Twoje zgłoszenie zostało rozpatrzone pozytywnie. Termin startu: NIEZWŁOCZNY",

    // Scenariusz - akt2 (akt-1.tsx)
    rozpoczecieAkt2: "...3...7... Halo?! Czy mnie słychać? Odbiór!",
    akt2Odp1: "Głośno i wyraźnie",
    akt2Odp2: "Mogło być lepiej",
    akt2Scen2:
      "Przed Tobą ostatnie procedury startowe. System wskazuje, że wybrałeś/aś statek klasy {{statek}}, a dodatkowe wyposażenie statku stanowi: {{wyposazenie}}. Potwierdzasz?",
    akt2Odp3: "Tak, jak od linijki",
    akt2Odp4: "Nie, chce coś zmienić",
    akt2Scen3: "Ile osób liczy załoga?",
    akt2Scen4: "Niestety na etapie nie jest to możliwe. Ile osób liczy załoga?",
    akt2Odp5: "Lecę tylko Ja",
    akt2Odp6: "Nie wiem. Gdzie moi ludzie?",

    // Intro / Prolog
    introTitle: "WSTĘP",
    prologTitle: "PROLOG",
    introText:
      "Nie jest to historia o złocie, srebrze, religii czy polityce, ale o czymś znacznie bardziej fascynującym. zapomnianym dziedzictwie innych, obcych cywilizacji...",
    prologText:
      "Skupiona na sięganiu wzrokiem w najdalsze zakamarki wszechświata ludzkość zapomniała o swoim najbliższym satelicie - księżycu. ostatecznie na jego ciemnej stronie odkryto prastarą bazę obcej, dawno  zapomnianej cywilizacji wypełnioną niezliczonymi statkami międzygwiezdnymi... pytanie “skąd pochodzimy?” stało się bardzo aktualne ale jedyne co udało się ustalić to jak uruchomić statki, które odbywały podróż w nieznanych kierunkach i nie zawsze Wracały... utworzono specjalny korpus do którego zgłosić może sie każdy niezależnie od statusu społecznego i tworząc załogę z innymi śmiałkami wyruszyć w podróż “Bez powrotu”...",
    clickToContinue: "KLIKNIJ ABY KONTYNUOWAĆ",

    // Ekran startowy
    startScreenTitle: "BEZ POWROTU",
    startScreenSubtitle: "KLIKNIJ EKRAN ABY ROZPOCZĄĆ",

    // Menu
    menuButtonText: "MENU",
    menuResetTitle: "Reset gry",
    menuResetMessage:
      "Na pewno chcesz zresetować grę i zacząć od nowa? - Reset wyczyści dane wszystkich aktów.",
    menuResetCancel: "Anuluj",
    menuResetConfirm: "Tak, resetuj",
    menuResetError: "Błąd podczas restartu aplikacji:",
  },
  en: {
    // TEST
    oczekiwanieStart: "Czekaj na odpowiedź...",
    oczekiwanieKoniec: "Dziękuję za czekanie. Przechodzimy dalej...",

    // Titles NPC
    officerTitle: "RECRUITMENT OFFICER",
    mechanicTitle: "SHIP MECHANIC",
    captainTitle: "SHIP CAPTAIN",
    flightControlCenterTitle: "Flight Control Center",

    // Ekrany śmierci

    // Ekrany końcowe
    endActCompleted: "Zakończono akt",
    endActNext: "Przenosimy się do następnego aktu...",
    endActWaiting: "Proszę czekać...",

    // Scenario – Act 1
    dzwoniOfficer: "Incoming call from recruitment officer...",
    odbierzPolaczenie: "Answer the call",
    connecting: "Connecting to recruitment officer...",
    welcome:
      "Next... Welcome to the recruitment center! How should we address you?",
    pan: "Mr...",
    pani: "Ms...",
    dalej: "Continuing recruitment process...",
    dalej_pan: "Continuing recruitment process...",
    dalej_pani: "Continuing recruitment process...",
    continueText: "Go On",
    zlyWyborText: "You are now choosing the wrong decision - the death test.",
    zlyRuchText: "You have chosen the wrong path MATOLE!",
    pytaniePowitalneOpcja1: "I have my reasons...",
    pytaniePowitalneOpcja2: "None of your business...",
    przejscieDoMisjiOpcja1: "This will be my first mission.",
    przejscieDoMisjiOpcja2: "[Lie] Probably third.",
    pierwszaMisjaOpcja1: "I like to play in a team.",
    pierwszaMisjaOpcja2: "I’m a lone wolf.",
    wyborStatkuOpcja1: "Selenari class.",
    wyborStatkuOpcja2: "Venturi class.",
    wyborZaopatrzeniaOpcja1: "Extra supplies.",
    wyborZaopatrzeniaOpcja2: "Weapons and scout drone.",
    pytanieOZdrowieOpcja1: "No. I’m fine.",
    pytanieOZdrowieOpcja2: "Something happened once...",
    potwierdzenieFormularzaOpcja1: "Send the application",
    potwierdzenieFormularzaOpcja2: "Start over",
    rozpatrzenieOpcja1: "Let’s go!",
    rozpatrzenieOpcja2: "Start over.",
    przejscie_do_misji_nie_interes:
      "You’re right. I won’t ask again. Let’s move on to the recruitment procedure... Which mission will it be?",
    pierwsza_misja:
      "Ok. So we’re starting everything from scratch. Do you prefer a crewed flight or a solo one?",
    klamstwo_trzecia_misja:
      "Strange. You’re not in my database. Never mind, we need to start from the beginning. Do you prefer a crewed flight or a solo one?",
    zalogowy:
      "We’ll find you an interesting crew... Which spacecraft do you prefer?",
    pojedynczy: "I see no objections... Which spacecraft do you prefer?",
    wybor_zaopatrzenia:
      "Let’s see how lucky you are... Choose additional supplies.",
    pytanie_o_zdrowie:
      "Have you been diagnosed with any conditions that could affect the mission?",
    potwierdzenie_formularza: "Confirm the submission of the form...",
    rozpatrzenie_wynik:
      "Your application has been approved. Launch date: IMMEDIATE",

    // Intro / Prolog
    introTitle: "INTRO",
    prologTitle: "PROLOGUE",
    introText: "THIS IS NOT A STORY ABOUT GOLD...",
    prologText: "FOCUSED ON GAZING...",
    clickToContinue: "CLICK TO CONTINUE",

    // Start Screen
    startScreenTitle: "NO RETURN",
    startScreenSubtitle: "TAP SCREEN TO START",

    // Menu
    menuButtonText: "MENU",
    menuResetTitle: "Reset Game",
    menuResetMessage:
      "Are you sure you want to reset the game and start over? - This will clear data for all acts.",
    menuResetCancel: "Cancel",
    menuResetConfirm: "Yes, reset",
    menuResetError: "Error during app restart:",
  },
};

export type Language = keyof typeof translations;
