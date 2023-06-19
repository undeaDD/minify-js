skip_pull=false
all=false

clean:
	./gradlew clean
docker-build:
	docker build -t devatherock/minify-js:latest .
test:
ifeq ($(all), true)
	yamllint -d relaxed . --no-warnings
endif
	SKIP_PULL=$(skip_pull) ./gradlew test $(additional_gradle_args)