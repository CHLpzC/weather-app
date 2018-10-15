import { Injectable } from "@angular/core";
import { ConnectionBackend, RequestOptions, Request, RequestOptionsArgs, Response, Http, Headers } from "@angular/http";
import { Observable, of } from "rxjs";
import { environment } from "../../../environments/environment";
import { Router } from '@angular/router';

@Injectable()
export class HttpService extends Http {
    private router: Router;

    constructor(backend: ConnectionBackend, defaultOptions: RequestOptions) {
        super(backend, defaultOptions);
    }

    get(url: string, options: RequestOptionsArgs): Observable<Response> {
        return super.get(this.updateUrl(url), this.getRequestOptionArgs(options));
    }

    private updateUrl(req: string) {
        return environment.Weather_URL + req;
    }

    private getRequestOptionArgs(options?: RequestOptionsArgs): RequestOptionsArgs {
        if (options == null) {
            options = new RequestOptions();
        }
        if (options.headers == null) {
            options.headers = new Headers();
        }
        options.headers.append('Content-Type', 'application/json');
        return options;
    }
}