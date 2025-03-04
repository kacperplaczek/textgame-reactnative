import { SceneType } from "@/scenario/types";
import Storage from "expo-storage";

export const savePlayerChoices = async (key: string, value: string) => {
  await Storage.setItem({ key, value });
};

export const getPlayerEquipment = async () => {
  const equipment = await Storage.getItem({ key: "wybraneZaopatrzenie" });
  return equipment;
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
      const shipClass = await Storage.getItem({ key: "wybranyStatek" });
      const equipment = await Storage.getItem({ key: "wybraneZaopatrzenie" });

      return translations[`akt2Scen2_${plec || "pan"}`]
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
    notifyTime: 100, // testowo 10 sekund
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
    enableDarknessUI: true, // ? Włączanie trybu ciemności...
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
    disableDarknessUI: true, // ? Wyłączenie ciemności UI
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

  // 🔥 PROBA SZYFROWANIA
  akt2_ladowanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wylądowaliśmy! Znajdujemy się nieopodal źródła sygnału. Ubierz się w skafander i opcjonalnie wyposaż w broń - o ile ją zabrałeś/aś ",
    options: [
      { tekst: "Ubierz skafander", next: "akt2_skafander" },
      { tekst: "Ubierz skafander i wez bron", next: "akt2_skafander_bron" },
    ],
  },

  // 🔥 SPRAWDZENIE DRONA
  akt2_dron: {
    npcKey: "flightControlCenter",
    tekst: async () => {
      const equipment = await Storage.getItem({ key: "wybraneZaopatrzenie" });

      console.log("📌 Sprawdzam wybrane wyposażenie:", equipment); // 🔍 Debugowanie, co zwraca `getPlayerEquipment`

      if (equipment?.trim() === "Broń i dron zwiadowczy") {
        return "Dron zwiadowczy wysłany. Wykrył nadajnik na jednym ze szczytów górskich... Mogę wylądować najbliżej jak to możliwe - 2 km od źródła - uwaga, czeka Cię przeprawa po trudnym terenie... Wykonaj procedurę lądowania, aby zejść na powierzchnię.";
      } else {
        return "Nie posiadasz drona zwiadowczego. Nie zabrałeś go w czasie odprawy. Wykonaj procedurę lądowania, aby zejść na powierzchnię.";
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

      if (equipment === "Broń i dron zwiadowczy") {
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
      title: "DZWONI ROZBITEK",
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
        next: "akt2_ustawCheckPoint1",
      },
      {
        tekst: "Coś ściemniasz",
        next: "akt2_ustawCheckPoint2",
      },
    ],
  },

  akt2_ustawCheckPoint2: {
    autoNextScene: "akt2_rozbitek_cossciemniasz",
    checkpoint: true,
    autoNextDelay: 100,
  },

  // DLA "COŚ ŚCIEMNIASZ"
  akt2_rozbitek_cossciemniasz: {
    npcKey: "rozbitek",
    tekst: () =>
      "Sam widziałeś/aś warunki na tej planecie. Myślisz, że mógłbym to wymyślić? Lepiej pomyśl jak mi pomóc?",
    options: [
      {
        tekst: "Najpierw muszę zbadać sygnał",
        next: "akt2_rozbitek_dialogkontynuacja",
      },
      {
        tekst: "Wiesz coś o sygnale?",
        next: "akt2_rozbitek_dialogkontynuacja",
      },
    ],
  },

  akt2_ustawCheckPoint1: {
    autoNextScene: "akt2_rozbitek_brzmiracjonalnie",
    checkpoint: true,
    autoNextDelay: 100,
  },

  // DLA "BRZMI RACJONALNIE"
  akt2_rozbitek_brzmiracjonalnie: {
    npcKey: "rozbitek",
    tekst: () =>
      "Bo takie jest. Sam widziałeś/aś warunki na tej planecie. Możesz mi jakoś pomóc?",
    options: [
      {
        tekst: "Najpierw muszę zbadać sygnał",
        next: "akt2_rozbitek_dialogkontynuacja",
      },
      {
        tekst: "Wiesz coś o sygnale?",
        next: "akt2_rozbitek_dialogkontynuacja",
      },
    ],
  },

  // Schodzimy do jednego dialogu dla obu powyższych

  akt2_rozbitek_dialogkontynuacja: {
    npcKey: "rozbitek",
    tekst: () => "Nie wiem na co jeszcze czekasz. Ruszaj!",
    options: [
      {
        tekst: "Ruszaj na północ",
        next: "akt2_rozbitek_polnoc",
      },
      {
        tekst: "Ruszaj na południe",
        next: "akt2_rozbitek_poludnie",
      },
    ],
  },

  // Start dwóch rozbierznych dróg

  akt2_rozbitek_polnoc: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Dobrze, że pamiętałeś co mówiłam. Poszedłbyś na południe i spadłbyś w przepaść... Przed Tobą kolejny wybór. Możesz udać się przełęczą ale będziesz narażony/a na szalone warunki pogodowe, albo wybrać drogę przez system jaskiń - z tym, że nie mam pojęcia co tam jest... Co zdecydujesz?",
    options: [
      {
        tekst: "Wybieram ścieżkę przełęczą",
        next: "akt2_przelecze_start",
      },
      {
        tekst: "Jaskinie. Pogoda jest ... szalona",
        next: "akt2_jasknie_start",
      },
    ],
  },

  akt2_rozbitek_poludnie: {
    npcKey: "rozbitek",
    deathScreen: "spadlesZUrwiska",
    tekst: () => "Spadłeś z Urwiska...",
  },

  death_explosion: {
    npcKey: "rozbitek",
    deathScreen: "explosionDeathScreen",
    tekst: () => "Wybuchłeś...",
  },

  // ? Start ścieżki przełęcza
  akt2_przelecze_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przed Tobą spokojny spacerek o długości 1000 m do następnego podejścia. Nie śpiesz się, pogoda jest stabilna, a podłoże przypomina wielką tarkę ostrych kamieni więc uważaj na każdy krok...  ",
    autoNextDelay: 3000,
    autoNextScene: "akt2_przelecze_cd1",
  },

  akt2_przelecze_cd1: {
    npcKey: "rozbitek",
    tekst: () =>
      "Nie chce się wtrącać ale mam nadzieję, że zabrałeś dodatkowy prowiant... Marzę o zimnym piwku.",
    options: [
      {
        tekst: "Nie martw się. Wszystko jest",
        next: "akt2_przelecze_wszystkoJest",
      },
      {
        tekst: "Najpierw musimy Cię znaleść",
        next: "akt2_przelecze_musimycie_znalezc",
      },
    ],
  },

  akt2_przelecze_wszystkoJest: {
    npcKey: "rozbitek",
    tekst: () =>
      "Uspokoiłeś/aś mnie ale zanim do tego dojdzie i usiądziemy przy zimnym piwku będziemy musieli wymyśleć jak mnie znaleść.",
    options: [
      {
        tekst: "Mam pewien pomysł",
        next: "akt2_przelecze_mam_pomysl",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_odrzucenie_1_transmisji_z_robitkiem",
      },
    ],
  },

  akt2_przelecze_musimycie_znalezc: {
    npcKey: "rozbitek",
    tekst: () =>
      "Zmieniasz temat. Rozumiem. Czyli mój ratunek nie jest jeszcze taki pewny. Najpierw skupmy się jak mnie znaleść.",
    options: [
      {
        tekst: "Mam pewien pomysł",
        next: "akt2_przelecze_mam_pomysl",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_przelecze_narazieotym_niemysle",
      },
    ],
  },

  akt2_przelecze_mam_pomysl: {
    npcKey: "rozbitek",
    tekst: () =>
      "Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    options: [
      {
        tekst: "Zobaczysz",
        next: "akt2_przelecze_cd3",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_przelecze_cd3",
      },
    ],
  },

  akt2_przelecze_narazieotym_niemysle: {
    npcKey: "rozbitek",
    tekst: () =>
      "A powinieneś/aś. Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    options: [
      {
        tekst: "Zobaczysz",
        next: "akt2_przelecze_cd3",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_przelecze_cd3",
      },
    ],
  },

  akt2_przelecze_cd3: {
    npcKey: "rozbitek",
    tekst: () => "Widzę, że nie masz ochoty na rozmowy. Odezwę się później.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_przelecze_cd4",
  },

  akt2_przelecze_cd4: {
    npcKey: "rozbitek",
    tekst: () => "Zdecydowanie! Dotarłeś/aś do wzniesienia. Teraz się skup",
    options: [
      // ! Trzeba dodać ogólną kontynuację - wyjście z dialogu odrębnego.
      {
        tekst: "Użyj czekanów do wspinaczki",
        next: "akt2_przelecze_koniec_waitTime",
      },
      {
        tekst: "Wspinaj się klasycznie",
        next: "akt2_przelecze_smierc",
      },
    ],
  },

  akt2_przelecze_smierc: {
    npcKey: "rozbitek",
    tekst: () => "Spadasz w otchłań",
    deathScreen: "spadlesWOtchlan",
  },

  akt2_jasknie_start: {
    npcKey: "rozbitek",
    tekst: () =>
      "Idziemy jaskiniami. W takim razie ruszaj i zobaczymy co nas tam czeka...",
    autoNextDelay: 3000,
    autoNextScene: "akt2_jasknie_cd1",
  },

  akt2_jasknie_cd1: {
    npcKey: "rozbitek",
    tekst: () =>
      "Nie chce się wtrącać ale mam nadzieję, że zabrałeś dodatkowy prowiant... Marzę o zimnym piwku.",
    options: [
      {
        tekst: "Nie martw się. Wszystko jest",
        next: "akt2_jasknie_wszystkojestniemartwsie",
      },
      {
        tekst: "Najpierw musimy Cię znaleść",
        next: "akt2_jasknie_musimycieznalezc",
      },
    ],
  },

  akt2_jasknie_musimycieznalezc: {
    npcKey: "rozbitek",
    tekst: () =>
      "Zmieniasz temat. Rozumiem. Czyli mój ratunek nie jest jeszcze taki pewny. Najpierw skupmy się jak mnie znaleść.",
    options: [
      {
        tekst: "Mam pewien pomysł",
        next: "akt2_przelecze_cd3",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_przelecze_smierc",
      },
    ],
  },

  akt2_jasknie_wszystkojestniemartwsie: {
    npcKey: "rozbitek",
    tekst: () =>
      "Uspokoiłeś/aś mnie ale zanim do tego dojdzie i usiądziemy przy zimnym piwku będziemy musieli wymyśleć jak mnie znaleść.",
    options: [
      {
        tekst: "Mam pewien pomysł",
        next: "akt2_jasknie_mampewienpomysl",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_jasknie_niemysleotym",
      },
    ],
  },

  akt2_jasknie_mampewienpomysl: {
    npcKey: "rozbitek",
    tekst: () =>
      "Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    options: [
      {
        tekst: "Zobaczysz",
        next: "akt2_jasknie_cd4",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_jasknie_cd4",
      },
    ],
  },

  akt2_jasknie_niemysleotym: {
    npcKey: "rozbitek",
    tekst: () =>
      "A powinieneś/aś. Z nas dwóch to ja jestem profesorem i nic nie wymyśliłem. Ciekawe na co Ty wpadniesz...",
    options: [
      {
        tekst: "Zobaczysz",
        next: "akt2_jasknie_cd4",
      },
      {
        tekst: "Na razie o tym nie myślę",
        next: "akt2_jasknie_cd4",
      },
    ],
  },

  akt2_jasknie_cd4: {
    npcKey: "rozbitek",
    tekst: () => "Widzę, że nie masz ochoty na rozmowy. Odezwę się później.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_jasknie_cd5",
  },

  akt2_jasknie_cd5: {
    npcKey: "flightControlCenter",
    tekst: () => "Przed Tobą studnia. Musisz jakoś ją pokonać ...",
    options: [
      {
        tekst: "Spróbuj przeskoczyć",
        next: "akt2_jaskinie_smierc",
      },
      {
        tekst: "Użyj liny",
        next: "akt2_jaskinie_koniec_waitTime",
      },
    ],
  },

  akt2_jaskinie_smierc: {
    npcKey: "rozbitek",
    tekst: () => "Spadasz w otchłań",
    deathScreen: "spadlesWOtchlan",
  },

  akt2_jaskinie_koniec_waitTime: {
    npcKey: "flightControlCenter",
    tekst: () => "Przeprawa w toku...",
    notifyTime: 100, // testowo 10 sekund
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_jasknie_dotarlesNaSzczytKanionu",
  },

  akt2_przelecze_koniec_waitTime: {
    npcKey: "flightControlCenter",
    tekst: () => "Przeprawa w toku...",
    notifyTime: 100, // testowo 10 sekund
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_jasknie_dotarlesNaSzczytKanionu",
  },

  akt2_jasknie_dotarlesNaSzczytKanionu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Dotarłeś/aś na szczyt kanionu. Już niedaleko do źródła sygnału ... Pamiętaj, jesteś tam sam/a, bez wsparcia - każdy twój krok może przynieść odkrycia... albo zagrożenia...",
    options: [
      {
        tekst: "Wiem, dzięki",
        next: "akt2_jasknie_jestessamotnymodkrywca",
      },
      {
        tekst: "Niebezpieczeństwa?",
        next: "akt2_jasknie_jestessamotnymodkrywca",
      },
    ],
  },

  akt2_jasknie_jestessamotnymodkrywca: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jesteś samotnym odkrywcą w tej niezbadanej przestrzeni. Ludzka psychika nie jest stworzona do takiego odosobnienia. Czy izolacja zaczyna cię już dotykać?",
    options: [
      {
        tekst: "Intryguje mnie",
        next: "akt2_wszystkie_procedury",
      },
      {
        tekst: "Przytłacza mnie",
        next: "akt2_wszystkie_procedury",
      },
    ],
  },

  akt2_wszystkie_procedury: {
    npcKey: "flightControlCenter",
    tekst: () => "Wszystkie procedury są jednoznaczne... ale mogę to zgłosić?",
    options: [
      {
        tekst: "Zgłoś ",
        next: "akt2_nadalekiej_planecie",
      },
      {
        tekst: "Zachowaj dla siebie",
        next: "akt2_nadalekiej_planecie",
      },
    ],
  },

  akt2_nadalekiej_planecie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Na dalekiej planecie, z dala od codziennych zmartwień, może czasem wydawać się, że możemy uwolnić się od naszych sekretów. Może chcesz się czymś podzielić? Często, ludzie w ekstremalnych sytuacjach odkrywają nowe prawdy o sobie.",
    options: [
      {
        tekst: "To moja sprawa",
        next: "akt2_przeszloscczest_rzuca",
      },
      {
        tekst: "Nie teraz",
        next: "akt2_przeszloscczest_rzuca",
      },
    ],
  },

  akt2_przeszloscczest_rzuca: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przeszłość często rzuca długi cień na teraźniejszość, a decyzje, które podjęliśmy kiedyś, mogą kształtować nasze teraz. Uważasz, że są sekrety, które mogą być tak przerażające lub destrukcyjne, że lepiej by było ich nigdy nie odkrywać?",
    options: [
      {
        tekst: "Niektóre lepiej zostawić",
        next: "akt2_misje_takie_jak_twoja",
      },
      {
        tekst: "Niektóre wyjdą",
        next: "akt2_misje_takie_jak_twoja",
      },
    ],
  },

  akt2_misje_takie_jak_twoja: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Misje takie jak twoja to nie tylko kwestia badań i eksploracji. Czasem wydaje mi się, że jest coś więcej, co przyciąga nas do gwiazd. Co Ciebie przyciąga do gwiazd?",
    options: [
      {
        tekst: "Rozkazy",
        next: "akt2_nie_moznaignorowac",
      },
      {
        tekst: "Nowe horyzonty",
        next: "akt2_nie_moznaignorowac",
      },
    ],
  },

  akt2_nie_moznaignorowac: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Nie możemy ignorować indywidualnych dążeń, które sprawiają, że zostajesz wybrany do tak wyjątkowych zadań. Możliwe, że gdzieś w głębi siebie szukasz odpowiedzi, której na Ziemi nie znajdziesz?",
    options: [
      {
        tekst: "Powody osobiste",
        next: "akt2_wyobrazenie_o_eksploracji",
      },
      {
        tekst: "Nauka i eksploracja",
        next: "akt2_wyobrazenie_o_eksploracji",
      },
    ],
  },

  akt2_wyobrazenie_o_eksploracji: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wyobrażenie o eksploracji kosmicznej często bywa snem o ucieczce. Możemy próbować uciec od naszych problemów na Ziemi, szukając rozwiązania w gwiazdach. Czy była to ucieczka także dla ciebie, czy może coś więcej?",
    options: [
      {
        tekst: "Być może",
        next: "akt2_pewne_nieodkryte_kwestie",
      },
      {
        tekst: "Nie wiem",
        next: "akt2_pewne_nieodkryte_kwestie",
      },
    ],
  },

  akt2_pewne_nieodkryte_kwestie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Rozumiem, że pewne kwestie pozostaną nieodkryte, ale czy pamiętasz moment, kiedy zdecydowałeś się na tę podróż? Co było tym impulsującym momentem?",
    options: [
      {
        tekst: "Pragnienie zmian",
        next: "akt2_interesujaceAleMowiacOzmianach",
      },
      {
        tekst: "Nie przypomina sobie",
        next: "akt2_interesujaceAleMowiacOzmianach",
      },
    ],
  },

  akt2_interesujaceAleMowiacOzmianach: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Interesujące... Ale mówiąc o zmianach, wykrywamy gwałtowne zmiany barometryczne blisko twojej lokalizacji. Czy dostrzegasz jakieś oznaki nadchodzącej burzy?",
    options: [
      {
        tekst: "Wydaje mi się, że czuje wiatr",
        next: "akt2_niepozwolesiezmylic",
      },
      {
        tekst: "Wszystko wygląda spokojnie",
        next: "akt2_niepozwolesiezmylic",
      },
    ],
  },

  akt2_niepozwolesiezmylic: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Nie pozwól się zmylić ciszy przed burzą. Nasze instrumenty wskazują na szybko zbliżającą się megaburzę piaskową. Musisz natychmiast znaleźć schronienie.",
    options: [
      {
        tekst: "Poszukam schronienia",
        next: "akt2_schroenienie_start",
      },
      {
        tekst: "Idę dalej",
        next: "akt2_spadaszwotchlan_2",
      },
    ],
  },

  akt2_spadaszwotchlan_2: {
    npcKey: "rozbitek",
    tekst: () => "Spadasz z urwiska",
    deathScreen: "spadlesWOtchlan",
  },

  akt2_schroenienie_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Schronienie jest blisko, widzę małą grotę skalną niedaleko. Musisz znaleźć schronienie natychmiast.",
    options: [
      {
        tekst: "Chowam się w grocie",
        next: "akt2_schroenienie_grota_start",
      },
      {
        tekst: "Idę dalej",
        next: "akt2_spadaszwotchlan_2",
      },
    ],
  },

  akt2_schroenienie_grota_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Pogodowe okno czasowe jest bardzo małe. Musisz zdecydować, czy ruszyć w stronę sygnału, czy ratować rozbitka. Moje zdanie już znasz.",
    options: [
      {
        tekst: "Ratujemy człowieka",
        next: "akt2_badanie_czlowieka_start",
      },
      {
        tekst: "Badamy sygnał",
        next: "akt2_badaniesygnalu_start",
      },
    ],
  },

  // ? START SEKCJI Z RATOWANIEM CZŁOWIEKA
  akt2_badanie_czlowieka_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Protokół zaleca zbadanie sygnały. Wolałabym nie zgłaszać niesubordynacji ale sam/a decydujesz.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_ratowanie_cd1",
  },

  akt2_ratowanie_cd1: {
    npcKey: "rozbitek",
    tekst: () => "Już się nie mogę doczekać. Mam dość tej przeklętej planty!",
    options: [
      {
        tekst: "Już dobrze. Ruszamy do sygnału",
        next: "akt2_badaniesygnalu_start",
      },
      {
        tekst: "Ruszamy po rozbitka",
        next: "akt2_badanie_ruszamy_po_rozbitka",
      },
    ],
  },

  akt2_badanie_ruszamy_po_rozbitka: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Zgłaszam naruszenie protokołu! Jeżeli chcesz uratować człowieka ruszaj na zachód. Sygnał jest coraz bardziej wyraźny.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_ratowanie_jestesmoimaniolem",
  },

  akt2_ratowanie_jestesmoimaniolem: {
    npcKey: "rozbitek",
    tekst: () => "Jesteś moim aniołem stróżem. Dziękuję  ",
    options: [
      {
        tekst: "Dobrze będzie mieć towarzystwo",
        next: "akt2_towarzystwo_mozebycwskazane",
      },
      {
        tekst: "Nie masz wątpliwości",
        next: "akt2_towarzystwo_mozebycwskazane",
      },
    ],
  },

  akt2_towarzystwo_mozebycwskazane: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Towarzystwo może być wskazane dla Twojego zdrowia psychicznego ale na pewno nie dla zapasów, które mogą szybko się skończyć.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_ratowanie_jestesnamiejscu1",
  },

  akt2_ratowanie_jestesnamiejscu1: {
    npcKey: "flightControlCenter",
    tekst: () => "Jesteś moim aniołem stróżem. Dziękuję  ",
    options: [
      {
        tekst: "Uciekaj na statek",
        next: "akt2_end_of_act",
      },
      {
        tekst: "Wejdź do budynku",
        next: "akt2_ratowanie_wejdzdobudynku",
      },
    ],
  },

  akt2_ratowanie_wejdzdobudynku: {
    npcKey: "rozbitek",
    tekst: () =>
      "Na reszcie jesteś! Nawet nie wiesz jak się cieszę. Wracamy do domu?",
    options: [
      {
        tekst: "Tak, idziemy wracamy na statek",
        next: "akt2_end_of_act",
      },
      {
        tekst: "Chcesz coś zabrać?",
        next: "akt2_ratowanie_znalazlemkrysztal",
      },
    ],
  },

  akt2_ratowanie_znalazlemkrysztal: {
    npcKey: "rozbitek",
    tekst: () =>
      "Tak. Wyobraź sobie, żę znalazłem pewien kryształ. Nie wiem do czego służy ale będzie sporo wart jak wrócimy na ziemie",
    options: [
      {
        tekst: "Wróćcie razem na statek",
        next: "akt2_end_of_act",
      },
      {
        tekst: "Ukradnij kryształ i uciekaj",
        next: "akt2_ratowanie_poczekajazubierzeskafander",
      },
    ],
  },

  // TODO: Dodać zapisanie tej czynności do cache.
  akt2_ratowanie_poczekajazubierzeskafander: {
    npcKey: "rozbitek",
    tekst: () =>
      "Tak. Wyobraź sobie, żę znalazłem pewien kryształ. Nie wiem do czego służy ale będzie sporo wart jak wrócimy na ziemie",
    options: [
      {
        tekst: "Poczekaj",
        next: "akt2_end_of_act",
      },
      {
        tekst: "Ucieknij",
        next: "akt2_end_of_act",
      },
    ],
  },

  // ? START SEKCJI Z BADANIEM SYGNAŁU

  akt2_badaniesygnalu_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Sygnał jest coraz silniejszy, prowadzi nas w stronę źródła. Bądź ostrożny.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_badaniesygnalu_niewierzezostawiaszmnie",
  },

  akt2_badaniesygnalu_niewierzezostawiaszmnie: {
    npcKey: "rozbitek",
    tekst: () =>
      "Tak. Wyobraź sobie, żę znalazłem pewien kryształ. Nie wiem do czego służy ale będzie sporo wart jak wrócimy na ziemie",
    options: [
      {
        tekst: "Już dobrze. Ruszamy po rozbitka",
        next: "akt2_badanie_czlowieka_start",
      },
      {
        tekst: "Ruszamy zbadać sygnał",
        next: "akt2_badaniesygnalu_wspanialeruszaj",
      },
    ],
  },

  akt2_badaniesygnalu_wspanialeruszaj: {
    npcKey: "flightControlCenter",
    tekst: () => "Wspaniale. Ruszaj na wschód. Żródło sygnału jest blisko.",
    autoNextDelay: 3000,
    autoNextScene: "akt2_badaniesygnalu_wkurzonyrozbitek",
  },

  akt2_badaniesygnalu_wkurzonyrozbitek: {
    npcKey: "rozbitek",
    tekst: () => "Nie zapomnę Ci tego! Pozostawiasz mnie tutaj na śmierć!",
    options: [
      {
        tekst: "Zostań w schronieniu",
        next: "akt2_badaniesygnalu_zostanwSchronieniu",
      },
      {
        tekst: "Idziemy",
        next: "akt2_ruiny_start",
      },
    ],
  },

  akt2_badaniesygnalu_zostanwSchronieniu: {
    npcKey: "rozbitek",
    tekst: () => "Nie zapomnę Ci tego! Pozostawiasz mnie tutaj na śmierć!",
    deathScreen: "stormDeathScreen",
  },

  akt2_ruiny_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przed Tobą rozciągają się jakieś ruiny. Wyglądają na ruiny cywilizacji której statkiem się poruszasz.",
    options: [
      {
        tekst: "Podejdź zbadać ruiny",
        next: "akt2_ruiny_zbadajruiny",
      },
      {
        tekst: "Mam pewne obawy",
        next: "akt2_ruiny_mampewneobawy",
      },
    ],
  },

  akt2_ruiny_zbadajruiny: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przed Tobą rozciąga się wielka hala o dziwnych kształcie. Na jej środku znajduje się monument, a na nim kryształ.",
    options: [
      {
        tekst: "Zbadaj kryształ",
        next: "akt2_ruiny_zbadajkrysztal",
      },
      {
        tekst: "Zostaw kryształ i uciekaj",
        next: "akt2_ruiny_zostawkrysztal",
      },
    ],
  },

  akt2_ruiny_mampewneobawy: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Twoje obawy są jak najbardziej uzasadnione ale chyba nie mamy większego wyjścia. Przed Tobą rozciąga się wielka hala o dziwnych kształcie. Na jej środku znajduje się monument, a na nim kryształ.",
    options: [
      {
        tekst: "Zbadaj kryształ",
        next: "akt2_ruiny_zbadajkrysztal",
      },
      {
        tekst: "Zostaw kryształ i uciekaj",
        next: "akt2_ruiny_zostawkrysztal",
      },
    ],
  },

  akt2_ruiny_zbadajkrysztal: {
    npcKey: "flightControlCenter",
    tekst: () => "To mi się podoba, podchodzisz do  kryształu.",
    notifyTime: 10,
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_ruiny_analiza_krysztalu",
  },

  akt2_ruiny_zostawkrysztal: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Za daleko zabrnęliśmy. Jak już tutaj jesteś to po prostu zbadaj kryształ...",
    notifyTime: 10,
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt2_ruiny_analiza_krysztalu",
  },

  akt2_ruiny_analiza_krysztalu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Analiza nic nie wykazała ale warto zabrać kryształ na statek. Nigdy nie wiadomo czy nie przyda się w przyszłości",
    options: [
      {
        tekst: "Schowaj kryształ",
        next: "akt2_ruiny_zbadajkrysztal",
      },
      {
        tekst: "Nie wiem czy to dobry pomysł",
        next: "akt2_ruiny_zostawkrysztal",
      },
    ],
  },

  akt2_ruiny_maszkrysztal: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Masz kryształ. Nawet jeżeli nic nie robi jest to artefakt obcych i zgodnie z umową dostaniesz za niego sowite wynagrodzenie",
    options: [
      {
        tekst: "Wracamy na statek",
        next: "akt2_end_of_act",
      },
      {
        tekst: "Poszukajmy rozbitka",
        next: "akt2_badaniesygnalu_zostanwSchronieniu",
      },
    ],
  },

  akt2_ruiny_maszkrysztal_brakaktywnosci: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Kryształ nie wykazuje żadnej aktywności więc jest niegroźny. Przypominam, że zgodnie z umową jest to technologia obcych i dostaniesz za nią pokaźną sumę.",
    options: [
      {
        tekst: "Wracamy na statek",
        next: "akt2_end_of_act",
      },
      {
        tekst: "Poszukajmy rozbitka",
        next: "akt2_badaniesygnalu_zostanwSchronieniu",
      },
    ],
  },

  akt2_end_of_act: {
    npcKey: "flightControlCenter",
    tekst: () => "Brawo! Przeszedłeś Rozdział 2",
    endAct: "actEndScreen",
    nextAct: "akt-2",
  },
});
