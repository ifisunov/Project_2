
install:
	npm install

start:
	npx babel-node -- src/bin/index.js

publish:
	npm publish

lint:
	npx eslint .