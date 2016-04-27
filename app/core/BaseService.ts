//import {Injectable} from 'angular2/core';
//import {Observable} from 'rxjs/Observable';

/**
 * Base class for services, normally linked with remote API
 * @Injectable to be defined in child classes
 **/
export class BaseService {

    // member variables accessible from child classes
    protected mApiPrefix: string;

    // GET request
    get(url: string) {
        var url = this.mApiPrefix + url;
    }

    // POST request
    post(url: string, data: Object = {}) {
        var url = this.mApiPrefix + url;
    }

    // PUT request
    put(url: string) {
        var url = this.mApiPrefix + url;
    }

    // DELETE request
    delete(url: string) {
        var url = this.mApiPrefix + url;
    }
}