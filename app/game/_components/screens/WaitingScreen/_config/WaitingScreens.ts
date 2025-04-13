/*

  Plik konfiguracyjny WaitingScreens.
  Aby dodać kolejny ekran wystarczy użyć postawowej konifguracji default.
  Pamiętaj o zmianie nazewnictwa oraz o poprawnym ustawieniu danych tj. titleKey, subtitleKey oraz background.

  * Do kopiowania

  zmien_nazwe: {
    titleKey: "zmien_nazwe",
    subtitleKey: "zmien_nazwe",
    background: require("ustaw odpowiednia sciezke"),
  },

*/

export const waitingScreens = {
  hibernacja_w_toku: {
    titleKey: "hibernacjaTitle",
    subtitleKey: "hibernacjaSubtitle",
    background: require("@/assets/images/hibernacja.png"),
  },
  odpoczynek: {
    titleKey: "odpoczynekTitle",
    subtitleKey: "odpoczynekSubtitle",
    background: require("@/assets/images/bg_ufo.png"),
  },
  rekrutacja_oficer: {
    titleKey: "rekrutacjaTitle",
    subtitleKey: "rekrutacjaSubtitle",
    background: require("@/assets/images/rekrutacja_oficer_tlo.png"),
  },
  sygnal: {
    titleKey: "sygnalTitle",
    subtitleKey: "sygnalSubtitle",
    background: require("@/assets/images/bg_ufo.png"),
  },
  powrot_na_statek: {
    titleKey: "powrotTitle",
    subtitleKey: "powrotSubtitle",
    background: require("@/assets/images/end_of_act_bg.png"),
  },
  wspinaczka_w_toku: {
    titleKey: "wspinaczkaTitle",
    subtitleKey: "wspinaczkaSubtitle",
    background: require("@/assets/images/wspinaczka_ekran.png"),
  },
  przeprawa_w_toku: {
    titleKey: "przeprawaTitle",
    subtitleKey: "przeprawaSubtitle",
    background: require("@/assets/images/przeprawa_ekran.png"),
  },
  boom: {
    titleKey: "boomTitle",
    subtitleKey: "boomSubtitle",
    background: require("@/assets/images/boom.png"),
  },
  kosmita_oczekiwanie: {
    titleKey: "kosmitaTitle",
    subtitleKey: "kosmitaSubtitle",
    background: require("@/assets/images/kosmita_oczekiwanie.png"),
  },
  krysztal_analiza: {
    titleKey: "krysztalTitle",
    subtitleKey: "krysztalSubtitle",
    background: require("@/assets/images/krysztal_obraz.png"),
  },
  statek_odlatuje: {
    titleKey: "statekOdlatujeTitle",
    subtitleKey: "statekOdlatujeSubtitle",
    background: require("@/assets/images/statek-odlatuje.png"),
  },
};
