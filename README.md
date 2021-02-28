# POC for api linting in editor

This will may work, checkout script/patch-ool.sh and see how ugly it is.

this is needed as @stoplight/spectral is not happy in the context of create-react-app

I am pretty sure this is the wrong way to fix things but it works and for today that is what I want.

I attempted to fork all the things to make modules that would not need patching but that didn't go very good

This is a list of things that would need to be fixed:
1. @stoplight/spectal -> adjust to fixed json and yaml
2. @stoplight/yaml -> adjust to fixed ordered-object-literal
3. @stoplight/json -> adjust to fixed ordered-object-literal
4. @stoplight/ordered-object-literal -> make it happy in create-react-app

A better thing to do might be to make a service out of validation
