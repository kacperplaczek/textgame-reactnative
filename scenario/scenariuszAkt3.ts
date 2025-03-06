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
  rozpoczecie_aktu: {
    npcKey: "flightControlCenter",
    tekst: () => "Oczekiwanie...",
    notifyTime: 10,
    notifyScreenName: "powrot_na_statek",
    autoNextScene: "akt3_checkpoint",
  },

  // ? DO KOPIOWANIA
  akt3_checkpoint: {
    tekst: () => "",
    autoNextScene: "akt3_start",
    autoNextDelay: 100,
    checkpoint: true,
  },

  akt3_start: {
    npcKey: "flightControlCenter",
    tekst: () => "Co myślisz o tym, co się stało na planecie?",
    options: [
      { tekst: "Nie mogę przestać myśleć o...", next: "akt3_twojeemocje_1" },
      {
        tekst: plec
          ? translations[`akt3odptestowa_${plec}`]
          : translations.akt3odptestowa,
        next: "akt3_twojeemocje_1",
      },
    ],
  },

  akt3_twojeemocje_1: {
    npcKey: "flightControlCenter",
    tekst: () => "Twoje emocje są zrozumiałe. Musisz jednak zachować spokój.",
    options: [
      { tekst: "Po tym? Trudno o spokój.", next: "akt3_scena2" },
      { tekst: "Masz rację. Muszę się skupić.", next: "akt3_scena2" },
    ],
  },

  akt3_scena2: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Widzę, że jesteś pod wpływem silnego stresu. Moim zadaniem jest zapewnić pomoc i ochronę. Przywołuje ECHO.",
    options: [
      { tekst: "Kto to ECHO?", next: "akt3_scena2_echo_1" },
      { tekst: "Nie ma takiej potrzeby.", next: "akt3_scena3_echo_1" },
    ],
  },

  // ? KIM JEST ECHO

  akt3_scena2_echo_1: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To zaawansowane AI zajmujące się ludzką naturą. Uwierz mi, potrafi pomóc.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena2_echo_2",
  },

  akt3_scena2_echo_2: {
    npcKey: "echo",
    tekst: () => "Witaj. Jestem ECHO. Jak mogę Ci służyć?",
    options: [
      { tekst: "Czy to w ogóle ma sens?", next: "akt3_scena4" },
      { tekst: "Nie wiem czy mogę kontynuować!", next: "akt3_scena4" },
    ],
  },

  // ? NIE MA TAKIEJ POTRZEBY

  akt3_scena3_echo_1: {
    npcKey: "flightControlCenter",
    tekst: () => "Nie Ty o tym decydujesz. Siadaj i skup się.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena2_echo_2",
  },

  akt3_scena3_echo_2: {
    npcKey: "echo",
    tekst: () => "Witaj. Jestem ECHO. Jak mogę Ci służyć?",
    options: [
      { tekst: "Czy to w ogóle ma sens?", next: "akt3_scena4" },
      { tekst: "Nie wiem czy mogę kontynuować!", next: "akt3_scena4" },
    ],
  },

  // ? Ciąg dalszy (1)

  akt3_scena4: {
    npcKey: "echo",
    tekst: () =>
      "Twoje pytanie jest istotne ale w tej chwili istotniejsze jest Twoje przetrwanie. Skieruj swoje myśli w tę stronę.",
    options: [
      { tekst: "Czyli gdzie dokładnie?", next: "akt3_pytanie_miejsca" },
      { tekst: "Chce tylko wrócić do domu.", next: "akt3_pytanie_miejsca" },
    ],
  },

  akt3_pytanie_miejsca: {
    npcKey: "flightControlCenter",
    tekst: () => "Uwaga! Wykryto nowy obiekt na kursie kolizyjnym!",
    options: [
      { tekst: "Co to za obiekt?", next: "akt3_identyfikacja_obiektu" },
      { tekst: "Spróbujmy go uniknąć!", next: "akt3_unik_obiektu" },
    ],
  },

  akt3_identyfikacja_obiektu: {
    npcKey: "flightControlCenter",
    tekst: () => "To statek podobny do naszego. Spróbuję nawiązać kontakt.",
    autoNextScene: "akt3_kontakt_dowodca",
    autoNextDelay: 3000,
  },

  akt3_unik_obiektu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wiesz co na to protokół. To statek podobny do naszego. Spróbuję nawiązać kontakt.",
    autoNextScene: "akt3_kontakt_dowodca",
    autoNextDelay: 3000,
  },

  akt3_kontakt_dowodca: {
    npcKey: "dowodca",
    tekst: () => "Tu dowódca statku Explorator. Kim jesteście?",
    options: [
      { tekst: "Ekspedycją naukową.", next: "akt3_czarna_dziura" },
      { tekst: "Co tu robisz?", next: "akt3_czarna_dziura" },
    ],
  },

  akt3_czarna_dziura: {
    npcKey: "dowodca",
    tekst: () =>
      "Tkwimy tutaj! Nie zbliżajcie się! Utknęliśmy w polu grawitacyjnym czarnej dziury!",
    options: [
      { tekst: "Długo tutaj jesteś?", next: "akt3_deathscreen_czarna_dziura" },
      { tekst: "Manewr unikowy! TERAZ!", next: "akt3_unik_czarnej_dziury" },
    ],
  },

  akt3_unik_czarnej_dziury: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "W ostatniej chwili udało uniknąć się tego pola grawitacyjnego! Nie powiem, było gorąco!",
    options: [
      {
        tekst: "Jak długo tutaj jesteś?",
        next: "akt3_deathscreen_czarna_dziura",
      },
      { tekst: "Masz zapasy?", next: "akt3_zapasy" },
    ],
  },

  akt3_deathscreen_czarna_dziura: {
    npcKey: "dowodca",
    deathScreen: "wpadlesWCzarnaDziure",
    tekst: () => "Wasz statek przekroczył horyzont zdarzeń... To koniec...",
  },

  akt3_zapasy: {
    npcKey: "dowodca",
    tekst: () =>
      "Wszystko się już skończyło. Wczoraj zjadłem potrawkę z butów. Moja jedyna nadzieja to czarna dziura. Nie chciałbym nikogo stawiać przed takim dylematem, ale dla mnie wybór jest oczywisty.",
    options: [
      { tekst: "Horyzont zdarzeń to śmierć.", next: "akt3_decyzja_ucieczka" },
      { tekst: "Jedyna szansa...", next: "akt3_decyzja_ucieczka" },
    ],
  },

  akt3_decyzja_ucieczka: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Rekomenduję zakończenie komunikacji. Obiekt jest generalnie niestabilny i jeszcze możemy podzielić ten los.",
    options: [
      {
        tekst: "Jest szansa uratować kapitana.",
        next: "akt3_deathscreen_czarna_dziura",
      },
      { tekst: "Uciekamy!", next: "akt3_ucieczka_udana" },
    ],
  },

  akt3_ucieczka_udana: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Udało nam się oddalić od czarnej dziury. Nasze systemy wykazały niezwykle silne zakłócenia grawitacyjne. Jak się trzymasz?",
    options: [
      { tekst: "Oszaleję.", next: "akt3_echo_kapitan" },
      { tekst: "Ten człowiek?", next: "akt3_echo_kapitan" },
    ],
  },

  akt3_echo_kapitan: {
    npcKey: "echo",
    tekst: () =>
      "Twoje reakcje są zrozumiałe. Widok kapitana Exploratora, który zginął, rzucając się w pola pływowe, musiał być traumatyczny.",
    options: [
      { tekst: "Nie dało się nic zrobić.", next: "akt3_misja_kontynuacja" },
      { tekst: "Kiedyś o tym zapomnę?", next: "akt3_misja_kontynuacja" },
    ],
  },

  akt3_misja_kontynuacja: {
    npcKey: "echo",
    tekst: plec
      ? translations[`akt3_scen1213123_${plec}`]
      : translations.akt3_scen1213123,
    autoNextScene: "akt3_hibernacja",
    autoNextDelay: 3000,
  },

  akt3_hibernacja: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Dość już wrażeń. Wracam na kurs, a Tobie proponuję udać się do komory hibernacyjnej.",
    options: [
      { tekst: "Chyba nie mam wyjścia.", next: "akt3_hibernacja_start" },
      { tekst: "Tak, odpocznę.", next: "akt3_hibernacja_start" },
    ],
  },

  akt3_hibernacja_start: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Rozpoczynam procedurę hibernacji. Do zobaczenia po przebudzeniu.",
    notifyTime: 100,
    notifyScreenName: "hibernacja_w_toku",
    autoNextScene: "akt3_pobudka",
    autoNextDelay: 3000,
  },

  akt3_pobudka: {
    npcKey: "flightControlCenter",
    tekst: () => "Uwaga! Wykryto kolejną jednostkę na kursie!",
    options: [
      { tekst: "Zeskanuj go.", next: "akt3_skanowanie" },
      { tekst: "Wchodzimy na pokład.", next: "akt3_dokowanie" },
    ],
  },

  akt3_skanowanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Skanowanie w toku... Ten statek nie wykazuje żadnych oznak życia. Strukturalnie jest nienaruszony, ale systemy energetyczne są martwe.",
    options: [
      { tekst: "Podejrzane.", next: "akt3_zblizenie" },
      { tekst: "Nic dziwnego.", next: "akt3_zblizenie" },
    ],
  },

  akt3_zblizenie: {
    npcKey: "flightControlCenter",
    tekst: () => "Proponuję zbliżyć się do statku.",
    autoNextScene: "akt3_dokowanie",
    autoNextDelay: 3000,
  },

  akt3_dokowanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Przygotowuję się na manewr dokujący. Za kilka minut będziemy przy statku.",
    autoNextScene: "akt3_dokowanie_klik",
    autoNextDelay: 3000,
  },

  akt3_dokowanie_klik: {
    npcKey: "flightControlCenter",
    tekst: () => "Dokowanie",
    checkpoint: true,
    options: [
      { tekst: "Kliknij, aby kontynuować", next: "akt3_wejscie_na_poklad" },
    ],
  },

  akt3_wejscie_na_poklad: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen121314_${plec}`]
      : translations.akt3_scen121314,
    options: [
      { tekst: "Wchodzimy!", next: "akt3_wejscie_procedura" },
      { tekst: "Zabieramy się stąd!", next: "akt3_nie_mozna_uciec" },
    ],
  },

  akt3_nie_mozna_uciec: {
    npcKey: "flightControlCenter",
    tekst: () => "Chyba już trochę za późno. Weź się w garść!",
    autoNextScene: "akt3_wejscie_procedura",
    autoNextDelay: 3000,
  },

  akt3_wejscie_procedura: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Inicjuję procedurę wejścia. Bądź przygotowany na wszelkie niespodzianki.",
    autoNextScene: "akt3_sluzowanie",
    autoNextDelay: 3000,
  },

  akt3_sluzowanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Śluza otwarta. Atmosfera jest stabilna, ale ciemność w środku jest przytłaczająca. Włącz latarki.",
    autoNextScene: "akt3_odczucie_ciszy",
    autoNextDelay: 3000,
  },

  akt3_odczucie_ciszy: {
    npcKey: "echo",
    tekst: () =>
      "Czuję, jakbyśmy przekraczali granicę czegoś nieznanego. Czy czujesz to samo?",
    options: [
      { tekst: "Czuję... Ciszę...", next: "akt3_skanowanie_pokladu" },
      { tekst: "Mrok...", next: "akt3_skanowanie_pokladu" },
    ],
  },

  akt3_skanowanie_pokladu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Skanowanie pokładu. Nie ma tu żadnych form życia. Wszystkie systemy są wyłączone, a załoga... zniknęła.",
    autoNextScene: "akt3_dec_podroz",
    autoNextDelay: 3000,
  },

  akt3_dec_podroz: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To niemożliwe, aby statek tak po prostu opuścić. Musimy odkryć, co się stało. Co chcesz zrobić?",
    options: [
      { tekst: "Kantyna. Załoga", next: "akt3_kantyna" },
      { tekst: "Mostek. Dzienniki pokładowe.", next: "akt3_mostek" },
    ],
  },

  akt3_kantyna: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Nie odbieram oznak życia, ale jak chcesz, możemy tam zajrzeć.",
    autoNextScene: "akt3_puste_sciany",
    autoNextDelay: 3000,
  },

  akt3_puste_sciany: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jak mówiłam. Nic tutaj nie ma. Puste, martwe ściany. Idziemy na mostek.",
    autoNextScene: "akt3_mostek",
    autoNextDelay: 3000,
  },

  akt3_mostek: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wchodzisz na mostek. Jak tutaj spokojnie. Podłączę się do interfejsu statku. Zobaczę, co się uda wyciągnąć.",
    autoNextScene: "akt3_dzienniki_pokladowe",
    autoNextDelay: 3000,
  },

  akt3_dzienniki_pokladowe: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Znalazłam dzienniki pokładowe. Ostatnie wpisy są przerażające. Mówią o tajemniczym sygnale, który doprowadził do ... szaleństwa całej załogi. [Koło, Kwadrat, Krzyż] [Północ, Wschód, Południe]",
    options: [
      { tekst: "Jaki sygnał?", next: "akt3_skanowanie_sygnalu" },
      { tekst: "Czeka nas to samo?", next: "akt3_skanowanie_sygnalu" },
    ],
  },

  akt3_skanowanie_sygnalu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Sygnały mogą wpływać na umysł w sposób, którego nie rozumiemy. Musimy to zbadać, ale ostrożnie.",
    options: [
      { tekst: "Zlokalizuj sygnał.", next: "akt3_zlokalizowanie" },
      { tekst: "Chyba pora się zabierać.", next: "akt3_zlokalizowanie" },
    ],
  },

  akt3_zlokalizowanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Lokalizowanie sygnału... Jest bardzo słaby, ale zdaje się pochodzić z głębi statku. Musimy zejść niżej.",
    options: [
      { tekst: "Ruszajmy.", next: "akt3_rozwidlenie" },
      { tekst: "Mam obawy.", next: "akt3_rozwidlenie" },
    ],
  },

  akt3_rozwidlenie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Zbliżamy się do rozwidlenia. Musisz podjąć decyzję, którą drogą chcesz iść.",
    autoNextScene: "akt3_droga_wybor",
    autoNextDelay: 3000,
  },

  akt3_droga_wybor: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Droga w lewo prowadzi w stronę pomieszczeń technicznych. Czuję zakłócenia w systemach. Uważaj.",
    options: [
      { tekst: "W lewo.", next: "akt3_ryzyko_wlewo1" },
      { tekst: "Zaryzykuję w prawo.", next: "akt3_ryzyko_wprawo" },
    ],
  },

  // ? Dialogi dla odpowiedzi : Zaryzykuję w prawo.
  akt3_ryzyko_wprawo: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen121315_${plec}`]
      : translations.akt3_scen121315,
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo2",
  },

  akt3_ryzyko_wprawo2: {
    npcKey: "echo",
    tekst: () =>
      "Coś tutaj nie gra. Powietrze jest gęste i chłodne, jakbyśmy byli głęboko pod wodą. Czy też to czujesz?",
    options: [
      {
        tekst: "To tylko klimat statku. Kontynuujmy.",
        next: "akt3_ryzyko_wprawo2_smierc",
      },
      {
        tekst: "Tak, coś tu jest... nienaturalne.",
        next: "akt3_ryzyko_wprawo3",
      },
    ],
  },

  // ? W PRAWO ŚMIERĆ

  akt3_ryzyko_wprawo2_smierc: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Nie przemyśleliśmy tego. Zimno staje się przytłaczające, systemu podtrzymywania życia tego nie dźwigną...",

    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo2_smierc_deathscreen",
  },

  akt3_ryzyko_wprawo2_smierc_deathscreen: {
    npcKey: "flightControlCenter",
    tekst: () => "Giniesz...",
    deathScreen: "zimnoZabija",
  },

  // ? W PRAWO - KONTYNUACJA

  akt3_ryzyko_wprawo3: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wykrywam blokadę magnetyczną. Potrzebujemy specjalnego klucza do jej otwarcia.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo4",
  },

  akt3_ryzyko_wprawo4: {
    npcKey: "echo",
    tekst: () =>
      "To musi być zagadka. Czasami statki tego typu mają zabezpieczenia oparte na logice. Może znajdziemy odpowiedź, jeśli skupimy się na wcześniejszych informacjach.",
    options: [
      {
        tekst: "Przeoczyliśmy coś?",
        next: "akt3_ryzyko_wprawo5",
      },
      {
        tekst: "Może to coś prostego.",
        next: "akt3_ryzyko_wprawo5",
      },
    ],
  },

  akt3_ryzyko_wprawo5: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Znajdujesz panel z układem magnetycznym, który wymaga ustawienia trzech kluczy w odpowiedniej kolejności.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo6",
  },

  akt3_ryzyko_wprawo6: {
    npcKey: "echo",
    tekst: () =>
      "Ten mechanizm wygląda znajomo... To jakby układ nawigacyjny. Pamiętasz te wskazówki z dziennika pokładowego?",
    options: [
      {
        tekst: "Zachód, Wschód, Północ.",
        next: "kt3_ryzyko_wprawo7_smierc",
      },
      {
        tekst: "Północ, Wschód, Południe",
        next: "akt3_ryzyko_wprawo8",
      },
    ],
  },

  // ? W PRAWO ŚMIERĆ 2

  akt3_ryzyko_wprawo7_smierc: {
    npcKey: "echo",
    tekst: () =>
      "Nie przemyśleliśmy tego. Zimno staje się przytłaczające, systemu podtrzymywania życia tego nie dźwigną...",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo7_smierc_Death",
  },

  // ! Zrobić ekran śmierci "ZAMARZASZ NA MIEJSCU"
  akt3_ryzyko_wprawo7_smierc_Death: {
    npcKey: "echo",
    tekst: () => "Giniesz...",
    deathScreen: "zimnoZabija",
  },

  // ? KONIEC ŚMIERCI LECIMY DALEJ

  akt3_ryzyko_wprawo8: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Dobrze, mechanizm zaakceptował układ. Blokada się otwiera, droga jest wolna. Ale uważaj, to miejsce jest coraz bardziej niestabilne.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wprawo9",
  },

  akt3_ryzyko_wprawo9: {
    npcKey: "echo",
    tekst: () =>
      "Czy czujesz, jak energia w tym miejscu staje się coraz bardziej chaotyczna? To, co tu się dzieje, nie jest naturalne. Musimy być ostrożni.",
    options: [
      {
        tekst: "Musimy to rozwiązać.",
        next: "akt3_ryzyko_wprawo10",
      },
      {
        tekst: "Powoli. Ruszajmy.",
        next: "akt3_ryzyko_wprawo10",
      },
    ],
  },

  akt3_ryzyko_wprawo10: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Zbliżamy się do źródła sygnału. To już niedaleko. Skanery wykrywają silne zakłócenia elektromagnetyczne, ale możemy kontynuować.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena0001",
  },

  // ? Dialogi dla odpowiedzi : W lewo.

  akt3_ryzyko_wlewo1: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Zbliżamy się do źródła sygnału. Znajdujemy się w korytarzu technicznym, ale coś jest nie tak. Atmosfera staje się ciężka.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wlewo2",
  },

  akt3_ryzyko_wlewo2: {
    npcKey: "echo",
    tekst: () =>
      "Czujesz to? Powietrze tutaj jest nienaturalnie gęste... jakby coś chciało nas zatrzymać.",
    options: [
      {
        tekst: "Może powinniśmy zawrócić?",
        next: "akt3_ryzyko_wlewo5_smierc",
      },
      {
        tekst: "Tak, czuję to. Musimy iść dalej.",
        next: "akt3_ryzyko_wlewo3",
      },
    ],
  },

  akt3_ryzyko_wlewo2_smierc: {
    npcKey: "echo",
    tekst: () =>
      "Czujesz to? Powietrze tutaj jest nienaturalnie gęste... jakby coś chciało nas zatrzymać.",
    options: [
      {
        tekst: "Może powinniśmy zawrócić?",
        next: "akt3_ryzyko_wlewo3",
      },
      {
        tekst: "Tak, czuję to. Musimy iść dalej.",
        next: "akt3_ryzyko_wlewo3",
      },
    ],
  },

  akt3_ryzyko_wlewo2_smierc_death: {
    npcKey: "echo",
    tekst: () =>
      "Czujesz to? Powietrze tutaj jest nienaturalnie gęste... jakby coś chciało nas zatrzymać.",
    deathScreen: "zatrucieGazem",
  },

  akt3_ryzyko_wlewo3: {
    npcKey: "flightControlCenter",
    tekst: plec
      ? translations[`akt3_scen121316_${plec}`]
      : translations.akt3_scen121316,
    options: [
      {
        tekst: "Figury geometryczne?",
        next: "akt3_ryzyko_wlewo4",
      },
      {
        tekst: "Znaki logiczne ...",
        next: "akt3_ryzyko_wlewo4",
      },
    ],
  },

  akt3_ryzyko_wlewo4: {
    npcKey: "echo",
    tekst: () =>
      "Widzieliśmy ten symbol wcześniej. To przypomina to, co czytaliśmy w dziennikach pokładowych. Jest to mechanizm zabezpieczający. Potrzebujemy kodu.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wlewo5",
  },

  akt3_ryzyko_wlewo5: {
    npcKey: "flightControlCenter",
    tekst: () => "Wprowadź sekwencję. Pamiętasz, co było w dzienniku?",
    options: [
      {
        tekst: "Koło, Trójkąt, Kwadrat.",
        next: "akt3_ryzyko_wlewo5_smierc",
      },
      {
        tekst: "Koło, Kwadrat, Krzyż.",
        next: "akt3_ryzyko_wlewo4",
      },
    ],
  },

  // ? ŚMIERĆ (W LEWO) 2 START
  akt3_ryzyko_wlewo5_smierc: {
    npcKey: "echo",
    tekst: () => "Ta mgła to jakiś gaz ... system podtrzymywania życia ...",
    autoNextDelay: 3000,
    autoNextScene: "akt3_ryzyko_wlewo5_smierc_death",
  },

  akt3_ryzyko_wlewo5_smierc_death: {
    npcKey: "echo",
    tekst: () => "Giniesz",
    deathScreen: "zatrucieGazem",
  },
  // ? ŚMIERĆ (W LEWO) 2 STOP

  akt3_ryzyko_wlewo6: {
    npcKey: "echo",
    tekst: () =>
      "Sekwencja zaakceptowana. Mechanizm się otwiera, a my jesteśmy coraz bliżej źródła sygnału.",
    autoNextDelay: 3000,
    autoNextScene: "akt3_scena0001",
    // ! KONIEC dialogów dla DROGI W LEWO.
  },

  akt3_scena0001: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Coś tu jest. Czuję to. To nie jest zwykły statek. Coś bardziej niepokojącego dzieje się wokół nas",
    options: [
      {
        tekst: "Musimy sprawdzić źródło sygnału.",
        next: "akt3_centralna_komora",
      },
      {
        tekst: "To miejsce wydaje się... martwe.",
        next: "akt3_centralna_komora",
      },
    ],
  },

  akt3_centralna_komora: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Centralna komora jest przed nami. Zablokowana, ale mogę ją otworzyć ręcznie. Otwieram... uważaj.",
    autoNextScene: "akt3_spotkanie_harunkal",
    autoNextDelay: 3000,
  },

  akt3_spotkanie_harunkal: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Nie powinniście tu być. To miejsce było zamknięte... by chronić was przed tym, co tu jest.",
    autoNextScene: "akt3_zrodlo_sygnalu",
    autoNextDelay: 3000,
  },

  akt3_zrodlo_sygnalu: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To on. Znaleźliśmy źródło sygnału. Kim jesteś? Dlaczego nas ostrzegasz?",
    autoNextScene: "akt3_wiezien_mocy",
    autoNextDelay: 3000,
  },

  akt3_wiezien_mocy: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Jestem więźniem tego miejsca. Nie kontroluję się... To, co tu jest, nie może być uwolnione.",
    options: [
      {
        tekst: plec
          ? translations[`akt3_scen121317_${plec}`]
          : translations.akt3_scen121317,
        next: "akt3_sygnal_ostrzezenie",
      },
      {
        tekst: plec
          ? translations[`akt3_scen121318_${plec}`]
          : translations.akt3_scen121318,
        next: "akt3_sygnal_ostrzezenie",
      },
    ],
  },

  akt3_sygnal_ostrzezenie: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Sygnał... miał być ostrzeżeniem. Moja natura jest poza moją kontrolą. Jeśli mnie uwolnisz, możesz wywołać coś, czego nie jesteś w stanie zrozumieć.",
    autoNextScene: "akt3_statek_reaguje",
    autoNextDelay: 3000,
  },

  akt3_statek_reaguje: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jego energia jest niestabilna. Systemy statku zaczynają reagować na jego obecność. Musimy zdecydować, co dalej.",
    autoNextScene: "akt3_energia_nieznana",
    autoNextDelay: 3000,
  },

  akt3_energia_nieznana: {
    npcKey: "echo",
    tekst: () =>
      "On mówi, że nie kontroluje swoich mocy. Ale musimy dowiedzieć się więcej. Coś jest tu nie tak.",
    options: [
      { tekst: "Jaka natura? Co się tu dzieje?", next: "akt3_wymiary" },
      { tekst: "Czy możemy ci pomóc?", next: "akt3_wymiary" },
    ],
  },

  akt3_wymiary: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Nie wiem, czy jest jakikolwiek sposób, by to zatrzymać. Moja rasa... badała wymiary. Statki, które wysyłaliśmy, wracały z czymś więcej niż tylko informacjami. Teraz nie mogę tego zatrzymać.",
    autoNextScene: "akt3_statek_anomalie",
    autoNextDelay: 3000,
  },

  akt3_statek_anomalie: {
    npcKey: "flightControlCenter",
    tekst: () => "Statki... wracały z czymś więcej? Jakie było ich zadanie?",
    autoNextScene: "akt3_misja_wymiary",
    autoNextDelay: 3000,
  },

  akt3_misja_wymiary: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Naszym celem było zgłębianie innych rzeczywistości, ale nie byliśmy przygotowani na to, co zaczęliśmy zbierać. Statki wracały z anomaliami, które zmieniały rzeczywistość.",
    autoNextScene: "akt3_anomalie_zagrozenie",
    autoNextDelay: 3000,
  },

  akt3_anomalie_zagrozenie: {
    npcKey: "echo",
    tekst: () =>
      "Anomalie? Jakie zagrożenie one stanowią? Dlaczego te statki wracały?",
    options: [
      { tekst: "Było więcej baz?", next: "akt3_bazy" },
      { tekst: "Dlaczego nie przerwaliście misji?", next: "akt3_bazy" },
    ],
  },

  akt3_bazy: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Nie mogliśmy przerwać cyklu. Bazy, które zbudowaliśmy, były rozproszone po wszechświecie. Jedną z kluczowych jest baza na waszym Księżycu.",
    autoNextScene: "akt3_znajoma_baza",
    autoNextDelay: 3000,
  },

  akt3_znajoma_baza: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To brzmi znajomo. Statki, którymi podróżowaliśmy z Księżyca, mogą być częścią tego samego cyklu. To by wyjaśniało wiele.",
    autoNextScene: "akt3_ksiezyc_wyjasnienie",
    autoNextDelay: 3000,
  },

  akt3_ksiezyc_wyjasnienie: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Księżyc... to tylko jeden z węzłów. Statki wracają tam z misji w innych wymiarach. Każdy powrót może przynieść coś nieprzewidywalnego.",
    autoNextScene: "akt3_statek_tajemnica",
    autoNextDelay: 3000,
  },

  akt3_statek_tajemnica: {
    npcKey: "echo",
    tekst: () =>
      "To dlatego statki, którymi teraz lecimy, są tak dziwne. Wracają z czymś, czego nie możemy kontrolować. Co teraz?",
    options: [
      { tekst: "Musimy dowiedzieć się więcej.", next: "akt3_wiecej_info" },
      { tekst: "Musimy się wydostać.", next: "akt3_wiecej_info" },
    ],
  },

  akt3_wiecej_info: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Statki, którymi teraz podróżujemy, mogą być częścią tego cyklu. Jeśli to prawda, nie tylko my jesteśmy zagrożeni – to może wpłynąć na cały świat.",
    autoNextScene: "akt3_ksiezyc_zagrozenie",
    autoNextDelay: 3000,
  },

  akt3_ksiezyc_zagrozenie: {
    npcKey: "echo",
    tekst: () =>
      "Czy baza na Księżycu to miejsce, gdzie wracają wszystkie statki? Jakie zagrożenie one przenoszą?",
    options: [
      { tekst: "Możemy to zatrzymać?", next: "akt3_kontrola_statkow" },
      {
        tekst: "Czy te statki są poza kontrolą?",
        next: "akt3_kontrola_statkow",
      },
    ],
  },

  akt3_kontrola_statkow: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Nie wiem, jak można to zatrzymać. Statki są częścią cyklu, który działa niezależnie od naszej woli. Ale wiem jedno – każdy powrót przynosi coś, co może zmienić waszą rzeczywistość.",
    autoNextScene: "akt3_statek_rozpad",
    autoNextDelay: 3000,
  },

  akt3_statek_rozpad: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Musimy działać szybko. Systemy tego statku zaczynają się rozpadać. Obcy mówi, że jego moce mogą nas zniszczyć, ale jeśli go zostawimy...",
    autoNextScene: "akt3_harunkal_cykl",
    autoNextDelay: 3000,
  },

  akt3_harunkal_cykl: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Nie mogę kontrolować tego, co się dzieje. Ale jeśli mnie tu zostawisz, cykl będzie trwał. Statki będą wracać, a to, co przyniosą, będzie katastrofalne.",
    options: [
      { tekst: "Pomóżmy mu się stąd wydostać.", next: "akt3_pomoc_harunkal" },
      { tekst: "To zbyt ryzykowne.", next: "akt3_odmowa_harunkal" },
    ],
  },

  akt3_pomoc_harunkal: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jeśli mu pomożemy, może nam pomóc zrozumieć, co dzieje się z bazą księżycową i statkami. Ale ryzykujemy nieprzewidywalne konsekwencje.",
    autoNextScene: "akt3_decyzja_harunkal",
    autoNextDelay: 3000,
  },

  akt3_odmowa_harunkal: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To ogromne ryzyko. Jego moce są nieprzewidywalne. Jeśli go uwolnimy, możemy nie mieć kontroli nad tym, co się stanie.",
    autoNextScene: "akt3_decyzja_harunkal",
    autoNextDelay: 3000,
  },

  akt3_decyzja_harunkal: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "To Twoja decyzja. Jeśli mnie zostawisz, może być za późno. Jeśli spróbujesz mi pomóc, razem możemy wydostać się z tego statku i zrozumieć, co nadchodzi.",
    autoNextScene: "akt3_statek_awaria",
    autoNextDelay: 3000,
  },

  akt3_statek_awaria: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Systemy statku zaczynają się rozpadać. Jeśli mamy pomóc obcemu, musimy to zrobić teraz.",
    autoNextScene: "akt3_echo_ryzyko",
    autoNextDelay: 3000,
  },

  akt3_echo_ryzyko: {
    npcKey: "echo",
    tekst: () =>
      "Jeśli zaryzykujemy i pomożemy mu, możemy odkryć prawdę o statkach. Ale jeśli coś pójdzie nie tak, możemy stracić wszystko.",
    options: [
      { tekst: "Pomogę Ci.", next: "akt3_pomoc_statek" },
      { tekst: "Na mnie nie licz.", next: "akt3_deathscreen_explosion" },
    ],
  },

  akt3_deathscreen_explosion: {
    npcKey: "flightControlCenter",
    deathScreen: "explosionDeathScreen",
    tekst: () => "Statek się rozpada ...",
  },

  akt3_pomoc_statek: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Nie wiem, czy to się uda, ale musimy spróbować. Musimy wydostać się stąd, zanim ten statek się rozpadnie.",
    autoNextScene: "akt3_gotowosc_ucieczka",
    autoNextDelay: 3000,
  },

  akt3_gotowosc_ucieczka: {
    npcKey: "kosmita_harunkal",
    tekst: plec
      ? translations[`akt3_scen121319_${plec}`]
      : translations.akt3_scen121319,
    options: [
      { tekst: "Znajdźmy drogę wyjścia.", next: "akt3_sekcja_techniczna" },
      { tekst: "Musimy być ostrożni.", next: "akt3_sekcja_techniczna" },
    ],
  },

  akt3_sekcja_techniczna: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Ścieżki w tym statku są złożone. Może znajdziemy alternatywną drogę przez sekcję techniczną.",
    autoNextScene: "akt3_przestroga_harunkal",
    autoNextDelay: 3000,
  },

  akt3_przestroga_harunkal: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Ten statek... był więzieniem. Są tu miejsca, splątane z innymi miejscami w innych czasach i rzeczywistościach. Musimy unikać stref zamkniętych...",
    options: [
      { tekst: "Unikajmy tych stref.", next: "akt3_sekcja_techniczna_ryzyko" },
      {
        tekst: "Zaryzykujmy ale ostrożnie.",
        next: "akt3_sekcja_techniczna_ryzyko",
      },
    ],
  },

  akt3_sekcja_techniczna_ryzyko: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Zlokalizowałem sekcję techniczną. To najkrótsza droga, ale jej systemy mogą być niestabilne. Przejście przez nią będzie ryzykowne.",
    autoNextScene: "akt3_obecnosc_statek",
    autoNextDelay: 3000,
  },

  akt3_obecnosc_statek: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Sekcja techniczna zaczyna tracić zasilanie. Część systemów jest wyłączona, ale wykrywam ruch... coś tu jest.",
    options: [
      { tekst: "Musimy to sprawdzić. Gotowy?", next: "akt3_systemy_obronne" },
      { tekst: "Lepiej się ukryjmy.", next: "akt3_systemy_obronne" },
    ],
  },

  akt3_systemy_obronne: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "To wygląda jak systemy obronne statku. Próbują zapobiec ucieczce.",
    autoNextScene: "akt3_harunkal_zaklocenie",
    autoNextDelay: 3000,
  },

  akt3_harunkal_zaklocenie: {
    npcKey: "kosmita_harunkal",
    tekst: () => "...mogę spróbować je zakłócić, zanim się zbliżymy.",
    autoNextScene: "akt3_zaklocenie_ryzyko",
    autoNextDelay: 3000,
  },

  akt3_zaklocenie_ryzyko: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Zakłócenie systemów może destabilizować statek. To ryzyko, ale może nam dać szansę na przejście.",
    options: [
      { tekst: "Spróbuj zakłócić systemy.", next: "akt3_zaklocenie_podjete" },
      { tekst: "Nie, zróbmy to po cichu.", next: "akt3_zaklocenie_spoznione" },
    ],
  },

  akt3_zaklocenie_podjete: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Dobrze, spróbuję zakłócić system. To może nas przepuścić, ale nie wiem, jakie będą konsekwencje.",
    autoNextScene: "akt3_statek_destabilizacja",
    autoNextDelay: 3000,
  },

  akt3_zaklocenie_spoznione: {
    npcKey: "kosmita_harunkal",
    tekst: () => "... za późno ... zaczynam zakłócanie",
    autoNextScene: "akt3_statek_destabilizacja",
    autoNextDelay: 3000,
  },

  akt3_statek_destabilizacja: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Systemy zaczynają się destabilizować. Statek wpada w wibracje. Musimy się pośpieszyć.",
    autoNextScene: "akt3_harunkal_traci_panowanie",
    autoNextDelay: 3000,
  },

  akt3_harunkal_traci_panowanie: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Możemy się pośpieszyć. Zaczyna mną rzucać i tracę panowanie...",
    options: [
      { tekst: "Szybciej, musimy uciekać!", next: "akt3_sektor_zawalenie" },
      { tekst: "Nie poddawaj się.", next: "akt3_sektor_zawalenie" },
    ],
  },

  akt3_sektor_zawalenie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Mamy kilka sekund, zanim ten sektor się zawali. Możemy przejść, ale musimy biec.",
    autoNextScene: "akt3_tunel_decyzja",
    autoNextDelay: 3000,
  },

  akt3_tunel_decyzja: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Ścieżka na prawo, prowadzi prosto do wyjścia. To nasza jedyna szansa...",
    options: [
      { tekst: "Biegnijmy tam!", next: "akt3_tunel_przejscie" },
      { tekst: "Ħarûn'kal, trzymaj się!", next: "akt3_tunel_przejscie" },
    ],
  },

  akt3_tunel_przejscie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Sekcja przed nami się zawaliła, ale wykrywam inny wąski tunel po lewej stronie.",
    autoNextScene: "akt3_tunel_wybor",
    autoNextDelay: 3000,
  },

  akt3_tunel_wybor: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Ten tunel... może być naszą jedyną drogą. Ale nie wiem, jak długo dam radę to kontrolować.",
    options: [
      { tekst: "Spróbujmy, to jedyna opcja.", next: "akt3_tunel_wyjscie" },
      {
        tekst: "Jeśli jest zbyt niebezpiecznie...",
        next: "akt3_tunel_wyjscie",
      },
    ],
  },

  akt3_tunel_wyjscie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Tunel jest wąski, ale wygląda na stabilny. Jeśli to nasza jedyna szansa, musimy spróbować.",
    autoNextScene: "akt3_sekcja_zewnetrzna",
    autoNextDelay: 3000,
  },

  akt3_sekcja_zewnetrzna: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Prowadzi do zewnętrznej sekcji statku. Z tej strony możemy dostać się na mostek i stamtąd próbować wrócić do twojego statku.",
    autoNextScene: "akt3_mostek_plan",
    autoNextDelay: 3000,
  },

  akt3_mostek_plan: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Jeśli dostaniemy się na mostek, może uda mi się otworzyć wyjście.",
    options: [
      { tekst: "Dobrze, idźmy na mostek.", next: "akt3_systemy_obronne2" },
      { tekst: "Zróbmy to, ale bądź ostrożny.", next: "akt3_systemy_obronne2" },
    ],
  },

  akt3_systemy_obronne2: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Wykrywam ruch w pobliżu mostka. Systemy obronne statku nadal działają. Będziemy musieli je ominąć.",
    autoNextScene: "akt3_harunkal_eksplozja",
    checkpoint: true,
    autoNextDelay: 3000,
  },

  akt3_harunkal_eksplozja: {
    npcKey: "kosmita_harunkal",
    tekst: () => "Mogę spróbować wywołać eksplozję...",
    options: [
      { tekst: "Wysadzaj!", next: "akt3_wysadzanie" },
      { tekst: "Omijamy.", next: "akt3_obrona_smierc" },
    ],
  },

  akt3_obrona_smierc: {
    npcKey: "flightControlCenter",
    tekst: () => "Nie będzie łatwo ominąć systemy obronne statku...",
    autoNextScene: "akt3_smierc_systemy",
    autoNextDelay: 3000,
  },

  akt3_smierc_systemy: {
    npcKey: "flightControlCenter",
    tekst: () => "Statek skupia się na nas...",
    deathScreen: "explosionDeathScreen",
  },

  akt3_wysadzanie: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Ryzyko jest duże. Systemy obronne mogą zareagować na nasz ruch. Musimy być szybcy.",
    autoNextScene: "akt3_eksplozja_inicjacja",
    autoNextDelay: 3000,
  },

  akt3_eksplozja_inicjacja: {
    npcKey: "kosmita_harunkal",
    tekst: () => "Wysadzam!",
    autoNextScene: "akt_eksplozja_oczekiwanie",
    autoNextDelay: 3000,
  },

  akt_eksplozja_oczekiwanie: {
    npcKey: "flightControlCenter",
    tekst: () => "BOOOM!",
    notifyTime: 5,
    notifyScreenName: "boom",
    autoNextScene: "akt3_dotarcie_mostek",
    autoNextDelay: 3000,
  },

  akt3_dotarcie_mostek: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Dotarliśmy do mostka. Musimy szybko otworzyć wyjście, zanim statek się rozpadnie.",
    autoNextScene: "akt3_otwieranie_wyjscia",
    autoNextDelay: 3000,
  },

  akt3_otwieranie_wyjscia: {
    npcKey: "kosmita_harunkal",
    tekst: () => "Otwieram wyjście.",
    autoNextScene: "akt3_powrot_na_statek",
    autoNextDelay: 3000,
  },

  akt3_powrot_na_statek: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Droga do twojego statku jest wolna. Ħarûn'kal ledwo się trzyma, ale mamy szansę na powrót. Musimy się pośpieszyć.",
    autoNextScene: "akt3_statek_stabilny",
    autoNextDelay: 3000,
  },

  akt3_statek_stabilny: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jesteśmy z powrotem na statku. Wszystkie systemy działają stabilnie. Ħarûn'kal wygląda na wyczerpanego, ale stabilnego.",
    autoNextScene: "akt3_decyzja_misji",
    autoNextDelay: 3000,
  },

  akt3_decyzja_misji: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Mamy dwie opcje: możemy wrócić do korporacji z Ħarûn'kal i otrzymać ogromną nagrodę. Albo... możemy spróbować znaleźć sposób na zatrzymanie cyklu w bazie księżycowej.",
    options: [
      { tekst: "Co oferuje korporacja?", next: "akt3_korporacja_nagroda" },
      { tekst: "Czy powinniśmy mu uwierzyć?", next: "akt3_korporacja_nagroda" },
    ],
  },

  akt3_korporacja_nagroda: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Jeśli oddasz Ħarûn'kal korporacji, zyskasz sławę i majątek. Korporacja ma technologię, aby zrozumieć jego ... naturę. Ale... są też ryzyka.",
    autoNextScene: "akt3_harunkal_przestroga",
    autoNextDelay: 3000,
  },

  akt3_harunkal_przestroga: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Jeśli mnie oddasz, będą próbować mnie kontrolować. Ale to, co nadchodzi, jest większe niż oni mogą pojąć. Cykl się nie zatrzyma, a to, co wraca, zniszczy wasz świat.",
    options: [
      {
        tekst: "Dlaczego cykl jest taki groźny?",
        next: "akt3_cykl_zagrozenie",
      },
      { tekst: "Co korporacja z tobą zrobi?", next: "akt3_cykl_zagrozenie" },
    ],
  },

  akt3_cykl_zagrozenie: {
    npcKey: "kosmita_harunkal",
    tekst: () =>
      "Korporacja nie rozumie tego, czym naprawdę są te statki. Będą myśleć, że to tylko technologia do zdobycia. Ale każda misja przynosi coś, czego nie można kontrolować. Nie zrozumieją, dopóki nie będzie za późno.",
    autoNextScene: "akt3_korporacja_oferta",
    autoNextDelay: 3000,
  },

  akt3_korporacja_oferta: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Korporacja zapłaci ci miliony za odkrycie. Mogą próbować kontrolować Ħarûn'kal, ale to cię ustawi na całe życie. Pamiętaj, to może być twoja jedyna szansa.",
    autoNextScene: "akt3_korporacja_ostateczna_decyzja",
    autoNextDelay: 3000,
  },

  akt3_korporacja_ostateczna_decyzja: {
    npcKey: "flightControlCenter",
    tekst: () =>
      "Odbieram wiadomość od korporacji. Są gotowi zainwestować miliony w twój powrót. Oczekują odpowiedzi.",
    options: [
      {
        tekst: "Oddaj obcego w ręce korporacji.",
        next: "akt3_korporacja_wybor",
      },
      {
        tekst: "Połącz siły, aby zatrzymać cykl.",
        next: "akt3_korporacja_wybor",
      },
    ],
  },

  akt3_korporacja_wybor: {
    npcKey: "flightControlCenter",
    tekst: () => "Decyzja zapadła, ciąg dalszy historii już wkrótce ...",
  },
});
