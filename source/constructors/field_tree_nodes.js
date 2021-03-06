// Copyright (c) 2015, Regents of the University of Michigan.
// All rights reserved. See LICENSE.txt for details.

// Authored by Colin Fulton (fultonis@umich.edu)

import _ from 'underscore';

Pride.FieldTree = {};

// Factory for creating functions to create various field tree node types.
Pride.Core.nodeFactory = function(type, child_types, extention) {
  return function(value) {
           this.children     = Pride.Util.slice(arguments, 1);
           if (this.children.length === 1 && Array.isArray(this.children[0])) {
             this.children = this.children[0];
           }
           this.type         = type;
           this.value        = value.trim();
           this.child_types  = child_types || [];
           this.validIfEmpty = true;

           // Check to make sure a child is valid for this node.
           // If it is, add it to the array of children.
           this.addChild = function(new_child) {
             if (_.find(
                   this.child_types,
                   function(a_type) { return new_child.type === a_type; }
                 )) {
               this.children.push(new_child);
             } else {
               throw 'Not a valid child for a ' + this.type;
             }

             return this;
           };

           // Check to see if this object is, or contains, an object which
           // which matches the query object.
           this.contains = function(query) {
             if (this.matches(query)) {
               return this;
             } else if (_.isEmpty(this.children)) {
               return false;
             } else {
               return _.find(this.children, function(possible) {
                        return possible.contains(query);
                      });
             }
           };

           this.matches = function(query) {
             var this_node = this;
             var query_children = query.children || [];

             return _.every(
                      _.omit(query, 'children'),
                      function(value, key) { return this_node[key] == value; }
                    ) &&
                    _.every(
                      query_children,
                      function(query_child) {
                        return _.any(
                                 children,
                                 function(real_child) {
                                   return query_child.matches(real_child);
                                 }
                               );
                      }
                    );
           };

           this.serialize = function() { return value; };

           this.serializedChildren = function() {
             return _.chain(this.children)
                     .map(function(child) { return child.serialize(); })
                     .compact()
                     .value();
           };

           this.toJSON = function() {
             return _.mapObject(
               _.pick(this, 'value', 'children', 'type'),
               function(val, key) {
                 if (key == 'children') {
                   return _.map(val, function(item) {
                     return item.toJSON();
                   });
                 } else {
                   return val;
                 }
               }
             );
           };

           // If an extention function was given, call it with this.
           if (_.isFunction(extention)) { extention.call(this); }
         };
};


// Specialized version of Pride.nodefactory() which produces boolean
// nodes.
Pride.Core.boolNodeFactory = function(type, child_types) {
  return Pride.Core.nodeFactory(
           type,
           child_types,
           function () {
             // Ensure that only valid boolean values are given.
             if (!(_.contains(['AND', 'OR', 'NOT'], this.value))) {
               throw 'Not a valid boolean value';
             }

             this.serialize = function() {
               return this.serializedChildren()
                          .join(' ' + this.value + ' ');
             };

             this.serializedChildren = function() {
               var this_node = this;

               return _.chain(this_node.children)
                       .map(function(child) {
                         if (child.type == this_node.type ||
                            (child.type == 'literal' && child.value.match(/\s/))) {
                           return '(' + child.serialize() + ')';
                         } else {
                           return child.serialize();
                         }
                       })
                       .compact()
                       .value();
             };
           }
         );
};

// Possible node types.
var top_level_nodes    = ['field_boolean', 'field'];
var inside_field_nodes = ['value_boolean', 'literal', 'tag', 'special'];

// Create constructor functions for all the various node types.

Pride.FieldTree.FieldBoolean = Pride.Core.boolNodeFactory(
                                 'field_boolean',
                                 top_level_nodes
                               );

Pride.FieldTree.ValueBoolean = Pride.Core.boolNodeFactory(
                                 'value_boolean',
                                 inside_field_nodes
                               );

Pride.FieldTree.Field = Pride.Core.nodeFactory(
  'field',
  inside_field_nodes,
  function() {
    this.serialize = function() {
      return this.value + ': (' +
               this.serializedChildren().join(' ') +
             ')';
    };
  }
);

Pride.FieldTree.Tag = Pride.Core.nodeFactory(
  'tag',
  inside_field_nodes,
  function() {
    this.serialize = function() {
      var serialized_children = this.serializedChildren();
      if (serialized_children.length === 0) {
        return '';
      } else {
        return this.value + '(' + serialized_children.join(' ') + ')';
      }
    };
  }
);

Pride.FieldTree.Literal = Pride.Core.nodeFactory('literal');
Pride.FieldTree.Special = Pride.Core.nodeFactory('special');
Pride.FieldTree.Raw = Pride.Core.nodeFactory('raw');
