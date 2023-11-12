<?php

namespace Database\Seeders;

use App\Models\Local\TabHot60UrbanaRuralLocal;
use Illuminate\Database\Seeder;

class TabHot60UrbanaRuralLocalSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    TabHot60UrbanaRuralLocal::truncate();
    foreach ($this->data() as $tabSantaMaria) {
      TabHot60UrbanaRuralLocal::create($tabSantaMaria);
    }
  }

  function data(): array
  {
    return [
      [
        'puntos' => '1',
        'valor' => '2438.157411265720',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '2',
        'valor' => '6635.567540081010',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '3',
        'valor' => '11918.711939584600',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '4',
        'valor' => '18059.029484941700',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '5',
        'valor' => '24927.228847638200',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '6',
        'valor' => '32437.371639933000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '7',
        'valor' => '40527.098670340700',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '8',
        'valor' => '49148.553453501700',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '9',
        'valor' => '58263.545102713600',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '10',
        'valor' => '67840.702097938700',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '11',
        'valor' => '77853.673935657500',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '12',
        'valor' => '88279.931945717200',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '13',
        'valor' => '99099.935067962500',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '14',
        'valor' => '110296.529333177000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '15',
        'valor' => '121854.503205709000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '16',
        'valor' => '133760.250437928000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '17',
        'valor' => '146001.509225620000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '18',
        'valor' => '158567.156848544000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '19',
        'valor' => '171447.045518629000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '20',
        'valor' => '184631.869401613000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '21',
        'valor' => '198113.055607905000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '22',
        'valor' => '211882.673881714000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '23',
        'valor' => '225933.361066522000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '24',
        'valor' => '240258.257384400000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '25',
        'valor' => '254850.952260690000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '26',
        'valor' => '269705.437935500000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '27',
        'valor' => '284816.069483282000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '28',
        'valor' => '300177.530148425000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '29',
        'valor' => '315784.801123652000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '30',
        'valor' => '331633.135066840000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '31',
        'valor' => '347718.032783564000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '32',
        'valor' => '364035.222606177000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '33',
        'valor' => '380580.642082389000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '34',
        'valor' => '397350.421651991000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '35',
        'valor' => '414340.870043316000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '36',
        'valor' => '431548.461163921000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '37',
        'valor' => '448969.822295070000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '38',
        'valor' => '466601.723428356000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '39',
        'valor' => '484441.067606629000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '40',
        'valor' => '502484.882151153000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '41',
        'valor' => '520730.310673406000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '42',
        'valor' => '539174.605783813000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '43',
        'valor' => '557815.122421357000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '44',
        'valor' => '576649.311737913000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '45',
        'valor' => '595674.715479536000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '46',
        'valor' => '614888.960814117000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '47',
        'valor' => '634289.755560961000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '48',
        'valor' => '653874.883783129000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '49',
        'valor' => '673642.201707923000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '50',
        'valor' => '693589.633944871000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '51',
        'valor' => '713715.169973951000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '52',
        'valor' => '734016.860879822000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '53',
        'valor' => '754492.816310382000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '54',
        'valor' => '775141.201640302000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '55',
        'valor' => '795960.235322163000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '56',
        'valor' => '816948.186409568000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '57',
        'valor' => '838103.372238207000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '58',
        'valor' => '859424.156252179000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '59',
        'valor' => '880908.945964113000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '60',
        'valor' => '902556.191038721000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '61',
        'valor' => '924364.381490381000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '62',
        'valor' => '946332.045986171000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '63',
        'valor' => '968457.750246618000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '64',
        'valor' => '990740.095537027000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '65',
        'valor' => '1013177.717242950000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '66',
        'valor' => '1035769.283523860000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '67',
        'valor' => '1058513.494039610000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '68',
        'valor' => '1081409.078744710000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '69',
        'valor' => '1104454.796745920000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '70',
        'valor' => '1127649.435218810000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '71',
        'valor' => '1150991.808379660000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '72',
        'valor' => '1174480.756508930000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '73',
        'valor' => '1198115.145023130000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '74',
        'valor' => '1221893.863592070000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '75',
        'valor' => '1245815.825298630000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '76',
        'valor' => '1269879.965838520000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '77',
        'valor' => '1294085.242757550000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '78',
        'valor' => '1318430.634724260000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '79',
        'valor' => '1342915.140835820000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '80',
        'valor' => '1367537.779955190000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '81',
        'valor' => '1392297.590077940000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '82',
        'valor' => '1417193.627726840000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '83',
        'valor' => '1442224.967372830000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '84',
        'valor' => '1467390.700880850000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '85',
        'valor' => '1492689.936979200000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '86',
        'valor' => '1518121.800751140000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '87',
        'valor' => '1543685.433147620000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '88',
        'valor' => '1569379.990519870000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '89',
        'valor' => '1595204.644171040000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '90',
        'valor' => '1621158.579925760000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '91',
        'valor' => '1647240.997716680000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '92',
        'valor' => '1673451.111187350000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '93',
        'valor' => '1699788.147310330000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '94',
        'valor' => '1726251.346020060000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '95',
        'valor' => '1752839.959859560000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '96',
        'valor' => '1779553.253640480000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '97',
        'valor' => '1806390.504115670000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '98',
        'valor' => '1833350.999663840000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '99',
        'valor' => '1860434.039985690000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '1',
        'valor' => '2438.157411265720',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '2',
        'valor' => '6635.567540081010',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '3',
        'valor' => '11918.711939584600',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '4',
        'valor' => '18059.029484941700',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '5',
        'valor' => '24927.228847638200',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '6',
        'valor' => '32437.371639933000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '7',
        'valor' => '40527.098670340700',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '8',
        'valor' => '49148.553453501700',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '9',
        'valor' => '58263.545102713600',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '10',
        'valor' => '67840.702097938700',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '11',
        'valor' => '77853.673935657500',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '12',
        'valor' => '88279.931945717200',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '13',
        'valor' => '99099.935067962500',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '14',
        'valor' => '110296.529333177000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '15',
        'valor' => '121854.503205709000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '16',
        'valor' => '133760.250437928000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '17',
        'valor' => '146001.509225620000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '18',
        'valor' => '158567.156848544000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '19',
        'valor' => '171447.045518629000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '20',
        'valor' => '184631.869401613000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '21',
        'valor' => '198113.055607905000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '22',
        'valor' => '211882.673881714000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '23',
        'valor' => '225933.361066522000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '24',
        'valor' => '240258.257384400000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '25',
        'valor' => '254850.952260690000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '26',
        'valor' => '269705.437935500000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '27',
        'valor' => '284816.069483282000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '28',
        'valor' => '300177.530148425000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '29',
        'valor' => '315784.801123652000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '30',
        'valor' => '331633.135066840000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '31',
        'valor' => '347718.032783564000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '32',
        'valor' => '364035.222606177000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '33',
        'valor' => '380580.642082389000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '34',
        'valor' => '397350.421651991000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '35',
        'valor' => '414340.870043316000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '36',
        'valor' => '431548.461163921000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '37',
        'valor' => '448969.822295070000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '38',
        'valor' => '466601.723428356000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '39',
        'valor' => '484441.067606629000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '40',
        'valor' => '502484.882151153000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '41',
        'valor' => '520730.310673406000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '42',
        'valor' => '539174.605783813000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '43',
        'valor' => '557815.122421357000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '44',
        'valor' => '576649.311737913000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '45',
        'valor' => '595674.715479536000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '46',
        'valor' => '614888.960814117000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '47',
        'valor' => '634289.755560961000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '48',
        'valor' => '653874.883783129000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '49',
        'valor' => '673642.201707923000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '50',
        'valor' => '693589.633944871000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '51',
        'valor' => '713715.169973951000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '52',
        'valor' => '734016.860879822000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '53',
        'valor' => '754492.816310382000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '54',
        'valor' => '775141.201640302000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '55',
        'valor' => '795960.235322163000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '56',
        'valor' => '816948.186409568000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '57',
        'valor' => '838103.372238207000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '58',
        'valor' => '859424.156252179000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '59',
        'valor' => '880908.945964113000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '60',
        'valor' => '902556.191038721000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '61',
        'valor' => '924364.381490381000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '62',
        'valor' => '946332.045986171000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '63',
        'valor' => '968457.750246618000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '64',
        'valor' => '990740.095537027000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '65',
        'valor' => '1013177.717242950000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '66',
        'valor' => '1035769.283523860000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '67',
        'valor' => '1058513.494039610000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '68',
        'valor' => '1081409.078744710000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '69',
        'valor' => '1104454.796745920000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '70',
        'valor' => '1127649.435218810000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '71',
        'valor' => '1150991.808379660000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '72',
        'valor' => '1174480.756508930000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '73',
        'valor' => '1198115.145023130000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '74',
        'valor' => '1221893.863592070000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '75',
        'valor' => '1245815.825298630000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '76',
        'valor' => '1269879.965838520000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '77',
        'valor' => '1294085.242757550000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '78',
        'valor' => '1318430.634724260000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '79',
        'valor' => '1342915.140835820000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '80',
        'valor' => '1367537.779955190000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '81',
        'valor' => '1392297.590077940000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '82',
        'valor' => '1417193.627726840000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '83',
        'valor' => '1442224.967372830000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '84',
        'valor' => '1467390.700880850000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '85',
        'valor' => '1492689.936979200000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '86',
        'valor' => '1518121.800751140000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '87',
        'valor' => '1543685.433147620000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '88',
        'valor' => '1569379.990519870000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '89',
        'valor' => '1595204.644171040000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '90',
        'valor' => '1621158.579925760000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '91',
        'valor' => '1647240.997716680000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '92',
        'valor' => '1673451.111187350000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '93',
        'valor' => '1699788.147310330000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '94',
        'valor' => '1726251.346020060000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '95',
        'valor' => '1752839.959859560000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '96',
        'valor' => '1779553.253640480000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '97',
        'valor' => '1806390.504115670000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '98',
        'valor' => '1833350.999663840000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      [
        'puntos' => '99',
        'valor' => '1860434.039985690000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],

      [
        'puntos' => '1',
        'valor' => '2438.157411265720',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '2',
        'valor' => '6635.567540081010',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '3',
        'valor' => '11918.711939584600',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '4',
        'valor' => '18059.029484941700',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '5',
        'valor' => '24927.228847638200',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '6',
        'valor' => '32437.371639933000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '7',
        'valor' => '40527.098670340700',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '8',
        'valor' => '49148.553453501700',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '9',
        'valor' => '58263.545102713600',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '10',
        'valor' => '67840.702097938700',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '11',
        'valor' => '77853.673935657500',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '12',
        'valor' => '88279.931945717200',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '13',
        'valor' => '99099.935067962500',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '14',
        'valor' => '110296.529333177000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '15',
        'valor' => '121854.503205709000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '16',
        'valor' => '133760.250437928000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '17',
        'valor' => '146001.509225620000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '18',
        'valor' => '158567.156848544000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '19',
        'valor' => '171447.045518629000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '20',
        'valor' => '184631.869401613000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '21',
        'valor' => '198113.055607905000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '22',
        'valor' => '211882.673881714000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '23',
        'valor' => '225933.361066522000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '24',
        'valor' => '240258.257384400000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '25',
        'valor' => '254850.952260690000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '26',
        'valor' => '269705.437935500000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '27',
        'valor' => '284816.069483282000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '28',
        'valor' => '300177.530148425000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '29',
        'valor' => '315784.801123652000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '30',
        'valor' => '331633.135066840000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '31',
        'valor' => '347718.032783564000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '32',
        'valor' => '364035.222606177000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '33',
        'valor' => '380580.642082389000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '34',
        'valor' => '397350.421651991000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '35',
        'valor' => '414340.870043316000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '36',
        'valor' => '431548.461163921000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '37',
        'valor' => '448969.822295070000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '38',
        'valor' => '466601.723428356000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '39',
        'valor' => '484441.067606629000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '40',
        'valor' => '502484.882151153000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '41',
        'valor' => '520730.310673406000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '42',
        'valor' => '539174.605783813000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '43',
        'valor' => '557815.122421357000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '44',
        'valor' => '576649.311737913000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '45',
        'valor' => '595674.715479536000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '46',
        'valor' => '614888.960814117000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '47',
        'valor' => '634289.755560961000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '48',
        'valor' => '653874.883783129000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '49',
        'valor' => '673642.201707923000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '50',
        'valor' => '693589.633944871000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '51',
        'valor' => '713715.169973951000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '52',
        'valor' => '734016.860879822000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '53',
        'valor' => '754492.816310382000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '54',
        'valor' => '775141.201640302000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '55',
        'valor' => '795960.235322163000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '56',
        'valor' => '816948.186409568000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '57',
        'valor' => '838103.372238207000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '58',
        'valor' => '859424.156252179000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '59',
        'valor' => '880908.945964113000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '60',
        'valor' => '902556.191038721000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '61',
        'valor' => '924364.381490381000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '62',
        'valor' => '946332.045986171000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '63',
        'valor' => '968457.750246618000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '64',
        'valor' => '990740.095537027000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '65',
        'valor' => '1013177.717242950000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '66',
        'valor' => '1035769.283523860000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '67',
        'valor' => '1058513.494039610000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '68',
        'valor' => '1081409.078744710000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '69',
        'valor' => '1104454.796745920000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '70',
        'valor' => '1127649.435218810000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '71',
        'valor' => '1150991.808379660000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '72',
        'valor' => '1174480.756508930000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '73',
        'valor' => '1198115.145023130000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '74',
        'valor' => '1221893.863592070000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '75',
        'valor' => '1245815.825298630000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '76',
        'valor' => '1269879.965838520000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '77',
        'valor' => '1294085.242757550000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '78',
        'valor' => '1318430.634724260000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '79',
        'valor' => '1342915.140835820000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '80',
        'valor' => '1367537.779955190000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '81',
        'valor' => '1392297.590077940000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '82',
        'valor' => '1417193.627726840000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '83',
        'valor' => '1442224.967372830000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '84',
        'valor' => '1467390.700880850000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '85',
        'valor' => '1492689.936979200000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '86',
        'valor' => '1518121.800751140000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '87',
        'valor' => '1543685.433147620000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '88',
        'valor' => '1569379.990519870000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '89',
        'valor' => '1595204.644171040000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '90',
        'valor' => '1621158.579925760000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '91',
        'valor' => '1647240.997716680000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '92',
        'valor' => '1673451.111187350000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '93',
        'valor' => '1699788.147310330000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '94',
        'valor' => '1726251.346020060000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '95',
        'valor' => '1752839.959859560000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '96',
        'valor' => '1779553.253640480000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '97',
        'valor' => '1806390.504115670000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '98',
        'valor' => '1833350.999663840000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],
      [
        'puntos' => '99',
        'valor' => '1860434.039985690000',
        'vigencia' => '2023',
        'tipo' => 'RURAL',
      ],

    ];
  }
}
