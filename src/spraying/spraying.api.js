/* eslint-disable array-callback-return */

import {dispatch} from 'store'
import {onEntry} from 'statechart'
import {sprayingEvents, sprayingStates} from 'spraying/spraying.statechart'
import {CampaignDescription} from 'spraying/classes/CampaignDescription'
import {CampaignSummary, WeedInfestationSummary, SectorQuantity, ChemicalSummary} from 'spraying/classes/CampaignSummary'

const data = [
  '100;50,4044472;4,436020651;N;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0;0;0;0;0;0;0;0;0;0;0; ; ;Vival;0;0;0;0;0;0;0;0;0;0;0; ; ;Genoxone;0;0;0;0;0;0;0;0;0;0;0; ; ;0,028;0;0,76;0,02;0,04;0,18;0,11;0,13;0,27;0,63;1,2;3,35',
  '200;50,40485611;4,434135596;N;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0;0;0;0;0;0;0;0;0;0;0; ; ;Vival;0;0;0;0;0;0;0;0;0;0;0; ; ;Genoxone;0;0;0;0;0;0;0;0;0;0;0; ; ;0;0;0,1;0,49;0,59;0,69;0,28;0,04;0,1;0,41;0,88;2,33',
  '300;50,40516387;4,432812195;N;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0;0;0;0;0;0;0;0;0;0;0; ; ;Vival;0;0;0;0;0;0;0;0;0;0;0; ; ;Genoxone;0;0;0;0;0;0;0;0;0;0;0; ; ;0;0;0,14;1,22;1,12;1,11;0,23;0,02;0,16;0,49;0,91;0,92',
  '400;50,40547594;4,431514996;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,017;5;0;0,002;0,002;0;0;0;0;0,001;0,012; ;Y;Vival;0,003;0,4;0;0,001;0,001;0;0;0;0;0;0,001;Y; ;Genoxone;0,016;4,6;0;0,002;0,002;0;0;0;0;0,001;0,011; ;Y;1,813;250;0,02;0,55;0,67;0,41;0,01;0,01;0,03;0,21;0,77;1,01',
  '500;50,40581201;4,430210498;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,009;5;0,005;0;0;0;0;0;0;0,001;0,003;Y; ;Vival;0;0,4;0;0;0;0;0;0;0;0;0; ; ;Genoxone;0,008;4,6;0,004;0;0;0;0;0;0;0,001;0,003; ; ;1,318;250;0;0,72;0,38;0,3;0,17;0;0,09;0,61;1,08;1,09',
  '600;50,40618926;4,428940725;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,006;5;0,005;0;0;0;0;0;0;0;0,001;Y; ;Vival;0;0,4;0;0;0;0;0;0;0;0;0; ; ;Genoxone;0,006;4,6;0,005;0;0;0;0;0;0;0;0,001;Y; ;0,249;250;0;0,9;0,61;0,18;0,05;0;0,03;0,23;0,47;0,76',
  '700;50,40646043;4,427600428;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,023;5;0,021;0;0;0;0,002;0;0;0;0;Y; ;Vival;0,002;0,4;0,002;0;0;0;0;0;0;0;0;Y; ;Genoxone;0,022;4,6;0,02;0;0;0;0,002;0;0;0;0;Y; ;2,733;250;0,16;1,02;0,34;0,09;0,07;0,08;0,06;0,79;0,95;0,93',
  '800;50,40662942;4,426225625;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,039;5;0,023;0,001;0,001;0,002;0,012;0;0;0;0;Y; ;Vival;0,003;0,4;0,002;0;0;0;0,001;0;0;0;0;Y; ;Genoxone;0,036;4,6;0,021;0,001;0,001;0,002;0,011;0;0;0;0;Y; ;6,251;250;0,01;1,07;0,52;0,26;0,21;0,34;0,25;0,93;0,69;0,88',
  '900;50,40674876;4,424837732;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,055;5;0,046;0,001;0;0,002;0,005;0,001;0;0;0;Y; ;Vival;0,005;0,4;0,004;0,001;0;0;0;0;0;0;0;Y; ;Genoxone;0,05;4,6;0,042;0,001;0;0,002;0,004;0,001;0;0;0;Y; ;5,645;250;0,1;1,15;0,7;0,09;0,14;0,1;0,13;0,23;0,21;0,1',
  '1000;50,40686548;4,423440307;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,067;5;0,058;0,005;0,003;0,001;0;0;0;0;0;Y; ;Vival;0,012;0,4;0,005;0,004;0,003;0;0;0;0;0;0;Y; ;Genoxone;0,061;4,6;0,053;0,004;0,003;0,001;0;0;0;0;0;Y; ;5,085;250;0,02;1,6;1,04;0,18;0,09;0,03;0,01;0,32;0,42;0,15',
  '1100;50,40698149;4,422052935;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,036;5;0,033;0,001;0;0,002;0;0;0;0;0;Y; ;Vival;0,004;0,4;0,003;0,001;0;0;0;0;0;0;0;Y; ;Genoxone;0,033;4,6;0,03;0,001;0;0,002;0;0;0;0;0;Y; ;3,532;250;0,42;1,04;0,49;0,02;0,09;0,03;0,02;0,53;0,62;0,48',
  '1200;50,40711263;4,420651048;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,088;5;0,041;0,015;0,011;0,008;0,007;0,006;0;0;0;Y; ;Vival;0,06;0,4;0,003;0,031;0,024;0,001;0,001;0;0;0;0;Y; ;Genoxone;0,08;4,6;0,038;0,013;0,01;0,007;0,006;0,006;0;0;0;Y; ;5,113;250;0,93;3,92;4,02;4,35;0,49;0,27;0,37;1,03;0,48;0,67',
  '1300;50,40721373;4,419273005;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,075;5;0,041;0,01;0,012;0,008;0,002;0,002;0;0;0;Y; ;Vival;0,051;0,4;0,003;0,021;0,026;0,001;0;0;0;0;0;Y; ;Genoxone;0,069;4,6;0,038;0,009;0,011;0,007;0,002;0,002;0;0;0;Y; ;7,063;250;0;1,2;1,45;0,67;0,2;0,08;0,08;0,54;0,81;0,54',
  '1400;50,40733031;4,417879677;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,004;5;0,004;0;0;0;0;0;0;0;0;Y; ;Vival;0;0,4;0;0;0;0;0;0;0;0;0; ; ;Genoxone;0,003;4,6;0,003;0;0;0;0;0;0;0;0;Y; ;1,292;250;0,24;0,87;0,1;0,08;0;0;0,04;0,33;0,57;0,61',
  '1500;50,40744566;4,416491857;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,042;5;0,013;0;0;0;0,013;0,016;0;0;0; ;Y;Vival;0,003;0,4;0,001;0;0;0;0,001;0,001;0;0;0; ; ;Genoxone;0,039;4,6;0,012;0;0;0;0,012;0,015;0;0;0; ;Y;3,613;250;0,34;1;0,28;0,06;0;0,21;0,87;1,87;2,19;0,9',
  '1600;50,4075654;4,415095614;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,078;5;0,003;0;0;0;0,061;0,014;0;0;0; ;Y;Vival;0,006;0,4;0;0;0;0;0,005;0,001;0;0;0; ;Y;Genoxone;0,071;4,6;0,002;0;0;0;0,056;0,013;0;0;0; ;Y;4,697;250;0,28;0,97;1;0,06;0,01;1,28;0,83;1,15;0,84;1,81',
  '1700;50,40770246;4,413707985;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,053;5;0,013;0,005;0;0;0,028;0,007;0;0;0;Y; ;Vival;0,004;0,4;0,001;0;0;0;0,002;0,001;0;0;0; ; ;Genoxone;0,05;4,6;0,012;0,005;0;0;0,026;0,007;0;0;0;Y; ;4,768;250;0,52;0,3;1,33;0,17;0,02;0,25;0,1;0,33;0,66;0,81',
  '1800;50,40783796;4,412328688;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,072;5;0,026;0,03;0,014;0,001;0;0,001;0;0;0;Y; ;Vival;0,005;0,4;0,002;0,002;0,001;0;0;0;0;0;0;Y; ;Genoxone;0,066;4,6;0,024;0,027;0,013;0,001;0;0,001;0;0;0;Y; ;4,924;250;0,47;1,68;6,31;2;0,1;0,05;0,26;0,69;0,69;0,75',
  '1900;50,40797759;4,410946414;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,048;5;0,003;0,012;0,012;0,004;0,001;0,016;0;0;0;Y; ;Vival;0,003;0,4;0;0,001;0,001;0;0;0,001;0;0;0;Y; ;Genoxone;0,045;4,6;0,003;0,011;0,011;0,004;0,001;0,015;0;0;0;Y; ;5,296;250;0,1;0,62;1,98;1,11;0,34;0,05;0,57;0,89;0,97;0,63',
  '2000;50,40811215;4,409569722;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,026;5;0,007;0,004;0,001;0,006;0;0,008;0;0;0;Y; ;Vival;0,002;0,4;0,001;0;0;0;0;0,001;0;0;0; ; ;Genoxone;0,025;4,6;0,007;0,004;0,001;0,005;0;0,008;0;0;0;Y; ;3,065;250;0,09;0,36;1,14;0,08;0,25;0,01;0,45;0,66;0,82;0,55',
  '2100;50,40823384;4,408170796;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,05;5;0,039;0,008;0;0;0;0,003;0;0;0;Y; ;Vival;0,004;0,4;0,003;0,001;0;0;0;0;0;0;0;Y; ;Genoxone;0,047;4,6;0,036;0,008;0;0;0;0,003;0;0;0;Y; ;3,711;250;0,17;1,82;0,46;0,1;0,04;0,02;0,08;0,56;0,77;0,87',
  '2200;50,40834262;4,406776489;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,013;5;0,004;0,001;0;0;0;0,008;0;0;0; ;Y;Vival;0,001;0,4;0;0;0;0;0;0,001;0;0;0; ;Y;Genoxone;0,011;4,6;0,003;0,001;0;0;0;0,007;0;0;0; ;Y;2,478;250;0,16;1,19;0,21;0,03;0,01;0;0,6;1,1;0,79;0,31',
  '2300;50,40846551;4,40538853;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,036;5;0,014;0,008;0;0,002;0,006;0,006;0;0;0;Y; ;Vival;0,018;0,4;0,001;0,017;0;0;0;0;0;0;0;Y; ;Genoxone;0,034;4,6;0,013;0,008;0;0,002;0,006;0,005;0;0;0;Y; ;4,102;250;0,28;1,45;2,06;0,02;0,04;0,08;0,05;0,12;0,25;0,15',
  '2400;50,4086309;4,404009063;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,08;5;0,051;0,018;0,008;0,001;0,002;0;0;0;0;Y; ;Vival;0,007;0,4;0,004;0,002;0,001;0;0;0;0;0;0;Y; ;Genoxone;0,074;4,6;0,047;0,017;0,007;0,001;0,002;0;0;0;0;Y; ;6,004;250;1,94;7,09;2,59;1,29;0,16;0,06;0,06;0,26;0,43;0,19',
  '2500;50,40885326;4,402654988;Y;Kyleo;0;0;0;0;0;0;0;0;0;0;0; ; ;Panic Free;0,118;5;0,055;0,018;0,008;0;0,034;0,003;0;0;0;Y; ;Vival;0,009;0,4;0,004;0,001;0,001;0;0,003;0;0;0;0;Y; ;Genoxone;0,108;4,6;0,05;0,016;0,007;0;0,032;0,003;0;0;0;Y; ;7,432;250;4,63;14,38;3,1;0,62;0,21;0,88;0,19;0,26;0,25;0,04',
]

const campaignDescription = new CampaignDescription(
  '100 m summarized data',
  'Belgium second campaign 2017',
  'Charleroi-Sud - Brussels-Zuid',
  new Date(2017, 8, 14),
  '55,183 km',
)

const chemical1Summary = new ChemicalSummary(
  1,
  4.696,
  [
    new SectorQuantity(1, 123.123),
    new SectorQuantity(2, 123.123),
    new SectorQuantity(3, 123.123),
    new SectorQuantity(4, 123.123),
    new SectorQuantity(5, 123.123),
    new SectorQuantity(6, 123.123),
    new SectorQuantity(7, 123.123),
    new SectorQuantity(8, 123.123),
    new SectorQuantity(9, 123.123),
  ],
)

const chemical2Summary = new ChemicalSummary(
  2,
  4.696,
  [
    new SectorQuantity(1, 123.123),
    new SectorQuantity(2, 123.123),
    new SectorQuantity(3, 123.123),
    new SectorQuantity(4, 123.123),
    new SectorQuantity(5, 123.123),
    new SectorQuantity(6, 123.123),
    new SectorQuantity(7, 123.123),
    new SectorQuantity(8, 123.123),
    new SectorQuantity(9, 123.123),
  ],
)

const chemical3Summary = new ChemicalSummary(
  3,
  46.544,
  [
    new SectorQuantity(1, 123.123),
    new SectorQuantity(2, 123.123),
    new SectorQuantity(3, 123.123),
    new SectorQuantity(4, 123.123),
    new SectorQuantity(5, 123.123),
    new SectorQuantity(6, 123.123),
    new SectorQuantity(7, 123.123),
    new SectorQuantity(8, 123.123),
    new SectorQuantity(9, 123.123),
  ],
)

const chemical4Summary = new ChemicalSummary(
  4,
  42.861,
  [
    new SectorQuantity(1, 123.123),
    new SectorQuantity(2, 123.123),
    new SectorQuantity(3, 123.123),
    new SectorQuantity(4, 123.123),
    new SectorQuantity(5, 123.123),
    new SectorQuantity(6, 123.123),
    new SectorQuantity(7, 123.123),
    new SectorQuantity(8, 123.123),
    new SectorQuantity(9, 123.123),
  ],
)

const campaignSummary = new CampaignSummary(
  4.696,
  new WeedInfestationSummary(
    3.56,
    [
      new SectorQuantity(1, 21.62),
      new SectorQuantity(2, 6.31),
      new SectorQuantity(3, 1.59),
      new SectorQuantity(4, 0.5),
      new SectorQuantity(5, 0.22),
      new SectorQuantity(6, 0.25),
      new SectorQuantity(7, 0.3),
      new SectorQuantity(8, 0.54),
      new SectorQuantity(9, 0.54),
    ],
  ),
  [
    chemical1Summary,
    chemical2Summary,
    chemical3Summary,
    chemical4Summary,
  ],
)

const formatNumber = original => {
  const i = original.indexOf(',')
  return i > 0 ? Number(original.substr(0, i) + '.' + original.substr(i + 1)) : Number(original)
}

const formatSprayed = original => {
  if(original === 'Y') return 1
  else if(original === 'N') return 0
}

const formatMajority = original => {
  if(original === 'Y') return 1
  else return 0
}

const getSections = () => data.map((row, index) => {
  const v = row.split(';')

  const chemicals = []
  const sectors = []

  const chemicalArray = [1, 2, 3, 4]
  const sectorArray = [1, 2, 3, 4, 5, 6, 7, 8, 9]

  chemicalArray.map(c => {
    const startId = 14 * (c - 0.5)
    const chemicalSectors = []

    sectorArray.map(s => {
      chemicalSectors.push({
        id: s,
        dosage: formatNumber(v[startId + s - 1]),
      })
    })

    chemicals.push({
      id: c,
      quantity: formatNumber(v[startId - 2]),
      dosage: formatNumber(v[startId - 1]),
      leftNozzleMajority: formatMajority(v[startId + 9]),
      rightNozzleMajority: formatMajority(v[startId + 10]),
      sectors: chemicalSectors,
    })
  })

  sectorArray.map(c => {
    sectors.push({
      id: c,
      weedInfestation: formatNumber(v[62 + c])
    })
  })

  return {
    id: index + 1,
    distance: Number(v[0]),
    position: {
      lat: formatNumber(v[1]),
      lon: formatNumber(v[2]),
    },
    sprayed: formatSprayed(v[3]),
    water: formatNumber(v[60]),
    waterDosage: formatNumber(v[61]),
    weedInfestation: formatNumber(v[62]),
    chemicals: chemicals,
    sectors: sectors,
  }
})

export const sprayingApi = action => {
  switch(action.type) {
    // LOADING
    case onEntry(sprayingStates.LOADING):
      setTimeout(() => {
        const sections = getSections()

        dispatch({
          type: sprayingEvents.SECTIONS_LOADED,
          sections,
          campaignDescription,
          campaignSummary,
        })
      }, 300)
      break

    default:
      break
  }
}
