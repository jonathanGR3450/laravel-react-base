<?php

namespace App\Http\Controllers;

use Response;

class AppBaseController extends Controller
{
    public function sendResponse($result, $message, $role = null)
    {
        $res = [];
        if ($role)
            $res['role'] = $role;

        $res['success'] = true;
        $res['data'] = $result;
        $res['message'] = $message;

        return Response::json($res);
    }

    public function sendError($error, $code = 404, $role = null)
    {
        $res = [];
        if ($role)
            $res['role'] = $role;

        $res['success'] = false;
        $res['message'] = $error;

        if (!empty($data)) {
            $res['data'] = $data;
        }

        return Response::json($res, $code);
    }

    public function sendSuccess($message, $role = null)
    {
        $res = [];
        if ($role)
            $res['role'] = $role;

        $res['success'] = true;
        $res['message'] = $message;

        return Response::json($res, 200);
    }
}
