build:
	rm -rf ./dist
	npm run build
dev:
	node ./dist/index.js

publish:
	npm publish