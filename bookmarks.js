chrome.contextMenus.create({
    id: 'open',
    title: chrome.i18n.getMessage('openContextMenuTitle'),
    contexts: ['link'],
});

function onClickHandler(info, tab) {
    if (info.menuItemId == "dumpbookmarks"){
        dumpBookmarks();
    }
};
chrome.contextMenus.onClicked.addListener(onClickHandler);



chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({"title": "dumpbookmarks", "id": "dumpbookmarks"});

});

function dumpBookmarks() {
    var bookmarkTreeNodes = chrome.bookmarks.getTree(
        function(bookmarkTreeNodes) {
            for (node in bookmarkTreeNodes){
                console.log(node.title);
                console.log(node.id)
            }
        });
}