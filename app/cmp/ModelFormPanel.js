Ext.define('FormPreso.cmp.ModelFormPanel', {
    extend: 'Ext.form.Panel',
    xtype: 'modelformpanel',

    model: null, // Class name of the model
    modelId: null, // Optional: id of the model instance being provided
    record: null, // Optional: reference to an existing model instance
    addMode: false,

    initComponent: function() {
        this.addEvents('load', 'unload', 'commit', 'modechange', 'readonlychange');

        this.callParent();

        this.getForm().trackResetOnLoad = true;

        if (Ext.isString(this.model) && this.modelId) {
            Ext.ClassManager.get(this.model).load(this.modelId, {
                success: this.loadRecord,
                scope: this
            });
        } else {
            this.loadRecord(this.record);
            delete this.record; //No longer need this
        }
    },

    loadRecord: function(record) {
        var i, len, associations, name, field;

        this.setAddMode(!record); // when no record is provided, put in add mode
        this.setReadOnly(!!record); // when a record is provided, default to readOnly

        if (!record) {
            record = Ext.create(this.model); //create phantom record
        }

        this.callParent([record]);

        // loadRecord() won't include associated data, so let's do that.
        associations = record.associations.items;
        for (i=0, len=associations.length; i<len; i++) {
            name = associations[i].name;
            field = this.down('[name='+name+']');
            if (field && field.isFormField && field.bindStore) {
                field.bindStore(record[name]());
            }
        }

        this.fireEvent('load', this, record);
    },

    unloadRecord: function() {
        var record = this._record;
        delete this._record;
        this.form.setValues({});
        this.fireEvent('unload', this, record);
    },

    commit: function(callback, scope) {
        var record = this.form.getRecord();
        
        if (this.form.isDirty()) {
            this.form.updateRecord(record);

            record.commit();
            this.fireEvent('commit', this, record);
        }
    },

    setReadOnly: function(readOnly) {
        var cmps = this.query('[isFormField]'), i, len;
        
        readOnly = !!readOnly;

        if (this.readOnly !== readOnly) {
            for (i=0, len=cmps.length; i<len; i++) {
                cmps[i].setReadOnly(readOnly);
            }
            this.readOnly = readOnly;
            this.fireEvent('readonlychange', this, readOnly);
        }
    },

    setAddMode: function(addMode) {
        if (this.addMode !== addMode) {
            this.addMode = addMode;
            this.fireEvent('modechange', this, addMode);
        }
    }
});