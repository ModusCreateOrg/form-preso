Ext.define('FormPreso.store.Company', {
	extend: 'Ext.data.Store',
	requires: ['FormPreso.model.Company'],
	model: 'FormPreso.model.Company',
    autoLoad: true,
	proxy: {
		type: 'ajax',
		api: {
			read: 'data/companies.json'
		}
	}
});