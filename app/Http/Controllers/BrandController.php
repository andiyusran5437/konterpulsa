<?php

namespace App\Http\Controllers;

use App\Services\BrandCreateService;
use App\Services\BrandDeleteService;
use App\Services\BrandFindService;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Log;

class BrandController extends Controller
{
    public function find(Request $req)
    {
        return BrandFindService::find($req);
    }

    public function create(Request $req)
    {
        $data = $req->json()->all();
        return BrandCreateService::create($data);
    }

    public function update(Request $request, $id)
    {
        $data = $request->json()->all();
        return BrandCreateService::update($id, $data);
    }

    public function statusUpdate(Request $request, $id)
    {
        $data = $request->json()->all();
        return BrandCreateService::statusUpdate($id, $data);
    }

    public function delete($id)
    {
        return BrandDeleteService::delete($id);
    }

    public function softDelete($id)
    {
        return BrandDeleteService::softDelete($id);
    }
}
