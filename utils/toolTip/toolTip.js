// type: info warn success error
var __this;
function init(context) {
    __this = context;
    __this.showToolTip = showToolTip;
    __this.closeToolTip = closeToolTip;
}

/**
 * 关闭提示信息
 */
function closeToolTip() {
    if (!__this) {
        console.log('ToolTip not init! Please init with param [this]');
        return;
    }
   
    __this.data._toolTip_.isShow = false;
    __this.setData({
        _toolTip_: __this.data._toolTip_
    });
}


function showToolTip(text) {
    if (!__this) {
        console.log('ToolTip not init! Please init with param [this]');
        return;
    }
    
    __this.setData({
        _toolTip_: {
            info:text,
            isShow: true
        }
    });
    
    setTimeout(function() {
        closeToolTip();
    }.bind(__this), 2000);
}

module.exports = {
    showToolTip: showToolTip,
    closeToolTip: closeToolTip,
    init: init
};