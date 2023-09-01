# pomodoro-web

## ~~Autodeploy~~
~~Cualquier cambio subido a la rama master o test se va deployar automaticamente:~~
~~* master -> [pomodoro.pagnus.net](https://pomodoro.pagnus.net/)~~
~~* test -> [test-pomodoro.pagnus.net](https://test-pomodoro.pagnus.net/)~~

Ahora esta publicado en cloudflare. Deploy:

```
docker run -it --rm -v $(pwd):/data node bash
cd data && mkdir build && cd build
cp ../.env .
yarn add --dev wrangler
node_modules/.bin/wrangler pages project list
node_modules/.bin/wrangler pages publish ../src/ --project-name=pomodoro-pagnus

```

