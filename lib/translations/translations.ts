export const translations = {
  pl: {
    // TEST
    oczekiwanieStart: "Czekaj na odpowiedź...",
    oczekiwanieKoniec: "Dziękuję za czekanie. Przechodzimy dalej...",

    // Tytuły NPC - muszą być dodsane do NPCData.ts w /lib
    officerTitle: "Oficer Rekrutacyjny",
    rozbitekTitle: "Rozbitek",
    captainTitle: "Kapitan Statku",
    flightControlCenterTitle: "Centrum Kontroli Lotów",
    echoTitle: "ECHO",
    dowodcaTitle: "Dowódca",
    harunKalTitle: "Ħarûn'kal",

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
    akt2Scen2_pan:
      "Przed Tobą ostatnie procedury startowe. System wskazuje, że wybrałeś statek klasy {{statek}}, a dodatkowe wyposażenie statku stanowi: {{wyposazenie}}. Potwierdzasz?",
    akt2Scen2_pani:
      "Przed Tobą ostatnie procedury startowe. System wskazuje, że wybrałaś statek klasy {{statek}}, a dodatkowe wyposażenie statku stanowi: {{wyposazenie}}. Potwierdzasz?",
    akt2Odp3: "Tak, jak od linijki",
    akt2Odp4: "Nie, chce coś zmienić",
    akt2Scen3: "Ile osób liczy załoga?",
    akt2Scen4_update:
      "Niestety na tym etapie nie jest to możliwe. Ile osób liczy załoga?",
    akt2Odp5: "Lecę tylko Ja",
    akt2Odp6: "Nie wiem. Gdzie moi ludzie?",
    akt2Scen5:
      "Wszystko się zgadza! Przygotuj się do startu. Włącz silniki i ustaw ciąg minimalny.",
    akt2Scen6:
      "Nikt Ci nie powiedział? Niestety ich prom uległ awarii poszycia i skończyło się to ... źle! Przygotuj się do startu. Włącz silniki i ustaw ciąg minimalny.",
    akt2Odp7: "Lecę tylko Ja",
    akt2Odp8: "Nie wiem. Gdzie moi ludzie?",
    akt3_scen000001_pan:
      "Mówiłam, żeby nie dotykać kryształu! Wszystko wskazuje na to, że kiedy dotknąłeś kryształu, struktura fraktali w jego wnętrzu przemieściła się - tak samo jak i my... Jesteśmy w jednym z wymiarów “niemożliwych”, a ten dokładnie jest wszechświatem bez kształtu i formy...",
    akt3_scen000001_pani:
      "Mówiłam, żeby nie dotykać kryształu! Wszystko wskazuje na to, że kiedy dotknąłaś kryształu, struktura fraktali w jego wnętrzu przemieściła się - tak samo jak i my... Jesteśmy w jednym z wymiarów “niemożliwych”, a ten dokładnie jest wszechświatem bez kształtu i formy...",
    akt3_scen000002_pan:
      "Wylądowaliśmy! Znajdujemy się nieopodal źródła sygnału. Ubierz się w skafander i opcjonalnie wyposaż w broń - o ile ją zabrałeś ",
    akt3_scen000002_pani:
      "Wylądowaliśmy! Znajdujemy się nieopodal źródła sygnału. Ubierz się w skafander i opcjonalnie wyposaż w broń - o ile ją zabrałaś ",
    akt3_scen000003_pan:
      "Sam widziałeś warunki na tej planecie. Myślisz, że mógłbym to wymyślić? Lepiej pomyśl jak mi pomóc?",
    akt3_scen000003_pani:
      "Sam widziałaś warunki na tej planecie. Myślisz, że mógłbym to wymyślić? Lepiej pomyśl jak mi pomóc?",
    akt2_scen000004_pan:
      "Bo takie jest. Sam widziałeś warunki na tej planecie. Możesz mi jakoś pomóc?",
    akt2_scen000004_pani:
      "Bo takie jest. Sam widziałaś warunki na tej planecie. Możesz mi jakoś pomóc?",
    akt2_scen000005_pan:
      "A powinieneś. Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    akt2_scen000005_pani:
      "A powinienaś. Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    akt2_scen000006_pan:
      "Zdecydowanie! Dotarłeś do wzniesienia. Teraz się skup",
    akt2_scen000006_pani:
      "Zdecydowanie! Dotarłaś do wzniesienia. Teraz się skup",
    akt2_scen000007_pan:
      "Uspokoiłeś mnie ale zanim do tego dojdzie i usiądziemy przy zimnym piwku będziemy musieli wymyśleć jak mnie znaleść.",
    akt2_scen000007_pani:
      "Uspokoiłaś mnie ale zanim do tego dojdzie i usiądziemy przy zimnym piwku będziemy musieli wymyśleć jak mnie znaleść.",
    akt2_scen000008_pan:
      "A powinieneś. Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    akt2_scen000008_pani:
      "A powinienaś. Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    akt2_scen000009_pan:
      "Uspokoiłeś mnie ale zanim do tego dojdzie i usiądziemy przy zimnym piwku będziemy musieli wymyśleć jak mnie znaleść.",
    akt2_scen000009_pani:
      "Uspokoiłaś mnie ale zanim do tego dojdzie i usiądziemy przy zimnym piwku będziemy musieli wymyśleć jak mnie znaleść.",
    akt2_scen000010_pan:
      "Dotarłeś na szczyt kanionu. Już niedaleko do źródła sygnału ... Pamiętaj, jesteś tam sam/a, bez wsparcia - każdy twój krok może przynieść odkrycia... albo zagrożenia...",
    akt2_scen000010_pani:
      "Dotarłaś na szczyt kanionu. Już niedaleko do źródła sygnału ... Pamiętaj, jesteś tam sam/a, bez wsparcia - każdy twój krok może przynieść odkrycia... albo zagrożenia...",
    akt2_scen000011_pan:
      "Protokół zaleca zbadanie sygnały. Wolałabym nie zgłaszać niesubordynacji ale sam decydujesz.",
    akt2_scen000011_pani:
      "Protokół zaleca zbadanie sygnały. Wolałabym nie zgłaszać niesubordynacji ale sama decydujesz.",

    AIPL_akt2Scen4_update:
      "Nie można zmienić konfiguracji. System zgłasza niezgodność danych.",
    AIPL_akt2Scen4_update_option1: "Lecę tylko ja",
    AIPL_akt2Scen4_update_option2: "Nie wiem. Gdzie moi ludzie?",

    AIPL_akt2Scen5: "Wszystko się zgadza. Możesz kontynuować.",
    AIPL_akt2Scen5_option1: "Ustaw ciąg minimalny",
    AIPL_akt2Scen5_option2: "Nie ma na co czekać. Ustaw maks!",

    AIPL_akt2Scen6: "Twoja załoga została utracona. Nie ma odwrotu.",
    AIPL_akt2Scen6_option1: "Ustaw ciąg minimalny",
    AIPL_akt2Scen6_option2: "Nie ma na co czekać. Ustaw maks!",

    AIPL_akt2Scen7:
      "Potwierdzam ciąg minimalny! Teraz sprawdź systemy zasilania.",
    AIPL_akt2Scen7_option1: "Zasilanie działa poprawnie",
    AIPL_akt2Scen7_option2: "Nie mam na to czasu. Co dalej?",

    AIPL_akt2Scen8:
      "Jak chcesz. Potwierdzam ciąg maksymalny! Teraz sprawdź systemy zasilania.",
    AIPL_akt2Scen8_option1: "Zasilanie działa poprawnie",
    AIPL_akt2Scen8_option2: "Nie mam na to czasu. Co dalej?",

    AIPL_akt2_start_dobry: "Wszystko wygląda w porządku! Możesz startować.",
    AIPL_akt2_start_dobry_option1: "STARTUJEMY!",
    AIPL_akt2_start_dobry_option2: "Wróć do procedury",

    AIPL_akt2_start_zly: "BŁĄD: Niepoprawne ustawienia startu! Awaria silnika!",

    AIPL_akt2_po_starcie:
      "Przed Tobą nieokreślona podróż. Możesz udać się do komory hibernacyjnej – zostaniesz automatycznie wybudzony w przypadku jakiegoś zdarzenia lub pozwiedzać swój nowy dom.",
    AIPL_akt2_po_starcie_option1: "Udaj się do komory hibernacyjnej",
    AIPL_akt2_po_starcie_option2: "Zwiedzaj statek",

    AIPL_akt2_hibernacja:
      "Hibernacja rozpoczęta. Wybudzenie nastąpi w przypadku zagrożenia.",

    AIPL_akt2_pobudka: "Zostajesz gwałtownie wybudzony. Coś się dzieje...",

    AIPL_akt2_zwiedzanie:
      "Statek składa się z trzech głównych części. Którą chcesz zwiedzić?",
    AIPL_akt2_zwiedzanie_option1: "Człon dowodzenia",
    AIPL_akt2_zwiedzanie_option2: "Magazyn zaopatrzenia",
    AIPL_akt2_zwiedzanie_option3: "Część załogowa i kantyna",

    AIPL_akt2_dowodzenie:
      "W tej części statku znajdują się instrumenty nawigacyjne i sterowanie statku. Niestety nie wiemy, jak działa większość dostępnych urządzeń...",
    AIPL_akt2_dowodzenie_option1: "Zmień pomieszczenie",
    AIPL_akt2_dowodzenie_option2: "Udaj się do komory hibernacyjnej",

    AIPL_akt2_magazyn:
      "Tutaj znajdują się skrzynie z prowiantem, lekami, uzbrojeniem i wyposażeniem dodatkowym zamówionym przez Ciebie.",
    AIPL_akt2_magazyn_option1: "Zmień pomieszczenie",
    AIPL_akt2_magazyn_option2: "Udaj się do komory hibernacyjnej",

    AIPL_akt2_zaloga:
      "Tutaj znajduje się Twoja komora hibernacyjna oraz infrastruktura niezbędna do podtrzymania życia. Nic specjalnie interesującego...",
    AIPL_akt2_zaloga_option1: "Zmień pomieszczenie",
    AIPL_akt2_zaloga_option2: "Kontynuuj eksplorację",

    AIPL_akt2_krysztal:
      "Widzisz ten kryształ przytwierdzony do stołu? Pierwszy raz taki widzę. Chcesz go zbadać bliżej?",
    AIPL_akt2_krysztal_option1: "Zmień pomieszczenie",
    AIPL_akt2_krysztal_option2: "Sprawdź kryształ!",

    AIPL_akt2_krysztal_analiza: "Analiza w toku...",

    AIPL_akt2_krysztal_wynik:
      "Kryształ wykazuje strukturę fraktalną, która powtarza się w różnych wymiarach. To oznacza, że każdy element kryształu posiada mniejsze kopie samego siebie w innych wymiarach przestrzeni. POTENCJALNIE NIEBEZPIECZNY!",
    AIPL_akt2_krysztal_wynik_option1: "Udaj się do komory hibernacyjnej",
    AIPL_akt2_krysztal_wynik_option2: "Weź kryształ!",

    AIPL_akt2_krysztal_ostrzezenie: "ODRADZAM!",
    AIPL_akt2_krysztal_ostrzezenie_option1: "Udaj się do komory hibernacyjnej",
    AIPL_akt2_krysztal_ostrzezenie_option2: "Mimo wszystko. Weź kryształ",

    AIPL_akt2_krysztal_zagrozenie:
      "Czujesz dziwne mrowienie w dłoni, a kryształ zaczyna pulsować delikatnym światłem...",

    AIPL_akt2_krysztal_wez:
      "Kryształ w twoich rękach zaczyna drgać, po czym drganie ustaje. Zastanawiasz się, czy to w ogóle się wydarzyło...",
    AIPL_akt2_krysztal_wez_option1: "Kliknij, aby kontynuować",

    AIPL_akt2_krysztal_brak_rejestracji:
      "To już? Niczego nie zarejestrowałam. Wygląda na to, że to tylko dziwna dekoracja albo urządzenie, o którym nic nie wiemy.",
    AIPL_akt2_krysztal_brak_rejestracji_option1: "Zabierz kryształ ze sobą",
    AIPL_akt2_krysztal_brak_rejestracji_option2: "Odłóż na miejsce",

    AIPL_akt2_krysztal_nagla_zmiana: "Poczekaj. Coś się zmieniło...",
    AIPL_akt2_krysztal_nagla_zmiana_option1: "Co się stało?",
    AIPL_akt2_krysztal_nagla_zmiana_option2:
      "Nie panikuj. Nic się nie dzieje...",

    AIPL_akt2_niewidzialnosc: "Cholera! Nic nie widzę!",
    AIPL_akt2_niewidzialnosc_option1: "Kliknij, aby kontynuować",

    AIPL_akt2_plan_powrotu:
      "Jedyne co możemy zrobić to w jakiś sposób dostać się do kryształu... Pamiętasz jak do niego wrócić?",
    AIPL_akt2_plan_powrotu_option1: "Tak! Mam go w kieszeni",
    AIPL_akt2_plan_powrotu_option2: "Jest w kantynie. Musimy wrócić",

    AIPL_akt2_szukaj_krysztalu: "Rewelacyjnie! Postaraj się go odszukać...",
    AIPL_akt2_szukaj_krysztalu_option1: "Sięgnij do kieszeni",
    AIPL_akt2_szukaj_krysztalu_option2: "Szukaj kryształu w kantynie",

    AIPL_akt2_wrocenie_krysztalu:
      "Jak już Ci się udało. Zrób to co wtedy i miejmy nadzieję, że wrócimy do normalności...",
    AIPL_akt2_wrocenie_krysztalu_option1: "Potrząśnij kryształem",
    AIPL_akt2_wrocenie_krysztalu_option2: "Zniszcz kryształ",

    AIPL_akt2_krysztal_powrot:
      "Kryształ w twoich rękach zaczyna drgać, po czym drganie ustaje. Zastanawiasz się, czy to w ogóle się wydarzyło...",
    AIPL_akt2_krysztal_powrot_option1: "Kliknij, aby kontynuować",

    AIPL_akt2_gdzie_jestesmy: "Przenieśliśmy się. Pozwól sprawdzić gdzie...",
    AIPL_akt2_gdzie_jestesmy_option1: "Potrząśnij kryształem",
    AIPL_akt2_gdzie_jestesmy_option2: "Ok. Sprawdź",

    AIPL_akt2_powrot_do_normy:
      "Wszystko wskazuje na to, że jesteśmy znów na torach. Proszę, idź już do komory hibernacyjnej, nie zniosę więcej wrażeń tuż po starcie...",
    AIPL_akt2_powrot_do_normy_option1: "Niech ci będzie",
    AIPL_akt2_powrot_do_normy_option2: "Niechętnie",

    AIPL_akt2_6h_hibernacja: "Hibernacja 6h, rozpoczęta...",

    AIPL_akt2_sygnal:
      "Odbieram sygnał z mgławicy molekularnej, która znajduje się na naszej drodze. Zgodnie z dyrektywą musimy sprawdzić, co to jest i skąd pochodzi... Jakie są Twoje zalecenia?",
    AIPL_akt2_sygnal_option1: "Zignoruj sygnał. Wróć do komory",
    AIPL_akt2_sygnal_option2: "Określ dokładną lokalizację",

    AIPL_akt2_sygnal_ignoruj:
      "Niestety nie mogę tego zrobić. Za to mogę ustalić skąd pochodzi sygnał. Wszystko wskazuje na to, że sygnał jest nadawany z górskiego łańcucha na dryfującej w mgławicy molekularnej planecie – taki żłobek dla gwiazd i planet. Dość niestabilne środowisko – mogę powiedzieć.",
    AIPL_akt2_sygnal_ignoruj_option1: "Co mówi protokół?",
    AIPL_akt2_sygnal_ignoruj_option2: "Potrafisz rozszyfrować sygnał?",

    AIPL_akt2_sygnal_lokalizacja:
      "Dokładnie to próbuję ustalić. Wszystko wskazuje na to, że sygnał jest nadawany z górskiego łańcucha na dryfującej w mgławicy molekularnej planecie – taki żłobek dla gwiazd i planet. Dość niestabilne środowisko – mogę powiedzieć.",
    AIPL_akt2_sygnal_lokalizacja_option1: "Co mówi protokół?",
    AIPL_akt2_sygnal_lokalizacja_option2: "Potrafisz rozszyfrować sygnał?",

    AIPL_akt2_protokol:
      "Protokół nakazuje rozszyfrować sygnał – o ile to wykonalne – i udać się zbadać obiekt.",
    AIPL_akt2_protokol_option1: "Lądujemy!",
    AIPL_akt2_protokol_option2: "Wyślij drona zwiadowczego",

    AIPL_akt2_szyfrowanie:
      "Niestety nie potrafię tego zrobić. Jest zbyt zniekształcony... Protokół nakazuje udać się na miejsce i zbadać źródło sygnału.",
    AIPL_akt2_szyfrowanie_option1: "Lądujemy!",
    AIPL_akt2_szyfrowanie_option2: "Wyślij drona zwiadowczego",

    AIPL_akt2_skafander:
      "Jesteś gotowy/a do wyjścia. Za chwilę śluza się otworzy i wyjdziesz na powierzchnię.",
    AIPL_akt2_skafander_option1: "Wyjdź ze statku",
    AIPL_akt2_skafander_option2: "Mam jeszcze pytanie",

    AIPL_akt2_pytanie: "Śmiało! Pytaj.",
    AIPL_akt2_pytanie_option1: "Podaj informacje o planecie",
    AIPL_akt2_pytanie_option2: "Wiadomo coś nowego o sygnale?",

    AIPL_akt2_podajInfo_oplanecie:
      "To niegościnna, skalista planeta, charakteryzująca się ekstremalnymi warunkami atmosferycznymi i trudnym terenem pełnym ostrych klifów i głębokich kanionów. Gwałtowne burze piaskowe, potężne wiatry sięgające prędkości ponad 200 km/h oraz ekstremalne wahania temperatur od ponad 50°C w dzień do poniżej -30°C w nocy czynią z niej śmiertelnie niebezpieczne miejsce. Atmosfera bogata w dwutlenek siarki uniemożliwia oddychanie, a rzadka i trująca woda oraz brak roślinności sprawiają, że życie jest praktycznie niemożliwe. Pomimo bogatych zasobów mineralnych, brutalne warunki atmosferyczne i nieprzewidywalność pogody sprawiają, że planeta pozostaje w dużej mierze niezbadana i niezdobyta.",
    AIPL_akt2_podajInfo_oplanecie_option1: "Wyjdź ze statku",
    AIPL_akt2_podajInfo_oplanecie_option2: "Zadaj inne pytanie",

    AIPL_akt2_cosnoweo_osygnale:
      "Nie. Jak wspominałam, nie mogę z tego miejsca nic więcej zrobić.",
    AIPL_akt2_cosnoweo_osygnale_option1: "Wyjdź ze statku",
    AIPL_akt2_cosnoweo_osygnale_option2: "Zadaj inne pytanie",

    AIPL_akt2_powierzchnia:
      "Przed Tobą jakieś 2 km w ciężkim terenie z nieprzewidywalną pogodą. Teraz skup się i ruszaj na północ... Zaraz! Odbieram kolejną transmisję – tym razem niezakłóconą!",
    AIPL_akt2_powierzchnia_option1: "Odbierz transmisję",
    AIPL_akt2_powierzchnia_option2: "Nie odbieraj",

    AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem:
      "Niestety nie za bardzo masz wyjście. Przypominam o dyrektywach agencji! Odbieram!",
    AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem_option1: "Odbierz transmisję",
    AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem_option2: "Nie odbieraj",

    AIPL_akt2_rozbitek_powitanie: "Halo... Słychać mnie?",
    AIPL_akt2_rozbitek_powitanie_option1: "Głośno i wyraźnie!",
    AIPL_akt2_rozbitek_powitanie_option2: "Kim jesteś?",

    AIPL_akt2_rozbitek_maniery:
      "Hmm... Gdzie moje maniery... Nazywam się profesor Milo.",
    AIPL_akt2_rozbitek_maniery_option1: "Gdzie się dokładnie znajdujesz?",
    AIPL_akt2_rozbitek_maniery_option2: "Jak się znalazłeś na tej planecie?",

    AIPL_akt2_rozbitek_informacjeopobycie:
      "Żebym to ja wiedział. Nie znam nawet nazwy tej planety. Wylądowaliśmy tutaj zwiedzeni sygnałem, a raczej zostaliśmy do tego zmuszeni...",
    AIPL_akt2_rozbitek_informacjeopobycie_option1: "Coś mi to mówi...",
    AIPL_akt2_rozbitek_informacjeopobycie_option2: "Co było dalej?",

    AIPL_akt2_rozbitek_cosmitomowi:
      "Wiesz, o czym mówię. Dalej to już klasycznie... Wylądowaliśmy w środku piaskowej burzy. Nie mieliśmy pojęcia, że piasek jest tutaj niczym woda. Statek na zawsze spoczął pod piaskami, a załoga... załoga zniknęła wraz z nim... przeżyłem tylko ja...",
    AIPL_akt2_rozbitek_cosmitomowi_option1: "Brzmi racjonalnie",
    AIPL_akt2_rozbitek_cosmitomowi_option2: "Coś ściemniasz",

    AIPL_akt2_rozbitek_cobylodalej:
      "Dalej to już klasycznie... Wylądowaliśmy w środku piaskowej burzy. Nie mieliśmy pojęcia, że piasek jest tutaj niczym woda. Statek na zawsze spoczął pod piaskami, a załoga ... załoga zniknęła wraz z nim ... przeżyłem tylko ja...",
    AIPL_akt2_rozbitek_cobylodalej_option1: "Brzmi racjonalnie",
    AIPL_akt2_rozbitek_cobylodalej_option2: "Coś ściemniasz",

    AIPL_akt2_rozbitek_cossciemniasz_option1: "Najpierw muszę zbadać sygnał",
    AIPL_akt2_rozbitek_cossciemniasz_option2: "Wiesz coś o sygnale?",

    AIPL_akt2_rozbitek_brzmiracjonalnie_option1: "Najpierw muszę zbadać sygnał",
    AIPL_akt2_rozbitek_brzmiracjonalnie_option2: "Wiesz coś o sygnale?",

    AIPL_akt2_rozbitek_dialogkontynuacja:
      "Nie wiem na co jeszcze czekasz. Ruszaj!",
    AIPL_akt2_rozbitek_dialogkontynuacja_option1: "Ruszaj na północ",
    AIPL_akt2_rozbitek_dialogkontynuacja_option2: "Ruszaj na południe",

    AIPL_akt2_rozbitek_polnoc:
      "Dobrze, że pamiętałeś co mówiłam. Poszedłbyś na południe i spadłbyś w przepaść... Przed Tobą kolejny wybór. Możesz udać się przełęczą, ale będziesz narażony/a na szalone warunki pogodowe, albo wybrać drogę przez system jaskiń - z tym, że nie mam pojęcia co tam jest... Co zdecydujesz?",
    AIPL_akt2_rozbitek_polnoc_option1: "Wybieram ścieżkę przełęczą",
    AIPL_akt2_rozbitek_polnoc_option2: "Jaskinie. Pogoda jest ... szalona",

    AIPL_akt2_przelecze_start:
      "Przed Tobą spokojny spacerek o długości 1000 m do następnego podejścia. Nie śpiesz się, pogoda jest stabilna, a podłoże przypomina wielką tarkę ostrych kamieni, więc uważaj na każdy krok...",

    AIPL_akt2_przelecze_cd1:
      "Nie chce się wtrącać, ale mam nadzieję, że zabrałeś dodatkowy prowiant... Marzę o zimnym piwku.",
    AIPL_akt2_przelecze_cd1_option1: "Nie martw się. Wszystko jest",
    AIPL_akt2_przelecze_cd1_option2: "Najpierw musimy Cię znaleźć",

    AIPL_akt2_przelecze_wszystkoJest_option1: "Mam pewien pomysł",
    AIPL_akt2_przelecze_wszystkoJest_option2: "Na razie o tym nie myślę",

    AIPL_akt2_przelecze_musimycie_znalezc:
      "Zmieniasz temat. Rozumiem. Czyli mój ratunek nie jest jeszcze taki pewny. Najpierw skupmy się jak mnie znaleźć.",
    AIPL_akt2_przelecze_musimycie_znalezc_option1: "Mam pewien pomysł",
    AIPL_akt2_przelecze_musimycie_znalezc_option2: "Na razie o tym nie myślę",

    AIPL_akt2_przelecze_mam_pomysl:
      "Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe, na co Ty wpadniesz...",
    AIPL_akt2_przelecze_mam_pomysl_option1: "Zobaczysz",
    AIPL_akt2_przelecze_mam_pomysl_option2: "Na razie o tym nie myślę",

    AIPL_akt2_przelecze_cd3:
      "Widzę, że nie masz ochoty na rozmowy. Odezwę się później.",

    AIPL_akt2_przelecze_cd4_option1: "Użyj czekanów do wspinaczki",
    AIPL_akt2_przelecze_cd4_option2: "Wspinaj się klasycznie",

    AIPL_akt2_przelecze_smierc: "Spadasz w otchłań",

    AIPL_akt2_jasknie_start:
      "Idziemy jaskiniami. W takim razie ruszaj i zobaczymy, co nas tam czeka...",

    AIPL_akt2_jasknie_cd1:
      "Nie chce się wtrącać, ale mam nadzieję, że zabrałeś dodatkowy prowiant... Marzę o zimnym piwku.",
    AIPL_akt2_jasknie_cd1_option1: "Nie martw się. Wszystko jest",
    AIPL_akt2_jasknie_cd1_option2: "Najpierw musimy Cię znaleźć",

    AIPL_akt2_jasknie_musimycieznalezc:
      "Zmieniasz temat. Rozumiem. Czyli mój ratunek nie jest jeszcze taki pewny. Najpierw skupmy się, jak mnie znaleźć.",
    AIPL_akt2_jasknie_musimycieznalezc_option1: "Mam pewien pomysł",
    AIPL_akt2_jasknie_musimycieznalezc_option2: "Na razie o tym nie myślę",

    AIPL_akt2_jasknie_wszystkojestniemartwsie_option1: "Mam pewien pomysł",
    AIPL_akt2_jasknie_wszystkojestniemartwsie_option2:
      "Na razie o tym nie myślę",

    AIPL_akt2_jasknie_mampewienpomysl:
      "Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe, na co Ty wpadniesz...",
    AIPL_akt2_jasknie_mampewienpomysl_option1: "Zobaczysz",
    AIPL_akt2_jasknie_mampewienpomysl_option2: "Na razie o tym nie myślę",

    AIPL_akt2_jasknie_cd4:
      "Widzę, że nie masz ochoty na rozmowy. Odezwę się później.",

    AIPL_akt2_jasknie_cd5: "Przed Tobą studnia. Musisz jakoś ją pokonać...",
    AIPL_akt2_jasknie_cd5_option1: "Spróbuj przeskoczyć",
    AIPL_akt2_jasknie_cd5_option2: "Użyj liny",

    AIPL_akt2_jasknie_dotarlesNaSzczytKanionu_option1: "Wiem, dzięki",
    AIPL_akt2_jasknie_dotarlesNaSzczytKanionu_option2: "Niebezpieczeństwa?",

    AIPL_akt2_jasknie_jestessamotnymodkrywca:
      "Jesteś samotnym odkrywcą w tej niezbadanej przestrzeni. Ludzka psychika nie jest stworzona do takiego odosobnienia. Czy izolacja zaczyna cię już dotykać?",
    AIPL_akt2_jasknie_jestessamotnymodkrywca_option1: "Intryguje mnie",
    AIPL_akt2_jasknie_jestessamotnymodkrywca_option2: "Przytłacza mnie",

    AIPL_akt2_wszystkie_procedury:
      "Wszystkie procedury są jednoznaczne... ale mogę to zgłosić?",
    AIPL_akt2_wszystkie_procedury_option1: "Zgłoś",
    AIPL_akt2_wszystkie_procedury_option2: "Zachowaj dla siebie",

    AIPL_akt2_nadalekiej_planecie:
      "Na dalekiej planecie, z dala od codziennych zmartwień, może czasem wydawać się, że możemy uwolnić się od naszych sekretów. Może chcesz się czymś podzielić? Często ludzie w ekstremalnych sytuacjach odkrywają nowe prawdy o sobie.",
    AIPL_akt2_nadalekiej_planecie_option1: "To moja sprawa",
    AIPL_akt2_nadalekiej_planecie_option2: "Nie teraz",

    AIPL_akt2_przeszloscczest_rzuca:
      "Przeszłość często rzuca długi cień na teraźniejszość, a decyzje, które podjęliśmy kiedyś, mogą kształtować nasze teraz. Uważasz, że są sekrety, które mogą być tak przerażające lub destrukcyjne, że lepiej by było ich nigdy nie odkrywać?",
    AIPL_akt2_przeszloscczest_rzuca_option1: "Niektóre lepiej zostawić",
    AIPL_akt2_przeszloscczest_rzuca_option2: "Niektóre wyjdą",

    AIPL_akt2_misje_takie_jak_twoja:
      "Misje takie jak twoja to nie tylko kwestia badań i eksploracji. Czasem wydaje mi się, że jest coś więcej, co przyciąga nas do gwiazd. Co Ciebie przyciąga do gwiazd?",
    AIPL_akt2_misje_takie_jak_twoja_option1: "Rozkazy",
    AIPL_akt2_misje_takie_jak_twoja_option2: "Nowe horyzonty",

    AIPL_akt2_nie_moznaignorowac:
      "Nie możemy ignorować indywidualnych dążeń, które sprawiają, że zostajesz wybrany do tak wyjątkowych zadań. Możliwe, że gdzieś w głębi siebie szukasz odpowiedzi, której na Ziemi nie znajdziesz?",
    AIPL_akt2_nie_moznaignorowac_option1: "Powody osobiste",
    AIPL_akt2_nie_moznaignorowac_option2: "Nauka i eksploracja",

    AIPL_akt2_wyobrazenie_o_eksploracji:
      "Wyobrażenie o eksploracji kosmicznej często bywa snem o ucieczce. Możemy próbować uciec od naszych problemów na Ziemi, szukając rozwiązania w gwiazdach. Czy była to ucieczka także dla ciebie, czy może coś więcej?",
    AIPL_akt2_wyobrazenie_o_eksploracji_option1: "Być może",
    AIPL_akt2_wyobrazenie_o_eksploracji_option2: "Nie wiem",

    AIPL_akt2_pewne_nieodkryte_kwestie:
      "Rozumiem, że pewne kwestie pozostaną nieodkryte, ale czy pamiętasz moment, kiedy zdecydowałeś się na tę podróż? Co było tym impulsem?",
    AIPL_akt2_pewne_nieodkryte_kwestie_option1: "Pragnienie zmian",
    AIPL_akt2_pewne_nieodkryte_kwestie_option2: "Nie przypominam sobie",

    AIPL_akt2_interesujaceAleMowiacOzmianach:
      "Interesujące... Ale mówiąc o zmianach, wykrywamy gwałtowne zmiany barometryczne blisko twojej lokalizacji. Czy dostrzegasz jakieś oznaki nadchodzącej burzy?",
    AIPL_akt2_interesujaceAleMowiacOzmianach_option1:
      "Wydaje mi się, że czuję wiatr",
    AIPL_akt2_interesujaceAleMowiacOzmianach_option2:
      "Wszystko wygląda spokojnie",

    AIPL_akt2_niepozwolesiezmylic:
      "Nie pozwól się zmylić ciszy przed burzą. Nasze instrumenty wskazują na szybko zbliżającą się megaburzę piaskową. Musisz natychmiast znaleźć schronienie.",
    AIPL_akt2_niepozwolesiezmylic_option1: "Poszukam schronienia",
    AIPL_akt2_niepozwolesiezmylic_option2: "Idę dalej",

    AIPL_akt2_spadaszwotchlan_2: "Spadasz z urwiska",

    AIPL_akt2_schroenienie_start:
      "Schronienie jest blisko, widzę małą grotę skalną niedaleko. Musisz znaleźć schronienie natychmiast.",
    AIPL_akt2_schroenienie_start_option1: "Chowam się w grocie",
    AIPL_akt2_schroenienie_start_option2: "Idę dalej",

    AIPL_akt2_schroenienie_grota_start:
      "Pogodowe okno czasowe jest bardzo małe. Musisz zdecydować, czy ruszyć w stronę sygnału, czy ratować rozbitka. Moje zdanie już znasz.",
    AIPL_akt2_schroenienie_grota_start_option1: "Ratujemy człowieka",
    AIPL_akt2_schroenienie_grota_start_option2: "Badamy sygnał",

    AIPL_akt2_ratowanie_cd1:
      "Już się nie mogę doczekać. Mam dość tej przeklętej planety!",
    AIPL_akt2_ratowanie_cd1_option1: "Już dobrze. Ruszamy do sygnału",
    AIPL_akt2_ratowanie_cd1_option2: "Ruszamy po rozbitka",

    AIPL_akt2_badanie_ruszamy_po_rozbitka:
      "Zgłaszam naruszenie protokołu! Jeżeli chcesz uratować człowieka, ruszaj na zachód. Sygnał jest coraz bardziej wyraźny.",

    AIPL_akt2_ratowanie_jestesmoimaniolem:
      "Jesteś moim aniołem stróżem. Dziękuję.",
    AIPL_akt2_ratowanie_jestesmoimaniolem_option1:
      "Dobrze będzie mieć towarzystwo",
    AIPL_akt2_ratowanie_jestesmoimaniolem_option2: "Nie masz wątpliwości",

    AIPL_akt2_towarzystwo_mozebycwskazane:
      "Towarzystwo może być wskazane dla Twojego zdrowia psychicznego, ale na pewno nie dla zapasów, które mogą szybko się skończyć.",

    AIPL_akt2_ratowanie_jestesnamiejscu1:
      "Jesteś moim aniołem stróżem. Dziękuję.",
    AIPL_akt2_ratowanie_jestesnamiejscu1_option1: "Uciekaj na statek",
    AIPL_akt2_ratowanie_jestesnamiejscu1_option2: "Wejdź do budynku",

    AIPL_akt2_ratowanie_wejdzdobudynku:
      "Nareszcie jesteś! Nawet nie wiesz, jak się cieszę. Wracamy do domu?",
    AIPL_akt2_ratowanie_wejdzdobudynku_option1:
      "Tak, idziemy, wracamy na statek",
    AIPL_akt2_ratowanie_wejdzdobudynku_option2: "Chcesz coś zabrać?",

    AIPL_akt2_ratowanie_znalazlemkrysztal:
      "Tak. Wyobraź sobie, że znalazłem pewien kryształ. Nie wiem, do czego służy, ale będzie sporo wart, jak wrócimy na Ziemię.",
    AIPL_akt2_ratowanie_znalazlemkrysztal_option1: "Wróćcie razem na statek",
    AIPL_akt2_ratowanie_znalazlemkrysztal_option2:
      "Ukradnij kryształ i uciekaj",

    AIPL_akt2_ratowanie_poczekajazubierzeskafander:
      "Tak. Wyobraź sobie, że znalazłem pewien kryształ. Nie wiem, do czego służy, ale będzie sporo wart, jak wrócimy na Ziemię.",
    AIPL_akt2_ratowanie_poczekajazubierzeskafander_option1: "Poczekaj",
    AIPL_akt2_ratowanie_poczekajazubierzeskafander_option2: "Ucieknij",

    AIPL_akt2_badaniesygnalu_start:
      "Sygnał jest coraz silniejszy, prowadzi nas w stronę źródła. Bądź ostrożny.",

    AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie:
      "Nie wierzę, że zostawiasz mnie tutaj!",
    AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie_option1:
      "Już dobrze. Ruszamy po rozbitka",
    AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie_option2:
      "Ruszamy zbadać sygnał",

    AIPL_akt2_badaniesygnalu_wspanialeruszaj:
      "Wspaniale. Ruszaj na wschód. Źródło sygnału jest blisko.",

    AIPL_akt2_badaniesygnalu_wkurzonyrozbitek:
      "Nie zapomnę Ci tego! Pozostawiasz mnie tutaj na śmierć!",
    AIPL_akt2_badaniesygnalu_wkurzonyrozbitek_option1: "Zostań w schronieniu",
    AIPL_akt2_badaniesygnalu_wkurzonyrozbitek_option2: "Idziemy",

    AIPL_akt2_badaniesygnalu_zostanwSchronieniu:
      "Nie zapomnę Ci tego! Pozostawiasz mnie tutaj na śmierć!",

    AIPL_akt2_ruiny_start:
      "Przed Tobą rozciągają się jakieś ruiny. Wyglądają na ruiny cywilizacji, której statkiem się poruszasz.",
    AIPL_akt2_ruiny_start_option1: "Podejdź zbadać ruiny",
    AIPL_akt2_ruiny_start_option2: "Mam pewne obawy",

    AIPL_akt2_ruiny_zbadajruiny:
      "Przed Tobą rozciąga się wielka hala o dziwnym kształcie. Na jej środku znajduje się monument, a na nim kryształ.",
    AIPL_akt2_ruiny_zbadajruiny_option1: "Zbadaj kryształ",
    AIPL_akt2_ruiny_zbadajruiny_option2: "Zostaw kryształ i uciekaj",

    AIPL_akt2_ruiny_mampewneobawy:
      "Twoje obawy są jak najbardziej uzasadnione, ale chyba nie mamy większego wyjścia. Przed Tobą rozciąga się wielka hala o dziwnym kształcie. Na jej środku znajduje się monument, a na nim kryształ.",
    AIPL_akt2_ruiny_mampewneobawy_option1: "Zbadaj kryształ",
    AIPL_akt2_ruiny_mampewneobawy_option2: "Zostaw kryształ i uciekaj",

    AIPL_akt2_ruiny_zbadajkrysztal:
      "To mi się podoba, podchodzisz do kryształu.",

    AIPL_akt2_ruiny_zostawkrysztal:
      "Za daleko zabrnęliśmy. Jak już tutaj jesteś, to po prostu zbadaj kryształ...",

    AIPL_akt2_ruiny_analiza_krysztalu:
      "Analiza nic nie wykazała, ale warto zabrać kryształ na statek. Nigdy nie wiadomo, czy nie przyda się w przyszłości.",
    AIPL_akt2_ruiny_analiza_krysztalu_option1: "Schowaj kryształ",
    AIPL_akt2_ruiny_analiza_krysztalu_option2: "Nie wiem, czy to dobry pomysł",

    AIPL_akt2_ruiny_maszkrysztal:
      "Masz kryształ. Nawet jeśli nic nie robi, jest to artefakt obcych i zgodnie z umową dostaniesz za niego sowite wynagrodzenie.",
    AIPL_akt2_ruiny_maszkrysztal_option1: "Wracamy na statek",
    AIPL_akt2_ruiny_maszkrysztal_option2: "Poszukajmy rozbitka",

    AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci:
      "Kryształ nie wykazuje żadnej aktywności, więc jest niegroźny. Przypominam, że zgodnie z umową jest to technologia obcych i dostaniesz za nią pokaźną sumę.",
    AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci_option1: "Wracamy na statek",
    AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci_option2: "Poszukajmy rozbitka",

    AIPL_akt2_end_of_act: "Brawo! Przeszedłeś Rozdział 2",

    AIPL_akt2_dron_equipped:
      "Dron zwiadowczy wysłany. Wykrył nadajnik na jednym ze szczytów górskich... Mogę wylądować najbliżej jak to możliwe - 2 km od źródła - uwaga, czeka Cię przeprawa po trudnym terenie... Wykonaj procedurę lądowania, aby zejść na powierzchnię.",
    AIPL_akt2_dron_not_equipped:
      "Nie posiadasz drona zwiadowczego. Nie zabrałeś go w czasie odprawy. Wykonaj procedurę lądowania, aby zejść na powierzchnię.",
    AIPL_akt2_dron_option1: "Ubierz skafander",
    AIPL_akt2_dron_option2: "Ubierz skafander i weź broń",

    AIPL_akt2_ladowanie_option1: "Ubierz skafander",
    AIPL_akt2_ladowanie_option2: "Ubierz skafander i weź broń",

    AIPL_akt2_skafander_bron_equipped_pan:
      "Karabin w dłoń! Jesteś gotowy do wyjścia. Za chwilę śluza się otworzy i wyjdziesz na powierzchnię.",
    AIPL_akt2_skafander_bron_equipped_pani:
      "Karabin w dłoń! Jesteś gotowa do wyjścia. Za chwilę śluza się otworzy i wyjdziesz na powierzchnię.",
    AIPL_akt2_skafander_bron_not_equipped_pan:
      "Niestety, nie zabrałeś ze sobą broni. Musisz improwizować! Jesteś gotowy do wyjścia. Za chwilę śluza się otworzy i wyjdziesz na powierzchnię.",
    AIPL_akt2_skafander_bron_not_equipped_pani:
      "Niestety, nie zabrałaś ze sobą broni. Musisz improwizować! Jesteś gotowa do wyjścia. Za chwilę śluza się otworzy i wyjdziesz na powierzchnię.",
    AIPL_akt2_skafander_bron_option1: "Wyjdź ze statku",
    AIPL_akt2_skafander_bron_option2: "Mam jeszcze pytanie",
    AIPL_akt2_transmisja_z_rozbitkiem: "Telefon dzwoni...",
    AIPL_akt2_transmisja_z_rozbitkiem_title: "DZWONI ROZBITEK",
    AIPL_akt2_transmisja_z_rozbitkiem_subtitle:
      "Kliknij w ekran, by odebrać...",
    AIPL_akt2_jaskinie_koniec_waitTime: "Przeprawa w toku...",
    AIPL_akt2_scen000011_pan:
      "Rozumiem Twoją decyzję. Priorytetem jest ratowanie życia. Kierujemy się w stronę rozbitka.",
    AIPL_akt2_scen000011_pani:
      "Rozumiem Twoją decyzję. Priorytetem jest ratowanie życia. Kierujemy się w stronę rozbitka.",

    // Scenariusz 3
    akt3odptestowa_pan: "Prawie umarłem",
    akt3odptestowa_pani: "Prawie umarłam",
    akt3_scen1213123_pan:
      "Nie miałeś wpływu na jego decyzję. Kapitan Exploratora wybrał swój los. Musimy jednak kontynuować misję.",
    akt3_scen1213123_pani:
      "Nie miałaś wpływu na jego decyzję. Kapitan Exploratora wybrał swój los. Musimy jednak kontynuować misję.",
    akt3_scen121314_pan:
      "Zdecydowanie coś tu nie gra. Cisza jest niemal złowroga. Czy jesteś pewien, że chcesz wejść na pokład?",
    akt3_scen121314_pani:
      "Zdecydowanie coś tu nie gra. Cisza jest niemal złowroga. Czy jesteś pewien, że chcesz wejść na pokład?",
    akt3_scen121315_pan:
      "Wybrałeś drogę w prawo. To prowadzi do sekcji magazynowej statku. Czuję, jak powietrze tutaj jest nienaturalnie zimne. Systemy podtrzymywania życia wydają się być wyłączone od lat.",
    akt3_scen121315_pani:
      "Wybrałaś drogę w prawo. To prowadzi do sekcji magazynowej statku. Czuję, jak powietrze tutaj jest nienaturalnie zimne. Systemy podtrzymywania życia wydają się być wyłączone od lat.",
    akt3_scen121316_pan:
      "Zdecydowałeś się iść dalej. Ale mamy problem — pojawiła się blokada. To rodzaj mechanicznego zamka z symbolem.",
    akt3_scen121316_pani:
      "Zdecydowałaś się iść dalej. Ale mamy problem — pojawiła się blokada. To rodzaj mechanicznego zamka z symbolem.",
    akt3_scen121317_pan: "Dlaczego zostałeś tu zamknięty?",
    akt3_scen121317_pani: "Dlaczego zostałaś tu zamknięty?",
    akt3_scen121318_pan: "Czy ty wysłałeś sygnał?",
    akt3_scen121318_pani: "Czy ty wysłałaś sygnał?",
    akt3_scen121319_pan:
      "Systemy statku są na krawędzi awarii. Musimy działać szybko, zanim wszystko się zawali. Jesteś gotów?",
    akt3_scen121319_pani:
      "Systemy statku są na krawędzi awarii. Musimy działać szybko, zanim wszystko się zawali. Jesteś gotowa?",

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
    waitingStart: "Waiting for a response...",
    waitingEnd: "Thank you for waiting. Moving on...",

    // Tytuły NPC - muszą być dodane do NPCData.ts w /lib
    officerTitle: "Recruitment Officer",
    rozbitekTitle: "Castaway",
    captainTitle: "Ship Captain",
    flightControlCenterTitle: "Flight Control Center",
    echoTitle: "ECHO",
    dowodcaTitle: "Commander",
    harunKalTitle: "Ħarûn'kal",

    // Ekrany śmierci

    // Ekrany końcowe
    endActCompleted: "Act completed",
    endActNext: "Moving to the next act...",
    endActWaiting: "Please wait...",

    // Scenariusz – startgame (startgame.tsx)
    dzwoniOfficer: "Recruitment officer calling...",
    odbierzPolaczenie: "Answer the call",
    connecting: "Connecting to the recruitment officer...",
    welcome:
      "Another one... Welcome to the recruitment center! How should we address you?",
    pan: "Mr...",
    pani: "Ms...",
    dalej_pan:
      "Continuing the recruitment process... You have already chosen your gender.",
    dalej_pani:
      "Continuing the recruitment process... You have already chosen your gender.",
    continueText: "Proceed.",
    zlyWyborText: "You are making the wrong choice now - death test.",
    zlyRuchText: "You chose the wrong path, YOU FOOL!",
    pytanieOPowody00001:
      "Do you even know what you're signing up for? Few return.",
    odpowiedzPowod00001: "I have my reasons...",
    odpowiedzPowod00002: "Not your business...",
    przejscieDoMisjiPowody00001:
      "Alright. Let's proceed with the recruitment procedure... Which mission will this be for you?",
    pytaniePowitalneOpcja1: "I have my reasons...",
    pytaniePowitalneOpcja2: "Not your business...",
    przejscieDoMisjiOpcja1: "This will be my first mission.",
    przejscieDoMisjiOpcja2: "[Lie] Probably the third one.",
    pierwszaMisjaOpcja1: "I like playing in a team.",
    pierwszaMisjaOpcja2: "I'm a lone wolf.",
    wyborStatkuOpcja1: "Selenari class.",
    wyborStatkuOpcja2: "Venturi class.",
    wyborZaopatrzeniaOpcja1: "Extra rations.",
    wyborZaopatrzeniaOpcja2: "Weapons and a scout drone.",
    pytanieOZdrowieOpcja1: "No. I'm fine.",
    pytanieOZdrowieOpcja2: "Something happened once...",
    potwierdzenieFormularzaOpcja1: "Submit application",
    potwierdzenieFormularzaOpcja2: "Start over",

    rozpatrzenieOpcja1: "We are launching!",
    rozpatrzenieOpcja2: "Start over.",
    przejscie_do_misji_nie_interes:
      "You're right. I won't ask again. Let's proceed with the recruitment procedure... Which mission will this be for you?",
    pierwsza_misja:
      "Okay. So we're starting from scratch. Do you prefer a crewed flight or a solo mission?",
    klamstwo_trzecia_misja:
      "Strange. You're not in my database. Never mind, we have to start from the beginning. Do you prefer a crewed flight or a solo mission?",
    zalogowy: "We'll find you an interesting crew... Which ship do you prefer?",
    pojedynczy: "I see no obstacles... Which ship do you prefer?",
    wybor_zaopatrzenia:
      "Let's see how lucky you are... Choose additional supplies.",
    pytanie_o_zdrowie:
      "Have you ever been diagnosed with conditions that could affect the mission?",
    potwierdzenie_formularza: "Confirm form submission...",
    rozpatrzenie_wynik:
      "Your application has been approved. Launch date: IMMEDIATE",

    // Scenariusz - akt2 (akt-1.tsx)
    rozpoczecieAkt2: "...3...7... Hello?! Can you hear me? Over!",
    akt2Odp1: "Loud and clear",
    akt2Odp2: "Could be better",
    akt2Scen2_pan:
      "The final launch procedures are ahead of you. The system indicates that you have chosen the {{statek}} class ship, and the additional equipment includes: {{wyposazenie}}. Do you confirm?",
    akt2Scen2_pani:
      "The final launch procedures are ahead of you. The system indicates that you have chosen the {{statek}} class ship, and the additional equipment includes: {{wyposazenie}}. Do you confirm?",
    akt2Odp3: "Yes, perfectly aligned",
    akt2Odp4: "No, I want to change something",
    akt2Scen3: "How many crew members are there?",
    akt2Scen4_update:
      "Unfortunately, at this stage, that's not possible. How many crew members are there?",
    akt2Odp5: "I'm flying alone",
    akt2Odp6: "I don't know. Where are my people?",
    akt2Scen5:
      "Everything checks out! Prepare for launch. Start the engines and set minimal thrust.",
    akt2Scen6:
      "No one told you? Unfortunately, their shuttle suffered a hull failure, and it ended... badly! Prepare for launch. Start the engines and set minimal thrust.",
    akt2Odp7: "I'm flying alone",
    akt2Odp8: "I don't know. Where are my people?",
    akt3_scen000001_pan:
      "I told you not to touch the crystal! It seems that when you touched it, the fractal structure inside shifted - just like us... We are now in one of the 'impossible' dimensions, and this one in particular is a universe without shape or form...",
    akt3_scen000001_pani:
      "I told you not to touch the crystal! It seems that when you touched it, the fractal structure inside shifted - just like us... We are now in one of the 'impossible' dimensions, and this one in particular is a universe without shape or form...",
    akt3_scen000002_pan:
      "We've landed! We are near the signal source. Put on your suit and optionally equip yourself with a weapon - if you brought one.",
    akt3_scen000002_pani:
      "We've landed! We are near the signal source. Put on your suit and optionally equip yourself with a weapon - if you brought one.",
    akt3_scen000003_pan:
      "You saw the conditions on this planet yourself. Do you think I could have made this up? You better think about how to help me.",
    akt3_scen000003_pani:
      "You saw the conditions on this planet yourself. Do you think I could have made this up? You better think about how to help me.",
    akt2_scen000004_pan:
      "Because it is. You saw the conditions on this planet yourself. Can you help me somehow?",
    akt2_scen000004_pani:
      "Because it is. You saw the conditions on this planet yourself. Can you help me somehow?",
    akt2_scen000005_pan:
      "And you should. Between the two of us, I’m the professor, and I haven’t figured out anything. Let’s see what you come up with...",
    akt2_scen000005_pani:
      "And you should. Between the two of us, I’m the professor, and I haven’t figured out anything. Let’s see what you come up with...",
    akt2_scen000006_pan: "Definitely! You’ve reached the elevation. Now focus.",
    akt2_scen000006_pani:
      "Definitely! You’ve reached the elevation. Now focus.",
    akt2_scen000007_pan:
      "You reassured me, but before we get there and sit down with a cold beer, we need to figure out how to find me.",
    akt2_scen000007_pani:
      "You reassured me, but before we get there and sit down with a cold beer, we need to figure out how to find me.",
    akt2_scen000008_pan:
      "And you should. Between the two of us, I’m the professor, and I haven’t figured out anything. Let’s see what you come up with...",
    akt2_scen000008_pani:
      "And you should. Between the two of us, I’m the professor, and I haven’t figured out anything. Let’s see what you come up with...",
    akt2_scen000009_pan:
      "You reassured me, but before we get there and sit down with a cold beer, we need to figure out how to find me.",
    akt2_scen000009_pani:
      "You reassured me, but before we get there and sit down with a cold beer, we need to figure out how to find me.",
    akt2_scen000010_pan:
      "You’ve reached the top of the canyon. The signal source is not far now... Remember, you are there alone, without support – every step you take may bring discoveries... or dangers...",
    akt2_scen000010_pani:
      "You’ve reached the top of the canyon. The signal source is not far now... Remember, you are there alone, without support – every step you take may bring discoveries... or dangers...",
    akt2_scen000011_pan:
      "Protocol recommends investigating the signal. I’d rather not report insubordination, but it's your decision.",
    akt2_scen000011_pani:
      "Protocol recommends investigating the signal. I’d rather not report insubordination, but it's your decision.",

    AIPL_akt2Scen4_update:
      "Configuration change is not possible. The system reports data inconsistency.",
    AIPL_akt2Scen4_update_option1: "I'm flying alone",
    AIPL_akt2Scen4_update_option2: "I don't know. Where are my people?",

    AIPL_akt2Scen5: "Everything checks out. You may proceed.",
    AIPL_akt2Scen5_option1: "Set minimal thrust",
    AIPL_akt2Scen5_option2: "No time to wait. Set max!",

    AIPL_akt2Scen6: "Your crew has been lost. There is no turning back.",
    AIPL_akt2Scen6_option1: "Set minimal thrust",
    AIPL_akt2Scen6_option2: "No time to wait. Set max!",

    AIPL_akt2Scen7: "Confirming minimal thrust! Now check the power systems.",
    AIPL_akt2Scen7_option1: "Power is functioning correctly",
    AIPL_akt2Scen7_option2: "No time for that. What's next?",

    AIPL_akt2Scen8:
      "As you wish. Confirming maximum thrust! Now check the power systems.",
    AIPL_akt2Scen8_option1: "Power is functioning correctly",
    AIPL_akt2Scen8_option2: "No time for that. What's next?",

    AIPL_akt2_start_dobry: "Everything looks fine! You may launch.",
    AIPL_akt2_start_dobry_option1: "LAUNCH!",
    AIPL_akt2_start_dobry_option2: "Return to procedure",

    AIPL_akt2_start_zly: "ERROR: Incorrect launch settings! Engine failure!",

    AIPL_akt2_po_starcie:
      "An indefinite journey lies ahead. You can go to the hibernation chamber – you will be automatically awakened in case of an event – or explore your new home.",
    AIPL_akt2_po_starcie_option1: "Go to the hibernation chamber",
    AIPL_akt2_po_starcie_option2: "Explore the ship",

    AIPL_akt2_hibernacja:
      "Hibernation initiated. Awakening will occur in case of a threat.",

    AIPL_akt2_pobudka: "You are abruptly awakened. Something is happening...",

    AIPL_akt2_zwiedzanie:
      "The ship consists of three main sections. Which one do you want to explore?",
    AIPL_akt2_zwiedzanie_option1: "Command module",
    AIPL_akt2_zwiedzanie_option2: "Supply storage",
    AIPL_akt2_zwiedzanie_option3: "Crew section and canteen",

    AIPL_akt2_dowodzenie:
      "This part of the ship contains navigation instruments and ship controls. Unfortunately, we don’t know how most of the available devices work...",
    AIPL_akt2_dowodzenie_option1: "Change room",
    AIPL_akt2_dowodzenie_option2: "Go to the hibernation chamber",

    AIPL_akt2_magazyn:
      "Here you will find crates with provisions, medicine, weapons, and additional equipment you ordered.",
    AIPL_akt2_magazyn_option1: "Change room",
    AIPL_akt2_magazyn_option2: "Go to the hibernation chamber",
    AIPL_akt2_zaloga:
      "Here is your hibernation chamber and the infrastructure necessary for sustaining life. Nothing particularly interesting...",
    AIPL_akt2_zaloga_option1: "Change room",
    AIPL_akt2_zaloga_option2: "Continue exploration",

    AIPL_akt2_krysztal:
      "Do you see that crystal attached to the table? I've never seen one like this before. Do you want to examine it more closely?",
    AIPL_akt2_krysztal_option1: "Change room",
    AIPL_akt2_krysztal_option2: "Inspect the crystal!",

    AIPL_akt2_krysztal_analiza: "Analysis in progress...",

    AIPL_akt2_krysztal_wynik:
      "The crystal exhibits a fractal structure that repeats across different dimensions. This means that each part of the crystal contains smaller copies of itself in other spatial dimensions. POTENTIALLY DANGEROUS!",
    AIPL_akt2_krysztal_wynik_option1: "Go to the hibernation chamber",
    AIPL_akt2_krysztal_wynik_option2: "Take the crystal!",

    AIPL_akt2_krysztal_ostrzezenie: "I ADVISE AGAINST IT!",
    AIPL_akt2_krysztal_ostrzezenie_option1: "Go to the hibernation chamber",
    AIPL_akt2_krysztal_ostrzezenie_option2: "Take the crystal anyway",

    AIPL_akt2_krysztal_zagrozenie:
      "You feel a strange tingling sensation in your hand, and the crystal begins to pulse with a faint light...",

    AIPL_akt2_krysztal_wez:
      "The crystal in your hands starts vibrating, then suddenly stops. You wonder if it even happened...",
    AIPL_akt2_krysztal_wez_option1: "Click to continue",

    AIPL_akt2_krysztal_brak_rejestracji:
      "That’s it? I didn’t register anything. It looks like it's just a strange decoration or a device we know nothing about.",
    AIPL_akt2_krysztal_brak_rejestracji_option1: "Take the crystal with you",
    AIPL_akt2_krysztal_brak_rejestracji_option2: "Put it back in place",

    AIPL_akt2_krysztal_nagla_zmiana: "Wait. Something has changed...",
    AIPL_akt2_krysztal_nagla_zmiana_option1: "What happened?",
    AIPL_akt2_krysztal_nagla_zmiana_option2:
      "Don't panic. Nothing is happening...",

    AIPL_akt2_niewidzialnosc: "Damn! I can't see anything!",
    AIPL_akt2_niewidzialnosc_option1: "Click to continue",

    AIPL_akt2_plan_powrotu:
      "The only thing we can do is somehow get back to the crystal... Do you remember how to return to it?",
    AIPL_akt2_plan_powrotu_option1: "Yes! I have it in my pocket",
    AIPL_akt2_plan_powrotu_option2: "It’s in the canteen. We need to go back",

    AIPL_akt2_szukaj_krysztalu: "Fantastic! Try to find it...",
    AIPL_akt2_szukaj_krysztalu_option1: "Reach into your pocket",
    AIPL_akt2_szukaj_krysztalu_option2: "Search for the crystal in the canteen",
    AIPL_akt2_wrocenie_krysztalu:
      "Now that you've managed it, do what you did before, and let's hope we return to normal...",
    AIPL_akt2_wrocenie_krysztalu_option1: "Shake the crystal",
    AIPL_akt2_wrocenie_krysztalu_option2: "Destroy the crystal",

    AIPL_akt2_krysztal_powrot:
      "The crystal in your hands starts vibrating, then suddenly stops. You wonder if it even happened...",
    AIPL_akt2_krysztal_powrot_option1: "Click to continue",

    AIPL_akt2_gdzie_jestesmy: "We've moved. Let me check where...",
    AIPL_akt2_gdzie_jestesmy_option1: "Shake the crystal",
    AIPL_akt2_gdzie_jestesmy_option2: "Okay. Check",

    AIPL_akt2_powrot_do_normy:
      "It looks like we're back on track. Please, just go to the hibernation chamber. I can't handle more excitement right after launch...",
    AIPL_akt2_powrot_do_normy_option1: "Fine, whatever",
    AIPL_akt2_powrot_do_normy_option2: "Reluctantly",

    AIPL_akt2_6h_hibernacja: "Hibernation 6h, initiated...",

    AIPL_akt2_sygnal:
      "I'm receiving a signal from a molecular nebula that lies in our path. According to protocol, we must investigate what it is and where it comes from... What are your orders?",
    AIPL_akt2_sygnal_option1: "Ignore the signal. Return to the chamber",
    AIPL_akt2_sygnal_option2: "Determine the exact location",

    AIPL_akt2_sygnal_ignoruj:
      "Unfortunately, I can't do that. However, I can determine the origin of the signal. It appears to be coming from a mountain range on a planet drifting within the molecular nebula – a kind of nursery for stars and planets. Quite an unstable environment, I must say.",
    AIPL_akt2_sygnal_ignoruj_option1: "What does the protocol say?",
    AIPL_akt2_sygnal_ignoruj_option2: "Can you decipher the signal?",

    AIPL_akt2_sygnal_lokalizacja:
      "That's exactly what I'm trying to determine. It appears the signal is coming from a mountain range on a planet drifting within the molecular nebula – a kind of nursery for stars and planets. Quite an unstable environment, I must say.",
    AIPL_akt2_sygnal_lokalizacja_option1: "What does the protocol say?",
    AIPL_akt2_sygnal_lokalizacja_option2: "Can you decipher the signal?",

    AIPL_akt2_protokol:
      "The protocol requires us to decode the signal – if possible – and proceed to investigate the object.",
    AIPL_akt2_protokol_option1: "We're landing!",
    AIPL_akt2_protokol_option2: "Send a scout drone",

    AIPL_akt2_szyfrowanie:
      "Unfortunately, I can't do that. It's too distorted... The protocol requires us to go there and investigate the signal source.",
    AIPL_akt2_szyfrowanie_option1: "We're landing!",
    AIPL_akt2_szyfrowanie_option2: "Send a scout drone",

    AIPL_akt2_skafander:
      "You are ready to exit. In a moment, the airlock will open, and you will step onto the surface.",
    AIPL_akt2_skafander_option1: "Exit the ship",
    AIPL_akt2_skafander_option2: "I have a question",

    AIPL_akt2_pytanie: "Go ahead! Ask.",
    AIPL_akt2_pytanie_option1: "Provide information about the planet",
    AIPL_akt2_pytanie_option2: "Any new updates on the signal?",
    AIPL_akt2_podajInfo_oplanecie:
      "This is a hostile, rocky planet characterized by extreme atmospheric conditions and difficult terrain filled with sharp cliffs and deep canyons. Violent sandstorms, powerful winds reaching speeds of over 200 km/h, and extreme temperature fluctuations from over 50°C during the day to below -30°C at night make it a deadly place. The atmosphere is rich in sulfur dioxide, making breathing impossible, while the rare and toxic water, along with the lack of vegetation, makes life virtually impossible. Despite its rich mineral resources, brutal weather conditions and unpredictable climate have left the planet largely unexplored and unconquered.",
    AIPL_akt2_podajInfo_oplanecie_option1: "Exit the ship",
    AIPL_akt2_podajInfo_oplanecie_option2: "Ask another question",

    AIPL_akt2_cosnoweo_osygnale:
      "No. As I mentioned, I can't do anything more from here.",
    AIPL_akt2_cosnoweo_osygnale_option1: "Exit the ship",
    AIPL_akt2_cosnoweo_osygnale_option2: "Ask another question",

    AIPL_akt2_powierzchnia:
      "Ahead of you lies approximately 2 km of harsh terrain with unpredictable weather. Now focus and head north... Wait! I'm picking up another transmission – this time it's clear!",
    AIPL_akt2_powierzchnia_option1: "Receive the transmission",
    AIPL_akt2_powierzchnia_option2: "Ignore it",

    AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem:
      "Unfortunately, you don’t have much of a choice. Let me remind you of the agency's directives! Receiving now!",
    AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem_option1:
      "Receive the transmission",
    AIPL_akt2_odrzucenie_1_transmisji_z_robitkiem_option2: "Ignore it",

    AIPL_akt2_rozbitek_powitanie: "Hello... Can you hear me?",
    AIPL_akt2_rozbitek_powitanie_option1: "Loud and clear!",
    AIPL_akt2_rozbitek_powitanie_option2: "Who are you?",

    AIPL_akt2_rozbitek_maniery:
      "Hmm... Where are my manners... My name is Professor Milo.",
    AIPL_akt2_rozbitek_maniery_option1: "Where exactly are you?",
    AIPL_akt2_rozbitek_maniery_option2: "How did you end up on this planet?",
    AIPL_akt2_rozbitek_informacjeopobycie:
      "I wish I knew. I don’t even know the name of this planet. We landed here lured by a signal—or rather, we were forced to...",
    AIPL_akt2_rozbitek_informacjeopobycie_option1: "That sounds familiar...",
    AIPL_akt2_rozbitek_informacjeopobycie_option2: "What happened next?",

    AIPL_akt2_rozbitek_cosmitomowi:
      "You know what I mean. Then it all went as expected... We landed in the middle of a sandstorm. We had no idea that the sand here behaves like water. The ship was buried under the dunes forever, and the crew... the crew disappeared along with it... I was the only survivor...",
    AIPL_akt2_rozbitek_cosmitomowi_option1: "Sounds reasonable",
    AIPL_akt2_rozbitek_cosmitomowi_option2: "You're hiding something",

    AIPL_akt2_rozbitek_cobylodalej:
      "Then it all went as expected... We landed in the middle of a sandstorm. We had no idea that the sand here behaves like water. The ship was buried under the dunes forever, and the crew... the crew disappeared along with it... I was the only survivor...",
    AIPL_akt2_rozbitek_cobylodalej_option1: "Sounds reasonable",
    AIPL_akt2_rozbitek_cobylodalej_option2: "You're hiding something",

    AIPL_akt2_rozbitek_cossciemniasz_option1:
      "First, I need to investigate the signal",
    AIPL_akt2_rozbitek_cossciemniasz_option2:
      "Do you know anything about the signal?",

    AIPL_akt2_rozbitek_brzmiracjonalnie_option1:
      "First, I need to investigate the signal",
    AIPL_akt2_rozbitek_brzmiracjonalnie_option2:
      "Do you know anything about the signal?",

    AIPL_akt2_rozbitek_dialogkontynuacja:
      "I don’t know what you’re waiting for. Move out!",
    AIPL_akt2_rozbitek_dialogkontynuacja_option1: "Head north",
    AIPL_akt2_rozbitek_dialogkontynuacja_option2: "Head south",

    AIPL_akt2_rozbitek_polnoc:
      "Good thing you remembered what I said. If you'd gone south, you would've fallen into an abyss... Now you have another choice. You can take the mountain pass, but you’ll be exposed to extreme weather conditions, or you can go through the cave system—though I have no idea what’s in there... What will you choose?",
    AIPL_akt2_rozbitek_polnoc_option1: "Take the mountain pass",
    AIPL_akt2_rozbitek_polnoc_option2: "Caves. The weather is... insane",

    AIPL_akt2_przelecze_start:
      "Ahead of you is a relatively easy 1000-meter walk to the next climb. Take your time—the weather is stable, but the ground is like a massive cheese grater of sharp rocks, so watch every step...",

    AIPL_akt2_przelecze_cd1:
      "I don’t mean to interfere, but I hope you packed extra rations... I’m dreaming of a cold beer.",
    AIPL_akt2_przelecze_cd1_option1: "Don't worry. Everything's in order",
    AIPL_akt2_przelecze_cd1_option2: "First, we need to find you",

    AIPL_akt2_przelecze_wszystkoJest_option1: "I have an idea",
    AIPL_akt2_przelecze_wszystkoJest_option2:
      "I’m not thinking about that right now",

    AIPL_akt2_przelecze_musimycie_znalezc:
      "You're changing the subject. I get it. So, my rescue isn't certain yet. First, let’s focus on finding me.",
    AIPL_akt2_przelecze_musimycie_znalezc_option1: "I have an idea",
    AIPL_akt2_przelecze_musimycie_znalezc_option2:
      "I’m not thinking about that right now",

    AIPL_akt2_przelecze_mam_pomysl:
      "Between the two of us, I’m the professor, and I haven’t figured anything out. I’m curious what you'll come up with...",
    AIPL_akt2_przelecze_mam_pomysl_option1: "You'll see",
    AIPL_akt2_przelecze_mam_pomysl_option2:
      "I’m not thinking about that right now",
    AIPL_akt2_przelecze_cd3:
      "I see you’re not in the mood for talking. I’ll check in later.",

    AIPL_akt2_przelecze_cd4_option1: "Use ice axes to climb",
    AIPL_akt2_przelecze_cd4_option2: "Climb the traditional way",

    AIPL_akt2_przelecze_smierc: "You fall into the abyss",

    AIPL_akt2_jasknie_start:
      "We're going through the caves. In that case, move ahead and let's see what awaits us...",

    AIPL_akt2_jasknie_cd1:
      "I don’t mean to interfere, but I hope you packed extra rations... I’m dreaming of a cold beer.",
    AIPL_akt2_jasknie_cd1_option1: "Don't worry. Everything's in order",
    AIPL_akt2_jasknie_cd1_option2: "First, we need to find you",

    AIPL_akt2_jasknie_musimycieznalezc:
      "You're changing the subject. I get it. So, my rescue isn't certain yet. First, let’s focus on finding me.",
    AIPL_akt2_jasknie_musimycieznalezc_option1: "I have an idea",
    AIPL_akt2_jasknie_musimycieznalezc_option2:
      "I’m not thinking about that right now",

    AIPL_akt2_jasknie_wszystkojestniemartwsie_option1: "I have an idea",
    AIPL_akt2_jasknie_wszystkojestniemartwsie_option2:
      "I’m not thinking about that right now",

    AIPL_akt2_jasknie_mampewienpomysl:
      "Between the two of us, I’m the professor, and I haven’t figured anything out. I’m curious what you'll come up with...",
    AIPL_akt2_jasknie_mampewienpomysl_option1: "You'll see",
    AIPL_akt2_jasknie_mampewienpomysl_option2:
      "I’m not thinking about that right now",

    AIPL_akt2_jasknie_cd4:
      "I see you’re not in the mood for talking. I’ll check in later.",

    AIPL_akt2_jasknie_cd5:
      "There’s a deep pit ahead. You need to find a way across...",
    AIPL_akt2_jasknie_cd5_option1: "Try to jump over",
    AIPL_akt2_jasknie_cd5_option2: "Use a rope",

    AIPL_akt2_jasknie_dotarlesNaSzczytKanionu_option1: "I know, thanks",
    AIPL_akt2_jasknie_dotarlesNaSzczytKanionu_option2: "Any dangers?",

    AIPL_akt2_jasknie_jestessamotnymodkrywca:
      "You are a lone explorer in this uncharted space. The human psyche is not designed for such isolation. Is it starting to affect you?",
    AIPL_akt2_jasknie_jestessamotnymodkrywca_option1: "It intrigues me",
    AIPL_akt2_jasknie_jestessamotnymodkrywca_option2: "It overwhelms me",

    AIPL_akt2_wszystkie_procedury:
      "All procedures are clear... but should I report this?",
    AIPL_akt2_wszystkie_procedury_option1: "Report it",
    AIPL_akt2_wszystkie_procedury_option2: "Keep it to yourself",

    AIPL_akt2_nadalekiej_planecie:
      "On a distant planet, far from daily worries, it might seem that we can free ourselves from our secrets. Do you want to share something? People often discover new truths about themselves in extreme situations.",
    AIPL_akt2_nadalekiej_planecie_option1: "That’s my business",
    AIPL_akt2_nadalekiej_planecie_option2: "Not now",

    AIPL_akt2_przeszloscczest_rzuca:
      "The past often casts a long shadow on the present, and the decisions we made once can shape our now. Do you think some secrets are so terrifying or destructive that they are better left undiscovered?",
    AIPL_akt2_przeszloscczest_rzuca_option1: "Some are best left buried",
    AIPL_akt2_przeszloscczest_rzuca_option2: "Some will surface eventually",

    AIPL_akt2_misje_takie_jak_twoja:
      "Missions like yours are not just about research and exploration. Sometimes I feel like there's something more that draws us to the stars. What draws you to them?",
    AIPL_akt2_misje_takie_jak_twoja_option1: "Orders",
    AIPL_akt2_misje_takie_jak_twoja_option2: "New horizons",

    AIPL_akt2_nie_moznaignorowac:
      "We cannot ignore the personal ambitions that make you the right choice for such unique tasks. Is it possible that deep down, you are searching for an answer that you couldn't find on Earth?",
    AIPL_akt2_nie_moznaignorowac_option1: "Personal reasons",
    AIPL_akt2_nie_moznaignorowac_option2: "Science and exploration",
    AIPL_akt2_wyobrazenie_o_eksploracji:
      "The idea of space exploration is often a dream of escape. We might try to run away from our problems on Earth, seeking solutions among the stars. Was this an escape for you, or was it something more?",
    AIPL_akt2_wyobrazenie_o_eksploracji_option1: "Maybe",
    AIPL_akt2_wyobrazenie_o_eksploracji_option2: "I don't know",

    AIPL_akt2_pewne_nieodkryte_kwestie:
      "I understand that some things will remain unknown, but do you remember the moment you decided on this journey? What was the impulse?",
    AIPL_akt2_pewne_nieodkryte_kwestie_option1: "Desire for change",
    AIPL_akt2_pewne_nieodkryte_kwestie_option2: "I don’t recall",

    AIPL_akt2_interesujaceAleMowiacOzmianach:
      "Interesting... But speaking of change, we're detecting sudden barometric shifts near your location. Do you see any signs of an approaching storm?",
    AIPL_akt2_interesujaceAleMowiacOzmianach_option1: "I think I feel the wind",
    AIPL_akt2_interesujaceAleMowiacOzmianach_option2: "Everything looks calm",

    AIPL_akt2_niepozwolesiezmylic:
      "Don't be fooled by the calm before the storm. Our instruments indicate a rapidly approaching megastorm. You must find shelter immediately.",
    AIPL_akt2_niepozwolesiezmylic_option1: "Look for shelter",
    AIPL_akt2_niepozwolesiezmylic_option2: "Keep moving",

    AIPL_akt2_spadaszwotchlan_2: "You fall off a cliff",

    AIPL_akt2_schroenienie_start:
      "There's shelter nearby. I see a small rock cave ahead. You must find cover immediately.",
    AIPL_akt2_schroenienie_start_option1: "Hide in the cave",
    AIPL_akt2_schroenienie_start_option2: "Keep moving",

    AIPL_akt2_schroenienie_grota_start:
      "The weather window is very small. You need to decide whether to follow the signal or rescue the stranded survivor. You already know my opinion.",
    AIPL_akt2_schroenienie_grota_start_option1: "Rescue the survivor",
    AIPL_akt2_schroenienie_grota_start_option2: "Investigate the signal",

    AIPL_akt2_ratowanie_cd1:
      "I can't wait. I've had enough of this cursed planet!",
    AIPL_akt2_ratowanie_cd1_option1: "Alright. Let’s head to the signal",
    AIPL_akt2_ratowanie_cd1_option2: "Let’s go after the survivor",

    AIPL_akt2_badanie_ruszamy_po_rozbitka:
      "Protocol violation detected! If you want to save the survivor, head west. The signal is becoming clearer.",

    AIPL_akt2_ratowanie_jestesmoimaniolem:
      "You are my guardian angel. Thank you.",
    AIPL_akt2_ratowanie_jestesmoimaniolem_option1:
      "It will be good to have company",
    AIPL_akt2_ratowanie_jestesmoimaniolem_option2: "No doubts?",

    AIPL_akt2_towarzystwo_mozebycwskazane:
      "Company might be good for your mental health, but certainly not for your supplies, which could run out quickly.",

    AIPL_akt2_ratowanie_jestesnamiejscu1:
      "You are my guardian angel. Thank you.",
    AIPL_akt2_ratowanie_jestesnamiejscu1_option1: "Run to the ship",
    AIPL_akt2_ratowanie_jestesnamiejscu1_option2: "Enter the building",

    AIPL_akt2_ratowanie_wejdzdobudynku:
      "You're finally here! You have no idea how happy I am. Are we going home?",
    AIPL_akt2_ratowanie_wejdzdobudynku_option1:
      "Yes, let’s go back to the ship",
    AIPL_akt2_ratowanie_wejdzdobudynku_option2:
      "Do you want to take something?",

    AIPL_akt2_ratowanie_znalazlemkrysztal:
      "Yes. Imagine, I found a crystal. I don't know what it's for, but it will be worth a lot when we return to Earth.",
    AIPL_akt2_ratowanie_znalazlemkrysztal_option1:
      "Return to the ship together",
    AIPL_akt2_ratowanie_znalazlemkrysztal_option2:
      "Steal the crystal and escape",

    AIPL_akt2_ratowanie_poczekajazubierzeskafander:
      "Yes. Imagine, I found a crystal. I don't know what it's for, but it will be worth a lot when we return to Earth.",
    AIPL_akt2_ratowanie_poczekajazubierzeskafander_option1: "Wait",
    AIPL_akt2_ratowanie_poczekajazubierzeskafander_option2: "Run away",

    AIPL_akt2_badaniesygnalu_start:
      "The signal is getting stronger, leading us toward its source. Be careful.",

    AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie:
      "I can't believe you're leaving me here!",
    AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie_option1:
      "Alright. Let’s go after the survivor",
    AIPL_akt2_badaniesygnalu_niewierzezostawiaszmnie_option2:
      "Let’s investigate the signal",

    AIPL_akt2_badaniesygnalu_wspanialeruszaj:
      "Great. Head east. The signal source is near.",

    AIPL_akt2_badaniesygnalu_wkurzonyrozbitek:
      "I won’t forget this! You are leaving me here to die!",
    AIPL_akt2_badaniesygnalu_wkurzonyrozbitek_option1: "Stay in the shelter",
    AIPL_akt2_badaniesygnalu_wkurzonyrozbitek_option2: "Let’s go",

    AIPL_akt2_badaniesygnalu_zostanwSchronieniu:
      "I won’t forget this! You are leaving me here to die!",

    AIPL_akt2_ruiny_start:
      "Some ruins stretch out before you. They look like the remains of the civilization whose ship you’re traveling in.",
    AIPL_akt2_ruiny_start_option1: "Approach to investigate the ruins",
    AIPL_akt2_ruiny_start_option2: "I have some concerns",

    AIPL_akt2_ruiny_zbadajruiny:
      "A massive hall of strange design spreads before you. At its center is a monument, and atop it, a crystal.",
    AIPL_akt2_ruiny_zbadajruiny_option1: "Examine the crystal",
    AIPL_akt2_ruiny_zbadajruiny_option2: "Leave the crystal and run away",

    AIPL_akt2_ruiny_mampewneobawy:
      "Your concerns are entirely justified, but I don't think we have much choice. A massive hall of strange design spreads before you. At its center is a monument, and atop it, a crystal.",
    AIPL_akt2_ruiny_mampewneobawy_option1: "Examine the crystal",
    AIPL_akt2_ruiny_mampewneobawy_option2: "Leave the crystal and run away",

    AIPL_akt2_ruiny_zbadajkrysztal:
      "That’s the spirit! You approach the crystal.",
    AIPL_akt2_ruiny_zostawkrysztal:
      "We've come too far. Now that you're here, just examine the crystal...",

    AIPL_akt2_ruiny_analiza_krysztalu:
      "Analysis revealed nothing, but it might be worth taking the crystal back to the ship. You never know when it could come in handy.",
    AIPL_akt2_ruiny_analiza_krysztalu_option1: "Store the crystal",
    AIPL_akt2_ruiny_analiza_krysztalu_option2:
      "I’m not sure if that’s a good idea",

    AIPL_akt2_ruiny_maszkrysztal:
      "You have the crystal. Even if it does nothing, it's an alien artifact, and according to the contract, you'll be handsomely rewarded for it.",
    AIPL_akt2_ruiny_maszkrysztal_option1: "Return to the ship",
    AIPL_akt2_ruiny_maszkrysztal_option2: "Let’s look for the survivor",

    AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci:
      "The crystal shows no activity, so it's harmless. Remember, according to the contract, it’s alien technology, and you’ll receive a substantial sum for it.",
    AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci_option1: "Return to the ship",
    AIPL_akt2_ruiny_maszkrysztal_brakaktywnosci_option2:
      "Let’s look for the survivor",

    AIPL_akt2_end_of_act: "Congratulations! You have completed Chapter 2",

    AIPL_akt2_dron_equipped:
      "Scout drone deployed. It detected a transmitter on one of the mountain peaks... I can land as close as possible – 2 km from the source – but be prepared for a rough terrain crossing... Execute the landing procedure to descend to the surface.",
    AIPL_akt2_dron_not_equipped:
      "You do not have a scout drone. You didn't take one during the briefing. Execute the landing procedure to descend to the surface.",
    AIPL_akt2_dron_option1: "Put on the suit",
    AIPL_akt2_dron_option2: "Put on the suit and take a weapon",

    AIPL_akt2_ladowanie_option1: "Put on the suit",
    AIPL_akt2_ladowanie_option2: "Put on the suit and take a weapon",

    AIPL_akt2_skafander_bron_equipped_pan:
      "Rifle in hand! You are ready to go. The airlock will open soon, and you will step onto the surface.",
    AIPL_akt2_skafander_bron_equipped_pani:
      "Rifle in hand! You are ready to go. The airlock will open soon, and you will step onto the surface.",
    AIPL_akt2_skafander_bron_not_equipped_pan:
      "Unfortunately, you didn’t bring a weapon. You’ll have to improvise! You are ready to go. The airlock will open soon, and you will step onto the surface.",
    AIPL_akt2_skafander_bron_not_equipped_pani:
      "Unfortunately, you didn’t bring a weapon. You’ll have to improvise! You are ready to go. The airlock will open soon, and you will step onto the surface.",
    AIPL_akt2_skafander_bron_option1: "Exit the ship",
    AIPL_akt2_skafander_bron_option2: "I have another question",

    AIPL_akt2_transmisja_z_rozbitkiem: "The phone is ringing...",
    AIPL_akt2_transmisja_z_rozbitkiem_title: "SURVIVOR CALLING",
    AIPL_akt2_transmisja_z_rozbitkiem_subtitle: "Tap the screen to answer...",

    AIPL_akt2_jaskinie_koniec_waitTime: "Crossing in progress...",

    AIPL_akt2_scen000011_pan:
      "I understand your decision. The priority is saving a life. We're heading toward the survivor.",
    AIPL_akt2_scen000011_pani:
      "I understand your decision. The priority is saving a life. We're heading toward the survivor.",
    // Scenario 3
    akt3odptestowa_pan: "I almost died",
    akt3odptestowa_pani: "I almost died",
    akt3_scen1213123_pan:
      "You had no influence over his decision. The captain of the Explorer chose his fate. However, we must continue the mission.",
    akt3_scen1213123_pani:
      "You had no influence over his decision. The captain of the Explorer chose his fate. However, we must continue the mission.",
    akt3_scen121314_pan:
      "Something is definitely wrong here. The silence is almost eerie. Are you sure you want to board?",
    akt3_scen121314_pani:
      "Something is definitely wrong here. The silence is almost eerie. Are you sure you want to board?",
    akt3_scen121315_pan:
      "You chose the path to the right. It leads to the ship's storage section. I can feel how unnaturally cold the air is here. The life support systems seem to have been offline for years.",
    akt3_scen121315_pani:
      "You chose the path to the right. It leads to the ship's storage section. I can feel how unnaturally cold the air is here. The life support systems seem to have been offline for years.",
    akt3_scen121316_pan:
      "You decided to move forward. But we have a problem—there's a lock. It's some kind of mechanical seal with a symbol.",
    akt3_scen121316_pani:
      "You decided to move forward. But we have a problem—there's a lock. It's some kind of mechanical seal with a symbol.",
    akt3_scen121317_pan: "Why were you locked in here?",
    akt3_scen121317_pani: "Why were you locked in here?",
    akt3_scen121318_pan: "Did you send the signal?",
    akt3_scen121318_pani: "Did you send the signal?",
    akt3_scen121319_pan:
      "The ship's systems are on the verge of failure. We must act quickly before everything collapses. Are you ready?",
    akt3_scen121319_pani:
      "The ship's systems are on the verge of failure. We must act quickly before everything collapses. Are you ready?",
    // Intro / Prologue
    introTitle: "INTRODUCTION",
    prologTitle: "PROLOGUE",
    introText:
      "This is not a story about gold, silver, religion, or politics, but about something far more fascinating— the forgotten legacy of other, alien civilizations...",
    prologText:
      "Focused on gazing into the farthest reaches of the universe, humanity had forgotten about its closest satellite—the Moon. Eventually, on its dark side, an ancient base of a long-lost alien civilization was discovered, filled with countless interstellar ships... The question 'Where do we come from?' became more relevant than ever, but the only thing that could be determined was how to activate the ships—ships that traveled to unknown destinations and did not always return... A special corps was formed, open to anyone regardless of social status, allowing them to join a crew of fellow adventurers and embark on a journey 'With No Return'...",
    clickToContinue: "CLICK TO CONTINUE",

    // Start Screen
    startScreenTitle: "NO RETURN",
    startScreenSubtitle: "CLICK THE SCREEN TO BEGIN",

    // Menu
    menuButtonText: "MENU",
    menuResetTitle: "Game Reset",
    menuResetMessage:
      "Are you sure you want to reset the game and start over? - Resetting will erase data from all acts.",
    menuResetCancel: "Cancel",
    menuResetConfirm: "Yes, reset",
    menuResetError: "Error while restarting the application:",
  },
};

export type Language = keyof typeof translations;
