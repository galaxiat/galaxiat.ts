build:
	rm -rf ./dist
	npm run build

dev:
	node ./dist/index.js

install:
	npm install -g .

install_deps:
	npm install

publish:
	npm publish