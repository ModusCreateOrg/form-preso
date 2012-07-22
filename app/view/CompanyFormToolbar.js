Ext.define('FormPreso.view.CompanyFormToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'companyformtoolbar',

    readOnly: true,
    addMode: false,
    height: 44,
    form: null,

    initComponent: function() {
        this.items = [
            '->',
            { text: 'Edit', cls: 'action-btn', iconCls: 'edit', action: 'edit', hidden: !this.readOnly },
            { text: 'Save', cls: 'action-btn', iconCls: 'save', action: 'save', hidden: this.readOnly, disabled: true },
            { text: 'Cancel', cls: 'cancel-btn', iconCls: 'cancel', action: 'cancel', hidden: this.readOnly }
        ];

        this.callParent();

        if (this.form) {
            this.form.on({
                modechange: this.onModeChange,
                readonlychange: this.onReadOnlyChange,
                dirtychange: this.onStatusChange,
                validitychange: this.onStatusChange,
                scope: this
            });
        }
    },

    onModeChange: function(form, addMode) {
        this.addMode = addMode;
    },

    onReadOnlyChange: function(form, readOnly) {
        this.readOnly = readOnly;
        if (this.readOnly) {
            this.down('button[action=save]').hide();
            this.down('button[action=cancel]').hide();
            this.down('button[action=edit]').show();
        } else {
            this.down('button[action=edit]').hide();
            this.down('button[action=save]').show();
            this.down('button[action=cancel]').show();
        }
    },

    onStatusChange: function(form) {
        var disabled = (!form.isDirty() || !form.isValid());
        this.down('button[action=save]').setDisabled(disabled);
    }
});