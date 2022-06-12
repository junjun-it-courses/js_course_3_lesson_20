'use strict';


function model() {
    const isEmptyString = key => !!key.trim();


    return {
        dbKey: null,
        currentId: null,

        setData(data) {
            const localData = structuredClone(data);
            localData.id = this.currentId;

            const dataFromDB = localStorage.getItem(this.dbKey);
            const dataToSave = dataFromDB ?  JSON.parse(dataFromDB) : [];
            let response = null;

            dataToSave.push(localData);

            try {
                localStorage.setItem(this.dbKey, JSON.stringify(dataToSave));
                response = {success: true, data: localData};
                this.currentId += 1;
            } catch (e) {
                response = {success: false, errors: e}
            }


            return response;
        },

        getData() {
            return JSON.parse(
                localStorage.getItem(this.dbKey)
            );
        },

        init(dbKey) {
            if(!isEmptyString(dbKey)) throw new Error('No key provided')
            this.dbKey = dbKey;

            const dataFromDB = JSON.parse(localStorage.getItem(this.dbKey));
            this.currentId = dataFromDB ? dataFromDB[dataFromDB.length - 1].id + 1 : 1;
        }
    }
}