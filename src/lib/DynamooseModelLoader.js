const DataLoader = require('dataloader');

class DynamooseModelLoader {
  constructor({ model }) {
    this.model = model;
    this.loader = new DataLoader(this.loadMany.bind(this), {});
  }

  async loadMany(ids) {
    const documents = await this.model.batchGet(ids.map(id => ({ id })));
    return Promise.all(documents);
  }

  load(id) {
    return this.loader.load(id);
  }
}

module.exports = DynamooseModelLoader;
