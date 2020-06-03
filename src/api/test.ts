import http from '@/utils/http';
import * as API from './index';

export function test(params?: any) {
    return http({
        url: http.adornUrl(API.test),
        methdos: 'get',
        params: http.adornParams(params)
    })
}
