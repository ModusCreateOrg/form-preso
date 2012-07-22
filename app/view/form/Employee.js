Ext.define('FormPreso.view.form.Employee', {
    extend: 'FormPreso.cmp.PopupFormWindow',
    xtype: 'employeeform',
    requires: ['FormPreso.model.Employee'],

    width: 400,
    height: 240,

    formTitle: 'Employee',
    model: 'FormPreso.model.Employee',

    buildFields: function() {
        return [
            {
                xtype: 'textfield',
                name: 'name',
                fieldLabel: 'Name',
                allowBlank: false
            },
            {
                xtype: 'textfield',
                name: 'title',
                fieldLabel: 'Title'
            }
        ];
    }
});