var updates = [];

function isInUpdates(hist_item) {
    var url = hist_item.url;
    var activated = false;
    for (var i = 0; i < updates.length; i++) {
        var update = updates[i];
        for (var j = 0; j < update.children.length; j++) {
            if (activated){
                // return;
            }
            var child = update.children[j];
            var clean_url = child.url;
            if (clean_url.slice(-1) === "/") {
                clean_url = clean_url.slice(0, -1);
            }
            var stripped_url = clean_url.split("/").slice(0, -1).join("/");
            if (url.startsWith(stripped_url)) {
                if (!activated) {
                    chrome.bookmarks.create({parentId: child.parentId, title: hist_item.title, url: hist_item.url});
                    activated = true;
                }
                try {
                    chrome.bookmarks.remove(child.id, function ignore_error() { void chrome.runtime.lastError;});
                }
                catch (e) {

                }
            }

        }
    }

}

chrome.history.onVisited.addListener(function callback(result) {
    console.log(result);
    isInUpdates(result);
});


function onClickHandler(info, tab) {
    chrome.extension.getBackgroundPage().console.log(info);
    if (info.menuItemId == "dumpbookmarks") {
        var startNode = chrome.bookmarks.getRecent(1, function (res) {
            res = res[0];
            crawlUp(res.id);
        });
    }
};
chrome.contextMenus.onClicked.addListener(onClickHandler);


chrome.runtime.onInstalled.addListener(function () {
    chrome.contextMenus.create({"title": "dumpbookmarks", "id": "dumpbookmarks"});

    chrome.bookmarks.getTree(function (itemTree) {
        console.log("Running crawl...");
        itemTree.forEach(function (item) {
            processNode(item);
        });
        console.log("Crawl Completed");

    });

});

function processNode(node) {
    // recursively process child nodes
    if (node.children) {
        if (node.title.startsWith("[Roll]")) {
            updates.push(node);
            console.log(updates);
        }
        node.children.forEach(function (child) {
            processNode(child)
        });
    }

}

// function secondDump() {
//     var subparent;
//     var startNode = chrome.bookmarks.getRecent(1, function(res){
//         res = res[0];
//         console.log(res.id);
//         console.log(res.title);
//         subparent = res;
//         while (subparent.parentId){
//             chrome.bookmarks.get(subparent.parentId, function(newParent){
//                 subparent = newParent;
//             });
//             console.log(subparent.title);
//         }
//         console.log("Final Node:");
//         console.log(subparent.id);
//         console.log(subparent.title);
//         console.log(subparent);
//     })
// }

function dumpfunc(root_bookmark) {
    console.log("Root located");
    console.log(root_bookmark);
    console.log(root_bookmark.id);
    console.log(root_bookmark.title);
}

function crawlUp(start_id) {
    curr = chrome.bookmarks.get(start_id, function (next) {
        next = next[0];
        console.log("Next Id: " + next);
        if (!!next.parentId) {
            console.log("Going up!");
            console.log(next);
            crawlUp(next.parentId);
        } else {
            dumpfunc(next);
        }
    })

}

// function dumpBookmarks() {
//     var bookmarkTreeNodes = chrome.bookmarks.getTree(
//         function(bookmarkTreeNodes) {
//
//             for (let bookmarkTreeNode in bookmarkTreeNodes){
//                 console.log(bookmarkTreeNode);
//                 console.log(bookmarkTreeNode);
//                 console.log(bookmarkTreeNode.id)
//             }
//         });
// }