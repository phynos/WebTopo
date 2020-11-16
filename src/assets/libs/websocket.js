

//const wsuri = process.env.WS_API;
const wsuri = "";

var WebSocketUtil = function() {
    this.websock = null;
    this._reconnect = function () {
        
    };
}

WebSocketUtil.prototype.initSocket = function() {
    this.websock = new WebSocket(wsuri);
    this.websock.onopen = () => {

    };
    this.websock.onmessage = (msg) => {

    };
    this.websock.onclose = (evt) => {
        console.log('socket close', evt);
        this.websock = null;
        if (this.socketClose) {
          this.socketClose();
        }
    };
    this.websock.onerror = () => {
        this.destroy();
        this._reconnect();
    }
}

WebSocketUtil.prototype.send = function() {

}

WebSocketUtil.prototype.destroy = function () {
    if (this.websock) {
      this.websock.close();
    }
    this.websock = null;
  };

const Instance = new WebSocketUtil();
export default Instance;
