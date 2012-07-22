Ext.define('FormPreso.view.form.field.Employees', {
	extend: 'FormPreso.cmp.PopupEditorDataViewField',
    xtype: 'employeesfield',
    // requires: ['FormPreso.view.form.Employee'],

    formWindow: 'FormPreso.view.form.Employee',
    fieldLabel: 'Employees',

    initComponent: function() {
        this.tpl = new Ext.XTemplate(
            '<label>', this.fieldLabel, '</label>',
            '<div class="add-icon"></div>',
            '<div class="dataviewfields">',
                '<tpl for=".">',
                    '<div class="dataviewfields-row">',
                        '<div class="data">',
                            '<span class="name">{name}</span>, ',
                            '<span class="title">{title}</span>',
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