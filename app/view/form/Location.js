Ext.define('FormPreso.view.form.Location', {
    extend: 'FormPreso.cmp.PopupFormWindow',
    xtype: 'locationform',
    requires: [
        'FormPreso.cmp.Checkbox',
        'FormPreso.model.Location'
    ],

    width: 400,
    height: 500,

    formTitle: 'Location',
    model: 'FormPreso.model.Location',

    buildFields: function() {
        return [
            {
                xtype: 'textfield',
                name: 'address1',
                fieldLabel: 'Address 1',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'address2',
                fieldLabel: 'Address 2'
            },
            {
                xtype: 'textfield',
                name: 'city',
                fieldLabel: 'City',
                allowBlank: false
            },
            {
                xtype: 'combobox',
                name: 'state',
                fieldLabel: 'State',
                store: ['CA', 'DC', 'MA', 'MD', 'NC', 'NY', 'VA'],
                autoSelect: false,
                typeAhead: true,
                forceSelection: true,
                queryMode: 'local',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'zip',
                fieldLabel: 'Zip/Postal Code',
                allowBlank: false
            },
            {
                xtype: 'checkbox',
                name: 'isHeadquarters',
                boxLabel: 'Headquarters'
            }
        ];
    }
});