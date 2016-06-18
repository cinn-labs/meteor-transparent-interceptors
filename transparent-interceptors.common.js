TransparentInterceptors = {};

// Empty funcion to simulate code on client, avoiding adding "if (Meteor.isServer)" on every call
TransparentInterceptors.set = function() {};

export default TransparentInterceptors;
