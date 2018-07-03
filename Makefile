.PHONY: build run test stop logs

build:
	docker build --no-cache -t id-signature-proxy:local .

run:
	docker run --detach --env-file=.env-ci --name=id-signature-proxy --publish="8000:8000" id-signature-proxy:local

logs:
	docker logs id-signature-proxy -f

stop:
	docker stop id-signature-proxy

run-test:
	docker run --env-file=.env-ci --name=id-signature-proxy --publish="8000:8000" id-signature-proxy:local yarn test

clean:
	docker stop id-signature-proxy
	docker rm id-signature-proxy
	docker rmi id-signature-proxy:local
	docker rmi node:8.11.1

test: build run-test
