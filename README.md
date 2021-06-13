# mini-microservice-app

> Event-driven Microservice architecture sample app

## Requirements

- Docker - https://docs.docker.com/get-docker/
- Minikube - https://v1-18.docs.kubernetes.io/docs/tasks/tools/install-minikube/
- Kubectl - https://kubernetes.io/docs/tasks/tools/#kubectl
- Ingress-nginx - https://kubernetes.github.io/ingress-nginx/deploy/
- Skaffold - https://skaffold.dev/docs/install/

## Setup

### For Docker Desktop

Enable Kubernetes in Docker Desktop settings\
https://www.kindacode.com/article/how-to-enable-kubernetes-in-docker-desktop/

Add Ingress-nginx controller\
https://kubernetes.github.io/ingress-nginx/deploy/#docker-desktop

Update your /etc/hosts.

```
127.0.0.1	api.microservice.test
127.0.0.1	app.microservice.test
```

### For Minikube

Enable Ingress-nginx in Minikube

```bash
minikube config set vm-driver <driver_name> # hyperkit
minikube delete
minikube start
minikube addons enable ingress
```

Point shell to minikube's docker-daemon

```bash
# Set
eval $(minikube -p minikube docker-env)

# Unset
eval $(minikube docker-env -u)
```

Update your /etc/hosts and add minikube ip address

```bash
# Get your minikube ip from terminal
minikube ip
> 192.168.64.2

# Add on /etc/hosts
192.168.64.2	api.microservice.test
192.168.64.2	app.microservice.test
```

## Run

From the root project directory, start Skaffold\
If it fails, just re-run the command

```bash
# Build and deploy your app every time your code changes,
skaffold dev

# Build and deploy your app once, similar to a CI/CD pipeline
skaffold run
```

You can now use and test the app.

**Frontend**\
http://app.microservice.test/

**Backend**\
http://api.microservice.test/
