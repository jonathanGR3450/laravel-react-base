<?php

namespace Database\Seeders;

use App\Models\Local\TabCcF0360UrbanaRuralLocal;
use Illuminate\Database\Seeder;

class TabCcF0360UrbanaRuralLocalSeeder extends Seeder
{
  /**
   * Run the database seeds.
   */
  public function run(): void
  {
    TabCcF0360UrbanaRuralLocal::truncate();
    foreach ($this->data() as $tabSantaMaria) {
      TabCcF0360UrbanaRuralLocal::create($tabSantaMaria);
    }
  }

  function data(): array
  {
    return [
      0 => [
        'puntos' => '1',
        'valor' => '6251.685669912110',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      1 => [
        'puntos' => '2',
        'valor' => '17014.275743797500',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      2 => [
        'puntos' => '3',
        'valor' => '30560.799845088700',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      3 => [
        'puntos' => '4',
        'valor' => '46305.203807542700',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      4 => [
        'puntos' => '5',
        'valor' => '63915.971404200600',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      5 => [
        'puntos' => '6',
        'valor' => '83172.747794700100',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      6 => [
        'puntos' => '7',
        'valor' => '103915.637616258000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      7 => [
        'puntos' => '8',
        'valor' => '126021.931932056000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      8 => [
        'puntos' => '9',
        'valor' => '149393.705391573000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      9 => [
        'puntos' => '10',
        'valor' => '173950.518199843000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      10 => [
        'puntos' => '11',
        'valor' => '199624.804963224000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      11 => [
        'puntos' => '12',
        'valor' => '226358.799860813000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      12 => [
        'puntos' => '13',
        'valor' => '254102.397610160000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      13 => [
        'puntos' => '14',
        'valor' => '282811.613674813000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      14 => [
        'puntos' => '15',
        'valor' => '312447.444117203000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      15 => [
        'puntos' => '16',
        'valor' => '342975.001122891000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      16 => [
        'puntos' => '17',
        'valor' => '374362.844168257000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      17 => [
        'puntos' => '18',
        'valor' => '406582.453457805000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      18 => [
        'puntos' => '19',
        'valor' => '439607.809022125000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      19 => [
        'puntos' => '20',
        'valor' => '473415.049747725000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      20 => [
        'puntos' => '21',
        'valor' => '507982.193866423000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      21 => [
        'puntos' => '22',
        'valor' => '543288.907389011000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      22 => [
        'puntos' => '23',
        'valor' => '579316.310426981000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      23 => [
        'puntos' => '24',
        'valor' => '616046.813806153000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      24 => [
        'puntos' => '25',
        'valor' => '653463.980155614000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      25 => [
        'puntos' => '26',
        'valor' => '691552.404962822000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      26 => [
        'puntos' => '27',
        'valor' => '730297.614059697000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      27 => [
        'puntos' => '28',
        'valor' => '769685.974739552000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      28 => [
        'puntos' => '29',
        'valor' => '809704.618265774000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      29 => [
        'puntos' => '30',
        'valor' => '850341.371966255000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      30 => [
        'puntos' => '31',
        'valor' => '891584.699445035000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      31 => [
        'puntos' => '32',
        'valor' => '933423.647708147000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      32 => [
        'puntos' => '33',
        'valor' => '975847.800211254000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      33 => [
        'puntos' => '34',
        'valor' => '1018847.235005110000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      34 => [
        'puntos' => '35',
        'valor' => '1062412.487290550000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      35 => [
        'puntos' => '36',
        'valor' => '1106534.515804930000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      36 => [
        'puntos' => '37',
        'valor' => '1151204.672551460000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      37 => [
        'puntos' => '38',
        'valor' => '1196414.675457320000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      38 => [
        'puntos' => '39',
        'valor' => '1242156.583606740000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      39 => [
        'puntos' => '40',
        'valor' => '1288422.774746550000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      40 => [
        'puntos' => '41',
        'valor' => '1335205.924803610000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      41 => [
        'puntos' => '42',
        'valor' => '1382498.989189270000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      42 => [
        'puntos' => '43',
        'valor' => '1430295.185695790000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      43 => [
        'puntos' => '44',
        'valor' => '1478587.978815160000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      44 => [
        'puntos' => '45',
        'valor' => '1527371.065332140000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      45 => [
        'puntos' => '46',
        'valor' => '1576638.361061840000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      46 => [
        'puntos' => '47',
        'valor' => '1626383.988617850000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      47 => [
        'puntos' => '48',
        'valor' => '1676602.266110590000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      48 => [
        'puntos' => '49',
        'valor' => '1727287.696686980000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      49 => [
        'puntos' => '50',
        'valor' => '1778434.958833000000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      50 => [
        'puntos' => '51',
        'valor' => '1830038.897369110000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      51 => [
        'puntos' => '52',
        'valor' => '1882094.515076470000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      52 => [
        'puntos' => '53',
        'valor' => '1934596.964898410000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      53 => [
        'puntos' => '54',
        'valor' => '1987541.542667440000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      54 => [
        'puntos' => '55',
        'valor' => '2040923.680313240000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      55 => [
        'puntos' => '56',
        'valor' => '2094738.939511710000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      56 => [
        'puntos' => '57',
        'valor' => '2148983.005738990000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      57 => [
        'puntos' => '58',
        'valor' => '2203651.682697900000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      58 => [
        'puntos' => '59',
        'valor' => '2258740.887087470000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      59 => [
        'puntos' => '60',
        'valor' => '2314246.643689030000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      60 => [
        'puntos' => '61',
        'valor' => '2370165.080744570000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      61 => [
        'puntos' => '62',
        'valor' => '2426492.425605570000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      62 => [
        'puntos' => '63',
        'valor' => '2483225.000632350000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      63 => [
        'puntos' => '64',
        'valor' => '2540359.219325710000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      64 => [
        'puntos' => '65',
        'valor' => '2597891.582674240000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      65 => [
        'puntos' => '66',
        'valor' => '2655818.675702200000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      66 => [
        'puntos' => '67',
        'valor' => '2714137.164204120000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      67 => [
        'puntos' => '68',
        'valor' => '2772843.791653110000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      68 => [
        'puntos' => '69',
        'valor' => '2831935.376271580000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      69 => [
        'puntos' => '70',
        'valor' => '2891408.808253360000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      70 => [
        'puntos' => '71',
        'valor' => '2951261.047127340000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      71 => [
        'puntos' => '72',
        'valor' => '3011489.119253670000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      72 => [
        'puntos' => '73',
        'valor' => '3072090.115443920000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      73 => [
        'puntos' => '74',
        'valor' => '3133061.188697610000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      74 => [
        'puntos' => '75',
        'valor' => '3194399.552047770000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      75 => [
        'puntos' => '76',
        'valor' => '3256102.476509030000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      76 => [
        'puntos' => '77',
        'valor' => '3318167.289121920000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      77 => [
        'puntos' => '78',
        'valor' => '3380591.371087860000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      78 => [
        'puntos' => '79',
        'valor' => '3443372.155989270000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      79 => [
        'puntos' => '80',
        'valor' => '3506507.128090230000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      80 => [
        'puntos' => '81',
        'valor' => '3569993.820712670000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      81 => [
        'puntos' => '82',
        'valor' => '3633829.814684210000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      82 => [
        'puntos' => '83',
        'valor' => '3698012.736853410000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      83 => [
        'puntos' => '84',
        'valor' => '3762540.258668840000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      84 => [
        'puntos' => '85',
        'valor' => '3827410.094818460000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      85 => [
        'puntos' => '86',
        'valor' => '3892620.001926010000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      86 => [
        'puntos' => '87',
        'valor' => '3958167.777301600000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      87 => [
        'puntos' => '88',
        'valor' => '4024051.257743260000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      88 => [
        'puntos' => '89',
        'valor' => '4090268.318387290000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      89 => [
        'puntos' => '90',
        'valor' => '4156816.871604510000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      90 => [
        'puntos' => '91',
        'valor' => '4223694.865940210000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      91 => [
        'puntos' => '92',
        'valor' => '4290900.285095770000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      92 => [
        'puntos' => '93',
        'valor' => '4358431.146949570000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      93 => [
        'puntos' => '94',
        'valor' => '4426285.502615530000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      94 => [
        'puntos' => '95',
        'valor' => '4494461.435537340000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      95 => [
        'puntos' => '96',
        'valor' => '4562957.060616620000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      96 => [
        'puntos' => '97',
        'valor' => '4631770.523373500000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      97 => [
        'puntos' => '98',
        'valor' => '4700899.999138040000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      98 => [
        'puntos' => '99',
        'valor' => '4770343.692270990000',
        'vigencia' => '2022',
        'tipo' => 'URBANA'
      ],
      99 => [
        'puntos' => '1',
        'valor' => '6521.133322285330',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      100 => [
        'puntos' => '2',
        'valor' => '17747.591028355100',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      101 => [
        'puntos' => '3',
        'valor' => '31877.970318412000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      102 => [
        'puntos' => '4',
        'valor' => '48300.958091647800',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      103 => [
        'puntos' => '5',
        'valor' => '66670.749771721600',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      104 => [
        'puntos' => '6',
        'valor' => '86757.493224651700',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      105 => [
        'puntos' => '7',
        'valor' => '108394.401597519000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      106 => [
        'puntos' => '8',
        'valor' => '131453.477198327000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      107 => [
        'puntos' => '9',
        'valor' => '155832.574093950000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      108 => [
        'puntos' => '10',
        'valor' => '181447.785534256000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      109 => [
        'puntos' => '11',
        'valor' => '208228.634057139000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      110 => [
        'puntos' => '12',
        'valor' => '236114.864134814000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      111 => [
        'puntos' => '13',
        'valor' => '265054.210947158000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      112 => [
        'puntos' => '14',
        'valor' => '295000.794224198000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      113 => [
        'puntos' => '15',
        'valor' => '325913.928958655000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      114 => [
        'puntos' => '16',
        'valor' => '357757.223671288000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      115 => [
        'puntos' => '17',
        'valor' => '390497.882751908000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      116 => [
        'puntos' => '18',
        'valor' => '424106.157201837000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      117 => [
        'puntos' => '19',
        'valor' => '458554.905590979000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      118 => [
        'puntos' => '20',
        'valor' => '493819.238391852000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      119 => [
        'puntos' => '21',
        'valor' => '529876.226422066000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      120 => [
        'puntos' => '22',
        'valor' => '566704.659297477000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      121 => [
        'puntos' => '23',
        'valor' => '604284.843406383000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      122 => [
        'puntos' => '24',
        'valor' => '642598.431481198000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      123 => [
        'puntos' => '25',
        'valor' => '681628.277700321000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      124 => [
        'puntos' => '26',
        'valor' => '721358.313616719000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      125 => [
        'puntos' => '27',
        'valor' => '761773.441225670000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      126 => [
        'puntos' => '28',
        'valor' => '802859.440250827000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      127 => [
        'puntos' => '29',
        'valor' => '844602.887313029000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      128 => [
        'puntos' => '30',
        'valor' => '886991.085098001000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      129 => [
        'puntos' => '31',
        'valor' => '930011.999991116000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      130 => [
        'puntos' => '32',
        'valor' => '973654.206924368000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      131 => [
        'puntos' => '33',
        'valor' => '1017906.840400360000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      132 => [
        'puntos' => '34',
        'valor' => '1062759.550833830000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      133 => [
        'puntos' => '35',
        'valor' => '1108202.465492780000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      134 => [
        'puntos' => '36',
        'valor' => '1154226.153436120000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      135 => [
        'puntos' => '37',
        'valor' => '1200821.593938430000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      136 => [
        'puntos' => '38',
        'valor' => '1247980.147969530000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      137 => [
        'puntos' => '39',
        'valor' => '1295693.532360190000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      138 => [
        'puntos' => '40',
        'valor' => '1343953.796338120000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      139 => [
        'puntos' => '41',
        'valor' => '1392753.300162640000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      140 => [
        'puntos' => '42',
        'valor' => '1442084.695623320000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      141 => [
        'puntos' => '43',
        'valor' => '1491940.908199270000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      142 => [
        'puntos' => '44',
        'valor' => '1542315.120702100000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      143 => [
        'puntos' => '45',
        'valor' => '1593200.758247960000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      144 => [
        'puntos' => '46',
        'valor' => '1644591.474423600000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      145 => [
        'puntos' => '47',
        'valor' => '1696481.138527280000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      146 => [
        'puntos' => '48',
        'valor' => '1748863.823779950000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      147 => [
        'puntos' => '49',
        'valor' => '1801733.796414190000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      148 => [
        'puntos' => '50',
        'valor' => '1855085.505558700000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      149 => [
        'puntos' => '51',
        'valor' => '1908913.573845710000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      150 => [
        'puntos' => '52',
        'valor' => '1963212.788676260000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      151 => [
        'puntos' => '53',
        'valor' => '2017978.094085540000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      152 => [
        'puntos' => '54',
        'valor' => '2073204.583156410000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      153 => [
        'puntos' => '55',
        'valor' => '2128887.490934740000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      154 => [
        'puntos' => '56',
        'valor' => '2185022.187804670000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      155 => [
        'puntos' => '57',
        'valor' => '2241604.173286340000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      156 => [
        'puntos' => '58',
        'valor' => '2298629.070222180000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      157 => [
        'puntos' => '59',
        'valor' => '2356092.619320940000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      158 => [
        'puntos' => '60',
        'valor' => '2413990.674032030000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      159 => [
        'puntos' => '61',
        'valor' => '2472319.195724660000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      160 => [
        'puntos' => '62',
        'valor' => '2531074.249149170000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      161 => [
        'puntos' => '63',
        'valor' => '2590251.998159610000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      162 => [
        'puntos' => '64',
        'valor' => '2649848.701678650000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      163 => [
        'puntos' => '65',
        'valor' => '2709860.709887490000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      164 => [
        'puntos' => '66',
        'valor' => '2770284.460624970000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      165 => [
        'puntos' => '67',
        'valor' => '2831116.475981310000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      166 => [
        'puntos' => '68',
        'valor' => '2892353.359073350000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      167 => [
        'puntos' => '69',
        'valor' => '2953991.790988890000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      168 => [
        'puntos' => '70',
        'valor' => '3016028.527889080000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      169 => [
        'puntos' => '71',
        'valor' => '3078460.398258530000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      170 => [
        'puntos' => '72',
        'valor' => '3141284.300293500000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      171 => [
        'puntos' => '73',
        'valor' => '3204497.199419550000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      172 => [
        'puntos' => '74',
        'valor' => '3268096.125930480000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      173 => [
        'puntos' => '75',
        'valor' => '3332078.172741030000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      174 => [
        'puntos' => '76',
        'valor' => '3396440.493246570000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      175 => [
        'puntos' => '77',
        'valor' => '3461180.299283080000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      176 => [
        'puntos' => '78',
        'valor' => '3526294.859181740000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      177 => [
        'puntos' => '79',
        'valor' => '3591781.495912410000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      178 => [
        'puntos' => '80',
        'valor' => '3657637.585310920000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      179 => [
        'puntos' => '81',
        'valor' => '3723860.554385390000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      180 => [
        'puntos' => '82',
        'valor' => '3790447.879697100000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      181 => [
        'puntos' => '83',
        'valor' => '3857397.085811790000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      182 => [
        'puntos' => '84',
        'valor' => '3924705.743817470000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      183 => [
        'puntos' => '85',
        'valor' => '3992371.469905130000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      184 => [
        'puntos' => '86',
        'valor' => '4060391.924009020000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      185 => [
        'puntos' => '87',
        'valor' => '4128764.808503290000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      186 => [
        'puntos' => '88',
        'valor' => '4197487.866951990000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      187 => [
        'puntos' => '89',
        'valor' => '4266558.882909790000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      188 => [
        'puntos' => '90',
        'valor' => '4335975.678770660000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      189 => [
        'puntos' => '91',
        'valor' => '4405736.114662230000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      190 => [
        'puntos' => '92',
        'valor' => '4475838.087383400000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      191 => [
        'puntos' => '93',
        'valor' => '4546279.529383090000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      192 => [
        'puntos' => '94',
        'valor' => '4617058.407778260000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      193 => [
        'puntos' => '95',
        'valor' => '4688172.723409000000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      194 => [
        'puntos' => '96',
        'valor' => '4759620.509929200000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      195 => [
        'puntos' => '97',
        'valor' => '4831399.832930900000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      196 => [
        'puntos' => '98',
        'valor' => '4903508.789100890000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
      197 => [
        'puntos' => '99',
        'valor' => '4975945.505407870000',
        'vigencia' => '2023',
        'tipo' => 'URBANA'
      ],
    ];
  }
}
