

const teams = [
  {
    _id: '5fdfa83b58b9e05070daed4f',
    name: 'null'
  },
  // *** ENGLAND ** ====
  {
    id: 40,
    _id: '5eeb67b4a91acb1a0c29d095',
    name: 'Liverpool',
    shortName: 'liverpool'
  },
  {
    "id": 47,
    "_id": '5ef35e0310ec0e0ee4d68d44',
    "name": "Tottenham",
    shortName: "tott"
  },
  {
    "id": 41,
    "_id": '5ef61ba4beb99a0844ee108f',
    "name": "Southampton",
    shortName: "xxx"
  },
  {
    "id": 46,
    "_id": '5ef61ed1beb99a0844ee1099',
    "name": "Leicester",
    shortName: "lstr"
  },
  {
    "id": 45,
    "_id": '5ef61b98beb99a0844ee108e',
    "name": "Everton",
    shortName: "xxx"
  },
  {
    "id": 49,
    "_id": '5ef35e3310ec0e0ee4d68d45',
    "name": "Chelsea",
    shortName: "xxx"
  },
  {
    "id": 48,
    "_id": '5ef61b23beb99a0844ee1089',
    "name": "West Ham",
    shortName: "xxx"
  },
  {
    "id": 50,
    "_id": '5eeba74ecfbf6d0d84899928',
    "name": "Manchester City",
    shortName: "manct"
  },
  {
    "id": 33,
    "_id": '5ef61a9abeb99a0844ee1086',
    "name": "Manchester United",
    shortName: "manutd"
  },
  {
    "id": 39,
    "_id": '5ef61d32beb99a0844ee1091',
    "name": "Wolves",
    shortName: "wolves"
  },
  {
    "id": 66,
    "_id": '5ef61b88beb99a0844ee108d',
    "name": "Aston Villa",
    shortName: "xxx"
  },
  {
    "id": 52,
    "_id": '5ef61da0beb99a0844ee1096',
    "name": "Crystal Palace",
    shortName: "xxx"
  },
  {
    "id": 63,
    "_id": '5f45884c95074b6ce0e7cd11',
    "name": "Leeds",
    shortName: "xxx"
  },
  {
    "id": 34,
    "_id": '5ef61b70beb99a0844ee108c',
    "name": "Newcastle",
    shortName: "xxx"
  },
  {
    "id": 42,
    "_id": '5ef0a650ab5ea1479cf3da09',
    "name": "Arsenal",
    shortName: "xxx"
  },
  {
    "id": 51,
    "_id": '5ef61d12beb99a0844ee1090',
    "name": "Brighton",
    shortName: "xxx"
  },
  {
    "id": 36,
    "_id": '5f45888695074b6ce0e7cd12',
    "name": "Fulham",
    shortName: "xxx"
  },
  {
    "id": 44,
    "_id": '5ef61d7dbeb99a0844ee1094',
    "name": "Burnley",
    shortName: "xxx"
  },
  {
    "id": 60,
    "_id": '5f4588ef95074b6ce0e7cd13',
    "name": "West Brom",
    shortName: "xxx"
  },
  {
    "id": 62,
    "_id": '5ef61d44beb99a0844ee1092',
    "name": "Sheffield Utd",
    shortName: "xxx"
  },
  //  *** SPAIN *** // ====
  {
    "id": 531,
    "_id": "5ef7ce6510ec0e0ee4d68d52",
    "name": "At Bilbao",
    shortName: "xxx"
  },
  {
    "id": 724,
    "_id": "5f5615fc399b9c493890dc73",
    "name": "Cádiz",
    shortName: "xxx"
  },
  {
    "id": 726,
    "_id": "5f56161b399b9c493890dc74",
    "name": "Huesca",
    shortName: "xxx"
  },
  {
    "id": 797,
    "_id": "5f56163a399b9c493890dc75",
    "name": "Elche",
    shortName: "xxx"
  },
  {
    "id": 530,
    "_id": "5eeba65b32adc43d90b84e37",
    "name": "Atlético Madrid",
    shortName: "xxx"
  },
  {
    "id": 541,
    "_id": "5eeba6d8cfbf6d0d84899926",
    "name": "Real Madrid",
    shortName: "xxx"
  },
  {
    "id": 529,
    "_id": "5ef5fa5bbeb99a0844ee106e",
    "name": "Barcelona",
    shortName: "xxx"
  },
  {
    "id": 536,
    "_id": "5ef5fa7abeb99a0844ee1070",
    "name": "Sevilla",
    "shortName": "sevilla"
  },
  {
    "id": 546,
    "_id": "5ef5fa86beb99a0844ee1071",
    "name": "Getafe",
    shortName: "xxx"
  },
  {
    "id": 542,
    "_id": "5ef5faf5beb99a0844ee1072",
    "name": "Alavés",
    shortName: "xxx"
  },
  {
    "id": 538,
    "_id": "5ef5fb20beb99a0844ee1074",
    "name": "Celta Vigo",
    shortName: "xxx"
  },
  {
    "id": 545,
    "_id": "5ef5fb2ebeb99a0844ee1075",
    "name": "Eibar",
    shortName: "xxx"
  },
  {
    "id": 6000,
    "_id": "5ef5fb39beb99a0844ee1076",
    "name": "Espanyol",
    shortName: "xxx"
  },
  {
    "id": 715,
    "_id": "5ef5fb43beb99a0844ee1077",
    "name": "Granada",
    shortName: "xxx"
  },
  {
    "id": 6000,
    "_id": "5ef5fb56beb99a0844ee1078",
    "name": "Leganés",
    shortName: "xxx"
  },
  {
    "id": 539,
    "_id": "5ef5fb63beb99a0844ee1079",
    "name": "Levante",
    shortName: "xxx"
  },
  {
    "id": 6000,
    "_id": "5ef5fb70beb99a0844ee107a",
    "name": "Mallorca",
    shortName: "xxx"
  },
  {
    "id": 727,
    "_id": "5ef5fc2fbeb99a0844ee107b",
    "name": "Osasuna",
    shortName: "xxx"
  },
  {
    "id": 543,
    "_id": "5ef5fc3cbeb99a0844ee107c",
    "name": "Real Betis",
    shortName: "xxx"
  },
  {
    "id": 548,
    "_id": "5ef5fc9abeb99a0844ee107d",
    "name": "Sociedad",
    shortName: "xxx"
  },
  {
    "id": 532,
    "_id": "5ef5fcb9beb99a0844ee107f",
    "name": "Valencia",
    shortName: "xxx"
  },
  {
    "id": 720,
    "_id": "5ef5fcecbeb99a0844ee1080",
    "name": "Valladolid",
    shortName: 'valla'
  },
  {
    "id": 533,
    "_id": "5ef5fcf9beb99a0844ee1081",
    "name": "Villarreal",
    shortName: 'villa'
  },
  // *** ITALY ***
  {
    "id": 489,
    "name": "AC Milan",
  },
  {
    "id": 505,
    "name": "Inter"
  },
  {
    "id": 496,
    "name": "Juventus"
  },
  {
    "id": 497,
    "name": "AS Roma"
  },
  {
    "id": 487,
    "name": "Lazio"
  },
  {
    "id": 492,
    "name": "Napoli"
  },
  {
    "id": 499,
    "name": "Atalanta"
  },
  {
    "id": 488,
    "name": "Sassuolo"
  },
  {
    "id": 504,
    "name": "Verona"
  },
  {
    "id": 498,
    "name": "Sampdoria"
  },
  {
    "id": 494,
    "name": "Udinese"
  },
  {
    "id": 495,
    "name": "Genoa"
  },
  {
    "id": 500,
    "name": "Bologna"
  },
  {
    "id": 506,
    "name": "Benevento"
  },
  {
    "id": 502,
    "name": "Fiorentina"
  },
  {
    "id": 515,
    "name": "Spezia"
  },
  {
    "id": 503,
    "name": "Torino"
  },
  {
    "id": 490,
    "name": "Cagliari"
  },
  {
    "id": 523,
    "name": "Parma"
  },
  {
    "id": 501,
    "name": "Crotone"
  },
  // *** FRANCE ***
  {
    "id": 79,
    "name": "Lille",
  },
  {
    "id": 80,
    "name": "Lyon",
  },
  {
    "id": 85,
    "name": "Paris Saint Germain",
  },
  {
    "id": 91,
    "name": "Monaco"
  },
  {
    "id": 94,
    "name": "Rennes",
  },
  {
    "id": 116,
    "name": "Lens"
  },
  {
    "id": 112,
    "name": "Metz",
  },
  {
    "id": 77,
    "name": "Angers",
  },
  {
    "id": 81,
    "name": "Marseille",
  },
  {
    "id": 78,
    "name": "Bordeaux",
  },
  {
    "id": 82,
    "name": "Montpellier",
  },
  {
    "id": 106,
    "name": "Stade Brestois 29",
  },
  {
    "id": 84,
    "name": "Nice",
  },
  {
    "id": 93,
    "name": "Reims",
  },
  {
    "id": 1063,
    "name": "Saint Etienne",
  },
  {
    "id": 95,
    "name": "Strasbourg",
  },
  {
    "id": 97,
    "name": "Lorient",
  },
  {
    "id": 83,
    "name": "Nantes",
  },
  {
    "id": 89,
    "name": "Dijon",
  },
  {
    "id": 92,
    "name": "Nimes",
  },

]


// api-football leagues - api leagues array

// ENLAND - SPAIN - ITALY - FRANCE - UCL - UEL

// prlig , facup , laliga - spcup (copa del rey) - seria - itcup - 

const leagues = [
  {
    "id": 00,
    code: 'prlig',
    "name": "Premier League",
    "shortName": "prlig",
    country: "England"
  },
  {
    "id": 00,
    "name": "FA Cup",
    "shortName": "facup",
    country: "England"
  },
  {
    "id": 00,
    "name": "x",
    "shortName": "x"
  },
  {
    "id": 00,
    "name": "x",
    "shortName": "x"
  },
  {
    "id": 61,
    "name": "Ligue 1",
    shortName: "lig1",

  },
  {
    "id": 66,
    "name": "Coupe de France",
    "shortname": "frcup",
    country: "France"
  },
  {
    "id": 39,
    "name": "Premier League",
  },
  {
    "id": 45,
    "name": "FA Cup",
  },
  {
    "id": 46,
    "name": "EFL Trophy",
  },
  {
    "id": 135,
    "name": "Serie A",
    "shortName": "seria"
  },
  {
    "id": 137,
    "name": "Coppa Italia",
    "country": "italy"
  },
  {
    "id": 140,   // Spain Laliga
    "name": "Primera Division",
    "shortName": "laliga"
  },
  {
    "id": 61,
    "name": "Ligue 1",
    "type": "League",

  }
]

// ** Top 20+ teams ids
const topTeams = [
  33, // man utd
  40, // liverpool
  42, // arsenal
  47, // tottenham
  49, // chelsea
  50, // man city
  541, // rmadrid
  529, // barca
  530,  // at madrid
  536,  // sevilla
  489, // ac milan
  505, // inter
  496, // juventus
  497  // as roma
  // 85,  // psg
  // bayern munich
  // dortmund
  // ajax
  //benfica
  // porto
]


module.exports = { teams, leagues } 