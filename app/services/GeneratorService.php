<?php

namespace App\services;

class GeneratorService
{
    public static function cpf($punctuation = true, $uf = null): string
    {
        $states = [
            'DF' => 1,
            'GO' => 1,
            'MT' => 1,
            'MS' => 1,
            'TO' => 1,
            'AC' => 2,
            'AM' => 2,
            'AP' => 2,
            'PA' => 2,
            'RO' => 2,
            'RR' => 2,
            'CE' => 3,
            'MA' => 3,
            'PI' => 3,
            'PB' => 4,
            'PE' => 4,
            'AL' => 4,
            'RN' => 4,
            'BA' => 5,
            'SE' => 5,
            'MG' => 6,
            'RJ' => 7,
            'ES' => 7,
            'SP' => 8,
            'PR' => 9,
            'SC' => 9,
            'RS' => 0,
        ];

        $cpf = '';
        for ($i = 0; $i < 8; $i++) {
            $cpf .= mt_rand(0, 8);
        }

        if ($uf) {
            $cpf .= $states[$uf];
        } else {
            $cpf .= mt_rand(0, 9);
        }

        $soma = 0;
        for ($i = 0; $i < 9; $i++) {
            $soma += $cpf[$i] * (10 - $i);
        }
        $resto = $soma % 11;
        $digito1 = ($resto < 2) ? 0 : (11 - $resto);

        $cpf .= $digito1;

        $soma = 0;
        for ($i = 0; $i < 10; $i++) {
            $soma += $cpf[$i] * (11 - $i);
        }

        $resto = $soma % 11;
        $digito2 = ($resto < 2) ? 0 : (11 - $resto);

        $cpf .= $digito2;

        return !$punctuation ? self::punctuation($cpf) : $cpf;
    }

    private static function punctuation($cpf): string
    {
        return substr($cpf, 0, 3) . '.' . substr($cpf, 3, 3) . '.' . substr($cpf, 6, 3) . '-' . substr($cpf, 9, 2);
    }
}
