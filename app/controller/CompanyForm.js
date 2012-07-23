Ext.define('FormPreso.controller.CompanyForm', {
    extend: 'Ext.app.Controller',
    
    refs: [
        { ref: 'grid', selector: 'companygrid' },
        { ref: 'form', selector: 'companyform' }
    ],

    init: function() {
        this.control({
            'companyform button[action=edit]': {
                click: this.onEditClick,
                scope: this
            },
            'companyform button[action=save]': {
                click: this.onSaveClick,
                scope: this
            },
            'companyform button[action=cancel]': {
                click: this.onCancelClick,
                scope: this
            },
            'companyform button[action=reset]': {
                click: this.onResetClick,
                scope: this
            },
            'companyform': {
                commit: this.onSave,
                scope: this
            }
        });
    },

    onEditClick: function(btn) {
        this.getForm().setReadOnly(false);
    },

    onSaveClick: function(btn) {
        var form = this.getForm(), 
            record = form.getForm().getRecord(),
            grid = this.getGrid(),
            selModel = grid.getSelectionModel();

        form.commit();

        if (form.addMode) {
            grid.store.add(record);
        }

        form.loadRecord(record); //allows form to no longer be dirty
        selModel.deselect(record); //circumvent ExtJS bug
        selModel.select(record); //make sure this record is selected
    },

    onCancelClick: function(btn) {
        var form = this.getForm();
        form.getForm().reset();
        form.unloadRecord(); 
        form.setReadOnly(true);
        if (form.addMode) {
            form.hide();
        }
    },

    onResetClick: function(btn) {
        this.getForm().getForm().reset();
    },

    onSave: function(form, record, success) {
        if (success) {
            Ext.Msg.alert('Success', 'Company has been updated.');
        } else {
            Ext.Msg.alert('Failure', 'Company has not been updated.');
        }
    }
});
