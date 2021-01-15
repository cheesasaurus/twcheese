### use optimal build (recommended for playing)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('OverviewHauls'))
|| $.ajax('https://cheesasaurus.github.io/twcheese/launch/OverviewHauls.js?'
+~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
```

### use es modules (recommended for development)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('OverviewHauls'))
|| $.getScript('https://cheesasaurus.github.io/twcheese/launch/esm/OverviewHauls.js');
void 0;
```
