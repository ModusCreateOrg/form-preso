Ext.define('FormPreso.model.Company', {
    extend: 'Ext.data.Model',
    requires: ['FormPreso.model.Employee', 'FormPreso.model.Location'],
    
    fields: ['id', 'name', 'headCount'],

    hasMany: [
    	{ name: 'employees', model: 'FormPreso.model.Employee' },
    	{ name: 'locations', model: 'FormPreso.model.Location' }
    ]
});