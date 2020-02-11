node_modules/@financial-times/n-gage/index.mk:
	npm install --no-save --no-package-lock @financial-times/n-gage
	touch $@

-include node_modules/@financial-times/n-gage/index.mk

demo-certs:
	cd demos && $(SHELL) make-certs.sh
	@$(DONE)

demo-js:
	webpack --config demos/webpack.config.js
	@$(DONE)

demo-css:
	node-sass --include-path=bower_components --output demos/public demos/src/demo.scss
	@$(DONE)

demo-build: demo-js demo-css
	@$(DONE)

demo-watch:
	webpack --watch --config demos/webpack.config.js &
	node-sass --watch --include-path=bower_components --output demos/public demos/src/demo.scss &
	nodemon --inspect --ext js,css,html --watch demos/ --watch templates demos/start.js

demo-run:
	node demos/start

demo-with-guru: demo-build
	GURU_HOST=http://local.ft.com:3002 node demos/start

test: verify
	mocha --recursive
