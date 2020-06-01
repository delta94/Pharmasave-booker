sass-compile:
	sass scss/bootstrap.scss public/css/styles.css

sass-compress:
	sass scss/bootstrap.scss public/css/styles.css --style compressed

tsc:
	npm run-script tsc

emulate:
	npm run-script functions

link-creds:
	export GOOGLE_APPLICATION_CREDENTIALS="admin_sdk.json"
