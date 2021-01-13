# Quickbar links

example:
```
javascript:
(window.TwCheese && TwCheese.tryUseTool('OverviewHauls'))
|| $.ajax('https://cheesasaurus.github.io/twcheese/launch/OverviewHauls.js?'
+~~((new Date())/3e5),{cache:1,dataType:"script"});void 0;
```

Q: Why `$.ajax` instead of `$.getScript`?\
A: `$.getScript` completely prevents caching. This would mean: each time the player clicks the link, they'd have to wait for network.

### What's this weird date thing?

```
~~((new Date())/3e5)
```

Answer: used to cachebust every 5 minutes. In case hosting's response headers can't be controlled.
- There's 300000 milliseconds in 10 minutes. (5 * 60 * 1000). `3e5` is a shortand way of writing "three followed by five zeroes"
- `~~` is a bit flipping trick to turn a float into a 32 bit int. Which in this case has the same result as rounding down.

e.g.
```
Math.floor((new Date('2019-06-19T04:20:00.000Z'))/300000)   // 5203060
~~((new Date('2019-06-19T04:20:00.000Z'))/3e5)              // 5203060
```

These tricks save 11 characters. keeping the quickbar script compact, for easy sharing.

To demonstrate this resulting in differing values, in 5 minute intervals:

4 minutes and 59 seconds later:
```
~~((new Date('2019-06-19T04:24:59.000Z'))/3e5)              // 5203060 (same thing, hasn't changed yet)
```

5 minutes later: 
```
~~((new Date('2019-06-19T04:25:00.000Z'))/3e5)              // 5203061 (value increased by 1)
```

1 second earlier:
```
~~((new Date('2019-06-19T04:19:59.000Z'))/3e5)              // 5203059 (value decreased by 1)
```
