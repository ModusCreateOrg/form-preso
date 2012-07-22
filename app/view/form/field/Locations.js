Ext.define('FormPreso.view.form.field.Locations', {
	extend: 'FormPreso.cmp.PopupEditorDataViewField',
    xtype: 'locationsfield',
    requires: ['FormPreso.view.form.Location'],

    formWindow: 'FormPreso.view.form.Location',
    fieldLabel: 'Locations',

    initComponent: function() {
        this.tpl = new Ext.XTemplate(
            '<label>', this.fieldLabel, '</label>',
            '<div class="add-icon"></div>',
            '<div class="dataviewfields">',
                '<tpl for=".">',
                    '<div class="dataviewfields-row">',
                        '<div class="data">',
                            '<div class="{[values.isHeadquarters ? "hq" : ""]}">{city}, {state}</div>',
                        '</div>',
                        '<div class="icons">',
                            '<div class="delete-icon"></div>',
                            '<div class="edit-icon"></div>',
                        '</div>',
                    '</div>',
                '</tpl>',
            '</div>'
        );

        this.callParent();
    }
});