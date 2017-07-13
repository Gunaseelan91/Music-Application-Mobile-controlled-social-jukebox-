  /**
   * @File-name : CustomPlayer.js
   * @author : Gunaseelan.T
   * @File-Description : Using XBMC API,below is the node.js code to build a custom player.
   **/
  
  /* sendRequest Function */
function sendRequest(data, callback) {
    var str_data = 'GET /jsonrpc?request='+ JSON.stringify(data) + 'HTTP/1.0\r\n';
    var client = net.connect({port: PORT},{host: host},function (){
        client.write(str_data);
        client.write("HOST:"+host+"\r\n\r\n");
        console.log('client connected');
    });
    client.on('data', function(data) {
        callback(data); 
        client.end();
    });
    client.on('end', function() {
      console.log('client disconnected');
    });
}

    xbmc.open = function(songpath,callback){
             var data = {"jsonrpc":"2.0","method":"Player.Open","params":{"item":{"file":songpath}},"id":1};    
           sendRequest(data, callback);
    };

    xbmc.playpause = function(callback){
           var data = {"jsonrpc":"2.0","method":"Player.PlayPause","params":{"playerid":0},"id":1};
           sendRequest(data,callback);
    };
    
    xbmc.stop = function(callback){
           var data = {"jsonrpc":"2.0","method":"Player.Stop","params":{"playerid":0},"id":1};
           sendRequest(data,callback);
    };
    
    xbmc.setprevious = function(callback){
           var data = {"jsonrpc":"2.0","method":"Player.GoTo","params":{"playerid":0,"to":"previous"},"id":1};
           sendRequest(data,callback);
    };
    
    xbmc.setnext = function(callback){
        var data = {"jsonrpc":"2.0","method":"Player.GoTo","params":{"playerid":0,"to":"next"},"id":1};
        sendRequest(data, callback);
    };
    
    xbmc.setshuffle = function(callback){
           var data = {"jsonrpc":"2.0","method":"Player.SetShuffle","params":{"playerid":0,"shuffle":"toggle"},"id":1};
           sendRequest(data, callback);
    };
     
    xbmc.setrepeat = function(callback){
           var data = {"jsonrpc":"2.0","method":"Player.SetRepeat","params":{"playerid":0,"repeat":"cycle"},"id":1};
           sendRequest(data, callback);
    };
    
    xbmc.GetNowPlaying = function(callback){
           var data = {"jsonrpc":"2.0","method":"Player.GetItem","params":{"playerid":0,"properties":["title","album","duration","thumbnail"]},"id":1};
           sendRequest(data,callback);
    };
    
    xbmc.addToPlaylist = function(songpath,callback){
           var data = {"jsonrpc":"2.0","method":"Playlist.Add","params":{"playlistid":0,"item":{"file":songpath},"id": 4},"id":1};
           sendRequest(data, callback);
    };
    
    xbmc.GetPlaylistItems = function(callback){
           var data = {"jsonrpc":"2.0","method":"Playlist.GetItems","params":{"properties":["title", "album"],"playlistid":0},"id":1};
           sendRequest(data, callback);
    };

    xbmc.SetVolume = function(volumedata,callback){
           var data = {"jsonrpc":"2.0","method":"Application.SetVolume","params": { "volume":volumedata},"id":1};
           sendRequest(data, callback);
    };
    
    xbmc.setseek = function(seekdata,callback){
           var data = {"jsonrpc":"2.0","method":"Player.Seek","params": {"playerid":0,"value":seekdata},"id":1};
           sendRequest(data,callback);
    };


    module.exports = xbmc;