Pride.init(function() {
  x = Pride.AllDatastores.newSearch('mirlyn');
  y = new Pride.FieldBooleanNode(
        'OR',
        new Pride.FieldBooleanNode(
          'AND',
          new Pride.FieldNode(
            'title',
            new Pride.ValueBooleanNode(
              'OR',
              new Pride.LiteralNode('one'),
              new Pride.LiteralNode('another number'),
              new Pride.ValueBooleanNode(
                'AND',
                new Pride.LiteralNode('two'),
                new Pride.GroupNode(
                  new Pride.LiteralNode('two A'),
                  new Pride.LiteralNode('two B')
                ),
                new Pride.LiteralNode('three')
              ),
              new Pride.LiteralNode('blah')
            )
          ),
          new Pride.FieldNode(
            'author',
            new Pride.LiteralNode('four')
          )
        ),
        new Pride.FieldBooleanNode(
          'AND',
          new Pride.FieldNode(
            'title',
            new Pride.LiteralNode('seven')
          ),
          new Pride.FieldNode(
            'author',
            new Pride.ValueBooleanNode(
              'OR',
              new Pride.LiteralNode('ten')
            )
          )
        )
      );
  z = new Pride.ValueBooleanNode(
        'AND',
        new Pride.GroupNode(
          new Pride.LiteralNode('word')
        )
      )
});
