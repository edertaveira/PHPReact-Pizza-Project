<?php

namespace App\Http\Controllers;

use App\Setting;
use Illuminate\Http\Request;

class SettingController extends Controller
{
    public function get()
    {
        $setting = Setting::orderBy("setting_id", "DESC")->first();
        return response()->json(["success" => true, "setting" => $setting]);
    }
}
