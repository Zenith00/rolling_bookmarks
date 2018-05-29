;

function onClickHandler(info, tab) {
    chrome.extension.getBackgroundPage().console.log(info);
    if (info.menuItemId == "dumpbookmarks"){
        // dumpBookmarks();
        secondDump();
    }
};
chrome.contextMenus.onClicked.addListener(onClickHandler);



chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({"title": "dumpbookmarks", "id": "dumpbookmarks"});

});

function secondDump() {
    var subparent;
    var startNode = chrome.bookmarks.getRecent(1, function(res){
        res = res[0];
        console.log(res.id);
        console.log(res.title);
        subparent = res;
        while (subparent.parentId){
            subparent = chrome.bookmarks.get(subparent.parentId)
            console.log(subparent.title);
        }
        console.log("Final Node:");
        console.log(subparent.id);
        console.log(subparent.title);
        console.log(subparent);
    })
}
function dumpBookmarks() {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {

            for (let bookmarkTreeNode in bookmarkTreeNodes){
                console.log(bookmarkTreeNode);
                console.log(bookmarkTreeNode);
                console.log(bookmarkTreeNode.id)
            }
        });
}