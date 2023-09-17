<?php

namespace App\Http\Middleware;

use App\Models\Access;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class VisitorMiddleware
{
    /**
     * Handle an incoming request.
     *
     * @param Closure(Request): (Response) $next
     */
    public function handle(Request $request, Closure $next): Response
    {
        Access::query()->create([
            'ip' => $request->ip(),
            'url' => $request->url(),
            'user_agent' => $request->userAgent(),
        ]);

        return $next($request);
    }
}
