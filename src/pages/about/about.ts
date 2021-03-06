import { Component } from '@angular/core';
import { Platform, ViewController, NavController, NavParams } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';

@IonicPage()
@Component({
	selector: 'page-about',
	templateUrl: 'about.html'
})
export class AboutPage extends BasePage {

	name: string = 'AboutPage';
	about: any;

	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api,
		private params: NavParams
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('AboutPage constructor');

		this.initAbout();
	}

	initAbout() {
		this.api.startQueue([
		  this.api.getAbout()
		]).then(response => {
		  this.about = response[0];
		})
	}
}