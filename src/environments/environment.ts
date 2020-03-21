// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `.angular-cli.json`.

export const environment = {
  production: false,
  SWAGGER_URL: 'http://localhost:8080/swagger-ui.html',
  TWITCH_AUTH_URL: 'https://id.twitch.tv/oauth2/authorize?response_type=token&client_id=048o30kiq54suyv43jio7boaknv8e2&redirect_uri=http://localhost:4200&scope=user_subscriptions&state=c3ab8aa609ea11e793ae92361f002671',
  JAVA_API: 'http://localhost:8080/',
};
