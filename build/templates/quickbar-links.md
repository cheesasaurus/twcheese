### use distributable (recommended for playing)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('___TOOL_ID___'))
|| $.ajax('___HOSTING_ROOT___/launch/___FILE___?'
+~~((new Date())/3e5),{cache:1})
```

### use es modules (recommended for development)

```javascript
javascript:
(window.TwCheese && TwCheese.tryUseTool('___TOOL_ID___'))
|| $.getScript('___HOSTING_ROOT___/launch/esm/___FILE___')
```
