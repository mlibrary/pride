# Some example trees


```
      type = field_boolean
       value = AND
    /               \
type = field       type = field
value = title      value = author
   |                 |
type = literal    type=literal
value = X         value=Y
  
title:X     AND   author:Y

```


```
type = field
value = all_fields
     |
type: literal
value = <query string>

all_fields:(<query string>)
```

```
type = tag
value = +
children
   |
type = literal
value = XYZ

+XYZ

```

```
     type = tag
     value = nil
       children
   /              \
  |                |
type = tag      type = tag
value = +       value = -
  |                |
type = field     type = field
value = title    value = author
  |                |
type = literal   type = literal
value = X        value = Y

+title:X -author:Y

```

```javascript
new Pride.FieldTree.Tag(null,
  new Pride.FieldTree.Tag('+',
    new Pride.FieldTree.Field('title', new Pride.FieldTree.Literal('X'))),
  new Pride.FieldTree.Tag('-',
    new Pride.FieldTree.Field('author', new Pride.FieldTree.Literal('Y'))))

```
