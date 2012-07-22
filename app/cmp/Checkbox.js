Ext.define('FormPreso.cmp.Checkbox', {
    extend: 'Ext.form.field.Checkbox',
    xtype: 'checkbox',
    
    cls: 'checkbox',
    boxLabelAlign: 'after',
    beforeBoxLabelTpl: '<span>',
    afterBoxLabelTpl: '</span>'
});