sass:
	sass scss/bootstrap.scss public/css/styles.css

sass-min:
	sass scss/bootstrap.scss public/css/styles.css --style compressed

tsc:
	npm run-script tsc

emulate:
	export GOOGLE_APPLICATION_CREDENTIALS="admin_sdk.json"
	npm run-script functions

deploy:
	make tsc
	firebase deploy --only functions

lint:
	npm run-script lint
run:
	firebase functions:shell