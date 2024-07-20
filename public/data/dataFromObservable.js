/*
transformData = (data) =>
  data.reduce((acc, d) => [...acc, [d.party, d.p, d.v, d.c, d.top, d.perc]], [])
*/

data = {
  TW: [
    {
      date: "2024-01-13",
      data: taiwanPresidentialData,
      turnout: 71.86,
      description: "Taiwanese presidential election",
      options: { percentage: true },
    },
    {
      date: "2024-01-13",
      data: taiwanLegislativeData,
      turnout: 71.28,
      description: "Taiwanese legislative Yuan elections",
      options: { majority: true, majorityText: "57 seats needed" },
    },
  ],
  BD: [
    {
      date: "2024-01-07",
      data: bangladeshResult,
      description: "Bangladeshi general election",
      turnout: 41.8,
      options: {
        majority: true,
      },
    },
  ],
  SX: [
    {
      date: "2024-01-11",
      description: "Sint Maarten general election",
      data: transformData([
        {
          p: "National Alliance",
          v: 4,
          perc: 23.92,
          c: "#262262",
        },
        {
          p: "United People's Party",
          v: 3,
          perc: 19.48,
          c: "#94D60A",
        },
        {
          p: "Unified Resilient St. Maarten Movement",
          v: 2,
          perc: 14.04,
          c: "#00576d",
        },
        {
          p: "Democratic Party",
          v: 2,
          perc: 13.64,
          c: "#e21c1a",
        },
        {
          p: "Party for Progress",
          v: 2,
          perc: 11.89,
          c: "#FFCA06",
        },
        {
          p: "Nation Opportunity Wealth",
          v: 2,
          perc: 10.25,
          c: "#ffed25",
        },
      ]),
      turnout: 65.51,
      options: {
        majority: true,
        majorityText: "8 seats needed",
        percentage: false,
        withZero: true,
        withPerc: true,
      },
    },
    {
      date: "2024-08-19",
      description: "Sint Maarten general election",
    },
  ],
  ID: [
    {
      date: "2024-02-14",
      description: "Indonesian general election",
      data: indonesiaFirstRoundResult,
      turnout: 82.39,
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
  ],
  PK: [
    {
      date: "2024-02-08",
      data: transformData(pakistanGeneralElection.filter((d) => d.v > 0)),
      turnout: 47.8,
      description: "Pakistani general election",
      options: {
        majority: true,
        majorityText: "169 seats",
        percentage: false,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
    {
      date: "2024-03-09",
      data: transformData(pakistanPresidentialElection),
      description: "Pakistani Presidential election",
      turnout: 85.06,
      summary:
        "The president of Pakistan is indirectly elected by the Electoral College of Pakistan – a joint sitting of the Senate, National Assembly and Provincial Assemblies.",
      options: {
        majority: true,
        majorityText: "50% + 1 vote",
        percentage: true,
      },
    },
    {
      date: "2024-04-03",
      description: "Pakistani Senate election",
      data: transformData([
        {
          p: "Pakistan People's Party",
          v: 24,
          c: "#000",
        },
        {
          p: "Pakistan Muslim League (Nawaz)",
          v: 19,
          c: "#228b22",
        },
        {
          p: "Pakistan Tehreek-e-Insaf",
          v: 17,
          c: "#E70A0A",
        },
      ]),
      options: {
        majority: true,
        majorityText: "49 seats",
        percentage: false,
      },
    },
  ],
  AZ: [
    {
      date: "2024-02-07",
      description: "Azerbaijani presidential election",
      data: azerbaijanPresidentialData,
      turnout: 76.68,
      notes:
        "With 54.5% of the votes reportedly counted, Ilham Aliyev was declared the winner of the election, securing over 92.1% of the vote",
      options: {
        majority: false,
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
    {
      date: "2024-09-01",
      description: "Azerbaijani parliamentary election",
    },
  ],
  SV: [
    {
      date: "2024-02-04",
      description: "Salvadoran general election",
      data: elSalvadorFirstRoundResult,

      turnout: 52.6,
      options: {
        majority: false,
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
  ],
  FI: [
    {
      date: "2024-01-29",
      description: "Finnish presidential election (first round)",
      data: finlandFirstRoundResult,
      turnout: 71.55,
      options: {
        majority: false,
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
    {
      date: "2024-02-11",
      description: "Finnish presidential election (second round)",
      data: finlandSecondRoundResult,
      turnout: 67.58,
      options: {
        // majority: true,
        // majorityText: "50% + 1 vote for a majority",
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
  ],
  KM: [
    {
      date: "2024-01-14",
      description: "Comorian presidential election",
      data: comorosPresidentialData,
      turnout: 56.44,
      options: { majority: false, percentage: true },
    },
  ],
  BT: [
    {
      date: "2024-01-09",
      data: bhutanAssemblyResult,
      turnout: 65.6,
      description: "2023–24 Bhutanese National Assembly election",
      options: { majority: true },
    },
  ],
  BY: [
    {
      date: "2024-02-25",
      description: "Belarusian parliamentary election",
      data: transformData(belarusSenateElections),
      turnout: 73.09,
      options: {
        majority: true,
        majorityText: "56 seats needed",
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
  ],
  IR: [
    {
      date: "2024-06-28",
      description: "Presidential election (first round)",
      turnout: 39.93,
      data: transformData([
        { p: "Masoud Pezeshkian", votes: 10415991, v: 44.36, c: "#DCDCDC" },
        { p: "Saeed Jalili", votes: 9473298, v: 40.35, c: "#9f8f8f" },
        {
          p: "Mohammad Bagher Ghalibaf",
          votes: 3383340,
          v: 14.41,
          c: "#186D34",
        },
        { p: "Mostafa Pourmohammadi", votes: 206397, v: 0.88, c: "#009900" },
      ]),
      options: {
        majority: false,
        percentage: true,
      },
    },
    {
      date: "2024-07-05",
      description: "Presidential election (second round)",
      turnout: 49.68,
      data: transformData([
        { p: "Masoud Pezeshkian", votes: 16384403, v: 54.76, c: "#DCDCDC" },
        { p: "Saeed Jalili", votes: 13538179, v: 45.24, c: "#9f8f8f" },
      ]),
      options: {
        majority: false,
        percentage: true,
      },
    },
  ],
  PT: [
    {
      date: "2024-03-10",
      description: "Portuguese legislative election",
      data: transformData(portugalLegislativeElections),
      turnout: 59.9,
      options: {
        majority: false,
        percentage: true,
      },
    },
  ],
  RU: [
    {
      date: "2024-03-17",
      description: "Russian presidential election",
      turnout: 77.49,
      data: transformData([
        {
          p: "Vladimir Putin",
          party: "Independent",
          v: 88.48,
          c: "#DCDCDC",
        },
        {
          p: "Nikolay Kharitonov",
          party: "Communist Party",
          v: 4.37,
          c: "#CC1111",
        },
        {
          p: "Vladislav Davankov",
          party: "New People",
          v: 3.9,
          c: "#0AD1C9",
        },
        {
          party: "Leonid Slutsky",
          p: "Liberal Democratic Party",
          v: 3.24,
          c: "#48C",
        },
      ]),
      options: {
        majority: false,
        percentage: true,
      },
    },
  ],
  SK: [
    {
      date: "2024-03-23",
      description: "Slovak presidential election (first round)",
      turnout: 51.9,
      data: transformData([
        {
          p: "Ivan Korčok",
          party: "Independent",
          v: 42.52,
          c: "#DCDCDC",
        },
        {
          p: "Peter Pellegrini",
          party: "Voice – Social Democracy",
          v: 37.03,
          c: "#7E1447",
        },
        {
          p: "Štefan Harabin",
          party: "Independent",
          v: 11.74,
          c: "#DCDCDC",
        },
        {
          p: "Krisztián Forró",
          party: "Hungarian Alliance",
          v: 2.91,
          c: "#ED8B19",
        },
        {
          p: "Igor Matovič",
          party: "Slovakia",
          v: 2.18,
          c: "#45515D",
          top: 1,
        },
        {
          p: "Ján Kubiš",
          party: "Independent",
          v: 2.04,
          c: "#DCDCDC",
        },
        {
          p: "Patrik Dubovský",
          party: "For the People",
          v: 0.71,
          c: "#fdbb12",
        },
        {
          p: "Marian Kotleba",
          party: "Kotlebists – People's Party Our Slovakia",
          v: 0.57,
          c: "#005222",
        },
        {
          p: "Milan Náhlik",
          party: "Independent",
          v: 0.14,
          c: "#DCDCDC",
        },
      ]),
      options: {
        majority: false,
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
    {
      date: "2024-04-06",
      description: "Slovak presidential election (second round)",
      turnout: 61.12,
      data: transformData([
        {
          p: "Ivan Korčok",
          party: "Independent",
          v: 46.88,
          c: "#DCDCDC",
        },
        {
          p: "Peter Pellegrini",
          party: "Voice – Social Democracy",
          v: 53.12,
          c: "#7E1447",
        },
      ]),
      options: {
        majority: true,
        percentage: true,
        majorityText: "50% + 1 vote",
      },
    },
  ],
  SN: [
    {
      date: "2024-03-24",
      description: "Senegalese presidential election",
      turnout: 61.3,
      data: transformData([
        {
          p: "Bassirou Diomaye Faye",
          party: "PASTEF",
          v: 54.28,
          c: "#9E1A16",
        },
        {
          p: "Amadou Ba",
          party: "Alliance for the Republic",
          v: 35.79,
          c: "#5C482F",
        },
        {
          p: "Aliou Mamadou Dia",
          party: "Party for Unity and Rally",
          v: 2.8,
          c: "#349a51",
        },
        {
          p: "Khalifa Sall",
          party: "Manko Taxawu Sénégal",
          v: 1.56,
          c: "#FF8040",
          top: true,
        },
        {
          p: "Other candidates",
          party: "< 1%",
          v: 5.57,
          c: "#333",
        },
      ]),
      options: {
        majority: true,
        percentage: true,
        majorityText: "50% + 1 vote",
      },
    },
  ],
  KH: [
    {
      date: "2024-02-25",
      description: "Cambodian Senate election",
      turnout: 99.86,
      data: transformData([
        {
          p: "Cambodian People's Party",
          v: 55,
          perc: 85.92,
          c: "#1E90FF",
        },
        {
          p: "Khmer Will Party",
          v: 3,
          perc: 11.92,
          c: "#EC3438",
        },
        {
          p: "Nation Power Party",
          v: 0,
          perc: 2,
          c: "#FD4A3C",
        },
        {
          p: "FUNCINPEC",
          v: 0,
          perc: 0.16,
          c: "#FDD017",
        },
      ]),
      options: {
        majority: true,
        majorityText: "31 seats needed",
        percentage: false,
        withZero: true,
        withPerc: true,
      },
    },
  ],
  // April
  KW: [
    {
      date: "2024-04-04",
      description: "Kuwaiti general election",
      turnout: 62.1,
      data: transformData([
        {
          c: "#FF7E03",
          p: "Islamic Salafi Alliance",
          votes: 17529,
          perc: 3.41,
          v: 3,
        },
        {
          c: "#0098F1",
          p: "Islamic Constitutional Movement",
          votes: 17267,
          perc: 3.36,
          v: 1,
        },
        {
          c: "#235643",
          p: "National Islamic Alliance (Taalof)",
          votes: 16320,
          perc: 3.18,
          v: 2,
        },
        {
          c: "#D39148",
          p: "Popular Action Bloc",
          votes: 15886,
          perc: 3.09,
          v: 2,
        },
        {
          c: "#0744DA",
          p: "Thawabit Al-Umma",
          votes: 15577,
          perc: 3.03,
          v: 2,
        },
        {
          c: "#ffd500",
          p: "Kuwait Democratic Forum",
          votes: 5041,
          perc: 0.98,
          v: 1,
        },
        {
          c: "#F5C779",
          p: "Justice and Peace Alliance",
          votes: 4415,
          perc: 0.86,
          v: 1,
        },
        {
          c: "#DCDCDC",
          p: "Independents",
          votes: 421494,
          perc: 82.08,
          v: 38,
        },
      ]),
      options: {
        majority: false,
        percentage: false,
        withPerc: true,
      },
    },
  ],
  MV: [
    {
      date: "2024-04-21",
      description: "Maldivian parliamentary election",
      turnout: 60.43,
      data: transformData([
        {
          p: "Independents",
          v: 11,
          perc: 13.87,
          c: "#DCDCDC",
        },
        {
          p: "Maldivian Democratic Party",
          v: 12,
          perc: 30.73,
          c: "#ffcc33",
        },
        {
          p: "Jumhooree Party",
          v: 1,
          perc: 1.49,
          c: "#DC143C",
        },
        {
          p: "People's National Congress",
          v: 66,
          perc: 48.06,
          c: "#24DBCB",
        },
        {
          p: "The Democrats",
          v: 0,
          perc: 2.2,
          c: "#89CFF0",
        },
        {
          p: "Maldives Development Alliance",
          v: 2,
          perc: 1.93,
          c: "#DB5702",
        },
        {
          p: "Adhaalath Party",
          v: 0,
          perc: 1.21,
          c: "#00A86A",
        },
        {
          p: "Maldives National Party",
          v: 1,
          perc: 0.5,
          c: "#1034a6",
        },
      ]),
      options: {
        majority: true,
        majorityText: "47 seats needed",
        percentage: false,
        withZero: true,
        withPerc: true,
      },
    },
  ],
  KR: [
    {
      date: "2024-04-10",
      description: "South Korean legislative election",
      turnout: 66.99,
      data: transformData([
        {
          p: "Democratic",
          v: 175,
          c: "#004EA2",
        },
        {
          p: "People Power",
          v: 108,
          c: "#E61E2B",
        },
        {
          p: "Rebuilding Korea",
          v: 12,
          c: "#0172cf",
        },
        {
          p: "New Reform",
          v: 3,
          c: "#FF7920",
        },
        {
          p: "New Future",
          v: 1,
          c: "#45BABD",
        },
        {
          p: "Progressive",
          v: 0,
          c: "#d6001c",
        },
      ]),
      options: {
        majority: true,
        majorityText: "151 seats needed",
        percentage: false,
        withZero: true,
      },
    },
  ],
  HR: [
    {
      date: "2024-04-17",
      description: "Croatian parliamentary election",
      turnout: 62.31,
      data: transformData([
        {
          p: "We can!",
          v: 10,
          c: "#C3D746",
        },
        {
          p: "Independent Democratic Serb Party",
          v: 3,
          c: "#2D3C8C",
        },
        {
          p: "Rivers of Justice",
          v: 42,
          c: "#ED1C24",
        },
        {
          p: "Our Croatia",
          v: 4,
          c: "#1C91BC",
        },
        {
          p: "Focus–Republic",
          v: 1,
          c: "#196CA4",
        },
        {
          p: "Democratic Union of Hungarians",
          v: 1,
          c: "#15803C",
        },
        {
          p: `Croatian Romani Union "Kali Sara"`,
          v: 1,
          c: "#FF0000",
        },
        {
          p: "Bošnjaci zajedno!",
          v: 1,
          c: "#F8F9FA",
        },
        {
          p: "Independents",
          v: 2,
          c: "#DCDCDC",
        },
        {
          p: "The Bridge–Croatian Sovereignists",
          v: 11,
          c: "#E85726",
        },
        {
          p: "Croatian Democratic Union coalition",
          v: 61,
          c: "#005BAA",
        },
        {
          p: "Homeland Movement coalition",
          v: 14,
          c: "#A5A5A5",
        },
      ]),
      options: {
        majority: true,
        majorityText: "76 seats needed",
        percentage: false,
        withZero: true,
        labelFilter: (d) => {
          return d.x > 1;
        },
      },
    },
    {
      date: "2024-12-15",
      description: "Croatian presidential election",
    },
  ],
  MK: [
    {
      date: "2024-04-24",
      description: "North Macedonian presidential election (first round)",
      turnout: 49.91,
      data: transformData([
        {
          p: "Stevo Pendarovski",
          party: "Social Democratic Union of Macedonia",
          v: 35.79,
          c: "#BF1E24",
        },
        {
          p: "Maksim Dimitrievski",
          party: "For Our Macedonia",
          v: 9.52,
          c: "#416DB4",
          // top: true
        },
        {
          p: "Bujar Osmani",
          party: "Democratic Union for Integration",
          v: 13.71,
          c: "#344b9b",
        },
        {
          p: "Arben Taravari",
          party: "Alliance for Albanians",
          v: 9.46,
          c: "#6D3D87",
        },
        {
          p: "Biljana Vankovska",
          party: "Independent",
          v: 4.69,
          c: "#DCDCDC",
        },
        {
          p: "Stevčo Jakimovski	Citizen",
          party: "Option for Macedonia",
          v: 0.92,
          c: "#21B7CE",
        },
        {
          p: "Gordana Siljanovska-Davkova",
          party: "VMRO-DPMNE",
          v: 41.21,
          c: "#FFA500",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 1;
        },
      },
    },
    {
      date: "2024-05-08",
      description: "North Macedonian presidential election (second round)",
      turnout: 47.47,
      data: transformData([
        {
          p: "Stevo Pendarovski",
          party: "Social Democratic Union of Macedonia",
          v: 30.99,
          c: "#BF1E24",
        },
        {
          p: "Gordana Siljanovska-Davkova",
          party: "VMRO-DPMNE",
          v: 69.01,
          c: "#FFA500",
        },
      ]),
      options: {
        majority: true,
        percentage: true,
        majorityText: "50% + 1 vote",
      },
    },
    {
      date: "2024-05-08",
      description: "North Macedonian parliamentary election",
      turnout: 55.44,
      data: transformData([
        {
          p: "The Left",
          v: 6,
          perc: 7.01,
          c: "#FF0000",
        },
        {
          p: "For Our Macedonia",
          v: 6,
          perc: 5.75,
          c: "#416DB4",
        },
        {
          p: "For a European Future",
          v: 18,
          perc: 15.8,
          c: "#BF1E24",
        },
        {
          p: "European Front",
          v: 19,
          perc: 14.05,
          c: "#053772",
        },
        {
          p: "VLEN Coalition",
          v: 13,
          perc: 10.94,
          c: "#A6011F",
        },
        {
          p: "Your Macedonia",
          v: 58,
          perc: 44.54,
          c: "#FFA500",
        },
      ]),
      options: {
        majority: true,
        majorityText: "61 seats needed",
        percentage: false,
        withZero: true,
        withPerc: true,
      },
    },
  ],
  PL: [
    {
      date: "2024-04-07",
      description: "Polish local elections",
      turnout: 51.94,
      data: transformData([
        {
          p: "The Left",
          v: 8,
          v: 6.32,
          c: "#AC145A",
        },
        {
          p: "Bezpartyjni Samorządowcy",
          v: 3,
          v: 3.01,
          c: "#E6001A",
        },
        {
          p: "National Polish Local Government Coalition",
          v: 1,
          v: 1.15,
          c: "#126AB4",
        },
        {
          p: "Civic Coalition",
          v: 210,
          v: 30.59,
          c: "#F68F2D",
        },
        {
          p: "Silesian Localists",
          v: 5,
          v: 0.37,
          c: "#0C2E51",
        },
        {
          p: "Third Way",
          v: 80,
          v: 14.25,
          c: "#3DB53A",
        },
        {
          p: "Law and Justice",
          v: 239,
          v: 34.27,
          c: "#263778",
        },
        {
          p: "Confederation and Nonpartisan Localists",
          v: 6,
          v: 7.23,
          c: "#122746",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
  ],
  SB: [
    {
      date: "2024-04-17",
      description: "Solomon Islands general election",
      data: transformData([
        {
          p: "Ownership, Unity and Responsibility Party",
          party: "Manasseh Sogavare",
          perc: 24.07,
          v: 15,
          c: "#F7EF07",
        },
        {
          p: "People First",
          party: "Jimmie Rodgers",
          perc: 3.19,
          v: 3,
          c: "#9000AD",
        },
        {
          p: "Kadere Party",
          party: "Martin Housanau",
          perc: 4.89,
          v: 1,
          c: "#FFBC03",
        },
        {
          p: "Independents",
          party: "–",
          perc: 21.88,
          v: 11,
          c: "#DCDCDC",
        },
        {
          p: "Solomon Islands Party for Rural Advancement",
          party: "Gordon Darcy Lilo",
          perc: 4.55,
          v: 1,
          c: "#9fdacc",
        },
        {
          p: "Solomon Islands United Party",
          party: "Peter Kenilorea Jr.",
          perc: 13.49,
          v: 6,
          c: "#0844d6",
        },
        {
          p: "Democratic Alliance",
          party: "Rick Houenipwela",
          perc: 1.59,
          v: 1,
          c: "#68C76D",
        },
        {
          p: "Solomon Islands Democratic Party",
          party: "Matthew Wale",
          perc: 19.31,
          v: 11,
          c: "#012887",
        },
        {
          p: "Umi for Change",
          party: "Daniel Suidani",
          perc: 3.0,
          v: 1,
          c: "#0FF643",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "76 seats needed",
        labelFilter: (d) => {
          return d.x >= 2;
        },
        withPerc: true,
      },
    },
  ],
  TG: [
    {
      date: "2024-04-29",
      description: "Togolese parliamentary election",
      turnout: 61.03,
      data: transformData([
        {
          p: "Alliance of Democrats for Integral Development",
          v: 2,
          c: "#11C925",
        },
        {
          p: "National Alliance for Change",
          v: 1,
          c: "#FF8201",
        },
        {
          p: "Dynamic for the Majority of the People",
          v: 1,
          c: "#E09F02",
        },
        {
          p: "Democratic Forces for the Republic",
          v: 1,
          c: "#792280",
        },
        {
          p: "Union for the Republic",
          v: 108,
          c: "#38a8e6",
        },
      ]),
      options: {
        majority: true,
        majorityText: "57 seats needed",
        percentage: false,
        withZero: true,
        // labelFilter: (d) => {
        //   return d.x > 1;
        // }
      },
    },
  ],
  // May
  TD: [
    {
      date: "2024-05-06",
      description: "Chadian presidential election",
      turnout: 75.78,
      data: transformData([
        {
          p: "Mahamat Déby",
          party: "Patriotic Salvation Movement",
          v: 61.03,
          c: "#3333CC",
        },
        {
          p: "Succès Masra",
          party: "Les Transformateurs",
          v: 18.53,
          c: "#0048D1",
        },
        {
          p: "Albert Pahimi",
          party: "Padacké	National Rally for Democracy in Chad",
          v: 16.91,
          c: "#055737",
        },
        {
          p: "Lydie Beassemda",
          party: "Party for Democracy and Full Independence",
          v: 0.96,
          c: "#45A790",
          // top: true
        },
        {
          p: "Other candidates",
          party: "< 1%",
          v: 2.57, // 0.76 + 0.55 + 0.45 + 0.36 + 0.24 + 0.21,
          c: "#333",
        },
      ]),
      options: {
        majority: true,
        percentage: true,
        labelFilter: (d) => {
          return d.x > 1;
        },
      },
    },
  ],
  MG: [
    {
      date: "2024-05-29",
      description: "Malagasy parliamentary election",
      turnout: 48,
      data: transformData([
        {
          p: "TGV",
          party: "Andry Rajoelina",
          v: 84,
          c: "#FFA500",
        },
        {
          p: "TIM",
          party: "Ravalomanana",
          v: 16,
          c: "#0441C0",
        },
        {
          p: "MA.TI.TA",
          v: 1,
          c: "#00A650",
        },
        {
          p: "MTS",
          v: 1,
          c: "#FE0000",
        },
        {
          p: "GYMP",
          v: 1,
          c: "#000000",
        },
        {
          p: "MDM",
          v: 1,
          c: "#439ECD",
        },
        {
          p: "RPSD Vaovao",
          v: 1,
          c: "#826ba3",
        },
        {
          p: "Independents",
          v: 46,
          c: "#DCDCDC",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "76 seats needed",
        labelFilter: (d) => {
          return d.x > 1;
        },
      },
    },
  ],
  ZA: [
    {
      date: "2024-05-29",
      description: "South African general election",
      turnout: 58.64,
      data: transformData([
        {
          p: "Economic Freedom Fighters",
          party: "Julius Malema",
          perc: 9.52,
          v: 39,
          c: "#852A2A",
        },
        {
          p: "PAC",
          party: "Mzwanele Nyhontso",
          perc: 0.23,
          v: 1,
          c: "#008718",
        },
        {
          p: "UAT",
          party: "Wonder Mahlatsi",
          perc: 0.22,
          v: 1,
          c: "#363362",
        },
        {
          p: "Al Jama-ah",
          party: "Ganief Hendricks",
          perc: 0.24,
          v: 2,
          c: "#1c9069",
        },
        {
          p: "uMkhonto weSizwe",
          party: "Jacob Zuma",
          perc: 14.58,
          v: 58,
          c: "#56AA48",
        },
        {
          p: "African National Congress",
          party: "Cyril Ramaphosa",
          perc: 40.18,
          v: 159,
          c: "#006600",
        },
        {
          p: "UDM",
          party: "Bantu Holomisa",
          perc: 0.49,
          v: 3,
          c: "#FFB300",
        },
        {
          p: "Good",
          party: "Patricia de Lille",
          perc: 0.18,
          v: 1,
          c: "#F36900",
        },
        {
          p: "BOSA",
          party: "Mmusi Maimane",
          perc: 0.41,
          v: 2,
          c: "#E7B04A",
        },
        {
          p: "RISE",
          party: "Songezo Zibi",
          perc: 0.42,
          v: 2,
          c: "#0336D8",
        },
        {
          p: "Democratic Alliance",
          party: "John Steenhuisen",
          perc: 21.81,
          v: 87,
          c: "#005BA6",
        },
        {
          p: "NCC",
          party: "Fadiel Adams",
          perc: 0.23,
          v: 2,
          c: "#161616",
        },
        {
          p: "ATM",
          party: "Vuyolwethu Zungula",
          perc: 0.4,
          v: 2,
          c: "#00ADEE",
        },
        {
          p: "ACDP",
          party: "Kenneth Meshoe",
          perc: 0.6,
          v: 3,
          c: "#ba0c2f",
        },
        {
          p: "ActionSA",
          party: "Herman Mashaba",
          perc: 1.2,
          v: 6,
          c: "#05B615",
        },
        {
          p: "IFP",
          party: "Velenkosini Hlabisa",
          perc: 3.85,
          v: 17,
          c: "#FF0000",
        },
        {
          p: "VF+",
          party: "Pieter Groenewald",
          perc: 1.36,
          v: 6,
          c: "#FF6600",
        },
        {
          p: "PA",
          party: "Gayton McKenzie",
          perc: 2.06,
          v: 9,
          c: "#388F35",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "201 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
        withPerc: true,
      },
    },
  ],
  DO: [
    {
      date: "2024-05-19",
      description: "Dominican Republic general election",
      turnout: 54.37,
      data: transformData([
        {
          p: "Luis Abinader",
          party: "Modern Revolutionary Party",
          v: 57.53,
          c: "#005BAA",
        },
        {
          p: "Leonel Fernández",
          party: "People's Force",
          v: 28.84,
          c: "#00AC5B",
        },
        {
          p: "Abel Martínez",
          party: "Dominican Liberation Party",
          v: 10.35,
          c: "#870B9C",
        },
        {
          p: "Roque Espaillat",
          party: "Democratic Hope Party",
          v: 1.35,
          c: "#14532A",
          // top: true
        },
        {
          p: "Other candidates",
          party: "< 1%",
          v: 2.57, // 0.70 + 0.58 + 0.45 + 0.14 + 0.06
          c: "#333",
        },
      ]),
      options: {
        majority: true,
        percentage: true,
        // majorityText: "50% + 1 vote"
      },
    },
  ],
  PA: [
    {
      date: "2024-05-05",
      description: "Presidential election",
      turnout: 77.64,
      data: transformData([
        {
          p: "José Raúl Mulino (Realizing Goals)",
          v: 34.25,
          c: "#0B76C0",
        },
        {
          p: "Ricardo Lombana (Another Way Movement)",
          v: 24.64,
          c: "#F27321",
        },
        {
          p: "Martín Torrijos (People's Party)",
          v: 16.03,
          c: "#7AC043",
        },
        {
          p: "Rómulo Roux (Democratic Change)",
          v: 11.36,
          c: "#2A889B",
        },
        {
          p: "Zulay Rodríguez (Independent)",
          v: 6.57,
          c: "#DCDCDC",
        },
        {
          p: "José Gabriel Carrizo (Democratic Revolutionary Party)",
          v: 5.85,
          c: "#003F87",
        },
        {
          p: "Maribel Gordón (Independent)",
          v: 1.08,
          c: "#DCDCDC",
        },
        {
          p: "Melitón Arrocha (Independent)",
          v: 0.21,
          c: "#DCDCDC",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 1;
        },
      },
    },
    {
      date: "2024-05-05",
      description: "Legislative election",
      turnout: 75.49,
      data: transformData([
        {
          p: "Independents",
          v: 21,
          c: "#DCDCDC",
        },
        {
          p: "Realizing Goals",
          v: 13,
          c: "#0B76C0",
        },
        {
          p: "Democratic Revolutionary Party",
          v: 12,
          c: "#003F87",
        },
        {
          p: "Democratic Change",
          v: 8,
          c: "#2A889B",
        },
        {
          p: "Panameñista Party",
          v: 8,
          c: "#DCDCDC",
        },
        {
          p: "Another Way Movement",
          v: 4,
          c: "#F27321",
        },
        {
          p: "People's Party",
          v: 2,
          c: "#7AC043",
        },
        {
          p: "Alliance Party",
          v: 2,
          c: "#E2211C",
        },
        {
          p: "Nationalist Republican Liberal Movement",
          v: 1,
          c: "#FDD900",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "36 seats needed",
        // labelFilter: (d) => {
        //   return d.x >= 1;
        // }
      },
    },
  ],
  LT: [
    {
      date: "2024-05-12",
      description: "Presidential election (first round)",
      turnout: 59.28,
      data: transformData([
        {
          p: "Gitanas Nausėda",
          party: "Independent",
          v: 44.46,
          c: "#DCDCDC",
        },
        {
          p: "Ingrida Šimonytė",
          party: "Homeland Union",
          v: 20.02,
          c: "#2F6CD1",
        },
        {
          p: "Ignas Vėgėlė",
          party: "Independent",
          v: 12.47,
          c: "#DCDCDC",
        },
        {
          p: "Remigijus Žemaitaitis",
          party: "Dawn of Nemunas",
          v: 9.33,
          c: "#F25D23",
        },
        {
          p: "Eduardas Vaitkus",
          party: "Independent",
          v: 7.39,
          c: "#DCDCDC",
        },
        {
          p: "Dainius Žalimas",
          party: "Independent",
          v: 3.58,
          c: "#DCDCDC",
        },
        {
          p: "Andrius Mazuronis",
          party: "Labour Party",
          v: 1.39,
          c: "#1D578C",
        },
        {
          p: "Giedrimas Jeglinskas",
          party: "Independent",
          v: 1.37,
          c: "#DCDCDC",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
    {
      date: "2024-05-26",
      description: "Presidential election (second round)",
      turnout: 49.15,
      data: transformData([
        {
          p: "Gitanas Nausėda",
          party: "Independent",
          v: 75.58,
          c: "#DCDCDC",
        },
        {
          p: "Ingrida Šimonytė",
          party: "Homeland Union",
          v: 24.42,
          c: "#2F6CD1",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 1;
        },
      },
    },
    {
      date: "2024-10-13",
      description: "Lithuanian parliamentary election",
    },
  ],
  // June
  MR: [
    {
      date: "2024-06-29",
      description: "Mauritanian presidential election",
      data: transformData([
        {
          p: "Mohamed Cheikh Ghazouani",
          party: "El Insaf",
          votes: 554956,
          v: 56.12,
          c: "#234D92",
        },
        {
          p: "Biram Dah Abeid",
          party: "Democratic Alternation Pole",
          votes: 218546,
          v: 22.1,
          c: "#EAC553",
        },
        {
          p: "Hamadi Sid’El Moctar Mohamed Abdi",
          party: "National Rally for Reform and Development",
          votes: 126340,
          v: 12.78,
          c: "#008040",
        },
        {
          p: "El Id Mohameden M’Bareck",
          party: "Republican Front for Unity and Democracy",
          votes: 35288,
          v: 3.57,
          c: "#3080B7",
        },
        {
          p: "Mamadou Bocar Ba",
          party: "Alliance for Justice and Democracy/Movement for Renewal",
          votes: 23617,
          v: 2.39,
          c: "#F8C3A0",
        },
        {
          p: "Outouma Antoine Souleimane Soumaré",
          party: "Independent",
          votes: 20360,
          v: 2.06,
          c: "#DCDCDC",
        },
        {
          p: "Mohamed Lemine El Mourteji El Wavi",
          party: "Independent",
          votes: 9722,
          v: 0.98,
          c: "#95B256",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2.5;
        },
      },
    },
  ],
  MX: [
    {
      date: "2024-06-02",
      description: "General election - President",
      turnout: 61.05,
      data: transformData([
        {
          p: "Claudia Sheinbaum",
          party: "Sigamos Haciendo Historia",
          votes: 33226602,
          v: 59.22,
          c: "#C0311A",
        },
        {
          p: "Xóchitl Gálvez",
          party: "Fuerza y Corazón por México",
          v: 27.84,
          votes: 15620726,
          c: "#C71585",
        },
        {
          p: "Jorge Máynez",
          party: "Citizens' Movement",
          votes: 5832105,
          v: 10.39,
          c: "#FF8C00",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 1;
        },
      },
    },
    {
      date: "2024-06-02",
      description: "General election - Chamber of Deputies",
      turnout: 61.05,
      data: transformData([
        {
          p: "Sigamos Haciendo Historia",
          v: 256,
          c: "#C0311A",
        },
        {
          p: "Fuerza y Corazón por México",
          v: 42,
          c: "#C71585",
        },
        {
          p: "Citizens' Movement",
          v: 1,
          c: "#FF8C00",
        },
        {
          p: "Independents",
          v: 1,
          c: "#DCDCDC",
        },
      ]),
    },
    {
      date: "2024-06-02",
      description: "General election - Senate",
      turnout: 61.05,
      data: transformData([
        {
          p: "Sigamos Haciendo Historia",
          v: 83,
          c: "#C0311A",
        },
        {
          p: "Fuerza y Corazón por México",
          v: 40,
          c: "#C71585",
        },
        {
          p: "Citizens' Movement",
          v: 5,
          c: "#FF8C00",
        },
      ]),
    },
  ],
  "IQ-KR": [
    {
      date: "2024-06-10",
      description: "Kurdistan Region parliamentary election",
    },
  ],
  MN: [
    {
      date: "2024-06-28",
      description: "Mongolian parliamentary election",
      turnout: 69.4,
      data: transformData([
        {
          p: "MPP",
          part: "Luvsannamsrain Oyun-Erdene",
          perc: 35.01,
          v: 68,
          change: "+6",
          c: "#ED1B34",
        },
        {
          p: "Civil Will-Green",
          part: "Batyn Batbaatar",
          perc: 5.02,
          v: 4,
          change: "+4",
          c: "#027E40",
        },
        {
          p: "Democratic",
          part: "Luvsannyamyn Gantömör",
          perc: 30.14,
          v: 42,
          change: "+31",
          c: "#11479E",
        },
        {
          p: "HUN Party",
          part: "Togmidyn Dorjkhand",
          perc: 10.38,
          v: 8,
          change: "+7",
          c: "#6D3290",
        },
        {
          p: "National Coalition",
          part: "Nyamtaishiriin Nomtoibayar",
          perc: 5.17,
          v: 4,
          change: "New",
          c: "#066B55",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "64 seats needed",
        // labelFilter: (d) => {
        //   return d.x >= 2;
        // },
        withPerc: true,
      },
    },
  ],
  BE: [
    {
      date: "2024-06-09",
      description: "Belgian federal election",
      turnout: 87.42,
      data: transformData([
        {
          p: "PVDA-PTB",
          leader: "Raoul Hedebouw",
          perc: 9.86,
          v: 15,
          change: 3,
          c: "#8B0000",
        },
        {
          p: "PS",
          leader: "Paul Magnette",
          perc: 8.04,
          v: 16,
          change: -4,
          c: "#FF0000",
        },
        {
          p: "Vooruit",
          leader: "Melissa Depraetere",
          perc: 8.11,
          v: 13,
          change: 4,
          c: "#FF2900",
        },
        {
          p: "Ecolo",
          leader: "Rajae Maouane & Jean-Marc Nollet",
          perc: 2.93,
          v: 3,
          change: -10,
          c: "#5aad39",
        },
        {
          p: "Groen",
          leader: "Nadia Naji & Jeremie Vaneeckhout",
          perc: 4.65,
          v: 6,
          change: -2,
          c: "#01796F",
        },
        {
          p: "DéFI",
          leader: "François De Smet",
          perc: 1.2,
          v: 1,
          change: -1,
          c: "#DD0081",
        },
        {
          p: "LE",
          leader: "Maxime Prévot",
          perc: 6.77,
          v: 14,
          change: 9,
          c: "#02E5D2",
        },
        {
          p: "CD&V",
          leader: "Sammy Mahdi",
          perc: 7.98,
          v: 11,
          change: -1,
          c: "#FF6200",
        },
        {
          p: "MR",
          leader: "Georges-Louis Bouchez",
          perc: 10.26,
          v: 20,
          change: 6,
          c: "#0047AB",
        },
        {
          p: "Open Vld",
          leader: "Tom Ongena",
          perc: 5.45,
          v: 7,
          change: -5,
          c: "#0087DC",
        },
        {
          p: "N-VA",
          leader: "Bart De Wever",
          perc: 16.71,
          v: 24,
          change: -1,
          c: "#F9CE19",
        },
        {
          p: "VB",
          leader: "Tom Van Grieken",
          perc: 13.77,
          v: 20,
          change: 2,
          c: "#FFE500",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "76 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
        withPerc: true,
      },
    },
  ],
  BG: [
    {
      date: "2024-06-09",
      description: "Bulgarian parliamentary election",
      turnout: 33.4,
      data: transformData([
        {
          p: "BSP for Bulgaria",
          votes: 151557,
          perc: 6.85,
          v: 19,
          change: -4,
          c: "#DB0F28",
        },
        {
          p: "Movement for Rights and Freedoms",
          votes: 366562,
          perc: 16.57,
          v: 45,
          change: 9,
          c: "#0066B7",
        },
        {
          p: "PP–DB",
          votes: 307848,
          perc: 13.92,
          v: 40,
          change: -24,
          c: "#4200FF",
        },
        {
          p: "There is Such a People",
          votes: 127986,
          perc: 5.79,
          v: 17,
          change: 6,
          c: "#4BB9DE",
        },
        {
          p: "GERB–SDS",
          votes: 530602,
          perc: 23.99,
          v: 68,
          change: -1,
          c: "#226ABA",
        },
        {
          p: "Velichie",
          votes: 99852,
          perc: 4.51,
          v: 13,
          change: "New",
          c: "#AC2225",
        },
        {
          p: "Revival",
          votes: 295915,
          perc: 13.38,
          v: 38,
          change: 1,
          c: "#C09F62",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "121 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
        withPerc: true,
      },
    },
  ],
  EU: [
    {
      date: "2024-06-09",
      description: "European Parliament election",
      turnout: 51.01,
      data: transformData([
        {
          p: "The Left in the European Parliament – GUE/NGL",
          v: 36,
          change: "-4",
          c: "#B71C1C",
        },
        {
          p: "Progressive Alliance of Socialists and Democrats",
          v: 135,
          change: "-13",
          c: "#F0001C",
        },
        {
          p: "Greens–European Free Alliance",
          v: 53,
          change: "-14",
          c: "#57B45F",
        },
        { p: "Renew Europe", v: 79, change: "-18", c: "#FFD700" },
        { p: "European People's Party", v: 186, change: "-1", c: "#3399FF" },
        {
          p: "European Conservatives and Reformists",
          v: 73,
          change: "+11",
          c: "#196CA8",
        },
        { p: "Identity and Democracy", v: 58, change: "-18", c: "#0E408A" },
        { p: "Non-Inscrits", v: 45, change: "-12", c: "#999999" },
        { p: "Others", v: 55, change: "+55", c: "#DDDDBB" },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "361 seats needed",
        // labelFilter: (d) => {
        //   return d.x >= 1;
        // }
      },
    },
  ],
  IN: [
    {
      date: "2024-06-01",
      description: "Indian general election - Result by Alliance",
      turnout: 65.79,
      data: transformData([
        {
          p: "NDA (National Democratic Alliance)",
          v: 293,
          c: "#F98C1F",
        },
        {
          p: "Other parties",
          v: 16,
          c: "#DCDCDC",
        },
        {
          p: "INDIA (Indian National Developmental Inclusive Alliance)",
          v: 234,
          c: "#00B7EB",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "272 seats needed",
        // labelFilter: (d) => {
        //   return d.x >= 1;
        // }
      },
    },
    {
      date: "2024-06-01",
      description: "General election - Result by Party",
      turnout: 65.79,
      data: transformData([
        {
          p: "Bharatiya Janata Party",
          v: 240,
          c: "#FF9933",
        },
        {
          p: "Telugu Desam Party",
          v: 16,
          c: "#FFED00",
        },
        {
          p: "Janata Dal (United)",
          v: 12,
          c: "#003366",
        },
        {
          p: "Shiv Sena",
          v: 7,
          c: "#F37020",
        },
        {
          p: "Lok Janshakti Party (Ram Vilas)",
          v: 5,
          c: "#5B006A",
        },
        {
          p: "Janata Dal (Secular)",
          v: 1,
          c: "#02865A",
        },
        {
          p: "Jana Sena Party",
          v: 2,
          c: "#ca420f",
        },
        {
          p: "Rashtriya Lok Dal",
          v: 2,
          c: "#006400",
        },
        {
          p: "All Jharkhand Students Union",
          v: 1,
          c: "#6827B5",
        },
        {
          p: "Nationalist Congress Party",
          v: 1,
          c: "#00B2B2",
        },
        {
          p: "United People's Party Liberal",
          v: 1,
          c: "#FAED09",
        },
        {
          p: "Sikkim Krantikari Morcha",
          v: 1,
          c: "#ED1E26",
        },
        {
          p: "Apna Dal (Soneylal)",
          v: 1,
          c: "#27176D",
        },
        {
          p: "Asom Gana Parishad",
          v: 1,
          c: "#99CCFF",
        },
        {
          p: "Hindustani Awam Morcha",
          v: 1,
          c: "#F5D62A",
        },
        {
          p: "YSR Congress Party",
          v: 4,
          c: "#1569C7",
        },
        {
          p: "Shiromani Akali Dal",
          v: 1,
          c: "#0F204A",
        },
        {
          p: "All India Majlis-e-Ittehadul Muslimeen",
          v: 1,
          c: "#0c6b4b",
        },
        {
          p: "Zoram People's Movement",
          v: 1,
          c: "#FFF700",
        },
        {
          p: "Azad Samaj Party (Kanshi Ram)",
          v: 1,
          c: "#003597",
        },
        {
          p: "Voice of the People Party",
          v: 1,
          c: "#F8F9FA",
        },
        {
          p: "Independents",
          v: 7,
          c: "#DCDCDC",
        },
        {
          p: "Indian National Congress",
          v: 99,
          c: "#19AAED",
        },
        {
          p: "Samajwadi Party",
          v: 37,
          c: "#FF2222",
        },
        {
          p: "All India Trinamool Congress",
          v: 29,
          c: "#20C646",
        },
        {
          p: "Dravida Munnetra Kazhagam",
          v: 22,
          c: "#FF0D0D",
        },
        {
          p: "Communist Party of India (Marxist)",
          v: 4,
          c: "#cc0d0d",
        },
        {
          p: "Rashtriya Janata Dal",
          v: 4,
          c: "#056D05",
        },
        {
          p: "Shiv Sena (Uddhav Balasaheb Thackeray)",
          v: 9,
          c: "#FD7D24",
        },
        {
          p: "Aam Aadmi Party",
          v: 3,
          c: "#0072B0",
        },
        {
          p: "Nationalist Congress Party (Sharadchandra Pawar)",
          v: 8,
          c: "#0029B0",
        },
        {
          p: "Communist Party of India",
          v: 2,
          c: "#cb0922",
        },
        {
          p: "Jharkhand Mukti Morcha",
          v: 3,
          c: "#337316",
        },
        {
          p: "Communist Party of India (Marxist–Leninist) Liberation",
          v: 2,
          c: "#C41301",
        },
        {
          p: "Indian Union Muslim League",
          v: 3,
          c: "#006600",
        },
        {
          p: "Jammu and Kashmir National Conference",
          v: 2,
          c: "#fe0000",
        },
        {
          p: "Viduthalai Chiruthaigal Katchi",
          v: 2,
          c: "#1E90FF",
        },
        {
          p: "Bharat Adivasi Party",
          v: 1,
          c: "#FF0000",
        },
        {
          p: "Kerala Congress",
          v: 1,
          c: "#CC6600",
        },
        {
          p: "Marumalarchi Dravida Munnetra Kazhagam",
          v: 1,
          c: "#FC0000",
        },
        {
          p: "Rashtriya Loktantrik Party",
          v: 1,
          c: "#FFD42A",
        },
        {
          p: "Revolutionary Socialist Party",
          v: 1,
          c: "#d84c4c",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "272 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
      },
    },
  ],
  IS: [
    {
      date: "2024-06-01",
      description: "Icelandic presidential election",
      turnout: 80.78,
      data: transformData([
        {
          p: "Halla Tómasdóttir",
          votes: 73182,
          v: 34.15,
          c: "#000000",
        },
        {
          p: "Katrín Jakobsdóttir",
          votes: 53980,
          v: 25.19,
          c: "#00B878",
        },
        {
          p: "Halla Hrund Logadóttir",
          votes: 33601,
          v: 15.68,
          c: "#143454",
        },
        {
          p: "Jón Gnarr",
          votes: 21634,
          v: 10.09,
          c: "#ED1400",
        },
        {
          p: "Baldur Þórhallsson",
          votes: 18030,
          v: 8.41,
          c: "#02529C",
        },
        {
          p: "Arnar Þór Jónsson",
          votes: 10881,
          v: 5.08,
          c: "#00ADEF",
        },
        {
          p: "Steinunn Ólína Þorsteinsdóttir",
          votes: 1383,
          v: 0.65,
          c: "#9370DB",
        },
        {
          p: "Ástþór Magnússon",
          votes: 465,
          v: 0.22,
          c: "#D62718",
        },
        {
          p: "Viktor Traustason",
          votes: 392,
          v: 0.18,
          c: "#FADA5E",
        },
        {
          p: "Ásdís Rán Gunnarsdóttir",
          votes: 394,
          v: 0.18,
          c: "#DCDCDC",
        },
        {
          p: "Helga Þórisdóttir",
          votes: 275,
          v: 0.13,
          c: "#bc1d2d",
        },
        {
          p: "Eiríkur Ingi Jóhannsson",
          votes: 101,
          v: 0.05,
          c: "#2E8B57",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
  ],
  FR: [
    {
      description: "French legislative election (first round)",
      date: "2024-06-30",
      turnout: 66.71,
      data: transformData([
        {
          p: "National Rally",
          c: "#254671",
          v: 29.25,
          seats: 37,
        },
        {
          p: "New Popular Front",
          c: "#E50241",
          v: 28.14,
          seats: 32,
        },
        {
          p: "Ensemble",
          c: "#FFD600",
          v: 21.27,
          seats: 2,
        },
        {
          p: "The Republicans",
          c: "#0043B0",
          v: 6.57,
          seats: 1,
        },
        {
          p: "Union of the far-right",
          c: "#404040",
          v: 3.9,
          seats: 1,
        },
        {
          p: "Miscellaneous right",
          c: "#ADC1FD",
          v: 3.66,
          seats: 2,
        },
        {
          p: "Miscellaneous left",
          c: "#FFC0C0",
          v: 1.53,
          seats: 0,
        },
        {
          p: "Miscellaneous centre",
          c: "#fcdaa8",
          v: 1.22,
          seats: 0,
        },
        {
          p: "Miscellaneous far-left",
          c: "#BB0000",
          v: 1.15,
          seats: 0,
        },
        {
          p: "Regionalists",
          c: "#DDDD00",
          v: 1.05,
          seats: 0,
        },
        {
          p: "Reconquête",
          c: "#170066",
          v: 0.75,
          seats: 0,
        },
        {
          p: "Ecologists",
          c: "#8FBC8F",
          v: 0.57,
          seats: 0,
        },
        {
          p: "Miscellaneous",
          c: "#CECECE",
          v: 0.45,
          seats: 0,
        },
        {
          p: "Sovereignist right",
          c: "#0087CD",
          v: 0.28,
          seats: 0,
        },
        {
          p: "Miscellaneous far-right",
          c: "#404040",
          v: 0.19,
          seats: 1,
        },
        {
          p: "Radical Party of the Left",
          c: "#F0C200",
          v: 0.04,
          seats: 0,
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 2;
        },
      },
    },
    {
      description: "French legislative election (second round)",
      date: "2024-07-07",
      turnout: 66.63,
      notes: "Based on the final results published by Le Monde",
      data: transformData([
        {
          c: "#E50241",
          p: "New Popular Front (left-wing alliance)",
          v: 182,
        },
        {
          c: "#FFC0C0",
          p: "Indipentent left",
          v: 13,
        },
        {
          c: "#FFD600",
          p: "Ensemble (Macron’s coalition)",
          v: 168,
        },
        {
          c: "#fcdaa8",
          p: "Indipendent center",
          v: 6,
        },
        {
          c: "#DDDD00",
          p: "Regionalists",
          v: 4,
        },
        {
          c: "#ADC1FD",
          p: "Independent right",
          v: 14,
        },
        {
          c: "#0043B0",
          p: "The Republicans (conservatives)",
          v: 46,
        },
        {
          c: "#254671",
          p: "National Rally and allies",
          v: 143,
        },
        {
          c: "#CECECE",
          p: "Miscellanous",
          v: 1,
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "289 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
      },
    },
  ],
  // July
  GB: [
    {
      date: "2024-07-04",
      description: "British general election",
      data: transformData([
        { p: "Labour Party", v: 412, c: "#E4003B" },
        { p: "Liberal Democrats", v: 72, c: "#FAA61A" },
        { p: "Scottish National Party", v: 9, c: "#FDF38E" },
        { p: "Sinn Féin", v: 7, c: "#326760" },
        { p: "Green Party of England and Wales", v: 4, c: "#02A95B" },
        { p: "Independent", v: 6, c: "#dcdcdc" },
        { p: "Reform UK", v: 5, c: "#12B6CF" },
        { p: "Democratic Unionist Party", v: 5, c: "#D46A4C" },
        { p: "Plaid Cymru", v: 4, c: "#005B54" },
        { p: "Social Democratic and Labour Party", v: 2, c: "#2AA82C" },
        { p: "Alliance Party of Northern Ireland", v: 1, c: "#F6CB2F" },
        { p: "Ulster Unionist Party", v: 1, c: "#48A5EE" },
        { p: "Traditional Unionist Voice", v: 1, c: "#0C3A6A" },
        { p: "Conservative Party", v: 121, c: "#0087DC" },
      ]),
      options: {
        majority: true,
        majorityText: "326 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
      },
    },
  ],
  RW: [
    {
      date: "2024-07-15",
      description: "Rwandan general election - President",
      turnout: 98,
      data: transformData([
        {
          p: "Paul Kagame",
          party: "Rwandan Patriotic Front",
          votes: 7099810,
          v: 99.15,
          c: "#39A3DC",
        },
        {
          p: "Frank Habineza",
          party: "Democratic Green Party",
          votes: 38301,
          v: 0.53,
          c: "#A2FD0B",
        },
        {
          p: "Philippe Mpayimana",
          party: "Independent",
          votes: 22573,
          v: 0.32,
          c: "#DCDCDC",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 0;
        },
      },
    },
    {
      date: "2024-07-15",
      description: "Rwandan general election - Chamber of Deputies",
      turnout: 98,
      data: transformData([
        {
          p: "RPF Coalition",
          votes: 5471104,
          v: 62.67,
          c: "#39A3DC",
        },
        {
          p: "Liberal Party (Rwanda)",
          votes: 957602,
          v: 10.97,
          c: "#03b464",
        },
        {
          p: "Social Democratic Party (Rwanda)",
          votes: 827182,
          v: 9.48,
          c: "#00BFFF",
        },
        {
          p: "Ideal Democratic Party",
          votes: 507474,
          v: 5.81,
          c: "#009900",
        },
        {
          p: "Democratic Green Party of Rwanda",
          votes: 462290,
          v: 5.3,
          c: "#A2FD0B",
        },
        {
          p: "Social Party Imberakuri",
          votes: 459526,
          v: 5.26,
          c: "#C71585",
        },
        {
          p: "Independents",
          votes: 44881,
          v: 0.51,
          c: "#DCDCDC",
        },
      ]),
      options: {
        percentage: true,
        labelFilter: (d) => {
          return d.x >= 0;
        },
      },
    },
  ],
  SY: [
    {
      description: "Syrian parliamentary election",
      date: "2024-07-15",
      turnout: 38.16,
      data: transformData([
        {
          p: "Ba'ath Party",
          v: 169,
          c: "#017B48",
        },
        {
          p: "Syrian Social Nationalist Party",
          v: 3,
          c: "#000000",
        },
        {
          p: "Arab Socialist Union Party",
          v: 2,
          c: "#F0001C",
        },
        {
          p: "Syrian Communist Party (Bakdash)",
          v: 2,
          c: "#DE3533",
        },
        {
          p: "National Covenant Party",
          v: 2,
          c: "green",
        },
        {
          p: "Socialist Unionist Party",
          v: 2,
          c: "#BF0202",
        },
        {
          p: "Arab Democratic Union Party",
          v: 2,
          c: "green",
        },
        {
          p: "Syrian Communist Party (Unified)",
          v: 2,
          c: "red",
        },
        {
          p: "Democratic Socialist Unionist Party",
          v: 1,
          c: "red",
        },
        {
          p: "Independents",
          v: 65,
          c: "#DCDCDC",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "126 seats needed",
        labelFilter: (d) => {
          return d.x > 2;
        },
      },
    },
  ],
  VE: [
    {
      date: "2024-07-28",
      description: "Venezuelan presidential election",
    },
  ],
  // August (no elections)
  // September
  DZ: [
    {
      date: "2024-09-07",
      description: "Algerian presidential election",
    },
  ],
  JO: [
    {
      date: "2024-09-07",
      description: "Jordanian general election",
    },
  ],
  RO: [
    {
      date: "2024-09-15",
      description: "Romanian presidential election",
    },
    {
      date: "2024-12-08",
      description: "Romanian parliamentary election",
    },
  ],
  AT: [
    {
      date: "2024-09-29",
      description: "Austrian legislative election,",
    },
  ],
  // October
  BR: [
    {
      date: "2024-10-06",
      description: "Brazilian municipal elections",
    },
  ],
  MZ: [
    {
      date: "2024-10-09",
      description: "Mozambican general election",
    },
  ],
  CZ: [
    {
      date: "2024-10-20",
      description: "Czech Senate election",
    },
  ],
  MD: [
    {
      date: "2024-10-20",
      description: "Moldovan presidential election",
    },
  ],
  UY: [
    {
      date: "2024-10-27",
      description: "Uruguayan general election",
    },
  ],
  GE: [
    {
      date: "2024-10-26",
      description: "Georgian parliamentary election",
    },
    {
      date: "2024-10-26",
      description: "Georgian presidential election",
    },
  ],
  // November
  MU: [
    {
      date: "2024-11-30",
      description: "Mauritian general election",
    },
  ],
  NA: [
    {
      date: "2024-11-15",
      description: "Namibian general election",
    },
  ],
  US: [
    {
      date: "2024-11-05",
      description: "United States presidential election",
    },
    {
      date: "2024-11-05",
      description: "United States House of Representatives elections",
    },
    {
      date: "2024-11-05",
      description: "United States Senate elections",
    },
  ],
  PW: [
    {
      date: "2024-11-12",
      description: "Palauan general election",
    },
  ],
  // December
  GH: [
    {
      date: "2024-12-07",
      description: "Ghanaian general election",
    },
  ],
  SM: [
    {
      date: "2024-06-09",
      description: "San Marino general election",
      data: transformData([
        {
          p: "RETE",
          party: "",
          perc: 5.07,
          v: 3,
          c: "#275956",
        },
        {
          p: "Libera/PS – PSD",
          party: "",
          perc: 15.75,
          v: 10,
          c: "#E30514",
        },
        {
          p: "PSD",
          party: "Party of Socialists and Democrats",
          perc: 12.19,
          v: 8,
          c: "#DB4608",
        },
        {
          p: "DML",
          party: "Domani Motus Liberi",
          perc: 8.47,
          v: 5,
          c: "#039ADA",
        },
        {
          p: "RF",
          party: "Future Republic",
          perc: 11.98,
          v: 8,
          c: "#223968",
        },
        {
          p: "AR",
          party: "Reformist Alliance",
          perc: 6.98,
          v: 4,
          c: "#2A68B1",
        },
        {
          p: "PDCS",
          party: "Sammarinese Christian Democratic Party",
          perc: 34.14,
          v: 22,
          c: "#9CB2D8",
        },
      ]),
      options: {
        percentage: false,
        majority: true,
        majorityText: "31 seats needed",
        // labelFilter: (d) => {
        //   return d.x >= 2;
        // },
        withPerc: true,
      },
    },
  ],
  SS: [
    {
      date: "2024-12-22",
      description: "South Sudanese general election",
    },
  ],
  BW: [
    {
      date: "2024-12-31",
      description: "Botswana general election",
      nodate: true,
    },
  ],
  GW: [
    {
      date: "2024-12-31",
      description: "Guinea-Bissau parliamentary election",
      nodate: true,
    },
    {
      date: "2024-12-31",
      description: "Guinea-Bissau presidential election",
      nodate: true,
    },
  ],
  TN: [
    {
      date: "2024-12-31",
      description: "Tunisian presidential election",
      nodate: true,
    },
  ],
  KP: [
    {
      date: "2024-12-31",
      description: "North Korean parliamentary election",
      nodate: true,
    },
  ],
  LK: [
    {
      date: "2024-12-31",
      description: "Sri Lankan presidential election",
      nodate: true,
    },
  ],
  UZ: [
    {
      date: "2024-12-31",
      description: "Uzbek parliamentary election, December (first round)",
      nodate: true,
    },
  ],
  KI: [
    {
      date: "2024-12-31",
      description: "Kiribati parliamentary election",
      nodate: true,
    },
  ],
};
