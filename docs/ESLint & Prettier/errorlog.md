---
layout: page
title: 오류로그
parent: ESLint & Prettier
nav_order: 2
has_children: false
permalink: /es/2/
---

# 오류 로그  

## 1\. "Delete(Insert) `;`eslint" 오류  
- **eslint**의 rules와 **prettier**에 둘다 같은 규칙을 설정해주어서 나는 오류였다.  

```
"rules": {
    "semi": [1, "always"],
}
```  

```
{
	"singleQuote": true,
	"semi": false,
	"useTabs": false,
	"tabWidth": 2,
	"trailingComma": "all",
	"printWidth": 120,
	"endOfLine": "auto",
	"arrowParens": "avoid"
} 
```  

- **eslint**에는 `always`로 하고 **prettier**에는 `false`로 하니 당연히 오류가 나지 ..ㅎ
