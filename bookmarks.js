chrome.contextMenus.create({
    id: 'open',
    title: chrome.i18n.getMessage('openContextMenuTitle'),
    contexts: ['link'],
});

function onClickHandler(info, tab) {
    console.log(info);
    if (info.menuItemId == "dumpbookmarks"){
        dumpBookmarks();
    }
};
chrome.contextMenus.onClicked.addListener(onClickHandler);



chrome.runtime.onInstalled.addListener(function() {
    chrome.contextMenus.create({"title": "dumpbookmarks", "id": "dumpbookmarks"});
    console.log("'" + context + "' item:" + id);

    console.log("About to try creating an invalid item - an error about " +
        "duplicate item child1 should show up");
    chrome.contextMenus.create({"title": "Oops", "id": "child1"}, function() {
        if (chrome.extension.lastError) {
            console.log("Got expected error: " + chrome.extension.lastError.message);
        }
    });
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