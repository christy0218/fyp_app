import { Component } from '@angular/core';
import { Platform, ViewController, NavController } from 'ionic-angular';
import { IonicPage } from 'ionic-angular';
import { BasePage } from '../../core/base-page';
import { Config } from '../../config';
import { Utils } from '../../core/providers/utils';
import { Api } from '../../providers';
import _ from 'lodash';
import * as moment from 'moment';

@IonicPage()
@Component({
	selector: 'page-applicant-favourite',
	templateUrl: 'applicant-favourite.html'
})
export class ApplicantFavouritePage extends BasePage {

	name: string = 'ApplicantFavouritePage';
	language: string = '';
	jobs: any;
	fav_jobs: any;
	constructor(
		protected platform: Platform,
		protected view: ViewController,
		protected nav: NavController,
		protected utils: Utils,
		private api: Api
	) {
		super(platform, view, nav, utils);
		Config.DEBUG_VERBOSE && console.log('HomePage constructor');
	}

	ionViewWillEnter() {
		Config.ACTIVE_TAB = 'profile';
		this.getFavourited();
	}

	getFavourited() {
		this.utils.getLocal('FAV_JOBS', []).then(data => {
			this.fav_jobs = data;
			console.log('Favourited jobs', this.fav_jobs);
		});
		this.initJobList();
	}

	checkFav(job_id) {
		return _.includes(this.fav_jobs, job_id);
	}

	clickFav(event:Event, job_id) {
		event.stopPropagation();
		if (_.includes(this.fav_jobs, job_id)) {
			// Remove spot if it exits in favourites
			_.pull(this.fav_jobs, job_id);
			this.utils.setLocal('FAV_JOBS', this.fav_jobs);
		} else {
			// Add spot if it does not exist in favourites
			this.fav_jobs.push(job_id);
			this.utils.setLocal('FAV_JOBS', this.fav_jobs);
		}
		this.getFavourited();
	}

	ngOnInit() {
		this.language = this.utils.currentLang();
		console.log('home > lang', this.language);
	}

	initJobList() {
		this.api.startQueue([
			this.api.getAllJobs()
		]).then(response => {
			var all_jobs = _.filter(response[0], { 'status': 'active' });

			// Default sort jobs by publish date
			let fav_list = [];
			_.each(this.fav_jobs, (job_id) => {
				_.each(all_jobs, (job) => {
					if (job.id == job_id) {
						fav_list.push(job);
					}
				})
			})
			console.log('fav_list', fav_list);

			fav_list.forEach(job => {
				// Format publish dates
				let publish_date = moment(job.publish_date,'YYYY-MM-DD HH:mm:ss');
				var diff_days = moment().diff(publish_date, 'days');
				if (diff_days == 0) {
					job.diff_days_zh = '今天';
					job.diff_days_en = 'Today';
				} else if (diff_days > 0){
					job.diff_days_zh = diff_days + '日前';
					job.diff_days_en = diff_days + ' days ago';
				}

				// Format job type and wage
				let type = job.type;
				let monthly_wage = job.monthly_wage;
				let hourly_wage = job.hourly_wage;
				switch(type) {
					case 'fulltime':
						job.type_zh = '全職';
						job.type_en = 'Full Time';
						job.wage_zh = '$' + monthly_wage + '/月';
						job.wage_en = '$' + monthly_wage + '/Month';
						break;
					case 'parttime':
						job.type_zh = '兼職';
						job.type_en = 'Part Time';
						job.wage_zh = '$' + hourly_wage + '/小時';
						job.wage_en = '$' + hourly_wage + '/Hour';
						break;
					case 'temporary':
						job.type_zh = '臨時工作';
						job.type_en = 'Temporary Work';
						job.wage_zh = '$' + hourly_wage + '/小時';
						job.wage_en = '$' + hourly_wage + '/Hour';
						break;
				}
			});
			
			this.jobs = _.orderBy(fav_list, function(job) { 
				return moment(job.publish_date); 
			}).reverse();
		});
	}

	openJobPage(job_id) {
		let data = { 'job_id': job_id };
		this.nav.push('ApplicantJobPage', data);
	}
}