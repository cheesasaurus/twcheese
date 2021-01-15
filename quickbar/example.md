### use optimal build (recommended for playing)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('example'))
|| $.ajax('https://cheesasaurus.github.io/twcheese/launch/example.js?'
+~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
```

### use es modules (recommended for development)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('example'))
|| $.getScript('https://cheesasaurus.github.io/twcheese/launch/esm/example.js');
void 0;
```
