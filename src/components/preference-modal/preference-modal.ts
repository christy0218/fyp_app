import { Component } from '@angular/core';
import { Utils } from '../../core/providers/utils';
import { ViewController } from 'ionic-angular';
import _ from 'lodash';

@Component({
	selector: 'preference-modal',
	templateUrl: 'preference-modal.html'
})
export class PreferenceModal {
	language: string = '';
	preference_fields: any = [];
	preference_options: any = {};
	edit_mode: boolean = false;

	constructor(private utils: Utils, private view: ViewController) {
	}

	ngOnInit() {
		this.language = this.utils.currentLang();
		this.initPreferenceArrays();
		this.edit_mode = true;
	}

	initPreferenceArrays() {
			this.preference_options = [
				{	
					id: 0,
					name_zh: '毋須',
					name_en: 'None'
				},
				{
					id: 1,
					name_zh: '優先',
					name_en: 'Preferred'
				},
				{
					id: 2,
					name_zh: '必要',
					name_en: 'Must'
				}
			];
			
			this.preference_fields = [
				{
					name_zh: '工作類別',
					name_en: 'Employment Type',
					value: 'employment_type',
					field_type: 'multi_select',
					selection: [],
					importance: 1,
					options: [
						{
							id: 0,
							option_zh: '全職',
							option_en: 'Full time',
							value: 'fulltime'
						},
						{
							id: 1,
							option_zh: '兼職',
							option_en: 'Part time',
							value: 'parttime'
						},
						{
							id: 2,
							option_zh: '臨時工作',
							option_en: 'Temporary work',
							value: 'temporary'
						}
					]
				},
				{
					name_zh: '最低月薪薪酬',
					name_en: 'Minimum Monthly Salary',
					value: 'monthly_wage',
					field_type: 'input',
					selection: '',
					importance: 1,
					options: []
				},
				{
					name_zh: '最低時薪薪酬',
					name_en: 'Minimum Hourly Salary',
					value: 'hourly_wage',
					field_type: 'input',
					selection: '',
					importance: 1,
					options: []
				},
				// {
				// 	name_zh: '公司規模',
				// 	name_en: 'Company Scale',
				// 	value: 'employer_scale',
				// 	field_type: 'multi_select',
				// 	selection: [],
				// 	importance: 1,
				// 	options: [
				// 		{
				// 			id: 0,
				// 			option_zh: '20人以下',
				// 			option_en: 'Below 20',
				// 			value: 'under_20'
				// 		},
				// 		{
				// 			id: 1,
				// 			option_zh: '21-100人',
				// 			option_en: '21-100',
				// 			value: '21_100'
				// 		},
				// 		{
				// 			id: 2,
				// 			option_zh: '101-500人',
				// 			option_en: '101-500',
				// 			value: '101_500'
				// 		},
				// 		{
				// 			id: 3,
				// 			option_zh: '501-1000人',
				// 			option_en: '501-1000',
				// 			value: '501_1000'
				// 		},
				// 		{
				// 			id: 4,
				// 			option_zh: '1000人以上',
				// 			option_en: 'Above 1000',
				// 			value: 'above_1000'
				// 		}
				// 	]
				// },
				{
					name_zh: '出糧方式',
					name_en: 'Payment Methods',
					value: 'payment_method',
					field_type: 'multi_select',
					selection: [],
					importance: 1,
					options: [
						{
							id: 0,
							option_zh: '現金',
							option_en: 'Cash',
							value: 'cash'
						},
						{
							id: 1,
							option_zh: '過數',
							option_en: 'Bank Transfer',
							value: 'transfer'
						},
						{
							id: 2,
							option_zh: '支票',
							option_en: 'Cheque',
							value: 'cheque'
						}
					]
				}
				// Benefits
				// Work location
				// Company industry
		];
		
		this.preference_fields.forEach(preference => {
			// Default set all preferences importance to 'None'
			preference.importance = 1;
		});
		console.log('preference_fields', this.preference_fields);
	}

	setPreference(preference, option) {
		console.log('option', option);
		console.log('preference', preference);
		option.selected = !option.selected;

		if (_.includes(preference.selection, option.id)) {
			// Remove option if it exits in preferences
			_.pull(preference.selection, option.id);
		} else {
			// Add option if it does not exist in preferences
			preference.selection.push(option.id);
		}
	}

	togglePreferenceWrapper(preference) {
		preference.isExpanded = !preference.isExpanded;
	}
  
	dismissModal() {
		this.view.dismiss();
		this.utils.setLocal('USER_PREFERENCE_NEVER_SHOW', true);
	}

	savePreference() {
		console.log('update preference', this.preference_fields);
		this.utils.setLocal('USER_PREFERENCE', this.preference_fields);
		this.utils.setLocal('USER_PREFERENCE_NEVER_SHOW', true);
		this.view.dismiss();
	}
}
