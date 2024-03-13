CTN=`which podman >/dev/null 2>&1 && echo podman || echo docker`
IMAGENAME="itsm-ng_api"
VERSION="1.6.0"

default: build

build:
	$(CTN) build -t $(IMAGENAME):$(VERSION) .

build-prod:
	$(CTN) build -t docker.io/itsmng/$(IMAGENAME):$(VERSION) .

run:
	$(CTN) run -it --rm -p 8080:80 $(IMAGENAME):$(VERSION)

clean:
	$(CTN) rmi -f $(IMAGENAME):$(VERSION)