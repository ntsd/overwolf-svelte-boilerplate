# lol-auto-accept

Auto accept League of Legends and TFT queuing match Overwolf plugin

## To Fix

Replace

```
const params = route.exec(path);
if (params) {
    const id = url.pathname + url.search;
    const intent = { id, invalidating, route, params: decode_params(params), url };
    return intent;
}
```

To 

```
const id = url.pathname + url.search;
const intent = { id, invalidating, route, url };
return intent;
```

because params will be undefine and intent is not return
