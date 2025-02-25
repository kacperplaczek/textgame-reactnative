import { SceneType } from "@/scenario/types";
import Storage from "expo-storage";

const savePlayerChoices = async (key: string, value: string) => {
  await Storage.setItem({ key, value });
};

const getPlayerEquipment = async () => {
  const eq = await Storage.getItem({ key: "wybraneZaopatrzenie" });
  return eq || "Dodatkowy prowiant";
};

export const getScenes = (
  translations: any,
  plec: "pan" | "pani" | null
): Record<string, SceneType> => ({
  // 🔥 SCENA 1: Początek komunikacji
  rozpoczecie_akt2: {
    npcKey: "flightControlCenter",
    tekst: () => translations.rozpoczecieAkt2,
    options: [
      { tekst: translations.akt2Odp1, next: "akt2_scen2" },
      { tekst: translations.akt2Odp2, next: "akt2_scen2" },
    ],
  },

  // 🔥 SCENA 2: Potwierdzenie statku i wyposażenia
  akt2_scen2: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const shipClass =
        (await Storage.getItem({ key: "shipClass" })) || "Venturi";
      const equipment =
        (await Storage.getItem({ key: "shipEquipment" })) ||
        "dodatkowy prowiant";

      return translations.akt2Scen2
        .replace("{{statek}}", shipClass)
        .replace("{{wyposazenie}}", equipment);
    },
    options: [
      { tekst: translations.akt2Odp3, next: "akt2_scen3" },
      { tekst: translations.akt2Odp4, next: "akt2_scen4_update" },
    ],
  },

  // 🔥 SCENA 3: Ile osób liczy załoga?
  akt2_scen3: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen3,
    options: [
      { tekst: translations.akt2Odp7, next: "akt2_scen5" },
      { tekst: translations.akt2Odp8, next: "akt2_scen6" },
    ],
  },

  // 🔥 SCENA 4: Nie można zmienić konfiguracji
  akt2_scen4_update: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen4_update,
    options: [
      { tekst: "Lecę tylko Ja", next: "akt2_scen5" },
      { tekst: "Nie wiem. Gdzie moi ludzie?", next: "akt2_scen6" },
    ],
  },

  // 🔥 SCENA 5: Wszystko się zgadza...
  akt2_scen5: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen5,
    options: [
      { tekst: "Ustaw ciąg minimalny", next: "akt2_scen7" },
      { tekst: "Nie ma na co czekać. Ustaw maks!", next: "akt2_scen8" },
    ],
  },

  // 🔥 SCENA 6: Informacja o utraconej załodze
  akt2_scen6: {
    npcKey: "flightControlCenter",
    tekst: () => translations.akt2Scen6,
    options: [
      { tekst: "Ustaw ciąg minimalny", next: "akt2_scen7" },
      { tekst: "Nie ma na co czekać. Ustaw maks!", next: "akt2_scen8" },
    ],
  },

  // 🔥 SCENA 7: Ciąg minimalny – dobra ścieżka
  akt2_scen7: {
    npcKey: "flightControlCenter",
    tekst: () => "Potwierdzam ciąg minimalny! Teraz sprawdź systemy zasilania.",
    options: [
      { tekst: "Zasilanie działa poprawnie", next: "akt2_start_dobry" },
      { tekst: "Nie mam na to czasu. Co dalej", next: "akt2_start_zly" },
    ],
  },

  // 🔥 SCENA 8: Ciąg maksymalny – zła ścieżka
  akt2_scen8: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jak chcesz. Potwierdzam ciąg maksymalny! Teraz sprawdź systemy zasilania.",
    options: [
      { tekst: "Zasilanie działa poprawnie", next: "akt2_start_zly" },
      { tekst: "Nie mam na to czasu. Co dalej", next: "akt2_start_zly" },
    ],
  },

  // ✅ DOBRA ŚCIEŻKA – Poprawne ustawienia przed startem
  akt2_start_dobry: {
    npcKey: "flightControlCenter",
    tekst: () => "Wszystko wygląda w porządku! Możesz startować.",
    options: [
      { tekst: "STARTUJEMY!", next: "akt2_po_starcie" },
      { tekst: "Wróć do procedury", next: "akt2_scen2" },
    ],
  },

  // ❌ ZŁA ŚCIEŻKA – Błędne ustawienia przed startem
  akt2_start_zly: {
    npcKey: "flightControlCenter",
    tekst: () => "BŁĄD: Niepoprawne ustawienia startu! Awaria silnika!",
    deathScreen: "explosionDeathScreen",
  },

  // 🔥 NOWA SCENA PO STARCIU: Decyzja – hibernacja czy eksploracja?
  akt2_po_starcie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przed Tobą nieokreślona podróż. Możesz udać się do komory hibernacyjnej - zostaniesz automatycznie wybudzony w wypadku jakiegoś zdarzenia lub pozwiedzać swój nowy dom.",
    options: [
      { tekst: "Udaj się do komory hibernacyjnej", next: "akt2_hibernacja" },
      { tekst: "Zwiedzaj statek", next: "akt2_zwiedzanie" },
    ],
  },

  // 🔥 HIBERNACJA – NOTIFY TIME (2 godziny)
  akt2_hibernacja: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Hibernacja rozpoczęta. Wybudzenie nastąpi w przypadku zagrożenia.",
    notifyTime: 10, // testowo 10 sekund
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_pobudka",
  },

  // 🔥 SCENA PO HIBERNACJI – WYBUDZENIE
  akt2_pobudka: {
    npcKey: "flightControlCenter",
    tekst: () => "Zostajesz gwałtownie wybudzony. Coś się dzieje...",
    autoNextScene: "akt2_sygnal",
    autoNextDelay: 3000,
  },

  // 🔥 ZWIEDZANIE STATKU – WYBÓR OBSZARU
  akt2_zwiedzanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Statek składa się z trzech głównych części. Którą chcesz zwiedzić?",
    options: [
      { tekst: "Człon dowodzenia", next: "akt2_dowodzenie" },
      { tekst: "Magazyn zaopatrzenia", next: "akt2_magazyn" },
      { tekst: "Część załogowa i kantyna", next: "akt2_zaloga" },
    ],
  },

  // 🔥 ZWIEDZANIE – DOWODZENIE
  akt2_dowodzenie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "W tej części statku znajdują się instrumenty nawigacyjne i sterowanie statku. Niestety nie wiemy jak działa większość dostępnych urządzeń...",
    options: [
      { tekst: "Zmień pomieszczenie", next: "akt2_zwiedzanie" },
      { tekst: "Udaj się do komory hibernacyjnej", next: "akt2_hibernacja" },
    ],
  },

  // 🔥 ZWIEDZANIE – MAGAZYN
  akt2_magazyn: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Tutaj jak widzisz znajdują się skrzynie z prowiantem, lekami, uzbrojeniem i wyposażeniem dodatkowym zamówionym przez Ciebie.",
    options: [
      { tekst: "Zmień pomieszczenie", next: "akt2_zwiedzanie" },
      { tekst: "Udaj się do komory hibernacyjnej", next: "akt2_hibernacja" },
    ],
  },

  // 🔥 ZWIEDZANIE – CZĘŚĆ ZAŁOGOWA
  akt2_zaloga: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Tutaj znajduje się Twoja komora hibernacyjna oraz infrastruktura niezbędna do podtrzymania życia. Nic specjalnie interesującego...",
    options: [
      { tekst: "Zmień pomieszczenie", next: "akt2_zwiedzanie" },
      { tekst: "Kontynuuj eksplorację", next: "akt2_krysztal" },
    ],
  },

  // 🔥 SPRAWDZENIE KRYSZTAŁU
  akt2_krysztal: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Widzisz ten kryształ przytwierdzony do stołu? Pierwszy raz taki widzę. Chcesz go zbadać bliżej?",
    options: [
      { tekst: "Zmień pomieszczenie", next: "akt2_zwiedzanie" },
      { tekst: "Sprawdź kryształ!", next: "akt2_krysztal_analiza" },
    ],
  },

  // 🔥 ANALIZA KRYSZTAŁU – NOTIFY TIME (5 minut)
  akt2_krysztal_analiza: {
    npcKey: "flightControlCenter",
    tekst: () => "Analiza w toku...",
    notifyTime: 300, // 5 minut
    notifyScreenName: "analiza_krysztalu",
    autoNextScene: "akt2_krysztal_wynik",
  },

  // 🔥 WYNIK ANALIZY KRYSZTAŁU
  akt2_krysztal_wynik: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Kryształ wykazuje strukturę fraktalną, która powtarza się w różnych wymiarach. To oznacza, że każdy element kryształu posiada mniejsze kopie samego siebie w innych wymiarach przestrzeni. POTENCJALNIE NIEBEZPIECZNY!",
    options: [
      { tekst: "Udaj się do komory hibernacyjnej", next: "akt2_hibernacja" },
      { tekst: "Weź kryształ!", next: "akt2_krysztal_ostrzezenie" },
    ],
  },

  // 🔥 OSTRZEŻENIE – NIEBEZPIECZNY KRYSZTAŁ
  akt2_krysztal_ostrzezenie: {
    npcKey: "flightControlCenter",
    tekst: () => "ODRADZAM!",
    options: [
      { tekst: "Udaj się do komory hibernacyjnej", next: "akt2_hibernacja" },
      {
        tekst: "Mimo wszystko. Weź kryształ",
        next: "akt2_krysztal_zagrozenie",
      },
    ],
  },

  // 🔥 PRZYJĘCIE KRYSZTAŁU – POTENCJALNE ZAGROŻENIE
  akt2_krysztal_zagrozenie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Czujesz dziwne mrowienie w dłoni, a kryształ zaczyna pulsować delikatnym światłem...",
    autoNextScene: "akt2_krysztal_wez",
    autoNextDelay: 3000,
  },

  // 🔥 KONTYNUACJA DIALOGU (G) – IGNOROWANIE OSTRZEŻENIA
  akt2_krysztal_wez: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Kryształ w twoich rękach zaczyna drgać po czym drganie ustaje. Zastanawiasz się, czy to w ogóle się wydarzyło...",
    options: [
      {
        tekst: "Kliknij, aby kontynuować",
        next: "akt2_krysztal_brak_rejestracji",
      },
    ],
  },

  // 🔥 DIALOG (I) – BRAK REJESTRACJI
  akt2_krysztal_brak_rejestracji: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To już? Niczego nie zarejestrowałam. Wygląda na to, że to tylko dziwna dekoracja albo urządzenie, o którym nic nie wiemy.",
    options: [
      { tekst: "Zabierz kryształ ze sobą", next: "akt2_krysztal_nagla_zmiana" },
      { tekst: "Odłóż na miejsce", next: "akt2_krysztal_nagla_zmiana" },
    ],
  },

  // 🔥 DIALOG (J) – NAGŁA ZMIANA
  akt2_krysztal_nagla_zmiana: {
    npcKey: "flightControlCenter",
    tekst: () => "Poczekaj. Coś się zmieniło...",
    options: [
      { tekst: "Co się stało?", next: "akt2_niewidzialnosc" },
      {
        tekst: "Nie panikuj. Nic się nie dzieje...",
        next: "akt2_niewidzialnosc",
      },
    ],
  },

  // 🔥 DIALOG (K) – NIC NIE WIDZISZ
  akt2_niewidzialnosc: {
    npcKey: "flightControlCenter",
    tekst: () => "Cholera! Nic nie widzę!",
    options: [
      { tekst: "Kliknij, aby kontynuować", next: "akt2_wymiar_niemożliwy" },
    ],
  },

  // 🔥 DIALOG (L) – WYMIAR NIEMOŻLIWY
  akt2_wymiar_niemożliwy: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Mówiłam, żeby nie dotykać kryształu! Wszystko wskazuje na to, że kiedy dotknąłeś/aś kryształu, struktura fraktali w jego wnętrzu przemieściła się - tak samo jak i my... Jesteśmy w jednym z wymiarów “niemożliwych”, a ten dokładnie jest wszechświatem bez kształtu i formy...",
    options: [
      { tekst: "Masz jakiś pomysł?", next: "akt2_plan_powrotu" },
      { tekst: "[Panika] Jak teraz wrócimy?", next: "akt2_plan_powrotu" },
    ],
  },

  // 🔥 DIALOG (Ł) – PLAN POWROTU
  akt2_plan_powrotu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jedyne co możemy zrobić to w jakiś sposób dostać się do kryształu... Pamiętasz jak do niego wrócić?",
    options: [
      { tekst: "Tak! Mam go w kieszeni", next: "akt2_szukaj_krysztalu" },
      {
        tekst: "Jest w kantynie. Musimy wrócić",
        next: "akt2_szukaj_krysztalu",
      },
    ],
  },

  // 🔥 DIALOG (M) – SZUKANIE KRYSZTAŁU
  akt2_szukaj_krysztalu: {
    npcKey: "flightControlCenter",
    tekst: () => "Rewelacyjnie! Postaraj się go odszukać...",
    options: [
      { tekst: "Sięgnij do kieszeni", next: "akt2_wrocenie_krysztalu" },
      { tekst: "Szukaj kryształu w kantynie", next: "akt2_wrocenie_krysztalu" },
    ],
  },

  // 🔥 DIALOG (N) – PRZÓBA POWROTU
  akt2_wrocenie_krysztalu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jak już Ci się udało. Zrób to co wtedy i miejmy nadzieję, że wrócimy do normalności...",
    options: [
      { tekst: "Potrząśnij kryształem", next: "akt2_krysztal_powrot" },
      { tekst: "Zniszcz kryształ", next: "death_explosion" }, // 💀 Śmierć, powrót do checkpointu
    ],
  },

  // 🔥 DIALOG (O) – POTRZĄŚNIĘCIE KRYSZTAŁEM
  akt2_krysztal_powrot: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Kryształ w twoich rękach zaczyna drgać po czym drganie ustaje. Zastanawiasz się, czy to w ogóle się wydarzyło...",
    options: [
      { tekst: "Kliknij, aby kontynuować", next: "akt2_gdzie_jestesmy" },
    ],
  },

  // 🔥 DIALOG (U) – GDZIE JESTEŚMY?
  akt2_gdzie_jestesmy: {
    npcKey: "flightControlCenter",
    tekst: () => "Przenieśliśmy się. Pozwól sprawdzić gdzie...",
    options: [
      { tekst: "Potrząśnij kryształem", next: "death_explosion" }, // 💀 Śmierć, powrót do checkpointu
      { tekst: "Ok. Sprawdź", next: "akt2_powrot_do_normy" },
    ],
  },

  // 🔥 DIALOG (P) – POWRÓT DO NORMALNOŚCI
  akt2_powrot_do_normy: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wszystko wskazuje na to, że jesteśmy znów na torach. Proszę, idź już do komory hibernacyjnej, nie zniosę więcej wrażeń tuż po starcie...",
    options: [
      { tekst: "Niech ci będzie", next: "akt2_hibernacja" },
      { tekst: "Niechętnie", next: "akt2_hibernacja" },
    ],
  },

  // 🔥 ODBIOR SYGNALU PO HIBERNACJI
  akt2_sygnal: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Odbieram sygnal z mglawicy molekularnej, ktora znajduje sie na naszej drodze. Zgodnie z dyrektywa musimy sprawdzic co to jest i skad pochodzi... Jakie sa Twoje zalecenia?",
    options: [
      { tekst: "Zignoruj sygnal. Wroc do komory", next: "akt2_sygnal_ignoruj" },
      { tekst: "Okresl dokladna lokalizacje", next: "akt2_sygnal_lokalizacja" },
    ],
  },

  // 🔥 IGNOROWANIE SYGNALU
  akt2_sygnal_ignoruj: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Niestety nie moge tego zrobic. Za to moge ustalic skad pochodzi sygnal. Wszystko wskazuje na to, ze sygnal jest nadawany z gorskiego lancucha na dryfujacej w mglawicy molekularnej planecie - taki zlobek dla gwiazd i planet. Dosc niestabilne srodowisko - moge powiedziec.",
    options: [
      { tekst: "Co mowi protokol?", next: "akt2_protokol" },
      { tekst: "Potrafisz rozszyfrowac sygnal?", next: "akt2_szyfrowanie" },
    ],
  },

  // 🔥 OKRESLENIE LOKALIZACJI
  akt2_sygnal_lokalizacja: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Dokladnie to probuje ustalic. Wszystko wskazuje na to, ze sygnal jest nadawany z gorskiego lancucha na dryfujacej w mglawicy molekularnej planecie - taki zlobek dla gwiazd i planet. Dosc niestabilne srodowisko - moge powiedziec.",
    options: [
      { tekst: "Co mowi protokol?", next: "akt2_protokol" },
      { tekst: "Potrafisz rozszyfrowac sygnal?", next: "akt2_szyfrowanie" },
    ],
  },

  // 🔥 SPRAWDZENIE PROTOKOLU
  akt2_protokol: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Protokol nakazuje rozszyfrowac sygnal - o ile to wykonalne - i udac sie zbadac obiekt.",
    options: [
      { tekst: "Ladujemy!", next: "akt2_ladowanie" },
      { tekst: "Wyslij drona zwiadowczego", next: "akt2_dron" },
    ],
  },

  // 🔥 PROBA SZYFROWANIA
  akt2_szyfrowanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Niestety nie potrafie tego zrobic. Jest zbyt znieksztalcony... Protokol nakazuje udac sie na miejsce i zbadac zrodlo sygnalu.",
    options: [
      { tekst: "Ladujemy!", next: "akt2_ladowanie" },
      { tekst: "Wyslij drona zwiadowczego", next: "akt2_dron" },
    ],
  },

  // 🔥 SPRAWDZENIE DRONA
  akt2_dron: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const equipment = await getPlayerEquipment();

      if (equipment === "Bron i dron zwiadowczy") {
        return "Dron zwiadowczy wyslany. Wykryl nadajnik na jednym ze szczytow gorskich... Mogę wyladowac najblizej jak to mozliwe - 2 km od zrodla - uwaga, czeka Cie przeprawa po trudnym terenie... Wykonaj procedure ladowania aby zejsc na powierzchnie.";
      } else {
        return "Nie posiadasz drona zwiadowczego. Nie zabrales/as go w czasie odprawy. Wykonaj procedure ladowania aby zejsc na powierzchnie.";
      }
    },
    options: [
      { tekst: "Ubierz skafander", next: "akt2_skafander" },
      { tekst: "Ubierz skafander i wez bron", next: "akt2_skafander_bron" },
    ],
  },

  // 🔥 SPRAWDZENIE BRONI
  akt2_skafander_bron: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const equipment = await getPlayerEquipment();

      if (equipment === "Bron i dron zwiadowczy") {
        return "Karabin w dlon! Jestes gotowy/a do wyjscia. Za chwile sluza sie otworzy i wyjdziesz na powierzchnie.";
      } else {
        return "Niestety nie zabrales/as ze soba broni. Musisz improwizowac! Jestes gotowy/a do wyjscia. Za chwile sluza sie otworzy i wyjdziesz na powierzchnie.";
      }
    },
    options: [
      { tekst: "Wyjdz ze statku", next: "akt2_powierzchnia" },
      { tekst: "Mam jeszcze pytanie", next: "akt2_pytanie" },
    ],
  },

  akt2_skafander: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jestes gotowy/a do wyjscia. Za chwile sluza sie otworzy i wyjdziesz na powierzchnie.",
    options: [
      { tekst: "Wyjdź ze statku", next: "akt2_powierzchnia" },
      { tekst: "Mam jeszcze pytanie", next: "akt2_pytanie" },
    ],
  },

  akt2_pytanie: {
    npcKey: "flightControlCenter",
    tekst: () => "Smialo! Pytaj.",
    options: [
      {
        tekst: "Podaj informacje o planecie",
        next: "akt2_podajInfo_oplanecie",
      },
      {
        tekst: "Wiadomo coś nowego o sygnale?",
        next: "akt2_cosnoweo_osygnale",
      },
    ],
  },

  // 🔥 SCENA: PODAJ INFORMACJE O PLANECIE
  akt2_podajInfo_oplanecie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To niegoscinna, skalista planeta, charakteryzujaca sie ekstremalnymi warunkami atmosferycznymi i trudnym terenem pelnym ostrych klifow i glebokich kanionow. Gwałtowne burze piaskowe, potezne wiatry siegajace predkosci ponad 200 km/h, oraz ekstremalne wahania temperatur od ponad 50°C w dzien do ponizej -30°C w nocy, czynia z niej smiertelnie niebezpieczne miejsce. Atmosfera bogata w dwutlenek siarki uniemozliwia oddychanie, a rzadka i trujaca woda oraz brak roslinnosci sprawiaja, ze zycie jest praktycznie niemozliwe. Pomimo bogatych zasobow mineralnych, brutalne warunki atmosferyczne i nieprzewidywalnosc pogody sprawiaja, ze planeta pozostaje w duzej mierze niezbadana i niezdobyta.",
    options: [
      { tekst: "Wyjdz ze statku", next: "akt2_powierzchnia" },
      { tekst: "Zadaj inne pytanie", next: "akt2_pytanie" },
    ],
  },

  // 🔥 SCENA: WIADOMO COS NOWEGO O SYGNALE?
  akt2_cosnoweo_osygnale: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Nie. Jak wspominalam, nie moge z tego miejsca nic wiecej zrobic.",
    options: [
      { tekst: "Wyjdz ze statku", next: "akt2_powierzchnia" },
      { tekst: "Zadaj inne pytanie", next: "akt2_pytanie" },
    ],
  },

  // 🔥 WYJSCIE NA POWIERZCHNIE
  akt2_powierzchnia: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przed Toba jakies 2 km w ciezkim terenie z nieprzewidywalna pogoda. Teraz skup sie i ruszaj na polnoc... Zaraz! Odbieram kolejna transmisje - tym razem niezaklocona!",
    options: [
      { tekst: "Odbierz transmisję", next: "akt2_transmisja_z_rozbitkiem" },
      {
        tekst: "Nie odbieraj",
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  // 🔥 SCENA: Odrzucenie transmisji z rozbitkiem
  akt2_odrzucenie_1_transmisji_z_robitkiem: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Niestety nie za bardzo masz wyjście. Przypominam o dyrektywach agencji! Odbieram!",
    options: [
      { tekst: "Odbierz transmisję", next: "akt2_transmisja_z_rozbitkiem" },
      {
        tekst: "Nie odbieraj",
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  akt2_transmisja_z_rozbitkiem: {
    npcKey: "rozbitek",
    tekst: () => "Telefon dzwoni...",
    specialScreen: {
      title: "DZWONI OFICER REKRUTUJĄCY",
      subtitle: "Kliknij w ekran by odebrać...",
      image: "@/assets/images/bg_ufo.png",
      background: "@/assets/images/bg_ufo.png",
    },
    sound: "callphone",
    soundPlayLoop: true,
    autoNextScene: "akt2_rozbitek_powitanie",
  },

  akt2_rozbitek_powitanie: {
    npcKey: "rozbitek",
    tekst: () => "Halo... Słychać mnie?",
    options: [
      { tekst: "Głośno i wyraźnie!", next: "akt2_rozbitek_maniery" },
      {
        tekst: "Kim jesteś?",
        next: "akt2_rozbitek_maniery",
      },
    ],
  },

  akt2_rozbitek_maniery: {
    npcKey: "rozbitek",
    tekst: () => "Hmm... Gdzie moje maniery... Nazywam się profesor Milo.",
    options: [
      {
        tekst: "Gdzie się dokładnie znajdujesz?",
        next: "akt2_rozbitek_informacjeopobycie",
      },
      {
        tekst: "Jak się znalazłeś na tej planecie? ",
        next: "akt2_rozbitek_informacjeopobycie",
      },
    ],
  },

  // Informacje o pobycie rozbitka
  akt2_rozbitek_informacjeopobycie: {
    npcKey: "rozbitek",
    tekst: () =>
      "Żebym to ja wiedział. Nie znam nawet nazwy tej planety. Wylądowaliśmy tutaj zwiedzeni sygnałem, a raczej zostaliśmy do tego zmuszeni...",
    options: [
      {
        tekst: "Coś mi to mówi...",
        next: "akt2_rozbitek_cosmitomowi",
      },
      {
        tekst: "Co było dalej?",
        next: "akt2_rozbitek_cobylodalej",
      },
    ],
  },

  // KONTYNUACJA DLA COŚ MI TO MÓWI...
  akt2_rozbitek_cosmitomowi: {
    npcKey: "rozbitek",
    tekst: () =>
      "Wiesz o czym mówię. Dalej to już klasycznie... Wylądowaliśmy w środku piaskowej burzy. Nie mieliśmy pojęcia, że piasek jest tutaj niczym woda. Statek na zawsze spoczął pod piaskami, a załoga ... załoga zniknęła wraz z nim ... przeżyłem tylko ja...",
    options: [
      {
        tekst: "Brzmi racjonalnie",
        next: "akt2_rozbitek_brzmiracjonalnie",
      },
      {
        tekst: "Coś ściemniasz",
        next: "akt2_rozbitek_cossciemniasz",
      },
    ],
  },

  // KONTYNUACJA DLA CO BYŁO DALEJ?
  akt2_rozbitek_cobylodalej: {
    npcKey: "rozbitek",
    tekst: () =>
      "Dalej to już klasycznie... Wylądowaliśmy w środku piaskowej burzy. Nie mieliśmy pojęcia, że piasek jest tutaj niczym woda. Statek na zawsze spoczął pod piaskami, a załoga ... załoga zniknęła wraz z nim ... przeżyłem tylko ja...",
    options: [
      {
        tekst: "Brzmi racjonalnie",
        next: "akt2_rozbitek_brzmiracjonalnie",
      },
      {
        tekst: "Coś ściemniasz",
        next: "akt2_rozbitek_cossciemniasz",
      },
    ],
  },

  // DLA "COŚ ŚCIEMNIASZ"
  akt2_rozbitek_cossciemniasz: {
    npcKey: "rozbitek",
    tekst: () =>
      "Sam widziałeś/aś warunki na tej planecie. Myślisz, że mógłbym to wymyślić? Lepiej pomyśl jak mi pomóc?",
    options: [
      {
        tekst: "Najpierw muszę zbadać sygnał",
        next: "akt2_transmisja_z_rozbitkiem",
      },
      {
        tekst: "Wiesz coś o sygnale?",
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  // DLA "BRZMI RACJONALNIE"
  akt2_rozbitek_brzmiracjonalnie: {
    npcKey: "rozbitek",
    tekst: () =>
      "Sam widziałeś/aś warunki na tej planecie. Myślisz, że mógłbym to wymyślić? Lepiej pomyśl jak mi pomóc?",
    options: [
      {
        tekst: "Najpierw muszę zbadać sygnał",
        next: "akt2_transmisja_z_rozbitkiem",
      },
      {
        tekst: "Wiesz coś o sygnale?",
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },
});
