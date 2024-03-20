// let deflyMonsterImportPopup = new popup("deflyMonsterImportPopup");
// deflyMonsterImportPopup.load(
//   `
// <a style="color: white;" href="https://skins.defly.monster/"><h1>Import From Defly.monster</h1></a>
// <button id="in-game-monster" type="button" class="button selectedButton" lang="en">In-Game</button>
// <button id="custom-monster" type="button" class="button" lang="en">Custom</button>
// <button id="custom-single-skin-monster" type="button" class="button" lang="en">Custom Single Skins</button>
// <br />
// <div id="tab-in-game" class="customTab">
//     <div class="name">Set:</div>
//     <select id="tab-in-game-select-set">
//         <option>Loading...</option>
//     </select>
//     <br />
//     <br />
//     <div class="name">Name:</div>
//     <select id="tab-in-game-select-name">
//         <option>Loading...</option>
//     </select>
//     <br />
//     <br />
//     <button style="padding: 10px;" id="in-game-monster-import" type="button" class="button" lang="en">IMPORT</button>
// </div>
// <div id="tab-custom" style="display: none;" class="customTab">
//     <div class="name">Creator:</div>
//     <select id="tab-custom-select-creator">
//         <option>Loading...</option>
//     </select>
//     <br />
//     <div class="name">Set:</div>
//     <select id="tab-custom-select-set">
//         <option>Loading...</option>
//     </select>
//     <br />
//     <div class="name">Name:</div>
//     <select id="tab-custom-select-name">
//         <option>Loading...</option>
//     </select>
// </div>
// <div id="tab-custom-single-skin" style="display: none;" class="customTab">
// </div>
// `,
//   document.body
// );

// function loadSelect(
//   id,
//   items = [],
//   key = "",
//   callback = () => {},
//   value = (e) => e
// ) {
//   console.log(items);
//   let options = "";
//   items.forEach((item) => {
//     options += `<option value="${value(item[key])}">${item[key]}</option>`;
//   });
//   document.getElementById(id).innerHTML = options;
//   document.getElementById(id).onchange = (elm) => {
//     callback(elm);
//   };
// }

// // fetch("https://skins.defly.monster/skins")
// //   .then((e) => e.json())
// //   .then((json) => {
// //     monsterJson = json;
// //   });

// let monsterJson = {
//   custom: [
//     {
//       name: "Astro.",
//       skinSets: [],
//       singleSkins: [
//         {
//           name: "ArrowDot",
//         },
//         {
//           name: "DarkPhoenix",
//         },
//         {
//           name: "DarkTriblade",
//         },
//         {
//           name: "bat",
//         },
//       ],
//     },
//     {
//       name: "Captain Jack",
//       skinSets: [
//         {
//           name: "Cosmic",
//           skins: [
//             {
//               name: "CometRocket",
//             },
//             {
//               name: "BlackHole",
//             },
//             {
//               name: "Eclipse",
//             },
//             {
//               name: "StarDust",
//             },
//             {
//               name: "NorthShip",
//             },
//             {
//               name: "AsteroidShip",
//             },
//             {
//               name: "RocBird",
//             },
//           ],
//         },
//         {
//           name: "Creeper",
//           skins: [
//             {
//               name: "ClockworkTrouble",
//             },
//             {
//               name: "RiskyChamber",
//             },
//             {
//               name: "MythicalBeast",
//             },
//             {
//               name: "WarMachine",
//             },
//             {
//               name: "PartySoul",
//             },
//             {
//               name: "CursedCompass",
//             },
//             {
//               name: "FireAngel",
//             },
//           ],
//         },
//         {
//           name: "Jurassic",
//           skins: [
//             {
//               name: "DinoEgg",
//             },
//             {
//               name: "BalloonMadness",
//             },
//             {
//               name: "PoolKing",
//             },
//             {
//               name: "JurassicBass",
//             },
//             {
//               name: "RockNRawr",
//             },
//             {
//               name: "DJceratops",
//             },
//             {
//               name: "SkullRex",
//             },
//           ],
//         },
//         {
//           name: "Pirates",
//           skins: [
//             {
//               name: "StarFish",
//             },
//             {
//               name: "CaptainClaws",
//             },
//             {
//               name: "PufferFish",
//             },
//             {
//               name: "CorsairKrab",
//             },
//             {
//               name: "Manta",
//             },
//             {
//               name: "GoldfangShark",
//             },
//             {
//               name: "Spectre",
//             },
//           ],
//         },
//         {
//           name: "Pizza",
//           skins: [
//             {
//               name: "Pizza_C1",
//             },
//             {
//               name: "Pizza_H1",
//             },
//             {
//               name: "Pizza_P1",
//             },
//             {
//               name: "Pizza_S1",
//             },
//             {
//               name: "Pizza_Sp1",
//             },
//             {
//               name: "Pizza_V1",
//             },
//           ],
//         },
//         {
//           name: "Polaris",
//           skins: [
//             {
//               name: "Polaris_1",
//             },
//             {
//               name: "Polaris_2",
//             },
//             {
//               name: "Polaris_3",
//             },
//             {
//               name: "Polaris_4",
//             },
//             {
//               name: "Polaris_5",
//             },
//             {
//               name: "Polaris_6",
//             },
//             {
//               name: "Polaris_7",
//             },
//             {
//               name: "Polaris_8",
//             },
//             {
//               name: "Polaris_9",
//             },
//           ],
//         },
//         {
//           name: "Starfall",
//           skins: [
//             {
//               name: "Starfall_1",
//             },
//             {
//               name: "Starfall_2",
//             },
//             {
//               name: "Starfall_3",
//             },
//             {
//               name: "Starfall_4",
//             },
//             {
//               name: "Starfall_5",
//             },
//             {
//               name: "Starfall_6",
//             },
//             {
//               name: "Starfall_7",
//             },
//           ],
//         },
//         {
//           name: "Titan",
//           skins: [
//             {
//               name: "Titan_1",
//             },
//             {
//               name: "Titan_2",
//             },
//             {
//               name: "Titan_3",
//             },
//             {
//               name: "Titan_4",
//             },
//             {
//               name: "Titan_5",
//             },
//             {
//               name: "Titan_6",
//             },
//             {
//               name: "Titan_7",
//             },
//           ],
//         },
//         {
//           name: "Toxic",
//           skins: [
//             {
//               name: "Reactor",
//             },
//             {
//               name: "AtomicBomb",
//             },
//             {
//               name: "NuclearOrb",
//             },
//             {
//               name: "Poison",
//             },
//             {
//               name: "Spores",
//             },
//             {
//               name: "Skull",
//             },
//             {
//               name: "MechaBeast",
//             },
//           ],
//         },
//         {
//           name: "Winter Contest",
//           skins: [
//             {
//               name: "ChristmasBoi",
//             },
//             {
//               name: "DecorativeTrouble",
//             },
//             {
//               name: "JingleFlight",
//             },
//             {
//               name: "NesGadolHayahSham",
//             },
//             {
//               name: "ReadySetSnow",
//             },
//             {
//               name: "SnowBlade",
//             },
//             {
//               name: "Surprise",
//             },
//           ],
//         },
//       ],
//       singleSkins: [
//         {
//           name: "BubbleTrouble",
//         },
//         {
//           name: "Clockwise",
//         },
//         {
//           name: "GoldenClaw",
//         },
//         {
//           name: "Lantern",
//         },
//         {
//           name: "LunarYear",
//         },
//         {
//           name: "Police",
//         },
//         {
//           name: "Rigel",
//         },
//         {
//           name: "Sirius",
//         },
//         {
//           name: "WarMachine",
//         },
//         {
//           name: "YinYang",
//         },
//       ],
//     },
//     {
//       name: "Pryzm",
//       skinSets: [
//         {
//           name: "Celestials",
//           skins: [
//             {
//               name: "Crystalline",
//             },
//             {
//               name: "Retribution",
//             },
//             {
//               name: "DarkAlienCraft",
//             },
//             {
//               name: "GoldSyrjet",
//             },
//             {
//               name: "AstraStygian",
//             },
//             {
//               name: "MidevilSpike",
//             },
//             {
//               name: "PrismaticGod",
//             },
//           ],
//           color: "000000",
//           textColor: "00ffff",
//         },
//         {
//           name: "Cyberpunk",
//           skins: [
//             {
//               name: "Cyberpunk_1",
//             },
//             {
//               name: "Cyberpunk_2",
//             },
//             {
//               name: "Cyberpunk_3",
//             },
//             {
//               name: "Cyberpunk_4",
//             },
//             {
//               name: "Cyberpunk_5",
//             },
//             {
//               name: "Cyberpunk_6",
//             },
//             {
//               name: "Cyberpunk_7",
//             },
//           ],
//           color: "8d00ff",
//           textColor: "000000",
//         },
//         {
//           name: "Defuse",
//           skins: [
//             {
//               name: "Defuse_1",
//             },
//           ],
//           color: "0055ff",
//           textColor: "fffff",
//         },
//         {
//           name: "Elite",
//           skins: [
//             {
//               name: "AlienTrigod",
//             },
//             {
//               name: "Celestrium",
//             },
//             {
//               name: "DarkLiquid",
//             },
//             {
//               name: "FallenGoddess",
//             },
//             {
//               name: "HolyPryze",
//             },
//             {
//               name: "Stygian",
//             },
//             {
//               name: "SyonEXG",
//             },
//             {
//               name: "Syrus",
//             },
//             {
//               name: "ZotyacNine",
//             },
//           ],
//           color: "000000",
//           textColor: "e30000",
//         },
//         {
//           name: "Jade",
//           skins: [
//             {
//               name: "Jade_1",
//             },
//             {
//               name: "Jade_2",
//             },
//             {
//               name: "Jade_3",
//             },
//             {
//               name: "Jade_4",
//             },
//             {
//               name: "Jade_5",
//             },
//             {
//               name: "Jade_6",
//             },
//             {
//               name: "Jade_7",
//             },
//           ],
//           color: "00ff80",
//           textColor: "000000",
//         },
//         {
//           name: "Naruto",
//           skins: [
//             {
//               name: "6PathsLunarGod",
//             },
//             {
//               name: "Akatsuki",
//             },
//             {
//               name: "AntiSageGod",
//             },
//             {
//               name: "DivineCelestus",
//             },
//             {
//               name: "DivineSage",
//             },
//             {
//               name: "MoonSage",
//             },
//             {
//               name: "NarutoGod",
//             },
//             {
//               name: "ParadigmGod",
//             },
//             {
//               name: "SageObito",
//             },
//             {
//               name: "SageOf6Paths",
//             },
//             {
//               name: "SasukeGod",
//             },
//           ],
//           color: "fcba21",
//           textColor: "082c8c",
//         },
//         {
//           name: "Rank Skins",
//           skins: [
//             {
//               name: "Bronze",
//             },
//             {
//               name: "Silver",
//             },
//             {
//               name: "Gold",
//             },
//             {
//               name: "Platinum",
//             },
//             {
//               name: "Diamond",
//             },
//             {
//               name: "Champion",
//             },
//             {
//               name: "Grandmaster",
//             },
//             {
//               name: "Legend",
//             },
//             {
//               name: "God",
//             },
//           ],
//           color: "000000",
//           textColor: "ffffff",
//         },
//         {
//           name: "Special",
//           skins: [
//             {
//               name: "AggressorIX",
//             },
//             {
//               name: "Annihilator",
//             },
//             {
//               name: "BladedGod",
//             },
//             {
//               name: "ChromaticGod",
//             },
//             {
//               name: "Combat",
//             },
//             {
//               name: "DarkCyber",
//             },
//             {
//               name: "DarkDeity",
//             },
//             {
//               name: "DarkGod",
//             },
//             {
//               name: "DarkObsidian",
//             },
//             {
//               name: "Deity_Phantom",
//             },
//             {
//               name: "DivineAlien",
//             },
//             {
//               name: "DivineDarkGod",
//             },
//             {
//               name: "EliteAlien",
//             },
//             {
//               name: "EternalFlame",
//             },
//             {
//               name: "EternalSpectr",
//             },
//             {
//               name: "Exotion",
//             },
//             {
//               name: "GhostlySpirit",
//             },
//             {
//               name: "GlitchedGod",
//             },
//             {
//               name: "GoldenDefault",
//             },
//             {
//               name: "GoldenKing",
//             },
//             {
//               name: "HeavenAndEarth",
//             },
//             {
//               name: "HolyGhost",
//             },
//             {
//               name: "KingXGold",
//             },
//             {
//               name: "Legon",
//             },
//             {
//               name: "LoneSamurai",
//             },
//             {
//               name: "Nagato",
//             },
//             {
//               name: "ProdigyV1",
//             },
//             {
//               name: "S2Remake",
//             },
//             {
//               name: "S3Split",
//             },
//             {
//               name: "SolsticeDeity",
//             },
//             {
//               name: "SplitColorGod",
//             },
//             {
//               name: "ValarionAurum",
//             },
//             {
//               name: "Vesperos",
//             },
//             {
//               name: "Vesryn",
//             },
//             {
//               name: "WarGod",
//             },
//             {
//               name: "WhiteGoddess",
//             },
//           ],
//           color: "00ffff",
//           textColor: "000000",
//         },
//         {
//           name: "Spirit",
//           skins: [
//             {
//               name: "Spirit_1",
//             },
//             {
//               name: "Spirit_2",
//             },
//             {
//               name: "Spirit_3",
//             },
//             {
//               name: "Spirit_4",
//             },
//             {
//               name: "Spirit_5",
//             },
//             {
//               name: "Spirit_6",
//             },
//             {
//               name: "Spirit_7",
//             },
//           ],
//           color: "f0f0f0",
//           textColor: "000000",
//         },
//         {
//           name: "The Retribution",
//           skins: [
//             {
//               name: "Arrow_VXL",
//             },
//             {
//               name: "XRV_Pharxon",
//             },
//             {
//               name: "Klytus_IX_VXR-36",
//             },
//             {
//               name: "STRZ_Cyphoixd",
//             },
//             {
//               name: "Nexus_XR-32",
//             },
//             {
//               name: "SVX_Tarnxit",
//             },
//             {
//               name: "Nexus_VIII_XR-47",
//             },
//           ],
//           color: "d90000",
//           textColor: "000000",
//         },
//       ],
//       singleSkins: [
//         {
//           name: "AngelGod",
//         },
//         {
//           name: "AntiGodSkin",
//         },
//         {
//           name: "AntiTribladeGod",
//         },
//         {
//           name: "Atomic",
//         },
//         {
//           name: "BrokenGoddess",
//         },
//         {
//           name: "BrokenWarrior",
//         },
//         {
//           name: "DarkAngel",
//         },
//         {
//           name: "DivineGoldKing",
//         },
//         {
//           name: "ElementsGod",
//         },
//         {
//           name: "EvilSmile",
//         },
//         {
//           name: "Evolution",
//         },
//         {
//           name: "Hellicopter",
//         },
//         {
//           name: "PaperGod",
//         },
//         {
//           name: "SpaceTrydent",
//         },
//         {
//           name: "StarGod",
//         },
//         {
//           name: "Surprize",
//         },
//         {
//           name: "TheOmega2",
//         },
//         {
//           name: "TribladeGod",
//         },
//       ],
//     },
//     {
//       name: "Risky Player 13",
//       skinSets: [
//         {
//           name: "Harp",
//           skins: [
//             {
//               name: "Harp_1",
//             },
//             {
//               name: "Harp_2",
//             },
//             {
//               name: "Harp_3",
//             },
//             {
//               name: "Harp_4",
//             },
//             {
//               name: "Harp_5",
//             },
//             {
//               name: "Harp_6",
//             },
//             {
//               name: "Harp_7",
//             },
//           ],
//         },
//       ],
//       singleSkins: [
//         {
//           name: "DipsiAngler",
//         },
//         {
//           name: "DipsiRay",
//         },
//         {
//           name: "DipsiWorm",
//         },
//         {
//           name: "Mothership",
//         },
//         {
//           name: "PartyBeast",
//         },
//         {
//           name: "Rainbow",
//         },
//         {
//           name: "Tomcat",
//         },
//       ],
//     },
//     {
//       name: "VAIN",
//       skinSets: [
//         {
//           name: "Science",
//           skins: [
//             {
//               name: "Fullerene",
//             },
//             {
//               name: "Virus",
//             },
//             {
//               name: "Lightbulb",
//             },
//             {
//               name: "Satellite",
//             },
//             {
//               name: "Magnet",
//             },
//             {
//               name: "Plasma",
//             },
//             {
//               name: "Atom",
//             },
//           ],
//         },
//       ],
//       singleSkins: [],
//     },
//   ],
//   inGame: [
//     {
//       name: "Holidays",
//       skins: [
//         {
//           name: 68,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 64,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 65,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 66,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 67,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 69,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 70,
//           isFinal: true,
//           price: 10000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Helicopter",
//       skins: [
//         {
//           name: 1,
//           isFinal: false,
//           price: 0,
//         },
//         {
//           name: 3,
//           isFinal: false,
//           price: 0,
//         },
//         {
//           name: 4,
//           isFinal: false,
//           price: "link",
//         },
//         {
//           name: 5,
//           isFinal: false,
//           price: "link",
//         },
//         {
//           name: 6,
//           isFinal: false,
//           price: "link",
//         },
//         {
//           name: 21,
//           isFinal: false,
//           price: 7500,
//         },
//         {
//           name: 26,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Drone",
//       skins: [
//         {
//           name: 2,
//           isFinal: false,
//           price: "link",
//         },
//         {
//           name: 7,
//           isFinal: false,
//           price: "sign-up",
//         },
//         {
//           name: 14,
//           isFinal: false,
//           price: 1000,
//         },
//         {
//           name: 18,
//           isFinal: false,
//           price: 1000,
//         },
//         {
//           name: 19,
//           isFinal: false,
//           price: 2000,
//         },
//         {
//           name: 12,
//           isFinal: false,
//           price: 2000,
//         },
//         {
//           name: 27,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Gyrocopter",
//       skins: [
//         {
//           name: 8,
//           isFinal: false,
//           price: "link",
//         },
//         {
//           name: 9,
//           isFinal: false,
//           price: 500,
//         },
//         {
//           name: 10,
//           isFinal: false,
//           price: 500,
//         },
//         {
//           name: 13,
//           isFinal: false,
//           price: 1000,
//         },
//         {
//           name: 11,
//           isFinal: false,
//           price: 2000,
//         },
//         {
//           name: 20,
//           isFinal: false,
//           price: 7500,
//         },
//         {
//           name: 28,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "UFO",
//       skins: [
//         {
//           name: 15,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 29,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 24,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 25,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 30,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 31,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 32,
//           isFinal: true,
//           price: 30000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Space",
//       skins: [
//         {
//           name: 17,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 40,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 41,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 42,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 43,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 44,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 45,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Jet",
//       skins: [
//         {
//           name: 33,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 34,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 35,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 36,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 37,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 38,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 39,
//           isFinal: true,
//           price: 30000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Beast",
//       skins: [
//         {
//           name: 16,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 46,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 47,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 23,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 48,
//           isFinal: false,
//           price: 25000,
//         },
//         {
//           name: 22,
//           isFinal: false,
//           price: 25000,
//         },
//         {
//           name: 49,
//           isFinal: true,
//           price: 30000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Blades",
//       skins: [
//         {
//           name: 50,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 51,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 52,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 53,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 54,
//           isFinal: false,
//           price: 15000,
//         },
//         {
//           name: 55,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 56,
//           isFinal: true,
//           price: 25000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Mythical",
//       skins: [
//         {
//           name: 57,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 58,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 59,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 60,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 61,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 62,
//           isFinal: false,
//           price: 20000,
//         },
//         {
//           name: 63,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Insects",
//       skins: [
//         {
//           name: 89,
//           isFinal: false,
//           price: 2000,
//         },
//         {
//           name: 90,
//           isFinal: false,
//           price: 3000,
//         },
//         {
//           name: 91,
//           isFinal: false,
//           price: 4000,
//         },
//         {
//           name: 92,
//           isFinal: false,
//           price: 6000,
//         },
//         {
//           name: 93,
//           isFinal: false,
//           price: 8000,
//         },
//         {
//           name: 94,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 95,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Astrorace.io",
//       skins: [
//         {
//           name: 107,
//           isFinal: false,
//           price: 500,
//         },
//         {
//           name: 108,
//           isFinal: false,
//           price: 1000,
//         },
//         {
//           name: 109,
//           isFinal: false,
//           price: 2000,
//         },
//         {
//           name: 110,
//           isFinal: false,
//           price: 2000,
//         },
//         {
//           name: 111,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 112,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 113,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Crystals",
//       skins: [
//         {
//           name: 122,
//           isFinal: false,
//           price: 3000,
//         },
//         {
//           name: 123,
//           isFinal: false,
//           price: 3000,
//         },
//         {
//           name: 124,
//           isFinal: false,
//           price: 3000,
//         },
//         {
//           name: 125,
//           isFinal: false,
//           price: 5000,
//         },
//         {
//           name: 126,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 127,
//           isFinal: false,
//           price: 10000,
//         },
//         {
//           name: 128,
//           isFinal: true,
//           price: 20000,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Premium",
//       skins: [
//         {
//           name: 81,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 82,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 84,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 85,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 86,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 87,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 88,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 100,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 101,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 102,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 103,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 104,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 105,
//           isFinal: false,
//           price: "premium",
//         },
//         {
//           name: 106,
//           isFinal: false,
//           price: "premium",
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Elite",
//       skins: [
//         {
//           name: 71,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 79,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 96,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 97,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 98,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 99,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 136,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 137,
//           isFinal: false,
//           price: "elite",
//         },
//         {
//           name: 138,
//           isFinal: false,
//         },
//       ],
//       inGame: true,
//     },
//     {
//       name: "Creeper",
//       skins: [
//         {
//           name: 72,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 73,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 74,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 75,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 76,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 77,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 78,
//           isFinal: true,
//           price: "tournament",
//         },
//       ],
//       inGame: false,
//     },
//     {
//       name: "Star Wars",
//       skins: [
//         {
//           name: 114,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 115,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 116,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 117,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 118,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 119,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 120,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 121,
//           isFinal: false,
//           price: "tournament",
//         },
//       ],
//       inGame: false,
//     },
//     {
//       name: "Paper",
//       skins: [
//         {
//           name: 130,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 131,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 132,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 133,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 134,
//           isFinal: false,
//           price: "tournament",
//         },
//         {
//           name: 135,
//           isFinal: false,
//           price: "tournament",
//         },
//       ],
//       inGame: false,
//     },
//     {
//       name: "Other",
//       skins: [
//         {
//           name: 129,
//           isFinal: false,
//           price: "tournament",
//         },
//       ],
//       inGame: false,
//     },
//     {
//       name: "Deleted",
//       skins: [
//         {
//           name: 80,
//           isFinal: false,
//           price: "deleted",
//         },
//       ],
//       inGame: false,
//     },
//   ],
// };

// //in-game select load
// let setIndex = -1,
//   nameIndex = -1;
// loadSelect(
//   "tab-in-game-select-set",
//   monsterJson.inGame,
//   "name",
//   (elm) => {
//     console.log(
//       parseInt(document.getElementById("tab-in-game-select-set").value)
//     );
//     nameIndex = -1;
//     loadSelect(
//       "tab-in-game-select-name",
//       monsterJson.inGame[
//         parseInt(document.getElementById("tab-in-game-select-set").value)
//       ].skins,
//       "name",
//       () => {},
//       (e) => {
//         nameIndex++;
//         return nameIndex;
//       }
//     );
//   },
//   (e) => {
//     nameIndex++;
//     return nameIndex;
//   }
// );
// setIndex = -1;
// nameIndex = -1;
// loadSelect(
//   "tab-in-game-select-name",
//   monsterJson.inGame[0].skins,
//   "name",
//   () => {},
//   (e) => {
//     setIndex++;
//     return setIndex;
//   }
// );

// //custom select load
// let customIndex = -1;
// setIndex = -1;
// nameIndex = -1;
// loadSelect(
//   "tab-custom-select-creator",
//   monsterJson.custom,
//   "name",
//   () => {
//     setIndex = -1;
//     loadSelect(
//       "tab-custom-select-set",
//       monsterJson.custom[
//         parseInt(document.getElementById("tab-custom-select-creator").value)
//       ].skinSets,
//       "name",
//       () => {
//         console.log(
//           parseInt(document.getElementById("tab-custom-select-set").value),
//           monsterJson.custom[
//             parseInt(document.getElementById("tab-custom-select-creator").value)
//           ].skinSets
//         );
//         nameIndex = -1;
//         loadSelect(
//           "tab-custom-select-name",
//           monsterJson.custom[
//             parseInt(document.getElementById("tab-custom-select-creator").value)
//           ].skinSets[
//             parseInt(document.getElementById("tab-custom-select-set").value)
//           ].skins,
//           "name",
//           () => {},
//           (e) => {
//             nameIndex++;
//             return nameIndex;
//           }
//         );
//       },
//       (e) => {
//         setIndex++;
//         return setIndex;
//       }
//     );
//   },
//   (e) => {
//     customIndex++;
//     return customIndex;
//   }
// );

// loadSelect(
//   "tab-custom-select-set",
//   monsterJson.custom[1].skinSets,
//   "name",
//   () => {
//     console.log(
//       parseInt(document.getElementById("tab-custom-select-set").value),
//       monsterJson.custom[
//         parseInt(document.getElementById("tab-custom-select-creator").value)
//       ].skinSets
//     );
//     nameIndex = -1;
//     loadSelect(
//       "tab-custom-select-name",
//       monsterJson.custom[
//         parseInt(document.getElementById("tab-custom-select-creator").value)
//       ].skinSets[
//         parseInt(document.getElementById("tab-custom-select-set").value)
//       ].skins,
//       "name",
//       () => {},
//       (e) => {
//         nameIndex++;
//         return nameIndex;
//       }
//     );
//   },
//   (e) => {
//     setIndex++;
//     return setIndex;
//   }
// );

// nameIndex = -1;
// loadSelect(
//   "tab-custom-select-name",
//   monsterJson.custom[1].skinSets[1].skins,
//   "name",
//   () => {},
//   (e) => {
//     nameIndex++;
//     return nameIndex;
//   }
// );

// document.getElementById("in-game-monster-import").onclick = () => {
//   const set =
//       monsterJson.inGame[
//         parseInt(document.getElementById("tab-in-game-select-set").value)
//       ],
//     name =
//       set.skins[
//         parseInt(document.getElementById("tab-in-game-select-name").value)
//       ].name;
//   fetch(`https://skins.defly.monster/skin/inGame/${set.name}/${name}`)
//     .then((e) => e.json())
//     .then((skin) => {
//       settings.config.skins.push({
//         name: prompt("Enter a Name For This Skin", name),
//         JSON: skin,
//       });
//       settings.save();
//       deflyMonsterImportPopup.hide();
//     });
// };

// function hideTabs() {
//   Array.from(document.getElementsByClassName("customTab")).forEach(
//     (element) => {
//       element.style.display = "none";
//     }
//   );
//   Array.from(document.getElementsByClassName("selectedButton")).forEach(
//     (element) => {
//       element.classList.remove("selectedButton");
//     }
//   );
// }

// document.getElementById("in-game-monster").onclick = () => {
//   hideTabs();
//   document.getElementById("tab-in-game").style.display = "block";
//   document.getElementById("in-game-monster").classList.add("selectedButton");
// };
// document.getElementById("custom-monster").onclick = () => {
//   hideTabs();
//   document.getElementById("tab-custom").style.display = "block";
//   document.getElementById("custom-monster").classList.add("selectedButton");
// };
// document.getElementById("custom-single-skin-monster").onclick = () => {
//   hideTabs();
//   document.getElementById("tab-custom-single-skin").style.display = "block";
//   document
//     .getElementById("custom-single-skin-monster")
//     .classList.add("selectedButton");
// };

// document.querySelector("#deflyMonsterImport").onclick = () => {
//   deflyMonsterImportPopup.show();
// };
// // deflyMonsterImportPopup.show();
