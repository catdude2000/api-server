'use strict';

class Collection {
  constructor(model) {
    this.model = model;
  }

  async create(jsonObj) {
    try {
      let record = await this.model.create(jsonObj);
      return record;
    } catch (e) {
      console.error(`error when creating data for model: ${this.model.name}`);
      return e;
    }
  }
  async read(id, options = {}) {
    let records = null;
    try {
      if (id) {
        options.where = { id: id };
        records = await this.model.findOne(options);

      } else records = await this.model.findAll();
      return records;
    } catch (e) {
      console.error(`error when reading data for model: ${this.model.name}`);
      return e;
    }
  }

  async update(id, jsonObj) {
    try {
      if (!id) {
        throw new Error(`No ID provided for the model: ${this.model.name}`);
      }
      let record = await this.model.findAll({where: {id} });
      let updatedRecord = await record.update(jsonObj);
      return updatedRecord; 
      //need {} for if?
    } catch (e) {
      console.error(`error when updating model: ${this.model.name}`);
      return e;
    }
  }

  async delete(id) {
    try {
      if (!id)
        throw new Error(`No ID provided for the model: ${this.model.name}`);
      let deletedRecord = await this.model.destroy({ where: {id} }); //need id only here?
      return deletedRecord;
      
    } catch (e) {
      console.error(`error when deleting model: ${this.model.name}`);
      return e;
    }

  }
}

module.exports = Collection;