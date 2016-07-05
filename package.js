Package.describe({
  name: 'cinn:transparent-interceptors',
  version: '0.1.1',
  summary: 'Collection smart interceptors',
  git: 'https://github.com/cinn-labs/meteor-transparent-interceptors',
  documentation: 'README.md'
});

Package.onUse(function(api) {
  const both = ['client', 'server'];
  api.versionsFrom('1.3.4');

  api.export('TransparentInterceptors');

  api.use('ecmascript');
  api.use('meteor-base');
  api.use('cinn:logged-user@0.0.3');
  api.use("matb33:collection-hooks@0.8.1");

  api.addFiles('transparent-interceptors.common.js', both);
  api.addFiles('transparent-interceptors.server.js', 'server');
});
