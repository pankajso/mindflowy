define(
  ["./react-es6","./react-es6/lib/cx","./BootstrapMixin","./utils","./ValidComponentChildren","exports"],
  function(__dependency1__, __dependency2__, __dependency3__, __dependency4__, __dependency5__, __exports__) {
    "use strict";
    /** @jsx React.DOM */

    var React = __dependency1__["default"];
    var classSet = __dependency2__["default"];
    var BootstrapMixin = __dependency3__["default"];
    var utils = __dependency4__["default"];
    var ValidComponentChildren = __dependency5__["default"];

    var PanelGroup = React.createClass({displayName: 'PanelGroup',
      mixins: [BootstrapMixin],

      propTypes: {
        collapsable: React.PropTypes.bool,
        activeKey: React.PropTypes.any,
        defaultActiveKey: React.PropTypes.any,
        onSelect: React.PropTypes.func
      },

      getDefaultProps: function () {
        return {
          bsClass: 'panel-group'
        };
      },

      getInitialState: function () {
        var defaultActiveKey = this.props.defaultActiveKey;

        return {
          activeKey: defaultActiveKey
        };
      },

      render: function () {
        return this.transferPropsTo(
          React.DOM.div( {className:classSet(this.getBsClassSet())}, 
            ValidComponentChildren.map(this.props.children, this.renderPanel)
          )
        );
      },

      renderPanel: function (child) {
        var activeKey =
          this.props.activeKey != null ? this.props.activeKey : this.state.activeKey;

        var props = {
          bsStyle: child.props.bsStyle || this.props.bsStyle,
          key: child.props.key,
          ref: child.props.ref
        };

        if (this.props.accordion) {
          props.collapsable = true;
          props.expanded = (child.props.key === activeKey);
          props.onSelect = this.handleSelect;
        }

        return utils.cloneWithProps(
          child,
          props
        );
      },

      shouldComponentUpdate: function() {
        // Defer any updates to this component during the `onSelect` handler.
        return !this._isChanging;
      },

      handleSelect: function (key) {
        if (this.props.onSelect) {
          this._isChanging = true;
          this.props.onSelect(key);
          this._isChanging = false;
        }

        if (this.state.activeKey === key) {
          key = null;
        }

        this.setState({
          activeKey: key
        });
      }
    });

    __exports__["default"] = PanelGroup;
  });