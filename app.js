Ext.Loader.setConfig({
    enabled: true,
    paths: {
        'FormPreso': 'app'
    }
});

Ext.application({
    name: 'FormPreso',

    controllers: ['CompanyGrid', 'CompanyForm'],

    requires: [
    	'FormPreso.view.CompanyGridPanel', 
    	'FormPreso.view.CompanyFormPanel'
    ],

    launch: function() {
        Ext.create('Ext.container.Viewport', {
            layout: {
                type: 'hbox',
                align: 'stretch'
            },
            padding: 50,
            items: [
                {
                    xtype: 'companygrid',
                    width: 300,
                    margin: '0 50 0 0'
                },
                {
                    xtype: 'companyform',
                    flex: 1,
                    hidden: true
                }
            ]
        });
    }
});