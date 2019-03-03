import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import { Utils } from '../core/providers/utils';
import { BaseService } from '../core/base-service';

@Injectable()
export class Api extends BaseService {
	
	// override API URL prefix and anonymous API key
	//protected api_prefix: string = 'https://dev.juicyapphk.com/juicycore/api';
	protected api_prefix: string = 'http://localhost/fyp_web/api';
	protected api_key_anonymous: string = 'anonymous';
	
	constructor(platform: Platform, utils: Utils) {
		super(platform, utils);
	}

	// POST /Auth
	public postSignUpApplicant(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/sign_up', data);
	}

	public postActivate(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/activate', data);
	}

	public postLogin(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/login', data);
	}

	public postForgetPassword(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/forgot_password', data);
	}

	public postResetPassword(data) {
		this.headers.set('X-API-KEY', this.api_key_anonymous);
		return this.post('/auth/reset_password', data);
	}

	/*--- GET ---*/
	public getAllJobs() {
		let url = '/job';
		return this.get(url);
	}

	public getJobDetail(job_id) {
		let url = '/job/' + job_id;
		return this.get(url);
	}

	public getAllDistricts() {
		let url = '/system/districts';
		return this.get(url);
	}
}