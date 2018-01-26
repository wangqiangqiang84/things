# nandcloud.cn  www

> cloud of gateway

## Build Setup

``` bash
# install alibaba cnpm

npm install -g cnpm --registry=https://registry.npm.taobao.org 

# install dependencies
cnpm install

# install jquer

cnpm install --save jquery

# install loader
cnpm install --save -dev css-loader style-loader sass-loader less-loader postcss-loader stylus-loader

# install stylus
cnpm install stylus -g

# install iview
cnpm install iview --save

# install vue-resource
cnpm install --save vue-resource

# install babel-polyfill, some browser cannot support ES6,using babel-polyfill fix
cnpm install --save-dev babel-polyfill

# serve with hot reload at localhost:8080
cnpm run dev

# build for production with minification
cnpm run build

# build for production and view the bundle analyzer report
cnpm run build --report

# run unit tests
cnpm run unit

# run e2e tests
cnpm run e2e

# run all tests
cnpm test
```

For detailed explanation on how things work, checkout the [guide](http://vuejs-templates.github.io/webpack/) and [docs for vue-loader](http://vuejs.github.io/vue-loader).
