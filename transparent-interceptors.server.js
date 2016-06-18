import _ from 'lodash';
import TransparentInterceptors from './transparent-interceptors.common';

TransparentInterceptors.set = (params) => new TransparentInterceptorsTriggerable(params);

class TransparentInterceptorsTriggerable {
  constructor(params) {
    // Params
    this.collection = params.collection;
    this.collections = params.collections || [];
    this.condition = params.condition;
    this.query = params.query;
    // Binds
    this.setHooks = this.setHooks.bind(this);
    this.shouldUseFilter = this.shouldUseFilter.bind(this);
    // Preparations
    if(!!this.collection) this.collections.push(this.collection);
    // Init
    this.setHooks();
  }

  setHooks() {
    const self = this;
    _.each(self.collections, function(collection) {
      collection.before.find(self.getBeforeFindHook());
      collection.before.findOne(self.getBeforeFindHook());
    });
  }

  getBeforeFindHook() {
    const self = this;
    return function(userId, selector, options) {
      userId = userId || Meteor.loggedUserIdEnv.get();
      if(!self.shouldUseFilter(userId, selector, options)) return;
      self.query(userId, selector, options);
    };
  }

  shouldUseFilter(userId, selector, options) {
    userId = userId || Meteor.loggedUserIdEnv.get();
    const disableTransparentFilter = _.result(options, 'disableTransparentFilter', false);
    return !disableTransparentFilter && !!this.condition(userId, selector, options);
  }
}
