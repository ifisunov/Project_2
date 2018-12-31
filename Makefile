
install:
	npm install

start:
	npx babel-node -- src/bin/gendiff.js

publish:
	npm publish

build:
	npm run build

lint:
	npx eslint .

test:
	jest
