<?php

namespace App\Http\Controllers;

use App\Services\WebhookService;
use Illuminate\Http\Request;

class WebhookController extends Controller
{
    public function setStatus(Request $req)
    {
        $requestData = $req->json()->all();
        return WebhookService::setStatus($requestData);
    }
}
