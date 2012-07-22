Ext.define('FormPreso.view.CompanyFormPanel', {
	extend: 'FormPreso.cmp.ModelFormPanel',
	xtype: 'companyform',
	requires: [
		'FormPreso.view.CompanyFormToolbar',
		'FormPreso.view.form.field.Employees', 
		'FormPreso.view.form.field.Locations'
	],

	model: 'FormPreso.model.Company',
	addMode: false,
	readOnly: true,
	autoScroll: true,

	layout: {
		type: 'anchor'
	},
	defaults: {
		labelAlign: 'top',
		labelSeparator: '',
		anchor: '100%',
		padding: '20 20 0 20',
		readOnlyCls: 'read-only',
		readOnly: true
	},

	items: [
		{
			xtype: 'textfield',
			name: 'name',
			fieldLabel: 'Company Name',
			allowBlank: false,
		},
		{
			xtype: 'textfield',
			name: 'headCount',
			fieldLabel: 'Head Count'
		},
		{
			xtype: 'locationsfield',
			name: 'locations'
		},
		{
			xtype: 'employeesfield',
			name: 'employees'
		}
	],

	initComponent: function() {
		this.dockedItems = [
			{
				xtype: 'companyformtoolbar',
				dock: 'bottom',
				form: this
			}
		];
		this.callParent();
	}
});