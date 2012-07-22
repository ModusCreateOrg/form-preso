/**
 * This is an Abstract Class that will provide a single field for
 * associations that appears as a DataView with icons for create,
 * update, and destroy functionality that display a popup form.
 *
 * Required configs are formWindow, itemSelector, name and tpl.
 *
 * It is expected that you use divs with add-icon, edit-icon and
 * delete-icon classes in your tpl and that edit-icon and
 * delete-icon exist within each item node and a single add-icon
 * div exists outside of the item nodes.
 *
 * Adapted from the Modus Create Sencha Plugin Pack.
 */
Ext.define('FormPreso.cmp.PopupEditorDataViewField', {
    extend: 'FormPreso.cmp.DataViewField',

    addIconCls: 'add-icon',

    /**
     * Required @cfg - should be a class extending from MC.form.Panel
     */
    formWindow: null,
    formTitle: '',
    formCfg: null,

    /**
     * @property - will reference the instance if it is visible
     */
    formWindowInstance: null,

    style: 'position:relative',

    destroy: function() {
        if (this.formWindow) {
            this.killForm();
        }
        this.callParent(arguments);
    },

    onRender: function() {
        this.callParent(arguments);

        this.el.on({
            click: this.onAddClick,
            scope: this,
            delegate: 'div.' + this.addIconCls
        });
    },

    onRowClick: function(view, record, item, index, e) {
        var targetCls = e.getTarget().className;
        if (targetCls === this.editIconCls) {
            this.onEditClick(view, record);
        } else if (targetCls === this.deleteIconCls) {
            this.onDeleteClick(view, record);
        }
    },

    onAddClick: function() {
        var cfg = Ext.apply({
            listeners: {
                submit: this.onAddComplete,
                cancel: this.onFormCancel,
                scope: this
            }
        }, this.formCfg);

        this.formWindowInstance = Ext.create(this.formWindow, cfg);
        this.formWindowInstance.show();
    },

    onEditClick: function(view, model) {
        var cfg = Ext.apply({
            record: model,
            listeners: {
                submit: this.onEditComplete,
                cancel: this.onFormCancel,
                scope: this
            }
        }, this.formCfg);

        model.beginEdit();

        this.formWindowInstance = Ext.create(this.formWindow, cfg);
        this.formWindowInstance.setReadOnly(false);
        this.formWindowInstance.show();
    },

    onFormCancel: function() {
        this.killForm();
    },

    onAddComplete: function(form, model) {
        this.callParent(arguments);
        this.killForm();
    },

    onEditComplete: function(form, model) {
        this.callParent(arguments);
        this.killForm();
    },

    killForm: function() {
        if (this.formWindowInstance) {
            this.formWindowInstance.destroy();
            this.formWindowInstance = null;
        }
    }
});