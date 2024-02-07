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
        $ips = config('app.ignored_ips');
        $ip = $request->ip();

        $ignored = ['auth.login', 'auth.register'];

        $name = $request->route()->getName();

        if (in_array($name, $ignored)) {
            return $next($request);
        }

        if (!in_array($ip, explode(',', $ips))) {
            Access::query()->create([
                'ip' => $ip,
                'url' => $name === 'home' ? '/' : explode('.', $name)[1] . '/' . explode('.', $name)[0],
                'user_agent' => $request->userAgent(),
            ]);
        }

        return $next($request);
    }
}
