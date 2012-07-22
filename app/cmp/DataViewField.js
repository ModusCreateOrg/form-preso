Ext.define('FormPreso.cmp.DataViewField', {
    extend: 'Ext.view.View',
    mixins: {
    	field: 'Ext.form.field.Field'
    },

    addIconCls: 'add-icon',
    editIconCls: 'edit-icon',
    deleteIconCls: 'delete-icon',

    itemSelector: 'div.dataviewfields-row',

    emptyText: '<span class="dataview-emptytext">None</span>',
    deferEmptyText: false,

    initComponent: function() {
        this.addEvents('itemadd', 'itemedit', 'itemdelete', 'revert');
        this.callParent();
        this.on('itemclick', this.onRowClick, this);
    },
    
    onRender: function() {
        this.callParent(arguments);
        this.setReadOnly(this.readOnly);
    },

    isEqual: function(value1, value2) {
        //TODO: improve performance here
        return (Ext.encode(value1) === Ext.encode(value2));
    },

    bindStore: function(store) {
    	var hadStore = this.detachStore();
    	this.callParent(arguments);
    	this.attachStore(store, hadStore);
    },

    detachStore: function() {
        if (this.store) {
            this.store.un('datachanged', this.onStoreChange, this);
            this.store.un('update', this.onStoreChange, this);
            this.store.un('add', this.onStoreChange, this);
            this.store.un('remove', this.onStoreChange, this);
            return true;
        }
        return false;
    },

    attachStore: function(store, hadStore) {
        if (store !== null) {
            this.value = this.calculateValue();
            this.initValue();

            this.store.on('datachanged', this.onStoreChange, this);
            this.store.on('update', this.onStoreChange, this);
            this.store.on('add', this.onStoreChange, this);
            this.store.on('remove', this.onStoreChange, this);

            if (hadStore) {
                this.fireEvent('dirtychange', this, false);
            }
        }
    },

    getName: function() {
        return this.name;
    },

    reset: function() {
        if (this.store) {
            this.store.rejectChanges();
            this.fireEvent('revert', this);
        }
        if (this.refresh) {
        	this.refresh();
        }
    },

    calculateValue: function() {
        var values = [], r, rLen, record, value, c, cLen, fieldName;

        for (r=0, rLen=this.store.getCount(); r<rLen; r++) {
            record = this.store.getAt(r);
            value = {};
            for (c=0, cLen=record.fields.getCount(); c<cLen; c++) {
                fieldName = record.fields.getAt(c).name;
                value[fieldName] = record.get(fieldName);
            }
            values[r] = value;
        }

        return values;
    },

    onStoreChange: function() {
        this.setValue(this.calculateValue());
    },

    setReadOnly: function(readOnly) {
        this.readOnly = readOnly;

        if (this.readOnly) {
            this.addCls(this.readOnlyCls);
        } else {
            this.removeCls(this.readOnlyCls);
        }
    },

    getReadOnly: function() {
        return this.readOnly;
    },

    getIconDisplay: function(scope) {
        return function() {
            return scope.getReadOnly() ? "none" : "inline-block";
        };
    },

    onRowClick: function(view, record, item, index, e) {
        var targetCls = e.getTarget().className;
        if (targetCls === this.editIconCls) {
            this.onEditClick(view, record);
        } else if (targetCls === this.deleteIconCls) {
            this.onDeleteClick(view, record);
        }
    },

    onDeleteClick: function(view, model) {
        this.store.remove(model);
        this.refresh();
        this.fireEvent('itemdelete', this, model);
    },

    onAddComplete: function(form, model) {
        this.store.add(model);
        this.refresh();
        this.fireEvent('itemadd', this, model);
    },

    onEditComplete: function(form, model) {
        model.endEdit();
        this.refresh();
        this.fireEvent('itemedit', this, model);
    }
});