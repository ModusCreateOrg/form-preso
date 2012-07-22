Ext.define('FormPreso.controller.CompanyGrid', {
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'grid', selector: 'companygrid' },
        { ref: 'form', selector: 'companyform' }
    ],

    init: function() {
        this.control({
            'companygrid button[action=add]': {
                click: this.onCompanyAddClick,
                scope: this
            },
            'companygrid button[action=delete]': {
                click: this.onCompanyDeleteClick,
                scope: this
            },
            'companygrid': {
                itemclick: this.onCompanyEditClick,
                scope: this
            }
        });
    },

    onCompanyAddClick: function(btn) {
        var form = this.getForm();
        form.loadRecord();
        form.show();

        this.getGrid().getSelectionModel().deselectAll();
    },

    onCompanyDeleteClick: function(btn) {
        var record = this.getSelectedCompanies(), store = this.getGrid().store;
        if (record.length > 0) {
            store.remove(record);
            store.sync();
        } else {
            Ext.Msg.alert('Delete Error', 'Please select one or more companies.');
        }
    },

    onCompanyEditClick: function(btn) {
        var records = this.getSelectedCompanies();
        if (records.length !== 1) {
            Ext.Msg.alert('Edit Error', 'Please select one company.');
        } else {
            this.getForm().loadRecord(records[0]);
        }
        this.getForm().show();
    },

    getSelectedCompanies: function() {
        return this.getGrid().getSelectionModel().getSelection();
    }
});
