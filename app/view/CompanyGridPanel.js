Ext.define('FormPreso.view.CompanyGridPanel', {
    extend: 'Ext.grid.Panel',
	xtype: 'companygrid',
	requires: [
		'FormPreso.view.CompanyGridToolbar',
		'FormPreso.store.Company'
	],

	columns: [
		{
			dataIndex: 'name',
			header: 'HTML5 Companies',
			flex: 1
		}
	],

	initComponent: function() {
		this.store = Ext.create('FormPreso.store.Company');

		this.dockedItems = [
			{
				xtype: 'companygridtoolbar',
				dock: 'bottom',
				grid: this
			}
		];

		this.callParent();
	}
});