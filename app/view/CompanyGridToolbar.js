Ext.define('FormPreso.view.CompanyGridToolbar', {
    extend: 'Ext.toolbar.Toolbar',
    xtype: 'companygridtoolbar',

    readOnly: true,
    addMode: false,
    height: 44,
    form: null,

    initComponent: function() {
        this.items = [
            { text: 'Delete', cls: 'delete-btn', iconCls: 'delete', action: 'delete', disabled: true },
            '->',
            { text: 'Add', cls: 'action-btn', iconCls: 'add', action: 'add' }
        ];

        this.callParent();

        if (this.grid) {
            this.grid.on('selectionchange', this.onSelectionChange, this);
        }
    },

    onSelectionChange: function(selModel, selectedModels) {
        this.down('button[action=delete]').setDisabled(selectedModels.length === 0);
    }
});