Ext.define('FormPreso.cmp.PopupFormWindow', {
    extend: 'Ext.window.Window',

    width: 400,
    height: 300,
    closable: false,
    draggable: true,
    resizable: false,
    modal: true,
    cls: 'form-window',

    layout: 'fit',
    addMode: true,

    initComponent: function() {
        this.addEvents('submit', 'cancel');

        if (!this.title) {
            this.title = (this.addMode ? 'Add '+this.formTitle : 'Edit '+this.formTitle);
        }

        this.items = this.buildItems();
        this.dockedItems = this.buildDockedItems();

        this.callParent();
    },

    buildItems: function() {
        return [
            {
                xtype: 'modelformpanel',
                model: this.model,
                record: this.record,
                readOnly: false,
                addMode: this.addMode,
                layout: {
                    type: 'vbox',
                    align: 'stretch'
                },
                border: false,
                bodyBorder: false,
                defaults: {
                    labelAlign: 'top',
                    labelSeparator: ''
                },
                items: this.buildFields(),
                listeners: {
                    validitychange: this.onValidityChange,
                    scope: this
                }
            }
        ];
    },

    buildDockedItems: function() {
        return [
            {
                xtype: 'toolbar',
                dock: 'bottom',
                items: [
                    '->',
                    {
                        text: 'Cancel',
                        action: 'cancel',
                        cls: 'cancel-btn',
                        iconCls: 'cancel',
                        handler: this.onCancel,
                        scope: this
                    },
                    {
                        text: (this.addMode ? 'Add '+this.formTitle : 'Update '+this.formTitle),
                        action: (this.addMode ? 'create' : 'update'),
                        cls: 'action-btn',
                        iconCls: (this.addMode ? 'add' : 'save'),
                        disabled: this.addMode,
                        handler: this.onSubmit,
                        scope: this
                    }
                ]
            }
        ];
    },

    onValidityChange: function(form, valid) {
        this.down('button[action=create], button[action=update]').setDisabled(!valid);
    },

    onSubmit: function() {
        var form = this.down('modelformpanel').getForm();
        form.updateRecord(form.getRecord());
        this.fireEvent('submit', this, form.getRecord());
    },

    onCancel: function() {
        this.fireEvent('cancel', this);
    },

    setReadOnly: function(readOnly) {
        this.down('modelformpanel').setReadOnly(readOnly);
    }
});