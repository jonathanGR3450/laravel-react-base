<?php

namespace Database\Seeders;

use App\Models\Local\TabCom60UrbanaRuralLocal;
use Illuminate\Database\Seeder;

class TabCom60UrbanaRuralLocalSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        TabCom60UrbanaRuralLocal::truncate();
        foreach ($this->data() as $tabSantaMaria) {
            TabCom60UrbanaRuralLocal::create($tabSantaMaria);
        }
    }

    function data(): array
    {
        return [
            ['puntos' => 1, 'valor' => 3125.84283495606, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 2, 'valor' => 8507.13787189873, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 3, 'valor' => 15280.3999225443, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 4, 'valor' => 23152.6019037714, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 5, 'valor' => 31957.9857021003, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 6, 'valor' => 41586.3738973501, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 7, 'valor' => 51957.8188081291, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 8, 'valor' => 63010.9659660278, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 9, 'valor' => 74696.8526957867, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 10, 'valor' =>  86975.2590999214, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 11, 'valor' =>  99812.4024816121, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 12, 'valor' =>  113179.399930407, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 13, 'valor' =>  127051.19880508, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 14, 'valor' =>  141405.806837407, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 15, 'valor' =>  156223.722058602, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 16, 'valor' =>  171487.500561446, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 17, 'valor' =>  187181.422084128, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 18, 'valor' =>  203291.226728903, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 19, 'valor' =>  219803.904511063, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 20, 'valor' =>  236707.524873862, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 21, 'valor' =>  253991.096933212, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 22, 'valor' =>  271644.453694505, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 23, 'valor' =>  289658.15521349, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 24, 'valor' =>  308023.406903076, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 25, 'valor' =>  326731.990077807, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 26, 'valor' =>  345776.202481411, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 27, 'valor' =>  365148.807029848, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 28, 'valor' =>  384842.987369776, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 29, 'valor' =>  404852.309132887, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 30, 'valor' =>  425170.685983128, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 31, 'valor' =>  445792.349722517, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 32, 'valor' =>  466711.823854073, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 33, 'valor' =>  487923.900105627, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 34, 'valor' =>  509423.617502553, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 35, 'valor' =>  531206.243645277, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 36, 'valor' =>  553267.257902463, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 37, 'valor' =>  575602.336275731, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 38, 'valor' =>  598207.337728661, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 39, 'valor' =>  621078.29180337, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 40, 'valor' =>  644211.387373273, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 41, 'valor' =>  667602.962401803, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 42, 'valor' =>  691249.494594633, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 43, 'valor' =>  715147.592847893, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 44, 'valor' =>  739293.989407581, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 45, 'valor' =>  763685.532666072, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 46, 'valor' =>  788319.180530919, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 47, 'valor' =>  813191.994308924, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 48, 'valor' =>  838301.133055294, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 49, 'valor' =>  863643.848343491, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 50, 'valor' =>  889217.479416501, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 51, 'valor' =>  915019.448684553, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 52, 'valor' =>  941047.257538234, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 53, 'valor' =>  967298.482449207, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 54, 'valor' =>  993770.771333721, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 55, 'valor' =>  1020461.84015662, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 56, 'valor' =>  1047369.46975586, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 57, 'valor' =>  1074491.5028695, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 58, 'valor' =>  1101825.84134895, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 59, 'valor' =>  1129370.44354373, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 60, 'valor' =>  1157123.32184451, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 61, 'valor' =>  1185082.54037228, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 62, 'valor' =>  1213246.21280278, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 63, 'valor' =>  1241612.50031618, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 64, 'valor' =>  1270179.60966286, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 65, 'valor' =>  1298945.79133712, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 66, 'valor' =>  1327909.3378511, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 67, 'valor' =>  1357068.58210206, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 68, 'valor' =>  1386421.89582655, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 69, 'valor' =>  1415967.68813579, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 70, 'valor' =>  1445704.40412668, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 71, 'valor' =>  1475630.52356367, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 72, 'valor' =>  1505744.55962684, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 73, 'valor' =>  1536045.05772196, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 74, 'valor' =>  1566530.59434881, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 75, 'valor' =>  1597199.77602388, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 76, 'valor' =>  1628051.23825451, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 77, 'valor' =>  1659083.64456096, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 78, 'valor' =>  1690295.68554393, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 79, 'valor' =>  1721686.07799464, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 80, 'valor' =>  1753253.56404511, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 81, 'valor' =>  1784996.91035634, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 82, 'valor' =>  1816914.9073421, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 83, 'valor' =>  1849006.36842671, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 84, 'valor' =>  1881270.12933442, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 85, 'valor' =>  1913705.04740923, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 86, 'valor' =>  1946310.00096301, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 87, 'valor' =>  1979083.8886508, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 88, 'valor' =>  2012025.62887163, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 89, 'valor' =>  2045134.15919365, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 90, 'valor' =>  2078408.43580225, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 91, 'valor' =>  2111847.43297011, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 92, 'valor' =>  2145450.14254789, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 93, 'valor' =>  2179215.57347478, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 94, 'valor' =>  2213142.75130777, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 95, 'valor' =>  2247230.71776867, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 96, 'valor' =>  2281478.53030831, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 97, 'valor' =>  2315885.26168675, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 98, 'valor' =>  2350449.99956902, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 99, 'valor' =>  2385171.8461355, 'vigencia' => 2022, 'tipo' => 'URBANA'],
            ['puntos' => 1, 'valor' => 3125.84283495606, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 2, 'valor' => 8507.13787189873, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 3, 'valor' => 15280.3999225443, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 4, 'valor' => 23152.6019037714, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 5, 'valor' => 31957.9857021003, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 6, 'valor' => 41586.3738973501, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 7, 'valor' => 51957.8188081291, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 8, 'valor' => 63010.9659660278, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 9, 'valor' => 74696.8526957867, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 10, 'valor' =>  86975.2590999214, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 11, 'valor' =>  99812.4024816121, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 12, 'valor' =>  113179.399930407, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 13, 'valor' =>  127051.19880508, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 14, 'valor' =>  141405.806837407, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 15, 'valor' =>  156223.722058602, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 16, 'valor' =>  171487.500561446, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 17, 'valor' =>  187181.422084128, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 18, 'valor' =>  203291.226728903, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 19, 'valor' =>  219803.904511063, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 20, 'valor' =>  236707.524873862, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 21, 'valor' =>  253991.096933212, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 22, 'valor' =>  271644.453694505, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 23, 'valor' =>  289658.15521349, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 24, 'valor' =>  308023.406903076, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 25, 'valor' =>  326731.990077807, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 26, 'valor' =>  345776.202481411, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 27, 'valor' =>  365148.807029848, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 28, 'valor' =>  384842.987369776, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 29, 'valor' =>  404852.309132887, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 30, 'valor' =>  425170.685983128, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 31, 'valor' =>  445792.349722517, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 32, 'valor' =>  466711.823854073, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 33, 'valor' =>  487923.900105627, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 34, 'valor' =>  509423.617502553, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 35, 'valor' =>  531206.243645277, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 36, 'valor' =>  553267.257902463, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 37, 'valor' =>  575602.336275731, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 38, 'valor' =>  598207.337728661, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 39, 'valor' =>  621078.29180337, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 40, 'valor' =>  644211.387373273, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 41, 'valor' =>  667602.962401803, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 42, 'valor' =>  691249.494594633, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 43, 'valor' =>  715147.592847893, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 44, 'valor' =>  739293.989407581, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 45, 'valor' =>  763685.532666072, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 46, 'valor' =>  788319.180530919, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 47, 'valor' =>  813191.994308924, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 48, 'valor' =>  838301.133055294, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 49, 'valor' =>  863643.848343491, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 50, 'valor' =>  889217.479416501, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 51, 'valor' =>  915019.448684553, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 52, 'valor' =>  941047.257538234, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 53, 'valor' =>  967298.482449207, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 54, 'valor' =>  993770.771333721, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 55, 'valor' =>  1020461.84015662, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 56, 'valor' =>  1047369.46975586, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 57, 'valor' =>  1074491.5028695, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 58, 'valor' =>  1101825.84134895, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 59, 'valor' =>  1129370.44354373, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 60, 'valor' =>  1157123.32184451, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 61, 'valor' =>  1185082.54037228, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 62, 'valor' =>  1213246.21280278, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 63, 'valor' =>  1241612.50031618, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 64, 'valor' =>  1270179.60966286, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 65, 'valor' =>  1298945.79133712, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 66, 'valor' =>  1327909.3378511, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 67, 'valor' =>  1357068.58210206, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 68, 'valor' =>  1386421.89582655, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 69, 'valor' =>  1415967.68813579, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 70, 'valor' =>  1445704.40412668, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 71, 'valor' =>  1475630.52356367, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 72, 'valor' =>  1505744.55962684, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 73, 'valor' =>  1536045.05772196, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 74, 'valor' =>  1566530.59434881, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 75, 'valor' =>  1597199.77602388, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 76, 'valor' =>  1628051.23825451, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 77, 'valor' =>  1659083.64456096, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 78, 'valor' =>  1690295.68554393, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 79, 'valor' =>  1721686.07799464, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 80, 'valor' =>  1753253.56404511, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 81, 'valor' =>  1784996.91035634, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 82, 'valor' =>  1816914.9073421, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 83, 'valor' =>  1849006.36842671, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 84, 'valor' =>  1881270.12933442, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 85, 'valor' =>  1913705.04740923, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 86, 'valor' =>  1946310.00096301, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 87, 'valor' =>  1979083.8886508, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 88, 'valor' =>  2012025.62887163, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 89, 'valor' =>  2045134.15919365, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 90, 'valor' =>  2078408.43580225, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 91, 'valor' =>  2111847.43297011, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 92, 'valor' =>  2145450.14254789, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 93, 'valor' =>  2179215.57347478, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 94, 'valor' =>  2213142.75130777, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 95, 'valor' =>  2247230.71776867, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 96, 'valor' =>  2281478.53030831, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 97, 'valor' =>  2315885.26168675, 'vigencia' => 2023, 'tipo' => 'URBANA'],
            ['puntos' => 98, 'valor' =>  2350449.99956902, 'vigencia' => 2023, 'tipo' => 'URBANA'],

            [
                'puntos' => '1',
                'valor' => '3125.842834956060',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '2',
                'valor' => '8507.137871898730',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '3',
                'valor' => '15280.399922544300',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '4',
                'valor' => '23152.601903771400',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '5',
                'valor' => '31957.985702100300',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '6',
                'valor' => '41586.373897350100',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '7',
                'valor' => '51957.818808129100',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '8',
                'valor' => '63010.965966027800',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '9',
                'valor' => '74696.852695786700',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '10',
                'valor' => '86975.259099921400',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '11',
                'valor' => '99812.402481612100',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '12',
                'valor' => '113179.399930407000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '13',
                'valor' => '127051.198805080000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '14',
                'valor' => '141405.806837407000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '15',
                'valor' => '156223.722058602000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '16',
                'valor' => '171487.500561446000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '17',
                'valor' => '187181.422084128000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '18',
                'valor' => '203291.226728903000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '19',
                'valor' => '219803.904511063000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '20',
                'valor' => '236707.524873862000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '21',
                'valor' => '253991.096933212000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '22',
                'valor' => '271644.453694505000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '23',
                'valor' => '289658.155213490000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '24',
                'valor' => '308023.406903076000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '25',
                'valor' => '326731.990077807000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '26',
                'valor' => '345776.202481411000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '27',
                'valor' => '365148.807029848000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '28',
                'valor' => '384842.987369776000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '29',
                'valor' => '404852.309132887000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '30',
                'valor' => '425170.685983128000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '31',
                'valor' => '445792.349722517000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '32',
                'valor' => '466711.823854073000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '33',
                'valor' => '487923.900105627000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '34',
                'valor' => '509423.617502553000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '35',
                'valor' => '531206.243645277000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '36',
                'valor' => '553267.257902463000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '37',
                'valor' => '575602.336275731000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '38',
                'valor' => '598207.337728661000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '39',
                'valor' => '621078.291803370000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '40',
                'valor' => '644211.387373273000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '41',
                'valor' => '667602.962401803000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '42',
                'valor' => '691249.494594633000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '43',
                'valor' => '715147.592847893000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '44',
                'valor' => '739293.989407581000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '45',
                'valor' => '763685.532666072000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '46',
                'valor' => '788319.180530919000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '47',
                'valor' => '813191.994308924000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '48',
                'valor' => '838301.133055294000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '49',
                'valor' => '863643.848343491000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '50',
                'valor' => '889217.479416501000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '51',
                'valor' => '915019.448684553000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '52',
                'valor' => '941047.257538234000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '53',
                'valor' => '967298.482449207000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '54',
                'valor' => '993770.771333721000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '55',
                'valor' => '1020461.840156620000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '56',
                'valor' => '1047369.469755860000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '57',
                'valor' => '1074491.502869500000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '58',
                'valor' => '1101825.841348950000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '59',
                'valor' => '1129370.443543730000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '60',
                'valor' => '1157123.321844510000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '61',
                'valor' => '1185082.540372280000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '62',
                'valor' => '1213246.212802780000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '63',
                'valor' => '1241612.500316180000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '64',
                'valor' => '1270179.609662860000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '65',
                'valor' => '1298945.791337120000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '66',
                'valor' => '1327909.337851100000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '67',
                'valor' => '1357068.582102060000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '68',
                'valor' => '1386421.895826550000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '69',
                'valor' => '1415967.688135790000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '70',
                'valor' => '1445704.404126680000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '71',
                'valor' => '1475630.523563670000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '72',
                'valor' => '1505744.559626840000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '73',
                'valor' => '1536045.057721960000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '74',
                'valor' => '1566530.594348810000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '75',
                'valor' => '1597199.776023880000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '76',
                'valor' => '1628051.238254510000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '77',
                'valor' => '1659083.644560960000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '78',
                'valor' => '1690295.685543930000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '79',
                'valor' => '1721686.077994640000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '80',
                'valor' => '1753253.564045110000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '81',
                'valor' => '1784996.910356340000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '82',
                'valor' => '1816914.907342100000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '83',
                'valor' => '1849006.368426710000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '84',
                'valor' => '1881270.129334420000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '85',
                'valor' => '1913705.047409230000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '86',
                'valor' => '1946310.000963010000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '87',
                'valor' => '1979083.888650800000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '88',
                'valor' => '2012025.628871630000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '89',
                'valor' => '2045134.159193650000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '90',
                'valor' => '2078408.435802250000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '91',
                'valor' => '2111847.432970110000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '92',
                'valor' => '2145450.142547890000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '93',
                'valor' => '2179215.573474780000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '94',
                'valor' => '2213142.751307770000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '95',
                'valor' => '2247230.717768670000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '96',
                'valor' => '2281478.530308310000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '97',
                'valor' => '2315885.261686750000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '98',
                'valor' => '2350449.999569020000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
            [
                'puntos' => '99',
                'valor' => '2385171.846135500000',
                'vigencia' => '2023',
                'tipo' => 'RURAL',
            ],
        ];
    }
}
