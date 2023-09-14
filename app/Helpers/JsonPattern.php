<?php

namespace App\Helpers;

use Illuminate\Http\JsonResponse;
use Illuminate\Pagination\LengthAwarePaginator;

class JsonPattern
{
    public static function validation(array $errors, int $status = 400): JsonResponse
    {
        $bag = [];
        foreach (array_keys($errors) as $field) {
            $bag[$field] = $errors[$field][0];
        }

        $message = "Alguns parâmetros não foram preenchidos corretamente";
        $messages = array_values($bag);

        if (count($messages) > 0)
            $message = $messages[0];

        return response()->json([
            'success' => false,
            'body' => null,
            'message' => $message,
            'errors' => $bag
        ], $status);
    }

    public static function error($errors = null, string $message = 'Houve um erro ao processar solicitação', int $status = 400): JsonResponse
    {
        if (!is_array($errors) && !empty($errors))
            $errors = [$errors];

        if (!env('APP_DEBUG', false))
            $errors = null;

        return response()->json([
            'success' => false,
            'body' => null,
            'message' => $message,
            'debug' => $errors,
        ], $status);
    }

    public static function data($body, string $message = 'Dados retornados com sucesso', int $status = 200): JsonResponse
    {
        if ($body instanceof LengthAwarePaginator) {
            return response()->json([
                'message' => $message,
                'body' => $body->getCollection(),
                'pagination' => [
                    'limit' => $body->perPage(),
                    'current' => $body->currentPage(),
                    'last' => $body->lastPage(),
                    'count' => $body->count(),
                    'total' => $body->total()
                ],
                'success' => true
            ], $status);
        }

        return response()->json([
            'message' => $message,
            'body' => $body,
            'success' => true
        ], $status);
    }
}
