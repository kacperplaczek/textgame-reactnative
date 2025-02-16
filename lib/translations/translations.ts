export const translations = {
    pl: {
        officerTitle: 'OFICER REKRUTACYJNY',
        dzwoniOfficer: 'Dzwoni officer rekrutujący...',
        odbierzPolaczenie: 'Odbierz połączenie',
        connecting: 'Łączenie z oficerem rekrutującym...',
        welcome: 'Kolejny... Witamy w centrum rekrutacji! Jak się do Ciebie zwracać?',
        pan: 'Pan...',
        pani: 'Pani...',
        dalej: 'Kontynuujemy proces rekrutacji...',
    },
    en: {
        officerTitle: 'RECRUITMENT OFFICER',
        dzwoniOfficer: 'Incoming call from recruitment officer...',
        odbierzPolaczenie: 'Answer the call',
        connecting: 'Connecting to recruitment officer...',
        welcome: 'Next... Welcome to the recruitment center! How should we address you?',
        pan: 'Mr...',
        pani: 'Ms...',
        dalej: 'Continuing recruitment process...',
    },
};

export type Language = keyof typeof translations;
